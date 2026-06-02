'use client';

import { useLanguage } from '@/lib/language-context';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
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
    price: '1 400 000',
    capacity: '2',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop',
    amenities: ['wifi', 'ac', 'view'] as const,
  },
  {
    key: 'suite' as const,
    price: '1 800 000',
    capacity: '2',
    image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1600&auto=format&fit=crop',
    amenities: ['wifi', 'ac', 'view', 'terrace'] as const,
  },
  {
    key: 'president' as const,
    price: '2 000 000',
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
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="rooms"
      className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#10261d] relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 relative">
        <div className="mx-auto mb-12 sm:mb-16 md:mb-20 max-w-3xl text-center">
          <span
            className={cn(
              'inline-block text-[#d4af37] text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4 transition-all duration-700',
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {t.rooms.subtitle}
          </span>

          <h2
            className={cn(
              'text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] font-medium mb-5 sm:mb-6 transition-all duration-700 delay-100',
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {t.rooms.title}
          </h2>

          <p
            className={cn(
              'mx-auto max-w-2xl text-[#f5f0e8]/68 text-base sm:text-lg md:text-xl leading-relaxed transition-all duration-700 delay-200',
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {t.rooms.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {rooms.map((room, index) => {
            const roomData = t.rooms.types[room.key];

            return (
              <article
                key={room.key}
                className={cn(
                  'group relative overflow-hidden rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/55 hover:bg-[#f5f0e8]/8 shadow-2xl shadow-black/10',
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${300 + index * 120}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={roomData.name}
                    loading={index > 1 ? 'lazy' : 'eager'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10261d] via-[#10261d]/25 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-lg bg-[#d4af37] px-3 py-2 shadow-lg">
                    <span className="block text-[#1a3328] text-sm font-[family-name:var(--font-montserrat)] font-bold leading-none">
                      {room.price}
                    </span>
                    <span className="mt-1 block text-[#1a3328]/70 text-[10px] uppercase tracking-[0.14em] font-[family-name:var(--font-montserrat)]">
                      UZS / {t.rooms.perNight}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 lg:p-7">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-2xl text-[#f5f0e8] font-medium">
                      {roomData.name}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#f5f0e8]/10 px-2.5 py-1.5 text-[#f5f0e8]/68">
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
                    className="w-full rounded-lg bg-[#d4af37] py-4 text-center text-[#1a3328] text-xs sm:text-sm tracking-[0.16em] uppercase font-[family-name:var(--font-montserrat)] font-bold hover:bg-[#c9a430] transition-all duration-300 active:scale-[0.98]"
                  >
                    {t.rooms.bookRoom}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
