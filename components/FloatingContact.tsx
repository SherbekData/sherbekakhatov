'use client'

import { useState } from 'react'

const WHATSAPP_NUMBER = '998873378888'
const WHATSAPP_MESSAGE = "Salom, Miraki Gardens haqida ma'lumot olmoqchiman"
const TELEGRAM_USERNAME = 'MirakiGardens'

export default function FloatingContact() {
  const [hovered, setHovered] = useState<'whatsapp' | 'telegram' | null>(null)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}`

  return (
    <div className="fixed bottom-6 right-5 z-50 hidden 2xl:flex flex-col gap-3">
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram orqali bog'laning"
        onMouseEnter={() => setHovered('telegram')}
        onMouseLeave={() => setHovered(null)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          borderRadius: '50px',
          background: 'linear-gradient(135deg, #0088cc, #0099dd)',
          color: 'white',
          textDecoration: 'none',
          fontFamily: 'var(--font-montserrat), sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,136,204,0.4)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden',
          maxWidth: hovered === 'telegram' ? '180px' : '52px',
          transform: hovered === 'telegram' ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="22"
          height="22"
          style={{ flexShrink: 0 }}
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.152.666-.556.829-1.127.515l-3.1-2.284-1.496 1.44c-.165.165-.304.304-.624.304l.223-3.162 5.746-5.19c.25-.222-.054-.345-.386-.123L7.23 14.748l-3.05-.953c-.663-.207-.676-.663.138-.98l11.9-4.588c.552-.2 1.034.134.856.98l-.512.041z" />
        </svg>
        <span style={{
          whiteSpace: 'nowrap',
          opacity: hovered === 'telegram' ? 1 : 0,
          transition: 'opacity 0.2s ease 0.1s',
        }}>
          Telegram
        </span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp orqali bog'laning"
        onMouseEnter={() => setHovered('whatsapp')}
        onMouseLeave={() => setHovered(null)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          borderRadius: '50px',
          background: 'linear-gradient(135deg, #25d366, #20c05a)',
          color: 'white',
          textDecoration: 'none',
          fontFamily: 'var(--font-montserrat), sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden',
          maxWidth: hovered === 'whatsapp' ? '180px' : '52px',
          transform: hovered === 'whatsapp' ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="22"
          height="22"
          style={{ flexShrink: 0 }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
        <span style={{
          whiteSpace: 'nowrap',
          opacity: hovered === 'whatsapp' ? 1 : 0,
          transition: 'opacity 0.2s ease 0.1s',
        }}>
          WhatsApp
        </span>
      </a>
    </div>
  )
}
