
'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Quote, Star, X } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { Review } from '@/lib/reviews';

const REVIEWS_API_URL = process.env.NEXT_PUBLIC_REVIEWS_API_URL ?? 'https://reviews.miraki-garden.uz';

const copy = {
  uz: {
    eyebrow: 'Mehmonlar tajribasi', title: 'Mehmonlar fikri', empty: 'Birinchi izohni siz qoldiring.',
    write: 'Izoh qoldirish', verified: 'Tasdiqlangan mehmon', modalTitle: 'Tajribangizni baham ko‘ring',
    name: 'Ismingiz', phone: 'Telefon raqamingiz', room: 'Yashagan xonangiz', rating: 'Baholang',
    comment: 'Izohingiz', send: 'Tekshiruvga yuborish', sending: 'Yuborilmoqda…',
    success: 'Rahmat! Izohingiz administrator tekshiruvidan keyin saytda chiqadi.',
    error: 'Izoh yuborilmadi. Ma’lumotlarni tekshirib qayta urinib ko‘ring.',
    rooms: { standard: 'Standart', suite: 'Lyuks', president: 'Prezident apartamenti' },
  },
  ru: {
    eyebrow: 'Впечатления гостей', title: 'Отзывы гостей', empty: 'Оставьте первый отзыв.',
    write: 'Оставить отзыв', verified: 'Подтверждённый гость', modalTitle: 'Поделитесь впечатлениями',
    name: 'Ваше имя', phone: 'Номер телефона', room: 'Ваш номер', rating: 'Оценка',
    comment: 'Ваш отзыв', send: 'Отправить на проверку', sending: 'Отправка…',
    success: 'Спасибо! Отзыв появится после проверки администратором.',
    error: 'Не удалось отправить отзыв. Проверьте данные и повторите попытку.',
    rooms: { standard: 'Стандарт', suite: 'Люкс', president: 'Президентский Аппартамент' },
  },
  en: {
    eyebrow: 'Guest experiences', title: 'Guest reviews', empty: 'Be the first to leave a review.',
    write: 'Leave a review', verified: 'Verified guest', modalTitle: 'Share your experience',
    name: 'Your name', phone: 'Phone number', room: 'Room stayed in', rating: 'Rating',
    comment: 'Your review', send: 'Submit for review', sending: 'Sending…',
    success: 'Thank you! Your review will appear after administrator approval.',
    error: 'The review could not be sent. Check the fields and try again.',
    rooms: { standard: 'Standard', suite: 'Suite', president: 'Presidential Apartment' },
  },
} as const;

export function Testimonials() {
  const { language } = useLanguage();
  const labels = copy[language];
  const [reviews, setReviews] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch(`${REVIEWS_API_URL}/reviews`).then((response) => response.json()).then((data) => setReviews(data.reviews ?? [])).catch(() => setReviews([]));
  }, []);

  const visibleReviews = useMemo(() => reviews.slice(0, 6), [reviews]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);

    const response = await fetch(`${REVIEWS_API_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guestName: form.get('guestName'), phone: form.get('phone'), roomType: form.get('roomType'),
        comment: form.get('comment'), website: form.get('website'), rating, language,
      }),
    }).catch(() => null);

    setBusy(false);
    if (!response?.ok) {
      setMessage({ type: 'error', text: labels.error });
      return;
    }
    event.currentTarget.reset();
    setRating(5);
    setMessage({ type: 'success', text: labels.success });
  }

  return (
    <section
      id="reviews"
      className={`bg-[#10271e] text-[#f5f0e8] ${visibleReviews.length === 0 ? 'py-8 md:py-10' : 'py-24 md:py-32'}`}
    >
      <div className="container mx-auto px-6">
        <div className={visibleReviews.length === 0 ? 'flex justify-center' : 'mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end'}>
          {visibleReviews.length > 0 && <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#d4af37]">{labels.eyebrow}</p>
            <h2 className="text-4xl font-medium md:text-6xl">{labels.title}</h2>
          </div>}
          <button onClick={() => { setOpen(true); setMessage(null); }} className="premium-focus-ring border border-[#d4af37] px-7 py-3 text-xs uppercase tracking-[0.2em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#10271e]">
            {labels.write}
          </button>
        </div>

        {visibleReviews.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-white/10 bg-white/[0.06] p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-1" aria-label={`${review.rating}/5`}>
                    {Array.from({ length: 5 }).map((_, index) => <Star key={index} className={`h-4 w-4 ${index < review.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-white/20'}`} />)}
                  </div>
                  <Quote className="h-7 w-7 text-[#d4af37]/45" />
                </div>
                <p className="mb-7 text-lg leading-relaxed text-white/85">“{review.comment}”</p>
                <div className="border-t border-white/10 pt-5">
                  <p className="font-medium">{review.guest_name}</p>
                  <p className="mt-1 text-sm text-white/45">{labels.rooms[review.room_type as keyof typeof labels.rooms] ?? review.room_type}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#d4af37]"><CheckCircle2 className="h-3.5 w-3.5" />{labels.verified}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true">
          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-[#f5f0e8] p-6 text-[#1a3328] shadow-2xl sm:max-w-xl sm:rounded-2xl sm:p-9">
            <div className="mb-7 flex items-center justify-between gap-4">
              <h3 className="text-3xl font-medium">{labels.modalTitle}</h3>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full border border-[#1a3328]/15 p-2"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={submit} className="space-y-5">
              <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm">{labels.name}<input required minLength={2} maxLength={60} name="guestName" className="mt-2 w-full rounded-lg border border-[#1a3328]/15 bg-white px-4 py-3 outline-none focus:border-[#d4af37]" /></label>
                <label className="text-sm">{labels.phone}<input required minLength={7} maxLength={30} type="tel" name="phone" className="mt-2 w-full rounded-lg border border-[#1a3328]/15 bg-white px-4 py-3 outline-none focus:border-[#d4af37]" /></label>
              </div>
              <label className="block text-sm">{labels.room}<select name="roomType" className="mt-2 w-full rounded-lg border border-[#1a3328]/15 bg-white px-4 py-3 outline-none focus:border-[#d4af37]">{Object.entries(labels.rooms).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
              <div><p className="mb-2 text-sm">{labels.rating}</p><div className="flex gap-2">{Array.from({ length: 5 }).map((_, index) => <button type="button" key={index} onClick={() => setRating(index + 1)} aria-label={`${index + 1}/5`}><Star className={`h-8 w-8 ${index < rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-[#1a3328]/20'}`} /></button>)}</div></div>
              <label className="block text-sm">{labels.comment}<textarea required minLength={10} maxLength={800} rows={5} name="comment" className="mt-2 w-full resize-none rounded-lg border border-[#1a3328]/15 bg-white px-4 py-3 outline-none focus:border-[#d4af37]" /></label>
              {message && <p className={`rounded-lg px-4 py-3 text-sm ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{message.text}</p>}
              <button disabled={busy} className="w-full rounded-lg bg-[#1a3328] px-6 py-4 text-sm uppercase tracking-[0.18em] text-[#f5f0e8] disabled:opacity-60">{busy ? labels.sending : labels.send}</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
