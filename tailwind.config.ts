import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      display: ["-webkit-box"],
      scrollbar: {
        none: {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      // prefix: 'sincui',
      themes: {
        dark: {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            primary: "#5D28A4",
            secondary: "#DD98D7",
            overlay: "rgba(0, 0, 0, 0.3)",
            purple: {
              100: "#c4aae7",
            },
          },
        },
        light: {
          extend: "light", // <- inherit default values from dark theme
          colors: {
            primary: "#5D28A4",
            secondary: "#DD98D7",
            overlay: "rgba(0, 0, 0, 0.3)",
            purple: {
              100: "#E4D4F4",
            },
          },
        },
      },
    } as Parameters<typeof nextui>[0]),
    typography,
    lineClamp,
  ],
};
export default config;
