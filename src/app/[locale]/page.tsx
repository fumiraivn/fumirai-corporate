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

  if (homeData) {
    console.log('Home data fetched:', homeData);
  } else {
    console.warn('No home data available for locale:', locale);
  }

  return <HomePage />;
}
