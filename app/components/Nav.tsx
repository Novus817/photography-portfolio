import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="container mx-auto px-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Anthony Marrello</h1>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
