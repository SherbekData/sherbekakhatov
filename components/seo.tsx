'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';

const seoData = {
  en: {
    title: 'Miraki Garden – Resort in Shahrisabz, Official site',
    description: 'Miraki Garden – Modern resort in Shahrisabz. Relax in the heart of nature.',
    keywords: 'Shahrisabz dam olish maskani, Miraki Garden, Shahrisabz hotel, отдых в Шахрисабзе, resort in Shahrisabz',
    locale: 'en_US',
    lang: 'en',
  },
  ru: {
    title: 'Miraki Garden – Курорт в Шахрисабзе, Официальный сайт',
    description: 'Miraki Garden – Современный курорт в Шахрисабзе. Отдохните на лоне природы.',
    keywords: 'Shahrisabz dam olish maskani, Miraki Garden, Shahrisabz hotel, отдых в Шахрисабзе, resort in Shahrisabz',
    locale: 'ru_RU',
    lang: 'ru',
  },
  uz: {
    title: 'Miraki Garden – Shahrisabz dam olish maskani, Rasmiy sayt',
    description: "Miraki Garden – Shahrisabzda joylashgan zamonaviy dam olish maskani. Tabiat qo'ynida dam oling.",
    keywords: 'Shahrisabz dam olish maskani, Miraki Garden, Shahrisabz hotel, отдых в Шахрисабзе, resort in Shahrisabz',
    locale: 'uz_UZ',
    lang: 'uz',
  },
};

const CANONICAL_URL = 'https://miraki-garden.uz';
const SITE_NAME = 'Miraki Garden';
const OG_IMAGE = '/images/og-image.jpg';

export function SEO() {
  const { language } = useLanguage();
  const data = seoData[language];

  useEffect(() => {
    // Update document title
    document.title = data.title;

    // Update html lang attribute
    document.documentElement.lang = data.lang;

    // Helper function to update or create meta tag
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper function to update or create link tag
    const updateLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]` 
        : `link[rel="${rel}"]:not([hreflang])`;
      let link = document.querySelector(selector) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        if (hreflang) link.hreflang = hreflang;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic meta tags
    updateMeta('description', data.description);
    updateMeta('keywords', data.keywords);
    updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMeta('author', 'Miraki Garden');

    // Canonical URL
    updateLink('canonical', CANONICAL_URL);

    // Alternate language links
    updateLink('alternate', CANONICAL_URL, 'en');
    updateLink('alternate', CANONICAL_URL, 'ru');
    updateLink('alternate', CANONICAL_URL, 'uz');
    updateLink('alternate', CANONICAL_URL, 'x-default');

    // Open Graph tags
    updateMeta('og:type', 'website', true);
    updateMeta('og:url', CANONICAL_URL, true);
    updateMeta('og:site_name', SITE_NAME, true);
    updateMeta('og:title', data.title, true);
    updateMeta('og:description', data.description, true);
    updateMeta('og:image', `${CANONICAL_URL}${OG_IMAGE}`, true);
    updateMeta('og:image:width', '1200', true);
    updateMeta('og:image:height', '630', true);
    updateMeta('og:locale', data.locale, true);

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:url', CANONICAL_URL);
    updateMeta('twitter:title', data.title);
    updateMeta('twitter:description', data.description);
    updateMeta('twitter:image', `${CANONICAL_URL}${OG_IMAGE}`);

    // Additional SEO tags
    updateMeta('theme-color', '#1a3328');
    updateMeta('msapplication-TileColor', '#1a3328');

  }, [language, data]);

  return null;
}
