import { Inter, Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  weight: ['400', '500', '700', '800', '900'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
})

export const inter = Inter({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})
