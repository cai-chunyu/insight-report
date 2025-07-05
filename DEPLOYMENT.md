# InsightReport Deployment Guide

## Static Export Deployment

To deploy InsightReport as a static website:

1. **Enable static export in next.config.js**:
   ```javascript
   const nextConfig = {
     output: 'export',
     distDir: 'out',
     images: {
       unoptimized: true
     }
   };
   ```

2. **Build the static site**:
   ```bash
   bun run build
   ```

3. **The static files will be in the `out` directory**. You can deploy these files to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Adding New Articles

1. Create HTML files in the appropriate language directory:
   - English articles: `/public/articles/en/[article-name].html`
   - Chinese articles: `/public/articles/zh/[article-name].html`

2. Update the article list in `/src/app/page.tsx`:
   ```javascript
   const articlesData = {
     en: [
       {
         id: 'article-id',
         title: 'Article Title',
         date: 'YYYY-MM-DD',
         path: '/articles/en/article-id'
       }
       // Add more articles here
     ],
     zh: [
       // Chinese articles here
     ]
   };
   ```

3. Each HTML article should be a complete HTML document with proper structure.

## Development

For local development:
```bash
bun install
bun run dev
```

The site will be available at http://localhost:3000
