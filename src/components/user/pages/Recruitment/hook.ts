import { useMemo } from 'react';

import { BlockContent, EBlockId, ELanguage, ETextFields } from '@/types';

// Enums to avoid hardcoded field ids and text types
enum EFieldId {
  GROUP = 'group',
  GROUP_ITEM = 'group_item',
  TEXT = 'text',
  HTML_RAW = 'html_raw',
}

enum ETextType {
  MAIN = 'main',
  SUB = 'sub',
}

// Local types for recruitment block structure (to avoid any)
type TextField = {
  fieldId: EFieldId.TEXT;
  vietnamese_text?: string;
  english_text?: string;
  japanese_text?: string;
  text_type?: ETextType[];
};

type HtmlRawField = {
  fieldId: EFieldId.HTML_RAW;
  language?: string[]; // e.g., ['vi']
  content?: string; // raw HTML
};

type GroupItem = {
  fieldId: EFieldId.GROUP_ITEM;
  content?: Array<TextField | HtmlRawField>;
};

type Group = {
  fieldId: EFieldId.GROUP;
  items?: GroupItem[];
};

export type JobPosition = {
  id: string;
  title: string;
  description: string;
  content: string;
};

export type RecruitmentData = {
  meta: { title?: string; subtitle?: string; scroll_id?: string };
  jobs: JobPosition[];
};

// Helper function to get localized text (always take the first item)
const getLocalizedText = (content: unknown[] | undefined, locale: string) => {
  if (!content || content.length === 0) return '';
  const item = content[0] as Record<string, unknown>;
  const keyMap: Record<string, ETextFields> = {
    vi: ETextFields.VIETNAMESE_TEXT,
    en: ETextFields.ENGLISH_TEXT,
    ja: ETextFields.JAPANESE_TEXT,
  };
  const fieldKey = keyMap[locale.toLowerCase()];
  if (fieldKey && fieldKey in item) return (item[fieldKey] as string) || '';
  return '';
};

export function useRecruitmentData(content: BlockContent[], locale: ELanguage): RecruitmentData {
  return useMemo(() => {
    // Pick the first block that contains a group (cards source)
    const blockWithGroup = content.find(
      (block) =>
        Array.isArray(block.content) && block.content.some((c) => c.fieldId === EFieldId.GROUP),
    );

    if (!blockWithGroup) {
      return {
        meta: {
          title: '',
          subtitle: '',
          scroll_id: EBlockId.JOB_1,
        },
        jobs: [],
      };
    }

    // Get title and subtitle from block
    const title = getLocalizedText(blockWithGroup.title || [], locale);
    const subtitle = getLocalizedText(blockWithGroup.description || [], locale);

    // Extract job data from group content
    const groupContent = blockWithGroup.content?.find((item) => item.fieldId === EFieldId.GROUP) as
      | Group
      | undefined;
    const jobs: JobPosition[] = [];

    if (groupContent && 'items' in groupContent) {
      const items = (groupContent.items as GroupItem[]) || [];

      items.forEach((item: GroupItem, index) => {
        if (item.fieldId === EFieldId.GROUP_ITEM && item.content) {
          let jobTitle = '';
          let jobDescription = '';
          let htmlContent = '';

          // Extract text content and HTML content
          item.content.forEach((contentItem: TextField | HtmlRawField) => {
            if (contentItem.fieldId === EFieldId.TEXT) {
              const textType = contentItem.text_type?.[0];
              const localizedText = getLocalizedText([contentItem], locale);

              if (textType === ETextType.MAIN) {
                jobTitle = localizedText;
              } else if (textType === ETextType.SUB) {
                jobDescription = localizedText;
              }
            } else if (contentItem.fieldId === EFieldId.HTML_RAW && 'language' in contentItem) {
              // Prefer content matching current locale; fallback to empty/undefined language
              const languages = contentItem.language || [];
              const matchesLocale = languages.includes(locale);
              const isFallback = languages.length === 0;
              if ((matchesLocale || (!htmlContent && isFallback)) && contentItem.content) {
                htmlContent = contentItem.content;
              }
            }
          });

          if (jobTitle) {
            jobs.push({
              id: `job-${index}`,
              title: jobTitle,
              description: jobDescription,
              content: htmlContent,
            });
          }
        }
      });
    }

    return {
      meta: {
        title,
        subtitle,
        scroll_id: (blockWithGroup.block_id as string) || EBlockId.JOB_1,
      },
      jobs,
    };
  }, [content, locale]);
}
