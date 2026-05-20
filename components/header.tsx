'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { Language } from '@/lib/translations';
import { cn } from '@/lib/utils';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
];

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

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

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#rooms', label: t.nav.rooms },
    { href: '#restaurant', label: t.nav.restaurant },
    { href: '#garden', label: t.nav.garden },
    { href: '#gallery', label: t.nav.gallery },
    { href: '?be-booking-open=true', label: t.nav.booking, forceReload: true },
    { href: '#contact', label: t.nav.contact },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || isMobileMenuOpen
            ? 'bg-[#1a3328]/95 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div
          className={cn(
            'container mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300',
            isScrolled || isMobileMenuOpen ? 'h-16' : 'h-20'
          )}
        >
          {/* Logo */}
          <Link href="#home" onClick={closeMobileMenu} className="relative z-50">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-[#f5f0e8]">
              Miraki Garden
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.forceReload) {
                    e.preventDefault();
                    window.location.href = link.href;
                  }
                }}
                className="text-sm tracking-widest uppercase font-[family-name:var(--font-montserrat)] font-medium text-[#f5f0e8]/90 hover:text-[#d4af37] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-sm tracking-wider uppercase font-[family-name:var(--font-montserrat)] font-medium text-[#f5f0e8]/90 hover:text-[#d4af37] transition-colors"
                aria-label="Change language"
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
                <div className="absolute top-full right-0 mt-3 bg-[#1a3328]/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-xl min-w-[110px] border border-white/10">
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

            <Link
                href="?be-booking-open=true"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  window.location.href = '?be-booking-open=true';
                }}
              className="booking-link px-6 py-3 bg-[#d4af37] text-[#1a3328] text-sm tracking-widest uppercase font-[family-name:var(--font-montserrat)] font-semibold rounded-full hover:bg-[#c9a430] transition-colors duration-300"
            >
              {t.nav.bookNow}
            </Link>
          </div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden flex items-center gap-2 relative z-50">
            <a
              href="tel:+998XXXXXXXXX"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#f5f0e8] active:scale-95 transition"
              aria-label="Call Miraki Garden"
            >
              <Phone className="w-5 h-5" />
            </a>

            <Link
                href="?be-booking-open=true"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  window.location.href = '?be-booking-open=true';
                }}
              className="hidden xs:inline-flex px-4 py-2 rounded-full bg-[#d4af37] text-[#1a3328] text-xs font-semibold uppercase tracking-wider"
            >
              {t.nav.bookNow}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#f5f0e8] active:scale-95 transition"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-40 bg-[#1a3328] transition-all duration-300',
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
                onClick={(e) => {
                  closeMobileMenu();
                  if (link.forceReload) {
                    e.preventDefault();
                    window.location.href = link.href;
                  }
                }}
                className="py-4 border-b border-white/10 text-xl text-[#f5f0e8] tracking-wide font-medium hover:text-[#d4af37] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Language */}
          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#f5f0e8]/50">
              Language
            </p>
            <div className="grid grid-cols-3 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    'py-3 rounded-full text-sm tracking-wider uppercase font-[family-name:var(--font-montserrat)] transition-colors border',
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

          {/* Mobile Bottom CTAs */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <a
              href="tel:+998554058888"
              className="py-4 rounded-full border border-white/15 text-[#f5f0e8] text-center text-sm font-semibold tracking-wider uppercase"
            >
              Call
            </a>

            <Link
                href="?be-booking-open=true"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  window.location.href = '?be-booking-open=true';
                }}
                className="py-4 rounded-full bg-[#d4af37] text-[#1a3328] text-center text-sm font-semibold tracking-wider uppercase"
            >
              {t.nav.bookNow}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
