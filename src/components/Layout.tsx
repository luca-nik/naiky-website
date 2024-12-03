import React, { ReactNode } from 'react';
import '@/styles/GlobalStyles.css'; // Import global styles
import Navbar from '@/components/Navbar';

// Define the type for props. We are expecting `children` to be React nodes.
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="global-wrapper">
      <Navbar /> {/* Add Navbar here */}
      <main>{children}</main> {/* Render child components */}
    </div>
  );
};

export default Layout;
