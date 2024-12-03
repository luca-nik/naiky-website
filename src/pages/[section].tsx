import { GetServerSideProps } from 'next';
import LatestPost from '@/components/LatestPost';
import OtherPosts from '@/components/OtherPosts';
import { parseFrontMatter } from '@/utils/parseFrontMatter';
import { Post } from '@/types/post';
import LoadingMessage from '@/components/LoadingMessage';
import '@/styles/SectionPage.css'; // Import your page-specific CSS

type SectionPageProps = {
  posts: Post[];
  section: string;
  loading: boolean;
  error: string | null;
};

const SectionPage = ({ posts, section, loading, error }: SectionPageProps) => {
  const sectionTitles: { [key: string]: string } = {
    science: "Let's talk Science folks!",
    outdoor: "Go wild",
    thoughts: "Pseudorandom stuff",
    web3: "Web3 & Tech",
  };

  const sectionDescriptions: { [key: string]: string } = {
    science: "",
    outdoor: "",
    thoughts: "",
    web3: "",
  };

  if (loading) return <LoadingMessage text="Loading posts..." />;
  if (error) return <p>Error: {error}</p>;

  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="section-page">
      <div className="section-page-description">
        <h2 className="section-page-description-title">{sectionTitles[section]}</h2>
        <p className="section-page-description-text">{sectionDescriptions[section]}</p>
      </div>

      {latestPost && <LatestPost post={latestPost} />}
      
      <div className="posts-list">
        <OtherPosts posts={otherPosts} section={section} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    console.log('getServerSideProps is running');
    const section = params?.section as string;
    console.log(`Fetching posts for section: ${section}`);

    // Explicitly add the full URL
    const response = await fetch(`http://localhost:3000/_posts/${section}/index.json`);
    console.log('Response status:', response.status);
    if (!response.ok) throw new Error('Failed to load index file');

    const { files } = await response.json();
    console.log('Files:', files);

    const posts = await Promise.all(
      files.map(async (file: string) => {
        const markdownFile = await fetch(`http://localhost:3000/_posts/${section}/${file}`);
        if (!markdownFile.ok) throw new Error(`Failed to load markdown file: ${file}`);
        const text = await markdownFile.text();
        const { title, excerpt, coverImage, date } = parseFrontMatter(text);

        const imageUrl = `/_images/${coverImage}`;

        return {
          id: file.replace('.md', ''),
          title,
          excerpt,
          date,
          coverImage: imageUrl,
        };
      })
    );

    return {
      props: {
        posts,
        section,
        loading: false,
        error: null,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        posts: [],
        section: '',
        loading: false,
        error: error.message,
      },
    };
  }
};

export default SectionPage;
