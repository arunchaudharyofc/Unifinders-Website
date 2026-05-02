/**
 * ============================================================================
 * CLIENT ERROR LOGGER — Captures Uncaught Frontend Errors
 * ============================================================================
 *
 * Mounts global error handlers (window.onerror, unhandledrejection)
 * to capture and log client-side JavaScript errors.
 *
 * In production: errors are POSTed to /api/log-error so they appear in
 * Vercel's serverless function logs (Dashboard → Project → Logs tab).
 * In development: errors are logged to the browser console only.
 *
 * This component should be placed ONCE in the root layout.
 *
 * @maintainer  Unifinders Dev Team
 * @updated     2026-05-02
 * ============================================================================
 */
"use client";

import { useEffect } from "react";

/** Filter out browser extension errors that are NOT from the application. */
function isExtensionError(errorMessage: string, source?: string): boolean {
  const extensionPatterns = [
    "Extension context invalidated",
    "inject-content-scripts",
    "injected.js",
    "FrameManager",
    "chrome-extension://",
    "moz-extension://",
    "safari-extension://",
    "Attempting to use a disconnected port object",
    "utility_all2",
    "ResizeObserver loop",
    // Vercel's own live preview script errors — not our code
    "0vjl2odh",
    "Connection closed",
  ];
  const combined = `${errorMessage} ${source ?? ""}`;
  return extensionPatterns.some((p) => combined.includes(p));
}

/** Send an error payload to the server so it appears in Vercel logs. */
async function sendToServer(payload: Record<string, unknown>) {
  try {
    await fetch("/api/log-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Silently ignore — we never want logging to crash the app
  }
}

export default function ClientErrorLogger() {
  useEffect(() => {
    const isProd = process.env.NODE_ENV === "production";

    // Global uncaught error handler
    const handleError = (event: ErrorEvent) => {
      if (isExtensionError(event.message, event.filename)) return;

      const payload = {
        type: "UNCAUGHT_ERROR",
        timestamp: new Date().toISOString(),
        message: event.message,
        source: event.filename,
        line: event.lineno,
        col: event.colno,
        stack: event.error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      console.error(
        `%c[CLIENT ERROR] [${payload.timestamp}]`,
        "color: #ef4444; font-weight: bold",
        payload
      );

      if (isProd) sendToServer(payload);
    };

    // Unhandled promise rejection handler
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);

      if (isExtensionError(message)) return;

      const payload = {
        type: "UNHANDLED_REJECTION",
        timestamp: new Date().toISOString(),
        message,
        stack: reason instanceof Error ? reason.stack : undefined,
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      console.error(
        `%c[UNHANDLED PROMISE] [${payload.timestamp}]`,
        "color: #ef4444; font-weight: bold",
        payload
      );

      if (isProd) sendToServer(payload);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    console.log(
      "%c[Unifinders] ✓ Client error monitoring active",
      "color: #22c55e; font-weight: bold"
    );

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
