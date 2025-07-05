import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { siteConfig } from '@/app/lib/metadata';

function extractTitle(html: string): string {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  return titleMatch ? titleMatch[1] : 'Article';
}

function extractDescription(html: string, lang: 'en' | 'zh'): string {
  // Try to extract first paragraph or use default
  const paragraphMatch = html.match(/<p[^>]*>([^<]+)<\/p>/);
  if (paragraphMatch) {
    const text = paragraphMatch[1].trim();
    return text.length > 160 ? text.substring(0, 157) + '...' : text;
  }
  return siteConfig.description[lang];
}

function injectSEOTags(html: string, lang: 'en' | 'zh', slug: string): string {
  const title = extractTitle(html);
  const description = extractDescription(html, lang);
  const url = `${siteConfig.url}/articles/${lang}/${slug}`;
  const alternateUrl = lang === 'en' 
    ? `${siteConfig.url}/articles/zh/${slug}`
    : `${siteConfig.url}/articles/en/${slug}`;
  
  // Check if alternate version exists
  const alternatePath = path.join(process.cwd(), 'public', 'articles', lang === 'en' ? 'zh' : 'en', `${slug}.html`);
  const hasAlternate = fs.existsSync(alternatePath);
  
  // SEO tags to inject
  const seoTags = `
    <!-- SEO Meta Tags -->
    <meta name="description" content="${description}">
    <meta name="keywords" content="${siteConfig.keywords[lang].join(', ')}">
    <link rel="canonical" href="${url}">
    ${hasAlternate ? `<link rel="alternate" hreflang="${lang === 'en' ? 'zh' : 'en'}" href="${alternateUrl}">` : ''}
    <link rel="alternate" hreflang="${lang}" href="${url}">
    <link rel="alternate" hreflang="x-default" href="${url}">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="${siteConfig.name}">
    <meta property="og:locale" content="${lang === 'zh' ? 'zh_CN' : 'en_US'}">
    <meta property="og:image" content="${siteConfig.url}/opengraph-image">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:site" content="${siteConfig.twitterHandle}">
    <meta name="twitter:image" content="${siteConfig.url}/opengraph-image">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "${title}",
      "description": "${description}",
      "url": "${url}",
      "datePublished": "${new Date().toISOString()}",
      "dateModified": "${new Date().toISOString()}",
      "publisher": {
        "@type": "Organization",
        "name": "${siteConfig.name}",
        "url": "${siteConfig.url}"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${url}"
      },
      "inLanguage": "${lang}"
    }
    </script>
  `;
  
  // Inject tags before </head>
  return html.replace('</head>', seoTags + '</head>');
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string; slug: string }> }
) {
  const { lang, slug } = await params;
  
  // 验证语言参数
  if (lang !== 'en' && lang !== 'zh') {
    return new NextResponse('Not Found', { status: 404 });
  }

  // 构建文件路径
  const filePath = path.join(process.cwd(), 'public', 'articles', lang, `${slug}.html`);

  try {
    // 读取 HTML 文件
    let htmlContent = fs.readFileSync(filePath, 'utf-8');
    
    // 注入 SEO 标签
    htmlContent = injectSEOTags(htmlContent, lang, slug);
    
    // 返回增强后的 HTML 内容
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    return new NextResponse('Not Found', { status: 404 });
  }
}

// 生成静态参数，支持静态导出
export async function generateStaticParams() {
  const params = [];
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
      // 目录可能不存在
      continue;
    }
  }

  return params;
}