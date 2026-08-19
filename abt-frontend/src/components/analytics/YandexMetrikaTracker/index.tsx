'use client'

import {useEffect, useMemo, useRef} from 'react'
import {usePathname, useSearchParams} from 'next/navigation'

const COUNTER_ID = 106436886
const MAX_SEND_ATTEMPTS = 20
const RETRY_DELAY_MS = 250

let lastTrackedUrl: string | null = null

export default function YandexMetrikaTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousUrlRef = useRef<string | null>(null)

  const url = useMemo(() => {
    const queryString = searchParams.toString()
    return `${pathname}${queryString ? `?${queryString}` : ''}`
  }, [pathname, searchParams])

  useEffect(() => {
    let isCancelled = false
    let attempts = 0

    const sendHit = () => {
      if (isCancelled || lastTrackedUrl === url) {
        return
      }

      if (window.ym) {
        const referer = previousUrlRef.current ?? document.referrer

        window.ym(COUNTER_ID, 'hit', url, {
          title: document.title,
          referer,
        })

        previousUrlRef.current = url
        lastTrackedUrl = url
        return
      }

      attempts += 1

      if (attempts < MAX_SEND_ATTEMPTS) {
        window.setTimeout(sendHit, RETRY_DELAY_MS)
      }
    }

    sendHit()

    return () => {
      isCancelled = true
    }
  }, [url])

  return null
}
