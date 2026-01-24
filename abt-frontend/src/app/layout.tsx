import type {Metadata} from 'next'
import './globals.css'
import {inter, montserrat} from './fonts'
import Script from "next/script"

export const metadata: Metadata = {
  title: 'АБТ - мебель для кухни',
  description: 'Мебельная фабрика АБТ. Стиль и качество с 2002 года',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="ru">
    <head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FTBKLVC334"></Script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FTBKLVC334');
            `,
        }}
      />
      <title>АБТ - мебель для кухни</title>
    </head>
    <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
    {children}
    </body>
    </html>
  )
}
