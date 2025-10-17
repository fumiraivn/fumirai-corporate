import { getRecruitmentLanguages } from '@/apis';
import { RecruitmentPage } from '@/components';
import { generateRecruitmentMetadata } from '@/lib/recruitmentSEO';
import { ELanguage, PageData } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const recruitmentData = await getRecruitmentLanguages();
  return generateRecruitmentMetadata(locale, recruitmentData?.seo);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const recruitmentData = await getRecruitmentLanguages();

  return (
    <RecruitmentPage recruitmentData={recruitmentData as PageData} locale={locale as ELanguage} />
  );
}
