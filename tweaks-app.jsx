// Tweaks app for Brah Smash Burger
// Lets the user swap palettes live.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#E94E3A", "#F2EBDC", "#0E0E0E", "#F5C542"]
}/*EDITMODE-END*/;

// palette = [primary, background, ink, accent]
const PALETTES = [
  // 0 — Brah Original (coral / cream / ink / cheese)
  ["#E94E3A", "#F2EBDC", "#0E0E0E", "#F5C542"],
  // 1 — Sunset Surf (deep orange / sand / espresso / lime)
  ["#F26B1F", "#F4E3C7", "#2B1A10", "#C9D85A"],
  // 2 — Ocean Brah (teal / cream / navy / coral)
  ["#0E8A8A", "#F0EAD8", "#0B1F33", "#E94E3A"],
  // 3 — Mustard & Ink (cheese yellow / cream / ink / coral)
  ["#E8B43A", "#F2EBDC", "#0E0E0E", "#E94E3A"],
  // 4 — Cherry Soda (pink red / butter / aubergine / pistachio)
  ["#E63764", "#FBE9C2", "#2A0E2A", "#9BD17A"],
  // 5 — Mono Char (charcoal / off-white / black / hot pink accent)
  ["#1a1a1a", "#EDE8DC", "#0E0E0E", "#FF3D70"]
];

function applyPalette(palette) {
  const [primary, bg, ink, accent] = palette;
  const r = document.documentElement.style;
  r.setProperty('--coral', primary);
  // shade a tiny bit darker for hover states (mix with black 12%)
  r.setProperty('--coral-deep', mix(primary, '#000', 0.18));
  r.setProperty('--cream', bg);
  r.setProperty('--cream-warm', mix(bg, '#000', 0.04));
  r.setProperty('--ink', ink);
  r.setProperty('--ink-soft', mix(ink, '#fff', 0.08));
  r.setProperty('--cheese', accent);
}

// mix two hex colors. t = 0 returns a, t = 1 returns b
function mix(a, b, t) {
  const pa = parseHex(a), pb = parseHex(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return '#' + [r, g, bl].map(n => n.toString(16).padStart(2, '0')).join('');
}
function parseHex(h) {
  const x = h.replace('#', '');
  const v = x.length === 3 ? x.replace(/./g, c => c + c) : x;
  return [parseInt(v.slice(0,2),16), parseInt(v.slice(2,4),16), parseInt(v.slice(4,6),16)];
}

const PALETTE_NAMES = [
  'Brah OG',
  'Sunset Surf',
  'Ocean Brah',
  'Mustard & Ink',
  'Cherry Soda',
  'Mono Char'
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply on every render
  React.useEffect(() => {
    applyPalette(t.palette);
  }, [t.palette]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Color Palette">
        <TweakColor
          label="Palette"
          value={t.palette}
          options={PALETTES}
          onChange={(v) => setTweak('palette', v)}
        />
        <div style={{
          fontSize: 10.5,
          color: 'rgba(41,38,27,.6)',
          marginTop: 2,
          letterSpacing: '0.02em'
        }}>
          {PALETTE_NAMES[PALETTES.findIndex(p =>
            JSON.stringify(p).toLowerCase() === JSON.stringify(t.palette).toLowerCase()
          )] || 'Custom'}
        </div>
      </TweakSection>
    </TweaksPanel>
  );
}

// mount
const mountEl = document.createElement('div');
document.body.appendChild(mountEl);
ReactDOM.createRoot(mountEl).render(<App />);

// apply initial palette immediately (in case panel hasn't opened)
applyPalette(TWEAK_DEFAULTS.palette);
