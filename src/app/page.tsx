import Link from 'next/link';
import LanguageSelector from './components/LanguageSelector';
import { cookies } from 'next/headers';

type Article = {
  id: string;
  title: string;
  date: string;
  path: string;
};

const articlesData = {
  en: [
    {
      id: 'short-drama-market-analysis',
      title: 'Global Short-form Drama Market Interactive Dashboard',
      date: '2025-01-05',
      path: '/articles/en/short-drama-market-analysis'
    },
    {
      id: 'about',
      title: 'About InsightReport',
      date: '2025-01-05',
      path: '/articles/en/about'
    }
  ],
  zh: [
    {
      id: 'short-drama-market-analysis',
      title: '全球短剧市场交互式分析仪表盘',
      date: '2025-01-05',
      path: '/articles/zh/short-drama-market-analysis'
    },
    {
      id: 'about',
      title: '关于 InsightReport',
      date: '2025-01-05',
      path: '/articles/zh/about'
    }
  ]
};

async function getPreferredLanguage(): Promise<'en' | 'zh'> {
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get('language');
  
  if (languageCookie?.value === 'zh' || languageCookie?.value === 'en') {
    return languageCookie.value as 'en' | 'zh';
  }
  
  // 默认语言
  return 'en';
}

export default async function Home() {
  const language = await getPreferredLanguage();
  const articles = articlesData[language];

  // 结构化数据
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'InsightReport',
    url: 'https://insightreport.org',
    description: language === 'zh' 
      ? '一个现代化的双语资讯平台，提供高质量的中英文内容和洞察。'
      : 'A modern bilingual information platform delivering high-quality content and insights in English and Chinese.',
    inLanguage: language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://insightreport.org/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'InsightReport',
      url: 'https://insightreport.org'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">InsightReport</h1>
          <LanguageSelector defaultLanguage={language} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {articles.map((article) => (
            <article key={article.id} className="border-b pb-6">
              <Link
                href={article.path}
                className="block hover:bg-zinc-50 -mx-4 px-4 py-2 rounded transition-colors"
              >
                <h2 className="text-xl font-medium text-zinc-900 mb-2">
                  {article.title}
                </h2>
                <time className="text-sm text-zinc-500" dateTime={article.date}>
                  {article.date}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
    </>
  );
}