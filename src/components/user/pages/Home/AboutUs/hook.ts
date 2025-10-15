import { EHomeSection, HomeContentItem, ListTextCard, SectionData, SectionMeta } from '@/types';

export function useHomeSectionData(blocks?: unknown[], section?: `${EHomeSection}`) {
  const items = (blocks as HomeContentItem[] | undefined) ?? [];
  const sectionBlock = items.find((c) => c.card_type?.[0] === section || c.scroll_id === section);

  const listTextCard = (
    sectionBlock?.cards as (ListTextCard | Record<string, unknown>)[] | undefined
  )?.find((c): c is ListTextCard => (c as ListTextCard)?.fieldId === 'list_text');

  const data: SectionData = {
    title: listTextCard?.title ?? undefined,
    items: (listTextCard?.items || [])
      .filter((it) => it?.fieldId === 'info')
      .map((it) => (typeof it?.value === 'string' ? it.value.trim() : ''))
      .filter((v): v is string => typeof v === 'string' && v.length > 0),
  };

  const meta: SectionMeta = {
    title: sectionBlock?.title,
    subtitle: sectionBlock?.description,
    scroll_id: (sectionBlock?.scroll_id as string) || (section as string) || undefined,
  };
  return { meta, data };
}

export function useAboutUsData(blocks?: unknown[]) {
  return useHomeSectionData(blocks, EHomeSection.ABOUT_US);
}
