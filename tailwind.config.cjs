/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"], .dark'],
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './app/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './pages/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './components/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './lib/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'tablet': '834px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        // LIGHT: #FFF5FA — Warm White page background.
        // DARK: #1E1B18 — replaces Warm White as the primary canvas.
        rn: {
          canvas: 'var(--rn-dark-canvas)',
          surface: 'var(--rn-dark-surface)',
          raised: 'var(--rn-dark-surface-raised)',
          divider: 'var(--rn-dark-divider)',
          'brand-surface': 'var(--rn-dark-brand-surface)',
          'brand-surface-pressed': 'var(--rn-dark-brand-surface-pressed)',
          'text-primary': 'var(--rn-dark-text-primary)',
          'text-secondary': 'var(--rn-dark-text-secondary)',
          'text-muted': 'var(--rn-dark-text-muted)',
          'accent-energy': 'var(--rn-dark-accent-energy)',
          'accent-warmth': 'var(--rn-dark-accent-warmth)',
          'accent-clay': 'var(--rn-dark-accent-clay)',
          base: 'rgb(var(--rn-dark-base) / <alpha-value>)',

          // LIGHT: #F7F3ED — Soft Cream elevated surface.
          // DARK: #2A211D — replaces Soft Cream for dark elevated surfaces.
          surface: 'rgb(var(--rn-dark-surface) / <alpha-value>)',

          // LIGHT: #E7DED5 — Light Clay borders / disabled surfaces.
          // DARK: #342620 — replaces Light Clay for raised dark panels.
          raised: 'rgb(var(--rn-dark-surface-raised) / <alpha-value>)',

          // LIGHT: #E7DED5 — Light Clay borders and dividers.
          // DARK: #4A352E — replaces Light Clay as the dark divider token.
          divider: 'rgb(var(--rn-dark-divider) / <alpha-value>)',

          // LIGHT: #8B3A2A — Deep Clay primary identity colour.
          // DARK: preserved as the primary brand colour.
          clay: 'rgb(var(--rn-deep-clay) / <alpha-value>)',

          // LIGHT: #743022 — Deep Clay 120 tonal depth.
          // DARK: preserved as the pressed / deep tonal brand state.
          'clay-120': 'rgb(var(--rn-deep-clay-120) / <alpha-value>)',

          // LIGHT: #A45A4B — Deep Clay 80 watermark / subtle signature.
          // DARK: preserved as the soft brand signature.
          'clay-80': 'rgb(var(--rn-deep-clay-80) / <alpha-value>)',

          // LIGHT: #5A2418 — Spiced Cocoa structural colour.
          // DARK: preserved for controlled warm panels and editorial framing.
          cocoa: 'rgb(var(--rn-spiced-cocoa) / <alpha-value>)',

          // LIGHT: #FFF5FA — Warm White primary text on dark-compatible surfaces.
          // DARK: preserved as primary text on Dark Charcoal.
          'text-primary': 'rgb(var(--rn-text-primary) / <alpha-value>)',

          // LIGHT: #F7F3ED — Soft Cream supporting text.
          // DARK: preserved as secondary text.
          'text-secondary': 'rgb(var(--rn-text-secondary) / <alpha-value>)',

          // LIGHT: #E7DED5 — Light Clay low-priority text / disabled surface.
          // DARK: #C9BDB4 — replaces Light Clay for readable tertiary text.
          'text-tertiary': 'rgb(var(--rn-text-tertiary) / <alpha-value>)',

          // LIGHT: #6B665F — Clay Gray secondary text.
          // DARK: #B9ADA4 — replaces Clay Gray with a lighter dark-mode counterpart.
          'text-muted': 'rgb(var(--rn-text-muted) / <alpha-value>)',

          // LIGHT: #E7DED5 — Light Clay disabled background.
          // DARK: #4A403A — replaces Light Clay for disabled dark controls.
          'disabled-bg': 'rgb(var(--rn-disabled-bg) / <alpha-value>)',

          // LIGHT: #9A948C — Disabled Text.
          // DARK: #8E837B — replaces Disabled Text for dark disabled controls.
          'disabled-text': 'rgb(var(--rn-disabled-text) / <alpha-value>)',

          // LIGHT: #F9F3F1 — Selected State.
          // DARK: #3C2B25 — replaces Selected State for selected dark surfaces.
          selected: 'rgb(var(--rn-selected) / <alpha-value>)',

          // LIGHT: #F4A11A — Spice Pop participation energy.
          // DARK: preserved unchanged for notification and activity sparks.
          pop: 'rgb(var(--rn-spice-pop) / <alpha-value>)',

          // LIGHT: #5F8B4C — Fresh Basil success colour.
          // DARK: #9BC47E — lighter replacement for readable success text.
          success: 'rgb(var(--rn-success) / <alpha-value>)',

          // LIGHT: #B84D1B — Burnt Pepper limited-availability colour.
          // DARK: #F09A5C — lighter replacement for readable dark-mode indicators.
          limited: 'rgb(var(--rn-limited) / <alpha-value>)',

          // LIGHT: #B44C42 — Muted Terracotta error / warning colour.
          // DARK: #E58B83 — lighter replacement for readable dark-mode feedback text.
          error: 'rgb(var(--rn-error) / <alpha-value>)',

          // LIGHT: #D79A8A — Focus Ring.
          // DARK: preserved unchanged for visible keyboard focus.
          focus: 'rgb(var(--rn-focus) / <alpha-value>)',

          // LIGHT: #F4C16D — Palm Cream seasonal warmth.
          // DARK: preserved unchanged as a restrained atmospheric highlight.
          seasonal: 'rgb(var(--rn-seasonal) / <alpha-value>)',
        },

        // Direct semantic aliases for convenient utility classes.
        // LIGHT: Warm White #FFF5FA; DARK: Dark Charcoal #1E1B18.
        canvas: 'rgb(var(--rn-dark-base) / <alpha-value>)',
        // LIGHT: Deep Charcoal #1E1B18 as primary text; DARK: Warm White #FFF5FA.
        ink: 'rgb(var(--rn-text-primary) / <alpha-value>)',
        // LIGHT: Deep Clay #8B3A2A; DARK: Deep Clay #8B3A2A.
        brand: 'rgb(var(--rn-deep-clay) / <alpha-value>)',

        // Legacy / component compatibility mappings
        clay: {
          DEFAULT: 'var(--color-clay)',
          hover: 'var(--color-clay-hover)',
          pressed: 'var(--color-clay-pressed)',
          80: 'var(--color-clay-80)',
          120: 'var(--color-clay-120)',
          deep: '#8B3A2A',
          deepHover: '#743022',
          deepPressed: '#5F261A',
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
      backgroundColor: {
        // LIGHT: Warm White #FFF5FA; DARK: Dark Charcoal #1E1B18.
        'rn-canvas': 'rgb(var(--rn-dark-base) / <alpha-value>)',
        // LIGHT: Soft Cream #F7F3ED; DARK: Night Cocoa #2A211D.
        'rn-surface': 'rgb(var(--rn-dark-surface) / <alpha-value>)',
        // LIGHT: Light Clay #E7DED5; DARK: Roasted Clay #342620.
        'rn-raised': 'rgb(var(--rn-dark-surface-raised) / <alpha-value>)',
      },
      textColor: {
        // LIGHT: Deep Charcoal #1E1B18; DARK: Warm White #FFF5FA.
        'rn-primary': 'rgb(var(--rn-text-primary) / <alpha-value>)',
        // LIGHT: Clay Gray #6B665F; DARK: Clay Gray Dark #B9ADA4.
        'rn-muted': 'rgb(var(--rn-text-muted) / <alpha-value>)',
      },
      borderColor: {
        // LIGHT: Light Clay #E7DED5; DARK: Cocoa Divider #4A352E.
        'rn-divider': 'rgb(var(--rn-dark-divider) / <alpha-value>)',
        // LIGHT: Focus Ring #D79A8A; DARK: Focus Ring #D79A8A.
        'rn-focus': 'rgb(var(--rn-focus) / <alpha-value>)',
      },
      ringColor: {
        // LIGHT: Focus Ring #D79A8A; DARK: Focus Ring #D79A8A.
        'rn-focus': 'rgb(var(--rn-focus) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
        sans: ['var(--font-figtree)', 'Figtree', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.15', fontWeight: '600' }],
        'title': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
        'quote': ['24px', { lineHeight: '1.5', fontWeight: '400' }],
        'subtitle': ['20px', { lineHeight: '1.4', fontWeight: '500' }],
        'card-title': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
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
