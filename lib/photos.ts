import type { Gallery, Photo } from '@/types';
import { client } from '@/sanity/lib/client';
import { galleriesQuery, photosQuery } from '@/sanity/lib/queries';

const sanityFetchOptions = {
  next: { revalidate: 60 },
};

export async function getPhotos(gallery?: string): Promise<Photo[]> {
  const photos = await client.fetch<Photo[]>(photosQuery, {}, sanityFetchOptions);

  if (!gallery) return photos;
  return photos.filter((photo) => photo.gallery === gallery);
}

export async function getGalleries(): Promise<Gallery[]> {
  return client.fetch<Gallery[]>(galleriesQuery, {}, sanityFetchOptions);
}

export async function getGallery(slug: string): Promise<Gallery | null> {
  const galleries = await getGalleries();
  return galleries.find((gallery) => gallery.slug === slug) ?? null;
}
