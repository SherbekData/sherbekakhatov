'use client'

import { useState } from 'react'
import { Headphones, Instagram, MessageCircle, Send, X } from 'lucide-react'

const WHATSAPP_NUMBER = '998873378888'
const WHATSAPP_MESSAGE = "Salom, Miraki Gardens haqida ma'lumot olmoqchiman"
const TELEGRAM_USERNAME = 'MirakiGardens'
const INSTAGRAM_URL = 'https://www.instagram.com/miraki_gardens?igsh=MWJqb3kzMjl3MW1uYw=='

const contactChannels = [
  {
    label: 'Telegram',
    href: `https://t.me/${TELEGRAM_USERNAME}`,
    icon: Send,
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    icon: MessageCircle,
  },
  {
    label: 'Instagram',
    href: INSTAGRAM_URL,
    icon: Instagram,
  },
]

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-3 md:bottom-6">
      <div
        className={`flex flex-col items-end gap-2 transition-all duration-300 ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        {contactChannels.map((channel) => {
          const Icon = channel.icon

          return (
            <a
              key={channel.href}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-[168px] items-center justify-between gap-4 rounded-full border border-[#d4af37]/25 bg-[#10261d]/92 px-4 py-3 text-[#f5f0e8] shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/60 hover:bg-[#173827]"
            >
              <span className="font-[family-name:var(--font-montserrat)] text-xs font-semibold uppercase tracking-[0.14em]">
                {channel.label}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4af37]/12 text-[#d4af37] transition-colors duration-300 group-hover:bg-[#d4af37] group-hover:text-[#10261d]">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Aloqa kanallarini yopish" : "Aloqa kanallarini ochish"}
        className="group flex h-16 items-center gap-3 rounded-full border border-[#d4af37]/45 bg-[#10261d]/94 px-4 pr-5 text-[#f5f0e8] shadow-2xl shadow-black/25 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/80 hover:bg-[#173827]"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-[#10261d] shadow-lg shadow-[#d4af37]/20">
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Headphones className="h-5 w-5" aria-hidden="true" />}
        </span>
        <span className="hidden font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-[0.16em] sm:inline">
          Aloqa
        </span>
      </button>
    </div>
  )
}
