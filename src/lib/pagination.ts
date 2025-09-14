// 分页工具函数

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
}

export interface PaginatedData<T> {
  data: T[];
  pagination: PaginationInfo;
}

/**
 * 分页数据
 * @param items 要分页的数据数组
 * @param page 当前页码（从1开始）
 * @param itemsPerPage 每页显示的项目数量
 * @returns 分页后的数据和分页信息
 */
export function paginateData<T>(
  items: T[],
  page: number = 1,
  itemsPerPage: number = 6
): PaginatedData<T> {
  const currentPage = Math.max(1, page);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // 确保当前页不超过总页数
  const validCurrentPage = Math.min(currentPage, totalPages || 1);
  
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const paginatedItems = items.slice(startIndex, endIndex);
  
  const pagination: PaginationInfo = {
    currentPage: validCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1,
    startIndex,
    endIndex: Math.min(endIndex, totalItems)
  };
  
  return {
    data: paginatedItems,
    pagination
  };
}

/**
 * 生成页码数组（用于分页导航）
 * @param currentPage 当前页码
 * @param totalPages 总页数
 * @param maxVisible 最多显示的页码数量
 * @returns 页码数组
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 7
): (number | '...')[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  const delta = Math.floor(maxVisible / 2);
  const range: number[] = [];
  const rangeWithDots: (number | '...')[] = [];
  
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }
  
  if (currentPage - delta > 2) {
    rangeWithDots.push(1, '...');
  } else {
    rangeWithDots.push(1);
  }
  
  rangeWithDots.push(...range);
  
  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push('...', totalPages);
  } else if (totalPages > 1) {
    rangeWithDots.push(totalPages);
  }
  
  return rangeWithDots;
}