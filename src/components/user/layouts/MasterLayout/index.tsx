import { Footer, Header, ScrollToTop } from '@/components';
import { BlockContent, CommonContentLanguages, ELanguage } from '@/types';

interface MasterLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  usePinnedHeader?: boolean;
  locale: ELanguage;
  commonData?: CommonContentLanguages | null;
  bannerData?: BlockContent | null;
}

export default function MasterLayout({
  children,
  showHeader = true,
  usePinnedHeader = false,
  locale,
  commonData,
  bannerData,
}: MasterLayoutProps) {
  return (
    <>
      <ScrollToTop />
      {showHeader && (
        <Header
          usePinnedHeader={usePinnedHeader}
          commonData={commonData}
          locale={locale}
          bannerData={bannerData}
        />
      )}
      {children}
      <Footer commonData={commonData} locale={locale} />
    </>
  );
}
