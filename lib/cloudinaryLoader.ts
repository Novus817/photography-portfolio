type Props = { src: string; width: number; quality?: number };

export default function cloudinaryLoader({ src, width, quality }: Props) {
  const q = quality ?? 75;
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_${q},w_${width}/${src}`;
}
