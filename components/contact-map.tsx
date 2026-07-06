import { ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';

const YANDEX_MAP_URL = 'https://yandex.uz/maps/?ll=67.079361%2C39.026111&z=16&pt=67.079361,39.026111,pm2rdm';
const YANDEX_ROUTE_URL = 'https://yandex.uz/maps/?rtext=~39.026111%2C67.079361&rtt=auto&z=15';

type ContactMapLabels = {
  mapSubtitle: string;
  locationNote: string;
  coordinates: string;
  shortAddress: string;
  distance: string;
  openMap?: string;
  routeText?: string;
};

export function ContactMap({ labels }: { labels: ContactMapLabels }) {
  return (
    <>
      <div
        className="relative overflow-hidden rounded-2xl border border-[#d4af37]/35 bg-[#d9d8cf] shadow-2xl shadow-[#1a3328]/10"
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
        <div className="absolute inset-6 rounded-md border border-[#d4af37]/35" />
        <div className="absolute -left-16 top-20 h-24 w-[140%] rotate-[-12deg] rounded-full border border-[#1a3328]/10" />
        <div className="absolute -right-20 bottom-24 h-32 w-[125%] rotate-[14deg] rounded-full border border-[#1a3328]/10" />
        <div className="absolute left-5 right-5 top-5 rounded-full border border-[#d4af37]/35 bg-[#f5f0e8]/55 px-4 py-2 text-center text-[10px] uppercase tracking-[0.22em] text-[#1a3328]/55 backdrop-blur-md font-[family-name:var(--font-montserrat)] sm:left-10 sm:right-auto">
          {labels.locationNote}
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="relative z-10 w-full max-w-[420px] rounded-2xl border border-white/50 bg-[#f5f0e8]/82 p-6 text-center shadow-2xl shadow-[#1a3328]/12 backdrop-blur-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a3328] shadow-lg shadow-[#1a3328]/20">
              <MapPin className="h-8 w-8 text-[#d4af37]" />
            </div>
            <h3 className="mb-1 text-2xl font-medium text-[#1a3328]">Miraki Gardens</h3>
            <p className="mb-4 text-sm text-[#1a3328]/62">{labels.mapSubtitle}</p>
            <div className="mx-auto mb-4 h-px w-20 bg-[#d4af37]/60" />
            <p className="mb-5 font-[family-name:var(--font-montserrat)] text-[11px] uppercase tracking-[0.18em] text-[#1a3328]/55">
              {labels.coordinates}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={YANDEX_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1a3328]/15 bg-white/45 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#1a3328] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/60 hover:bg-white/70"
              >
                <ExternalLink className="h-4 w-4 text-[#d4af37]" />
                {labels.openMap ?? 'Open Map'}
              </a>
              <a
                href={YANDEX_ROUTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a3328] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#f5f0e8] shadow-xl shadow-[#1a3328]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#243d32]"
              >
                <Navigation className="h-4 w-4 text-[#d4af37]" />
                {labels.routeText ?? 'Route'}
              </a>
            </div>
          </div>
        </div>
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
    </>
  );
}
