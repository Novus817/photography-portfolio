'use client';

import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Photo } from '@/types';
import { cn } from '@/utils/cn';
import { CldImage } from 'next-cloudinary';

type Item = Pick<
  Photo,
  'id' | 'publicId' | 'width' | 'height' | 'alt' | 'caption'
>;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function Lightbox({
  items,
  paramKey = 'photo',
}: {
  items: Item[];
  paramKey?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const openId = searchParams.get(paramKey) ?? null;

  const indexById = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item, index) => map.set(item.publicId, index));
    return map;
  }, [items]);

  const index =
    openId && indexById.has(openId) ? (indexById.get(openId) as number) : -1;

  const isOpen = index >= 0;

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramKey);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : '?', { scroll: false });
  }, [router, searchParams, paramKey]);

  const go = useCallback(
    (next: number) => {
      if (!items.length || !isOpen) return;

      const targetIndex = mod(next, items.length);
      const nextId = items[targetIndex].publicId;

      const params = new URLSearchParams(searchParams.toString());
      params.set(paramKey, nextId);

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [items, isOpen, searchParams, router, paramKey],
  );

  const goNext = useCallback(() => go(index + 1), [go, index]);
  const goPrev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!isOpen) return;

      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowRight') goNext();
      else if (event.key === 'ArrowLeft') goPrev();
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, goNext, goPrev]);

  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (event: React.TouchEvent) => {
    if (!isOpen) return;
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (!isOpen || touchStartX.current == null) return;

    const dx = event.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;

    if (dx <= -threshold) goNext();
    else if (dx >= threshold) goPrev();

    touchStartX.current = null;
  };

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const current = items[index];
  const safeWidth = Number.isFinite(current?.width) ? current.width : 2400;
  const safeHeight = Number.isFinite(current?.height) ? current.height : 1600;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={close}
    >
      <div
        className="absolute inset-0 grid place-items-center p-4"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <figure className="relative w-full max-w-6xl max-h-[90vh]">
          <CldImage
            src={current.publicId}
            alt={current.alt}
            width={safeWidth}
            height={safeHeight}
            sizes="90vw"
            priority
            crop="fit"
            className="h-auto max-h-[90vh] w-full rounded-[var(--radius-xl)] object-contain shadow-2xl"
          />

          {(current.caption || current.alt) && (
            <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 rounded-b-[var(--radius-xl)] bg-black/50 px-4 py-3 text-sm">
              {current.caption ?? current.alt}
            </figcaption>
          )}

          <button
            ref={closeBtnRef}
            onClick={close}
            className={cn(
              'absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-sm',
              'outline-none focus-visible:ring-2 focus-visible:ring-white/70 hover:cursor-pointer',
            )}
            aria-label="Close lightbox"
          >
            Close
          </button>

          <button
            onClick={goPrev}
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2',
              'outline-none focus-visible:ring-2 focus-visible:ring-white/70 hover:cursor-pointer',
            )}
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            onClick={goNext}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2',
              'outline-none focus-visible:ring-2 focus-visible:ring-white/70 hover:cursor-pointer',
            )}
            aria-label="Next image"
          >
            →
          </button>
        </figure>
      </div>
    </div>
  );
}
