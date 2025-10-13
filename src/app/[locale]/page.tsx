import { HomePage } from '@/components';
import { generateHomeMetadata } from '@/lib/homeSEO';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateHomeMetadata(locale);
}

export default async function Page() {
  return <HomePage />;
}
