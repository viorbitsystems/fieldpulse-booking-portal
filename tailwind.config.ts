import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1a2e4a",
          navyHover: "#243d61",
          green: "#4ade80",
          coral: "#e05a4e",
        },
        neutral: {
          50: "#fafafa",
          100: "#f4f4f4",
          200: "#ebebeb",
          300: "#d0d0d0",
          400: "#bbb",
          500: "#999",
          600: "#666",
          700: "#444",
          900: "#1a1a1a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
