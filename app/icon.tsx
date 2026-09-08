import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#141414', color: '#F2A900', fontSize: 220, fontWeight: 800, letterSpacing: '-10px' }}>
        SP
        <div style={{ width: 200, height: 26, background: '#F2A900', marginTop: 18 }} />
      </div>
    ),
    size,
  );
}
