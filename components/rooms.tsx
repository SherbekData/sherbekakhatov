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

  const selectRoom = (roomKey: string) => {
    sessionStorage.setItem('selectedRoom', roomKey);

    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }

    window.dispatchEvent(
      new CustomEvent('roomSelected', { detail: roomKey })
    );
  };

  return (
    <section
      id="rooms"
      className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#1a3328] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[420px] md:w-[600px] h-[420px] md:h-[600px] bg-[#d4af37] rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[320px] md:w-[400px] h-[320px] md:h-[400px] bg-[#d4af37] rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
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

          <div
            className={cn(
              'flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 transition-all duration-700 delay-200',
              isInView ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className="w-10 sm:w-16 h-px bg-[#d4af37]" />
            <div className="w-2 h-2 rotate-45 border border-[#d4af37]" />
            <div className="w-10 sm:w-16 h-px bg-[#d4af37]" />
          </div>

          <p
            className={cn(
              'max-w-2xl mx-auto text-[#f5f0e8]/70 text-base sm:text-lg md:text-xl leading-relaxed transition-all duration-700 delay-300',
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {t.rooms.description}
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-10">
          {rooms.map((room, index) => {
            const roomData = t.rooms.types[room.key];

            return (
              <article
                key={room.key}
                className={cn(
                  'group relative bg-[#f5f0e8]/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-[#f5f0e8]/10 hover:border-[#d4af37]/50 transition-all duration-500 shadow-2xl shadow-black/10',
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${350 + index * 120}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                  <img
                    src={room.image}
                    alt={roomData.name}
                    loading={index > 1 ? 'lazy' : 'eager'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3328] via-[#1a3328]/30 to-transparent" />

                  {/* Price Tag */}
                  {/*<div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#d4af37] px-4 py-2 rounded-2xl shadow-lg">*/}
                  {/*  <span className="text-[#1a3328] text-sm sm:text-base font-[family-name:var(--font-montserrat)] font-bold">*/}
                  {/*    {room.price}*/}
                  {/*  </span>*/}
                  {/*  <span className="text-[#1a3328]/75 text-[11px] block font-[family-name:var(--font-montserrat)]">*/}
                  {/*    UZS / {t.rooms.perNight}*/}
                  {/*  </span>*/}
                  {/*</div>*/}

                  {/* Room name on mobile */}
                  <div className="absolute left-5 right-5 bottom-5 sm:hidden">
                    <h3 className="text-2xl text-[#f5f0e8] font-medium">
                      {roomData.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-8">
                  <div className="hidden sm:block">
                    <h3 className="text-2xl text-[#f5f0e8] font-medium mb-3">
                      {roomData.name}
                    </h3>
                  </div>

                  <p className="text-[#f5f0e8]/65 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                    {roomData.description}
                  </p>

                  {/* Capacity */}
                  <div className="flex items-center gap-2 text-[#f5f0e8]/60 mb-5">
                    <Users className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-xs sm:text-sm font-[family-name:var(--font-montserrat)] tracking-wider">
                      {room.capacity} guests
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="grid grid-cols-2 gap-3 mb-6 sm:mb-8">
                    {room.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity];

                      return (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 text-[#f5f0e8]/55 bg-white/[0.03] rounded-full px-3 py-2"
                        >
                          <Icon className="w-4 h-4 text-[#d4af37]/90 shrink-0" />
                          <span className="text-[11px] sm:text-xs font-[family-name:var(--font-montserrat)] tracking-wider truncate">
                            {t.rooms.amenities[amenity]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '?be-booking-open=true';
                      }}
                    className="w-full text-center py-4 rounded-full bg-[#d4af37] text-[#1a3328] text-xs sm:text-sm tracking-[0.18em] uppercase font-[family-name:var(--font-montserrat)] font-bold hover:bg-[#c9a430] transition-all duration-300 active:scale-[0.98]"
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
