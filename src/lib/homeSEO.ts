import { Metadata } from 'next';

export function generateHomeMetadata(locale: string): Metadata {
  // SEO data tĩnh cho từng ngôn ngữ
  const seoData = {
    vi: {
      title:
        'FUMIRAI CORPORATE - Công ty công nghệ giải pháp phần mềm cho thị trường Nhật Bản & toàn cầu',
      description:
        'Công ty vốn đầu tư 100% từ Nhật với công ty mẹ là fulfillments. Với đội ngũ nhân sự trẻ có nhiều kinh nghiệm trong lĩnh vực thiết kế phần mềm. Dịch vụ: Phát triển Website, Marketing Số, Giải pháp Khởi nghiệp, Dịch vụ Mạng, SEO, Phát triển Ứng dụng.',
      keywords:
        'công ty công nghệ, phát triển phần mềm, giải pháp công nghệ, công ty Nhật Bản, FUMIRAI, phát triển website, marketing số, SEO, khởi nghiệp, ứng dụng di động, fulfillments',
      ogImage: '/banner.png',
      canonicalUrl: 'https://fumirai.com/vi',
    },
    en: {
      title:
        'FUMIRAI CORPORATE - Technology Company Providing Software Solutions for Japanese Market & Globally',
      description:
        'A 100% Japanese-invested company with fulfillments as the parent company. With a young team with extensive experience in software design. Services: Web Development, Digital Marketing, Startup Solutions, Networking Services, SEO, App Development.',
      keywords:
        'technology company, software development, tech solutions, Japanese company, FUMIRAI, web development, digital marketing, SEO, startup solutions, mobile apps, fulfillments',
      ogImage: '/banner-en.png',
      canonicalUrl: 'https://fumirai.com/en',
    },
    ja: {
      title:
        'FUMIRAI CORPORATE - 日本市場とグローバル市場向けのソフトウェアソリューションを提供するテクノロジー企業',
      description:
        'fulfillmentsを親会社とする100%日本投資企業。ソフトウェア設計分野で豊富な経験を持つ若いチームを擁しています。サービス：ウェブ開発、デジタルマーケティング、スタートアップソリューション、ネットワークサービス、SEO、アプリ開発。',
      keywords:
        'テクノロジー企業, ソフトウェア開発, 技術ソリューション, 日本企業, FUMIRAI, ウェブ開発, デジタルマーケティング, SEO, スタートアップソリューション, モバイルアプリ, fulfillments',
      ogImage: '/banner-ja.png',
      canonicalUrl: 'https://fumirai.com/ja',
    },
  };

  const data = seoData[locale as keyof typeof seoData] || seoData.vi;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.ogImage],
      url: data.canonicalUrl,
      siteName: 'FUMIRAI CORPORATE',
      locale: locale === 'vi' ? 'vi_VN' : locale === 'ja' ? 'ja_JP' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.ogImage],
    },
    alternates: {
      canonical: data.canonicalUrl,
      languages: {
        vi: 'https://fumirai.com/vi',
        en: 'https://fumirai.com/en',
        ja: 'https://fumirai.com/ja',
      },
    },
  };
}
