import React from 'react';
import '@/styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Image Section */}
        <div className="about-image">
          <img src="/_images/Me.jpg" alt="Luca Nik" />
        </div>

        {/* Description Section */}
        <div className="about-description">
          <h1>About Me</h1>
          <p>
            Hello! I'm Luca, a passionate developer, thinker, and creator. I enjoy solving 
            complex problems and sharing my experiences through blogs and projects. 
            Explore this space to know more about my journey!
          </p>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="social-links">
        <div className="github-social-link">
          <a href="https://github.com/luca-nik" target="_blank" rel="noopener noreferrer">
            <img src="/_images/github-thumbnail.png" alt="GitHub" />
          </a>
        </div>
        <div className="linkedin-social-link">
          <a href="https://www.linkedin.com/in/luca-nicoli/" target="_blank" rel="noopener noreferrer">
            <img src="/_images/linkedin-thumbnail.png" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
