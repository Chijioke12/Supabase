-- Create profiles table linked to Supabase Auth users
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  updated_at timestamptz
);

create index profiles_full_name_idx on profiles (full_name);
