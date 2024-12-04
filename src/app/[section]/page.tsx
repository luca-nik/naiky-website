import SectionPageComponent from '@/components/SectionPageComponent';
import LoadingMessage from '@/components/LoadingMessage';
import { parseFrontMatter } from '@/utils/parseFrontMatter';
import { Post } from '@/types/post';

type SectionPageProps = {
  params: { section: string }; // Dynamic route parameter
};

const fetchPosts = async (section: string): Promise<{ posts: Post[]; error: string | null }> => {
  try {
    const response = await fetch(`http://localhost:3000/_posts/${section}/index.json`);
    if (!response.ok) throw new Error('Failed to load index file');

    const { files } = await response.json();

    const posts = await Promise.all(
      files.map(async (file: string) => {
        const markdownFile = await fetch(`http://localhost:3000/_posts/${section}/${file}`);
        if (!markdownFile.ok) throw new Error(`Failed to load markdown file: ${file}`);
        const text = await markdownFile.text();
        const { title, excerpt, coverImage, date } = parseFrontMatter(text);

        return {
          id: file.replace('.md', ''),
          title,
          excerpt,
          date,
          coverImage: `/_images/${coverImage}`,
        };
      })
    );

    return { posts, error: null };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], error: error.message };
  }
};

const SectionPage = async ({ params }: SectionPageProps) => {
  const { section } = params; // Get section parameter from URL
  const { posts, error } = await fetchPosts(section);

  const sectionTitles = {
    science: "Let's talk Science folks!",
    outdoor: "Go wild",
    thoughts: "Pseudorandom stuff",
    web3: "Web3 & Tech",
  };

  const sectionDescriptions = {
    science: "",
    outdoor: "",
    thoughts: "",
    web3: "",
  };

  if (error) return <p>Error: {error}</p>;
  if (posts.length === 0) return <LoadingMessage text="No posts found." />;

  const latestPost = posts[0] || null;
  const otherPosts = posts.slice(1);

  return (
    <SectionPageComponent
      section={section}
      sectionTitles={sectionTitles}
      sectionDescriptions={sectionDescriptions}
      latestPost={latestPost}
      otherPosts={otherPosts}
    />
  );
};

export default SectionPage;
