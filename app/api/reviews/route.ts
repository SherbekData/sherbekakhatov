import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { roomTypes } from '@/lib/reviews';

export const dynamic = 'force-dynamic';

const reviewSchema = z.object({
  guestName: z.string().trim().min(2).max(60),
  phone: z.string().trim().min(7).max(30),
  roomType: z.enum(roomTypes),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(10).max(800),
  language: z.enum(['uz', 'ru', 'en']),
  website: z.string().max(0).optional(),
});

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('reviews')
      .select('id, guest_name, room_type, rating, comment, language, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(12);

    if (error) throw error;
    return NextResponse.json({ reviews: data ?? [] });
  } catch {
    return NextResponse.json({ reviews: [] }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const parsed = reviewSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Ma’lumotlarni tekshirib qayta yuboring.' }, { status: 400 });
    }

    const { guestName, phone, roomType, rating, comment, language } = parsed.data;
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('reviews').insert({
      guest_name: guestName,
      phone,
      room_type: roomType,
      rating,
      comment,
      language,
      status: 'pending',
    });

    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Izohni saqlab bo‘lmadi. Keyinroq urinib ko‘ring.' }, { status: 500 });
  }
}

