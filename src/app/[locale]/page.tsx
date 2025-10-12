import { HomePage } from '@/components';
import { generateHomeMetadata } from '@/lib/homeSEO';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  return generateHomeMetadata(locale);
}

export default async function LocalePage() {
  return <HomePage />;
}
