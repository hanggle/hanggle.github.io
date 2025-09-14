'use client';

import { useEffect } from 'react';
import { trackArticleView } from '@/lib/analytics';

interface ArticleViewTrackerProps {
  articleId: string;
  articleTitle: string;
}

export default function ArticleViewTracker({ articleId, articleTitle }: ArticleViewTrackerProps) {
  useEffect(() => {
    // 页面加载时统计文章浏览
    trackArticleView(articleTitle, articleId);
  }, [articleId, articleTitle]);

  return null; // 这个组件不渲染任何UI
}