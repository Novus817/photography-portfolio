import { getGalleries } from '@/lib/photos';
import CloudinaryImage from '@/components/CloudinaryImage';
import Link from 'next/link';

export default async function GalleriesPage() {
  const galleries = await getGalleries();

  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">Galleries</h1>
        <p className="text-[var(--color-mute)]">
          Browse photography collections by category.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {galleries.map((gallery) => (
          <Link
            key={gallery.slug}
            href={`/galleries/${gallery.slug}`}
            className="group block overflow-hidden rounded-[var(--radius-xl)]"
          >
            <CloudinaryImage
              src={gallery.coverId}
              alt={gallery.title}
              width={1600}
              height={1000}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
              crop="fill"
              gravity="auto"
              className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />

            <div className="p-3">
              <h2 className="text-lg font-medium">{gallery.title}</h2>

              {gallery.description && (
                <p className="mt-1 text-sm text-[var(--color-mute)]">
                  {gallery.description}
                </p>
              )}

              <p className="mt-1 text-sm text-[var(--color-mute)]">
                {gallery.count} photo{gallery.count === 1 ? '' : 's'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
