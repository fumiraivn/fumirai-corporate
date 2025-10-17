import { useMemo } from 'react';

import {
  BlockContent,
  EBlockId,
  ECompanySpecialLabel,
  EFieldId,
  ELanguage,
  ETextFields,
} from '@/types';

type HtmlRawField = {
  fieldId: EFieldId.HTML_RAW;
  language?: string[];
  content?: string;
};

type MapField = {
  fieldId: EFieldId.MAP;
  text?: string;
  value?: string;
};

type TextField = {
  fieldId: EFieldId.TEXT;
  vietnamese_text?: string;
  english_text?: string;
  japanese_text?: string;
  text_type?: string[];
};

type GroupItem = {
  fieldId: EFieldId.GROUP_ITEM;
  content?: Array<HtmlRawField | MapField | TextField>;
};

type Group = {
  fieldId: EFieldId.GROUP;
  items?: GroupItem[];
};

export type OurCompanyData = {
  meta: { scroll_id?: string };
  company: { items: string[]; mapUrl?: string; embedAddress?: string };
  parent: { items: string[]; mapUrl?: string; embedAddress?: string };
  companySubtitle?: string;
  parentSubtitle?: string;
};

export function useAboutCompanyData(content: BlockContent[], locale: ELanguage): OurCompanyData {
  return useMemo(() => {
    const ourCompanyBlock = content.find((block) => block.block_id === EBlockId.OUR_COMPANY);

    if (!ourCompanyBlock) {
      return {
        meta: { scroll_id: EBlockId.OUR_COMPANY },
        company: { items: [] },
        parent: { items: [] },
      };
    }

    const groupContent = ourCompanyBlock.content?.find(
      (item) => item.fieldId === EFieldId.GROUP,
    ) as Group | undefined;
    const companyItems: string[] = [];
    const parentItems: string[] = [];
    let companyMapUrl: string | undefined;
    let companyEmbedAddress: string | undefined;
    let parentMapUrl: string | undefined;
    let parentEmbedAddress: string | undefined;
    let companySubtitleText: string | undefined;
    let parentSubtitleText: string | undefined;

    if (groupContent && 'items' in groupContent) {
      const items = (groupContent.items as GroupItem[]) || [];

      items.forEach((item: GroupItem, index) => {
        if (item.fieldId === EFieldId.GROUP_ITEM && item.content) {
          const rows: string[] = [];

          // Prefer locale-specific html_raw; fallback to empty/undefined language
          const htmlFields = item.content.filter(
            (ci): ci is HtmlRawField => ci.fieldId === EFieldId.HTML_RAW,
          );
          const preferred = htmlFields.find((h) => (h.language || []).includes(locale));
          const fallback = htmlFields.find((h) => !h.language || h.language.length === 0);
          if (preferred?.content) rows.push(preferred.content);
          else if (fallback?.content) rows.push(fallback.content);

          // Capture map fields and group subtitles (first TEXT only)
          item.content.forEach((contentItem) => {
            if ((contentItem as MapField).fieldId === EFieldId.MAP) {
              const map = contentItem as MapField;
              const type = String(map.text || '');
              const value = String(map.value || '');
              if (index === 1) {
                if (type === ECompanySpecialLabel.MAP_URL) companyMapUrl = value;
                if (type === ECompanySpecialLabel.EMBED_ADDRESS) companyEmbedAddress = value;
              } else if (index >= 2) {
                if (type === ECompanySpecialLabel.MAP_URL) parentMapUrl = value;
                if (type === ECompanySpecialLabel.EMBED_ADDRESS) parentEmbedAddress = value;
              }
            } else if ((contentItem as TextField).fieldId === EFieldId.TEXT) {
              const tf = contentItem as TextField;
              const keyMap: Record<string, ETextFields> = {
                vi: ETextFields.VIETNAMESE_TEXT,
                en: ETextFields.ENGLISH_TEXT,
                ja: ETextFields.JAPANESE_TEXT,
              };
              const k = keyMap[String(locale).toLowerCase()];
              const val = (tf as unknown as Record<string, unknown>)[k] as string | undefined;

              if (index === 1) companySubtitleText = val;
              else if (index >= 2) parentSubtitleText = val;
            }
          });

          if (index === 1) companyItems.push(...rows);
          else if (index >= 2) parentItems.push(...rows);
        }
      });
    }

    return {
      meta: { scroll_id: EBlockId.OUR_COMPANY },
      company: { items: companyItems, mapUrl: companyMapUrl, embedAddress: companyEmbedAddress },
      parent: { items: parentItems, mapUrl: parentMapUrl, embedAddress: parentEmbedAddress },
      companySubtitle: companySubtitleText,
      parentSubtitle: parentSubtitleText,
    };
  }, [content, locale]);
}
