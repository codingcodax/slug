// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font-inter)', ...fontFamily.sans] },
      colors: {
        mauve: {
          100: '#fdfcfd',
          200: '#f9f8f9',
          300: '#f4f2f4',
          400: '#eeedef',
          500: '#e9e8ea',
          600: '#e4e2e4',
          700: '#dcdbdd',
          800: '#c8c7cb',
          900: '#908e96',
          1000: '#86848d',
          1100: '#6f6e77',
          1200: '#1a1523',
        },
        mauveDark: {
          100: '#161618',
          200: '#1c1c1f',
          300: '#232326',
          400: '#28282c',
          500: '#2e2e32',
          600: '#34343a',
          700: '#3e3e44',
          800: '#504f57',
          900: '#706f78',
          1000: '#7e7d86',
          1100: '#a09fa6',
          1200: '#ededef',
        },
      },
    },
  },
  plugins: [],
};
