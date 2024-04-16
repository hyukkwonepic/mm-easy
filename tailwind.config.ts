import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bgColor1: '#FDF8F1',
        bgColor2: '#F0F7FF',
        bgColor3: '#FFF0EF',
        pointColor1: '#2B84ED',
        pointColor2: '#FF8878',
        pointColor3: '#D9D9D9',
        pointColor4: '#8dbdf6',
        blackColor: '#2E2E2E',
        grayColor: '#D9D9D9'
      },
    },
    backgroundSize: { md: '80%', cover: 'cover' }
  },
  darkMode: 'class',
  plugins: [nextui()]
};
export default config;
