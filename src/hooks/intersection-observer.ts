"use client";
import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onIntersect?: () => void;
  enabled?: boolean; // Щоб не тригерити, коли вже йде завантаження
}

export const useIntersectionObserver = ({
  threshold = 1.0,
  root = null,
  rootMargin = "0px",
  onIntersect,
  enabled = true,
}: UseIntersectionObserverProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersect?.();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, onIntersect, enabled]);

  return ref;
};
