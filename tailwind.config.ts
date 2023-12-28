import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "striped-black":
          "repeating-linear-gradient(-45deg, #000, #000 1rem, transparent 1rem, transparent 2rem)",
      },
      animation: {
        tape: "tape 5s infinite linear",
      },
      keyframes: {
        tape: {
          "0%": {
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
            "--tw-translate-x": "0px",
          },
          "100%": {
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
            "--tw-translate-x": "-20%",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
