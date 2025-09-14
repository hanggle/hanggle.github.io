'use client';

import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 解析HTML内容，提取标题
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const items: TocItem[] = [];
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || '';
      const id = `heading-${index}`;
      
      items.push({ id, text, level });
    });
    
    setTocItems(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    // 观察所有标题
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => {
      headings.forEach((heading) => {
        if (heading.id) {
          observer.unobserve(heading);
        }
      });
    };
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100; // 考虑固定导航栏高度
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* 移动端切换按钮 */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-20 right-4 z-40 md:hidden p-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        aria-label="切换目录"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* 目录容器 */}
      <div className={`fixed top-24 right-4 z-30 w-64 max-h-96 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full md:opacity-100 md:translate-x-0'
      }`}>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            目录
          </h3>
          
          <nav className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left py-1 px-2 text-sm rounded transition-colors ${
                  activeId === item.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${
                  item.level === 1 ? 'font-semibold' :
                  item.level === 2 ? 'ml-2' :
                  item.level === 3 ? 'ml-4' :
                  item.level === 4 ? 'ml-6' :
                  item.level === 5 ? 'ml-8' : 'ml-10'
                }`}
                style={{
                  fontSize: item.level === 1 ? '0.875rem' : 
                           item.level === 2 ? '0.8125rem' : '0.75rem'
                }}
              >
                {item.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* 移动端遮罩层 */}
      {isVisible && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-25 md:hidden" 
          onClick={() => setIsVisible(false)}
        />
      )}
    </>
  );
}