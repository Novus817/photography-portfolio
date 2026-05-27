import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Homepage'),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'homePage',
      ),
    ]);
