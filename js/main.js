// Entry point. Every module is plain ES, served as-is: no bundler, no build step.
import { highlightAll } from './highlight.js';
import { initEditor } from './editor.js';
import { initTerminal } from './terminal.js';
import { initPalette } from './palette.js';
import { initSource } from './source.js';
import { initClock } from './clock.js';
import { initField, initGlow, initReveal } from './fx.js';
import { initLeadDemo, initStream, initZeltra, initStackNotes, initCopy } from './demos.js';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const opts = { reducedMotion };

const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
if (!isMac) document.querySelectorAll('kbd.mod').forEach((k) => { k.textContent = 'Ctrl'; });

const toastEl = document.getElementById('toast');
let toastTimer;
const toast = (text) => {
  toastEl.textContent = text;
  toastEl.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('on'), 1800);
};

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });

highlightAll();
initStackNotes();
initClock();
initField(opts);
initGlow(opts);
initReveal();
initEditor(opts);
initLeadDemo(opts);
initStream(opts);
initZeltra(opts);
initCopy(toast);
const source = initSource();
const terminal = initTerminal({ onNavigate: go });

const palette = initPalette([
  { group: 'go', label: 'Top', hint: '↑', run: () => go('top') },
  { group: 'go', label: 'Terminal', hint: '~/terminal', keywords: 'shell cli', run: () => { go('terminal'); setTimeout(() => terminal?.focus(), reducedMotion ? 0 : 600); } },
  { group: 'go', label: 'Work', hint: '~/work', keywords: 'projects', run: () => go('work') },
  { group: 'go', label: 'Open source', hint: '~/open-source', keywords: 'oss github repos', run: () => go('oss') },
  { group: 'go', label: 'Stack', hint: '~/stack', keywords: 'skills', run: () => go('stack') },
  { group: 'go', label: 'Contact', hint: '~/contact', keywords: 'email', run: () => go('contact') },
  { group: 'go', label: 'Changelog', hint: '~/changelog.md', keywords: 'log history', run: () => go('changelog') },
  { group: 'do', label: 'Copy email', hint: 'support.minthost@gmail.com', run: async () => { try { await navigator.clipboard.writeText('support.minthost@gmail.com'); toast('copied support.minthost@gmail.com'); } catch { toast('support.minthost@gmail.com'); } } },
  { group: 'do', label: 'Toggle view source', hint: '</>', keywords: 'code', run: () => source.toggle() },
  { group: 'do', label: 'Run neofetch', hint: 'terminal', run: () => { go('terminal'); terminal?.exec('neofetch'); } },
  { group: 'open', label: 'minthost.org', hint: '↗', run: () => window.open('https://minthost.org', '_blank', 'noopener') },
  { group: 'open', label: 'mintbreeze.org', hint: '↗', run: () => window.open('https://mintbreeze.org', '_blank', 'noopener') },
  { group: 'open', label: 'GitHub', hint: '↗', keywords: 'dtxdex1020', run: () => window.open('https://github.com/dtxdex1020', '_blank', 'noopener') },
]);
document.getElementById('paletteOpen').addEventListener('click', palette.open);

const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

document.getElementById('year').textContent = new Date().getFullYear();

console.log('%c hey, you opened the console. ', 'background:#4aa3df;color:#fff;border-radius:4px;padding:2px 4px',
  '\nthe whole site is hand-written vanilla JS. press the </> button for the source.');
