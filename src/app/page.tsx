import React from 'react';
import Typewriter from '@/components/Typewriter';
import Section from '@/components/Section'; // Adjust path accordingly
import Link from 'next/link';  // Import Link component
import '@/styles/HomePage.css';

// This is a Server Component by default in the App Router
const HomePage = async () => {
  // Fetch video data on the server side
  const videoData = {
    web3Video: "/_videos/crypto.mp4",
    scienceVideo: "/_videos/onde-canva.mp4",
    outdoorVideo: "/_videos/VID_20240907_155207554.mp4",
    thoughtsVideo: "/_videos/costiera.mp4",
  };

  return (
    <div className="homepage">
      {/* Profile Section */}
      <Link 
        href="/about"  // Use Link instead of an anchor tag
        className="profile-section-link"
      >
        <div className="profile-section">
          <div className="interactive-profile-section">
            <img src="/_images/luca-nik.jpeg" alt="Profile Icon" className="profile-icon" />
            <div className="profile-text">
              <h1 className="name-title">Naiky</h1>
              <p className="description">Hey, here it&#39;s me</p>
            </div>
          </div>
          
          <div className="typewriter-container">
            <Typewriter text="This is my place where I share experiences and thoughts." speed={50} />
          </div>
        </div>
      </Link>

      {/* Sections */}
      <Section href="/web3" videoSrc={videoData.web3Video} title="Web3 & Tech" />
      <Section href="/science" videoSrc={videoData.scienceVideo} title="Science" />
      <Section href="/outdoor" videoSrc={videoData.outdoorVideo} title="Outdoor" />
      <Section href="/thoughts" videoSrc={videoData.thoughtsVideo} title="Thoughts" />
    </div>
  );
};

export default HomePage;
