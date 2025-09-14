'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PaginationInfo, generatePageNumbers } from '@/lib/pagination';
import { trackPagination } from '@/lib/analytics';
import { Suspense } from 'react';

interface PaginationProps {
  pagination: PaginationInfo;
  basePath?: string;
  showInfo?: boolean;
}

function PaginationInner({ 
  pagination, 
  basePath = '/' 
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;
  
  // 如果只有一页，不显示分页
  if (totalPages <= 1) {
    return null;
  }
  
  // 生成页码数组
  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  
  // 构建链接URL
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    const queryString = params.toString();
    return basePath + (queryString ? `?${queryString}` : '');
  };
  
  // 分页点击统计
  const handlePageClick = (page: number) => {
    trackPagination(page, totalPages);
  };
  
  return (
    <div className="flex flex-col items-center space-y-6 mt-16 px-4">
      {/* 分页导航 */}
      <nav className="flex items-center justify-center" aria-label="分页导航">
        <div className="flex items-center space-x-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
          {/* 上一页按钮 */}
          {hasPrevPage ? (
            <Link
              href={buildPageUrl(currentPage - 1)}
              onClick={() => handlePageClick(currentPage - 1)}
              className="group relative inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
              aria-label="上一页"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="ml-2 hidden sm:inline">上一页</span>
            </Link>
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
                <Link
                  key={pageNum}
                  href={buildPageUrl(pageNum as number)}
                  onClick={() => handlePageClick(pageNum as number)}
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
                </Link>
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
          {hasNextPage ? (
            <Link
              href={buildPageUrl(currentPage + 1)}
              onClick={() => handlePageClick(currentPage + 1)}
              className="group relative inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
              aria-label="下一页"
            >
              <span className="mr-2 hidden sm:inline">下一页</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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
      
      {/* 快速跳转（只在桌面端显示） */}
      {totalPages > 5 && (
        <div className="hidden sm:flex items-center space-x-3 text-sm text-gray-600 bg-white px-6 py-3 rounded-2xl shadow-md border border-gray-200">
          <span className="font-medium">快速跳转至</span>
          <div className="relative">
            <input
              type="number"
              min="1"
              max={totalPages}
              defaultValue={currentPage}
              className="w-20 px-3 py-2 text-center border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt((e.target as HTMLInputElement).value);
                  if (page >= 1 && page <= totalPages && page !== currentPage) {
                    handlePageClick(page);
                    router.push(buildPageUrl(page));
                  }
                }
              }}
            />
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <span className="font-medium">页</span>
          <div className="text-xs text-gray-500 ml-2">
            共 <span className="font-semibold text-blue-600">{totalPages}</span> 页
          </div>
        </div>
      )}
    </div>
  );
}

export default function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <PaginationInner {...props} />
    </Suspense>
  );
}