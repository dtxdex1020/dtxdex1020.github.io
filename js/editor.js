// The hero editor: types TypeScript out live, re-highlighting on every keystroke.
import { highlight } from './highlight.js';

const FILES = [
  {
    name: 'score-lead.ts',
    dir: '~/minthost/lib',
    code: `type Lead = { text: string; visits: number };

// words that usually mean "ready to buy"
const signals = [
  [/price|quote|cost/i, 25],
  [/today|asap|tonight/i, 30],
  [/book|appointment|slot/i, 35],
] as const;

export function scoreLead(lead: Lead) {
  let score = Math.min(lead.visits * 4, 20);
  for (const [re, weight] of signals) {
    if (re.test(lead.text)) score += weight;
  }
  return Math.min(score, 99);
}`,
  },
  {
    name: 'slowmode.ts',
    dir: '~/zeltra/commands',
    code: `import { command, opt } from "../lib/cmd";

export default command({
  name: "slowmode",
  description: "Cool a channel down",
  perms: ["ManageChannels"],
  options: {
    seconds: opt.int({ max: 21600 }),
    reason: opt.string().optional(),
  },
  async run({ channel, args, cases }) {
    const s = args.seconds;
    await channel.setRateLimitPerUser(s);
    await cases.log("slowmode", args);
    return \`slowmode: \${s}s\`;
  },
});`,
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function initEditor({ reducedMotion }) {
  const codeEl = document.getElementById('editorCode');
  const gutter = document.getElementById('editorGutter');
  const tabsEl = document.getElementById('editorTabs');
  const fileEl = document.getElementById('editorFile');
  const posEl = document.getElementById('editorPos');
  if (!codeEl) return;

  const maxLines = Math.max(...FILES.map((f) => f.code.split('\n').length));
  codeEl.parentElement.style.setProperty('--lines', maxLines);
  gutter.style.setProperty('--lines', maxLines);

  let run = 0; // bumps whenever the user switches tabs, cancelling the old loop
  let current = 0;

  const tabs = FILES.map((f, i) => {
    const b = document.createElement('button');
    b.className = 'tab';
    b.setAttribute('role', 'tab');
    b.textContent = f.name;
    b.addEventListener('click', () => { if (i !== current) play(i); });
    tabsEl.appendChild(b);
    return b;
  });

  const render = (text, done) => {
    const lines = text.split('\n');
    codeEl.innerHTML = highlight(text, 'ts') + (done ? '' : '<span class="caret"></span>');
    gutter.innerHTML = lines.map((_, i) => `<span${i === lines.length - 1 ? ' class="on"' : ''}>${i + 1}</span>`).join('');
    posEl.textContent = `Ln ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
  };

  // Phones type faster so the box never sits half-empty for long.
  const narrow = window.matchMedia('(max-width: 760px)');

  async function play(index, prefill = 0) {
    const id = ++run;
    current = index;
    const file = FILES[index];
    tabs.forEach((t, i) => { t.classList.toggle('on', i === index); t.setAttribute('aria-selected', i === index); });
    fileEl.textContent = file.dir;

    if (reducedMotion) { render(file.code, true); return; }

    const src = file.code;
    // Start partway in (first load only) so the editor is never an empty box.
    let i = 0;
    for (let n = 0; n < prefill; n++) i = src.indexOf('\n', i) + 1;
    if (i) render(src.slice(0, i));
    const pace = narrow.matches ? 0.55 : 1;
    while (i < src.length) {
      if (id !== run) return;
      // auto-indent: jump over leading whitespace like a real editor would
      if (src[i - 1] === '\n') while (src[i] === ' ') i++;
      i++;
      render(src.slice(0, i));
      const ch = src[i - 1];
      await sleep(pace * (ch === '\n' ? 140 : /[,;{(]/.test(ch) ? 70 : 16 + Math.random() * 34));
    }
    render(src, false);
    await sleep(4200);
    if (id === run) play((index + 1) % FILES.length);
  }

  // Paint the first few lines right away, then start typing once it's on screen.
  const PREFILL = 4;
  const first = FILES[0].code.split('\n').slice(0, PREFILL).join('\n') + '\n';
  tabs[0].classList.add('on');
  tabs[0].setAttribute('aria-selected', true);
  if (!reducedMotion) render(first);
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { io.disconnect(); play(0, PREFILL); }
  }, { rootMargin: '0px 0px 120px 0px' });
  io.observe(codeEl);
}
