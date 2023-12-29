import type { CSSProperties } from "react";

declare module "react" {
  interface CSSProperties {
    // Allow any CSS Custom Properties
    [index: `--${string}`]: any;
  }
}
