'use client';

import Image, { type ImageProps } from 'next/image';
import cloudinaryLoader from '@/lib/cloudinaryLoader';

// Accept normal Image props; do NOT expose the loader prop upstream.
type Props = Omit<ImageProps, 'loader'>;

export default function CloudinaryImage(props: Props) {
  return <Image {...props} loader={cloudinaryLoader} />;
}
