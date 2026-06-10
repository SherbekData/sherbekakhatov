'use client';

import { useLanguage } from '@/lib/language-context';
import Image from 'next/image';
import {
  Wifi,
  Thermometer,
  Mountain,
  Wine,
  TreeDeciduous,
  Home,
  Users,
} from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerContainer } from '@/components/motion/StaggerContainer';
import { AnimatedCard } from '@/components/motion/AnimatedCard';

const rooms = [
  {
    key: 'standard' as const,
    capacity: '2',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop',
    amenities: ['wifi', 'ac', 'view'] as const,
  },
  {
    key: 'suite' as const,
    capacity: '2',
    image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1600&auto=format&fit=crop',
    amenities: ['wifi', 'ac', 'view', 'terrace'] as const,
  },
  {
    key: 'president' as const,
    capacity: '4',
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1600&auto=format&fit=crop',
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

export function Rooms() {
  const { t } = useLanguage();

  return (
    <section
      id="rooms"
      className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#10261d] relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <Reveal className="mx-auto mb-12 sm:mb-16 md:mb-20 max-w-3xl text-center">
          <span className="inline-block text-[#d4af37] text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4">
            {t.rooms.subtitle}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] font-medium mb-5 sm:mb-6">
            {t.rooms.title}
          </h2>

          <p className="mx-auto max-w-2xl text-[#f5f0e8]/70 text-base sm:text-lg md:text-xl leading-relaxed">
            {t.rooms.description}
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {rooms.map((room, index) => {
            const roomData = t.rooms.types[room.key];

            return (
              <AnimatedCard
                key={room.key}
                className="group relative overflow-hidden rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 shadow-2xl shadow-black/10 transition-colors duration-300 hover:border-[#d4af37]/55 hover:bg-[#f5f0e8]/[0.08]"
              >
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.image}
                      alt={roomData.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={index === 0}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10261d] via-[#10261d]/25 to-transparent" />
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

                    <div className="grid grid-cols-2 gap-2.5 mb-6 sm:mb-8">
                      {room.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity];
                        return (
                          <div
                            key={amenity}
                            className="flex min-w-0 items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-[#f5f0e8]/60"
                          >
                            <Icon className="w-4 h-4 text-[#d4af37]/90 shrink-0" />
                            <span className="truncate text-[11px] sm:text-xs font-[family-name:var(--font-montserrat)] tracking-wider">
                              {t.rooms.amenities[amenity]}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '?be-booking-open=true';
                      }}
                      className="w-full rounded-lg bg-[#d4af37] py-4 text-center text-[#1a3328] text-xs sm:text-sm tracking-[0.16em] uppercase font-[family-name:var(--font-montserrat)] font-bold hover:bg-[#c9a430] transition-colors duration-150 active:scale-[0.98]"
                    >
                      {t.rooms.bookRoom}
                    </button>
                  </div>
                </article>
              </AnimatedCard>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
