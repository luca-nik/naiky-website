import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoadingMessage from '@/components/LoadingMessage';
import { marked } from 'marked';
import { parseFrontMatter } from '@/utils/parseFrontMatter';
import '@/styles/SectionPage.css';

// Same interfaces, titles, and descriptions as before
interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
}

const sectionTitles = {
  science: "Let's talk Science folks!",
  outdoor: "Go wild",
  thoughts: "Pseudorandom stuff",
  web3: "Web3 & Tech",
};

const sectionDescriptions = {
  science: "Discover the world of science.",
  outdoor: "Get outside and explore!",
  thoughts: "Random musings and ideas.",
  web3: "Exploring the future of decentralized tech.",
};

// Static Site Generation
export const getStaticPaths: GetStaticPaths = async () => {
  const sections = ['science', 'outdoor', 'thoughts', 'web3']; // Add available sections here
  return {
    paths: sections.map((section) => ({ params: { section } })),
    fallback: false, // Pre-render only these paths; show 404 for others
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { section } = context.params!;
  const response = await fetch(`/_posts/${section}/index.json`);
  const { files } = await response.json();

  const posts = await Promise.all(
    files.map(async (file: string) => {
      const markdownFile = await fetch(`/_posts/${section}/${file}`);
      const text = await markdownFile.text();
      const { title, excerpt, coverImage, date } = parseFrontMatter(text);

      return {
        id: file.replace('.md', ''),
        title,
        excerpt,
        date,
        coverImage: `/_images/${coverImage}`, // Adjust image paths
      };
    })
  );

  return {
    props: {
      posts,
      section,
    },
  };
};

const SectionPage = ({ posts, section }: { posts: Post[]; section: string }) => {
  if (!posts || posts.length === 0) return <p>No posts available.</p>;

  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="section-page">
      <div className="section-page-description">
        <h2 className="section-page-description-title">
          {sectionTitles[section as string]}
        </h2>
        <p className="section-page-description-text">
          {sectionDescriptions[section as string]}
        </p>
      </div>

      {latestPost && (
        <div className="latest-post">
          <Link href={`/post/${section}/${latestPost.id}`}>
            <div className="latest-post-item">
              <img
                src={latestPost.coverImage}
                alt={latestPost.title}
                className="latest-post-image"
              />
              <div className="latest-post-details">
                <h2>{latestPost.title}</h2>
                <p className="latest-post-excerpt">{latestPost.excerpt}</p>
                <p className="latest-post-date">{latestPost.date}</p>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="posts-list">
        {otherPosts.length > 0 ? (
          otherPosts.map((post) => (
            <Link key={post.id} href={`/post/${section}/${post.id}`}>
              <div className="post-item">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="post-image"
                />
                <div className="post-details">
                  <h2>{post.title}</h2>
                  <p className="excerpt">{post.excerpt}</p>
                  <p className="date">{post.date}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default SectionPage;
