/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#fafafa',
          raised: '#ffffff',
          dark: '#0a0a0a',
          'dark-raised': '#141414',
        },
        ink: {
          DEFAULT: '#111111',
          secondary: '#666666',
          tertiary: '#999999',
          dark: '#e8e8e8',
          'dark-secondary': '#888888',
          'dark-tertiary': '#555555',
        },
        accent: {
          DEFAULT: '#e02020',
          hover: '#c91818',
          muted: 'rgba(224, 32, 32, 0.08)',
        },
        stroke: {
          DEFAULT: '#e5e5e5',
          dark: '#262626',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
