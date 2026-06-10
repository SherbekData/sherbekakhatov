'use client';

import { useLanguage } from '@/lib/language-context';
import { Wind, Footprints, Flower2, Sparkles, UtensilsCrossed, Lock, Camera, Volume2 } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerContainer } from '@/components/motion/StaggerContainer';
import { AnimatedCard } from '@/components/motion/AnimatedCard';

const amenities = [
  { key: 'air' as const, icon: Wind },
  { key: 'walks' as const, icon: Footprints },
  { key: 'relaxation' as const, icon: Flower2 },
  { key: 'lavender' as const, icon: Sparkles },
  { key: 'dining' as const, icon: UtensilsCrossed },
  { key: 'privacy' as const, icon: Lock },
  { key: 'photo' as const, icon: Camera },
  { key: 'quiet' as const, icon: Volume2 },
];

export function Amenities() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-[#f5f0e8] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#1a3328] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#1a3328] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#1a3328] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative">
        <Reveal className="text-center mb-20">
          <span className="inline-block text-[#d4af37] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4">
            {t.amenities.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a3328] font-medium mb-6">
            {t.amenities.title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-[#d4af37]" />
            <div className="w-2 h-2 rotate-45 border border-[#d4af37]" />
            <div className="w-16 h-px bg-[#d4af37]" />
          </div>
        </Reveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            const data = t.amenities.items[amenity.key];
            return (
              <AnimatedCard
                key={amenity.key}
                className="group relative bg-white p-6 lg:p-8 rounded-sm border border-[#1a3328]/10 hover:border-[#d4af37]/50 transition-colors duration-300 hover:shadow-xl hover:shadow-[#1a3328]/5 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#1a3328]/5 flex items-center justify-center mb-6 group-hover:bg-[#1a3328] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#1a3328] group-hover:text-[#d4af37] transition-colors duration-300" />
                </div>

                <h3 className="text-lg text-[#1a3328] font-medium mb-2">
                  {data.title}
                </h3>
                <p className="text-[#1a3328]/60 text-sm leading-relaxed">
                  {data.description}
                </p>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#d4af37] group-hover:w-1/2 transition-all duration-500" />
              </AnimatedCard>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
