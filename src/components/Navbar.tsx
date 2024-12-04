// Add the "use client" directive at the top to make this a Client Component
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';  // Use Next.js Link component
import '@/styles/components/Navbar.css'; // Import your styles

const Navbar: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0); // Default value is 0
  const [visible, setVisible] = useState<boolean>(true); // Boolean state to control navbar visibility
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false); // Boolean state to manage dropdown visibility

  // Memoize the handleScroll function with useCallback
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

    setVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window !== 'undefined') {
      // Initialize scroll position on mount
      setPrevScrollPos(window.pageYOffset);

      // Listen to the scroll event
      window.addEventListener('scroll', handleScroll);

      // Cleanup listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]); // Now use handleScroll in the dependency array

  return (
    <nav className="navbar" style={{ top: visible ? '0' : '-60px', transition: 'top 0.3s' }}>
      <div className="navbar-container">
        <ul className="navbar-list">
          {/* Home as Button */}
          <li>
            <button className="nav-link home-button" onClick={() => window.location.href = '/'}>
              Home
            </button>
          </li>
          {/* Dropdown for Stuff */}
          <li className="dropdown">
            <button
              className="dropbtn nav-link"
              onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown visibility
            >
              Blogs
            </button>
            {dropdownVisible && ( // Show dropdown only when dropdownVisible is true
              <ul className="dropdown-menu">
                <li>
                  <Link href="/outdoor" className="dropdown-link" onClick={() => setDropdownVisible(false)}>
                    Outdoor
                    <img src="assets/outdoor-icon.png" alt="Outdoor Icon" className="dropdown-icon" />
                  </Link>
                </li>
                <li>
                  <Link href="/science" className="dropdown-link" onClick={() => setDropdownVisible(false)}>
                    Science
                    <img src="assets/science-icon.png" alt="Science Icon" className="dropdown-icon" />
                  </Link>
                </li>
                <li>
                  <Link href="/web3" className="dropdown-link" onClick={() => setDropdownVisible(false)}>
                    Web3 & Tech
                    <img src="assets/web3-icon.png" alt="Web3 Icon" className="dropdown-icon" />
                  </Link>
                </li>
                <li>
                  <Link href="/thoughts" className="dropdown-link" onClick={() => setDropdownVisible(false)}>
                    Thoughts
                    <img src="assets/thoughts-icon.png" alt="Thoughts Icon" className="dropdown-icon" />
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
