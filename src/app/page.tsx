import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';

interface HomeProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Home() {
  const allPostsData = getSortedPostsData();
  
  // 静态生成显示所有文章
  const displayPosts = allPostsData;

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
            
            {allPostsData.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">暂无文章</h3>
                  <p className="text-gray-500">还没有发布任何文章，敬请期待...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {displayPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-gray-200 flex flex-col h-full"
                  >
                    {/* 文章图片 */}
                    {post.image ? (
                      <Link href={`/posts/${post.id}`} className="block">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </Link>
                    ) : (
                      <Link href={`/posts/${post.id}`} className="block">
                        <div className="h-48 w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">{post.title}</p>
                          </div>
                        </div>
                      </Link>
                    )}
                    
                    {/* 文章内容区域 */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* 标题和摘要 */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          <Link 
                            href={`/posts/${post.id}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        
                        {post.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      
                      {/* 日期和标签 - 始终在底部 */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <time className="text-sm text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {post.date}
                          </time>
                          
                          <Link 
                            href={`/posts/${post.id}`}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group"
                          >
                            阅读更多
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span 
                                key={tag}
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-colors"
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
                                +{post.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                  ))}
                </div>
                
                {/* 静态生成显示所有文章 */}
                {allPostsData.length > 6 && (
                  <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                      显示所有 {allPostsData.length} 篇文章
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
