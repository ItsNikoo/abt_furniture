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
      {/* Google Analytics */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-FTBKLVC334"
        strategy="afterInteractive"
      />
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
      
      {/* Яндекс Метрика */}
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
            ym(106436886, 'init', {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayer"
            });
          `,
        }}
      />
    </head>
    <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
      {children}
      
      {/* Noscript для Яндекс Метрики */}
      <noscript>
        <div>
          <img 
            src="https://mc.yandex.ru/watch/106436886" 
            style={{ position: 'absolute', left: '-9999px' }} 
            alt="" 
          />
        </div>
      </noscript>
    </body>
    </html>
  )
}
