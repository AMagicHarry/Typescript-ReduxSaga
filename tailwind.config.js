/** @type {import('tailwindcss').Config} */
import frostUiPlugin from '@frostui/tailwindcss/plugin';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@frostui/tailwindcss/dist/*.js"
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      'base': ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#3073F1',
        'secondary': '#68625D',
        'success': '#1CB454',
        'warning': '#E2A907',
        'info': '#0895D8',
        'danger': '#E63535',
        'light': '#eef2f7',
        'dark': '#313a46',
      },
      keyframes: {
        load: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        }
      },
    },
  },
  plugins: [
    frostUiPlugin,
    forms,
    typography,
    aspectRatio,
  ],
}
