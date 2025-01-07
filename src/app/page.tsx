import React from 'react';
import Link from 'next/link';
import Typewriter from '@/components/Typewriter';
import Section from '@/components/Section'; // Adjust path accordingly
import '@/styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="interactive-profile-section">
          <img src="/_images/luca-nik.jpeg" alt="Profile Icon" className="profile-icon" />
          <div className="profile-text">
            <h1 className="name-title">Naiky</h1>
            <p className="description">Hey, here it's me</p>
          </div>
        </div>
        
        <div className="typewriter-container">
          <Typewriter text="Thhis is my place where I share experiences and thoughts." speed={50} />
        </div>
      </div>

      {/* Sections */}
      <Section href="/web3" videoSrc="/_videos/crypto.mp4" title="Web3 & Tech" />
      <Section href="/science" videoSrc="/_videos/onde-canva.mp4" title="Science" />
      <Section href="/outdoor" videoSrc="/_videos/VID_20240907_155207554.mp4" title="Outdoor" />
      <Section href="/thoughts" videoSrc="/_videos/costiera.mp4" title="Thoughts" />
    </div>
  );
};

export default HomePage;
