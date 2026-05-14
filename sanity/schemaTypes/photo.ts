import { defineField, defineType } from 'sanity';

export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Short internal title for this photo.',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'publicId',
      title: 'Cloudinary Public ID',
      type: 'string',
      description:
        'Example: portfolio/landscape-1. Do not include the file extension.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the image for accessibility and SEO.',
      validation: (Rule) => Rule.required().min(10).max(160),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption shown in the gallery/lightbox.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
      description: 'Original image width in pixels.',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      description: 'Original image height in pixels.',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
      description: 'Choose the gallery/category this photo belongs to.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publicId',
      gallery: 'gallery.title',
    },
    prepare({ title, subtitle, gallery }) {
      return {
        title: title || 'Untitled photo',
        subtitle: gallery ? `${gallery} • ${subtitle}` : subtitle,
      };
    },
  },
});
