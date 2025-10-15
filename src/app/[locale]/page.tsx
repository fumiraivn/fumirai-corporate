import { getHomeData } from '@/apis';
import { HomePage } from '@/components';
import { generateHomeMetadata } from '@/lib/homeSEO';
import { ELanguage } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateHomeMetadata(locale);
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const homeData = await getHomeData(locale as ELanguage);

  // Support both list and single-object CMS shapes; when list, flatten all contents' content
  type CmsEntry = { content?: unknown[] };
  type CmsList = { contents?: CmsEntry[] };
  const list = (homeData as unknown as CmsList | undefined)?.contents;
  const contentBlocks: unknown[] | undefined = Array.isArray(list)
    ? (list as CmsEntry[]).flatMap((entry) => (Array.isArray(entry?.content) ? entry.content : []))
    : (homeData as unknown as CmsEntry | undefined)?.content;

  return <HomePage content={(contentBlocks as unknown[]) || []} />;
}
