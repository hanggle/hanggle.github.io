'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { PostData } from '@/lib/posts';
import { trackSearch } from '@/lib/analytics';

interface NavbarProps {
  allPosts?: PostData[];
}

export default function Navbar({ allPosts = [] }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PostData[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 移除获取文章数据的 useEffect，改为使用 props

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchFocused(false);
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 搜索功能
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    // 统计搜索事件
    if (query.trim().length >= 2) {
      trackSearch(query.trim());
    }

    const filtered = allPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(query.toLowerCase());
      const tagsMatch = post.tags?.some(tag => 
        tag.toLowerCase().includes(query.toLowerCase())
      );
      const excerptMatch = post.excerpt?.toLowerCase().includes(query.toLowerCase());
      
      return titleMatch || tagsMatch || excerptMatch;
    });

    setSearchResults(filtered.slice(0, 5)); // 限制显示5个结果
    setIsSearchFocused(true); // 自动显示搜索结果
  };

  // 清空搜索
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
  };

  // 移动端搜索切换
  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      // 打开搜索时清空之前的结果
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-md border-b border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
              {/* Logo图标 */}
              <div className="relative">
                <Image
                  src="./icon_128.png"
                  alt="博客Logo"
                  width={40}
                  height={40}
                  className="transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              
              {/* 文字Logo */}
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  hanggle的博客
                </div>
                <div className="text-xs text-gray-500 font-normal">
                  Tech Blog
                </div>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              首页
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              关于
            </Link>
            
            {/* 搜索框 - 桌面端悬停展开 */}
            <div className="relative group" ref={searchRef}>
              <div className="relative">
                {/* 搜索图标 */}
                <div className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer group-hover:bg-gray-50 rounded-full">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                {/* 展开的搜索框 */}
                <div className="absolute top-0 right-0 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-300 ease-in-out transform translate-x-4 group-hover:translate-x-0 focus-within:translate-x-0 z-50">
                  <div className="relative bg-white rounded-full shadow-xl border border-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      className="block w-full pl-10 pr-10 py-2 border-0 rounded-full leading-5 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      placeholder="搜索文章标题、标签..."
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 搜索结果下拉框 */}
              {isSearchFocused && (searchResults.length > 0 || searchQuery.length > 0) && (
                <div className="absolute top-full right-0 w-80 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                        搜索结果 ({searchResults.length})
                      </div>
                      {searchResults.map((post) => (
                        <Link
                          key={post.id}
                          href={`/posts/${post.id}`}
                          onClick={clearSearch}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {post.title}
                              </h4>
                              {post.excerpt && (
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {post.excerpt}
                                </p>
                              )}
                              <div className="flex items-center mt-2 space-x-2">
                                <time className="text-xs text-gray-400">
                                  {post.date}
                                </time>
                                {post.tags && post.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {post.tags.slice(0, 2).map((tag) => (
                                      <span 
                                        key={tag}
                                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : searchQuery.length > 0 ? (
                    <div className="px-4 py-8 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">未找到结果</h3>
                      <p className="mt-1 text-sm text-gray-500">试试其他关键词</p>
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">输入关键词搜索文章</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 移动端菜单和搜索 */}
          <div className="md:hidden flex items-center space-x-2">
            {/* 移动端搜索按钮 */}
            <button 
              onClick={toggleMobileSearch}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* 移动端菜单按钮 */}
            <button 
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* 移动端搜索模态框 */}
      {isMobileSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* 搜索头部 */}
            <div className="flex items-center p-4 border-b border-gray-200">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="搜索文章标题、标签..."
                  autoFocus
                />
              </div>
              <button
                onClick={toggleMobileSearch}
                className="ml-3 text-gray-500 hover:text-gray-700 p-2"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 搜索结果区域 */}
            <div className="flex-1 overflow-y-auto">
              {searchQuery.length > 0 ? (
                searchResults.length > 0 ? (
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-500 mb-4">
                      找到 {searchResults.length} 个结果
                    </div>
                    <div className="space-y-4">
                      {searchResults.map((post) => (
                        <Link
                          key={post.id}
                          href={`/posts/${post.id}`}
                          onClick={clearSearch}
                          className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="font-medium text-gray-900 mb-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-sm">
                            <time className="text-gray-500">
                              {post.date}
                            </time>
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 2).map((tag) => (
                                  <span 
                                    key={tag}
                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                    <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">未找到结果</h3>
                    <p className="text-gray-500">试试其他关键词</p>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                  <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">搜索文章</h3>
                  <p className="text-gray-500">输入关键词搜索文章标题和标签</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}