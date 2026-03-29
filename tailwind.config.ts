import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#102a4c",
        "navy-dark": "#0a1e38",
        "navy-deeper": "#071428",
        orange: "#ff5e00",
        "off-white": "#f8f7f4",
        "text-primary": "#1a1a1a",
        "text-secondary": "#5a5a5a",
        "text-muted": "#8a8a8a",
        border: "rgba(16,42,76,0.10)",
        success: "#10b981",
      },
      fontFamily: {
        serif: ["Georgia", "'Times New Roman'", "serif"],
        sans: ["'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      letterSpacing: {
        "tight-display": "-0.02em",
        "tighter-display": "-0.025em",
        eyebrow: "0.15em",
        button: "0.04em",
        link: "0.03em",
      },
      lineHeight: {
        body: "1.78",
      },
      fontSize: {
        eyebrow: ["11px", { letterSpacing: "0.15em", lineHeight: "1.4" }],
        "nav-link": ["13px", { lineHeight: "1.4" }],
        "btn": ["13px", { letterSpacing: "0.04em", lineHeight: "1.4" }],
      },
    },
  },
  plugins: [],
};
export default config;
