'use client';

import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { trackCodeCopy } from '@/lib/analytics';

interface CodeHighlightProps {
  children: React.ReactNode;
}

interface CodeBlockData {
  language: string;
  code: string;
  element: HTMLElement;
  id: string;
}

export default function CodeHighlight({ children }: CodeHighlightProps) {
  const [mounted, setMounted] = useState(false);
  const [codeBlocks, setCodeBlocks] = useState<CodeBlockData[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // 清理所有已处理的标记，强制重新处理
    const allCodeElements = document.querySelectorAll('.code-highlight-container pre[data-processed]');
    allCodeElements.forEach(pre => {
      delete (pre as HTMLElement).dataset.processed;
      delete (pre as HTMLElement).dataset.enhanced;
    });
    
    // 查找所有代码块并提取信息
    const extractCodeBlocks = () => {
      const foundBlocks: CodeBlockData[] = [];
      const codeElements = document.querySelectorAll('.code-highlight-container pre code');
      
      codeElements.forEach((codeElement, index) => {
        const pre = codeElement.parentElement as HTMLElement;
        if (!pre || pre.dataset.processed) return;
        
        // 获取语言类型和代码内容
        const className = codeElement.className || '';
        const languageMatch = className.match(/language-(\w+)/);
        const language = languageMatch ? languageMatch[1] : 'text';
        const code = codeElement.textContent || '';
        
        // 生成唯一ID
        const id = `code-block-${index}-${Date.now()}`;
        
        // 标记为已处理
        pre.dataset.processed = 'true';
        pre.dataset.blockId = id;
        
        foundBlocks.push({
          language,
          code,
          element: pre,
          id
        });
      });
      
      setCodeBlocks(foundBlocks);
    };

    const timer = setTimeout(extractCodeBlocks, 100);
    return () => clearTimeout(timer);
  }, [mounted, children]);

  useEffect(() => {
    if (!mounted || codeBlocks.length === 0) return;
    
    // 为每个代码块创建高亮版本
    codeBlocks.forEach((block) => {
      const { element: pre, language, code, id } = block;
      
      if (pre.dataset.enhanced) return;
      
      // 清空原内容
      pre.innerHTML = '';
      pre.className = 'group relative bg-[#0d1117] rounded-lg overflow-hidden border border-[#30363d] shadow-lg';
      pre.dataset.enhanced = 'true';
      
      // 根据语言设置不同图标和颜色
      const languageConfig: { [key: string]: { icon: string; color: string; bgColor: string } } = {
        javascript: { icon: '🟨', color: '#f7df1e', bgColor: 'rgba(247, 223, 30, 0.1)' },
        typescript: { icon: '🔵', color: '#3178c6', bgColor: 'rgba(49, 120, 198, 0.1)' },
        python: { icon: '🐍', color: '#3776ab', bgColor: 'rgba(55, 118, 171, 0.1)' },
        java: { icon: '☕', color: '#ed8b00', bgColor: 'rgba(237, 139, 0, 0.1)' },
        cpp: { icon: '🔷', color: '#00599c', bgColor: 'rgba(0, 89, 156, 0.1)' },
        c: { icon: '🔵', color: '#555555', bgColor: 'rgba(85, 85, 85, 0.1)' },
        html: { icon: '🌐', color: '#e34c26', bgColor: 'rgba(227, 76, 38, 0.1)' },
        css: { icon: '🎨', color: '#1572b6', bgColor: 'rgba(21, 114, 182, 0.1)' },
        scss: { icon: '💅', color: '#cf649a', bgColor: 'rgba(207, 100, 154, 0.1)' },
        json: { icon: '📄', color: '#292929', bgColor: 'rgba(41, 41, 41, 0.1)' },
        markdown: { icon: '📝', color: '#083fa1', bgColor: 'rgba(8, 63, 161, 0.1)' },
        shell: { icon: '💻', color: '#89e051', bgColor: 'rgba(137, 224, 81, 0.1)' },
        bash: { icon: '💻', color: '#4eaa25', bgColor: 'rgba(78, 170, 37, 0.1)' },
        sql: { icon: '🗄️', color: '#336791', bgColor: 'rgba(51, 103, 145, 0.1)' },
        php: { icon: '🐘', color: '#777bb4', bgColor: 'rgba(119, 123, 180, 0.1)' },
        ruby: { icon: '💎', color: '#cc342d', bgColor: 'rgba(204, 52, 45, 0.1)' },
        go: { icon: '🐹', color: '#00add8', bgColor: 'rgba(0, 173, 216, 0.1)' },
        rust: { icon: '🦀', color: '#ce422b', bgColor: 'rgba(206, 66, 43, 0.1)' },
        swift: { icon: '🐦', color: '#fa7343', bgColor: 'rgba(250, 115, 67, 0.1)' },
        kotlin: { icon: '🎯', color: '#7f52ff', bgColor: 'rgba(127, 82, 255, 0.1)' },
        jsx: { icon: '⚛️', color: '#61dafb', bgColor: 'rgba(97, 218, 251, 0.1)' },
        tsx: { icon: '⚛️', color: '#61dafb', bgColor: 'rgba(97, 218, 251, 0.1)' },
        vue: { icon: '💚', color: '#4fc08d', bgColor: 'rgba(79, 192, 141, 0.1)' },
        xml: { icon: '📋', color: '#ff6600', bgColor: 'rgba(255, 102, 0, 0.1)' },
        yaml: { icon: '📝', color: '#cb171e', bgColor: 'rgba(203, 23, 30, 0.1)' },
        yml: { icon: '📝', color: '#cb171e', bgColor: 'rgba(203, 23, 30, 0.1)' }
      };
      
      const config = languageConfig[language] || { icon: '📄', color: '#7d8590', bgColor: 'rgba(125, 133, 144, 0.1)' };
      
      // 创建悬浮工具栏（右上角）
      const floatingToolbar = document.createElement('div');
      floatingToolbar.className = 'absolute top-3 right-3 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-8px] group-hover:translate-y-0';
      
      // 语言标签（带背景色和边框）
      const languageLabel = document.createElement('div');
      languageLabel.className = 'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 shadow-md';
      languageLabel.style.cssText = `
        color: ${config.color};
        background-color: ${config.bgColor};
        border-color: ${config.color}66;
        backdrop-filter: blur(12px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
        height: auto;
        min-height: 28px;
        line-height: 1.2;
      `;
      
      // 文件图标
      const fileIcon = document.createElement('span');
      fileIcon.textContent = config.icon;
      fileIcon.className = 'text-sm';
      
      // 语言文本
      const languageText = document.createElement('span');
      languageText.textContent = language === 'text' ? 'Plain' : language.toUpperCase();
      
      languageLabel.appendChild(fileIcon);
      languageLabel.appendChild(languageText);
      floatingToolbar.appendChild(languageLabel);
      
      // 复制按钮（优化的样式）
      const copyButton = document.createElement('button');
      copyButton.className = 'group/copy flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#f0f6fc] bg-[#21262d]/90 hover:bg-[#30363d] rounded-md transition-all duration-300 border backdrop-blur-lg shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-0.5';
      
      // 设置与语言标签相同的边框样式和高度，强制设置 important
      copyButton.style.cssText += `; border-color: ${config.color}66 !important; border-width: 1px !important; border-style: solid !important; height: auto !important; min-height: 28px !important; line-height: 1.2 !important; box-sizing: border-box !important;`;
      
      // 创建图标容器，确保不影响边框
      const iconContainer = document.createElement('span');
      iconContainer.className = 'inline-flex items-center justify-center transition-all duration-300 group-hover/copy:scale-110 group-hover/copy:rotate-3';
      iconContainer.style.cssText = 'margin: 0; padding: 0; border: none; outline: none; background: transparent;';
      iconContainer.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
      `;
      
      // 文本标签，确保不影响边框
      const textLabel = document.createElement('span');
      textLabel.className = 'hidden group-hover/copy:inline transition-all duration-300 transform opacity-0 group-hover/copy:opacity-100 translate-x-2 group-hover/copy:translate-x-0';
      textLabel.style.cssText = 'margin: 0; padding: 0; border: none; outline: none; background: transparent;';
      textLabel.textContent = 'Copy';
      
      copyButton.appendChild(iconContainer);
      copyButton.appendChild(textLabel);
      copyButton.setAttribute('aria-label', '复制代码到剪贴板');
      copyButton.title = '复制代码';
      
      copyButton.onclick = async () => {
        try {
          await navigator.clipboard.writeText(code);
          
          // 统计代码复制事件
          trackCodeCopy(language);
          
          // 添加成功动画效果
          copyButton.style.transform = 'scale(0.95)';
          setTimeout(() => copyButton.style.transform = '', 150);
          
          // 更新为成功状态
          copyButton.className = 'group/copy flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#3fb950] bg-[#238636]/20 border rounded-md transition-all duration-300 backdrop-blur-lg shadow-lg animate-pulse';
          copyButton.style.cssText += '; border-color: rgba(63, 185, 80, 0.4) !important; border-width: 1px !important; border-style: solid !important; box-sizing: border-box !important;';
          iconContainer.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="animate-bounce">
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
            </svg>
          `;
          textLabel.textContent = 'Copied!';
          textLabel.className = 'inline transition-all duration-300 animate-pulse';
          copyButton.title = '已复制到剪贴板';
          
          // 2.5秒后恢复原状态
          setTimeout(() => {
            copyButton.className = 'group/copy flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#f0f6fc] bg-[#21262d]/90 hover:bg-[#30363d] rounded-md transition-all duration-300 border backdrop-blur-lg shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-0.5';
            copyButton.style.cssText += `; border-color: ${config.color}66 !important; border-width: 1px !important; border-style: solid !important; box-sizing: border-box !important;`;
            iconContainer.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
              </svg>
            `;
            textLabel.textContent = 'Copy';
            textLabel.className = 'hidden group-hover/copy:inline transition-all duration-300 transform opacity-0 group-hover/copy:opacity-100 translate-x-2 group-hover/copy:translate-x-0';
            copyButton.title = '复制代码';
          }, 2500);
        } catch (err) {
          console.error('复制失败:', err);
          
          // 显示错误状态
          copyButton.className = 'group/copy flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#f85149] bg-[#da3633]/20 border rounded-md transition-all duration-300 backdrop-blur-lg animate-pulse';
          copyButton.style.cssText += '; border-color: rgba(248, 81, 73, 0.4) !important; border-width: 1px !important; border-style: solid !important; box-sizing: border-box !important;';
          iconContainer.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="animate-spin">
              <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
            </svg>
          `;
          textLabel.textContent = 'Failed';
          textLabel.className = 'inline transition-all duration-300 animate-pulse';
          
          setTimeout(() => {
            copyButton.className = 'group/copy flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#f0f6fc] bg-[#21262d]/90 hover:bg-[#30363d] rounded-md transition-all duration-300 border backdrop-blur-lg shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-0.5';
            copyButton.style.cssText += `; border-color: ${config.color}66 !important; border-width: 1px !important; border-style: solid !important; box-sizing: border-box !important;`;
            iconContainer.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
              </svg>
            `;
            textLabel.textContent = 'Copy';
            textLabel.className = 'hidden group-hover/copy:inline transition-all duration-300 transform opacity-0 group-hover/copy:opacity-100 translate-x-2 group-hover/copy:translate-x-0';
            copyButton.title = '复制代码';
          }, 2000);
        }
      };
      
      floatingToolbar.appendChild(copyButton);
      pre.appendChild(floatingToolbar);
      
      // 创建语法高亮容器
      const highlighterContainer = document.createElement('div');
      highlighterContainer.className = 'syntax-highlighter-container';
      pre.appendChild(highlighterContainer);
      
      // 直接使用 React 渲染器渲染语法高亮组件
      import('react-dom/client').then(({ createRoot }) => {
        const root = createRoot(highlighterContainer);
        root.render(
          <SyntaxHighlighter
            language={language === 'text' ? 'plaintext' : language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1.25rem 1.25rem 1.25rem 0',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              borderRadius: '0',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            }}
            showLineNumbers={true}
            lineNumberStyle={{
              minWidth: '2.5rem',
              paddingRight: '0.75rem',
              paddingLeft: '0.75rem',
              color: '#7d8590',
              backgroundColor: '#0d1117',
              borderRight: '1px solid #30363d',
              marginRight: '1rem',
              textAlign: 'right',
              fontSize: '0.75rem',
              userSelect: 'none',
              fontWeight: '400',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            }}
            lineNumberContainerStyle={{
              borderRight: '1px solid #30363d',
              backgroundColor: '#0d1117',
              paddingTop: '1.25rem',
              paddingBottom: '1.25rem',
            }}
            wrapLines={true}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
        );
      }).catch(error => {
        console.error('语法高亮渲染失败:', error);
        // GitHub 风格的降级显示
        const fallbackContainer = document.createElement('div');
        fallbackContainer.style.cssText = `
          background: #0d1117;
          color: #e6edf3;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
          font-size: 0.875rem;
          line-height: 1.6;
          position: relative;
          overflow-x: auto;
        `;
        
        // 行号区域
        const lines = code.split('\n');
        const lineNumbersDiv = document.createElement('div');
        lineNumbersDiv.style.cssText = `
          position: absolute;
          left: 0;
          top: 1.25rem;
          bottom: 1.25rem;
          width: 2.5rem;
          padding: 0 0.75rem;
          border-right: 1px solid #30363d;
          background-color: #0d1117;
          color: #7d8590;
          font-size: 0.75rem;
          text-align: right;
          user-select: none;
          line-height: 1.6;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
        `;
        
        lines.forEach((_, index) => {
          const lineNumber = document.createElement('div');
          lineNumber.textContent = (index + 1).toString();
          lineNumbersDiv.appendChild(lineNumber);
        });
        
        // 代码内容
        const codeContent = document.createElement('pre');
        codeContent.style.cssText = `
          margin: 0;
          padding: 1.25rem 1.25rem 1.25rem 3.5rem;
          background: transparent;
          overflow-x: auto;
        `;
        
        const codeElement = document.createElement('code');
        codeElement.textContent = code;
        codeElement.style.cssText = `
          color: #e6edf3;
          font-family: inherit;
        `;
        
        codeContent.appendChild(codeElement);
        fallbackContainer.appendChild(lineNumbersDiv);
        fallbackContainer.appendChild(codeContent);
        highlighterContainer.appendChild(fallbackContainer);
      });
    });
  }, [mounted, codeBlocks]);

  // 服务端渲染时返回原始内容
  if (!mounted) {
    return (
      <div className="code-highlight-container">
        {children}
      </div>
    );
  }

  return (
    <div className="code-highlight-container">
      <style jsx global>{`
        /* 内联代码样式 */
        .prose code:not(pre code) {
          background: #f1f5f9 !important;
          color: #1e293b !important;
          padding: 0.125rem 0.375rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.875em !important;
          font-weight: 600 !important;
          border: 1px solid #e2e8f0;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }
        
        /* GitHub 风格代码块容器 */
        .prose pre {
          background: #0d1117 !important;
          border-radius: 0.5rem !important;
          padding: 0 !important;
          margin: 1.5rem 0 !important;
          overflow: hidden;
          position: relative !important;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
          border: 1px solid #30363d;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          transition: all 0.3s ease-in-out;
        }
        
        .prose pre:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
          border-color: #656d76;
        }
        
        /* 语法高亮器优化 */
        .syntax-highlighter-container pre {
          margin: 0 !important;
          border-radius: 0 !important;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: #30363d #0d1117;
        }
        
        /* 代码内容区域 */
        .syntax-highlighter-container code {
          padding-left: 0 !important;
          color: #e6edf3 !important;
        }
        
        /* 悬浮动画优化 */
        @keyframes float-in {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes gentle-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        @keyframes success-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(63, 185, 80, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(63, 185, 80, 0);
          }
        }
        
        .animate-gentle-bounce {
          animation: gentle-bounce 1s ease-in-out infinite;
        }
        
        .animate-success-glow {
          animation: success-glow 1.5s ease-in-out infinite;
        }
        
        /* GitHub 风格滚动条 */
        .syntax-highlighter-container pre::-webkit-scrollbar {
          height: 0.5rem;
        }
        
        .syntax-highlighter-container pre::-webkit-scrollbar-track {
          background: #0d1117;
          border-radius: 0.25rem;
        }
        
        .syntax-highlighter-container pre::-webkit-scrollbar-thumb {
          background: #30363d;
          border-radius: 0.25rem;
          border: 1px solid #0d1117;
        }
        
        .syntax-highlighter-container pre::-webkit-scrollbar-thumb:hover {
          background: #484f58;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
          .prose pre {
            margin: 1rem -0.5rem !important;
            border-radius: 0.375rem !important;
          }
          
          .code-highlight-container {
            overflow-x: auto;
          }
          
          /* 移动端隐藏语言标签 */
          .mobile-hide {
            display: none;
          }
        }
        
        /* 暗色模式支持 */
        @media (prefers-color-scheme: dark) {
          .prose code:not(pre code) {
            background: #2d3748 !important;
            color: #e2e8f0 !important;
            border-color: #4a5568;
          }
        }
      `}</style>
      {children}
    </div>
  );
}