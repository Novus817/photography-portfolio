import Image from 'next/image';
import { getGalleries } from '@/lib/photos';

export default async function GalleriesPage() {
  const galleries = await getGalleries();
  return (
    <main className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {galleries.map((g) => (
        <a
          key={g.slug}
          href={`/galleries/${g.slug}`}
          className="block overflow-hidden rounded-[var(--radius-xl)]"
        >
          <Image
            src={g.coverId}
            alt={g.title}
            width={1600}
            height={1000}
            sizes="(max-width:1280px) 33vw, 25vw"
            className="h-auto w-full object-cover"
          />
          <div className="p-3">
            <h2 className="text-lg font-medium">{g.title}</h2>
            <p className="text-sm text-[var(--color-mute)]">{g.count} photos</p>
          </div>
        </a>
      ))}
    </main>
  );
}
