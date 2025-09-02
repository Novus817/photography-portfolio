// app/(site)/page.tsx
import GalleryGrid from '@/components/GalleryGrid';
import Lightbox from '@/components/Lightbox';

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-semibold">Selected Work</h1>
        <p className="text-mute max-w-2xl">
          A curated selection from recent portraits and landscapes.
        </p>
      </section>

      {/* Server grid + client lightbox */}
      {/* sizes tuned for home hero grid */}
      {/* @ts-expect-error Async Server Component */}
      <GalleryGrid sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" />
      {/* <Lightbox /> */}
    </main>
  );
}
