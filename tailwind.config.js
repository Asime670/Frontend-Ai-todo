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
        app: {
          bg: "#FAFAFA",
          charcoal: "#1E1E1E",
          dark: "#1F2937",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          border: "#E2E8F0",
          subtle: "#F3F4F2",
          white: "#FFFFFF",
          sage: {
            DEFAULT: "#52796F",
            hover: "#42665D",
            light: "#EBF1EE",
            subtle: "#F2F6F4"
          }
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ]
      }
    },
  },
  plugins: [],
}
