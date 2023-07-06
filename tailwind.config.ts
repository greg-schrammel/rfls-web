import type { Config } from 'tailwindcss/types'

export default {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: `var(--font-sans)`,
    },
    // fontMetrics: {
    //   sans: {
    //     capHeight: 2048,
    //     ascent: 2728,
    //     descent: -680,
    //     lineGap: 0,
    //     unitsPerEm: 2816,
    //   },
    // },
  },
  plugins: [require('tailwindcss-capsize'), require('tailwindcss-animate')],
} satisfies Config
