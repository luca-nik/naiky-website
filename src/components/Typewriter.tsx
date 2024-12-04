'use client';
import React, { useEffect, useState } from 'react';  // Make sure imports are at the top
import '@/styles/components/Typewriter.css';

// Define the props type for the component
interface TypewriterProps {
  text: string;   // The text to be typed out
  speed: number;  // Speed at which the text is typed (in milliseconds)
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState<string>(''); // State to hold the typed text

  useEffect(() => {
    let index = 0; // Start at the first character
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index)); // Append the next character
        index++; // Move to the next character
      } else {
        clearInterval(intervalId); // Stop when done
      }
    }, speed);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [text, speed]); // Re-run the effect if text or speed changes

  return <span>{displayedText}</span>; // Render the text that's being typed out
};

export default Typewriter;