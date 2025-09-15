# Cloudflare Pages 配置

## 构建设置
- 构建命令: `npm run build`
- 构建输出目录: `out`
- Root目录: `/`

## 环境变量
- Node.js 版本: `18.x` 或更高
- NPM 版本: `8.x` 或更高

## 部署说明

### 1. 通过 Cloudflare Dashboard 部署
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 Pages 部分
3. 连接您的 GitHub 仓库
4. 配置构建设置:
   - 构建命令: `npm run build`
   - 构建输出目录: `out`
   - 环境变量: 
     - `NODE_VERSION`: `18`
     - `NPM_VERSION`: `8`

### 2. 通过 Wrangler CLI 部署
```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 创建 Pages 项目
wrangler pages project create hanggle-blog

# 部署
wrangler pages deploy out --project-name=hanggle-blog
```

### 3. 自动部署配置
项目已配置 GitHub Actions，push 到 master 分支时会自动触发构建和部署。

## 自定义域名
在 Cloudflare Pages 设置中可以配置自定义域名，支持：
- 免费 SSL 证书
- 全球 CDN 加速
- 自动优化

## 性能优化
- 静态资源自动压缩
- 图片自动优化
- HTTP/2 和 HTTP/3 支持
- 边缘缓存