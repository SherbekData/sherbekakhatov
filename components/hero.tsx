'use client';

import { useLanguage } from '@/lib/language-context';
import { ChevronDown, Phone } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        {/* Stronger mobile-readable overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3328]/75 via-[#1a3328]/45 to-[#1a3328]/85" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Decorative top/bottom shade */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1a3328]/70 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#1a3328]/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-3 mb-5 sm:mb-8 animate-fade-up">
          <div className="w-10 sm:w-16 h-px bg-[#d4af37]" />
          <div className="w-2 h-2 rotate-45 border border-[#d4af37]" />
          <div className="w-10 sm:w-16 h-px bg-[#d4af37]" />
        </div>

        {/* Main Title */}
        <h1 className="text-[42px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl font-medium text-[#f5f0e8] mb-4 sm:mb-6 tracking-wide animate-fade-up animation-delay-100">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-[#d4af37] tracking-[0.16em] sm:tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] font-light mb-5 sm:mb-8 animate-fade-up animation-delay-200">
          {t.hero.subtitle}
        </p>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-[#f5f0e8]/85 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 animate-fade-up animation-delay-300">
          {t.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-up animation-delay-400">
          <Link
              href="?be-booking-open=true"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '?be-booking-open=true';
              }}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-[#d4af37] text-[#1a3328] text-sm tracking-[0.18em] uppercase font-[family-name:var(--font-montserrat)] font-semibold hover:bg-[#c9a430] transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20"
          >
            {t.nav.bookNow}
          </Link>

          <a
            href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
            className="w-full sm:hidden px-8 py-4 rounded-full border border-[#f5f0e8]/30 text-[#f5f0e8] text-sm tracking-[0.18em] uppercase font-[family-name:var(--font-montserrat)] font-semibold flex items-center justify-center gap-2 hover:bg-[#f5f0e8]/10 transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>

          <Link
            href="#about"
            className="hidden sm:inline-flex px-10 py-4 border border-[#f5f0e8]/30 text-[#f5f0e8] text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] font-medium hover:bg-[#f5f0e8]/10 hover:border-[#f5f0e8]/50 transition-all duration-300"
          >
            {t.hero.explore}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator - desktop only */}
      <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-3 animate-fade-up animation-delay-600">
        <span className="text-[#f5f0e8]/60 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]">
          {t.hero.scroll}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#f5f0e8]/60 to-transparent relative">
          <ChevronDown className="w-4 h-4 text-[#d4af37] absolute -bottom-2 left-1/2 -translate-x-1/2 animate-bounce" />
        </div>
      </div>

      {/* Side Decorations - desktop only */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent" />
      </div>

      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent" />
      </div>
    </section>
  );
}
