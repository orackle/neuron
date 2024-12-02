/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkRed: '#780000',
        vibrantRed: '#C1121F',
        lightCream: '#FDF0D5',
        darkBlue: '#003049',
        skyBlue: '#669BBC',
      },
    },
  },
  plugins: [],
};
