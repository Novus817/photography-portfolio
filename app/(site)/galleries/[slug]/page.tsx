import { notFound } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import Lightbox from '@/components/Lightbox';
import { getGallery, getPhotos } from '@/lib/photos';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;

  const gallery = await getGallery(slug);

  if (!gallery) {
    notFound();
  }

  const photos = await getPhotos(slug);

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm text-[var(--color-mute)]">Gallery</p>
        <h1 className="text-3xl font-semibold">{gallery.title}</h1>

        {gallery.description && (
          <p className="text-[var(--color-mute)]">{gallery.description}</p>
        )}
      </section>

      <GalleryGrid gallery={slug} />
      <Lightbox items={photos} />
    </main>
  );
}
