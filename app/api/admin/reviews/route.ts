import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin, requireReviewAdmin } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['approved', 'rejected']).optional(),
  comment: z.string().trim().min(10).max(800).optional(),
}).refine((value) => value.status || value.comment, {
  message: 'O‘zgartirish kiritilmagan',
});

const deleteSchema = z.object({ id: z.string().uuid() });

export async function GET(request: Request) {
  const user = await requireReviewAdmin(request.headers.get('authorization'));
  if (!user) return NextResponse.json({ error: 'Ruxsat yo‘q' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('reviews')
    .select('id, guest_name, phone, room_type, rating, comment, language, status, created_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reviews: data ?? [] });
}

export async function PATCH(request: Request) {
  const user = await requireReviewAdmin(request.headers.get('authorization'));
  if (!user) return NextResponse.json({ error: 'Ruxsat yo‘q' }, { status: 401 });

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Noto‘g‘ri so‘rov' }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const changes = {
    ...(parsed.data.status ? { status: parsed.data.status } : {}),
    ...(parsed.data.comment ? { comment: parsed.data.comment } : {}),
    reviewed_at: new Date().toISOString(),
    reviewed_by: user.id,
  };
  const { error } = await supabase
    .from('reviews')
    .update(changes)
    .eq('id', parsed.data.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const user = await requireReviewAdmin(request.headers.get('authorization'));
  if (!user) return NextResponse.json({ error: 'Ruxsat yo‘q' }, { status: 401 });

  const parsed = deleteSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Noto‘g‘ri so‘rov' }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('reviews').delete().eq('id', parsed.data.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
