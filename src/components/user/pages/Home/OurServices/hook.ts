import { useMemo } from 'react';

import { getLocalizedTextFromArray } from '@/hooks';
import {
  BlockContent,
  EBlockId,
  EContentFieldKey,
  EFieldId,
  ELanguage,
  GroupContent,
  GroupItem,
  ImageContent,
  TextContent,
  TextareaContent,
} from '@/types';

export type OurServiceItem = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type OurServicesData = {
  meta: { title?: string; subtitle?: string; scroll_id?: string };
  data: OurServiceItem[];
};

export function useOurServicesData(content: BlockContent[], locale: ELanguage): OurServicesData {
  return useMemo(() => {
    const ourServicesBlock = content.find((block) => block.block_id === EBlockId.OUR_SERVICES);

    if (!ourServicesBlock) {
      return {
        meta: {
          title: '',
          subtitle: '',
          scroll_id: EBlockId.OUR_SERVICES,
        },
        data: [],
      };
    }

    // Get title and subtitle from block
    const title = getLocalizedTextFromArray(ourServicesBlock.title || [], locale);
    const subtitle = getLocalizedTextFromArray(ourServicesBlock.description || [], locale);

    // Extract services from group content
    const groupContent = ourServicesBlock.content?.find(
      (item) => item.fieldId === EFieldId.GROUP,
    ) as GroupContent | undefined;
    const services: OurServiceItem[] = [];

    if (groupContent?.items?.length) {
      const items = groupContent.items as GroupItem[];

      items.forEach((item, index) => {
        if (item.fieldId === EFieldId.GROUP_ITEM && item.content) {
          const serviceItem: OurServiceItem = {
            id: `service-${index}`,
            title: '',
            description: '',
            icon: '',
          };

          // Extract data from group item content
          item.content.forEach((contentItem) => {
            if (contentItem.fieldId === EFieldId.IMAGE_CUSTOM) {
              const image = (contentItem as ImageContent).image;
              serviceItem.icon = image?.url || '';
            } else if (contentItem.fieldId === EFieldId.TEXT) {
              const text = contentItem as TextContent;
              const textType = text[EContentFieldKey.TEXT_TYPE]?.[0];
              if (textType === 'main') {
                serviceItem.title = getLocalizedTextFromArray([text], locale);
              } else if (textType === 'sub') {
                serviceItem.description = getLocalizedTextFromArray([text], locale);
              }
            } else if (contentItem.fieldId === EFieldId.TEXTAREA) {
              const textarea = contentItem as TextareaContent;
              serviceItem.description = getLocalizedTextFromArray([textarea], locale);
            }
          });

          if (serviceItem.title || serviceItem.description || serviceItem.icon) {
            services.push(serviceItem);
          }
        }
      });
    }

    return {
      meta: {
        title,
        subtitle,
        scroll_id: EBlockId.OUR_SERVICES,
      },
      data: services,
    };
  }, [content, locale]);
}
