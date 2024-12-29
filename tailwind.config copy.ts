import {nextui} from "@nextui-org/react";
import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/breadcrumbs/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen2': 'calc(100vh - 64px)',
      },
      colors: {
        "orange": {
          900: "#C56733",
        }
      },
      screens: {
        'xxs':{'max': '420px'},
        'xs': { 'max': '640px' },
        'small' :{ 'min':'641px', 'max': '870px'},
        'medium' : {'min': '871px', 'max':'1275px'},
        'large' : {'min':'1275px'},
        'nav-lap': { 'min': '1070px' },
        'lg': { min: '1024px' },
        'md': { min: "768px" },
      },
      maxWidth: {
        "main": "1306px",
      },
      fontSize: {
        // "4xl": "64px",
        // "3xl": "48.79px",
        // "2xl": "39.94px",
        // "xl": "32px",
        // "l": "39.94px",
        // "m": "20px",
        // "md": "17px",
        // "s": "14px",
        // "xs": "12px",
        "5xl": "2.6rem",
        "6xl": "4.2rem",
      },
      textColor: {
        "primary": "#FFFFFF",
        "secondary": "#FFD992",
        "caption": "rgba(255, 255, 255, 0.5)",
        "theme": {
          900: "#012828"
        },
      },
      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, minmax(170px, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [nextui({
    defaultTheme: "dark",
    prefix: "nextui",
    addCommonColors: true,
    themes: {
      light: {
        // extend: "light",
        
      },
      dark: {
        extend: "dark",
        
        colors: {
          content4: {
            DEFAULT: "#FFFFFF",
            "900": "#FFFFFF",
            "800": "#FFFFFF",
            "700": "#FFFFFF",
            "600": "#FFFFFF",
            "500": "#FFFFFF",
            "400": "#FFFFFF",
            "300": "#FFFFFF",
            "200": "#FFFFFF",
            "100": "#FFFFFF",
            "50": "#FFFFFF",
          },
          primary: {
            DEFAULT: "#012828",
            "900": "#012828",
            "800": "#022D2E",
            "700": "#023435",
          },
          secondary: {
            DEFAULT: "#FFB84E",
            900: "#FFB84E",
            800: "#FFD992",
          },
          warning: {
            DEFAULT: "#ff1b1b",
            "900": "#ff1b1b",
          },
          danger: {
            DEFAULT: "#ff1b1b",
            "900": "#ff1b1b"
          }
        }
      },
    },
  })],
}
export default config
