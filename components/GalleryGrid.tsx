import Image from 'next/image';
import { getPhotos } from '@/lib/photos';

export default async function GalleryGrid({ gallery }: { gallery?: string }) {
  const photos = await getPhotos(gallery);
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {photos.map((photo) => (
        <div key={photo.id} className="overflow-hidden rounded-xl">
          <Image
            src={photo.publicId}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder={photo.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={photo.blurDataURL}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
