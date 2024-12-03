import React from 'react';
import Link from 'next/link'; // Use Next.js Link for navigation
import '@/styles/SectionPage.css'; // Import your styles

// Define TypeScript interfaces
interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
}

interface SectionPageProps {
  section: string;
  posts: Post[];
}

const sectionTitles: { [key: string]: string } = {
  science: "Let's talk Science folks!",
  outdoor: "Go wild",
  thoughts: "Pseudorandom stuff",
  web3: "Web3 & Tech",
};

const sectionDescriptions: { [key: string]: string } = {
  science: "Discover the world of science.",
  outdoor: "Get outside and explore!",
  thoughts: "Random musings and ideas.",
  web3: "Exploring the future of decentralized tech.",
};

const SectionPageComponent: React.FC<SectionPageProps> = ({ section, posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="section-page">
        <h2>{sectionTitles[section]}</h2>
        <p>{sectionDescriptions[section]}</p>
        <p>No posts available in this section.</p>
      </div>
    );
  }

  // Separate the latest post from the others
  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="section-page">
      {/* Section Title and Description */}
      <div className="section-page-description">
        <h2 className="section-page-description-title">
          {sectionTitles[section]}
        </h2>
        <p className="section-page-description-text">
          {sectionDescriptions[section]}
        </p>
      </div>

      {/* Latest Post */}
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

      {/* Other Posts List */}
      <div className="posts-list">
        {otherPosts.map((post) => (
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
        ))}
      </div>
    </div>
  );
};

export default SectionPageComponent;
