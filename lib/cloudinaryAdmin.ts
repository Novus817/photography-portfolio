import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function listByFolder(folder: string) {
  const res = await cloudinary.search
    .expression(`folder:${folder}`)
    .with_field('context')
    .max_results(50)
    .execute();

  return res.resources.map((r: any) => ({
    id: r.asset_id,
    publicId: r.public_id,
    width: r.width,
    height: r.height,
    alt: r.context?.alt || r.public_id,
    caption: r.context?.caption,
    gallery: folder.split('/').pop() ?? 'default',
  }));
}
