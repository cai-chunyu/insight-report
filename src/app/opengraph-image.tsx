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
        {/* Logo */}
        <div style={{ marginBottom: 40 }}>
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="80" r="75" fill="white" opacity="0.95" />
            
            <g transform="translate(80, 70)">
              <path d="M-35 0 C-35 -19.3 -19.3 -35 0 -35 C19.3 -35 35 -19.3 35 0 C35 19.3 19.3 35 0 35 C-19.3 35 -35 19.3 -35 0" 
                    fill="none" 
                    stroke="#667eea" 
                    strokeWidth="5"/>
              
              <circle cx="0" cy="0" r="18" fill="#667eea" />
              <circle cx="0" cy="0" r="11" fill="white" />
              <circle cx="0" cy="0" r="7" fill="#4a5568" />
              <circle cx="4" cy="-4" r="3" fill="white" opacity="0.9" />
            </g>
            
            <rect x="50" y="110" width="60" height="4" rx="2" fill="#718096" opacity="0.8" />
            <rect x="45" y="120" width="70" height="4" rx="2" fill="#718096" opacity="0.6" />
            <rect x="55" y="130" width="50" height="4" rx="2" fill="#718096" opacity="0.4" />
          </svg>
        </div>
        
        <div
          style={{
            fontSize: 90,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          InsightReport
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.95)',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          洞察世界，连接未来 | Insights for a Connected World
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: 40,
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