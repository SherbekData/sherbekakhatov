import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Miraki Gardens',
    short_name: 'Miraki',
    description: "Shahrisabzdagi tog' bag'rida joylashgan premium dam olish maskani.",
    start_url: '/',
    display: 'standalone',
    background_color: '#08120d',
    theme_color: '#1a3328',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
