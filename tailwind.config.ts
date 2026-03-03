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
        navy: "#0f1c2e",
        "navy-dark": "hsl(213, 55%, 8%)",
        orange: "#f26522",
        "orange-hover": "#e05a1a",
        body: "#333333",
        "secondary-text": "#666666",
        "muted-foreground": "hsl(213, 20%, 45%)",
        border: "hsl(213, 20%, 88%)",
        "light-bg": "#f8f9fb",
        "light-bg-alt": "#f4f5f7",
        success: "#10b981",
      },
      fontFamily: {
        heading: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
        body: ["var(--font-opensans)", "Open Sans", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
      },
      maxWidth: {
        content: "1400px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.03)",
        elevated: "0 4px 16px rgba(0,0,0,0.08)",
        accent: "0 4px 16px rgba(242,101,34,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
