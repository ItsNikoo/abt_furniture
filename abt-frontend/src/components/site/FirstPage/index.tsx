'use client'

import { motion } from 'framer-motion'
import SiteContainer from '@/components/SiteContainer'
import FirstMainContainer from '@/components/site/FirstPage/FirstMainContainer'
import { fadeInView } from '@/lib/animations'

export default function FirstPage() {
  return (
    <section className="relative z-10 overflow-hidden py-3 md:py-4 xl:min-h-[calc(100vh-80px)] xl:py-5">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 -z-10"
        style={{ backgroundImage: "url('/background_image.webp')" }}
      />

      <SiteContainer>
        <motion.div
          {...fadeInView}
          className="flex items-stretch xl:min-h-[calc(100vh-120px)]"
        >
          <FirstMainContainer />
        </motion.div>
      </SiteContainer>
    </section>
  )
}
