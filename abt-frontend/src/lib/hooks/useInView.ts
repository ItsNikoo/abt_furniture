'use client'

import {useEffect, useRef, useState} from 'react'

interface UseInViewOptions {
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView({rootMargin = '0px', triggerOnce = true}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      {rootMargin}
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, triggerOnce])

  return {ref, inView}
}