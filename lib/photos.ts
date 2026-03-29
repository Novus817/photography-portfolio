import type { Gallery, Photo } from '@/types';

const PHOTOS: Photo[] = [
  {
    id: '1',
    publicId: 'portfolio/landscape-1',
    width: 3000,
    height: 2000,
    alt: 'Sitting in front of a fire during a July night',
    gallery: 'landscapes',
    caption: 'Summer night in front of a fire',
  },
  {
    id: '2',
    publicId: 'portfolio/landscape-2',
    width: 3000,
    height: 4000,
    alt: 'Night image with milky way and stars over a tree',
    gallery: 'landscapes',
    caption: 'Summer night under the stars',
  },
  {
    id: '3',
    publicId: 'portfolio/milky-way-1',
    width: 3000,
    height: 4000,
    alt: 'Summer night staring at the Milky Way Galaxy',
    gallery: 'landscapes',
    caption: 'Summer night under the Milky Way',
  },
];

const GALLERIES: Gallery[] = [
  {
    slug: 'landscapes',
    title: 'Landscapes',
    coverId: 'portfolio/landscape-1',
    count: PHOTOS.filter((photo) => photo.gallery === 'landscapes').length,
  },
  {
    slug: 'portraits',
    title: 'Portraits',
    coverId: 'portfolio/landscape-2',
    count: PHOTOS.filter((photo) => photo.gallery === 'portraits').length,
  },
];

export async function getGalleries(): Promise<Gallery[]> {
  return GALLERIES;
}

export async function getGallery(slug: string): Promise<Gallery | null> {
  return GALLERIES.find((gallery) => gallery.slug === slug) ?? null;
}

export async function getPhotos(gallery?: string): Promise<Photo[]> {
  if (!gallery) return PHOTOS;
  return PHOTOS.filter((photo) => photo.gallery === gallery);
}
