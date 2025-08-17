/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#111827",
          800: "#1f2937",
        },
        indigo: {
          900: "#312e81",
        },
      },
      transitionDuration: {
        300: "300ms",
      },
    },
  },
  plugins: [],
};
