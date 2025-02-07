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
            Hello! I&#39;m Luca, a passionate developer, thinker, creator, and alpinist. I enjoy solving 
            complex problems and sharing my experiences through blogs and projects. 
            Explore this space to know more about my journey!
          </p>
          <p>
            I&#39;m a Physics Engineer and PhD candidate in Theoretical & Computational Chemistry at Scuola Normale Superiore. My journey has taken me from frying molecules with ultrafast lasers to watching CPUs grinding Quantum Mechanical simulations. 
            Now, I&#39;m diving into the world of blockchain technology, eager to build Web3 applications.
          </p>
          <p>
            Previously, I worked as an MEV Scientist Engineer at <a href="https://www.urani.trade/" target="_blank" rel="noopener noreferrer">Urani.trade</a>, specializing in toxic MEV reduction on Solana through <a href="https://github.com/urani-trade/solana-mev-agent-py" target="_blank" rel="noopener noreferrer">intent-matching and optimal routing algorithms</a>.
          </p>
        </div>

        {/* Divider */}
        <hr />

        {/* Education Section */}
        <div className="about-education">
          <h2>Education</h2>
          <p>PhD in Theoretical & Computational Chemistry | MS & BS in Engineering Physics</p>
        </div>

        {/* Divider */}
        <hr />

        {/* Achievements Section */}
        <div className="about-achievements">
          <h2>Achievements</h2>
          <p><a href="https://scholar.google.com/citations?user=SsTwaqEAAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer">8 peer-reviewed journal articles</a>, 3 international conference presentations, <a href="https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2024033744" target="_blank" rel="noopener noreferrer">1 International patent</a>.</p>
          <p>Founder of <a href="https://sites.google.com/view/matwins/home" target="_blank" rel="noopener noreferrer">MatTwins</a>, an initiative leveraging surrogate Machine Learning models to reduce the computational complexity of the discovery of novel materials.</p>
        </div>

        {/* Divider */}
        <hr />

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
    </div>
  );
};

export default AboutPage;
