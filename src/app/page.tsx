'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Article = {
  id: string;
  title: string;
  date: string;
  path: string;
};

const articlesData = {
  en: [
    {
      id: 'about',
      title: 'About InsightReport',
      date: '2025-01-05',
      path: '/articles/en/about'
    }
  ],
  zh: [
    {
      id: 'about',
      title: '关于 InsightReport',
      date: '2025-01-05',
      path: '/articles/zh/about'
    }
  ]
};

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLang = localStorage.getItem('language') as 'en' | 'zh';
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    setArticles(articlesData[language]);
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">InsightReport</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded ${
                language === 'en'
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`px-3 py-1 rounded ${
                language === 'zh'
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              中文
            </button>
          </div>
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
                <time className="text-sm text-zinc-500">
                  {article.date}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
