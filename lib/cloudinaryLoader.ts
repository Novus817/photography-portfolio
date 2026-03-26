type LoaderProps = { src: string; width: number; quality?: number };

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function cloudinaryLoader({ src, width, quality }: LoaderProps) {
  const q = quality ?? 75;
  if (!CLOUD) throw new Error('CLOUDINARY_CLOUD_NAME is missing');
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_${q},w_${width}/${src}`;
}
