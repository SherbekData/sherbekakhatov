'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  // const [language, setLanguageState] = useState<Language>('uz');

  // const setLanguage = useCallback((lang: Language) => {
  //   setLanguageState(lang);
  // }, []);

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'uz';
    }
    return 'uz';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);

    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
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
