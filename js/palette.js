// Ctrl/Cmd+K command palette with a tiny subsequence fuzzy matcher.

const fuzzy = (query, text) => {
  const q = query.toLowerCase().replace(/\s+/g, '');
  const t = text.toLowerCase();
  let ti = 0, score = 0, streak = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return -1;
    streak = found === ti ? streak + 1 : 0;
    score += 1 + streak * 2 - (found - ti) * 0.1;
    ti = found + 1;
  }
  return score;
};

export function initPalette(actions) {
  const root = document.getElementById('palette');
  const input = document.getElementById('paletteIn');
  const list = document.getElementById('paletteList');
  let items = actions;
  let active = 0;
  let lastFocus = null;

  const render = () => {
    list.innerHTML = items.length
      ? items.map((a, i) => `<li role="option" data-i="${i}" aria-selected="${i === active}" class="${i === active ? 'on' : ''}">
          <span class="g">${a.group}</span><span class="l">${a.label}</span><span class="h">${a.hint || ''}</span></li>`).join('')
      : '<li class="empty">nothing matches. try “work”.</li>';
    list.querySelector('.on')?.scrollIntoView({ block: 'nearest' });
  };

  const filter = () => {
    const q = input.value.trim();
    items = q
      ? actions.map((a) => [a, fuzzy(q, `${a.group} ${a.label} ${a.keywords || ''}`)])
          .filter(([, s]) => s >= 0).sort((a, b) => b[1] - a[1]).map(([a]) => a)
      : actions;
    active = 0;
    render();
  };

  const open = () => {
    lastFocus = document.activeElement;
    root.hidden = false;
    requestAnimationFrame(() => root.classList.add('open'));
    input.value = '';
    filter();
    input.focus();
  };
  const close = () => {
    root.classList.remove('open');
    root.hidden = true;
    lastFocus?.focus?.({ preventScroll: true });
  };
  const run = (i) => { const a = items[i]; if (!a) return; close(); a.run(); };

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      root.hidden ? open() : close();
    } else if (!root.hidden) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % Math.max(items.length, 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + items.length) % Math.max(items.length, 1); render(); }
      else if (e.key === 'Enter') { e.preventDefault(); run(active); }
    }
  });
  input.addEventListener('input', filter);
  list.addEventListener('click', (e) => { const li = e.target.closest('li[data-i]'); if (li) run(+li.dataset.i); });
  list.addEventListener('pointermove', (e) => {
    const li = e.target.closest('li[data-i]');
    if (li && +li.dataset.i !== active) { active = +li.dataset.i; render(); }
  });
  root.addEventListener('click', (e) => { if (e.target === root) close(); });

  return { open, close };
}
