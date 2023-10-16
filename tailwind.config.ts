import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f0fbff',
          '100': '#e1f5fe',
          '200': '#b9ebfe',
          '300': '#7cd9fd',
          '400': '#38c0fa',
          '500': '#0c9fe9',
          '600': '#0074c2',
          '700': '#0f395c',
          '800': '#0f2a43',
          '900': '#0f2033',
          '950': '#060b14',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
