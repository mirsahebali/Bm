/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

// Your selected colors:
//
//     Primary: #f7f6ed (RGB: 247, 246, 237)
//     Secondary: #0b0a05 (RGB: 11, 10, 5)
//     Primary Button: #7c86c5 (RGB: 124, 134, 197)
//     Secondary Button: #19170b (RGB: 25, 23, 11)
//     Accent: #7c86c5 (RGB: 124, 134, 197)
