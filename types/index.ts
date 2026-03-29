export type Photo = {
  id: string;

  // Cloudinary
  publicId: string; // e.g. "portfolio/landscape-1"

  // Optional: future Sanity linkage
  assetId?: string; // Sanity asset _id (optional for now)

  width: number;
  height: number;

  alt: string;
  caption?: string;

  gallery: string; // slug

  // UX
  blurDataURL?: string;
};

export type Gallery = {
  slug: string;
  title: string;
  description?: string;

  coverId: string; // Cloudinary publicId (keep consistent)

  count: number;
};
