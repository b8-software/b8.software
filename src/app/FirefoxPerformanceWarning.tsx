"use client";

import { useEffect, useState } from "react";

export default function FirefoxPerformanceWarning() {
  const [hasWarning, setHasWarning] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isFirefox = window.navigator.userAgent.includes("Firefox");
    const isWindows = window.navigator.userAgent.includes("Windows");

    setHasWarning(isFirefox && isWindows);
  }, []);

  return hasWarning ? (
    <>⚠️ enabling emojis with a large amount of objects might cause performance issues</>
  ) : null;
}
