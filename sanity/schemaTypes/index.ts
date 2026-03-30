import { type SchemaTypeDefinition } from 'sanity';
import { photoType } from './photo';
import { galleryType } from './gallery';

export const schemaTypes: SchemaTypeDefinition[] = [galleryType, photoType];
