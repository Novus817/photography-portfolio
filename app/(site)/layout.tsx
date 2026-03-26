export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <a href="/" className="text-xl font-semibold">
          Anthony Paul Marrello Jr.
        </a>
        <nav className="flex gap-6 text-sm text-[var(--color-mute)]">
          <a href="/galleries">Galleries</a>
        </nav>
      </header>

      {children}

      <footer className="mt-12 text-center text-sm text-[var(--color-mute)]">
        © {new Date().getFullYear()} Anthony Paul Marrello Jr.
      </footer>
    </>
  );
}
