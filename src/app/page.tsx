import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ClientPagination from '@/components/ClientPagination';

interface HomeProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar allPosts={allPostsData} />
      <main className="flex-grow pt-16"> {/* 添加顶部间距 */}
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              欢迎来到我的博客
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              分享技术心得、生活感悟和学习笔记
            </p>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">最新文章</h2>
              {allPostsData.length > 0 && (
                <div className="text-sm text-gray-500">
                  共 {allPostsData.length} 篇文章
                </div>
              )}
            </div>
            
            {/* 使用客户端分页组件 */}
            <ClientPagination posts={allPostsData} itemsPerPage={6} />
          </div>
        </section>
      </main>
      
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
