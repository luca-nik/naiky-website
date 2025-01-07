// app/layout.tsx
import { ReactNode } from 'react';
import '@/styles/GlobalStyles.css';
import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Naiky</title>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="global-wrapper">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
