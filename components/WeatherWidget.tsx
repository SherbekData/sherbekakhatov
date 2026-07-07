'use client'

import { useEffect, useMemo, useState } from 'react'
import { CloudSun, Droplets, Loader2, MapPin, ThermometerSun, Wind } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

const LATITUDE = 39.026111
const LONGITUDE = 67.079361
const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia%2FTashkent`

type WeatherData = {
  current?: {
    temperature_2m?: number
    relative_humidity_2m?: number
    wind_speed_10m?: number
    weather_code?: number
  }
}

const labels = {
  en: {
    eyebrow: 'Live weather',
    title: 'Weather at Miraki Gardens',
    location: 'Uloch MFY, Shahrisabz',
    loading: 'Loading weather',
    unavailable: 'Weather temporarily unavailable',
    humidity: 'Humidity',
    wind: 'Wind',
    condition: 'Condition',
    cta: 'Plan your stay with the mountain weather in mind.',
    conditions: {
      clear: 'Clear sky',
      cloudy: 'Cloudy',
      fog: 'Foggy',
      drizzle: 'Drizzle',
      rain: 'Rain',
      snow: 'Snow',
      thunder: 'Thunderstorm',
      unknown: 'Mountain weather',
    },
  },
  ru: {
    eyebrow: 'Погода онлайн',
    title: 'Погода в Miraki Gardens',
    location: 'Улоч МФЙ, Шахрисабз',
    loading: 'Загрузка погоды',
    unavailable: 'Погода временно недоступна',
    humidity: 'Влажность',
    wind: 'Ветер',
    condition: 'Состояние',
    cta: 'Планируйте отдых с учетом горной погоды.',
    conditions: {
      clear: 'Ясно',
      cloudy: 'Облачно',
      fog: 'Туман',
      drizzle: 'Морось',
      rain: 'Дождь',
      snow: 'Снег',
      thunder: 'Гроза',
      unknown: 'Горная погода',
    },
  },
  uz: {
    eyebrow: 'Jonli ob-havo',
    title: 'Miraki Gardens ob-havosi',
    location: 'Uloch MFY, Shahrisabz',
    loading: 'Ob-havo yuklanmoqda',
    unavailable: 'Ob-havo vaqtincha mavjud emas',
    humidity: 'Namlik',
    wind: 'Shamol',
    condition: 'Holat',
    cta: "Dam olishni tog' ob-havosini hisobga olib rejalashtiring.",
    conditions: {
      clear: 'Ochiq havo',
      cloudy: 'Bulutli',
      fog: 'Tuman',
      drizzle: "Mayda yomg'ir",
      rain: "Yomg'ir",
      snow: 'Qor',
      thunder: 'Momaqaldiroq',
      unknown: "Tog' ob-havosi",
    },
  },
}

function getConditionKey(code?: number) {
  if (code === undefined) return 'unknown'
  if (code === 0) return 'clear'
  if ([1, 2, 3].includes(code)) return 'cloudy'
  if ([45, 48].includes(code)) return 'fog'
  if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle'
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow'
  if ([95, 96, 99].includes(code)) return 'thunder'
  return 'unknown'
}

export function WeatherWidget() {
  const { language } = useLanguage()
  const text = labels[language]
  const [data, setData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadWeather() {
      try {
        const response = await fetch(WEATHER_URL, { cache: 'no-store' })
        if (!response.ok) throw new Error('Weather request failed')
        const json = await response.json()

        if (isMounted) {
          setData(json)
          setHasError(false)
        }
      } catch {
        if (isMounted) {
          setHasError(true)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadWeather()

    return () => {
      isMounted = false
    }
  }, [])

  const conditionKey = useMemo(() => getConditionKey(data?.current?.weather_code), [data])
  const temperature = data?.current?.temperature_2m
  const humidity = data?.current?.relative_humidity_2m
  const wind = data?.current?.wind_speed_10m

  return (
    <section className="relative overflow-hidden bg-[#f5f0e8] px-5 py-14 sm:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#d4af37]/30 bg-[#10261d] p-6 text-[#f5f0e8] shadow-2xl shadow-[#10261d]/15 sm:p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.18),transparent_34%),radial-gradient(circle_at_82%_68%,rgba(245,240,232,0.08),transparent_32%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-2 font-[family-name:var(--font-montserrat)] text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d4af37]">
                <CloudSun className="h-4 w-4" />
                {text.eyebrow}
              </div>

              <h2 className="text-4xl font-medium leading-none md:text-5xl lg:text-6xl">
                {text.title}
              </h2>

              <div className="mt-5 flex items-center gap-2 text-[#f5f0e8]/70">
                <MapPin className="h-4 w-4 text-[#d4af37]" />
                <span className="font-[family-name:var(--font-montserrat)] text-sm">
                  {text.location}
                </span>
              </div>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#f5f0e8]/72">
                {text.cta}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-md sm:p-6">
              {isLoading ? (
                <div className="flex min-h-44 items-center justify-center gap-3 text-[#f5f0e8]/70">
                  <Loader2 className="h-5 w-5 animate-spin text-[#d4af37]" />
                  <span className="font-[family-name:var(--font-montserrat)] text-sm uppercase tracking-[0.18em]">
                    {text.loading}
                  </span>
                </div>
              ) : hasError ? (
                <div className="flex min-h-44 items-center justify-center text-center font-[family-name:var(--font-montserrat)] text-sm uppercase tracking-[0.16em] text-[#f5f0e8]/65">
                  {text.unavailable}
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <div className="font-[family-name:var(--font-montserrat)] text-[10px] uppercase tracking-[0.22em] text-[#d4af37]">
                        {text.condition}
                      </div>
                      <div className="mt-2 text-xl text-[#f5f0e8]">
                        {text.conditions[conditionKey]}
                      </div>
                    </div>
                    <div className="text-right text-6xl font-medium leading-none text-[#d4af37] md:text-7xl">
                      {Math.round(temperature ?? 0)}°
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <WeatherMetric
                      icon={Droplets}
                      label={text.humidity}
                      value={humidity !== undefined ? `${Math.round(humidity)}%` : '—'}
                    />
                    <WeatherMetric
                      icon={Wind}
                      label={text.wind}
                      value={wind !== undefined ? `${Math.round(wind)} km/h` : '—'}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WeatherMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ThermometerSun
  label: string
  value: string
}) {
  return (
    <div className={cn('rounded-2xl border border-white/10 bg-[#08120d]/35 p-4')}>
      <Icon className="mb-3 h-5 w-5 text-[#d4af37]" />
      <div className="font-[family-name:var(--font-montserrat)] text-[10px] uppercase tracking-[0.18em] text-[#f5f0e8]/48">
        {label}
      </div>
      <div className="mt-1 text-2xl font-medium text-[#f5f0e8]">{value}</div>
    </div>
  )
}
