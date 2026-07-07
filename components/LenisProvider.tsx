'use client'

import Lenis from 'lenis'
import { type ReactNode, useEffect } from 'react'

type LenisProviderProps = {
  children: ReactNode
}

const nativeScrollSelector = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'iframe',
  '[role="button"]',
  '[data-lenis-prevent]',
  '[data-radix-scroll-area-viewport]',
  '.be-form',
  '.be-search-form',
  '[class*="exely" i]',
  '[id*="exely" i]',
].join(',')

function shouldUseNativeScroll(node: HTMLElement) {
  return Boolean(node.closest(nativeScrollSelector))
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const canUseLenis =
      finePointerQuery.matches &&
      desktopQuery.matches &&
      !reducedMotionQuery.matches &&
      navigator.maxTouchPoints === 0

    if (!canUseLenis) {
      return
    }

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.085,
      wheelMultiplier: 0.9,
      prevent: shouldUseNativeScroll,
      anchors: {
        offset: 0,
        duration: 1.15,
        easing: (time) => 1 - Math.pow(1 - time, 3),
      },
    })

    let frameId = 0

    const raf = (time: number) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    frameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
