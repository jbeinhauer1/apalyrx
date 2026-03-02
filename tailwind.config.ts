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
        orange: "#f26522",
        "orange-hover": "#e05a1a",
        body: "#333333",
        "secondary-text": "#666666",
        "light-bg": "#f8f9fb",
        "light-bg-alt": "#f4f5f7",
        success: "#10b981",
      },
      fontFamily: {
        quicksand: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
