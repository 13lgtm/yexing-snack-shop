# 业兴小吃 - 配置指南

本文档详细说明如何设置Supabase数据库并配置前端应用。

## 前提条件

- Node.js 18+ 和 npm
- Supabase账号（免费版即可）

## 步骤 1: 创建Supabase项目

1. 访问 [https://database.new](https://supabase.com/dashboard)
2. 点击 "New Project"
3. 填写项目信息：
   - **Name**: yexing-snack-shop（或您喜欢的名称）
   - **Database Password**: 设置一个强密码并保存好
   - **Region**: 选择 Northeast Asia (Tokyo) 或最近的区域
4. 点击 "Create new project" 并等待项目创建完成（约2分钟）

## 步骤 2: 创建数据库表结构

1. 在Supabase项目页面，点击左侧菜单的 **SQL Editor**
2. 点击 "New query"
3. 复制 `supabase_schema.sql` 文件的全部内容并粘贴
4. 点击 "Run" 执行SQL语句
5. 确认看到成功消息，表示表结构创建完成

**创建的表包括**：
- `categories` - 产品分类表
- `products` - 产品信息表
- `orders` - 订单表
- `order_items` - 订单项目表

## 步骤 3: 导入种子数据

1. 继续在SQL Editor中，点击 "New query"
2. 复制 `seed_data.sql` 文件的全部内容并粘贴
3. 点击 "Run" 执行SQL语句
4. 查看 **Table Editor** 确认数据已成功导入：
   - `categories` 表应该有 3 行数据
   - `products` 表应该有 6 行数据

## 步骤 4: 获取API密钥

1. 在Supabase项目中，点击左侧的 **Settings** (齿轮图标)
2. 选择 **API**
3. 找到以下信息：
   - **Project URL**: 形如 `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: 一长串字符，以 `eyJ` 开头

## 步骤 5: 配置前端环境变量

1. 在项目根目录创建 `.env.local` 文件
2. 将以下内容复制到文件中，并替换为您的实际值：

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **重要**: `.env.local` 文件已在 `.gitignore` 中，不会被提交到git。请妥善保管您的API密钥。

## 步骤 6: 安装依赖并运行

```bash
# 安装项目依赖
npm install

# 启动开发服务器
npm run dev
```

应用将在 `http://localhost:5173` 启动（Vite默认端口可能不同）。

## 验证设置

### 1. 测试产品加载
- 打开首页，应该能看到6个产品分成3个分类
- 如果看到"加载中..."一直不消失，检查：
  - `.env.local` 文件是否正确配置
  - Supabase项目是否正常运行
  - 浏览器控制台是否有错误信息

### 2. 测试订单流程
- 添加产品到购物车
- 进入结账页面
- 完成支付
- 查看 Supabase Table Editor 的 `orders` 和 `order_items` 表，应该能看到新订单

### 3. 测试订单历史
- 点击首页右上角的"订单"按钮
- 应该能看到刚才创建的订单

## 常见问题

### Q: 页面显示"加载数据失败"
**A**: 
1. 检查浏览器控制台的错误信息
2. 确认 `.env.local` 中的URL和密钥正确
3. 确认Supabase项目正在运行（未暂停）
4. 检查数据库RLS策略是否正确设置

### Q: 无法提交订单
**A**:
1. 检查 `orders` 和 `order_items` 表的RLS策略
2. 确认已执行 `supabase_schema.sql` 中的所有策略语句
3. 查看浏览器控制台和网络标签页的错误信息

### Q: Supabase免费版限制
**A**: 免费版包含：
- 500 MB 数据库存储
- 5 GB 文件存储
- 50 MB 文件上传限制
- 50,000 月活跃用户
- 对于演示应用完全足够

## 数据库管理

### 查看订单数据
在Supabase的 **Table Editor** 中可以直接查看和编辑数据。

### 清空测试数据
如果需要清空测试订单：
```sql
DELETE FROM order_items;
DELETE FROM orders;
```

### 添加新产品
可以直接在Table Editor中添加，或使用SQL：
```sql
INSERT INTO products (id, name, price, description, category_id, image, rating, reviews_count, time_estimate, calories, ingredients)
VALUES ('10', '新产品', 10, '产品描述', '1', 'https://...', 4.5, '100+', '10分钟', '150千卡', '[{"emoji": "🥟", "name": "材料"}]'::jsonb);
```

## 下一步

- 考虑添加用户认证（Supabase Auth）
- 实现搜索功能
- 添加产品图片上传
- 配置生产环境部署

## 支持

如遇到问题，请查看：
- Supabase文档: https://supabase.com/docs
- Vite文档: https://vitejs.dev
