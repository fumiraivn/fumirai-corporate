import { Footer, Header, ScrollToTop } from '@/components';

interface MasterLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  usePinnedHeader?: boolean;
}

export default function MasterLayout({
  children,
  showHeader = true,
  usePinnedHeader = false,
}: MasterLayoutProps) {
  return (
    <>
      <ScrollToTop />
      {showHeader && <Header usePinnedHeader={usePinnedHeader} />}
      {children}
      <Footer />
    </>
  );
}
