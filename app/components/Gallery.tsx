'use client';
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

type Photo = {
  public_id: string;
  width: number;
  height: number;
};

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Landscape Photography
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, i) => (
            <div
              key={photo.public_id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => setIndex(i)}
            >
              <CldImage
                src={photo.public_id}
                width={1200}
                height={800}
                alt={`Landscape photo ${photo.public_id.split('/').pop()}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                crop="fill"
                quality={80}
                className="w-full h-64 object-cover group-hover:scale-105 group-hover:brightness-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={photos.map((photo) => ({
            src: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_1920/${photo.public_id}`,
            alt: photo.public_id.split('/').pop(),
          }))}
        />
      </div>
    </div>
  );
}
