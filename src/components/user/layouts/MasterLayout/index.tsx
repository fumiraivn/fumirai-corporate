import { Footer, Header, ScrollToTop } from '@/components';

export default function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ScrollToTop />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
