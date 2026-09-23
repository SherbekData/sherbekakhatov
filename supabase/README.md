# Mehmonlar izohi tizimini ulash

1. Supabase loyihasida **SQL Editor** oching va `supabase/reviews.sql` faylidagi SQLni bajaring.
2. **Authentication → Users** bo‘limida administrator email/parolini yarating.
3. `.env.example` dagi to‘rtta qiymatni lokal `.env.local` va Vercel Environment Variables ichiga kiriting.
4. `REVIEW_ADMIN_EMAILS` ga administrator emailini yozing. Bir nechta email vergul bilan ajratiladi.
5. Sayt qayta deploy qiling. Admin manzili: `/admin/reviews`.

`SUPABASE_SERVICE_ROLE_KEY` maxfiy kalit: uni hech qachon `NEXT_PUBLIC_` bilan boshlamang va brauzer kodiga joylamang.
