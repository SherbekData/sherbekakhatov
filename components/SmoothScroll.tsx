'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.matchMedia('(max-width: 767px)').matches

    if (prefersReducedMotion || isTouchDevice || isSmallScreen) {
      return
    }

    const root = document.documentElement
    const previousBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'smooth'

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof HTMLElement)) return

      const link = target.closest('a[href^="#"]')
      if (!(link instanceof HTMLAnchorElement)) return

      const href = link.getAttribute('href')
      if (!href || href === '#') return

      const section = document.querySelector(href)
      if (!(section instanceof HTMLElement)) return

      event.preventDefault()
      const top = section.getBoundingClientRect().top + window.scrollY - 86
      window.scrollTo({ top, behavior: 'smooth' })
    }

    document.addEventListener('click', onClick)

    return () => {
      root.style.scrollBehavior = previousBehavior
      document.removeEventListener('click', onClick)
    }
  }, [])

  return null
}
