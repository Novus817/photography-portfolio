import { Photo, Gallery } from '@/types';

const PHOTOS: Photo[] = [
  {
    id: '1',
    publicId: 'portfolio/landscape-1',
    width: 3000,
    height: 2000,
    alt: 'Sunset on Panther Mountain',
    gallery: 'landscapes',
    caption: 'Blue hour on Panther Mountain',
  },
  {
    id: '2',
    publicId: 'portfolio/portrait-1',
    width: 3000,
    height: 4000,
    alt: 'Portrait in window light',
    gallery: 'portraits',
  },
];

const GALLERIES: Gallery[] = [
  {
    slug: 'landscapes',
    title: 'Landscapes',
    coverId: 'portfolio/landscape-1',
    count: 12,
  },
  {
    slug: 'portraits',
    title: 'Portraits',
    coverId: 'portfolio/portrait-1',
    count: 18,
  },
];

export async function getGalleries(): Promise<Gallery[]> {
  return GALLERIES;
}

export async function getGallery(slug: string): Promise<Gallery | null> {
  return GALLERIES.find((g) => g.slug === slug) ?? null;
}

export async function getPhotos(gallery?: string): Promise<Photo[]> {
  return gallery ? PHOTOS.filter((p) => p.gallery === gallery) : PHOTOS;
}
