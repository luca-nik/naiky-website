import { Post } from '@/types/post';
import Link from 'next/link';
import '@/styles/components/OtherPosts.css'


const OtherPosts = ({ posts, section }: { posts: Post[]; section: string }) => {
  return (
    <div className="posts-list">
      {posts.map((post) => (
        <Link key={post.id} href={`/${section}/${post.id}`} className="post-item">
          <img src={post.coverImage} alt={post.title} className="post-image" />
          <div className="post-details">
            <h2>{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <p className="post-date">{post.date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OtherPosts;
