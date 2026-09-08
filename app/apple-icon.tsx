import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#141414', color: '#F2A900', fontSize: 78, fontWeight: 800, letterSpacing: "-3px" }}>
        SP
        <div style={{ width: 70, height: 9, background: '#F2A900', marginTop: 8 }} />
      </div>
    ),
    size,
  );
}
