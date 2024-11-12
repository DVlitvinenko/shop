/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#f8f9fa",
          dark: "#2c2c2c",
          card: "#ffffff",
          subtle: "#e9ecef",
          header: "rgb(219 217 215)",
          secondary: "#fef3f3",
          third: "#c9cbc7",
        },
        text: {
          DEFAULT: "#1f1f1f",
          light: "#ffffff",
          muted: "#6c757d",
          accent: "#F28482",
        },
        primary: {
          DEFAULT: "#ff6f61",
          light: "#ff897a",
          dark: "#e64b48",
        },
        secondary: {
          DEFAULT: "#3b82f6",
          light: "#90caf9",
        },
        state: {
          success: "#38a169",
          warning: "#ffb020",
          error: "#e53e3e",
          info: "#3b82f6",
        },
        accent: {
          highlight: "#ffebcd",
          border: "#dcdcdc",
          shadow: "#e0e0e0",
        },
        button: { primary: "#84a59d", border: "#fafafa" },
      },
      width: { desc: "1320px" },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      borderRadius: {
        button: "100px",
      },
    },
  },
  plugins: [],
};