'use client';

import { useLanguage } from '@/lib/language-context';
import { ChevronDown, MapPin, Mountain, Phone, TreeDeciduous } from 'lucide-react';
import Link from 'next/link';

const highlights = [
  { value: '500', label: 'hectares', icon: TreeDeciduous },
  { value: '15', label: 'min from Shahrisabz', icon: MapPin },
  { value: '4', label: 'room types', icon: Mountain },
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[92svh] overflow-hidden pt-20 bg-[#1a3328]"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.03]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10261d]/95 via-[#1a3328]/70 to-[#1a3328]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3328] via-transparent to-[#10261d]/55" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 min-h-[calc(92svh-5rem)] flex items-center">
        <div className="max-w-3xl py-16 sm:py-20 text-left">
          <div className="inline-flex items-center gap-3 mb-6 rounded-full border border-[#d4af37]/30 bg-[#10261d]/45 px-4 py-2 backdrop-blur-md animate-fade-up">
            <MapPin className="h-4 w-4 text-[#d4af37]" />
            <span className="font-[family-name:var(--font-montserrat)] text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#f5f0e8]/80">
              Shahrisabz mountain retreat
            </span>
          </div>

          <h1 className="max-w-4xl text-[48px] leading-[0.98] sm:text-6xl md:text-7xl lg:text-8xl font-medium text-[#f5f0e8] mb-5 tracking-normal animate-fade-up animation-delay-100">
            {t.hero.title}
          </h1>

          <p className="max-w-2xl text-base sm:text-xl md:text-2xl text-[#d4af37] tracking-[0.12em] sm:tracking-[0.16em] uppercase font-[family-name:var(--font-montserrat)] font-light mb-6 animate-fade-up animation-delay-200">
            {t.hero.subtitle}
          </p>

          <p className="max-w-2xl text-[#f5f0e8]/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 animate-fade-up animation-delay-300">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-fade-up animation-delay-400">
            <Link
              href="?be-booking-open=true"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '?be-booking-open=true';
              }}
              className="inline-flex justify-center rounded-lg bg-[#d4af37] px-8 py-4 text-[#1a3328] text-sm tracking-[0.16em] uppercase font-[family-name:var(--font-montserrat)] font-semibold hover:bg-[#c9a430] transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20"
            >
              {t.nav.bookNow}
            </Link>

            <a
              href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
              className="inline-flex justify-center items-center gap-2 rounded-lg border border-[#f5f0e8]/25 px-8 py-4 text-[#f5f0e8] text-sm tracking-[0.16em] uppercase font-[family-name:var(--font-montserrat)] font-semibold hover:bg-[#f5f0e8]/10 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              {t.contact.phone}
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-up animation-delay-500">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-lg border border-[#f5f0e8]/10 bg-[#10261d]/40 p-4 backdrop-blur-md"
                >
                  <Icon className="mb-3 h-5 w-5 text-[#d4af37]" />
                  <div className="text-2xl font-medium text-[#f5f0e8]">{item.value}</div>
                  <div className="mt-1 font-[family-name:var(--font-montserrat)] text-[11px] uppercase tracking-[0.16em] text-[#f5f0e8]/55">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 animate-fade-up animation-delay-600">
        <span className="text-[#f5f0e8]/55 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]">
          {t.hero.scroll}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#f5f0e8]/50 to-transparent relative">
          <ChevronDown className="w-4 h-4 text-[#d4af37] absolute -bottom-2 left-1/2 -translate-x-1/2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
