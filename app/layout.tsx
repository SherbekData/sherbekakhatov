import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import FloatingContact from '@/components/FloatingContact'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://miraki-garden.uz'),

  title: {
    default: 'Miraki Gardens – Shahrisabz dam olish maskani',
    template: '%s | Miraki Gardens',
  },

  description:
    "Shahrisabz dam olish maskani — Miraki Gardens. 500 gektar lavanda, uzumzor va tog' bag'rida hashamatli Standart, Suite va Prezident Suite xonalari. Bron qiling!",

  keywords: [
    // O'zbekcha
    'Shahrisabz dam olish maskani',
    'Shahrisabz oromgoh',
    'Shahrisabz dacha',
    'Shahrisabz mehmonxona',
    'Miraki Garden',
    'Miraki Gardens',
    'Miraki Gardens Shahrisabz',
    'lavanda bog Shahrisabz',
    'Shahrisabz tog kurort',
    'Shahrisabz hashamatli mehmonxona',
    'Qashqadaryo dam olish',
    'prezident suite Shahrisabz',
    // Ruscha
    'отдых в Шахрисабзе',
    'Шахрисабз отель',
    'Шахрисабз курорт',
    'Мираки Гарден',
    'отдых Узбекистан горы',
    'лаванда сад Узбекистан',
    'президентский люкс Шахрисабз',
    // Inglizcha
    'Shahrisabz resort',
    'Shahrisabz hotel',
    'luxury resort Uzbekistan',
    'lavender garden Uzbekistan',
    'mountain resort Shahrisabz',
    'Miraki Garden Shahrisabz',
    'president suite Uzbekistan',
  ],

  authors: [{ name: 'Miraki Gardens' }],
  creator: 'Miraki Gardens',
  publisher: 'Miraki Gardens',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: 'https://miraki-garden.uz',
    languages: {
      en: 'https://miraki-garden.uz',
      ru: 'https://miraki-garden.uz',
      uz: 'https://miraki-garden.uz',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['ru_RU', 'en_US'],
    url: 'https://miraki-garden.uz',
    siteName: 'Miraki Gardens',
    title: 'Miraki Gardens – Shahrisabz dam olish maskani',
    description:
      "Shahrisabz dam olish maskani — Miraki Gardens. 500 gektar lavanda, uzumzor va tog' bag'rida hashamatli xonalar. Bron qiling!",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Miraki Gardens – Shahrisabz dam olish maskani',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Miraki Gardens – Shahrisabz dam olish maskani',
    description:
      "500 gektar lavanda, uzumzor va tog' bag'rida hashamatli xonalar. Shahrisabz, O'zbekiston.",
    images: ['/images/og-image.jpg'],
  },

  other: {
    'theme-color': '#1a3328',
    'msapplication-TileColor': '#1a3328',
    'google-site-verification': 'mo4N4HxO89XgY7bP1fQu9eU3MbyWp38wZxCqXOlwgVI',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LodgingBusiness',
      '@id': 'https://miraki-garden.uz/#lodging',
      name: 'Miraki Gardens',
      alternateName: 'Miraki Garden',
      description:
        "Shahrisabzda hashamatli tog' bog' dam olish maskani. 500 gektar lavanda dalalari, uzumzorlar va tabiatda noyob xonalar.",
      url: 'https://miraki-garden.uz',
      telephone: '+998873378888',
      email: 'info@mirakigarden.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Uloch MFY',
        addressLocality: 'Shahrisabz',
        addressRegion: 'Qashqadaryo',
        addressCountry: 'UZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '39.026111',
        longitude: '67.079361',
      },
      image: 'https://miraki-garden.uz/images/og-image.jpg',
      priceRange: '1 400 000 – 2 200 000 UZS',
      currenciesAccepted: 'UZS',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Mountain View', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Garden', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Vineyard', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Lavender Fields', value: true },
      ],
      numberOfRooms: 3,
      starRating: { '@type': 'Rating', ratingValue: '5' },
      sameAs: [
        'https://t.me/MirakiGardens',
        'https://instagram.com/mirakigarden',
      ],
    },
    {
      '@type': 'Restaurant',
      '@id': 'https://miraki-garden.uz/#restaurant',
      name: 'Miraki Gardens Restaurant',
      description: "Bog'dan dasturxonga — 120 o'rinli restoran, panoramik tog' manzaralari.",
      url: 'https://miraki-garden.uz/#restaurant',
      telephone: '+998554058888',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Shahrisabz',
        addressCountry: 'UZ',
      },
      servesCuisine: ['Uzbek', 'Mediterranean'],
      acceptsReservations: true,
      seatingCapacity: 120,
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cormorant.variable} ${montserrat.variable} font-serif antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <FloatingContact />
        <Analytics />
      </body>
    </html>
  )
}
