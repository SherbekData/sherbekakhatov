import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import { z } from 'zod';

const required = ['DATABASE_URL', 'JWT_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD_HASH'];
for (const key of required) if (!process.env[key]) throw new Error(`${key} kiritilmagan`);

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: ['https://miraki-garden.uz', 'https://www.miraki-garden.uz'], methods: ['GET','POST','PATCH','DELETE'] }));
app.use(express.json({ limit: '32kb' }));

const reviewSchema = z.object({
  guestName: z.string().trim().min(2).max(60), phone: z.string().trim().min(7).max(30),
  roomType: z.enum(['standard','suite','president']), rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(10).max(800), language: z.enum(['uz','ru','en']),
  website: z.string().max(0).optional(),
});
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
const submitLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false });

function auth(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : '';
  try { req.admin = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Ruxsat yo‘q' }); }
}

app.get('/health', async (_req, res) => {
  try { await pool.query('select 1'); res.json({ ok: true }); }
  catch { res.status(503).json({ ok: false }); }
});

app.get('/reviews', async (_req, res) => {
  const { rows } = await pool.query("select id, guest_name, room_type, rating, comment, language, created_at from reviews where status='approved' order by created_at desc limit 12");
  res.json({ reviews: rows });
});

app.post('/reviews', submitLimiter, async (req, res) => {
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Ma’lumotlarni tekshiring' });
  const value = parsed.data;
  await pool.query('insert into reviews(guest_name,phone,room_type,rating,comment,language) values($1,$2,$3,$4,$5,$6)', [value.guestName,value.phone,value.roomType,value.rating,value.comment,value.language]);
  res.status(201).json({ ok: true });
});

app.post('/admin/login', loginLimiter, async (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  const password = String(req.body?.password ?? '');
  if (email !== process.env.ADMIN_EMAIL.toLowerCase() || !await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)) return res.status(401).json({ error: 'Login yoki parol noto‘g‘ri' });
  res.json({ token: jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' }) });
});

app.get('/admin/reviews', auth, async (_req, res) => {
  const { rows } = await pool.query('select * from reviews order by created_at desc');
  res.json({ reviews: rows });
});

app.patch('/admin/reviews/:id', auth, async (req, res) => {
  const parsed = z.object({ status: z.enum(['approved','rejected']).optional(), comment: z.string().trim().min(10).max(800).optional() }).refine((v) => v.status || v.comment).safeParse(req.body);
  if (!parsed.success || !z.string().uuid().safeParse(req.params.id).success) return res.status(400).json({ error: 'Noto‘g‘ri so‘rov' });
  const fields = []; const values = [];
  if (parsed.data.status) { values.push(parsed.data.status); fields.push(`status=$${values.length}`); }
  if (parsed.data.comment) { values.push(parsed.data.comment); fields.push(`comment=$${values.length}`); }
  values.push(req.params.id);
  await pool.query(`update reviews set ${fields.join(',')}, reviewed_at=now() where id=$${values.length}`, values);
  res.json({ ok: true });
});

app.delete('/admin/reviews/:id', auth, async (req, res) => {
  if (!z.string().uuid().safeParse(req.params.id).success) return res.status(400).json({ error: 'Noto‘g‘ri ID' });
  await pool.query('delete from reviews where id=$1', [req.params.id]); res.json({ ok: true });
});

app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ error: 'Server xatosi' }); });
app.listen(Number(process.env.PORT ?? 3200), '127.0.0.1', () => console.log('Miraki reviews API ready'));
