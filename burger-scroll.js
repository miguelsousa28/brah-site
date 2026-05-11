// Burger explosion — 60 scroll-driven frames.
// Preloads all frames; uses ONE <img> and snaps src for a flash-free swap.
// Minimal, on-brand overlay: one Caveat annotation per stage.

(function () {
  const stage = document.querySelector('.burger-sticky');
  const section = document.querySelector('.burger-scroll');
  if (!stage || !section) return;

  const TOTAL = 60;
  const frameSrc = (i) => `video/frames/${String(i).padStart(2, '0')}.jpg`;

  const oldVideo = document.getElementById('burger-video');
  if (oldVideo) oldVideo.remove();
  const oldFrames = stage.querySelector('.burger-frames');
  if (oldFrames) oldFrames.remove();
  const oldBg = stage.querySelector('.burger-scene-bg');
  if (oldBg) oldBg.remove();

  const overlay = stage.querySelector('.burger-overlay');

  // editorial backdrop — just a faint ring + one rotating annotation per stage
  const sceneBg = document.createElement('div');
  sceneBg.className = 'burger-scene-bg';
  sceneBg.innerHTML = `
    <div class="burger-rays"></div>
    <div class="burger-anno" data-anno-stage="1">
      <svg width="180" height="50" viewBox="0 0 180 50" fill="none" aria-hidden="true">
        <path d="M5 12 Q 90 8, 160 30 L 172 26 M 160 30 L 165 40" stroke="#0E0E0E" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
      <span class="anno-text">pão brioche, fresco hoje</span>
    </div>
    <div class="burger-anno" data-anno-stage="2">
      <svg width="200" height="40" viewBox="0 0 200 40" fill="none" aria-hidden="true">
        <path d="M5 20 L 180 20 M 180 20 L 170 12 M 180 20 L 170 28" stroke="#E94E3A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      </svg>
      <span class="anno-text coral">cada camada · à sua maneira</span>
    </div>
    <div class="burger-anno" data-anno-stage="3">
      <svg width="160" height="50" viewBox="0 0 160 50" fill="none" aria-hidden="true">
        <path d="M5 35 Q 60 42, 120 18 L 132 14 M 120 18 L 125 28" stroke="#0E0E0E" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
      <span class="anno-text">crosta · caramelizada</span>
    </div>
  `;
  stage.insertBefore(sceneBg, overlay);

  // single img, snap-swap. preload everything into the browser cache first.
  const frameWrap = document.createElement('div');
  frameWrap.className = 'burger-frames';
  const img = document.createElement('img');
  img.alt = '';
  img.decoding = 'sync';
  img.classList.add('on');
  frameWrap.appendChild(img);
  stage.insertBefore(frameWrap, overlay);

  const cache = new Array(TOTAL);
  let loaded = 0;
  for (let i = 0; i < TOTAL; i++) {
    const im = new Image();
    im.onload = () => { loaded++; };
    im.src = frameSrc(i);
    cache[i] = im;
  }
  img.src = frameSrc(0);
  let currentIdx = 0;

  function setFrame(idx) {
    if (idx === currentIdx) return;
    img.src = cache[idx].src;
    currentIdx = idx;
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function updateScroll() {
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = clamp(scrolled / total, 0, 1);

    const idx = Math.min(TOTAL - 1, Math.round(progress * (TOTAL - 1)));
    setFrame(idx);

    if (sceneBg) sceneBg.style.setProperty('--p', progress);

    const fill = document.querySelector('.burger-progress-fill');
    if (fill) fill.style.width = (progress * 100) + '%';

    const cap = document.querySelector('.burger-cap');
    const label = document.querySelector('.burger-stage-label');
    if (cap && label) {
      const lang = document.documentElement.getAttribute('data-lang') || 'pt';
      let stageKey = '1';
      if (progress >= 0.66) stageKey = '3';
      else if (progress >= 0.33) stageKey = '2';
      cap.dataset.stage = stageKey;
      const labels = {
        '1': lang === 'pt' ? '01 · a construção' : '01 · the build',
        '2': lang === 'pt' ? '02 · a explosão' : '02 · the explosion',
        '3': lang === 'pt' ? '03 · o smash' : '03 · the smash'
      };
      label.textContent = labels[stageKey];
      cap.querySelectorAll('[data-stage-caption]').forEach(c => {
        c.style.display = c.dataset.stageCaption === stageKey ? 'block' : 'none';
      });
      document.querySelectorAll('.burger-anno[data-anno-stage]').forEach(a => {
        a.classList.toggle('on', a.dataset.annoStage === stageKey);
      });
    }
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll);
  updateScroll();
})();
