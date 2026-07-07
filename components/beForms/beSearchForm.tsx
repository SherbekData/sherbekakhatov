'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import "./be-style.css";

const PROMO_KEYWORDS = ['discount', 'discounts', 'promo', 'gift', 'special', 'sale', 'chegirma', 'chegirmalar', 'скидка', 'скидки'];

function isInjectedPromoElement(element: Element) {
  const value = [
    element.id,
    element.className,
    element.getAttribute('aria-label'),
    element.getAttribute('title'),
    element.getAttribute('data-testid'),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return PROMO_KEYWORDS.some((keyword) => value.includes(keyword));
}

function hideInjectedPromoWidgets() {
  if (window.innerWidth > 768) return;

  document.body.querySelectorAll('body > div, body > button, body > iframe, body > a').forEach((element) => {
    if (element.closest('#booking, #block-search, #be-search-form')) return;

    const rect = element.getBoundingClientRect();
    const isFloating = window.getComputedStyle(element).position === 'fixed' || window.getComputedStyle(element).position === 'sticky';
    const looksLikePromoBubble = rect.width <= 140 && rect.height <= 140 && rect.right > window.innerWidth - 180;

    if (isInjectedPromoElement(element) || (isFloating && looksLikePromoBubble)) {
      element.setAttribute('data-miraki-hidden-promo', 'true');
    }
  });
}

function BeSearchForm() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const searchForm = (w: any) => {
    // @ts-ignore
    !function(e,n){
      // @ts-ignore
      var t="bookingengine",o="integration",i=e[t]=e[t]||{},a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
      // @ts-ignore
      if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){a[c]=!0;var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
        // @ts-ignore
        !function n(i){if(0!==i.length){var a=l.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://"+i[0]+"/integration/loader.js",
            a.onerror=a.onload=function(n,i)
                // @ts-ignore
            {return function(){e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())}}(a,(function(){n(i.slice(1,i.length))})),g.appendChild(a)}}(
            ["uz-ibe.hopenapi.com", "ibe.hopenapi.com", "ibe.behopenapi.com"])}
    }(window, [
      ["setContext", "BE-INT-miraki-garden-uz_2026-05-20", language],
      ["embed", "search-form", {
        container: "be-search-form"
      }]
    ]);
  };

  const openBooking = () => setIsOpen(true);
  const closeBooking = () => {
    setIsOpen(false);

    if (window.location.search.includes('be-booking-open=true')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    }
  };

  useEffect(() => {
    searchForm(window);
  }, [language]);

  useEffect(() => {
    hideInjectedPromoWidgets();

    const observer = new MutationObserver(() => hideInjectedPromoWidgets());
    observer.observe(document.body, { childList: true, subtree: false });

    window.addEventListener('resize', hideInjectedPromoWidgets);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', hideInjectedPromoWidgets);
    };
  }, []);

  useEffect(() => {
    if (window.location.search.includes('be-booking-open=true')) {
      openBooking();
    }

    const handleOpenBooking = () => openBooking();
    const handleBookingClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const bookingLink = target?.closest('a[href*="be-booking-open=true"], .booking-link');

      if (!bookingLink) return;

      event.preventDefault();
      openBooking();
    };

    window.addEventListener('miraki:open-booking', handleOpenBooking);
    document.addEventListener('click', handleBookingClick);

    return () => {
      window.removeEventListener('miraki:open-booking', handleOpenBooking);
      document.removeEventListener('click', handleBookingClick);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('be-mobile-open', isOpen);
    document.body.classList.toggle('be-booking-open', isOpen);

    return () => {
      document.body.classList.remove('be-mobile-open');
      document.body.classList.remove('be-booking-open');
    };
  }, [isOpen]);

  return (
    <div id="booking" className={`sf-wrapper${isOpen ? ' is-open is-mobile-open' : ''}`}>
      <div id="block-search">
        <button
          type="button"
          className="be-mobile-close"
          onClick={closeBooking}
          aria-label="Bron formasini yopish"
        >
          <X aria-hidden="true" />
        </button>

        <div id="be-search-form" className="be-container">
          <a href="https://exely.com/" rel="nofollow" target="_blank">Hotel management software</a>
        </div>
      </div>
    </div>
  )
}

export default BeSearchForm