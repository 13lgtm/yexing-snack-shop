-- Create categories table
create table public.categories (
  id text primary key,
  name text not null,
  icon text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create products table
create table public.products (
  id text primary key, -- maintaining text id to match current frontend usage (or could switch to uuid)
  name text not null,
  price numeric not null,
  old_price numeric,
  description text,
  category_id text references public.categories(id),
  image text,
  tag text,
  rating numeric default 0,
  reviews_count text, -- Storing as text "2.5k" to match frontend for now, or could parse
  time_estimate text,
  calories text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create ingredients table (jsonb in products is easier, but normalized is better. 
-- Given the simple structure: ingredients: { emoji: string; name: string }[]
-- We will store ingredients as JSONB in the products table for simplicity)
alter table public.products add column ingredients jsonb default '[]'::jsonb;

-- Create orders table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  total_amount numeric not null,
  status text not null check (status in ('cooking', 'completed', 'cancelled')),
  order_no text, -- Display ID
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order items table
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id text references public.products(id),
  product_name text not null, -- Snapshotting name/price in case product changes
  price numeric not null,
  quantity integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies

-- Allow public read access to products and categories
create policy "Allow public read access to categories"
on public.categories for select using (true);

create policy "Allow public read access to products"
on public.products for select using (true);

-- Allow public to insert orders (anonymous checkout)
-- NOTE: In a real app you might want auth, but request implies simple migration.
create policy "Allow public insert orders"
on public.orders for insert with check (true);

create policy "Allow public read own orders" 
-- For now allowing public read for demo, or based on local storage ID if we implemented that.
-- To keep it simple for this "App", we'll allow public read. 
-- IN REALITY: restrict this!
on public.orders for select using (true); 

create policy "Allow public insert order items"
on public.order_items for insert with check (true);

create policy "Allow public read order items"
on public.order_items for select using (true);
