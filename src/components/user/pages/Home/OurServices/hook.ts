import { EHomeSection } from '@/types';

type ImageFull = {
  fieldId?: 'image_full';
  image?: { url?: string; height?: number; width?: number };
  alt?: string;
};
type CardService = {
  fieldId?: 'card_service';
  title?: string;
  description?: string;
  image?: ImageFull[];
};

type HomeContentItem = {
  card_type?: `${EHomeSection}`[];
  fieldId?: 'card';
  scroll_id?: `${EHomeSection}` | string;
  title?: string;
  description?: string;
  cards?: (CardService | Record<string, unknown>)[];
};

export type OurServiceItem = { id: string; title: string; description: string; icon?: string };
export type OurServicesData = {
  meta: { title?: string; subtitle?: string; scroll_id?: string };
  data: OurServiceItem[];
};

export function useOurServicesData(blocks?: unknown[]): OurServicesData {
  const items = (blocks as HomeContentItem[] | undefined) ?? [];
  const block = items.find(
    (c) =>
      c.card_type?.[0] === EHomeSection.OUR_SERVICES || c.scroll_id === EHomeSection.OUR_SERVICES,
  );

  const cards = (block?.cards as (CardService | Record<string, unknown>)[] | undefined) || [];
  const services: OurServiceItem[] = cards
    .filter((c): c is CardService => (c as CardService)?.fieldId === 'card_service')
    .map((c, index) => {
      const icon =
        c?.image && Array.isArray(c.image) && c.image[0]?.image?.url
          ? c.image[0].image.url
          : undefined;
      return {
        id: `service-${index}`,
        title: c?.title || '',
        description: c?.description || '',
        icon,
      };
    })
    .filter((s) => s.title || s.description || s.icon);

  return {
    meta: {
      title: block?.title,
      subtitle: block?.description,
      scroll_id: (block?.scroll_id as string) || EHomeSection.OUR_SERVICES,
    },
    data: services,
  };
}
