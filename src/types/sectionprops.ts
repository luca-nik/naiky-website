import { Post } from '@/types/post';

export type SectionPageComponentProps = {
  section: string;
  sectionTitles: { [key: string]: string };
  sectionDescriptions: { [key: string]: string };
  latestPost: Post | null;
  otherPosts: Post[];
};