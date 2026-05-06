export const photosQuery = `
  *[_type == "photo"] | order(_createdAt desc) {
    "id": _id,
    title,
    publicId,
    width,
    height,
    alt,
    caption,
    "gallery": gallery->slug.current
  }
`;

export const galleriesQuery = `
  *[_type == "gallery"] | order(title asc) {
    "slug": slug.current,
    title,
    description,
    coverId,
    "count": count(*[_type == "photo" && references(^._id)])
  }
`;
