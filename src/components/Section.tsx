import React from 'react';
import Link from 'next/link';

interface SectionProps {
  href: string;
  videoSrc: string;
  title: string;
}

const Section: React.FC<SectionProps> = ({ href, videoSrc, title }) => {
  return (
    <div className="section">
      <Link href={href}>
        <div className="section-content">
          <video loop muted autoPlay className="section-video">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="section-description">
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Section;