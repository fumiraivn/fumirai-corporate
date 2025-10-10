import en from './messages/en.json';
import ja from './messages/ja.json';
import vi from './messages/vi.json';
import { DEFAULT_LOCALE } from './request';

export const messagesMap = {
  en,
  ja,
  vi,
};

export type Messages = typeof en;

export function getMessages(locale?: string) {
  const resolved = (locale ?? DEFAULT_LOCALE) as keyof typeof messagesMap;
  return messagesMap[resolved] ?? messagesMap[DEFAULT_LOCALE];
}
