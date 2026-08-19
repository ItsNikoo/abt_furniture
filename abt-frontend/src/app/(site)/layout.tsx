import type {Metadata} from 'next'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import Script from 'next/script'
import {Suspense} from 'react'
import YandexMetrikaTracker from '@/components/analytics/YandexMetrikaTracker'

export const metadata: Metadata = {
  title: 'АБТ мебель ',
  description: 'Производим качественную мебель на заказ в Москве. Кухни, прихожие, корпусная мебель от АБТ. Бесплатный замер, 3D-проект и гарантия на продукцию. Создаем мебель вашей мечты!',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function SiteLayout({children}: { children: React.ReactNode }) {
  return (
    <>
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
              defer:true,
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayer"
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <YandexMetrikaTracker/>
      </Suspense>
      <Header/>
      <main>{children}</main>
      <Footer/>
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/106436886"
            style={{position: 'absolute', left: '-9999px'}}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}
