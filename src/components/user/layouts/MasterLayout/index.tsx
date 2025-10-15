import { Footer, Header, ScrollToTop } from '@/components';
import { CommonContent, ELanguage } from '@/types';

interface MasterLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  usePinnedHeader?: boolean;
  locale: ELanguage;
  commonData?: CommonContent | null;
}

export default function MasterLayout({
  children,
  showHeader = true,
  usePinnedHeader = false,
  commonData,
}: MasterLayoutProps) {
  return (
    <>
      <ScrollToTop />
      {showHeader && <Header usePinnedHeader={usePinnedHeader} commonData={commonData} />}
      {children}
      <Footer commonData={commonData} />
    </>
  );
}
