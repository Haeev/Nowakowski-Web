import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        "fg-muted": "rgb(var(--fg-muted) / <alpha-value>)",
        "fg-subtle": "rgb(var(--fg-subtle) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong) / <alpha-value>)",
        brand: {
          DEFAULT: "#AB19F5",
          50: "#FBF1FE",
          100: "#F5DDFE",
          200: "#EBBAFD",
          300: "#DC8DFB",
          400: "#C45CF8",
          500: "#AB19F5",
          600: "#900AD2",
          700: "#7508A9",
          800: "#5E0985",
          900: "#4B0768",
        },
        "brand-red": {
          DEFAULT: "#F51934",
          400: "#F84D63",
          500: "#F51934",
          600: "#D40924",
        },
      },
      fontFamily: {
        display: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "800" }],
        "display-md": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "800" }],
        "display-lg": ["5rem", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-xl": ["6.5rem", { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "800" }],
      },
      boxShadow: {
        brand: "0 10px 30px rgba(171, 25, 245, 0.18), 0 4px 12px rgba(171, 25, 245, 0.10)",
        "brand-glow": "0 0 24px rgba(171, 25, 245, 0.35)",
        soft: "0 4px 12px rgba(171, 25, 245, 0.08)",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #AB19F5 0%, #F51934 100%)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
}

export default config
