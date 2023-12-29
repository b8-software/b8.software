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
        "stroke-glow": "stroke-glow 5s infinite linear",
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
        "stroke-glow": {
          "0%": {
            "stroke-dashoffset": "0",
          },
          "100%": {
            "stroke-dashoffset": "var(--stroke-animation-length, 100)",
          },
        },
      },
      colors: {
        greenest: {
          "50": "#edfff7",
          "100": "#d5ffee",
          "200": "#aeffdd",
          "300": "#70ffc4",
          "400": "#2bfda5",
          "500": "#00f38d",
          DEFAULT: "#00f38d",
          "600": "#00c06b",
          "700": "#009657",
          "800": "#067548",
          "900": "#07603d",
          "950": "#003721",
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
