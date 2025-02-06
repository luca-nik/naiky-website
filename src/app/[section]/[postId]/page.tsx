import { marked } from 'marked';
import { parseFrontMatter } from '@/utils/parseFrontMatter';
import { Metadata } from 'next';
import '@/styles/BlogPostPage.css';
// Import KaTeX CSS and rendering function
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface Props {
  params: Promise<{
    section: string;
    postId: string;
  }>;
}

type ErrorWithMessage = {
  message: string;
}

// Create a custom tokenizer for inline math
const mathInlineTokenizer = {
  name: 'mathInline',
  level: 'inline',
  start(src: string) {
    return src.match(/\$/)?.index;
  },
  tokenizer(src: string) {
    const match = src.match(/^\$([^$]+)\$/);
    if (match) {
      return {
        type: 'mathInline',
        raw: match[0],
        text: match[1].trim(),
      };
    }
    return undefined;
  },
  renderer(token: any) {
    try {
      return katex.renderToString(token.text, {
        displayMode: false,
        throwOnError: false
      });
    } catch (error) {
      console.error('KaTeX error:', error);
      return token.raw;
    }
  }
};

// Create a custom tokenizer for block math
const mathBlockRule = {
  name: 'mathBlock',
  level: 'block',
  start(src: string) {
    return src.match(/```math/)?.index;
  },
  tokenizer(src: string) {
    const match = src.match(/^```math\n([\s\S]+?)\n```/);
    if (match) {
      return {
        type: 'mathBlock',
        raw: match[0],
        text: match[1].trim(),
      };
    }
    return undefined;
  },
  renderer(token: any) {
    try {
      return katex.renderToString(token.text, {
        displayMode: true,
        throwOnError: false
      });
    } catch (error) {
      console.error('KaTeX error:', error);
      return token.raw;
    }
  }
};

// Use the custom tokenizers
marked.use({
  extensions: [mathInlineTokenizer, mathBlockRule]
});

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

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const { section, postId } = resolvedParams;
  
  try {
    const { title, coverImage, date, content } = await getBlogPost(section, postId);
    const htmlContent = marked(content);
    
    return (
      <div className="blogpost-page">
        <div className="title-cover-container">
          <h1 className="blogpost-title">{title}</h1>
          {coverImage && <img src={`/_images/${coverImage}`} alt={title} className="blogpost-cover-image" />}
        </div>
        <div className="content-container">
          <div 
            className="blogpost-content" 
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
          <p className="blogpost-date">{date}</p>
        </div>
      </div>
    );
  } catch (error) {
    const errorMessage = (error as ErrorWithMessage).message || 'An error occurred';
    return <p>Error: {errorMessage}</p>;
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const { section, postId } = resolvedParams;
  
  const { title, excerpt, coverImage } = await getBlogPost(section, postId);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const imageUrl = coverImage ? `${baseUrl}/_images/${coverImage}` : undefined;
  
  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      type: 'article',
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}