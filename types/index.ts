export type Photo = {
  id: string;
  title: string;

  publicId: string;
  assetId?: string;

  width: number;
  height: number;

  alt: string;
  caption?: string;

  gallery: string;
  blurDataURL?: string;
};

export type Gallery = {
  slug: string;
  title: string;
  description?: string;
  coverId: string;
  count: number;
  featured?: boolean;
  order?: number;
};
