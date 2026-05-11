// Burger explosion — 60 scroll-driven frames.
// v3: canvas draw (zero flicker) + rAF lerp (smooth inertia).

(function () {
  const stage = document.querySelector('.burger-sticky');
  const section = document.querySelector('.burger-scroll');
  if (!stage || !section) return;

  const TOTAL = 60;
  const LERP  = 0.09;
  const src   = (i) => `video/frames/${String(i).padStart(2, '0')}.jpg`;

  // remove original video / frames
  const oldVideo = document.getElementById('burger-video');
  if (oldVideo) oldVideo.remove();
  const oldFrames = stage.querySelector('.burger-frames');
  if (oldFrames) oldFrames.remove();
  const oldBg = stage.querySelector('.burger-scene-bg');
  if (oldBg) oldBg.remove();

  const overlay = stage.querySelector('.burger-overlay');

  // ── scene bg ──────────────────────────────────────────────
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
    </div>`;
  stage.insertBefore(sceneBg, overlay);

  // ── canvas — same visual position as original .burger-frames img ──
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: absolute;
    top: 50%; left: 72%;
    transform: translate(-50%, -50%);
    width: auto; height: 84vh;
    max-width: 55vw;
    mix-blend-mode: multiply;
    filter: drop-shadow(0 30px 30px rgba(0,0,0,0.18));
    pointer-events: none;
  `;
  // on mobile: center + smaller (mirrors original media query)
  function applyMobileStyle() {
    if (window.innerWidth <= 900) {
      canvas.style.left   = '50%';
      canvas.style.height = '50vh';
      canvas.style.maxWidth = '90vw';
    } else {
      canvas.style.left   = '72%';
      canvas.style.height = '84vh';
      canvas.style.maxWidth = '55vw';
    }
  }
  applyMobileStyle();
  window.addEventListener('resize', applyMobileStyle);

  const frameWrap = document.createElement('div');
  frameWrap.className = 'burger-frames';
  frameWrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
  frameWrap.appendChild(canvas);
  stage.insertBefore(frameWrap, overlay);

  const ctx = canvas.getContext('2d');

  // ── preload all frames ─────────────────────────────────────
  const frames = new Array(TOTAL);
  let loadedCount = 0;
  let firstDrawn = false;

  function drawFrame(img) {
    canvas.width  = img.naturalWidth  || img.width  || 800;
    canvas.height = img.naturalHeight || img.height || 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }

  for (let i = 0; i < TOTAL; i++) {
    const im = new Image();
    im.onload = () => {
      loadedCount++;
      if (!firstDrawn && i === 0) { drawFrame(im); firstDrawn = true; }
    };
    im.src = src(i);
    frames[i] = im;
  }

  // ── rAF lerp loop ──────────────────────────────────────────
  let targetP  = 0;
  let smoothP  = 0;
  let drawnIdx = -1;
  let rafId    = null;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function getTarget() {
    const rect  = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    return clamp(-rect.top / total, 0, 1);
  }

  function updateUI(p) {
    const fill = document.querySelector('.burger-progress-fill');
    if (fill) fill.style.width = (p * 100) + '%';
    if (sceneBg) sceneBg.style.setProperty('--p', p);

    const cap   = document.querySelector('.burger-cap');
    const label = document.querySelector('.burger-stage-label');
    if (!cap || !label) return;

    const lang = document.documentElement.getAttribute('data-lang') || 'pt';
    const key  = p >= 0.66 ? '3' : p >= 0.33 ? '2' : '1';
    if (cap.dataset.stage === key) return;

    cap.dataset.stage = key;
    const labels = {
      '1': lang === 'pt' ? '01 · a construção' : '01 · the build',
      '2': lang === 'pt' ? '02 · a explosão'   : '02 · the explosion',
      '3': lang === 'pt' ? '03 · o smash'       : '03 · the smash'
    };
    label.textContent = labels[key];
    cap.querySelectorAll('[data-stage-caption]').forEach(c => {
      c.style.display = c.dataset.stageCaption === key ? 'block' : 'none';
    });
    document.querySelectorAll('.burger-anno[data-anno-stage]').forEach(a => {
      a.classList.toggle('on', a.dataset.annoStage === key);
    });
  }

  function tick() {
    smoothP += (targetP - smoothP) * LERP;

    const idx = clamp(Math.round(smoothP * (TOTAL - 1)), 0, TOTAL - 1);
    if (idx !== drawnIdx && frames[idx] && frames[idx].complete) {
      drawFrame(frames[idx]);
      drawnIdx = idx;
    }

    updateUI(smoothP);

    if (Math.abs(smoothP - targetP) > 0.0003) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  function onScroll() {
    targetP = getTarget();
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  targetP  = getTarget();
  smoothP  = targetP;
  rafId    = requestAnimationFrame(tick);
})();
