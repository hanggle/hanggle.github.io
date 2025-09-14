'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language?: string;
  children: string;
}

export default function CodeBlock({ language = 'text', children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // 自定义样式
  const customStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: '#1e293b',
      borderRadius: '0.5rem',
      margin: '1.5rem 0',
      padding: '1.5rem',
      fontSize: '0.875rem',
      lineHeight: '1.7',
      position: 'relative' as const,
      overflow: 'auto',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'transparent',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
    },
  };

  return (
    <div className="relative group">
      {/* 语言标签 */}
      {language && language !== 'text' && (
        <div className="absolute top-3 left-4 z-10">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {language}
          </span>
        </div>
      )}
      
      {/* 复制按钮 */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded transition-colors opacity-0 group-hover:opacity-100"
        aria-label="复制代码"
      >
        {copied ? '已复制!' : '复制'}
      </button>
      
      {/* 代码高亮 */}
      <SyntaxHighlighter
        language={language}
        style={customStyle}
        customStyle={{
          background: '#1e293b',
          borderRadius: '0.5rem',
          margin: '1.5rem 0',
          padding: '1.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.7',
        }}
        codeTagProps={{
          style: {
            fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
          }
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}