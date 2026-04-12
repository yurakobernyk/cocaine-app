"use client";

import { useEffect } from "react";

export function SwCleaner() {
  useEffect(() => {
    navigator.serviceWorker
      ?.getRegistrations()
      .then((regs) => regs.forEach((r) => r.unregister()));
  }, []);

  return null;
}
