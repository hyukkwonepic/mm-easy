import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bgColor1: '#FDF8F1',
        bgColor2: '#F0F7FF',
        pointColor1: '#2B84ED',
        pointColor2: '#FF8878',
        blackColor: '#2e2e2e'
      }
    }
  },
  plugins: []
};
export default config;
