'use client'

import RightPartOfFirstPage from '@/components/site/FirstPage/RightPartOfFirstPage'
import LeftPartOfFirstPage from '@/components/site/FirstPage/LeftPartOfFirstPage'
import ClientContainer from '@/components/site/FirstPage/ClientContainer'
import { motion } from 'framer-motion'

export default function FirstPage() {
  return (
    <div className="relative md:px-16 lg:px-24 z-10 flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 -z-10"
        style={{ backgroundImage: 'url(\'/background_image.webp\')' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        className="flex lg:flex-row flex-col justify-center items-stretch pt-10 pb-5 h-full">
        <LeftPartOfFirstPage/>
        <RightPartOfFirstPage/>
      </motion.div>
      <div className="relative w-full z-10 hidden lg:block">
        {/* Новый блок на всю ширину */}
        <ClientContainer/>
      </div>
    </div>
  )
}
