export default function Tape({
  className,
  length = 20,
  reversed = false,
  text = "under construction",
  bgClassName = "bg-yellow-400",
}: {
  className?: string;
  length?: number;
  reversed?: boolean;
  text?: string;
  bgClassName?: `bg-${string}`;
}) {
  return (
    <div
      className={`bg-striped-black py-4 animate-tape animate dark:text-zinc-950 select-none shadow-xl ${bgClassName} ${className}`}
      style={{ animationDirection: reversed ? "reverse" : undefined }}
    >
      <div className={`flex gap-24 py-2 overflow-visible px-12 ${bgClassName}`}>
        {Array.from({ length }, (_, i) => (
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
