-- 检查分类表是否有重复数据
-- 在Supabase SQL Editor中运行

-- 查看所有分类
SELECT * FROM categories ORDER BY id;

-- 删除重复分类，只保留正确的三个
-- 先查看有多少个分类
SELECT COUNT(*) as total FROM categories;

-- 删除所有分类（备份后再运行）
-- DELETE FROM categories;

-- 插入正确的三个分类
INSERT INTO categories (id, name, icon) 
VALUES 
  ('snacks', '现做小吃', 'restaurant'),
  ('desserts', '手作糖水', 'local_cafe'),
  ('ingredients', '自制配料', 'set_meal')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, icon = EXCLUDED.icon;

-- 验证结果（应该只有3条）
SELECT id, name, icon FROM categories ORDER BY id;
