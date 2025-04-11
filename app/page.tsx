import Gallery from './components/Gallery';

type Photo = {
  public_id: string;
  width: number;
  height: number;
};

// Fetch images server-side
async function getCloudinaryImages(): Promise<Photo[]> {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?tags=landscapes&max_results=5`,
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        )}`,
      },
    },
  );
  if (!res.ok) throw new Error('Failed to fetch images');
  const data = await res.json();
  return data.resources;
}

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default async function Page() {
  const photos = await getCloudinaryImages();
  return <Gallery photos={photos} />;
}

export const revalidate = 3600;
