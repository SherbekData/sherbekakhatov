'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
    category: 'views',
    aspect: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
    category: 'rooms',
    aspect: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop',
    category: 'vineyard',
    aspect: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    category: 'restaurant',
    aspect: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=2070&auto=format&fit=crop',
    category: 'lavender',
    aspect: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
    category: 'rooms',
    aspect: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1474564862106-1f23d10b9d72?q=80&w=2070&auto=format&fit=crop',
    category: 'orchard',
    aspect: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    category: 'exterior',
    aspect: 'wide',
  },
];

const categories = ['all', 'exterior', 'rooms', 'restaurant', 'vineyard', 'orchard', 'lavender', 'views'] as const;

type GalleryCategory = typeof categories[number];

export function Gallery() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = useMemo(
    () => activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  const selectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null) return current;
      return current === 0 ? filteredImages.length - 1 : current - 1;
    });
  };

  const goToNext = () => {
    setSelectedIndex((current) => {
      if (current === null) return current;
      return current === filteredImages.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') goToPrevious();
      if (event.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, filteredImages.length]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#1a3328] relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 relative">

        <div className="text-center mb-12">
          <span className={cn(
            'inline-block text-[#d4af37] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {t.gallery.subtitle}
          </span>
          <h2 className={cn(
            'text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] font-medium mb-6 transition-all duration-700 delay-100',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {t.gallery.title}
          </h2>
          <div className={cn(
            'flex items-center justify-center gap-4 transition-all duration-700 delay-200',
            isInView ? 'opacity-100' : 'opacity-0'
          )}>
            <div className="w-16 h-px bg-[#d4af37]" />
            <div className="w-2 h-2 rotate-45 border border-[#d4af37]" />
            <div className="w-16 h-px bg-[#d4af37]" />
          </div>
        </div>

        <div className={cn(
          'flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-300',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSelectedIndex(null);
              }}
              className={cn(
                'premium-soft-transition premium-hover-lift premium-focus-ring px-6 py-2 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] font-medium rounded-sm',
                activeCategory === category
                  ? 'bg-[#d4af37] text-[#1a3328]'
                  : 'border border-[#f5f0e8]/30 text-[#f5f0e8]/70 hover:border-[#d4af37]/50 hover:text-[#f5f0e8]'
              )}
            >
              {t.gallery.categories[category]}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={cn(
                'premium-card-hover premium-gold-glow premium-focus-ring group relative block w-full break-inside-avoid overflow-hidden rounded-sm cursor-pointer transition-all duration-500 text-left',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                image.aspect === 'tall' && 'aspect-[3/4]',
                image.aspect === 'wide' && 'aspect-[4/3]',
                image.aspect === 'square' && 'aspect-square'
              )}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open Miraki Gardens ${t.gallery.categories[image.category as GalleryCategory]} image`}
            >
              <Image
                src={image.src}
                alt={`Miraki Gardens – ${t.gallery.categories[image.category as GalleryCategory]}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading={index < 3 ? 'eager' : 'lazy'}
                className="premium-image-zoom object-cover"
              />
              <div className="absolute inset-0 bg-[#1a3328]/0 group-hover:bg-[#1a3328]/40 transition-all duration-300" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="premium-icon-tilt premium-soft-transition flex h-14 w-14 items-center justify-center rounded-full border border-[#f5f0e8]/80 bg-[#1a3328]/25 text-[#f5f0e8] backdrop-blur-sm group-hover:scale-105">
                  <Expand className="h-5 w-5" />
                </div>
              </div>

              <div className="absolute inset-3 border border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-all duration-500 rounded-sm" />
            </button>
          ))}
        </div>
      </div>

      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[9997] flex items-center justify-center bg-[#07120d]/96 p-4 backdrop-blur-xl md:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Miraki Gardens gallery lightbox"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/45 to-transparent" />
          <button
            type="button"
            className="premium-soft-transition premium-hover-lift premium-focus-ring absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#f5f0e8]/18 bg-[#f5f0e8]/8 text-[#f5f0e8] backdrop-blur-md hover:border-[#d4af37]/60 hover:text-[#d4af37] md:right-8 md:top-8"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close gallery lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                type="button"
                className="premium-soft-transition premium-focus-ring absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f5f0e8]/18 bg-[#f5f0e8]/8 text-[#f5f0e8] backdrop-blur-md hover:border-[#d4af37]/60 hover:text-[#d4af37] md:left-8 md:h-14 md:w-14"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Previous gallery image"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                className="premium-soft-transition premium-focus-ring absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f5f0e8]/18 bg-[#f5f0e8]/8 text-[#f5f0e8] backdrop-blur-md hover:border-[#d4af37]/60 hover:text-[#d4af37] md:right-8 md:h-14 md:w-14"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                aria-label="Next gallery image"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div
            className="relative flex max-h-[88vh] w-full max-w-6xl flex-col items-center gap-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden rounded-xl border border-[#d4af37]/28 bg-[#10261d]/45 p-2 shadow-2xl shadow-black/35 md:p-3">
              <Image
                src={selectedImage.src}
                alt={`Miraki Gardens – ${t.gallery.categories[selectedImage.category as GalleryCategory]}`}
                width={1800}
                height={1200}
                className="mx-auto max-h-[76vh] w-auto rounded-lg object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-4 rounded-full border border-[#f5f0e8]/12 bg-[#f5f0e8]/8 px-5 py-2 font-[family-name:var(--font-montserrat)] text-[11px] uppercase tracking-[0.22em] text-[#f5f0e8]/70 backdrop-blur-md">
              <span className="text-[#d4af37]">{String(selectedIndex + 1).padStart(2, '0')}</span>
              <span className="h-px w-8 bg-[#d4af37]/40" />
              <span>{String(filteredImages.length).padStart(2, '0')}</span>
              <span className="hidden text-[#f5f0e8]/45 sm:inline">Esc / ← / →</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
