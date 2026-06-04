import { getPhotos } from '@/lib/photos';
import { cn } from '@/utils/cn';
import CloudinaryImage from '@/components/CloudinaryImage';

export default async function GalleryGrid({ gallery }: { gallery?: string }) {
  const photos = await getPhotos(gallery);

  if (!photos.length) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-white/10 p-6 text-center">
        <p className="text-sm text-[var(--color-mute)]">
          No photos found yet. Add photo documents in Sanity Studio.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <a
          key={photo.id}
          href={`?photo=${encodeURIComponent(photo.publicId)}`}
          className={cn(
            'group relative block overflow-hidden rounded-[var(--radius-xl)] bg-white/[0.03]',
            'ring-1 ring-white/10 transition duration-300',
            'hover:-translate-y-1 hover:ring-white/25',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
          )}
        >
          <CloudinaryImage
            src={photo.publicId}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            crop="fill"
            gravity="auto"
            className={cn(
              'aspect-[4/3] w-full object-cover transition duration-500',
              'group-hover:scale-[1.04]',
            )}
          />

          <div
            className={cn(
              'pointer-events-none absolute inset-x-0 bottom-0',
              'bg-gradient-to-t from-black/80 via-black/35 to-transparent',
              'px-4 pb-4 pt-12 opacity-0 transition-opacity duration-300',
              'group-hover:opacity-100 group-focus-visible:opacity-100',
            )}
          >
            <p className="text-sm font-medium text-white">
              {photo.caption || photo.alt}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
