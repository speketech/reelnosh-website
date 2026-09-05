import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          DEFAULT: '#8B3A2A',
          hover: '#743022',
          pressed: '#5F261A',
          80: '#A45A4B',
          120: '#743022',
        },
        cocoa: '#5A2418',
        neutral: {
          warmWhite: '#FFFEFA',
          softCream: '#F7F3ED',
          lightClay: '#E7DED5',
          clayGray: '#6B665F',
          charcoal: '#1E1B18',
        },
        accent: {
          spicePop: '#F4A11A',
        },
        feedback: {
          success: '#5F8B4C',
          urgency: '#B84D1B',
          error: '#B44C42',
        },
        seasonal: {
          palmCream: '#F4C16D',
        },
        focusRing: '#D79A8A',
        secondaryCta: {
          border: '#D8B2A8',
          hoverBackground: '#F9F3F1',
        },
        surface: {
          altWarmWhite: '#FCFAF7',
          divider: '#DCCFC4',
          successTint: '#EAF3EB',
        },
        interaction: {
          disabledBackground: '#E7DED5',
          disabledText: '#9A948C',
          selectedBackground: '#F9F3F1',
        },
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
        sans: ['var(--font-figtree)', 'Figtree', 'sans-serif'],
      },
      fontSize: {
        // DESIGN_OVERRIDES §1 — consolidated 9-step type scale
        'display':    ['48px', { lineHeight: '1.15', fontWeight: '600' }],  // Hero H1
        'title':      ['36px', { lineHeight: '1.2',  fontWeight: '600' }],  // All section H2s
        'quote':      ['24px', { lineHeight: '1.5',  fontWeight: '400' }],  // Pull-quotes (all contexts)
        'subtitle':   ['20px', { lineHeight: '1.4',  fontWeight: '500' }],  // Drop step titles
        'card-title': ['22px', { lineHeight: '1.3',  fontWeight: '600' }],  // All card headings
        // body (16px), body-small (14px), caption (13px), eyebrow (12px) use Tailwind defaults
      },
      boxShadow: {
        elevation1: '0px 2px 8px rgba(0, 0, 0, 0.06)',
        elevation2: '0px 4px 12px rgba(0, 0, 0, 0.08)',
      },
      maxWidth: {
        desktopContent: '1120px',
        mobileContent: '363px',
      },
      borderRadius: {
        brand: '12px',
        card: '16px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
