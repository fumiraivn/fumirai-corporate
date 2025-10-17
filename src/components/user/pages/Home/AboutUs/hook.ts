import { useMemo } from 'react';

import { getLocalizedTextFromArray } from '@/hooks';
import { BlockContent, EBlockId, EFieldId, ELanguage } from '@/types';

export function useAboutUsData(content: BlockContent[], locale: ELanguage) {
  return useMemo(() => {
    const aboutUsBlock = content.find((block) => block.block_id === EBlockId.ABOUT_US);

    if (!aboutUsBlock) {
      return {
        meta: {
          title: '',
          subtitle: '',
          scroll_id: EBlockId.ABOUT_US,
        },
        data: {
          title: '',
          items: [],
        },
      };
    }

    // Get title and subtitle from block
    const title = getLocalizedTextFromArray(aboutUsBlock.title || [], locale);
    const subtitle = getLocalizedTextFromArray(aboutUsBlock.description || [], locale);

    // Extract HTML content items
    const htmlItems =
      aboutUsBlock.content?.filter((item) => item.fieldId === EFieldId.HTML_RAW) || [];

    type HtmlRaw = { fieldId: EFieldId.HTML_RAW; language?: string[]; content?: string };
    const items = htmlItems
      .map((item) => {
        if (item.fieldId === EFieldId.HTML_RAW) {
          const { language, content } = item as HtmlRaw;
          const matchesLocale = (language || []).includes(locale);
          const isFallback = !language || language.length === 0;
          if (matchesLocale || isFallback) return content || '';
        }
        return '';
      })
      .filter((html) => html.length > 0);

    return {
      meta: {
        title,
        subtitle,
        scroll_id: EBlockId.ABOUT_US,
      },
      data: {
        title,
        items,
      },
    };
  }, [content, locale]);
}
