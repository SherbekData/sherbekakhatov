'use client';

import { useLanguage } from '@/lib/language-context';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const experiences = [
  {
    key: 'vineyard' as const,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop',
  },
  {
    key: 'orchard' as const,
    image: 'https://images.unsplash.com/photo-1474564862106-1f23d10b9d72?q=80&w=2070&auto=format&fit=crop',
  },
  {
    key: 'lavender' as const,
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=2070&auto=format&fit=crop',
  },
  {
    key: 'nature' as const,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
  },
];

const statValues = [
  { value: '500', key: 'hectares' as const },
  { value: '1,500m', key: 'elevation' as const },
  { value: '100+', key: 'treeSpecies' as const },
  { value: '365', key: 'beautyDays' as const },
];

const gardenStatLabels = {
  en: {
    hectares: 'Hectares',
    elevation: 'Elevation',
    treeSpecies: 'Tree Species',
    beautyDays: 'Days of Beauty',
  },
  ru: {
    hectares: 'Гектаров',
    elevation: 'Высота',
    treeSpecies: 'Видов деревьев',
    beautyDays: 'Дней красоты',
  },
  uz: {
    hectares: 'Gektar',
    elevation: 'Balandlik',
    treeSpecies: 'Daraxt turlari',
    beautyDays: "Go'zallik kunlari",
  },
};

export function Garden() {
  const { language, t } = useLanguage();
  const statLabels = gardenStatLabels[language];
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="garden" className="py-24 md:py-32 bg-[#1a3328] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <span className={cn(
            'inline-block text-[#d4af37] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {t.garden.subtitle}
          </span>
          <h2 className={cn(
            'text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] font-medium mb-6 transition-all duration-700 delay-100',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {t.garden.title}
          </h2>
          <div className={cn(
            'flex items-center justify-center gap-4 mb-8 transition-all duration-700 delay-200',
            isInView ? 'opacity-100' : 'opacity-0'
          )}>
            <div className="w-16 h-px bg-[#d4af37]" />
            <div className="w-2 h-2 rotate-45 border border-[#d4af37]" />
            <div className="w-16 h-px bg-[#d4af37]" />
          </div>
          <p className={cn(
            'max-w-2xl mx-auto text-[#f5f0e8]/70 text-lg md:text-xl leading-relaxed transition-all duration-700 delay-300',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {t.garden.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className={cn(
              'group relative aspect-[4/5] lg:row-span-2 overflow-hidden rounded-sm transition-all duration-1000',
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <Image
              src={experiences[0].image}
              alt={t.garden.experiences[experiences[0].key].title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3328] via-[#1a3328]/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <div className="w-12 h-px bg-[#d4af37] mb-6 group-hover:w-20 transition-all duration-500" />
              <h3 className="text-2xl lg:text-3xl text-[#f5f0e8] font-medium mb-4">
                {t.garden.experiences[experiences[0].key].title}
              </h3>
              <p className="text-[#f5f0e8]/70 leading-relaxed max-w-md">
                {t.garden.experiences[experiences[0].key].description}
              </p>
            </div>

            <div className="absolute inset-4 border border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-all duration-500 rounded-sm" />
          </div>

          {experiences.slice(1).map((experience, index) => (
            <div
              key={experience.key}
              className={cn(
                'group relative aspect-[16/9] lg:aspect-auto overflow-hidden rounded-sm transition-all duration-1000',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${500 + index * 150}ms` }}
            >
              <Image
                src={experience.image}
                alt={t.garden.experiences[experience.key].title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3328] via-[#1a3328]/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="w-8 h-px bg-[#d4af37] mb-4 group-hover:w-12 transition-all duration-500" />
                <h3 className="text-xl lg:text-2xl text-[#f5f0e8] font-medium mb-2">
                  {t.garden.experiences[experience.key].title}
                </h3>
                <p className="text-[#f5f0e8]/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t.garden.experiences[experience.key].description}
                </p>
              </div>

              <div className="absolute inset-3 border border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-all duration-500 rounded-sm" />
            </div>
          ))}
        </div>

        <div className={cn(
          'mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-700',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {statValues.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="text-4xl lg:text-5xl text-[#d4af37] font-light mb-2">
                {stat.value}
              </div>
              <div className="text-[#f5f0e8]/50 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)]">
                {statLabels[stat.key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
