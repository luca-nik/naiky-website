// app/layout.tsx

import { ReactNode } from 'react';
import '@/styles/GlobalStyles.css';  // Import global styles
import Navbar from '@/components/Navbar';  // Import Navbar component

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Next.js App</title>
      </head>
      <body className="global-wrapper">
        <Navbar /> {/* Navbar component */}
        <main>{children}</main> {/* Render child components here */}
      </body>
    </html>
  );
}
