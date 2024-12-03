// utils/parseFrontMatter.ts

interface FrontMatter {
  title: string;
  coverImage: string;
  excerpt: string;
  date: string;
  content: string;
}

export const parseFrontMatter = (text: string): FrontMatter => {
  const frontMatterMatch = text.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontMatterMatch) {
    return {
      title: 'Untitled',
      coverImage: '',
      excerpt: '',
      date: '',
      content: text
    };
  }

  const frontMatter = frontMatterMatch[1];
  const content = text.slice(frontMatterMatch[0].length);
  const metadata: { [key: string]: string } = {};

  frontMatter.split('\n').forEach((line) => {
    const [key, ...value] = line.split(': ');
    
    if (key && value) {
      metadata[key.trim()] = value.join(': ').trim();
    }
  });

  return {
    title: metadata.title || 'Untitled',
    coverImage: metadata.coverImage ? metadata.coverImage.replace(/['"]+/g, '') : '',
    excerpt: metadata.excerpt || '',
    date: metadata.date || '',
    content
  };
};
