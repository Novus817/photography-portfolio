import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import Lightbox from '@/components/Lightbox';
import { getGallery, getPhotos } from '@/lib/photos';

type Props = {
  params: Promise<{ slug: string }>;
};

const siteName = 'Anthony Marrello';
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function getCloudinaryOgImage(publicId?: string) {
  if (!cloudName || !publicId) return undefined;

  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_1200,h_630,q_auto,f_auto/${publicId}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await getGallery(slug);

  if (!gallery) {
    return {
      title: 'Gallery Not Found',
    };
  }

  const title = `${gallery.title} Photography | ${siteName}`;
  const description =
    gallery.description ??
    `View the ${gallery.title} photography gallery by ${siteName}.`;

  const imageUrl = getCloudinaryOgImage(gallery.coverId);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: gallery.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

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
