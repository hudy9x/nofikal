import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        second: {
          '50': '#f7f7f6',
          '100': '#e5e4e2',
          '200': '#cac9c5',
          '300': '#a8a7a0',
          '400': '#86857b',
          '500': '#6b6a61',
          '600': '#55544c',
          '700': '#46453f',
          '800': '#3a3a35',
          '900': '#32322f',
          '950': '#272723',
        },
        prime: {
          '50': '#fcf7f0',
          '100': '#f7ecdd',
          '200': '#efd7b9',
          '300': '#e5ba8c',
          '400': '#d9965e',
          '500': '#d07c3f',
          '600': '#c26634',
          '700': '#ae5630',
          '800': '#82412a',
          '900': '#693725',
          '950': '#381a12',
        }
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
