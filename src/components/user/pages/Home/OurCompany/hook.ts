import type { HomeContentItem, ListTextCard, SectionMeta } from '@/types';
import { EHomeSection } from '@/types';

import type { CompanyInfo } from '../AboutCompany';

export type OurCompanyData = {
  meta: SectionMeta;
  company: { title?: string; items: CompanyInfo[]; embedAddress?: string };
  parent: { title?: string; items: CompanyInfo[]; embedAddress?: string };
};

export function useOurCompanyData(blocks?: unknown[]): OurCompanyData {
  const items = (blocks as HomeContentItem[] | undefined) ?? [];
  const block = items.find(
    (c) =>
      c.card_type?.[0] === EHomeSection.OUR_COMPANY || c.scroll_id === EHomeSection.OUR_COMPANY,
  );

  const cards = (block?.cards as (ListTextCard | Record<string, unknown>)[] | undefined) || [];
  const listCards = cards.filter(
    (c): c is ListTextCard => (c as ListTextCard)?.fieldId === 'list_text',
  );

  const toCompanyInfo = (card?: ListTextCard): CompanyInfo[] =>
    (card?.items || [])
      .filter((it) => it?.fieldId === 'info')
      .map((it) => ({
        label: typeof it?.label === 'string' ? it.label.replace(/:\s*$/, '').trim() : '',
        value: typeof it?.value === 'string' ? it.value.trim() : '',
      }))
      .filter((row) => row.label || row.value);

  const extractAddress = (items: CompanyInfo[]): string | undefined => {
    const found =
      items.find((it) => /住所|address/i.test(it.label || '')) ||
      items.find((it) => /税務住所|tax/i.test(it.label || ''));
    return found?.value || undefined;
  };

  const companyCard = listCards[0];
  const parentCard = listCards[1];

  const meta: SectionMeta = {
    title: block?.title,
    subtitle: block?.description,
    scroll_id: (block?.scroll_id as string) || EHomeSection.OUR_COMPANY,
  };

  const companyItems = toCompanyInfo(companyCard);
  const parentItems = toCompanyInfo(parentCard);

  return {
    meta,
    company: {
      title: companyCard?.title,
      items: companyItems,
      embedAddress: extractAddress(companyItems),
    },
    parent: {
      title: parentCard?.title,
      items: parentItems,
      embedAddress: extractAddress(parentItems),
    },
  };
}
