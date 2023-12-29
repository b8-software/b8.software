import B8Dark from "./B8Dark";
import B8Light from "./B8Light";

export const lineCount = 2;
export const lineLength = 300;

export default function B8({
  variant = "auto",
  animated = false,
}: {
  variant?: "auto" | "light" | "dark";
  animated?: boolean;
}) {
  switch (variant) {
    case "auto": {
      return (
        <>
          <B8Light animated={animated} className="hidden dark:block" />
          <B8Dark animated={animated} className="dark:hidden" />
        </>
      );
    }
    case "light": {
      return <B8Light animated={animated} />;
    }
    case "dark": {
      return <B8Dark animated={animated} />;
    }
  }
}
