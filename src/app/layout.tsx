// app/layout.tsx
import { ReactNode } from 'react';
import '@/styles/GlobalStyles.css';
import Navbar from '@/components/Navbar';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Naiky.xyz',
  description: "A personal blog to share experiences and thoughts.",
  openGraph: {
    title: "Naiky's Personal Blog",
    description: "A personal blog to share experiences and thoughts.",
    url: `${baseUrl}`,
    siteName: "Naiky's Personal Blog",
    images: [
      {
        url: `${baseUrl}/_images/luca-nik.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Naiky Blog Preview Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Naiky's Personal Blog",
    description: "A personal blog to share experiences and thoughts.",
    images: [`${baseUrl}/_images/luca-nik.jpeg`],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="global-wrapper">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
