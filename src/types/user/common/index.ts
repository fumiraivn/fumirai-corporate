// Home page shared types
import type { EHomeSection } from './enum';

export interface MenuItem {
  fieldId: string;
  value: string;
  text: string;
  key: string;
}

export interface Logo {
  url: string;
  height: number;
  width: number;
  alt: string;
}

export interface Button {
  fieldId: string;
  text: string;
  redirect_to: string;
}

export interface BannerContent {
  fieldId: string;
  title: string;
  description: string;
}

export interface ContactItem {
  fieldId: string;
  value: string;
  text: string;
}

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
