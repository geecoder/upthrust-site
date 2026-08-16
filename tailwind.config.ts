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
        // Brand tokens — see app/globals.css for the full raw+semantic palette
        ink:      { 50:'#F2F4F7', 100:'#D9DEE6', 200:'#AFB8C6', 300:'#808EA3', 400:'#536478', 500:'#2F3F54', 600:'#1D2C3F', 700:'#11202F', 800:'#0B1A2B', 900:'#060F1A', DEFAULT:'#0B1A2B' },
        bone:     { DEFAULT: '#F4EFE6', dim: '#ECE5D6' },
        paper:    { DEFAULT: '#FAFAF7', dim: '#F1F0EA' },
        seal:     { 50:'#FBEEE7', 100:'#F4D3C3', 300:'#DE8B6A', 500:'#B4472B', 600:'#9A3A22', 700:'#7A2C18', DEFAULT:'#B4472B' },
        moss:     { 50:'#E8EFE9', 500:'#2F5D3A', 700:'#1F4026', DEFAULT:'#2F5D3A' },
        ochre:    { 50:'#F5EEDB', 500:'#B48A2E', 700:'#7E5F18', DEFAULT:'#B48A2E' },
        crimson:  { 50:'#F4E1E1', 500:'#9B2C2C', 700:'#6B1818', DEFAULT:'#9B2C2C' },
        // Legacy aliases so existing bg-navy / text-amber utility classes keep working
        navy:         '#0B1A2B',
        amber:        '#B4472B',
        'amber-dark': '#9A3A22',
        'amber-light':'#F4D3C3',
        'ink-soft':   '#2F3F54',
      },
      fontFamily: {
        sans:  ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono:  ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        1: '2px', 2: '4px', 3: '8px', 4: '12px',
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
