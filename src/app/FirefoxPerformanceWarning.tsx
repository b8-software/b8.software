"use client";

export default function FirefoxPerformanceWarning() {
  if (typeof window === "undefined") return null;
  if (!window.navigator.userAgent.includes("Firefox")) return null;

  return <>⚠️ enabling emojis might cause performance issues in Firefox</>;
}
