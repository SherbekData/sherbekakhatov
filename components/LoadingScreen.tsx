'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#08120d]">
      <div className="text-center">
        <div className="mb-6 text-5xl font-medium uppercase tracking-[0.18em] text-[#f5f0e8]">
          Miraki
        </div>
        <div className="text-4xl font-medium uppercase tracking-[0.2em] text-[#d4af37]">
          Gardens
        </div>

        <div className="mx-auto mt-8 h-px w-64 overflow-hidden bg-white/10">
          <div className="h-full w-full animate-[loadingLine_1.2s_ease-in-out_forwards] bg-[#d4af37]" />
        </div>
      </div>
    </div>
  )
}
