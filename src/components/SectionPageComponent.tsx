import LatestPost from '@/components/LatestPost';
import OtherPosts from '@/components/OtherPosts';
import { SectionPageComponentProps } from '@/types/sectionprops';
import '@/styles/components/SectionPage.css'


const SectionPage = ({ 
  section, 
  sectionTitles, 
  sectionDescriptions, 
  latestPost, 
  otherPosts 
}: SectionPageComponentProps) => {
  return (
    <div className="section-page">
      <div className="section-page-description">
        <h2 className="section-page-description-title">{sectionTitles[section]}</h2>
        <p className="section-page-description-text">{sectionDescriptions[section]}</p>
      </div>

      {latestPost && <LatestPost post={{...latestPost, section}}/>}

      <OtherPosts posts={otherPosts} section={section} />
    </div>
  );
};

export default SectionPage;
