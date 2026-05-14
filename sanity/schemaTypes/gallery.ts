import { defineField, defineType } from 'sanity';

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Gallery name shown on the site.',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly gallery slug. Example: landscapes',
      options: {
        source: 'title',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description for this gallery.',
      validation: (Rule) => Rule.required().min(20).max(200),
    }),
    defineField({
      name: 'coverId',
      title: 'Cover Cloudinary Public ID',
      type: 'string',
      description:
        'Example: portfolio/landscape-1. Used as the gallery cover image.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      coverId: 'coverId',
    },
    prepare({ title, subtitle, coverId }) {
      return {
        title: title || 'Untitled gallery',
        subtitle: subtitle ? `/${subtitle} • ${coverId}` : coverId,
      };
    },
  },
});
