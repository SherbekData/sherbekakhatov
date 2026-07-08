'use client';

import { useRef } from 'react';
import { useLanguage } from '@/lib/language-context';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CalendarDays, ChevronDown, MapPin, Play, Star } from 'lucide-react';

const heroLabels = {
  en: {
    badge: 'Shahrisabz mountain retreat',
    video: 'Watch Video',
    ratingText: '500+ guest reviews',
    locationTitle: 'Shahrisabz',
    locationText: 'Qashqadaryo region',
  },
  ru: {
    badge: 'Горный курорт в Шахрисабзе',
    video: 'Смотреть видео',
    ratingText: '500+ отзывов гостей',
    locationTitle: 'Шахрисабз',
    locationText: 'Кашкадарьинская область',
  },
  uz: {
    badge: "Shahrisabz tog' dam olish maskani",
    video: "Videoni ko'rish",
    ratingText: '500+ mehmon fikri',
    locationTitle: 'Shahrisabz',
    locationText: 'Qashqadaryo viloyati',
  },
};

export function Hero() {
  const { language, t } = useLanguage();
  const labels = heroLabels[language];
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.09]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.74], [1, 0.2]);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const openBooking = () => {
    window.dispatchEvent(new Event('miraki:open-booking'));
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#10261d] pt-24 lg:pt-28"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={shouldReduceMotion ? undefined : { scale: imageScale, y: imageY }}
        >
          <Image
            aria-hidden="true"
            src="/miraki-hero.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-[45%_62%] sm:object-[52%_60%] lg:object-[62%_58%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,35,22,0.92)_0%,rgba(3,35,22,0.72)_35%,rgba(3,35,22,0.28)_60%,rgba(3,35,22,0.05)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#062318]/82 via-[#10261d]/8 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_46%,transparent_0,transparent_46%,rgba(6,35,24,0.12)_86%)]" />
        <motion.div
          aria-hidden="true"
          className="absolute left-[12%] top-[18%] hidden h-72 w-72 rounded-full bg-[#d4af37]/10 blur-3xl lg:block"
          style={shouldReduceMotion ? undefined : { y: glowY }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-[1500px] flex-col justify-center px-5 pb-40 pt-10 sm:px-8 lg:pb-44"
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-[620px] text-left">
          <div className="premium-soft-transition premium-hover-lift inline-flex items-center gap-3 mb-7 rounded-full border border-[#d4af37]/35 bg-[#10261d]/42 px-4 py-2 backdrop-blur-md animate-fade-up hover:border-[#d4af37]/65 hover:bg-[#10261d]/58">
            <MapPin className="h-4 w-4 text-[#d4af37]" />
            <span className="font-[family-name:var(--font-montserrat)] text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#d4af37]">
              {labels.badge}
            </span>
          </div>

          <h1 className="max-w-3xl text-[64px] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[112px] font-medium text-[#f5f0e8] mb-6 tracking-normal animate-fade-up animation-delay-100">
            <span className="block">Miraki</span>
            <span className="block text-[#d4af37]">Gardens</span>
          </h1>

          <p className="max-w-xl text-xl sm:text-2xl md:text-[28px] text-[#f5f0e8] tracking-[0.08em] uppercase font-[family-name:var(--font-montserrat)] font-medium leading-snug mb-6 animate-fade-up animation-delay-200">
            {t.hero.subtitle}
          </p>

          <p className="max-w-xl text-[#f5f0e8]/86 text-base sm:text-lg md:text-xl leading-relaxed mb-9 animate-fade-up animation-delay-300">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-up animation-delay-400">
            <button
              type="button"
              onClick={openBooking}
              className="premium-soft-transition premium-hover-lift premium-gold-glow premium-focus-ring premium-press premium-shimmer-button hidden sm:inline-flex justify-center items-center gap-3 rounded-lg bg-[#d4af37] px-8 py-4 text-[#1a3328] text-sm tracking-[0.12em] uppercase font-[family-name:var(--font-montserrat)] font-semibold hover:bg-[#c9a430]"
            >
              <CalendarDays className="h-5 w-5" />
              {t.nav.bookNow}
            </button>

            <a
              href="#gallery"
              className="premium-soft-transition premium-hover-lift premium-focus-ring premium-press inline-flex justify-center items-center gap-3 rounded-lg border border-[#f5f0e8]/35 bg-[#10261d]/22 px-8 py-4 text-[#f5f0e8] text-sm tracking-[0.12em] uppercase font-[family-name:var(--font-montserrat)] font-semibold backdrop-blur-sm hover:border-[#d4af37]/55 hover:bg-[#f5f0e8]/10"
            >
              <span className="premium-icon-tilt flex h-7 w-7 items-center justify-center rounded-full border border-[#f5f0e8]/55">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              {labels.video}
            </a>
          </div>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center animate-fade-up animation-delay-500">
            <div className="premium-soft-transition premium-hover-lift flex items-center gap-4 rounded-2xl border border-transparent p-2 hover:border-[#f5f0e8]/10 hover:bg-[#f5f0e8]/5">
              <Star className="h-8 w-8 fill-[#d4af37] text-[#d4af37]" />
              <div>
                <div className="font-[family-name:var(--font-montserrat)] text-lg font-semibold text-[#f5f0e8]">4.9</div>
                <div className="text-sm text-[#f5f0e8]/82">{labels.ratingText}</div>
              </div>
            </div>
            <div className="hidden h-11 w-px bg-[#f5f0e8]/22 sm:block" />
            <div className="premium-soft-transition premium-hover-lift flex items-center gap-4 rounded-2xl border border-transparent p-2 hover:border-[#f5f0e8]/10 hover:bg-[#f5f0e8]/5">
              <MapPin className="h-8 w-8 fill-[#d4af37] text-[#d4af37]" />
              <div>
                <div className="font-[family-name:var(--font-montserrat)] text-lg font-semibold text-[#f5f0e8]">{labels.locationTitle}</div>
                <div className="text-sm text-[#f5f0e8]/82">{labels.locationText}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex-col items-center gap-3 animate-fade-up animation-delay-600">
        <span className="sr-only">{t.hero.scroll}</span>
        <div className="w-px h-9 bg-gradient-to-b from-[#f5f0e8]/45 to-transparent relative">
          <ChevronDown className="w-4 h-4 text-[#d4af37] absolute -bottom-2 left-1/2 -translate-x-1/2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
