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
    }),
    defineField({
      name: 'publicId',
      title: 'Cloudinary Public ID',
      type: 'string',
      description: 'Example: portfolio/landscape-1',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publicId',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled photo',
        subtitle,
      };
    },
  },
});
