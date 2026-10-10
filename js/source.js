// "View source" drawer: fetches this site's own files and highlights them.
import { highlight } from './highlight.js';

const FILES = [
  ['index.html', 'html'],
  ['styles.css', 'css'],
  ['js/main.js', 'ts'],
  ['js/highlight.js', 'ts'],
  ['js/editor.js', 'ts'],
  ['js/terminal.js', 'ts'],
  ['js/palette.js', 'ts'],
  ['js/fx.js', 'ts'],
  ['js/demos.js', 'ts'],
  ['js/source.js', 'ts'],
  ['js/clock.js', 'ts'],
];

export function initSource() {
  const panel = document.getElementById('source');
  const tabs = document.getElementById('sourceTabs');
  const code = document.getElementById('sourceCode');
  const toggle = document.getElementById('sourceToggle');
  const cache = new Map();

  tabs.innerHTML = FILES.map(([f], i) => `<button data-i="${i}">${f}</button>`).join('');

  async function show(i) {
    const [file, lang] = FILES[i];
    tabs.querySelectorAll('button').forEach((b) => b.classList.toggle('on', +b.dataset.i === i));
    code.textContent = `loading ${file}…`;
    try {
      if (!cache.has(file)) cache.set(file, await fetch(file).then((r) => (r.ok ? r.text() : Promise.reject(r.status))));
      const src = cache.get(file);
      code.innerHTML = highlight(src, lang).split('\n').map((l) => `<span class="ln">${l}</span>`).join('\n');
      panel.querySelector('.source-body').scrollTop = 0;
    } catch {
      code.textContent = `couldn't load ${file}. it's on GitHub: github.com/dtxdex1020/dtxdex1020.github.io`;
    }
  }

  const set = (on) => {
    panel.hidden = !on;
    document.body.classList.toggle('source-open', on);
    toggle.setAttribute('aria-pressed', on);
    if (on && !code.dataset.loaded) { code.dataset.loaded = '1'; show(0); }
  };

  toggle.addEventListener('click', () => set(panel.hidden));
  document.getElementById('sourceClose').addEventListener('click', () => set(false));
  tabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) set(false); });

  return { toggle: () => set(panel.hidden) };
}
