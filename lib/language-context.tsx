'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { translations, type Language, type Translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const uzTranslations: Translations = {
  ...translations.uz,
  rooms: {
    ...translations.uz.rooms,
    types: {
      ...translations.uz.rooms.types,
      standard: {
        ...translations.uz.rooms.types.standard,
        description: "Bog' manzarasi va yuqori darajadagi qulayliklar bilan nafis xona.",
      },
      suite: {
        ...translations.uz.rooms.types.suite,
        name: 'Lyuks',
      },
      president: {
        ...translations.uz.rooms.types.president,
        name: 'Prezident lyuksi',
      },
    },
    amenities: {
      ...translations.uz.rooms.amenities,
      minibar: 'Ichimliklar burchagi',
    },
  },
  restaurant: {
    ...translations.uz.restaurant,
    subtitle: 'Oshxona mahorati',
    description:
      "120 o'rinli restoranimiz bog'larimiz ne'matlarini mahalliy an'analar va zamonaviy did bilan uyg'unlashtirgan nafis taomlar orqali namoyon qiladi.",
  },
  garden: {
    ...translations.uz.garden,
    experiences: {
      ...translations.uz.garden.experiences,
      vineyard: {
        ...translations.uz.garden.experiences.vineyard,
        description: 'Uzumzorlarimizda sayr qiling va sara vinolardan tatib ko‘ring.',
      },
    },
  },
  gallery: {
    ...translations.uz.gallery,
    subtitle: "Ko'rgazmali sayohat",
  },
};

const SUPPORTED_LANGUAGES: readonly Language[] = ['uz', 'ru', 'en'];
const DEFAULT_LANGUAGE: Language = 'uz';
const STORAGE_KEY = 'language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server va klientning birinchi renderi bir xil bo'lishi shart, aks holda
  // hydration mismatch bo'ladi. Shuning uchun localStorage useEffect ichida o'qiladi.
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
        setLanguageState(saved);
      }
    } catch {
      // localStorage bloklangan (private mode / cookie siyosati) — default tilda qolamiz
    }
  }, []);

  // <html lang="..."> ni tanlangan tilga moslash: screen reader va Google uchun muhim
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // yozib bo'lmasa ham til sessiya davomida ishlayveradi
    }
  }, []);

  const t = language === 'uz' ? uzTranslations : translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
