'use client';

import React, { useEffect, useState } from 'react';
import { KeyRound, X } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import "./be-style.css";

function BeSearchForm() {
  const { language } = useLanguage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  useEffect(() => {
    searchForm(window);
  }, [language]);

  useEffect(() => {
    const openBooking = () => setIsMobileOpen(true);

    window.addEventListener('miraki:open-booking', openBooking);

    return () => window.removeEventListener('miraki:open-booking', openBooking);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('be-mobile-open', isMobileOpen);

    return () => document.body.classList.remove('be-mobile-open');
  }, [isMobileOpen]);

  return (
    <>
      <button
        type="button"
        className={`be-mobile-trigger${isMobileOpen ? ' is-hidden' : ''}`}
        onClick={() => setIsMobileOpen(true)}
        aria-controls="block-search"
        aria-expanded={isMobileOpen}
        aria-label="Xonani bron qilish"
      >
        <KeyRound aria-hidden="true" />
      </button>

      <div id="booking" className={`sf-wrapper${isMobileOpen ? ' is-mobile-open' : ''}`}>
        <div id="block-search">
          <button
            type="button"
            className="be-mobile-close"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Bron formasini yopish"
          >
            <X aria-hidden="true" />
          </button>

          <div id="be-search-form" className="be-container">
            <a href="https://exely.com/" rel="nofollow" target="_blank">Hotel management software</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default BeSearchForm
