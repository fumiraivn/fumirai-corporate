import { getHomeLanguages } from '@/apis';
import { HomePage } from '@/components';
import { generateHomeMetadata } from '@/lib/homeSEO';
import { ELanguage } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const homeData = await getHomeLanguages();
  return generateHomeMetadata(locale, homeData?.seo);
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const homeData = await getHomeLanguages();

  return <HomePage homeData={homeData} locale={locale as ELanguage} />;
}
