import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon192() {
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
          borderRadius: '38px',
        }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="75" cy="75" r="65" fill="white" opacity="0.95" />
          
          <g transform="translate(75, 65)">
            <path d="M-32 0 C-32 -17.7 -17.7 -32 0 -32 C17.7 -32 32 -17.7 32 0 C32 17.7 17.7 32 0 32 C-17.7 32 -32 17.7 -32 0" 
                  fill="none" 
                  stroke="#667eea" 
                  strokeWidth="4.5"/>
            
            <circle cx="0" cy="0" r="16" fill="#667eea" />
            <circle cx="0" cy="0" r="10" fill="white" />
            <circle cx="0" cy="0" r="6.5" fill="#4a5568" />
            <circle cx="3.5" cy="-3.5" r="2.5" fill="white" opacity="0.9" />
          </g>
          
          <rect x="47" y="102" width="56" height="3.5" rx="1.75" fill="#718096" opacity="0.8" />
          <rect x="42" y="110" width="66" height="3.5" rx="1.75" fill="#718096" opacity="0.6" />
          <rect x="52" y="118" width="46" height="3.5" rx="1.75" fill="#718096" opacity="0.4" />
        </svg>
      </div>
    ),
    size
  );
}