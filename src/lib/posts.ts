import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

// 添加标题ID的插件
function addHeadingIds() {
  return (tree: any) => {
    let headingIndex = 0;
    visit(tree, 'heading', (node: any) => {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.id = `heading-${headingIndex}`;
      headingIndex++;
    });
  };
}

// 添加代码块语言标识的插件
function addCodeLanguage() {
  return (tree: any) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang) {
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};
        node.data.hProperties['data-language'] = node.lang;
        node.data.hProperties.className = `language-${node.lang}`;
      }
    });
  };
}

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  content?: string;
  image?: string;  // 添加图片字段
}

export function getSortedPostsData(): PostData[] {
  // 获取 posts 目录下的所有文件名
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      // 移除文件名的 ".md" 后缀来获取 id
      const id = fileName.replace(/\.md$/, '');

      // 读取 markdown 文件作为字符串
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 使用 gray-matter 来解析文章元数据部分
      const matterResult = matter(fileContents);

      // 将数据与 id 结合
      return {
        id,
        title: matterResult.data.title || id,
        date: matterResult.data.date || '',
        excerpt: matterResult.data.excerpt || '',
        tags: matterResult.data.tags || [],
        image: matterResult.data.image || '',  // 添加图片字段支持
        ...matterResult.data,
      } as PostData;
    });

  // 按日期排序文章
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 使用 gray-matter 来解析文章元数据部分
  const matterResult = matter(fileContents);

  // 使用 remark 将 markdown 转换为 HTML 字符串
  const processedContent = await remark()
    .use(remarkGfm)
    .use(addHeadingIds)
    .use(addCodeLanguage)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 将数据与 id 和 contentHtml 结合
  return {
    id,
    content: contentHtml,
    title: matterResult.data.title || id,
    date: matterResult.data.date || '',
    excerpt: matterResult.data.excerpt || '',
    tags: matterResult.data.tags || [],
    image: matterResult.data.image || '',  // 添加图片字段支持
    ...matterResult.data,
  } as PostData;
}