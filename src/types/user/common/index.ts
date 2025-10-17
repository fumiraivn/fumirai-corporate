// Home page shared types
import type { EHomeSection, ELanguage } from './enum';

export interface MenuItem {
  fieldId: string;
  url: string;
  vi: string;
  en: string;
  ja: string;
}

export interface Logo {
  url: string;
  height: number;
  width: number;
  alt: string;
}

export interface Button {
  fieldId: string;
  redirect_to: string;
  text_vi: string;
  text_en: string;
  text_ja: string;
}

export interface BannerContent {
  fieldId: string;
  title: string;
  description: string;
}

export interface ContactItem {
  fieldId: string;
  title_vi: string;
  title_en: string;
  title_ja: string;
  description: string;
}

export interface LanguageDropdownItem {
  fieldId: string;
  text: string;
  url: string;
}

export interface LanguageDropdownOption {
  fieldId: string;
  vi: LanguageDropdownItem[];
  en: LanguageDropdownItem[];
  ja: LanguageDropdownItem[];
}

export interface LanguageDropdown {
  fieldId: string;
  current_language: ELanguage[];
  options: LanguageDropdownOption[];
}

export interface Copyright {
  fieldId: string;
  text_vi: string;
  text_en: string;
  text_ja: string;
}

export interface CommonContentLanguages {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  logo: Logo;
  menus: MenuItem[];
  language_dropdown: LanguageDropdown[];
  recruitment_button: Button;
  phone: ContactItem;
  email: ContactItem;
  copyright: Copyright;
}

// Legacy interface for backward compatibility (will be removed)
export interface CommonContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  language: string[];
  logo: Logo;
  menus: MenuItem[];
  recruitment_btn: Button;
  languages_option: MenuItem[];
  banner: BannerContent;
  contact_btn: Button;
  copyright: string;
  contact: ContactItem[];
}

// New data structure types
export interface TextContent {
  fieldId: string;
  vietnamese_text: string;
  english_text: string;
  japanese_text: string;
  text_type?: string[];
}

export interface TextareaContent {
  fieldId: string;
  vietnamese_text: string;
  english_text: string;
  japanese_text: string;
}

export interface HtmlContent {
  fieldId: string;
  language: ELanguage[];
  content: string;
}

export interface ImageContent {
  fieldId: string;
  Alt: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
}

export interface GroupItem {
  fieldId: string;
  content: (TextContent | TextareaContent | HtmlContent | ImageContent)[];
}

export interface GroupContent {
  fieldId: string;
  group_name?: string;
  items: GroupItem[];
}

export interface BlockContent {
  fieldId: string;
  block_id: string;
  title: (TextContent | TextareaContent)[];
  description: (TextContent | TextareaContent)[];
  content: (HtmlContent | GroupContent)[];
  block_name: string;
}

export interface PageData {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  page_name: string;
  content: BlockContent[];
  seo?: SEOItem[];
}

// Legacy types (will be removed)
export type InfoItem = { fieldId?: 'info'; label?: string; value?: string };
export type ListTextCard = { fieldId?: 'list_text'; title?: string; items?: InfoItem[] };
export type HomeContentItem = {
  card_type?: `${EHomeSection}`[];
  fieldId?: 'card';
  scroll_id?: `${EHomeSection}` | string;
  title?: string;
  description?: string;
  cards?: (ListTextCard | Record<string, unknown>)[];
};

export type SectionMeta = { title?: string; subtitle?: string; scroll_id?: string };
export type SectionData = { title?: string; items?: string[] };

// SEO types based on microCMS payload structure
export interface SEOImage {
  url: string;
  height: number;
  width: number;
  alt?: string;
}

export interface SEOItem {
  fieldId: string; // 'seo_data'
  description: string;
  keywords: string;
  ogImage: SEOImage;
  canonicalUrl: string;
  title: string;
  Language: ELanguage[]; // e.g., ['vi'] | ['en'] | ['ja']
}
