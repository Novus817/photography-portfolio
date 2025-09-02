export type Photo = {
  id: string;
  publicId: string; // Cloudinary public_id path e.g. "portfolio/landscape-1"
  width: number;
  height: number;
  alt: string;
  caption?: string;
  gallery: string; // slug
  blurDataURL?: string;
};

export type Gallery = {
  slug: string;
  title: string;
  description?: string;
  coverId: string; // Photo.publicId
  count: number;
};
