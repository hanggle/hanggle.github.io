'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostData } from '@/lib/posts';

interface ClientPaginationProps {
  posts: PostData[];
  itemsPerPage?: number;
}

export default function ClientPagination({ posts, itemsPerPage = 6 }: ClientPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  
  const generatePageNumbers = (current: number, total: number, maxVisible = 5) => {
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    const delta = Math.floor(maxVisible / 2);
    const range: (number | '...')[] = [];
    
    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      range.push(i);
    }
    
    if (current - delta > 2) {
      range.unshift(1, '...');
    } else {
      range.unshift(1);
    }
    
    if (current + delta < total - 1) {
      range.push('...', total);
    } else if (total > 1) {
      range.push(total);
    }
    
    return range;
  };
  
  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 文章网格 */}
      {currentPosts.length === 0 ? (
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
            {currentPosts.map((post) => (
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
          
          {/* 分页导航 */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center space-y-6 mt-16 px-4">
              <nav className="flex items-center justify-center" aria-label="分页导航">
                <div className="flex items-center space-x-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
                  {/* 上一页按钮 */}
                  {currentPage > 1 ? (
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="group relative inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                      aria-label="上一页"
                    >
                      <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="ml-2 hidden sm:inline">上一页</span>
                    </button>
                  ) : (
                    <span className="relative inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-300 bg-gray-50 rounded-xl cursor-not-allowed">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="ml-2 hidden sm:inline">上一页</span>
                    </span>
                  )}
                  
                  {/* 页码按钮 */}
                  <div className="hidden sm:flex items-center space-x-1">
                    {pageNumbers.map((pageNum, index) => {
                      if (pageNum === '...') {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                          </span>
                        );
                      }
                      
                      const isCurrentPage = pageNum === currentPage;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum as number)}
                          className={`relative inline-flex items-center justify-center w-10 h-10 text-sm font-semibold rounded-xl transition-all duration-200 ${
                            isCurrentPage
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-110'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:scale-105 active:scale-95'
                          }`}
                          aria-label={`第 ${pageNum} 页`}
                          aria-current={isCurrentPage ? 'page' : undefined}
                        >
                          {pageNum}
                          {isCurrentPage && (
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 opacity-20 animate-pulse"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* 移动端页码显示 */}
                  <div className="sm:hidden flex items-center px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <span className="text-blue-600">{currentPage}</span>
                    <span className="mx-2 text-gray-400">/</span>
                    <span>{totalPages}</span>
                  </div>
                  
                  {/* 下一页按钮 */}
                  {currentPage < totalPages ? (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="group relative inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                      aria-label="下一页"
                    >
                      <span className="mr-2 hidden sm:inline">下一页</span>
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <span className="relative inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-300 bg-gray-50 rounded-xl cursor-not-allowed">
                      <span className="mr-2 hidden sm:inline">下一页</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  )}
                </div>
              </nav>
              
              {/* 分页信息 */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  显示第 <span className="font-medium text-blue-600">{startIndex + 1}</span> - <span className="font-medium text-blue-600">{Math.min(endIndex, posts.length)}</span> 条，
                  共 <span className="font-medium text-blue-600">{posts.length}</span> 篇文章
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}