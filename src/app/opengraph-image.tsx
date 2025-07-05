import { ImageResponse } from 'next/og';

// Route handlers
export const runtime = 'edge';

// Image metadata
export const alt = 'InsightReport - Insights for a Connected World';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 24,
            letterSpacing: '-0.05em',
          }}
        >
          InsightReport
        </div>
        <div
          style={{
            fontSize: 36,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          洞察世界，连接未来 | Insights for a Connected World
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: 48,
          }}
        >
          insightreport.org
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}