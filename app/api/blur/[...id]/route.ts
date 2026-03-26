import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string[] } }) {
  const publicId = params.id.join('/'); // supports nested folders
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud)
    return NextResponse.json({ error: 'Missing cloud name' }, { status: 500 });

  // Tiny transform: width=24, low quality, auto format
  const url = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_30,w_24/${publicId}`;

  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  const base64 = `data:image/jpeg;base64,${buf.toString('base64')}`;

  return NextResponse.json({ blurDataURL: base64 });
}
