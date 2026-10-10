// The little live demos inside each project.
import { highlight } from './highlight.js';

/* ── MintHost: a toy lead scorer that runs right here ── */
const SIGNALS = [
  ['price', /price|quote|cost|how much/i, 25],
  ['urgent', /today|asap|tonight|urgent/i, 30],
  ['booking', /book|appointment|slot|schedule/i, 35],
];

export function initLeadDemo({ reducedMotion }) {
  const msg = document.getElementById('leadMsg');
  const visits = document.getElementById('leadVisits');
  const visitsOut = document.getElementById('leadVisitsOut');
  const out = document.getElementById('leadOut');
  const meter = document.getElementById('leadMeter');
  const ms = document.getElementById('leadMs');
  if (!msg) return;

  let timer;
  const score = () => {
    const v = +visits.value;
    visitsOut.textContent = v;
    const matched = SIGNALS.filter(([, re]) => re.test(msg.value));
    const s = Math.min(Math.min(v * 4, 20) + matched.reduce((n, [, , w]) => n + w, 0), 99);
    const res = {
      score: s,
      temperature: s >= 70 ? 'hot' : s >= 40 ? 'warm' : 'cold',
      signals: matched.map(([name]) => name),
      next: s >= 70 ? 'offer_booking' : s >= 40 ? 'ask_follow_up' : 'nurture',
    };
    // keep arrays on one line, like a real API client would show them
    const json = JSON.stringify(res, null, 2).replace(/\[\s*([^\]]*?)\s*\]/g, (_, inner) => `[${inner.replace(/,\s+/g, ', ')}]`);
    out.innerHTML = highlight(json, 'json');
    visits.style.setProperty('--fill', `${(v / +visits.max) * 100}%`);
    meter.style.setProperty('--v', `${s}%`);
    meter.dataset.temp = res.temperature;
    ms.textContent = `${8 + Math.round(Math.random() * 9)} ms`;
  };
  const queue = () => {
    clearTimeout(timer);
    out.parentElement.classList.add('busy');
    timer = setTimeout(() => { score(); out.parentElement.classList.remove('busy'); }, reducedMotion ? 0 : 220);
  };
  msg.addEventListener('input', queue);
  visits.addEventListener('input', queue);
  score();
}

/* ── MintBreeze: an event stream that plays when scrolled into view ── */
const EVENTS = [
  ['call.incoming', 'Harbor Dental (demo) · +1 555-0142'],
  ['call.answered', '"Thanks for calling Harbor Dental, how can I help?"'],
  ['intent.detected', 'book · cleaning · "sometime Tuesday"'],
  ['calendar.hold', 'Tue 10:30 AM · 45 min'],
  ['sms.sent', 'confirmation → +1 555-0142'],
  ['digest.queued', 'added to tomorrow’s morning report'],
];

export function initStream({ reducedMotion }) {
  const list = document.getElementById('streamList');
  const replay = document.getElementById('streamReplay');
  if (!list) return;
  let run = 0;

  async function play() {
    const id = ++run;
    list.innerHTML = '';
    let t = 0;
    for (const [type, detail] of EVENTS) {
      if (id !== run) return;
      t += 300 + Math.round(Math.random() * 900);
      const li = document.createElement('li');
      li.innerHTML = `<time>+${(t / 1000).toFixed(1)}s</time><b>${type}</b><span>${detail}</span>`;
      list.appendChild(li);
      if (!reducedMotion) await new Promise((r) => setTimeout(r, 650));
    }
  }

  replay.addEventListener('click', play);
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); play(); } }, { threshold: 0.4 });
  io.observe(list.parentElement);
}

/* ── Zeltra: 28 cells, one per slash command ── */
export function initZeltra({ reducedMotion }) {
  const cells = document.getElementById('zCells');
  if (!cells) return;
  cells.innerHTML = Array.from({ length: 28 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
  if (reducedMotion) { cells.classList.add('lit'); return; }
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); cells.classList.add('lit'); } }, { threshold: 0.5 });
  io.observe(cells);
}

/* ── Stack: hover notes on values ── */
const NOTES = {
  '"TypeScript"': 'default for everything',
  '"Next.js"': 'MintHost + MintBreeze',
  '"Prisma"': 'schema first, always',
  '"PostgreSQL"': 'boring, on purpose',
  '"discord.js"': 'powers Zeltra',
  '"Railway"': 'where things run',
  '"founder"': 'and support inbox',
};

export function initStackNotes() {
  const code = document.getElementById('stackCode');
  if (!code) return;
  code.querySelectorAll('.t-str').forEach((s) => {
    const note = NOTES[s.textContent];
    if (note) { s.dataset.note = note; s.classList.add('noted'); s.tabIndex = 0; }
  });
}

/* ── copy email ── */
export function initCopy(toast) {
  document.getElementById('copyMail')?.addEventListener('click', async (e) => {
    const mail = e.currentTarget.dataset.mail;
    try { await navigator.clipboard.writeText(mail); toast(`copied ${mail}`); }
    catch { toast(mail); }
  });
}
