'use client';

import { useLanguage } from '@/lib/language-context';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  Mountain,
  Leaf,
  Wine,
  Sparkles,
  Users,
  CalendarCheck,
  Phone,
} from 'lucide-react';

const features = [
  { icon: Mountain, key: 'views' as const },
  { icon: Leaf, key: 'fresh' as const },
  { icon: Wine, key: 'wine' as const },
  { icon: Sparkles, key: 'atmosphere' as const },
];

const restaurantLabels = {
  en: {
    imageAlt: 'Miraki Gardens restaurant - garden-to-table dining',
    seats: 'seat restaurant',
    events: 'Events and banquets',
    gardenToTable: 'Garden-to-table',
  },
  ru: {
    imageAlt: 'Ресторан Miraki Gardens - кухня из сада к столу',
    seats: 'местный ресторан',
    events: 'Мероприятия и банкеты',
    gardenToTable: 'Из сада к столу',
  },
  uz: {
    imageAlt: "Miraki Gardens restorani - bog'dan dasturxonga",
    seats: "o'rinli restoran",
    events: 'Tadbir va banketlar',
    gardenToTable: "Bog'dan dasturxonga",
  },
};

export function Restaurant() {
  const { language, t } = useLanguage();
  const labels = restaurantLabels[language];
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="restaurant"
      className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#f5f0e8] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[360px] h-[360px] bg-[#d4af37]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div
            className={cn(
              'relative transition-all duration-1000',
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop"
                alt={labels.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3328]/65 via-[#1a3328]/10 to-transparent" />

              <div className="absolute left-5 right-5 bottom-5 sm:hidden">
                <div className="rounded-2xl bg-[#1a3328]/90 backdrop-blur-md border border-white/10 p-5">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#d4af37]" />
                    <div>
                      <p className="text-[#d4af37] text-2xl font-semibold">120</p>
                      <p className="text-[#f5f0e8]/75 text-xs uppercase tracking-[0.2em]">
                        {labels.seats}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-8 right-4 lg:-right-10 bg-[#1a3328] p-7 lg:p-8 rounded-3xl shadow-2xl max-w-xs border border-white/10">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-[#d4af37]" />
                <div>
                  <div className="text-[#d4af37] text-4xl lg:text-5xl font-light leading-none">
                    120
                  </div>
                  <div className="text-[#f5f0e8]/70 text-xs lg:text-sm font-[family-name:var(--font-montserrat)] tracking-wider uppercase mt-2">
                    {labels.seats}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -top-5 -left-5 w-full h-full border border-[#d4af37]/30 rounded-3xl -z-10" />
          </div>

          <div
            className={cn(
              'transition-all duration-1000 delay-300',
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            <span className="inline-block text-[#d4af37] text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4">
              {t.restaurant.subtitle}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1a3328] font-medium mb-5 sm:mb-6 leading-tight">
              {t.restaurant.title}
            </h2>

            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 sm:w-16 h-px bg-[#d4af37]" />
              <div className="w-2 h-2 rotate-45 border border-[#d4af37]" />
            </div>

            <p className="text-[#1a3328]/70 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              {t.restaurant.description}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              <div className="rounded-2xl bg-white/55 border border-[#1a3328]/10 p-4">
                <CalendarCheck className="w-5 h-5 text-[#d4af37] mb-3" />
                <p className="text-[#1a3328] text-sm font-medium">
                  {labels.events}
                </p>
              </div>

              <div className="rounded-2xl bg-white/55 border border-[#1a3328]/10 p-4">
                <Leaf className="w-5 h-5 text-[#d4af37] mb-3" />
                <p className="text-[#1a3328] text-sm font-medium">
                  {labels.gardenToTable}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-9 sm:mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.key}
                    className={cn(
                      'flex items-center gap-4 rounded-2xl bg-[#1a3328]/5 p-4 transition-all duration-500',
                      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    )}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="w-11 h-11 rounded-full bg-[#1a3328] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <span className="text-[#1a3328] text-sm font-[family-name:var(--font-montserrat)] tracking-wider leading-snug">
                      {t.restaurant.features[feature.key]}
                    </span>
                  </div>
                );
              })}
            </div>

            <a
              href="tel:+998873378888"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1a3328] text-[#f5f0e8] text-sm tracking-[0.16em] uppercase font-[family-name:var(--font-montserrat)] font-semibold hover:bg-[#2a4338] transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              {t.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
