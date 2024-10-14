import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#001347e2",

          100: "#fdfdfe",
          200: "#f7f9ff",
          300: "#edf2fe",
          400: "#dfeaff",
          500: "#d0dfff",
          600: "#bdd1ff",
          700: "#a6bff9",
          800: "#87a5ef",
          900: "#3d63dd",
          1000: "#3657c3",
          1001: "#395bc7",
          1002: "#1d2e5c",

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
          600: "#96a6b7",
        },
        warning: {
          DEFAULT: "#ced613",
        },
        error: {
          DEFAULT: "#d6132a",
        },
        success: {
          DEFAULT: "#00dd66",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
