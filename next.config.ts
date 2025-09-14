import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 启用静态导出
  trailingSlash: true,  // 为静态托管添加尾随斜杠
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
