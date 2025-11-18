import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "500px",
      },
      colors: {
        brand: {
          "100": "#fdfdfe",
          "200": "#f7f9ff",
          "300": "#edf2fe",
          "400": "#dfeaff",
          "500": "#d0dfff",
          "600": "#bdd1ff",
          "700": "#a6bff9",
          "800": "#87a5ef",
          "900": "#3d63dd",
          "1000": "#3657c3",
          "1001": "#395bc7",
          "1002": "#1d2e5c",
          DEFAULT: "#001347e2",
          a1: "#00008002",
          a2: "#0040ff08",
          a3: "#0047f112",
          a4: " #0058ff20",
          a5: "#0052ff2f",
          a6: "#004eff42",
          a7: "#0048ee59",
          a8: " #0040dd78",
          a9: " #0032d2c2",
          a10: "#002ab3c9",
          a11: "#002cb7c6",
          a12: "#001347e2",
        },
        grey: {
          "2": "#f9f9fb",
          "3": "#eff0f3",
          "4": "#e7e8ec",
          "5": "#e0e1e6",
          "6": "#d8d9e0",
          "7": "#cdced7",
          "8": "#b9bbc6",
          "9": "#8b8d98",
          "10": "#80828d",
          "11": "#62636c",
          "12": "#1e1f24",
          "400": "#DBDBDB",
          "500": "#656565",
          "600": "#96a6b7",
          "650": "#333333",
          "700": "#F6F6F6",
          "800": "#141414",
          surface: "#ffffffcc",
        },
        warning: {
          "100": "#FFE29A",
          "200": "#FFD468",
          "300": "#FFC535",
          "400": "#FFB703",
          "500": "#CC9202",
          "600": "#996E02",
          DEFAULT: "#ced613",
        },
        error: {
          DEFAULT: "#d6132a",
          surface: "#FFEAEA",
          600: "#DD0000",
        },
        success: {
          DEFAULT: "#00dd66",
          surface: "#EDFFED",
          400: "#6CD76C",
          600: "#008000",
        },
        accent: {
          "100": "#EBEFF9",
          "200": "#D7DEF4",
          "300": "#C4CEEE",
          "400": "#B0BDE9",
          "500": "#889DDD",
          "600": "#617CD2",
          "700": "#395BC7",
          "800": "#2E499F",
          "900": "#223777",
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#0043BE",
          "50": "#F4F8FF",
          "100": "#F5F8FF",
          "150": "#D9E3F8",
          "180": "#F9FBFC",
          "190": "#E6E8EA",
          "200": "#AFCAFC",
          "250": "#8FC7F5",
          "260": "#008CFF",
          "300": "#2E6BCE",
          "400": "#0043BE",
          foreground: "hsl(var(--primary-foreground))",
        },
        purple: {
          800: "#800080",
          750: "#CB36CB",
          700: "#CC6FCC",
          600: "#FABEE8",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "boost-career-pattern": "url('/assets/images/shape-bg.png')",
        "auth-bg":
          "url('/assets/images/auth-bg.webp'), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",
        "gradient-45": "linear-gradient(205deg, var(--tw-gradient-stops))",
      },
      animation: {
        "gradient-bg": "gradient 5s ease infinite",
        "fade-in-up": "fadeInUp 1s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        gradient: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
