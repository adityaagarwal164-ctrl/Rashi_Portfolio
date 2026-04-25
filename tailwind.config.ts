import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ink-black':    'rgb(var(--c-ink-black)   / <alpha-value>)',
        'charcoal':     'rgb(var(--c-charcoal)    / <alpha-value>)',
        'charcoal-soft':'rgb(var(--c-charcoal-soft)/<alpha-value>)',
        'ivory':        'rgb(var(--c-ivory)        / <alpha-value>)',
        'ivory-muted':  'rgb(var(--c-ivory-muted) / <alpha-value>)',
        'beige-warm':   'rgb(var(--c-beige-warm)  / <alpha-value>)',
        'gold':         'rgb(var(--c-gold)         / <alpha-value>)',
        'gold-bright':  'rgb(var(--c-gold-bright) / <alpha-value>)',
        'gold-deep':    'rgb(var(--c-gold-deep)   / <alpha-value>)',
        'wa-green':     'rgb(var(--c-wa-green)    / <alpha-value>)',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        inter:     ['Inter', 'sans-serif'],
        italiana:  ['Italiana', 'serif'],
      },
      maxWidth: {
        container: '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;
