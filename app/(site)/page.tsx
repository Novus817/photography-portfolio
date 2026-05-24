import GalleryGrid from '@/components/GalleryGrid';
import Lightbox from '@/components/Lightbox';
import { getGalleries, getPhotos } from '@/lib/photos';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

export default async function HomePage() {
  const photos = await getPhotos();
  const galleries = await getGalleries();

  return (
    <main className="space-y-12">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-mute)]">
          Photography Portfolio
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Selected photography across landscapes, details, and visual stories.
        </h1>
        <p className="max-w-2xl text-[var(--color-mute)]">
          A curated collection of images organized by gallery.
        </p>
      </section>

      {galleries.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Browse Galleries</h2>
              <p className="text-sm text-[var(--color-mute)]">
                Explore photos by category.
              </p>
            </div>

            <Link
              href="/galleries"
              className="text-sm text-[var(--color-mute)] hover:text-white"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {galleries.map((gallery) => (
              <Link
                key={gallery.slug}
                href={`/galleries/${gallery.slug}`}
                className="group overflow-hidden rounded-[var(--radius-xl)]"
              >
                <CldImage
                  src={gallery.coverId}
                  alt={gallery.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  crop="fill"
                  gravity="auto"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />

                <div className="pt-3">
                  <h3 className="font-semibold">{gallery.title}</h3>

                  {gallery.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-[var(--color-mute)]">
                      {gallery.description}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-[var(--color-mute)]">
                    {gallery.count} photo{gallery.count === 1 ? '' : 's'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Selected Work</h2>
          <p className="text-sm text-[var(--color-mute)]">
            Recent photos from all galleries.
          </p>
        </div>

        <GalleryGrid />
      </section>

      <Lightbox items={photos} />
    </main>
  );
}
