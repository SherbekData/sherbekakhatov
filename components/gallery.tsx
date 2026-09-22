'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ChevronDown, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

type GalleryImage = {
  src: string;
  category: Exclude<GalleryCategory, 'all'>;
  width: number;
  height: number;
  /** feature — 2×2 katak, tall — 1×2 (tik surat) */
  size?: 'feature' | 'tall';
  /** katta ekranda feature'ni o'ng tomonga surish (ritm uchun) */
  alignRight?: boolean;
};

// Tartib ataylab tanlangan: katta "feature" suratlar ritm beradi, mavzular
// (maskan → xona → tabiat → restoran) almashib keladi, oxiri kechki surat bilan tugaydi.
// Katakcha to'ri grid-flow-dense bilan to'ldiriladi, shuning uchun tartib qatorma-qator o'qiladi.
const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/estate-pool-hills.webp', category: 'exterior', width: 2400, height: 1798, size: 'feature' },
  { src: '/images/gallery/room-bedroom-lounge.webp', category: 'rooms', width: 2400, height: 1551 },
  { src: '/images/gallery/estate-infinity-pool.webp', category: 'exterior', width: 2400, height: 1599 },
  { src: '/images/gallery/restaurant-terrace.webp', category: 'restaurant', width: 2400, height: 1600 },
  { src: '/images/gallery/nature-garden-trellis.webp', category: 'nature', width: 1600, height: 2400, size: 'tall' },
  { src: '/images/gallery/room-bathtub.webp', category: 'rooms', width: 2400, height: 1600 },
  { src: '/images/gallery/nature-stone-cottages.webp', category: 'nature', width: 2400, height: 1600 },
  { src: '/images/gallery/estate-main-building.webp', category: 'exterior', width: 2400, height: 1600 },
  { src: '/images/gallery/nature-terraced-orchard.webp', category: 'nature', width: 2400, height: 1600, size: 'feature', alignRight: true },
  { src: '/images/gallery/restaurant-glass-hall.webp', category: 'restaurant', width: 2400, height: 1600 },
  { src: '/images/gallery/nature-bridge-pond.webp', category: 'nature', width: 2400, height: 1600 },
  { src: '/images/gallery/room-bedroom-wardrobe.webp', category: 'rooms', width: 2400, height: 1555 },
  { src: '/images/gallery/estate-pool-aerial.webp', category: 'exterior', width: 2400, height: 1798 },
  { src: '/images/gallery/restaurant-rooftop.webp', category: 'restaurant', width: 2400, height: 1600 },
  { src: '/images/gallery/room-terrace-view.webp', category: 'rooms', width: 2400, height: 1600 },
  { src: '/images/gallery/estate-hammock.webp', category: 'exterior', width: 2400, height: 1600 },
  { src: '/images/gallery/estate-evening-firepit.webp', category: 'exterior', width: 2400, height: 1600 },
];

// Yig'ilgan holatda kompyuterda 2 qator (katta surat bloki + keyingi qator) — 8 ta,
// telefonda esa 4 ta ko'rinadi; qolganini 'Barchasini ko'rish' ochadi.
const COLLAPSED_COUNT = 8;
const COLLAPSED_COUNT_MOBILE = 4;

const categories = ['all', 'exterior', 'rooms', 'restaurant', 'nature'] as const;

type GalleryCategory = typeof categories[number];

export function Gallery() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

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
                setExpanded(false);
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

        {/* Katak balandligi 3:2 suratga mos: oddiy surat 1×1, feature 2×2, tik surat 1×2 —
            shunda deyarli hech narsa kesilmaydi. Telefonda har surat o'z nisbatida bitta ustunda. */}
        <div className="grid grid-cols-1 gap-4 md:grid-flow-dense md:grid-cols-2 md:auto-rows-[220px] lg:grid-cols-3 lg:auto-rows-[230px] xl:auto-rows-[270px] 2xl:auto-rows-[310px]">
          {filteredImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={cn(
                'premium-card-hover premium-gold-glow premium-focus-ring group relative block w-full overflow-hidden rounded-sm cursor-pointer transition-all duration-500 text-left md:aspect-auto',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                image.size === 'tall' ? 'aspect-[4/5] md:row-span-2' : 'aspect-[3/2]',
                image.size === 'feature' && 'md:col-span-2 md:row-span-2',
                image.alignRight && 'lg:col-start-2',
                !expanded && index >= COLLAPSED_COUNT && 'hidden',
                !expanded && index >= COLLAPSED_COUNT_MOBILE && index < COLLAPSED_COUNT && 'hidden md:block'
              )}
              style={{ transitionDelay: `${400 + Math.min(index, 8) * 90}ms` }}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open Miraki Gardens ${t.gallery.categories[image.category as GalleryCategory]} image`}
            >
              <Image
                src={image.src}
                alt={`Miraki Gardens – ${t.gallery.categories[image.category as GalleryCategory]}`}
                fill
                sizes={image.size === 'feature'
                  ? '(max-width: 768px) 100vw, 66vw'
                  : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
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

        {filteredImages.length > COLLAPSED_COUNT_MOBILE && (
          <div className={cn('mt-12 flex justify-center', filteredImages.length <= COLLAPSED_COUNT && 'md:hidden')}>
            <button
              type="button"
              onClick={() => {
                setExpanded((v) => !v);
                if (expanded) {
                  // Yig'ilganda sahifa pastda qolib ketmasin — galereya boshiga qaytaramiz.
                  // Skroll bloklar yopilgandan keyin boshlanishi kerak, aks holda balandlik
                  // o'zgarishi uni yarim yo'lda to'xtatib qo'yadi.
                  // -86 — qotirilgan menyu balandligi (SmoothScroll.tsx bilan bir xil).
                  setTimeout(() => {
                    const section = document.getElementById('gallery');
                    if (!section) return;
                    const top = section.getBoundingClientRect().top + window.scrollY - 86;
                    if (top < window.scrollY) window.scrollTo({ top, behavior: 'smooth' });
                  }, 0);
                }
              }}
              aria-expanded={expanded}
              className="premium-soft-transition premium-hover-lift premium-focus-ring inline-flex items-center gap-3 rounded-sm border border-[#d4af37]/60 px-8 py-3 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.2em] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a3328]"
            >
              {expanded ? t.gallery.showLess : t.gallery.showAll}
              {!expanded && <span className="text-[#f5f0e8]/50">({filteredImages.length})</span>}
              <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', expanded && 'rotate-180')} />
            </button>
          </div>
        )}
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
            className="relative flex max-h-[94vh] w-full max-w-[min(92vw,2400px)] flex-col items-center gap-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-xl border border-[#d4af37]/28 bg-[#10261d]/45 p-2 shadow-2xl shadow-black/35 md:p-3">
              <Image
                src={selectedImage.src}
                alt={`Miraki Gardens – ${t.gallery.categories[selectedImage.category as GalleryCategory]}`}
                width={selectedImage.width}
                height={selectedImage.height}
                className="mx-auto h-auto max-h-[84vh] w-auto max-w-full rounded-lg object-contain"
                sizes="92vw"
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
