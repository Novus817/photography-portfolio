import { getPhotos } from '@/lib/photos';
import CloudinaryImage from '@/components/CloudinaryImage';
import { cn } from '@/utils/cn';

export default async function GalleryGrid({ gallery }: { gallery?: string }) {
  const photos = await getPhotos(gallery);
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {photos.map((p) => (
        <a
          key={p.id}
          href={`?photo=${encodeURIComponent(p.publicId)}`}
          className={cn(
            'group relative block overflow-hidden rounded-[var(--radius-xl)]',
            'focus:outline-none focus:ring-2 focus:ring-white/70',
          )}
        >
          <CloudinaryImage
            src={p.publicId}
            alt={p.alt}
            width={p.width}
            height={p.height}
            sizes="(max-width:768px) 100vw, (max-width:1280px) 33vw, 25vw"
            placeholder={p.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={p.blurDataURL}
            className={cn(
              'h-auto w-full object-cover transition-transform duration-300',
              'group-hover:scale-[1.03]',
            )}
          />
          {p.caption && (
            <span
              className={cn(
                'pointer-events-none absolute inset-x-0 bottom-0 bg-black/40',
                'p-2 text-sm opacity-0 backdrop-blur-sm transition-opacity',
                'group-hover:opacity-100',
              )}
            >
              {p.caption}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
