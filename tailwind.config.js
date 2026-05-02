/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#f5f4f0',
          raised: '#ffffff',
          glass: 'rgba(0,0,0,0.03)',
          dark: '#0d0d12',
          'dark-raised': '#13131a',
          'dark-glass': 'rgba(255,255,255,0.03)',
        },
        ink: {
          DEFAULT: '#0f0e1a',
          secondary: '#4b4965',
          tertiary: '#8a88a0',
          dark: '#f0eff5',
          'dark-secondary': '#7b7a8e',
          'dark-tertiary': '#4a4960',
          'dark-muted': 'rgba(240,239,245,0.06)',
        },
        accent: {
          DEFAULT: '#7c6af7',
          bright: '#9d8fff',
          glow: 'rgba(124,106,247,0.25)',
          muted: 'rgba(124,106,247,0.08)',
          border: 'rgba(124,106,247,0.30)',
        },
        stroke: {
          DEFAULT: 'rgba(0,0,0,0.08)',
          bright: 'rgba(0,0,0,0.14)',
          dark: 'rgba(255,255,255,0.07)',
          'dark-bright': 'rgba(255,255,255,0.12)',
        },
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,106,247,0.18) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)',
        'qr-glow': 'radial-gradient(circle at 50% 50%, rgba(124,106,247,0.30) 0%, transparent 65%)',
        'accent-gradient': 'linear-gradient(135deg, #7c6af7 0%, #5e9af5 100%)',
      },
      boxShadow: {
        'glow-accent': '0 0 40px rgba(124,106,247,0.25), 0 0 80px rgba(124,106,247,0.10)',
        'glow-sm': '0 0 20px rgba(124,106,247,0.20)',
        'card': '0 1px 1px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-hover': '0 1px 1px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(124,106,247,0.15)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)',
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
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.glass-card': {
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--card-shadow)',
        },
      });
    },
  ],
};
