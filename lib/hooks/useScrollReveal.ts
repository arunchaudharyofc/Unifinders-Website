/**
 * ============================================================================
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations
 * ============================================================================
 *
 * Returns a ref + isVisible boolean. Attach the ref to any element and it
 * will set isVisible=true once the element enters the viewport.
 *
 * Usage:
 *   const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
 *   <div ref={ref} className={isVisible ? "animate-fade-up" : "opacity-0"}>
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-04-01
 * ============================================================================
 */
"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  /** If true, animation re-triggers on every scroll in/out. Default false (once). */
  triggerOnce?: boolean;
}

export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
  triggerOnce = true,
}: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
