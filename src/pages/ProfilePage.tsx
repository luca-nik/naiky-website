import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Use Next.js Link for routing
import Head from 'next/head'; // Use Next.js Head for document metadata
import LoadingMessage from '@/components/LoadingMessage'; // Import LoadingMessage component
import { marked } from 'marked'; // Markdown parsing

import '@/styles/ProfilePage.css'; // Import your page-specific CSS

marked.setOptions({
  gfm: true,
  breaks: true,
});

interface Post {
  content: string;
}

const ProfilePage = () => {
  const [post, setPost] = useState<Post>({
    content: '',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDescription = async () => {
      try {
        const response = await fetch('/me.md'); // Fetching the markdown file from the public directory
        if (!response.ok) throw new Error('Description file me.md not found');
        const content = await response.text();
        setPost({
          content: marked(content), // Convert markdown to HTML
        });
      } catch (error) {
        console.error('Error loading description file:', error);
        setError('Error: description file not found.');
      } finally {
        setLoading(false);
      }
    };

    loadDescription();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) return <LoadingMessage text="Loading page..." />;
  if (error) return <p>{error}</p>;

  return (
    <div className="profilepage">
      <Head>
        <title>Profile Page</title>
        <meta property="og:title" content="Profile Page" />
        <meta property="og:description" content="Description of the profile" />
        <meta property="og:image" content="/_images/luca-nik.jpeg" />
        <meta property="og:url" content="https://naiky.vercel.app/profile" />
        <meta property="og:type" content="profile" />
      </Head>

      <div className="profilepage-profile-section">
        <Link href="https://github.com/luca-nik">
          <a>
            <img src="/_images/luca-nik.jpeg" alt="Profile Icon" className="profilepage-profile-icon" />
          </a>
        </Link>
        <div className="profilepage-profile-text">
          <h1 className="profilepage-name-title">Naiky</h1>
          <p className="profilepage-description">My personal description</p>
        </div>
      </div>

      <div className="profilepage-content-container">
        <div
          className="profilepage-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
