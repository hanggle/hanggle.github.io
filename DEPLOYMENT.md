# GitHub Actions 自动部署指南

本项目已配置 GitHub Actions 自动部署功能，当向 `blog` 分支推送代码时，会自动构建项目并部署到 `master` 分支。

## 🚀 部署流程

1. **触发条件**: 向 `blog` 分支推送代码或创建 Pull Request
2. **构建过程**: 
   - 安装依赖包
   - 构建 Next.js 项目
   - 生成静态文件
3. **部署过程**: 
   - 将构建结果推送到 `master` 分支
   - GitHub Pages 自动发布网站

## 🔧 配置环境变量

在 GitHub 仓库中配置以下 Secrets：

### 必需的 Secrets

1. **NEXT_PUBLIC_GA_ID** (可选)
   - Google Analytics 跟踪 ID
   - 格式: `G-XXXXXXXXXX`

2. **NEXT_PUBLIC_SITE_URL** (推荐)
   - 网站的完整 URL
   - 格式: `https://yourdomain.com`

3. **CUSTOM_DOMAIN** (可选)
   - 自定义域名
   - 格式: `yourdomain.com`

### 配置步骤

1. 进入 GitHub 仓库
2. 点击 `Settings` → `Secrets and variables` → `Actions`
3. 点击 `New repository secret`
4. 添加上述 Secrets

## 📁 分支说明

- **blog**: 开发分支，用于编写文章和修改代码
- **master**: 部署分支，存放构建后的静态文件，用于 GitHub Pages

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建项目
npm run build

# 静态导出
npm run export

# 构建 + 导出
npm run build:static
```

## 📝 发布文章

1. 在 `posts/` 目录下创建 Markdown 文件
2. 添加 Front Matter 元数据：
   ```yaml
   ---
   title: "文章标题"
   date: "2024-01-01"
   excerpt: "文章摘要"
   tags: ["标签1", "标签2"]
   image: "图片URL"
   ---
   ```
3. 编写文章内容
4. 提交到 `blog` 分支
5. 自动部署完成后访问网站查看

## 🚨 故障排除

### 部署失败

1. 检查 GitHub Actions 日志
2. 确保所有依赖都在 `package.json` 中
3. 检查 Markdown 文件格式是否正确
4. 确保图片链接可访问

### 构建错误

1. 在本地运行 `npm run build:static` 测试
2. 检查 TypeScript 类型错误
3. 确保所有导入的模块都存在

### 页面显示问题

1. 检查 `next.config.ts` 配置
2. 确保静态资源路径正确
3. 检查 CSS 样式是否正确加载

## 📊 监控和分析

- 部署状态: GitHub Actions 页面
- 网站分析: Google Analytics (如已配置)
- 性能监控: Next.js 内置分析

## 🔄 工作流更新

如需修改部署流程，编辑 `.github/workflows/next.yml` 文件。

常见修改：
- 更改触发分支
- 添加测试步骤
- 修改构建命令
- 添加通知功能