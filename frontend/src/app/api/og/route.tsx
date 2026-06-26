import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pegamos os parâmetros do evento para gerar o banner
    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'Culto de Celebração';
    const date = searchParams.get('date') || 'Neste Domingo';
    const time = searchParams.get('time') || '19:00';
    const churchName = searchParams.get('church') || 'Sancoré Church';

    // Para produção, podemos carregar fontes personalizadas (como Inter, Roboto) e imagens de background
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b', // Fundo escuro premium
            backgroundImage: 'radial-gradient(circle at 50% 0%, #3b82f6 0%, transparent 70%)',
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Logo / Nome da Igreja no Topo */}
          <div style={{ position: 'absolute', top: 60, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 36, fontWeight: 'bold', color: '#60a5fa' }}>{churchName}</span>
          </div>

          {/* Conteúdo Principal (Título do Evento) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
            <h1
              style={{
                fontSize: 90,
                fontWeight: 900,
                letterSpacing: '-0.05em',
                textAlign: 'center',
                margin: 0,
                padding: '0 40px',
                lineHeight: 1.1,
                backgroundClip: 'text',
                color: 'transparent',
                backgroundImage: 'linear-gradient(to bottom right, #ffffff, #93c5fd)',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Data e Hora */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 60,
              gap: 40,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', background: '#1e3a8a', padding: '15px 30px', borderRadius: 20 }}>
              <span style={{ fontSize: 36, fontWeight: 'bold', color: '#bfdbfe' }}>📅 {date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: '#1e3a8a', padding: '15px 30px', borderRadius: 20 }}>
              <span style={{ fontSize: 36, fontWeight: 'bold', color: '#bfdbfe' }}>⏰ {time}</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
