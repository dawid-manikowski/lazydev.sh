/** @jsxImportSource react */
// We use React-style JSX here purely as input to satori. No React runtime is required.

export interface OgTemplateProps {
  title: string;
  kicker?: string;
}

const BG = '#0a0a0a';
const ACCENT = '#f59e0b';
const TEXT = '#e5e5e5';
const MUTED = '#888888';

export function ogTemplate({ title, kicker = 'lazydev.sh' }: OgTemplateProps) {
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        backgroundColor: BG,
        color: TEXT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px',
        fontFamily: 'JetBrainsMono',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '12px', height: '12px', backgroundColor: ACCENT }} />
        <span style={{ fontSize: '28px', color: MUTED, letterSpacing: '0.1em' }}>
          {kicker.toUpperCase()}
        </span>
      </div>

      <div
        style={{
          fontSize: '64px',
          fontWeight: 700,
          lineHeight: 1.1,
          color: TEXT,
          display: 'flex',
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontSize: '24px',
          color: MUTED,
        }}
      >
        <span>Dawid Manikowski</span>
        <span style={{ color: ACCENT }}>lazydev.sh</span>
      </div>
    </div>
  );
}
