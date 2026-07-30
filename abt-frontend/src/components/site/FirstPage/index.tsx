'use client'

import { motion } from 'framer-motion'
import SiteContainer from '@/components/SiteContainer'
import FirstMainContainer from '@/components/site/FirstPage/FirstMainContainer'

export default function FirstPage() {
  return (
    <section className="relative z-10 overflow-hidden py-3 md:py-4 xl:min-h-[calc(100vh-80px)] xl:py-5">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 -z-10"
        style={{ backgroundImage: "url('/background_image.webp')" }}
      />

      <SiteContainer>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="flex items-stretch xl:min-h-[calc(100vh-120px)]"
        >
          <FirstMainContainer />
        </motion.div>
      </SiteContainer>
    </section>
  )
}
