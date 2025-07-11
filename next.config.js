/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Commented out for development
  // distDir: 'out',     // Commented out for development
  images: {
    unoptimized: true
  },
  
  // SEO 优化配置
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  
  // 安全头部配置
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  
  // 重定向配置（如果需要）
  async redirects() {
    return [
      // 新项目暂时不需要重定向
    ];
  },
  
  // 实验性功能
  experimental: {
    // Next.js 15 已经默认优化字体，不需要额外配置
  }
};

module.exports = nextConfig;
