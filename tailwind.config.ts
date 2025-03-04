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
          "1": "#fcfcfd",
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
          "600": "#96a6b7",
          a1: "#00005503",
          a2: "#00005506",
          a3: "#00104010",
          a4: "#000b3618",
          a5: "#0009321f",
          a6: "#00073527",
          a7: "#00063332",
          a8: "#00083046",
          a9: "#00051d74",
          a10: " #00051b7f",
          a11: " #0002119d",
          a12: " #000107e1",
          surface: " #ffffffcc",
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
        },
        success: {
          DEFAULT: "#00dd66",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        "courses-hero": "url('/assets/images/wo.jpg')",
        "institution-benefits": "url('/assets/images/school.jpg')",
        "high-sch-course":
          "url('/assets/images/high-school.jpg'), linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5))",
        "primary-sch-course":
          "url('/assets/images/elementary.jpg'), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",
        "uni-course":
          "url('/assets/images/university.jpg'), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",
        "assistant-course":
          "url('/assets/images/mentor1.jpg'), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",
        "auth-bg":
          "url('/assets/images/img14.jpg'), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",
        "auth-mentor":
          "url('/assets/images/img17.jpg'), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",
        "gradient-45": "linear-gradient(205deg, var(--tw-gradient-stops))",
      },
      animation: {
        "gradient-bg": "gradient 5s ease infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out",
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
