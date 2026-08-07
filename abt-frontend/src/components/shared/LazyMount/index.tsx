'use client'

import {ReactNode} from 'react'
import {useInView} from "@/lib/hooks/useInView"

interface LazyMountProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
}

export default function LazyMount({children, fallback, rootMargin = '0px 0px 800px 0px'}: LazyMountProps) {
  const {ref, inView} = useInView({rootMargin, triggerOnce: true})

  return (
    <div ref={ref}>
      {inView ? children : fallback}
    </div>
  )
}