export type Photo = {
  id: string;
  publicId: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  gallery: string;
  blurDataURL?: string;
};
