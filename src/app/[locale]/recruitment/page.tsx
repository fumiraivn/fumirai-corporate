import { getRecruitmentPage } from '@/apis/home';
import { RecruitmentPage } from '@/components';
import { generateRecruitmentMetadata } from '@/lib/recruitmentSEO';
import { ELanguage } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateRecruitmentMetadata(locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const recruitmentPage = await getRecruitmentPage(locale as ELanguage);

  type CmsEntry = { content?: unknown[] };
  const contentBlocks = (recruitmentPage as CmsEntry | null | undefined)?.content || [];

  return <RecruitmentPage content={contentBlocks as unknown[]} />;
}
