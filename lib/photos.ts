import { Photo } from '@/types/photo';

export async function getPhotos(gallery?: string): Promise<Photo[]> {
  const photos: Photo[] = [
    {
      id: '1',
      publicId: 'portfolio/landscape-1',
      width: 2400,
      height: 1600,
      alt: 'Sunset over mountains',
      gallery: 'landscapes',
      blurDataURL: 'data:image/jpeg;base64,...', // optional
    },
  ];
  return gallery ? photos.filter((p) => p.gallery === gallery) : photos;
}
