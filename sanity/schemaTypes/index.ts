import { type SchemaTypeDefinition } from 'sanity';
import { photoType } from './photo';
import { galleryType } from './gallery';
import { homePageType } from './homePage';

export const schemaTypes: SchemaTypeDefinition[] = [
  homePageType,
  galleryType,
  photoType,
];
