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
        navy:        '#0F1A2E',
        amber:       '#C5743A',
        'amber-dark':'#A05A26',
        paper:       '#FAF7F1',
        ink:         '#1F2B42',
        moss:        '#4F6A4A',
      },
      fontFamily: {
        sans:  ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        'display-lg': ['3.5rem',  { lineHeight: '1.08', letterSpacing: '-0.035em' }],
        'display-md': ['2.75rem', { lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        'display-sm': ['2rem',    { lineHeight: '1.15', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
