import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon512() {
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
          borderRadius: '102px',
        }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="170" fill="white" opacity="0.95" />
          
          <g transform="translate(200, 170)">
            <path d="M-85 0 C-85 -47 -47 -85 0 -85 C47 -85 85 -47 85 0 C85 47 47 85 0 85 C-47 85 -85 47 -85 0" 
                  fill="none" 
                  stroke="#667eea" 
                  strokeWidth="12"/>
            
            <circle cx="0" cy="0" r="42" fill="#667eea" />
            <circle cx="0" cy="0" r="26" fill="white" />
            <circle cx="0" cy="0" r="17" fill="#4a5568" />
            <circle cx="9" cy="-9" r="7" fill="white" opacity="0.9" />
          </g>
          
          <rect x="125" y="270" width="150" height="10" rx="5" fill="#718096" opacity="0.8" />
          <rect x="110" y="295" width="180" height="10" rx="5" fill="#718096" opacity="0.6" />
          <rect x="140" y="320" width="120" height="10" rx="5" fill="#718096" opacity="0.4" />
        </svg>
      </div>
    ),
    size
  );
}