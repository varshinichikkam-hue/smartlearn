import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SmartLearn – Student-to-Student Learning Platform',
  description: 'Discover notes, PDFs, and educational videos shared by fellow students. Learn together and share knowledge.',
  openGraph: {
    title: 'SmartLearn – Student-to-Student Learning Platform',
    description: 'Discover notes, PDFs, and educational videos shared by fellow students. Learn together and share knowledge.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartLearn – Student-to-Student Learning Platform',
    description: 'Discover notes, PDFs, and educational videos shared by fellow students. Learn together and share knowledge.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
