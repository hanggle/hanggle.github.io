# Google Analytics 4 集成指南

本博客已集成Google Analytics 4 (GA4)统计功能，可以跟踪网站访问量、用户行为等重要指标。

## 🚀 快速配置

### 1. 创建 Google Analytics 账户

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新账户和属性
3. 选择 "网站" 作为平台
4. 获取测量ID（格式：G-XXXXXXXXXX）

### 2. 配置环境变量

复制 `.env.example` 文件为 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入你的Google Analytics测量ID：

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. 重启开发服务器

```bash
npm run dev
```

## 📊 统计功能

已集成的统计功能包括：

### 基础统计
- ✅ **页面浏览量** - 自动统计所有页面访问
- ✅ **用户会话** - 跟踪用户访问时长
- ✅ **流量来源** - 统计访问来源渠道

### 文章相关统计
- ✅ **文章阅读量** - 统计每篇文章的浏览次数
- ✅ **文章互动** - 跟踪用户在文章页面的行为

### 搜索行为统计
- ✅ **搜索查询** - 统计用户搜索的关键词
- ✅ **搜索结果点击** - 跟踪搜索结果的点击率

### 代码交互统计
- ✅ **代码复制** - 统计代码块复制次数
- ✅ **编程语言偏好** - 分析用户对不同编程语言的兴趣

## 🔍 数据查看

登录你的 [Google Analytics 控制台](https://analytics.google.com/) 查看统计数据：

1. **实时报告** - 查看当前在线用户和实时活动
2. **受众报告** - 了解访问者的地理位置、设备类型等
3. **获客报告** - 分析流量来源和营销效果
4. **行为报告** - 查看页面浏览量、跳出率等
5. **自定义事件** - 查看搜索、代码复制等自定义统计

## 🛠️ 自定义统计

如需添加更多统计功能，可以使用 `src/lib/analytics.ts` 中的函数：

```typescript
import { event, trackSearch, trackCodeCopy } from '@/lib/analytics';

// 自定义事件统计
event('button_click', 'engagement', 'header_cta');

// 搜索统计
trackSearch('Next.js');

// 代码复制统计
trackCodeCopy('javascript');
```

## 🔒 隐私保护

- 只在生产环境启用统计功能
- 不收集个人敏感信息
- 遵循GDPR等隐私法规
- 建议添加隐私政策页面

## 📈 性能优化

- 使用 `afterInteractive` 策略异步加载
- 只在必要时发送统计数据
- 不影响页面加载性能

## 🚫 禁用统计

如需禁用统计功能，只需从 `.env.local` 中移除 `NEXT_PUBLIC_GA_ID` 或将其设为空值。

## 📚 相关资源

- [Google Analytics 4 文档](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics 集成](https://nextjs.org/docs/basic-features/script)
- [隐私政策模板](https://www.privacypolicytemplate.net/)