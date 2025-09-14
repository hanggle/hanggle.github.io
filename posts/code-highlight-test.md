---
title: "代码高亮功能测试"
date: "2024-01-25"
excerpt: "测试博客系统的代码高亮功能，包含多种编程语言的示例。"
tags: ["测试", "代码高亮", "技术"]
---

# 代码高亮功能测试

这个页面用于测试博客系统的代码高亮功能，包含多种编程语言的代码示例。

## JavaScript 示例

```javascript
// JavaScript 代码示例
const greeting = "Hello, World!";
const numbers = [1, 2, 3, 4, 5];

function calculateSum(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}

// 异步函数示例
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取数据失败:', error);
    throw error;
  }
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return `我是 ${this.name}，今年 ${this.age} 岁。`;
  }
}
```

## TypeScript 示例

```typescript
// TypeScript 代码示例
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type UserWithoutId = Omit<User, 'id'>;

class UserService {
  private users: User[] = [];
  
  constructor() {
    this.users = [];
  }
  
  addUser(userData: UserWithoutId): User {
    const newUser: User = {
      id: this.generateId(),
      ...userData
    };
    
    this.users.push(newUser);
    return newUser;
  }
  
  private generateId(): number {
    return Math.max(...this.users.map(u => u.id), 0) + 1;
  }
  
  findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
```

## React JSX 示例

```jsx
// React 组件示例
import React, { useState, useEffect } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // 从本地存储加载数据
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setInputValue('');
    }
  };

  return (
    <div className="todo-app">
      <h1>待办事项</h1>
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="添加新的待办事项..."
        />
        <button onClick={addTodo}>添加</button>
      </div>
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
```

## Python 示例

```python
# Python 代码示例
import asyncio
import aiohttp
from typing import List, Dict, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Article:
    title: str
    content: str
    author: str
    created_at: datetime
    tags: List[str]

class BlogService:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.articles: List[Article] = []
    
    async def fetch_articles(self) -> List[Dict]:
        """异步获取文章列表"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(f"{self.base_url}/articles") as response:
                    if response.status == 200:
                        return await response.json()
                    else:
                        raise Exception(f"HTTP {response.status}")
            except Exception as e:
                print(f"获取文章失败: {e}")
                return []
    
    def filter_articles_by_tag(self, tag: str) -> List[Article]:
        """根据标签过滤文章"""
        return [
            article for article in self.articles 
            if tag.lower() in [t.lower() for t in article.tags]
        ]
    
    def search_articles(self, keyword: str) -> List[Article]:
        """搜索文章"""
        keyword = keyword.lower()
        return [
            article for article in self.articles
            if keyword in article.title.lower() or keyword in article.content.lower()
        ]

# 使用示例
async def main():
    blog_service = BlogService("https://api.example.com")
    articles_data = await blog_service.fetch_articles()
    
    for data in articles_data:
        article = Article(
            title=data['title'],
            content=data['content'],
            author=data['author'],
            created_at=datetime.fromisoformat(data['created_at']),
            tags=data.get('tags', [])
        )
        blog_service.articles.append(article)
    
    # 搜索相关文章
    tech_articles = blog_service.filter_articles_by_tag('技术')
    print(f"找到 {len(tech_articles)} 篇技术相关文章")

if __name__ == "__main__":
    asyncio.run(main())
```

## CSS 示例

```css
/* CSS 样式示例 */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --background-color: #f8fafc;
  --text-color: #1e293b;
  --border-radius: 0.5rem;
  --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
}

.btn:hover {
  background-color: #2563eb;
}

.btn--secondary {
  background-color: var(--secondary-color);
}

.btn--secondary:hover {
  background-color: #475569;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .card {
    padding: 1rem;
  }
  
  .btn {
    width: 100%;
    text-align: center;
  }
}
```

## JSON 示例

```json
{
  "name": "个人博客系统",
  "version": "1.0.0",
  "description": "使用 Next.js + TailwindCSS + Markdown 构建的现代化博客系统",
  "main": "src/app/page.tsx",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.3.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.1",
    "remark-html": "^16.0.1",
    "react-syntax-highlighter": "^15.6.6"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  },
  "keywords": [
    "博客",
    "Next.js",
    "React",
    "TailwindCSS",
    "Markdown",
    "TypeScript"
  ],
  "author": {
    "name": "开发者",
    "email": "developer@example.com"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/blog-system.git"
  }
}
```

## 总结

这个测试页面包含了多种编程语言的代码示例：

1. **JavaScript** - 展示基础语法、异步编程和类定义
2. **TypeScript** - 展示类型定义、接口和泛型
3. **React JSX** - 展示现代 React 组件和 Hook 使用
4. **Python** - 展示异步编程、数据类和类型注解
5. **CSS** - 展示现代 CSS 特性和响应式设计
6. **JSON** - 展示配置文件结构

如果代码高亮功能正常工作，您应该能看到：
- 不同的颜色用于关键字、字符串、注释等
- 语言标签显示在代码块的左上角
- 复制按钮显示在代码块的右上角
- 悬停时显示交互效果

请测试复制功能和不同编程语言的语法高亮效果！