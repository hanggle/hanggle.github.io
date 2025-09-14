import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CodeHighlight from '@/components/CodeHighlight';
import TableOfContents from '@/components/TableOfContents';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ArticleViewTracker from '@/components/ArticleViewTracker';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    id: path.params.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Post({ params }: PageProps) {
  const { id } = await params;
  const postData = await getPostData(id);
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 文章浏览统计 */}
      <ArticleViewTracker articleId={id} articleTitle={postData.title} />
      
      <Navbar allPosts={allPostsData} />
      <div className="pt-16"> {/* 添加顶部间距 */}
        <main className="flex-grow">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
          
          {/* Article header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {postData.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <time className="text-sm">
                {postData.date}
              </time>
              
              {postData.tags && postData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {postData.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>
          
          {/* Article content */}
          <CodeHighlight>
            <div 
              className="typography-content max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: postData.content || '' }}
            />
          </CodeHighlight>
          
          {/* Navigation to other posts */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="text-center">
              <Link 
                href="/" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                查看更多文章
              </Link>
            </div>
          </div>
        </article>
        
        {/* Table of Contents */}
        <TableOfContents content={postData.content || ''} />
        
        {/* Scroll to Top Button */}
        <ScrollToTopButton />
        </main>
      </div>
      
      <Footer />
    </div>
  );
}