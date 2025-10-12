import { Metadata } from 'next';

export function generateRecruitmentMetadata(locale: string): Metadata {
  // SEO data tĩnh cho trang recruitment theo từng ngôn ngữ
  const seoData = {
    vi: {
      title: 'Tuyển dụng - FUMIRAI CORPORATE | Cơ hội việc làm công nghệ tại Đà Nẵng',
      description:
        'Tham gia đội ngũ FUMIRAI CORPORATE. Tuyển dụng Developer, Tester, BRSE với môi trường làm việc năng động, lương cạnh tranh 15-40 triệu VNĐ. Công ty công nghệ Nhật Bản tại Đà Nẵng.',
      keywords:
        'tuyển dụng, việc làm, developer, tester, BRSE, công ty công nghệ, FUMIRAI, đà nẵng, lương cao, môi trường làm việc, công ty Nhật Bản',
      ogImage: '/recruitment-banner.png',
      canonicalUrl: 'https://fumirai.com/vi/recruitment',
    },
    en: {
      title: 'Recruitment - FUMIRAI CORPORATE | Tech Career Opportunities in Da Nang',
      description:
        'Join FUMIRAI CORPORATE team. Hiring Developer, Tester, BRSE with dynamic work environment, competitive salary 15-40 million VND. Japanese technology company in Da Nang.',
      keywords:
        'recruitment, jobs, developer, tester, BRSE, technology company, FUMIRAI, da nang, high salary, work environment, Japanese company',
      ogImage: '/recruitment-banner-en.png',
      canonicalUrl: 'https://fumirai.com/en/recruitment',
    },
    ja: {
      title: '採用情報 - FUMIRAI CORPORATE | ダナンでのテクノロジーキャリア機会',
      description:
        'FUMIRAI CORPORATEチームに参加。開発者、テスター、BRSEを募集。ダイナミックな職場環境、競争力のある給与15-40百万VND。ダナンの日本テクノロジー企業。',
      keywords:
        '採用情報, 求人, 開発者, テスター, BRSE, テクノロジー企業, FUMIRAI, ダナン, 高給与, 職場環境, 日本企業',
      ogImage: '/recruitment-banner-ja.png',
      canonicalUrl: 'https://fumirai.com/ja/recruitment',
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
        vi: 'https://fumirai.com/vi/recruitment',
        en: 'https://fumirai.com/en/recruitment',
        ja: 'https://fumirai.com/ja/recruitment',
      },
    },
  };
}
