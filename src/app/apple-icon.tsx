import { ImageResponse } from 'next/og';

// Route handlers
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '36px',
        }}
      >
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 内圆白色背景 */}
          <circle cx="70" cy="70" r="60" fill="white" opacity="0.95" />
          
          {/* 眼睛图标 */}
          <g transform="translate(70, 60)">
            <path d="M-30 0 C-30 -16.5 -16.5 -30 0 -30 C16.5 -30 30 -16.5 30 0 C30 16.5 16.5 30 0 30 C-16.5 30 -30 16.5 -30 0" 
                  fill="none" 
                  stroke="#667eea" 
                  strokeWidth="4"/>
            
            <circle cx="0" cy="0" r="15" fill="url(#gradient)" />
            <circle cx="0" cy="0" r="9" fill="white" />
            <circle cx="0" cy="0" r="6" fill="#4a5568" />
            <circle cx="3" cy="-3" r="2" fill="white" opacity="0.9" />
          </g>
          
          {/* 文档线条 */}
          <rect x="45" y="95" width="50" height="3" rx="1.5" fill="#718096" opacity="0.8" />
          <rect x="40" y="103" width="60" height="3" rx="1.5" fill="#718096" opacity="0.6" />
          <rect x="50" y="111" width="40" height="3" rx="1.5" fill="#718096" opacity="0.4" />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}