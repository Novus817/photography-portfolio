'use client';
import { CldImage } from 'next-cloudinary';

type Photo = {
  public_id: string;
  width: number;
  height: number;
};

export default function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {photos.map((photo) => (
        <CldImage
          key={photo.public_id}
          src={photo.public_id}
          width={1200}
          height={800}
          alt={`Landscape photo ${photo.public_id.split('/').pop()}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          crop="fill"
          quality={80}
        />
      ))}
    </div>
  );
}
