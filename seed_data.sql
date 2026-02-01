-- Seed data for 业兴小吃 (Yexing Snack Shop)
-- Run this after running supabase_schema.sql

-- Insert Categories
INSERT INTO public.categories (id, name, icon) VALUES
('1', '现做小吃', 'verified'),
('2', '手作糖水', 'soup_kitchen'),
('3', '自制配料', 'auto_fix_high')
ON CONFLICT (id) DO NOTHING;

-- Insert Products
INSERT INTO public.products (
  id, 
  name, 
  price, 
  old_price, 
  description, 
  category_id, 
  image, 
  tag, 
  rating, 
  reviews_count, 
  time_estimate, 
  calories, 
  ingredients
) VALUES
(
  '1',
  '开口笑',
  12,
  18,
  '传统手工制作，满口芝麻香。酥脆香甜，地道广式风味。',
  '1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAx6rnLitFcRNSJRUJhz8Dv-KIlzKL58CWDkcBdN__X9gKf9dcZnFDkLghyea2tH9fUNkcH1CxRreRfvOyU1ZZBAvJq_pOZ_8T6qVoBBMKtcIF-p3DrECqTsHKnIXEiJ4XlfBZInoqvxrUfkZT9jpyZHyGWuljm7ofHAeXNV8WLnSFgpXwThDhnt_omK9bULt8LDkf0M0mlK2-IbyO_E_kbOZfxtHjlud-Qny2ciWg2uRzLUnVhwKY0gJOajJ420HJ1XKKflQ356oQ',
  '热销',
  4.9,
  '2.5k',
  '10-15 分钟',
  '320 千卡',
  '[{"emoji": "🍚", "name": "糯米粉"}, {"emoji": "🥜", "name": "白芝麻"}]'::jsonb
),
(
  '4',
  '麻通',
  6,
  NULL,
  '空心酥脆，外层裹满白芝麻，口感轻盈，怀旧经典。',
  '1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAx2Jxa952h29ntqCyTilcPYDPyFahUnsqqd9Fa_5A0NeQSlqDbapou7ha7BJDyGvUDn5MVJwwSGMmNxVay-XLKREbyKfNk7G0V6vWgxjzXee9esFqgQ-hw3IySy9BhXNeiE2PKK_noMdYpzVnE87cU3wIEsVfakYEA6ej7JP3ehfa608c0Cw9iBTcwKWfOEmLeNSP-ZZN3cu8jOnwZHMtyN8gXgAUBMvpjOiXfpdbSOR5qiMLONwg8_Q8DTkE77TWNQ8K8YkPqwhE',
  NULL,
  4.6,
  '1.2k',
  '5-10 分钟',
  '120 千卡',
  '[{"emoji": "🥖", "name": "糯米胚"}, {"emoji": "🥜", "name": "白芝麻"}]'::jsonb
),
(
  '7',
  '芝麻饼',
  8,
  NULL,
  '浓厚芝麻香气，饼底酥脆，越嚼越香的手工饼点。',
  '1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBBZtmKPZOc2XxXkeweXkxwz2DjBv2ICNr5CA2_baNKWGCCGHgq52fRvOaU81Sp35LA-9-9MYFO79BQGC5gaGNdK54OBjdL4o9ycD1fvEaPZgx-7kcyvm7_D6vL44IzfFhpGdGYxavt9mEktR-3TxGtBjqGBIsvFI87yi2wxgw4cJHD4l9JnxZqjXrQXkb1H0q9gtNdrxjVoJ8wad4FgPclF1Vifp_cQrI2YOey_cDoZE4u_4ZWNyFMJoZBa89Dj6z_7BX4pfLvkE0',
  NULL,
  4.8,
  '800+',
  '5-8 分钟',
  '150 千卡',
  '[{"emoji": "🌾", "name": "小麦粉"}, {"emoji": "🥜", "name": "黑芝麻"}]'::jsonb
),
(
  '8',
  '刻饼',
  5,
  NULL,
  '造型古朴精致，口感扎实，淡淡的清甜回甘。',
  '1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDSFnUrlRRwO5qvN8bjnVCBILRePkKFW1rH8BEeqnwPN0CmNRBtWy8qcT_WjPBJxD2SDfZNRkO8as3fM1BTvDqTx19n4K-_JtjP4STvsHkc1AE7BGloYaiRene6IX-4ieihMYZc_Yv0N-FetFt5hcb5GCzS0YFERCqcynTdLpHiLzFVryQHeEIH_52VcI0eT74vAJZzWPHv5WTCEGgaNj9x66NaY1dZ9IJFNjyFYSsZpnzo-_AFxElBFewVIw1I9_a58mkBzJTaVHo',
  NULL,
  4.5,
  '500+',
  '5 分钟',
  '90 千卡',
  '[{"emoji": "🍥", "name": "面粉"}, {"emoji": "🍬", "name": "白砂糖"}]'::jsonb
),
(
  '5',
  '手磨芝麻糊',
  15,
  NULL,
  '生磨芝麻，细腻顺滑，补血养颜，传统滋润佳品。',
  '2',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCAwpSUniUOXSJAW9vchrPhUAotxcJ9WVoox-2zr_PYf-aPHQxx_j83BuYLyxf70Jhh4Lnc4vC2erj4_6ORgHiFpiDQag20Sjl7-ed4Qv98HXKDP4FB5H-p7Cl2PUyqU5s43Hkbf-f2yX0j32ORY0dqFubN9Yqq03i8ilSDoorBWwV3ub2PgNTbHZcgn0qpiKrUvU0OyMnMzOFIKEJljwBW1VhsM60ZSzgP-TmIHxwgpidJqw1qvcMxELZS8oJvXnP6MeWB5PUHbOE',
  NULL,
  4.9,
  '3.1k',
  '5 分钟',
  '210 千卡',
  '[{"emoji": "🥜", "name": "黑芝麻"}]'::jsonb
),
(
  '9',
  '特制蘸粉',
  3,
  NULL,
  '秘制配方，提升小吃风味的最佳伴侣。',
  '3',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuClcvIVEJvNFa9wBp-7VZlDwuEYduSbOOSYT07L3F256thbEEP624NFzGUIV6ERSDlbe0uBTe12JCZ8z08UQmNuaPiuUeB9ChNTKzvuAiXuzqmYMI6QYv6dfU3LVzJvlHNlNniKhq6Hu-PLjfNcXCIZFSPnmH7uRpKl5a4ejy3y6O7RggWg8aSb2Srm63UzZmhtCTMpjG3zySswv12u0v1dPMkEdVVLxJEcOozxRaMVykJpGJE8zA-yTfuHfTKCzvgNP_91xpKLceQ',
  NULL,
  4.8,
  '200+',
  '1 分钟',
  '20 千卡',
  '[{"emoji": "🌶️", "name": "调味料"}]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
