import { notFound } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import Lightbox from '@/components/Lightbox';
import { getGallery, getPhotos } from '@/lib/photos';

export default async function GalleryPage({ params }: { params: { slug: string } }) {
  const gallery = await getGallery(params.slug);
  if (!gallery) notFound();
  const photos = await getPhotos(params.slug);

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">{gallery.title}</h1>
      <GalleryGrid gallery={gallery.slug} />
      <Lightbox items={photos} />
    </main>
  );
}
