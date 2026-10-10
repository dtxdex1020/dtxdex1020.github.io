// Ambient effects: the drifting dot field, the cursor glow, and scroll reveals.

export function initField({ reducedMotion }) {
  const canvas = document.getElementById('field');
  const ctx = canvas.getContext('2d');
  const GAP = 26;
  let w, h, dpr, cols, rows, raf;
  const mouse = { x: -9999, y: -9999 };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / GAP) + 1; rows = Math.ceil(h / GAP) + 1;
    if (reducedMotion) draw(0);
  };

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const time = t / 1000;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = x * GAP, py = y * GAP;
        // a slow diagonal swell, like wind over water
        const wave = Math.sin(px * 0.012 + py * 0.008 - time * 0.9) * 0.5 + 0.5;
        const dx = px - mouse.x, dy = py - mouse.y;
        const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 160);
        const r = 0.7 + wave * 0.7 + near * 1.6;
        ctx.fillStyle = `rgba(74,163,223,${0.12 + wave * 0.16 + near * 0.45})`;
        ctx.beginPath();
        ctx.arc(px, py + Math.sin(time * 0.8 + x * 0.35) * wave * 2, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const loop = (t) => { draw(t); raf = requestAnimationFrame(loop); };

  window.addEventListener('resize', resize);
  resize();
  if (reducedMotion) return;

  window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) raf = requestAnimationFrame(loop);
  });
  raf = requestAnimationFrame(loop);
}

export function initGlow({ reducedMotion }) {
  const glow = document.getElementById('glow');
  if (reducedMotion || !matchMedia('(pointer: fine)').matches) { glow.remove(); return; }
  let x = innerWidth / 2, y = innerHeight / 3, tx = x, ty = y;
  window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; glow.style.opacity = 1; }, { passive: true });
  document.addEventListener('pointerleave', () => { glow.style.opacity = 0; });
  (function follow() {
    x += (tx - x) * 0.12; y += (ty - y) * 0.12;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  })();
}

export function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    el.style.setProperty('--d', `${siblings.indexOf(el) * 70}ms`);
    io.observe(el);
  });
}
