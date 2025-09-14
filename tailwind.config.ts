import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
            // 标题样式
            'h1': {
              color: '#111827',
              fontWeight: '800',
              fontSize: '2.5rem',
              lineHeight: '1.2',
              marginTop: '2.5rem',
              marginBottom: '1.5rem',
            },
            'h2': {
              color: '#111827',
              fontWeight: '700',
              fontSize: '2rem',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1rem',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '0.5rem',
            },
            'h3': {
              color: '#111827',
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '1.4',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
            },
            // 段落样式
            'p': {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              lineHeight: '1.75',
            },
            // 链接样式
            'a': {
              color: '#3B82F6',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#1D4ED8',
                textDecoration: 'underline',
              },
            },
            // 代码样式
            'code': {
              color: '#1F2937',
              backgroundColor: '#F3F4F6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'pre': {
              backgroundColor: '#1F2937',
              color: '#F9FAFB',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.7',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0.75rem',
              padding: '1.5rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
            },
            // 引用块样式
            'blockquote': {
              fontStyle: 'italic',
              color: '#4B5563',
              borderLeftWidth: '4px',
              borderLeftColor: '#3B82F6',
              backgroundColor: '#EFF6FF',
              padding: '1rem 1.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
            // 列表样式
            'ul': {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            'ol': {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            'li': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            // 表格样式
            'table': {
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
              overflow: 'hidden',
            },
            'th': {
              backgroundColor: '#F9FAFB',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: '600',
              color: '#374151',
              borderBottom: '1px solid #E5E7EB',
            },
            'td': {
              padding: '0.75rem 1rem',
              borderBottom: '1px solid #F3F4F6',
            },
            // 图片样式
            'img': {
              borderRadius: '0.75rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
            // 分割线
            'hr': {
              borderColor: '#E5E7EB',
              borderTopWidth: '2px',
              marginTop: '3rem',
              marginBottom: '3rem',
            },
            // 强调文本
            'strong': {
              color: '#111827',
              fontWeight: '600',
            },
            'em': {
              fontStyle: 'italic',
            },
          },
        },
      },
    },
  },
  plugins: [
    // 使用自定义 typography 样式，不依赖插件
  ],
};

export default config;