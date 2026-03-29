import { getPhotos } from '@/lib/photos';
import { cn } from '@/utils/cn';
import { CldImage } from 'next-cloudinary';

export default async function GalleryGrid({ gallery }: { gallery?: string }) {
  const photos = await getPhotos(gallery);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {photos.map((photo) => (
        <a
          key={photo.id}
          href={`?photo=${encodeURIComponent(photo.publicId)}`}
          className={cn(
            'group relative block overflow-hidden rounded-[var(--radius-xl)]',
            'focus:outline-none focus:ring-2 focus:ring-white/70',
          )}
        >
          <CldImage
            src={photo.publicId}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
            crop="fill"
            gravity="auto"
            className={cn(
              'h-auto w-full object-cover transition-transform duration-300',
              'group-hover:scale-[1.03]',
            )}
          />

          {photo.caption && (
            <span
              className={cn(
                'pointer-events-none absolute inset-x-0 bottom-0 bg-black/40',
                'p-2 text-sm opacity-0 backdrop-blur-sm transition-opacity',
                'group-hover:opacity-100',
              )}
            >
              {photo.caption}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
