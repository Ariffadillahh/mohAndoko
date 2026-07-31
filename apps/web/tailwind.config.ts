import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deepRed: "#B10406",
        softWhite: "#F7FFFC",
        charcoalGreen: "#16231D",
        warmBeige: "#D9CFC4",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      spacing: {
        "section-sm": "120px",
        "section-lg": "160px",
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        ui: "16px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};
export default config;
