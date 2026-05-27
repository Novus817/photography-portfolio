import { defineField, defineType } from 'sanity';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: 'galleriesTitle',
      title: 'Galleries section title',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'galleriesDescription',
      title: 'Galleries section description',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'selectedWorkTitle',
      title: 'Selected work title',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'selectedWorkDescription',
      title: 'Selected work description',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
  ],
});
