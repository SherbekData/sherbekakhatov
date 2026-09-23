'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, LogOut, Pencil, RefreshCw, Save, Star, Trash2, X } from 'lucide-react';
import type { Review, ReviewStatus } from '@/lib/reviews';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

type AdminReview = Review & { phone: string; status: ReviewStatus };

export default function ReviewsAdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [filter, setFilter] = useState<ReviewStatus>('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    try {
      const supabase = getSupabaseBrowser();
      supabase.auth.getSession().then(({ data }) => {
        const accessToken = data.session?.access_token ?? null;
        setToken(accessToken);
        setLoading(false);
        if (accessToken) void loadReviews(accessToken);
      });
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setToken(session?.access_token ?? null));
      return () => listener.subscription.unsubscribe();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Supabase sozlanmagan');
      setLoading(false);
    }
  }, []);

  async function loadReviews(accessToken = token) {
    if (!accessToken) return;
    setLoading(true);
    const response = await fetch('/api/admin/reviews', { headers: { Authorization: `Bearer ${accessToken}` } });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) { setError(data.error ?? 'Ma’lumot olinmadi'); return; }
    setError('');
    setReviews(data.reviews ?? []);
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(event.currentTarget);
    try {
      const supabase = getSupabaseBrowser();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: String(form.get('email')), password: String(form.get('password')),
      });
      if (signInError || !data.session) throw signInError ?? new Error('Kirish amalga oshmadi');
      setToken(data.session.access_token);
      await loadReviews(data.session.access_token);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Login yoki parol noto‘g‘ri');
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    if (!token) return;
    const response = await fetch('/api/admin/reviews', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) setReviews((current) => current.map((review) => review.id === id ? { ...review, status } : review));
  }

  async function saveComment(id: string) {
    if (!token || editText.trim().length < 10) return;
    const response = await fetch('/api/admin/reviews', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, comment: editText }),
    });
    if (response.ok) {
      setReviews((current) => current.map((review) => review.id === id ? { ...review, comment: editText.trim() } : review));
      setEditingId(null);
    }
  }

  async function deleteReview(id: string) {
    if (!token || !window.confirm('Bu izoh butunlay o‘chirilsinmi?')) return;
    const response = await fetch('/api/admin/reviews', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    if (response.ok) setReviews((current) => current.filter((review) => review.id !== id));
  }

  async function logout() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    setToken(null);
    setReviews([]);
  }

  const filtered = useMemo(() => reviews.filter((review) => review.status === filter), [reviews, filter]);

  if (!token) {
    return <main className="flex min-h-screen items-center justify-center bg-[#10271e] p-6 text-[#1a3328]">
      <form onSubmit={login} className="w-full max-w-md rounded-2xl bg-[#f5f0e8] p-8 shadow-2xl">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#b08f2f]">Miraki Gardens</p>
        <h1 className="mb-8 text-4xl font-medium">Izohlar boshqaruvi</h1>
        <label className="mb-5 block text-sm">Email<input required type="email" name="email" className="mt-2 w-full rounded-lg border bg-white px-4 py-3" /></label>
        <label className="mb-5 block text-sm">Parol<input required type="password" name="password" className="mt-2 w-full rounded-lg border bg-white px-4 py-3" /></label>
        {error && <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-[#1a3328] px-5 py-4 text-white disabled:opacity-60">{loading ? 'Kutilmoqda…' : 'Kirish'}</button>
      </form>
    </main>;
  }

  return <main className="min-h-screen bg-[#f5f0e8] px-4 py-8 text-[#1a3328] md:px-8">
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs uppercase tracking-[0.25em] text-[#b08f2f]">Miraki Gardens</p><h1 className="text-4xl font-medium">Mehmonlar izohlari</h1></div>
        <div className="flex gap-2"><button onClick={() => loadReviews()} className="flex items-center gap-2 rounded-lg border px-4 py-2"><RefreshCw className="h-4 w-4" />Yangilash</button><button onClick={logout} className="flex items-center gap-2 rounded-lg border px-4 py-2"><LogOut className="h-4 w-4" />Chiqish</button></div>
      </header>
      <div className="mb-7 flex gap-2 overflow-x-auto pb-2">{(['pending', 'approved', 'rejected'] as const).map((status) => <button key={status} onClick={() => setFilter(status)} className={`whitespace-nowrap rounded-full px-5 py-2 text-sm ${filter === status ? 'bg-[#1a3328] text-white' : 'border bg-white'}`}>{status === 'pending' ? 'Kutilmoqda' : status === 'approved' ? 'Tasdiqlangan' : 'Rad etilgan'} ({reviews.filter((item) => item.status === status).length})</button>)}</div>
      {error && <p className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-red-800">{error}</p>}
      {loading ? <p>Yuklanmoqda…</p> : filtered.length === 0 ? <div className="rounded-2xl border bg-white p-12 text-center text-black/45">Bu bo‘limda izoh yo‘q.</div> : <div className="grid gap-5 lg:grid-cols-2">{filtered.map((review) => <article key={review.id} className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex justify-between gap-4"><div><h2 className="text-xl font-semibold">{review.guest_name}</h2><p className="text-sm text-black/50">{review.phone} · {review.room_type}</p></div><div className="flex">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className={`h-4 w-4 ${index < review.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-black/15'}`} />)}</div></div>
        {editingId === review.id ? <textarea value={editText} onChange={(event) => setEditText(event.target.value)} rows={5} maxLength={800} className="mb-4 w-full rounded-lg border p-3" /> : <p className="mb-5 leading-relaxed text-black/75">{review.comment}</p>}<p className="mb-5 text-xs text-black/40">{new Date(review.created_at).toLocaleString('uz-UZ')}</p>
        {review.status === 'pending' && <div className="flex gap-3"><button onClick={() => updateStatus(review.id, 'approved')} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-white"><Check className="h-4 w-4" />Tasdiqlash</button><button onClick={() => updateStatus(review.id, 'rejected')} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-3 text-white"><X className="h-4 w-4" />Rad etish</button></div>}
        <div className="mt-3 flex gap-2 border-t pt-3">{editingId === review.id ? <button onClick={() => saveComment(review.id)} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"><Save className="h-4 w-4" />Saqlash</button> : <button onClick={() => { setEditingId(review.id); setEditText(review.comment); }} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"><Pencil className="h-4 w-4" />Tahrirlash</button>}<button onClick={() => deleteReview(review.id)} className="ml-auto flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700"><Trash2 className="h-4 w-4" />O‘chirish</button></div>
      </article>)}</div>}
    </div>
  </main>;
}
