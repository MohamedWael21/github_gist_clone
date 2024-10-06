import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
const config: Config = {
  darkMode: ["selector"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f2f8fd",
          "100": "#e4effa",
          "200": "#c3dff4",
          "300": "#8fc5ea",
          "400": "#53a7dd",
          "500": "#2980b9",
          "600": "#1e6fab",
          "700": "#19598b",
          "800": "#194c73",
          "900": "#1a4060",
          "950": "#112940",
        },
      },
      fontFamily: {
        "roboto-mono": "var(--font-roboto-mono)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
