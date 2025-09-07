import GalleryGrid from '@/components/GalleryGrid';
import Lightbox from '@/components/Lightbox';
import { getPhotos } from '@/lib/photos';

export default async function HomePage() {
  const photos = await getPhotos();
  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">Selected Work</h1>
        <p className="text-[var(--color-mute)]">
          A curated selection from recent shoots.
        </p>
      </section>

      <GalleryGrid />
      <Lightbox items={photos} />
    </main>
  );
}
