import { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';

type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
};

function getArticles() {
  const articles: { lang: string; slug: string; lastModified: Date }[] = [];
  const languages = ['en', 'zh'];
  
  for (const lang of languages) {
    const articlesDir = path.join(process.cwd(), 'public', 'articles', lang);
    
    try {
      const files = fs.readdirSync(articlesDir);
      
      for (const file of files) {
        if (file.endsWith('.html')) {
          const filePath = path.join(articlesDir, file);
          const stats = fs.statSync(filePath);
          
          articles.push({
            lang,
            slug: file.replace('.html', ''),
            lastModified: stats.mtime
          });
        }
      }
    } catch (error) {
      // Directory might not exist
      continue;
    }
  }
  
  return articles;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://insightreport.org';
  const articles = getArticles();
  
  // Homepage with language alternates
  const homepage: SitemapEntry = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
    alternates: {
      languages: {
        'en': `${baseUrl}`,
        'zh': `${baseUrl}`,
        'x-default': `${baseUrl}`
      }
    }
  };
  
  // Article pages with language alternates
  const articlePages: SitemapEntry[] = [];
  
  // Group articles by slug to create language alternates
  const articlesBySlug = new Map<string, { en?: string; zh?: string; lastModified: Date }>();
  
  articles.forEach(article => {
    if (!articlesBySlug.has(article.slug)) {
      articlesBySlug.set(article.slug, { lastModified: article.lastModified });
    }
    const entry = articlesBySlug.get(article.slug)!;
    entry[article.lang as 'en' | 'zh'] = `${baseUrl}/articles/${article.lang}/${article.slug}`;
    // Update lastModified to the most recent
    if (article.lastModified > entry.lastModified) {
      entry.lastModified = article.lastModified;
    }
  });
  
  // Create sitemap entries for articles
  articlesBySlug.forEach((langUrls, slug) => {
    // Add entry for each language version
    if (langUrls.en) {
      articlePages.push({
        url: langUrls.en,
        lastModified: langUrls.lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            'en': langUrls.en,
            'zh': langUrls.zh || langUrls.en,
            'x-default': langUrls.en
          }
        }
      });
    }
    
    if (langUrls.zh && !langUrls.en) {
      // Only Chinese version exists
      articlePages.push({
        url: langUrls.zh,
        lastModified: langUrls.lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            'zh': langUrls.zh,
            'x-default': langUrls.zh
          }
        }
      });
    }
  });
  
  return [homepage, ...articlePages];
}