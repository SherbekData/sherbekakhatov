'use client';

import { useLanguage } from '@/lib/language-context';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Wifi,
  Thermometer,
  Mountain,
  Wine,
  TreeDeciduous,
  Home,
  Users,
} from 'lucide-react';

const rooms = [
  {
    key: 'standard' as const,
    capacity: '2',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop',
    ],
    amenities: ['wifi', 'ac', 'view'] as const,
  },
  {
    key: 'suite' as const,
    capacity: '2',
    images: [
      '/images/rooms/suite/suite-bedroom-wide.webp',
      '/images/rooms/suite/suite-bedroom-reverse.webp',
      '/images/rooms/suite/suite-living-dining.webp',
    ],
    amenities: ['wifi', 'ac', 'view', 'terrace'] as const,
  },
  {
    key: 'president' as const,
    capacity: '4',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1600&auto=format&fit=crop',
    ],
    amenities: ['wifi', 'ac', 'underground', 'minibar'] as const,
  },
];

const amenityIcons = {
  wifi: Wifi,
  ac: Thermometer,
  view: Mountain,
  minibar: Wine,
  terrace: TreeDeciduous,
  underground: Home,
};

const premiumEase = [0.22, 1, 0.36, 1] as const;

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: premiumEase },
  },
};

const gridReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.14,
    },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.82, ease: premiumEase },
  },
};

const amenityReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: premiumEase },
  },
};

type RoomGalleryProps = {
  images: string[];
  alt: string;
  priority: boolean;
};

function RoomGallery({ images, alt, priority }: RoomGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const selectFromPointer = (clientX: number, target: HTMLDivElement) => {
    if (images.length < 2) return;
    const bounds = target.getBoundingClientRect();
    const position = Math.max(0, Math.min(clientX - bounds.left, bounds.width - 1));
    setActiveImage(Math.floor((position / bounds.width) * images.length));
  };

  const moveBy = (direction: number) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

  return (
    <div
      className="relative aspect-[16/11] overflow-hidden bg-[#0b1d16]"
      onMouseMove={(event) => selectFromPointer(event.clientX, event.currentTarget)}
      onMouseLeave={() => setActiveImage(0)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start == null || end == null) return;
        const distance = end - start;
        if (Math.abs(distance) > 35) moveBy(distance < 0 ? 1 : -1);
      }}
    >
      {images.map((src, imageIndex) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} — ${imageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority && imageIndex === 0}
          className={`object-contain transition-opacity duration-500 ease-out ${
            imageIndex === activeImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10261d]/55 via-transparent to-transparent" />

      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2" aria-label={`${alt} rasmlari`}>
          {images.map((src, imageIndex) => (
            <button
              key={src}
              type="button"
              aria-label={`${imageIndex + 1}-rasmni ko‘rish`}
              aria-current={imageIndex === activeImage}
              onClick={() => setActiveImage(imageIndex)}
              className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${
                imageIndex === activeImage ? 'w-7 bg-[#d4af37]' : 'w-3 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Rooms() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const openBooking = () => {
    window.dispatchEvent(new Event('miraki:open-booking'));
  };

  return (
    <section
      id="rooms"
      className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#10261d] relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          className="mx-auto mb-12 sm:mb-16 md:mb-20 max-w-3xl text-center"
          variants={sectionReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.span
            className="inline-block text-[#d4af37] text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4"
            variants={sectionReveal}
          >
            {t.rooms.subtitle}
          </motion.span>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] font-medium mb-5 sm:mb-6"
            variants={sectionReveal}
          >
            {t.rooms.title}
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-[#f5f0e8]/70 text-base sm:text-lg md:text-xl leading-relaxed"
            variants={sectionReveal}
          >
            {t.rooms.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
          variants={gridReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {rooms.map((room, index) => {
            const roomData = t.rooms.types[room.key];

            return (
              <motion.article
                key={room.key}
                className="group relative overflow-hidden rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 shadow-2xl shadow-black/10 will-change-transform"
                variants={cardReveal}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.01,
                        borderColor: 'rgba(212, 175, 55, 0.58)',
                        backgroundColor: 'rgba(245, 240, 232, 0.085)',
                        boxShadow: '0 28px 70px rgba(0, 0, 0, 0.28)',
                      }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    className="relative"
                    initial={shouldReduceMotion ? false : { scale: 1.08 }}
                    whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.055 }}
                  >
                    <RoomGallery
                      images={room.images}
                      alt={roomData.name}
                      priority={index === 0}
                    />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.18),transparent_48%)]" />
                </div>

                <div className="p-5 sm:p-6 lg:p-7">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-2xl text-[#f5f0e8] font-medium">
                      {roomData.name}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#f5f0e8]/10 px-2.5 py-1.5 text-[#f5f0e8]/70">
                      <Users className="w-4 h-4 text-[#d4af37]" />
                      <span className="text-xs font-[family-name:var(--font-montserrat)]">
                        {room.capacity}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#f5f0e8]/65 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                    {roomData.description}
                  </p>

                  <motion.div
                    className="grid grid-cols-2 gap-2.5 mb-6 sm:mb-8"
                    variants={gridReveal}
                  >
                    {room.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity];
                      return (
                        <motion.div
                          key={amenity}
                          className="flex min-w-0 items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-[#f5f0e8]/60 transition-colors duration-300 group-hover:bg-white/[0.065]"
                          variants={amenityReveal}
                        >
                          <Icon className="w-4 h-4 text-[#d4af37]/90 shrink-0" />
                          <span className="truncate text-[11px] sm:text-xs font-[family-name:var(--font-montserrat)] tracking-wider">
                            {t.rooms.amenities[amenity]}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={openBooking}
                    className="relative w-full overflow-hidden rounded-lg bg-[#d4af37] py-4 text-center text-[#1a3328] text-xs sm:text-sm tracking-[0.16em] uppercase font-[family-name:var(--font-montserrat)] font-bold transition-colors duration-300 hover:bg-[#c9a430]"
                    whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <span className="relative z-10">{t.rooms.bookRoom}</span>
                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-white/25 opacity-0 blur-sm transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
