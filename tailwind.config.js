/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#BF8034", // Primary Gold
          secondary: "#F2BC79", // Secondary Gold
        },
        green: {
          DEFAULT: "#4CA633",
          dark: "#104017", // Primary Green
          light: "#F2F2EB", // Secondary Green
        },
        white: "#FFFFFF",
        black: "#122326",
      },
    },
  },
  plugins: [],
}
