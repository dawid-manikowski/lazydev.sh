// Plain object tree compatible with satori's expected input.
// No JSX / React runtime required.

export interface OgTemplateProps {
  title: string;
  kicker?: string;
}

const BG = '#0a0a0a';
const ACCENT = '#f59e0b';
const TEXT = '#e5e5e5';
const MUTED = '#888888';

type Style = Record<string, string | number>;

interface SatoriNode {
  type: string;
  props: {
    style?: Style;
    children?: SatoriNode | SatoriNode[] | string | undefined;
  };
}

function h(
  type: string,
  style: Style,
  ...children: (SatoriNode | string)[]
): SatoriNode {
  const kids =
    children.length === 0
      ? undefined
      : children.length === 1
        ? children[0]
        : children;
  const props: SatoriNode['props'] = { style };
  if (kids !== undefined) props.children = kids;
  return { type, props };
}

export function ogTemplate({ title, kicker = 'lazydev.sh' }: OgTemplateProps): SatoriNode {
  return h(
    'div',
    {
      width: '1200px',
      height: '630px',
      backgroundColor: BG,
      color: TEXT,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '80px',
      fontFamily: 'JetBrainsMono',
    },
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: '16px' },
      h('div', { width: '12px', height: '12px', backgroundColor: ACCENT }),
      h(
        'span',
        { fontSize: '28px', color: MUTED, letterSpacing: '0.1em' },
        kicker.toUpperCase()
      )
    ),
    h(
      'div',
      {
        fontSize: '64px',
        fontWeight: 700,
        lineHeight: 1.1,
        color: TEXT,
        display: 'flex',
      },
      title
    ),
    h(
      'div',
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        fontSize: '24px',
        color: MUTED,
      },
      h('span', {}, 'Dawid Manikowski'),
      h('span', { color: ACCENT }, 'lazydev.sh')
    )
  );
}
