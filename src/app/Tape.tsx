"use client";

import { useCallback, useEffect, useState } from "react";

const emlementWidth = 18 * 6;

export default function Tape({
  angleInDeg = 0,
  reversed = false,
  text = "under construction",
  bgClassName = "bg-yellow-400",
  className = "",
}: {
  angleInDeg?: number;
  reversed?: boolean;
  text?: string;
  bgClassName?: `bg-${string}`;
  className?: string;
}) {
  const [elementCount, setElementCount] = useState(emlementWidth * 4);

  const updateDiagLength = useCallback(() => {
    const requiredLength = window.innerWidth / Math.cos((angleInDeg / 180) * Math.PI);

    setElementCount(Math.min(Math.ceil(requiredLength / emlementWidth) + 1, 12));
  }, [angleInDeg]);

  useEffect(() => {
    updateDiagLength();
    window.addEventListener("resize", updateDiagLength);

    return () => window.removeEventListener("resize", updateDiagLength);
  }, [updateDiagLength]);

  return (
    <div
      className={`bg-striped-black py-4 animate-tape animate dark:text-zinc-950 select-none shadow-xl ${bgClassName} ${className}`}
      style={{
        animationDirection: reversed ? "reverse" : undefined,
        "--tw-rotate": `${angleInDeg}deg`,
      }}
    >
      <div className={`flex gap-24 py-2 overflow-visible px-12 ${bgClassName}`}>
        {Array.from({ length: elementCount }, (_, i) => (
          <p
            className="whitespace-nowrap w-48 text-center font-semibold text-lg text-ellipsis"
            key={i}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
