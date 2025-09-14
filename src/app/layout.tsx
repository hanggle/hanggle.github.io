import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "我的博客 - 技术分享与思考",
    template: "%s | 我的博客"
  },
  description: "分享技术文章、编程经验和开发心得的个人博客",
  keywords: ["技术博客", "编程", "开发", "Next.js", "React", "TypeScript"],
  authors: [{ name: "博客作者" }],
  creator: "博客作者",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: "我的博客 - 技术分享与思考",
    description: "分享技术文章、编程经验和开发心得的个人博客",
    siteName: "我的博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "我的博客 - 技术分享与思考",
    description: "分享技术文章、编程经验和开发心得的个人博客",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
