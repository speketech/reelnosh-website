import type { Config } from "tailwindcss";
import tokens from "./design/tokens.json";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          DEFAULT: tokens.color.clay.DEFAULT,
          hover: tokens.color.clay.hover,
          pressed: tokens.color.clay.pressed,
          80: tokens.color.clay["80"],
          120: tokens.color.clay["120"],
        },
        cocoa: tokens.color.cocoa,
        warmWhite: tokens.color.neutral.warmWhite,
        softCream: tokens.color.neutral.softCream,
        lightClay: tokens.color.neutral.lightClay,
        clayGray: tokens.color.neutral.clayGray,
        charcoal: tokens.color.neutral.charcoal,
        spicePop: tokens.color.accent.spicePop,
        success: tokens.color.feedback.success,
        urgency: tokens.color.feedback.urgency,
        error: tokens.color.feedback.error,
        palmCream: tokens.color.seasonal.palmCream,
        focusRing: tokens.color.focusRing,
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "sans-serif"],
        serif: ["var(--font-lora)", "serif"],
      },
      fontSize: {
        "ui-body": ["16px", { lineHeight: "1.5" }],
        "ui-label": ["13px", { lineHeight: "1.4" }],
        "ui-button": ["15px", { lineHeight: "1.2" }],
        "ui-heading": ["22px", { lineHeight: "1.3" }],
        "editorial-title": ["36px", { lineHeight: "1.2" }],
        "editorial-subtitle": ["22px", { lineHeight: "1.4" }],
        "editorial-body": ["17px", { lineHeight: "1.7" }],
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;

/**
 * Hard rules for anyone (human or agent) editing this file:
 * - Do NOT add Tailwind's default gray/blue/red/etc. palettes to any component.
 *   Every color used in this project must resolve to a token above.
 * - Do NOT add a `gradient` utility that targets `clay`, `cocoa`, or any brand color.
 * - Do NOT introduce a third font family.
 */
