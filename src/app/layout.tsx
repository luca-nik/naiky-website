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
        <title>Naiky.xyz</title>

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Naiky Blog" />
        <meta
          property="og:description"
          content="A personal blog to share experiences and thoughts."
        />
        <meta property="og:url" content="https://naiky-blog.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://naiky-blog.vercel.app/_images/luca-nik.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Naiky Blog Preview Image" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Naiky's Personale Blog" />
        <meta
          name="twitter:description"
          content="A personal blog to share experiences and thoughts."
        />
        <meta
          name="twitter:image"
          content="https://naiky-blog.vercel.app/_images/luca-nik.jpg"
        />
      </head>
      <body className="global-wrapper">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
