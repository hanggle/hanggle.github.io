// Google Analytics配置
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// 检查是否在生产环境并且有配置ID
export const isAnalyticsEnabled = GA_TRACKING_ID && process.env.NODE_ENV === 'production';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// 页面浏览量统计
export const pageview = (url: string) => {
  if (isAnalyticsEnabled) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

// 自定义事件统计
export const event = (action: string, category: string, label?: string, value?: number) => {
  if (isAnalyticsEnabled) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 搜索事件统计
export const trackSearch = (searchTerm: string) => {
  event('search', 'engagement', searchTerm);
};

// 文章阅读事件统计
export const trackArticleView = (articleTitle: string, articleId: string) => {
  event('page_view', 'article', articleTitle);
  event('view_item', 'content', articleId);
};

// 代码复制事件统计
export const trackCodeCopy = (language: string) => {
  event('copy_code', 'engagement', language);
};

// 外部链接点击统计
export const trackOutboundLink = (url: string) => {
  event('click', 'outbound_link', url);
};

// 分页导航统计
export const trackPagination = (page: number, totalPages: number) => {
  event('pagination', 'navigation', `page_${page}`, page);
  event('pagination_usage', 'engagement', `${page}_of_${totalPages}`);
};