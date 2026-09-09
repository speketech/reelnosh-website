import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // Keep Tailwind defaults but add an explicit tablet breakpoint.
      // 'sm' = 640px (small phones landscape / large phones)
      // 'md' = 768px (tablet portrait min)
      // 'tablet' = 834px (iPad Pro 11" portrait — design reference for tablet-specific layouts)
      // 'lg' = 1024px (tablet landscape / small desktop)
      // 'xl' = 1280px, '2xl' = 1536px
      'sm': '640px',
      'md': '768px',
      'tablet': '834px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        clay: {
          DEFAULT: 'var(--color-clay)',
          hover: 'var(--color-clay-hover)',
          pressed: 'var(--color-clay-pressed)',
          80: 'var(--color-clay-80)',
          120: 'var(--color-clay-120)',
        },
        cocoa: 'var(--color-cocoa)',
        neutral: {
          warmWhite: 'var(--color-warm-white)',
          softCream: 'var(--color-soft-cream)',
          lightClay: 'var(--color-light-clay)',
          clayGray: 'var(--color-clay-gray)',
          charcoal: 'var(--color-charcoal)',
        },
        accent: {
          spicePop: 'var(--color-spice-pop)',
        },
        feedback: {
          success: 'var(--color-success)',
          urgency: 'var(--color-urgency)',
          error: 'var(--color-error)',
        },
        seasonal: {
          palmCream: 'var(--color-palm-cream)',
        },
        focusRing: 'var(--color-focus-ring)',
        secondaryCta: {
          border: 'var(--color-secondary-cta-border)',
          hoverBackground: 'var(--color-secondary-cta-hover-bg)',
        },
        surface: {
          altWarmWhite: 'var(--color-surface-alt)',
          divider: 'var(--color-surface-divider)',
          successTint: 'var(--color-surface-success-tint)',
        },
        interaction: {
          disabledBackground: 'var(--color-disabled-bg)',
          disabledText: 'var(--color-disabled-text)',
          selectedBackground: 'var(--color-selected-bg)',
        },
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
        sans: ['var(--font-figtree)', 'Figtree', 'sans-serif'],
      },
      fontSize: {
        // DESIGN_OVERRIDES §1: consolidated 9-step type scale
        'display': ['48px', { lineHeight: '1.15', fontWeight: '600' }],  // Hero H1
        'title': ['36px', { lineHeight: '1.2', fontWeight: '600' }],  // All section H2s
        'quote': ['24px', { lineHeight: '1.5', fontWeight: '400' }],  // Pull-quotes (all contexts)
        'subtitle': ['20px', { lineHeight: '1.4', fontWeight: '500' }],  // Drop step titles
        'card-title': ['22px', { lineHeight: '1.3', fontWeight: '600' }],  // All card headings
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
