import Link from 'next/link';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Anthony Paul Marrello Jr.
        </Link>

        <nav className="flex gap-6 text-sm text-[var(--color-mute)]">
          <Link href="/galleries" className="transition hover:text-white">
            Galleries
          </Link>
        </nav>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="mt-16 border-t border-white/10 pt-6 text-center text-sm text-[var(--color-mute)]">
        © {new Date().getFullYear()} Anthony Paul Marrello Jr.
      </footer>
    </div>
  );
}
