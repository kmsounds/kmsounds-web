import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Link එකෙන් parameters ලබාගැනීම
    const title = searchParams.get('title') || 'K.M SOUNDS Product';
    const price = searchParams.get('price') || '';
    const image = searchParams.get('image') || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#09090b',
            padding: '40px 60px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Left Side: Text Info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '55%',
            }}
          >
            <span
              style={{
                color: '#06b6d4',
                fontSize: 24,
                fontWeight: 'bold',
                letterSpacing: '2px',
                marginBottom: '10px',
              }}
            >
              K.M SOUNDS
            </span>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            {price && (
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  fontSize: 32,
                  fontWeight: 'bold',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  width: 'fit-content',
                }}
              >
                LKR {price}
              </div>
            )}
          </div>

          {/* Right Side: Product Photo */}
          {image && (
            <div
              style={{
                display: 'flex',
                width: '40%',
                height: '80%',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid #27272a',
              }}
            >
              <img
                src={image}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image`, { status: 500 });
  }
}