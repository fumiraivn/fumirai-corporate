import { RecruitmentPage } from '@/components';
import { generateRecruitmentMetadata } from '@/lib/recruitmentSEO';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  return generateRecruitmentMetadata(locale);
}

export default async function Page() {
  return <RecruitmentPage />;
}
