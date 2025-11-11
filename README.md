# Next.js + Supabase Starter (No-terminal deployment)

This is a minimal starter project that gives you:
- Email authentication (signup / login / logout) using Supabase Auth
- A `profiles` table that stores user metadata (run provided SQL)
- File uploads to a Supabase Storage bucket (`avatars`)
- Ready to upload to GitHub and deploy on Vercel (no terminal required)

## Quick steps (no terminal)
1. Create a GitHub repo and upload this project (use GitHub web UI -> Add file -> Upload files).
2. Create a Supabase project at https://app.supabase.com
3. In Supabase **Settings → API** copy the **Project URL** and **anon/public key**.
4. In Supabase → **Table Editor** run the SQL in `supabase-init.sql` to create the `profiles` table.
5. Create a Storage bucket named `avatars` (public or set policies as you prefer).
6. In Vercel, import your GitHub repo and add these Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = (Supabase Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Supabase anon/public key)
7. Deploy in Vercel. The app will let users sign up, upload an avatar, and edit profile.

## Files of interest
- `lib/supabaseClient.js` — Supabase client initialization (reads env vars)
- `pages/index.js` — Home page (shows user state)
- `pages/auth.js` — Signup / Login form
- `pages/profile.js` — Profile editor + avatar upload
- `supabase-init.sql` — SQL to create `profiles` table

## Supabase SQL (also in supabase-init.sql)
Run this in SQL editor:
```sql
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  updated_at timestamptz
);

-- Optional: index for searching
create index profiles_full_name_idx on profiles (full_name);
```

## Notes
- This starter uses client-side Supabase auth. Do not store service_role keys in the frontend.
- If you need server-side protected endpoints, I can add simple API routes that use a server key and explain how to store it safely in Vercel.
- If you want the app converted to the new App Router or to include OAuth providers (Google/GitHub), tell me and I’ll add it.

Enjoy — upload the ZIP to GitHub and I’ll walk you through the Vercel settings step-by-step if you want.
