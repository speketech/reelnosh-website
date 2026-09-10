import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
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
        rn: {
          canvas: 'var(--rn-bg-canvas)',
          surface: 'var(--rn-bg-surface)',
          raised: 'var(--rn-bg-surface-raised)',
          subtle: 'var(--rn-bg-subtle)',
          disabled: 'var(--rn-bg-disabled)',
          'text-primary': 'var(--rn-text-primary)',
          'text-secondary': 'var(--rn-text-secondary)',
          'text-muted': 'var(--rn-text-muted)',
          'text-disabled': 'var(--rn-text-disabled)',
          'text-on-brand': 'var(--rn-text-on-brand)',
          brand: 'var(--rn-brand)',
          'brand-hover': 'var(--rn-brand-hover)',
          'brand-pressed': 'var(--rn-brand-pressed)',
          'brand-subtle': 'var(--rn-brand-subtle)',
          border: 'var(--rn-border-default)',
          'border-strong': 'var(--rn-border-strong)',
          focus: 'var(--rn-focus)',
          energy: 'var(--rn-accent-energy)',
          warmth: 'var(--rn-accent-warmth)',
          success: 'var(--rn-success)',
          warning: 'var(--rn-warning)',
          error: 'var(--rn-error)',
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
        'rn-soft': 'var(--rn-shadow-soft)',
      },
      maxWidth: {
        desktopContent: '1120px',
        mobileContent: '363px',
      },
      borderRadius: {
        brand: '12px',
        card: '16px',
        pill: '9999px',
        'rn-sm': 'var(--rn-radius-sm)',
        'rn-md': 'var(--rn-radius-md)',
        'rn-lg': 'var(--rn-radius-lg)',
      },
    },
  },
  plugins: [],
};

export default config;
