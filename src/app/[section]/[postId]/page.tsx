// app/[section]/[postId]/page.tsx
import { marked } from 'marked';
import { parseFrontMatter } from '@/utils/parseFrontMatter';
import { Metadata } from 'next';
import LoadingMessage from '@/components/LoadingMessage';
import '@/styles/BlogPostPage.css';

marked.setOptions({
 gfm: true,
 breaks: true,
});

interface PageProps {
 params: {
   section: string;
   postId: string;
 }
}

async function getBlogPost(section: string, postId: string) {
 const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
 
 const indexResponse = await fetch(`${baseUrl}/_posts/${section}/index.json`);
 if (!indexResponse.ok) throw new Error('Failed to load index file');
 
 const { files } = await indexResponse.json();
 if (!files.includes(`${postId}.md`)) throw new Error('Post not found');

 const markdownFile = await fetch(`${baseUrl}/_posts/${section}/${postId}.md`);
 if (!markdownFile.ok) throw new Error('Failed to load markdown file');
 
 const text = await markdownFile.text();
 return parseFrontMatter(text);
}

export default async function BlogPostPage({ params }: PageProps) {
  const section = (await params).section;
  const postId = (await params).postId;

  try {
    const { title, coverImage, excerpt, date, content } = await getBlogPost(section, postId);
    const htmlContent = marked(content);

   return (
     <div className="blogpost-page">
       <div className="title-cover-container">
         <h1 className="blogpost-title">{title}</h1>
         {coverImage && <img src={`/_images/${coverImage}`} alt={title} className="blogpost-cover-image" />}
       </div>
       <div className="content-container">
         <div className="blogpost-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
         <p className="blogpost-date">{date}</p>
       </div>
     </div>
   );
 } catch (error) {
   return <p>Error: {error.message}</p>;
 }
}

 export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const section = (await params).section;
  const postId = (await params).postId;
  
  const { title, excerpt, coverImage } = await getBlogPost(section, postId);
 
 return {
   title,
   description: excerpt,
   openGraph: {
     title,
     description: excerpt,
     images: [`/_images/${coverImage}`],
   },
 };
}