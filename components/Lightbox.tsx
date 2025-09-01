'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export type LightboxItem = {
  id: string;
  publicId: string; // your Cloudinary/Cloudflare id (same value you pass to <Image src=...>)
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

type Props = {
  items: LightboxItem[]; // full, ordered list of photos on the page
  paramKey?: string; // URL search param name (defaults to 'photo')
};

export default function Lightbox({ items, paramKey = 'photo' }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const openId = sp.get(paramKey);

  // map publicId -> index for O(1) lookup
  const indexById = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((it, i) => m.set(it.publicId, i));
    return m;
  }, [items]);

  const startIndex = openId && indexById.has(openId) ? indexById.get(openId)! : -1;
  const [index, setIndex] = useState(startIndex);

  // keep local index in sync if URL changes externally
  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  // early out: nothing to show
  if (index < 0) return null;

  const close = useCallback(() => {
    // replace ?photo with clean URL (preserve other params)
    const params = new URLSearchParams(sp.toString());
    params.delete(paramKey);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : `?`, { scroll: false });
  }, [router, sp, paramKey]);

  const go = useCallback(
    (next: number) => {
      const to = mod(next, items.length);
      const nextId = items[to].publicId;
      const params = new URLSearchParams(sp.toString());
      params.set(paramKey, nextId);
      router.replace(`?${params.toString()}`, { scroll: false });
      setIndex(to);
    },
    [items, sp, router, paramKey],
  );

  const goNext = useCallback(() => go(index + 1), [go, index]);
  const goPrev = useCallback(() => go(index - 1), [go, index]);

  // keyboard handlers
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, goNext, goPrev]);

  // basic swipe support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx <= -threshold) goNext();
    else if (dx >= threshold) goPrev();
    touchStartX.current = null;
  };

  // focus management: send focus to close button
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, [index]);

  // prefetch neighbors
  const left = items[mod(index - 1, items.length)];
  const right = items[mod(index + 1, items.length)];

  const current = items[index];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={close}
    >
      {/* hidden preloads */}
      <link rel="preload" as="image" href={left ? left.publicId : undefined} />
      <link rel="preload" as="image" href={right ? right.publicId : undefined} />

      <div
        className="absolute inset-0 grid place-items-center p-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <figure className="relative w-full max-w-6xl max-h-[90vh]">
          <Image
            src={current.publicId}
            alt={current.alt}
            width={current.width || 2400}
            height={current.height || 1600}
            sizes="90vw"
            className="h-auto w-full rounded-2xl object-contain shadow-2xl"
            priority
          />
          {(current.caption || current.alt) && (
            <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 rounded-b-2xl bg-black/50 px-4 py-3 text-sm text-white">
              {current.caption ?? current.alt}
            </figcaption>
          )}

          {/* Controls */}
          <button
            ref={closeBtnRef}
            onClick={close}
            className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Close lightbox"
          >
            Close
          </button>

          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Next image"
          >
            →
          </button>
        </figure>
      </div>
    </div>
  );
}
