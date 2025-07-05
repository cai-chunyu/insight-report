import { ImageResponse } from 'next/og';

// Route handlers
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 外圆背景 */}
          <circle cx="16" cy="16" r="14" fill="url(#grad1)" />
          
          {/* 内圆白色背景 */}
          <circle cx="16" cy="16" r="12" fill="white" />
          
          {/* 眼睛图标 */}
          <g transform="translate(16, 14)">
            <path d="M-6 0 C-6 -3.3 -3.3 -6 0 -6 C3.3 -6 6 -3.3 6 0 C6 3.3 3.3 6 0 6 C-3.3 6 -6 3.3 -6 0" 
                  fill="none" 
                  stroke="url(#grad2)" 
                  strokeWidth="1"/>
            
            <circle cx="0" cy="0" r="3" fill="url(#grad2)" />
            <circle cx="0" cy="0" r="1.5" fill="white" />
            <circle cx="0" cy="0" r="1" fill="#4a5568" />
          </g>
          
          {/* 文档线条 */}
          <rect x="10" y="21" width="12" height="1" rx="0.5" fill="#718096" opacity="0.8" />
          <rect x="9" y="23" width="14" height="1" rx="0.5" fill="#718096" opacity="0.6" />
          
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
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