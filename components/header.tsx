'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { Language } from '@/lib/translations';
import { cn } from '@/lib/utils';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
];

const uiLabels = {
  en: {
    changeLanguage: 'Change language',
    call: 'Call',
    callHotel: 'Call Miraki Gardens',
    openMenu: 'Open menu',
    language: 'Language',
  },
  ru: {
    changeLanguage: 'Сменить язык',
    call: 'Позвонить',
    callHotel: 'Позвонить в Miraki Gardens',
    openMenu: 'Открыть меню',
    language: 'Язык',
  },
  uz: {
    changeLanguage: "Tilni o'zgartirish",
    call: "Qo'ng'iroq qilish",
    callHotel: "Miraki Gardensga qo'ng'iroq qilish",
    openMenu: 'Menyuni ochish',
    language: 'Til',
  },
};

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const labels = uiLabels[language];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const phoneHref = `tel:${t.contact.phone.replace(/\s/g, '')}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = useMemo(() => [
    { href: '/#home', section: 'home', label: t.nav.home },
    { href: '/#rooms', section: 'rooms', label: t.nav.rooms },
    { href: '/#restaurant', section: 'restaurant', label: t.nav.restaurant },
    { href: '/#garden', section: 'garden', label: t.nav.garden },
    { href: '/#gallery', section: 'gallery', label: t.nav.gallery },
    { href: '/#contact', section: 'contact', label: t.nav.contact },
  ], [t.nav.home, t.nav.rooms, t.nav.restaurant, t.nav.garden, t.nav.gallery, t.nav.contact]);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.section))
      .filter(Boolean) as HTMLElement[];

    const updateActiveSection = () => {
      const pathSection = pathname.split('/').filter(Boolean)[0];
      if (pathSection && navLinks.some((link) => link.section === pathSection)) {
        setActiveSection(pathSection);
        return;
      }

      const current = sections
        .map((section) => ({
          id: section.id,
          distance: Math.abs(section.getBoundingClientRect().top - 120),
        }))
        .sort((a, b) => a.distance - b.distance)[0];

      setActiveSection(current?.id ?? 'home');
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('hashchange', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('hashchange', updateActiveSection);
    };
  }, [pathname, navLinks]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = linkRefs.current[activeSection];
      const nav = navRef.current;

      if (!activeLink || !nav) {
        setIndicatorStyle((style) => ({ ...style, opacity: 0 }));
        return;
      }

      const linkRect = activeLink.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();

      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection, navLinks]);

  const isActive = (section: string) => {
    return activeSection === section;
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const openBooking = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new Event('miraki:open-booking'));
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || isMobileMenuOpen
            ? 'bg-[#10261d]/94 backdrop-blur-xl shadow-lg shadow-black/10'
            : 'bg-gradient-to-b from-[#10261d]/60 to-transparent'
        )}
      >
        <div
          className={cn(
            'mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 sm:px-8 transition-all duration-300',
            isScrolled || isMobileMenuOpen ? 'h-16' : 'h-24'
          )}
        >
          <Link href="/#home" onClick={closeMobileMenu} className="relative z-50 flex items-center gap-4">
            <span className="relative hidden h-12 w-12 rotate-45 border-2 border-[#d4af37] sm:block">
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#d4af37]" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#d4af37]" />
            </span>
            <span className="leading-none">
              <span className="block text-xl sm:text-2xl font-medium uppercase tracking-[0.08em] text-[#f5f0e8]">
                Miraki
              </span>
              <span className="block text-lg sm:text-xl font-medium uppercase tracking-[0.1em] text-[#d4af37]">
                Gardens
              </span>
            </span>
          </Link>

          <nav ref={navRef} className="relative hidden lg:flex items-center gap-8 xl:gap-10">
            <span
              className="pointer-events-none absolute bottom-0 h-px rounded-full bg-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.7)] transition-all duration-500 ease-out"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(element) => {
                  linkRefs.current[link.section] = element;
                }}
                className={cn(
                  'premium-soft-transition premium-focus-ring relative py-3 text-sm tracking-[0.08em] uppercase font-[family-name:var(--font-montserrat)] font-medium text-[#f5f0e8]/88 hover:text-[#d4af37]',
                  isActive(link.section) && 'text-[#d4af37]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="premium-soft-transition premium-hover-lift premium-focus-ring flex min-w-20 items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-3 text-sm tracking-wider uppercase font-[family-name:var(--font-montserrat)] font-medium text-[#f5f0e8]/90 hover:border-[#d4af37]/45 hover:text-[#d4af37]"
                aria-label={labels.changeLanguage}
              >
                {languages.find((l) => l.code === language)?.label}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    isLangOpen && 'rotate-180'
                  )}
                />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-3 bg-[#10261d]/96 backdrop-blur-xl rounded-lg overflow-hidden shadow-xl min-w-[110px] border border-white/10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        'w-full px-4 py-3 text-left text-sm tracking-wider font-[family-name:var(--font-montserrat)] transition-colors',
                        language === lang.code
                          ? 'bg-[#d4af37]/20 text-[#d4af37]'
                          : 'text-[#f5f0e8]/90 hover:bg-[#f5f0e8]/10'
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={openBooking}
              className="premium-soft-transition premium-hover-lift premium-gold-glow premium-focus-ring rounded-lg bg-[#d4af37] px-7 py-4 text-[#1a3328] text-sm tracking-[0.12em] uppercase font-[family-name:var(--font-montserrat)] font-semibold hover:bg-[#c9a430]"
            >
              {t.nav.bookNow}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2 relative z-50">
            <a
              href={phoneHref}
              className="premium-soft-transition premium-focus-ring w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#f5f0e8] active:scale-95"
              aria-label={labels.callHotel}
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="premium-soft-transition premium-focus-ring w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#f5f0e8] active:scale-95"
              aria-label={labels.openMenu}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'lg:hidden fixed inset-0 z-40 bg-[#10261d] transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-4'
        )}
      >
        <div className="h-full pt-24 pb-8 px-6 flex flex-col">
          <nav className="flex-1 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  'premium-soft-transition premium-focus-ring py-4 border-b border-white/10 text-xl text-[#f5f0e8] tracking-wide font-medium hover:text-[#d4af37]',
                  isActive(link.section) && 'text-[#d4af37]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#f5f0e8]/50">
              {labels.language}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    'premium-soft-transition premium-focus-ring py-3 rounded-lg text-sm tracking-wider uppercase font-[family-name:var(--font-montserrat)] border',
                    language === lang.code
                      ? 'bg-[#d4af37] border-[#d4af37] text-[#1a3328]'
                      : 'border-white/15 text-[#f5f0e8]/80'
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={openBooking}
            className="premium-soft-transition premium-focus-ring mt-6 py-4 rounded-lg bg-[#d4af37] text-[#1a3328] text-center text-sm font-semibold tracking-wider uppercase"
          >
            {t.nav.bookNow}
          </button>

          <a
            href={phoneHref}
            className="premium-soft-transition premium-focus-ring mt-3 py-4 rounded-lg border border-white/15 text-[#f5f0e8] text-center text-sm font-semibold tracking-wider uppercase"
          >
            {labels.call}
          </a>
        </div>
      </div>
    </>
  );
}
