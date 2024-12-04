import { Post } from '../types/post';
import Link from 'next/link';
import '@/styles/components/LatestPost.css'

const LatestPost = ({ post }: { post: Post }) => {
  return (
    <div className="latest-post">
      <Link href={`/_posts/${post.section}/${post.id}`} className="latest-post-item">
        <img src={post.coverImage} alt={post.title} className="latest-post-image" />
        <div className="latest-post-details">
          <h2>{post.title}</h2>
          <p className="latest-post-excerpt">{post.excerpt}</p>
          <p className="latest-post-date">{post.date}</p>
        </div>
      </Link>
    </div>
  );
};

export default LatestPost;
