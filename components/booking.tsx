'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Users,
  Home,
  User,
  Phone,
  Loader2,
  CheckCircle,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';

const roomTypes = [
  { key: 'standard', price: 1400000 },
  { key: 'luks', price: 1800000 },
  { key: 'bunker', price: 2000000 },
  { key: 'hobbit', price: 2200000 },
] as const;

interface FormData {
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
  fullName: string;
  phone: string;
}

interface FormErrors {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  roomType?: string;
  fullName?: string;
  phone?: string;
}

export function Booking() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const [formData, setFormData] = useState<FormData>({
    checkIn: '',
    checkOut: '',
    guests: '1',
    roomType: '',
    fullName: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const today = new Date().toISOString().split('T')[0];

  const selectedRoom = roomTypes.find((room) => {
    const roomName = t.rooms.types[room.key].name;
    return roomName === formData.roomType;
  });

  const nights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;

    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diff = end.getTime() - start.getTime();

    if (diff <= 0) return 0;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [formData.checkIn, formData.checkOut]);

  const totalPrice = selectedRoom && nights > 0 ? selectedRoom.price * nights : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price);
  };

  useEffect(() => {
    const handleRoomSelected = (event: CustomEvent<string>) => {
      const roomKey = event.detail as (typeof roomTypes)[number]['key'];
      const room = roomTypes.find((r) => r.key === roomKey);

      if (room) {
        const roomName = t.rooms.types[roomKey].name;
        setFormData((prev) => ({ ...prev, roomType: roomName }));
        setErrors((prev) => ({ ...prev, roomType: undefined }));
      }
    };

    const savedRoom = sessionStorage.getItem('selectedRoom') as
      | (typeof roomTypes)[number]['key']
      | null;

    if (savedRoom) {
      const room = roomTypes.find((r) => r.key === savedRoom);

      if (room) {
        const roomName = t.rooms.types[savedRoom].name;
        setFormData((prev) => ({ ...prev, roomType: roomName }));
      }

      sessionStorage.removeItem('selectedRoom');
    }

    window.addEventListener('roomSelected', handleRoomSelected as EventListener);

    return () => {
      window.removeEventListener('roomSelected', handleRoomSelected as EventListener);
    };
  }, [t]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.checkIn) newErrors.checkIn = t.booking.form.required;
    if (!formData.checkOut) newErrors.checkOut = t.booking.form.required;
    if (!formData.guests) newErrors.guests = t.booking.form.required;
    if (!formData.roomType) newErrors.roomType = t.booking.form.required;
    if (!formData.fullName.trim()) newErrors.fullName = t.booking.form.required;
    if (!formData.phone.trim()) newErrors.phone = t.booking.form.required;

    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);

      if (end <= start) {
        newErrors.checkOut = t.booking.form.required;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      if (submitStatus !== 'idle') {
        setSubmitStatus('idle');
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          guests: parseInt(formData.guests),
          nights,
          totalPrice,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          checkIn: '',
          checkOut: '',
          guests: '1',
          roomType: '',
          fullName: '',
          phone: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="booking"
      className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#1a3328] relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[420px] md:w-[600px] h-[420px] md:h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[360px] md:w-[500px] h-[360px] md:h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <span
              className={cn(
                'inline-block text-[#d4af37] text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4 transition-all duration-700',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {t.booking.subtitle}
            </span>

            <h2
              className={cn(
                'text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] font-medium mb-5 sm:mb-6 transition-all duration-700 delay-100',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {t.booking.title}
            </h2>

            <div
              className={cn(
                'flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 transition-all duration-700 delay-200',
                isInView ? 'opacity-100' : 'opacity-0'
              )}
            >
              <div className="w-10 sm:w-16 h-px bg-[#d4af37]" />
              <div className="w-2 h-2 rotate-45 border border-[#d4af37]" />
              <div className="w-10 sm:w-16 h-px bg-[#d4af37]" />
            </div>

            <p
              className={cn(
                'max-w-xl mx-auto text-[#f5f0e8]/70 text-base sm:text-lg leading-relaxed transition-all duration-700 delay-300',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {t.booking.description}
            </p>
          </div>

          <div
            className={cn(
              'bg-[#f5f0e8]/5 backdrop-blur-sm border border-[#f5f0e8]/10 rounded-3xl p-5 sm:p-8 md:p-12 transition-all duration-700 delay-400 shadow-2xl shadow-black/10',
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {submitStatus === 'success' ? (
              <div className="text-center py-10 sm:py-12">
                <CheckCircle className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
                <p className="text-[#f5f0e8] text-xl leading-relaxed mb-3">
                  {t.booking.form.success}
                </p>
                <p className="text-[#f5f0e8]/60 text-sm sm:text-base">
                  Manager tez orada siz bilan bog‘lanadi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-[#f5f0e8]/70 text-sm font-[family-name:var(--font-montserrat)] tracking-wider mb-3">
                      <Calendar className="w-4 h-4 inline-block mr-2 text-[#d4af37]" />
                      {t.booking.form.checkIn}
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={formData.checkIn}
                      onChange={handleChange('checkIn')}
                      className={cn(
                        'w-full rounded-2xl border bg-white/5 px-4 py-4 text-[#f5f0e8] focus:outline-none transition-colors color-scheme-dark',
                        errors.checkIn
                          ? 'border-red-400'
                          : 'border-[#f5f0e8]/20 focus:border-[#d4af37]'
                      )}
                    />
                    {errors.checkIn && (
                      <p className="text-red-400 text-xs mt-2">{errors.checkIn}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#f5f0e8]/70 text-sm font-[family-name:var(--font-montserrat)] tracking-wider mb-3">
                      <Calendar className="w-4 h-4 inline-block mr-2 text-[#d4af37]" />
                      {t.booking.form.checkOut}
                    </label>
                    <input
                      type="date"
                      min={formData.checkIn || today}
                      value={formData.checkOut}
                      onChange={handleChange('checkOut')}
                      className={cn(
                        'w-full rounded-2xl border bg-white/5 px-4 py-4 text-[#f5f0e8] focus:outline-none transition-colors color-scheme-dark',
                        errors.checkOut
                          ? 'border-red-400'
                          : 'border-[#f5f0e8]/20 focus:border-[#d4af37]'
                      )}
                    />
                    {errors.checkOut && (
                      <p className="text-red-400 text-xs mt-2">{errors.checkOut}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-[#f5f0e8]/70 text-sm font-[family-name:var(--font-montserrat)] tracking-wider mb-3">
                      <Users className="w-4 h-4 inline-block mr-2 text-[#d4af37]" />
                      {t.booking.form.guests}
                    </label>
                    <select
                      value={formData.guests}
                      onChange={handleChange('guests')}
                      className={cn(
                        'w-full rounded-2xl border bg-white/5 px-4 py-4 text-[#f5f0e8] focus:outline-none transition-colors cursor-pointer',
                        errors.guests
                          ? 'border-red-400'
                          : 'border-[#f5f0e8]/20 focus:border-[#d4af37]'
                      )}
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num} className="bg-[#1a3328] text-[#f5f0e8]">
                          {num}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <p className="text-red-400 text-xs mt-2">{errors.guests}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#f5f0e8]/70 text-sm font-[family-name:var(--font-montserrat)] tracking-wider mb-3">
                      <Home className="w-4 h-4 inline-block mr-2 text-[#d4af37]" />
                      {t.booking.form.roomType}
                    </label>
                    <select
                      value={formData.roomType}
                      onChange={handleChange('roomType')}
                      className={cn(
                        'w-full rounded-2xl border bg-white/5 px-4 py-4 text-[#f5f0e8] focus:outline-none transition-colors cursor-pointer',
                        errors.roomType
                          ? 'border-red-400'
                          : 'border-[#f5f0e8]/20 focus:border-[#d4af37]'
                      )}
                    >
                      <option value="" className="bg-[#1a3328] text-[#f5f0e8]/50">
                        {t.booking.form.selectRoom}
                      </option>
                      {roomTypes.map((room) => (
                        <option
                          key={room.key}
                          value={t.rooms.types[room.key].name}
                          className="bg-[#1a3328] text-[#f5f0e8]"
                        >
                          {t.rooms.types[room.key].name} — {formatPrice(room.price)} UZS
                        </option>
                      ))}
                    </select>
                    {errors.roomType && (
                      <p className="text-red-400 text-xs mt-2">{errors.roomType}</p>
                    )}
                  </div>
                </div>

                {selectedRoom && (
                  <div className="rounded-3xl border border-[#d4af37]/25 bg-[#d4af37]/10 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-[#f5f0e8]/60 text-xs uppercase tracking-[0.25em] mb-2">
                          Booking summary
                        </p>
                        <p className="text-[#f5f0e8] text-lg font-medium">
                          {formData.roomType}
                        </p>
                        <p className="text-[#f5f0e8]/60 text-sm mt-1">
                          {nights > 0
                            ? `${nights} night × ${formatPrice(selectedRoom.price)} UZS`
                            : `${formatPrice(selectedRoom.price)} UZS / night`}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-[#f5f0e8]/60 text-xs uppercase tracking-[0.25em] mb-2">
                          Total
                        </p>
                        <p className="text-[#d4af37] text-2xl font-semibold">
                          {totalPrice > 0 ? formatPrice(totalPrice) : formatPrice(selectedRoom.price)} UZS
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-[#f5f0e8]/70 text-sm font-[family-name:var(--font-montserrat)] tracking-wider mb-3">
                      <User className="w-4 h-4 inline-block mr-2 text-[#d4af37]" />
                      {t.booking.form.fullName}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange('fullName')}
                      autoComplete="name"
                      className={cn(
                        'w-full rounded-2xl border bg-white/5 px-4 py-4 text-[#f5f0e8] focus:outline-none transition-colors placeholder:text-[#f5f0e8]/30',
                        errors.fullName
                          ? 'border-red-400'
                          : 'border-[#f5f0e8]/20 focus:border-[#d4af37]'
                      )}
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-2">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#f5f0e8]/70 text-sm font-[family-name:var(--font-montserrat)] tracking-wider mb-3">
                      <Phone className="w-4 h-4 inline-block mr-2 text-[#d4af37]" />
                      {t.booking.form.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      placeholder="+998 87 337 88 88"
                      autoComplete="tel"
                      className={cn(
                        'w-full rounded-2xl border bg-white/5 px-4 py-4 text-[#f5f0e8] focus:outline-none transition-colors placeholder:text-[#f5f0e8]/30',
                        errors.phone
                          ? 'border-red-400'
                          : 'border-[#f5f0e8]/20 focus:border-[#d4af37]'
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-2">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-start gap-3 text-red-300 bg-red-400/10 p-4 rounded-2xl border border-red-400/20">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p>{t.booking.form.error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 sm:py-5 rounded-full bg-[#d4af37] text-[#1a3328] text-xs sm:text-sm tracking-[0.18em] sm:tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] font-bold hover:bg-[#c9a430] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.booking.form.submitting}
                    </>
                  ) : (
                    t.booking.form.submit
                  )}
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="tel:+998 88 337 88 88"
                    className="py-4 rounded-full border border-[#f5f0e8]/15 text-[#f5f0e8] text-center text-sm font-semibold tracking-wider uppercase hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>

                  <a
                    href="https://t.me/MirakiGardens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 rounded-full border border-[#f5f0e8]/15 text-[#f5f0e8] text-center text-sm font-semibold tracking-wider uppercase hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Telegram
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
