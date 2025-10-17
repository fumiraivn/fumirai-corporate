import type { ELanguage, SEOItem } from '@/types';

import { Metadata } from 'next';

function mapOgLocale(locale: string): string {
  return locale === 'vi' ? 'vi_VN' : locale === 'ja' ? 'ja_JP' : 'en_US';
}

function pickSeoByLocale(seoItems: SEOItem[] | undefined, locale: string): SEOItem | undefined {
  if (!seoItems || seoItems.length === 0) return undefined;
  return seoItems.find((item) => item.Language?.includes(locale as ELanguage));
}

function buildAlternates(seoItems: SEOItem[] | undefined): Metadata['alternates'] | undefined {
  if (!seoItems || seoItems.length === 0) return undefined;
  const languages: Record<string, string> = {};
  for (const item of seoItems) {
    const lang = item.Language?.[0] as ELanguage | undefined;
    if (!lang || !item.canonicalUrl) continue;
    languages[lang] = item.canonicalUrl;
  }
  // choose VI as canonical if present, otherwise first available
  const canonical = languages['vi'] || Object.values(languages)[0];
  return { canonical, languages };
}

export function generateHomeMetadata(locale: string, seoItems?: SEOItem[]): Metadata {
  // Chỉ sử dụng dữ liệu từ API (microCMS)
  const picked = pickSeoByLocale(seoItems, locale);
  if (!picked) return {} as Metadata;

  return {
    title: picked.title,
    description: picked.description,
    keywords: picked.keywords,
    openGraph: {
      title: picked.title,
      description: picked.description,
      images: [picked.ogImage?.url].filter(Boolean) as string[],
      url: picked.canonicalUrl,
      siteName: 'FUMIRAI CORPORATE',
      locale: mapOgLocale(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: picked.title,
      description: picked.description,
      images: [picked.ogImage?.url].filter(Boolean) as string[],
    },
    alternates: buildAlternates(seoItems),
  };
}
