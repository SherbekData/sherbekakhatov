'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import type { Language } from '@/lib/translations';
import { Instagram, Facebook, Youtube, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: "O'zbek" },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const { language, setLanguage, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#rooms', label: t.nav.rooms },
    { href: '#restaurant', label: t.nav.restaurant },
    { href: '#garden', label: t.nav.garden },
    { href: '#gallery', label: t.nav.gallery },
    { href: '?be-booking-open=true', label: t.nav.booking, forceReload: true },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-[#1a3328] pt-20 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d4af37] rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl text-[#f5f0e8] font-medium mb-4">
              Miraki Garden
            </h3>
            <p className="text-[#f5f0e8]/60 mb-6 leading-relaxed">
              {t.footer.tagline}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-[#f5f0e8]/20 flex items-center justify-center text-[#f5f0e8]/60 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-6">
              Navigation
            </h4>
            <nav className="space-y-3">
              {navLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-6">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.forceReload) {
                      e.preventDefault();
                      window.location.href = link.href;
                    }
                  }}
                  className="block text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="#" className="block text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors">
                {t.footer.links.privacy}
              </Link>
              <Link href="#" className="block text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors">
                {t.footer.links.terms}
              </Link>
            </nav>
          </div>

          {/* Contact & Language */}
          <div>
            <h4 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-6">
              {t.contact.title}
            </h4>
            <div className="space-y-3 text-[#f5f0e8]/60 mb-8">
              <p>{t.contact.address}</p>
              <p>{t.contact.phone}</p>
              <p>{t.contact.email}</p>
            </div>

            {/* Language Switcher */}
            <div className="flex gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    'text-xs tracking-wider font-[family-name:var(--font-montserrat)] transition-colors',
                    language === lang.code
                      ? 'text-[#d4af37]'
                      : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8]'
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#f5f0e8]/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#f5f0e8]/40 text-sm font-[family-name:var(--font-montserrat)]">
            &copy; {new Date().getFullYear()} Miraki Garden. {t.footer.copyright}
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#f5f0e8]/40 hover:text-[#d4af37] transition-colors text-sm font-[family-name:var(--font-montserrat)]"
          >
            Back to top
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
