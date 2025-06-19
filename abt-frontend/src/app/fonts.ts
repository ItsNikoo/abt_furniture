import { Montserrat, Orelega_One, Overpass } from 'next/font/google'

export const orelegaOne = Orelega_One({
  weight: ['400'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-orelega-one',
})

export const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
})

export const overpass = Overpass({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-overpass',
})
