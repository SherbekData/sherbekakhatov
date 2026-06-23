'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import { MapPin, Phone, Mail, ExternalLink, MessageCircle, Send, Instagram } from 'lucide-react';

const WHATSAPP_NUMBER = '998873378888';
const WHATSAPP_MESSAGE = "Salom, Miraki Gardens haqida ma'lumot olmoqchiman";
const TELEGRAM_URL = 'https://t.me/MirakiGardens';
const INSTAGRAM_URL = 'https://www.instagram.com/miraki_gardens?igsh=MWJqb3kzMjl3MW1uYw==';

const contactLabels = {
  en: {
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    mapSubtitle: 'Shahrisabz, Uzbekistan',
    route: 'Route',
    shortAddress: 'Uloch MFY, Shahrisabz',
    distance: 'About 15 minutes from Shahrisabz',
    locationNote: 'Mountain garden retreat',
    coordinates: '39.026111, 67.079361',
    channels: {
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
    },
  },
  ru: {
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Эл. почта',
    mapSubtitle: 'Шахрисабз, Узбекистан',
    route: 'Маршрут',
    shortAddress: 'Улоч МФЙ, Шахрисабз',
    distance: 'Около 15 минут от Шахрисабза',
    locationNote: 'Горный садовый курорт',
    coordinates: '39.026111, 67.079361',
    channels: {
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
    },
  },
  uz: {
    address: 'Manzil',
    phone: 'Telefon',
    email: 'Elektron pochta',
    mapSubtitle: "Shahrisabz, O'zbekiston",
    route: 'Marshrut',
    shortAddress: 'Uloch MFY, Shahrisabz',
    distance: 'Shahrisabzdan taxminan 15 daqiqa',
    locationNote: "Tog' bag'ridagi bog' dam olish maskani",
    coordinates: '39.026111, 67.079361',
    channels: {
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
    },
  },
};

export function Contact() {
  const { language, t } = useLanguage();
  const labels = contactLabels[language];
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isChannelPickerOpen, setIsChannelPickerOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const contactChannels = [
    {
      href: TELEGRAM_URL,
      label: labels.channels.telegram,
      icon: Send,
      className: 'hover:border-sky-500/40 hover:bg-sky-500/10',
    },
    {
      href: whatsappUrl,
      label: labels.channels.whatsapp,
      icon: MessageCircle,
      className: 'hover:border-emerald-500/40 hover:bg-emerald-500/10',
    },
    {
      href: INSTAGRAM_URL,
      label: labels.channels.instagram,
      icon: Instagram,
      className: 'hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10',
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#f5f0e8] relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className={cn(
            'inline-block text-[#d4af37] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {t.contact.subtitle}
          </span>

          <h2 className={cn(
            'text-4xl md:text-5xl lg:text-6xl text-[#1a3328] font-medium mb-6 transition-all duration-700 delay-100',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {t.contact.title}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className={cn(
            'transition-all duration-1000',
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          )}>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a3328]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a3328] transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-[#1a3328] group-hover:text-[#d4af37] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-[#1a3328] font-medium text-lg mb-2">{labels.address}</h3>
                  <p className="text-[#1a3328]/60 leading-relaxed">
                    {t.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a3328]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a3328] transition-colors duration-300">
                  <Phone className="w-6 h-6 text-[#1a3328] group-hover:text-[#d4af37] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-[#1a3328] font-medium text-lg mb-2">{labels.phone}</h3>
                  <a
                    href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                    className="text-[#1a3328]/60 hover:text-[#1a3328] transition-colors duration-300"
                  >
                    {t.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a3328]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a3328] transition-colors duration-300">
                  <Mail className="w-6 h-6 text-[#1a3328] group-hover:text-[#d4af37] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-[#1a3328] font-medium text-lg mb-2">{labels.email}</h3>
                  <p className="text-[#1a3328]/60">
                    {t.contact.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-12 inline-block">
              <button
                type="button"
                onClick={() => setIsChannelPickerOpen((isOpen) => !isOpen)}
                aria-expanded={isChannelPickerOpen}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a3328] text-[#f5f0e8] text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] font-medium hover:bg-[#2a4338] transition-all duration-300"
              >
                {t.contact.cta}
                <ExternalLink className="w-4 h-4" />
              </button>

              {isChannelPickerOpen && (
                <div className="absolute left-0 top-full z-20 mt-3 w-64 overflow-hidden rounded-lg border border-[#1a3328]/10 bg-[#f5f0e8] shadow-2xl shadow-[#1a3328]/15">
                  {contactChannels.map((channel) => {
                    const Icon = channel.icon;

                    return (
                      <a
                        key={channel.href}
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-3 border-b border-[#1a3328]/10 px-5 py-4 text-sm font-[family-name:var(--font-montserrat)] font-semibold text-[#1a3328] transition-colors last:border-b-0',
                          channel.className
                        )}
                      >
                        <Icon className="h-4 w-4 text-[#d4af37]" />
                        {channel.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className={cn(
            'transition-all duration-1000 delay-300',
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          )}>
            <div
              className="relative overflow-hidden rounded-lg border border-[#d4af37]/35 bg-[#d9d8cf] shadow-2xl shadow-[#1a3328]/10"
              style={{ aspectRatio: '4/3' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 28% 25%, rgba(212,175,55,0.22), transparent 30%), radial-gradient(circle at 72% 72%, rgba(26,51,40,0.16), transparent 35%), linear-gradient(135deg, #e5e1d5 0%, #d3d4ca 48%, #ece6d8 100%)',
                }}
              />
              <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'linear-gradient(rgba(26,51,40,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(26,51,40,0.08) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
              <div className="absolute inset-6 border border-[#d4af37]/35 rounded-md" />
              <div className="absolute -left-16 top-20 h-24 w-[140%] rotate-[-12deg] rounded-full border border-[#1a3328]/10" />
              <div className="absolute -right-20 bottom-24 h-32 w-[125%] rotate-[14deg] rounded-full border border-[#1a3328]/10" />
              <div className="absolute left-10 top-10 rounded-full border border-[#d4af37]/35 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#1a3328]/55 font-[family-name:var(--font-montserrat)]">
                {labels.locationNote}
              </div>

              <a
                href="https://yandex.uz/maps/?ll=67.079361%2C39.026111&z=16&pt=67.079361,39.026111,pm2rdm"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="relative z-10 w-[min(78%,360px)] rounded-lg border border-white/45 bg-[#f5f0e8]/78 p-6 text-center shadow-xl shadow-[#1a3328]/10 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a3328] shadow-lg shadow-[#1a3328]/20">
                    <MapPin className="h-8 w-8 text-[#d4af37]" />
                  </div>
                  <h3 className="text-2xl text-[#1a3328] font-medium mb-1">
                    Miraki Gardens
                  </h3>
                  <p className="text-[#1a3328]/62 text-sm mb-4">
                    {labels.mapSubtitle}
                  </p>
                  <div className="mx-auto h-px w-20 bg-[#d4af37]/60 mb-4" />
                  <p className="font-[family-name:var(--font-montserrat)] text-[11px] tracking-[0.18em] uppercase text-[#1a3328]/55">
                    {labels.coordinates}
                  </p>
                </div>
              </a>

              <a
                href="https://yandex.uz/maps/?rtext=~39.026111%2C67.079361&rtt=auto&z=15"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full bg-[#1a3328] px-5 py-3 text-sm font-semibold tracking-wide text-[#f5f0e8] shadow-xl shadow-[#1a3328]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#243d32]"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                {labels.route}
              </a>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <span className="flex items-center gap-2 rounded-full border border-[#1a3328]/10 bg-white/45 px-4 py-3 text-sm text-[#1a3328]/62">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                {labels.shortAddress}
              </span>
              <span className="flex items-center gap-2 rounded-full border border-[#1a3328]/10 bg-white/45 px-4 py-3 text-sm text-[#1a3328]/62">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                {labels.distance}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
