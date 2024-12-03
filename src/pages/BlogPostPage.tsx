import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Use Next.js useRouter for routing
import Head from 'next/head'; // Use Next.js Head for document metadata
import LoadingMessage from '@/components/LoadingMessage'; // Import LoadingMessage component
import { marked } from 'marked'; // Markdown parsing
import { parseFrontMatter } from '@/utils/parseFrontMatter'; // Import parseFrontMatter utility

import '@/styles/BlogPostPage.css'; // Import your page-specific CSS

// Set markdown options
marked.setOptions({
  gfm: true,
  breaks: true,
});

interface Post {
  content: string;
  title: string;
  coverImage: string;
  excerpt: string;
  date: string;
}

const BlogPostPage = () => {
  const router = useRouter();
  const { section, postId } = router.query; // Get dynamic route parameters from URL

  const [post, setPost] = useState<Post>({
    content: '',
    title: '',
    coverImage: '',
    excerpt: '',
    date: '',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!section || !postId) return; // Wait for section and postId to be available

      try {
        const response = await fetch(`/_posts/${section}/${postId}.md`);
        if (!response.ok) throw new Error('Post not found');
        const text = await response.text();

        const { title, coverImage, excerpt, date, content } = parseFrontMatter(text);

        setPost({
          title,
          coverImage: `${process.env.NEXT_PUBLIC_BASE_URL}/_images/${coverImage}`, // Adjust for Next.js public assets
          excerpt,
          date,
          content: marked(content),
        });
      } catch (error) {
        console.error('Error loading post:', error);
        setError('Error: Post not found.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [section, postId]); // Re-run if section or postId changes

  if (loading) return <LoadingMessage text="Loading post..." />;
  if (error) return <p>{error}</p>;

  return (
    <div className="blogpost-page">
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:url" content={`https://naiky.vercel.app/${section}/${postId}`} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="title-cover-container">
        <h1 className="blogpost-title">{post.title}</h1>
        {post.coverImage && <img src={post.coverImage} alt={post.title} className="blogpost-cover-image" />}
      </div>

      <div className="content-container">
        <div
          className="blogpost-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <p className="blogpost-date">{post.date}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;
