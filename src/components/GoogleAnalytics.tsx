'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { GA_TRACKING_ID, pageview, isAnalyticsEnabled } from '@/lib/analytics';

function GoogleAnalyticsInner() {
  useEffect(() => {
    if (isAnalyticsEnabled && typeof window !== 'undefined') {
      // 初始化页面视图跟踪
      const url = window.location.pathname + window.location.search;
      pageview(url);
      
      // 监听路由变化（针对 SPA 导航）
      const handleRouteChange = () => {
        const newUrl = window.location.pathname + window.location.search;
        pageview(newUrl);
      };
      
      // 修改 History API 以监听程序化导航
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      
      window.history.pushState = function(...args) {
        originalPushState.apply(window.history, args);
        setTimeout(handleRouteChange, 0);
      };
      
      window.history.replaceState = function(...args) {
        originalReplaceState.apply(window.history, args);
        setTimeout(handleRouteChange, 0);
      };
      
      // 监听浏览器历史操作
      window.addEventListener('popstate', handleRouteChange);
      
      return () => {
        window.removeEventListener('popstate', handleRouteChange);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, []);

  return null;
}

export default function GoogleAnalytics() {
  if (!isAnalyticsEnabled) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />
      <GoogleAnalyticsInner />
    </>
  );
}