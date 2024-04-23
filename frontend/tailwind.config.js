/** @type {import('tailwindcss').Config} */

import typography from "@tailwindcss/typography"
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1c1917",

          "secondary": "#0891b2",

          "accent": "#22c55e",

          "neutral": "#1c1917",

          "base-100": "#f3f4f6",

          "info": "#4338ca",

          "success": "#15803d",

          "warning": "#eab308",

          "error": "#c2410c",
        },
      },
    ],
  },
  plugins: [
    typography,
    daisyui
  ],
}

