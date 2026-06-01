import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:         '#0F1A2E',
        amber:        '#C5743A',
        'amber-dark': '#A05A26',
        'amber-light':'#F1DEC4',
        paper:        '#FAF7F1',
        ink:          '#1F2B42',
        'ink-soft':   '#4A5568',
        moss:         '#4F6A4A',
        'moss-light': '#E8F0E8',
      },
      fontFamily: {
        sans:  ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero':    ['4.25rem', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        'hero-md': ['3rem',    { lineHeight: '1.08', letterSpacing: '-0.035em' }],
        'h2':      ['2.25rem', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'h3':      ['1.5rem',  { lineHeight: '1.2',  letterSpacing: '-0.015em' }],
        // keep existing scale for backward compat
        'display-xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        'display-lg': ['3.5rem',  { lineHeight: '1.08', letterSpacing: '-0.035em' }],
        'display-md': ['2.75rem', { lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        'display-sm': ['2rem',    { lineHeight: '1.15', letterSpacing: '-0.025em' }],
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 24px rgba(0,0,0,0.10), 0 1px 6px rgba(0,0,0,0.06)',
        'amber':      '0 8px 32px rgba(197,116,58,0.25)',
      },
      maxWidth: { '8xl': '88rem' },
    },
  },
  plugins: [],
};

export default config;
