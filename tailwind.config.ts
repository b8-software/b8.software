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
          "repeating-linear-gradient(-45deg, #000, #000 1.41421356237rem, transparent 1.41421356237rem, transparent 2.82842712474rem)",
      },
      animation: {
        tape: "tape 6s infinite linear",
      },
      keyframes: {
        tape: {
          "0%": {
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) translate(18rem, 0px)",
          },
          "100%": {
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) translate(-18rem, 0px)",
          },
        },
      },
      rotate: {
        35: "35deg",
      },
    },
  },
  plugins: [],
};

export default config;
