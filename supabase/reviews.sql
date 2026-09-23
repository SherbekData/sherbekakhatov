create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(guest_name) between 2 and 60),
  phone text not null check (char_length(phone) between 7 and 30),
  room_type text not null check (room_type in ('standard', 'suite', 'president')),
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) between 10 and 800),
  language text not null default 'uz' check (language in ('uz', 'ru', 'en')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id)
);

create index if not exists reviews_status_created_at_idx
  on public.reviews (status, created_at desc);

alter table public.reviews enable row level security;

-- Sayt va admin panel barcha bazaviy amallarni faqat serverdagi service-role orqali bajaradi.
-- Shu sabab anonim foydalanuvchiga jadvalning o‘ziga to‘g‘ridan-to‘g‘ri ruxsat berilmaydi.

