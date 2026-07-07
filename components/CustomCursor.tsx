'use client'

import { useEffect, useRef } from 'react'

type CursorLabel = 'BOOK' | 'VIEW' | 'OPEN' | 'EXPLORE' | ''

const interactiveSelector = [
  'a',
  'button',
  '[role="button"]',
  '[data-cursor]',
  '[data-gallery]',
  'img',
  'picture',
  'video',
  'iframe',
  'input',
  'select',
  'textarea',
  'summary',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const imageHrefPattern = /\.(avif|gif|jpe?g|png|webp)(\?.*)?$/i
const bookingPattern = /book|booking|bron|reserve|reservation|exely|room|xona/i

function getCursorLabel(element: Element): CursorLabel {
  const explicitLabel = element.getAttribute('data-cursor')?.trim().toUpperCase()

  if (explicitLabel === 'BOOK' || explicitLabel === 'VIEW' || explicitLabel === 'OPEN' || explicitLabel === 'EXPLORE') {
    return explicitLabel
  }

  const anchor = element.closest<HTMLAnchorElement>('a[href]')
  const elementText = [
    element.textContent,
    element.getAttribute('aria-label'),
    element.getAttribute('title'),
    element.getAttribute('class'),
    anchor?.href,
  ]
    .filter(Boolean)
    .join(' ')

  if (bookingPattern.test(elementText)) {
    return 'BOOK'
  }

  if (
    element.matches('img, picture, video, [data-gallery]') ||
    Boolean(anchor?.href && imageHrefPattern.test(anchor.href))
  ) {
    return 'VIEW'
  }

  if (anchor) {
    const href = anchor.getAttribute('href') ?? ''
    const isExternal =
      anchor.target === '_blank' ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')

    return isExternal ? 'OPEN' : 'EXPLORE'
  }

  return ''
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const ringRefPosition = useRef({ x: 0, y: 0 })
  const dotRefPosition = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const canUseCustomCursor =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      window.matchMedia('(min-width: 768px)').matches &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
      navigator.maxTouchPoints === 0

    if (!canUseCustomCursor) {
      return
    }

    const cursor = cursorRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    const label = labelRef.current

    if (!cursor || !ring || !dot || !label) {
      return
    }

    cursor.style.opacity = '1'

    const setHoverState = (nextLabel: CursorLabel) => {
      const hasLabel = nextLabel.length > 0

      label.textContent = nextLabel
      label.style.opacity = hasLabel ? '1' : '0'
      ring.style.width = hasLabel ? '72px' : '44px'
      ring.style.height = hasLabel ? '72px' : '44px'
      ring.style.borderColor = hasLabel ? 'rgba(245, 208, 126, 0.95)' : 'rgba(245, 208, 126, 0.72)'
      ring.style.backgroundColor = hasLabel ? 'rgba(245, 208, 126, 0.08)' : 'transparent'
      dot.style.transform = hasLabel ? 'translate3d(-50%, -50%, 0) scale(0.72)' : 'translate3d(-50%, -50%, 0) scale(1)'
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        cursor.style.opacity = '0'
        return
      }

      cursor.style.opacity = '1'
      targetRef.current.x = event.clientX
      targetRef.current.y = event.clientY
    }

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        return
      }

      const target = event.target

      if (!(target instanceof Element)) {
        setHoverState('')
        return
      }

      const interactiveElement = target.closest(interactiveSelector)
      setHoverState(interactiveElement ? getCursorLabel(interactiveElement) : '')
    }

    const handlePointerLeave = () => {
      cursor.style.opacity = '0'
      setHoverState('')
    }

    const animate = () => {
      ringRefPosition.current.x += (targetRef.current.x - ringRefPosition.current.x) * 0.18
      ringRefPosition.current.y += (targetRef.current.y - ringRefPosition.current.y) * 0.18
      dotRefPosition.current.x += (targetRef.current.x - dotRefPosition.current.x) * 0.42
      dotRefPosition.current.y += (targetRef.current.y - dotRefPosition.current.y) * 0.42

      ring.style.transform = `translate3d(${ringRefPosition.current.x}px, ${ringRefPosition.current.y}px, 0) translate3d(-50%, -50%, 0)`
      dot.style.left = `${dotRefPosition.current.x}px`
      dot.style.top = `${dotRefPosition.current.y}px`

      rafRef.current = window.requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerover', handlePointerOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', handlePointerLeave)
    rafRef.current = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerover', handlePointerOver)
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave)

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2147483647] hidden opacity-0 transition-opacity duration-300 md:block"
    >
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-[#f5d07e]/70 shadow-[0_0_28px_rgba(245,208,126,0.28)] transition-[width,height,border-color,background-color] duration-300 ease-out will-change-transform"
      >
        <span
          ref={labelRef}
          className="select-none font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-[#f7dca1] opacity-0 transition-opacity duration-200"
        />
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#f5d07e] shadow-[0_0_18px_rgba(245,208,126,0.65)] transition-transform duration-200 ease-out will-change-[left,top,transform]"
      />
    </div>
  )
}
