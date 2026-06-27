import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        secondary: {
          500: "#f59e0b",
          600: "#d97706",
        },
        accent: "#10b981",
        dark: "#0f172a",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        resellhub: {
          primary: "#0ea5e9",
          secondary: "#f59e0b",
          accent: "#10b981",
          neutral: "#0f172a",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e2e8f0",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
      {
        resellhub_dark: {
          primary: "#0ea5e9",
          secondary: "#f59e0b",
          accent: "#10b981",
          neutral: "#1e293b",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],

    darkTheme: "resellhub_dark",
  },
};