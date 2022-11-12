/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        slide: 'slide 20s linear infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        slide: {
          '0%': { transform: 'translateX(0)'},
          '100%': { transform: 'translateX(-50%)'}
        }
      }
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular']
    }
  },
  plugins: [],
}