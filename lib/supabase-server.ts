import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase server sozlamalari kiritilmagan');
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function requireReviewAdmin(authorization: string | null) {
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : null;

  if (!token) return null;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user?.email) return null;

  const allowedEmails = (process.env.REVIEW_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!allowedEmails.includes(data.user.email.toLowerCase())) return null;
  return data.user;
}

