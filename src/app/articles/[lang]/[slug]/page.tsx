import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const params = [];

  // Generate params for all articles in both languages
  const languages = ['en', 'zh'];

  for (const lang of languages) {
    const articlesDir = path.join(process.cwd(), 'public', 'articles', lang);

    try {
      const files = fs.readdirSync(articlesDir);

      for (const file of files) {
        if (file.endsWith('.html')) {
          params.push({
            lang,
            slug: file.replace('.html', '')
          });
        }
      }
    } catch (error) {
      // Directory might not exist yet
      continue;
    }
  }

  return params;
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;

  // Validate language
  if (lang !== 'en' && lang !== 'zh') {
    notFound();
  }

  // Construct the file path
  const filePath = path.join(process.cwd(), 'public', 'articles', lang, `${slug}.html`);

  try {
    // Read the HTML file
    const htmlContent = fs.readFileSync(filePath, 'utf-8');

    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link href="/" className="text-zinc-600 hover:text-zinc-900">
              ← {lang === 'en' ? 'Back to Home' : '返回首页'}
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <article
            className="prose prose-zinc max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </main>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
