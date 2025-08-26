/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2dd4bf",
        secondary: "#e6fffa",
        background: "#f7fbf9",
        border: "#e6eef2",
        logo: "#019b86",
        warning: "#f59e0b",
        destructive: "#ef4444",
        accent: "#ffd166",
        success: "#16a34a",
        sidebar: "#e9f7f5",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
