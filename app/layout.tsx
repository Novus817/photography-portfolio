import type { Metadata } from 'next';
import Nav from './components/Nav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Photography Portfolio',
  description: 'My portfolio for photos I take',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <header className="bg-black py-4 sticky top-0 z-10">
          <Nav />
        </header>
        <main>{children}</main>
        <footer className="bg-black py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} Anthony Marrello. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
