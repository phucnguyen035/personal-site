import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary), <alpha-value>)',
          light: 'hsl(var(--primary-light), <alpha-value>)',
          dark: 'hsl(var(--primary-dark), <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
