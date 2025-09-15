import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 启用静态导出
  trailingSlash: true,  // 为静态托管添加尾随斜杠
  skipTrailingSlashRedirect: true,
  distDir: 'out',  // 输出目录
  reactStrictMode: true,
  eslint: {
    // 在构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在构建时忽略 TypeScript 错误（仅在必要时使用）
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,  // 静态导出时禁用图片优化
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;