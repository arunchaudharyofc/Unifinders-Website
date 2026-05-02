/**
 * ============================================================================
 * UNIFINDERS LOGGER — Structured Logging for Frontend & Backend
 * ============================================================================
 *
 * Provides categorized, timestamped logging with module context.
 * In production: errors/warns are captured, debug/info are suppressed.
 * In development: all levels are logged with full context.
 *
 * Usage:
 *   import { logger } from "@/lib/logger";
 *   logger.info("DAL", "Fetched 12 events from DB");
 *   logger.error("API", "Failed to create appointment", error);
 *   logger.warn("Auth", "User session expired", { userId: "abc" });
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-04-27
 * ============================================================================
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: unknown;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const LOG_COLORS: Record<LogLevel, string> = {
  debug: "\x1b[36m",   // Cyan
  info: "\x1b[32m",    // Green
  warn: "\x1b[33m",    // Yellow
  error: "\x1b[31m",   // Red
};
const RESET = "\x1b[0m";

const isProd = process.env.NODE_ENV === "production";
const isServer = typeof window === "undefined";

function formatEntry(entry: LogEntry): string {
  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.module}]`;
  return `${prefix} ${entry.message}`;
}

function createEntry(
  level: LogLevel,
  module: string,
  message: string,
  dataOrError?: unknown
): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    module,
    message,
  };

  if (dataOrError instanceof Error) {
    entry.error = {
      name: dataOrError.name,
      message: dataOrError.message,
      stack: dataOrError.stack,
    };
  } else if (dataOrError !== undefined) {
    entry.data = dataOrError;
  }

  return entry;
}

function log(level: LogLevel, module: string, message: string, dataOrError?: unknown) {
  // In production, suppress debug and info on server
  if (isProd && (level === "debug" || level === "info") && isServer) return;

  const entry = createEntry(level, module, message, dataOrError);
  const formatted = formatEntry(entry);

  if (isServer) {
    // Server-side: use colored console output
    const color = LOG_COLORS[level];
    const consoleMethod = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
    consoleMethod(`${color}${formatted}${RESET}`);
    if (entry.error?.stack && !isProd) {
      consoleMethod(`${color}  └─ Stack: ${entry.error.stack}${RESET}`);
    }
    if (entry.data) {
      consoleMethod(`${color}  └─ Data:`, entry.data, RESET);
    }
  } else {
    // Client-side: use browser console with appropriate method
    const consoleMethod =
      level === "error" ? console.error :
      level === "warn" ? console.warn :
      level === "debug" ? console.debug :
      console.log;

    if (entry.error) {
      consoleMethod(`%c${formatted}`, `color: ${level === "error" ? "#ef4444" : "#f59e0b"}`, entry.error);
    } else if (entry.data) {
      consoleMethod(`%c${formatted}`, `color: ${level === "info" ? "#22c55e" : "#06b6d4"}`, entry.data);
    } else {
      consoleMethod(`%c${formatted}`, `color: ${level === "info" ? "#22c55e" : level === "warn" ? "#f59e0b" : "#06b6d4"}`);
    }
  }
}

/**
 * Structured logger with module context.
 *
 * @example
 * ```ts
 * logger.info("Navbar", "Menu toggle clicked", { isOpen: true });
 * logger.error("API", "Database query failed", error);
 * logger.warn("Auth", "Token expires in 5 minutes");
 * logger.debug("DAL", "Query returned 0 rows for events");
 * ```
 */
export const logger = {
  debug: (module: string, message: string, data?: unknown) => log("debug", module, message, data),
  info: (module: string, message: string, data?: unknown) => log("info", module, message, data),
  warn: (module: string, message: string, data?: unknown) => log("warn", module, message, data),
  error: (module: string, message: string, data?: unknown) => log("error", module, message, data),
};

/**
 * Create a module-scoped logger to avoid repeating the module name.
 *
 * @example
 * ```ts
 * const log = createModuleLogger("Navbar");
 * log.info("Menu opened");
 * log.error("Failed to load user", error);
 * ```
 */
export function createModuleLogger(module: string) {
  return {
    debug: (message: string, data?: unknown) => logger.debug(module, message, data),
    info: (message: string, data?: unknown) => logger.info(module, message, data),
    warn: (message: string, data?: unknown) => logger.warn(module, message, data),
    error: (message: string, data?: unknown) => logger.error(module, message, data),
  };
}
