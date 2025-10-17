import { useMemo } from 'react';

import {
  BlockContent,
  EBlockId,
  ETextFields,
  PageData,
  TextContent,
  TextareaContent,
} from '@/types';

interface UseBlockDataProps {
  content: BlockContent[];
  blockId: string;
}

export function useBlockData({ content, blockId }: UseBlockDataProps) {
  return useMemo(() => {
    if (!content || content.length === 0) {
      return null;
    }

    const block = content.find((item) => item.block_id === blockId);
    return block || null;
  }, [content, blockId]);
}

// Hook để lấy nhiều blocks cùng lúc
export function useMultipleBlockData(content: BlockContent[], blockIds: string[]) {
  return useMemo(() => {
    if (!content || content.length === 0) {
      return {};
    }

    const result: Record<string, BlockContent | null> = {};

    blockIds.forEach((blockId) => {
      const block = content.find((item) => item.block_id === blockId);
      result[blockId] = block || null;
    });

    return result;
  }, [content, blockIds]);
}

// Hook để lấy tất cả blocks
export function useAllBlocks(content: BlockContent[]) {
  return useMemo(() => {
    if (!content || content.length === 0) {
      return [];
    }

    return content;
  }, [content]);
}

// Hook để lấy banner data từ homeLanguages
export function useBannerData(homeLanguages: PageData | null) {
  return useMemo(() => {
    if (!homeLanguages?.content) {
      return null;
    }

    const bannerBlock = homeLanguages.content.find((block) => block.block_id === EBlockId.BANNER);
    return bannerBlock || null;
  }, [homeLanguages]);
}

// Helper function để lấy localized text từ title/description array
export function getLocalizedTextFromArray(
  content: ReadonlyArray<TextContent | TextareaContent> | undefined,
  locale: string,
): string {
  if (!content || content.length === 0) return '';
  const item: TextContent | TextareaContent = content[0]; // Luôn lấy phần tử đầu tiên

  // Map locale to field name
  type LocalizedFieldKey = 'vietnamese_text' | 'english_text' | 'japanese_text';
  const localeMap: Record<string, LocalizedFieldKey> = {
    vi: ETextFields.VIETNAMESE_TEXT,
    en: ETextFields.ENGLISH_TEXT,
    ja: ETextFields.JAPANESE_TEXT,
  };

  const fieldName = localeMap[locale.toLowerCase()];

  if (fieldName && item[fieldName]) {
    return (item[fieldName] as string) || '';
  }

  return '';
}
