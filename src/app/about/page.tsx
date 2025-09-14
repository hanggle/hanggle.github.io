import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function About() {
  const allPostsData = getSortedPostsData();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar allPosts={allPostsData} />
      <div className="pt-16"> {/* 添加顶部间距 */}
        <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back to home link */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回首页
            </Link>
          </div>

          <article className="prose prose-lg max-w-none">
            <h1>关于我</h1>
            
            <div className="not-prose mb-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                  头像
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">欢迎来到我的博客</h2>
                  <p className="text-gray-600 text-lg">一个热爱编程的开发者</p>
                </div>
              </div>
            </div>

            <h2>我是谁</h2>
            <p>
              你好！我是一名前端开发工程师，专注于现代 Web 技术的学习和实践。
              我对 React、Next.js、TypeScript 等技术栈有着浓厚的兴趣，
              并且热衷于分享我在开发过程中学到的知识和经验。
            </p>

            <h2>技能和专长</h2>
            <div className="not-prose">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">前端开发</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• React / Next.js</li>
                    <li>• TypeScript / JavaScript</li>
                    <li>• TailwindCSS / CSS3</li>
                    <li>• Vue.js / Nuxt.js</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">工具和技术</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Git / GitHub</li>
                    <li>• Webpack / Vite</li>
                    <li>• Docker</li>
                    <li>• Node.js</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2>我的兴趣</h2>
            <p>
              除了编程之外，我还对以下领域充满兴趣：
            </p>
            <ul>
              <li><strong>开源项目</strong> - 积极参与和维护开源项目</li>
              <li><strong>技术写作</strong> - 通过博客分享技术知识和经验</li>
              <li><strong>持续学习</strong> - 关注最新的技术趋势和最佳实践</li>
              <li><strong>代码质量</strong> - 追求简洁、可维护的代码</li>
            </ul>

            <h2>联系方式</h2>
            <p>如果你想与我交流，欢迎通过以下方式联系：</p>
            
            <div className="not-prose">
              <div className="flex flex-wrap gap-4 my-6">
                <a 
                  href="mailto:your-email@example.com"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email
                </a>
                
                <a 
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            <h2>关于这个博客</h2>
            <p>
              这个博客使用 <strong>Next.js 15</strong>、<strong>TailwindCSS</strong> 和 <strong>Markdown</strong> 构建。
              所有文章都以 Markdown 格式编写，支持代码高亮、数学公式和丰富的排版样式。
            </p>
            <p>
              我会定期在这里分享技术文章、学习笔记和项目经验，希望能够帮助到同样在学习路上的朋友们。
            </p>

            <blockquote>
              <p>&ldquo;写作是思维的工具，分享是成长的阶梯。&rdquo;</p>
            </blockquote>

            <p className="text-center">
              感谢你花时间了解我，期待在博客中与你分享更多精彩内容！
            </p>
          </article>
        </div>
        </main>
      </div>
      
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}