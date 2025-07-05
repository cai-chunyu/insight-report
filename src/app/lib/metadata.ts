import { Metadata } from 'next';

export const siteConfig = {
  name: 'InsightReport',
  url: 'https://insightreport.org',
  description: {
    en: 'A modern bilingual information platform delivering high-quality content and insights in English and Chinese.',
    zh: '一个现代化的双语资讯平台，提供高质量的中英文内容和洞察。'
  },
  keywords: {
    en: ['news', 'insights', 'analysis', 'bilingual', 'English', 'Chinese', 'information', 'reports'],
    zh: ['新闻', '洞察', '分析', '双语', '中文', '英文', '资讯', '报告']
  },
  authors: [{ name: 'InsightReport Team' }],
  creator: 'InsightReport',
  publisher: 'InsightReport',
  twitterHandle: '@insightreport'
};

export function generateMetadata(options?: {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  language?: 'en' | 'zh';
  path?: string;
}): Metadata {
  const language = options?.language || 'en';
  const title = options?.title 
    ? `${options.title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${language === 'zh' ? '洞察世界，连接未来' : 'Insights for a Connected World'}`;
  
  const description = options?.description || siteConfig.description[language];
  const keywords = options?.keywords || siteConfig.keywords[language];
  const url = options?.path ? `${siteConfig.url}${options.path}` : siteConfig.url;
  const ogImage = options?.ogImage || `${siteConfig.url}/og-image.png`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        'en': `${siteConfig.url}`,
        'zh': `${siteConfig.url}`,
        'x-default': `${siteConfig.url}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: language === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // 添加搜索引擎验证码（如果有的话）
      // google: 'google-verification-code',
      // bing: 'bing-verification-code',
    },
  };
}