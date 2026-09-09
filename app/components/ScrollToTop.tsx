"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Forces the browser to reset scroll position to top on hard refresh or load
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }
  }, []);

  return null;
}