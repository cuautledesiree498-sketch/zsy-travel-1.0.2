import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          background: 'linear-gradient(135deg, #10233d 0%, #1c3558 55%, #3d5f7d 100%)',
          color: 'white',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ fontSize: 58, lineHeight: 1.15, marginBottom: 24 }}>Infinite Travel</div>
        <div style={{ fontSize: 34, fontFamily: 'Arial, sans-serif', marginBottom: 18, color: '#e7eef7' }}>
          Tailor-Made China Journeys
        </div>
        <div style={{ fontSize: 24, fontFamily: 'Arial, sans-serif', color: '#d7e2ef' }}>
          Multi-city private travel across China for global travelers
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
