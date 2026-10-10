// A small fake shell: commands, history (↑/↓), tab completion, and a couple of eggs.
import { nowET } from './clock.js';

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const link = (href, label = href.replace(/^https?:\/\/|^mailto:/, '')) =>
  `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;

const bootedAt = Date.now();
const uptime = () => {
  const s = Math.floor((Date.now() - bootedAt) / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
};

const FILES = {
  'about.md': `Dex. Founder of MintHost and MintBreeze.
I build AI-powered tools for small businesses, plus Discord bots.
Product, code, database, infra, support inbox: all of it.`,
  'projects.json': `{
  "minthost":   "https://minthost.org",
  "mintbreeze": "https://mintbreeze.org",
  "zeltra":     "discord bot, private source"
}`,
  '.secrets': 'nice try.',
  'todo.txt': `- answer every support email
- ship the small version
- touch grass (pending)`,
};

const NEOFETCH_ART = [
  '         /\\                ',
  '        /  \\     /\\        ',
  '       / /\\ \\   /  \\       ',
  '      / /  \\ \\_/ /\\ \\      ',
  '     /_/    \\___/  \\_\\     ',
  '                           ',
  '   ~~~~~~~~~~~~~~~~~~~~~   ',
  '     ~~~~~~~~~~~~~~~~~     ',
];

const COMMANDS = {
  help: {
    desc: 'list commands',
    run: () => `<span class="t-dim">available commands</span>
${Object.entries(COMMANDS)
  .filter(([, c]) => !c.hidden)
  .map(([n, c]) => `  <b>${n.padEnd(10)}</b><span class="t-dim">${c.desc}</span>`)
  .join('\n')}
<span class="t-dim">there are also a few things this list won't tell you.</span>`,
  },
  whoami: {
    desc: 'who is this',
    run: () => `<b>dex</b>, founder of ${link('https://minthost.org', 'MintHost')} and ${link('https://mintbreeze.org', 'MintBreeze')}.
Builds AI-powered tools for small businesses, plus Discord bots.
Writes TypeScript. Answers his own support inbox.`,
  },
  projects: {
    desc: 'what I run',
    run: () => `<b>01  MintHost</b>     lead generation + booking      ${link('https://minthost.org')}
<b>02  MintBreeze</b>   receptionist + assistant       ${link('https://mintbreeze.org')}
<b>03  Zeltra</b>       discord bot, 28 slash commands  <span class="t-dim">(private source)</span>`,
  },
  skills: {
    desc: 'the stack',
    run: () => `<span class="t-kw">languages</span>   TypeScript, JavaScript, SQL, HTML, CSS
<span class="t-kw">frameworks</span>  Next.js, React, Tailwind CSS
<span class="t-kw">backend</span>     Node.js, Prisma, PostgreSQL
<span class="t-kw">bots</span>        discord.js
<span class="t-kw">ops</span>         Railway, Docker, Git`,
  },
  contact: {
    desc: 'say hi',
    run: () => `email   ${link('mailto:support.minthost@gmail.com')}
github  ${link('https://github.com/dtxdex1020')}
web     ${link('https://minthost.org')} · ${link('https://mintbreeze.org')}`,
  },
  open: {
    desc: 'open minthost | mintbreeze | github',
    args: ['minthost', 'mintbreeze', 'github'],
    run: ([target]) => {
      const urls = { minthost: 'https://minthost.org', mintbreeze: 'https://mintbreeze.org', github: 'https://github.com/dtxdex1020' };
      if (!urls[target]) return `usage: open <span class="t-dim">minthost | mintbreeze | github</span>`;
      window.open(urls[target], '_blank', 'noopener');
      return `opening ${link(urls[target])} …`;
    },
  },
  ls: {
    desc: 'list files',
    args: ['-la'],
    run: (args) => {
      if (args.includes('-la') || args.includes('-a')) {
        return `total 4
drwxr-xr-x  dex  staff   .
drwxr-xr-x  dex  staff   ..
-rw-------  dex  staff   <span class="t-err">.secrets</span>
-rw-r--r--  dex  staff   about.md
-rw-r--r--  dex  staff   projects.json
-rw-r--r--  dex  staff   todo.txt`;
      }
      return 'about.md  projects.json  todo.txt';
    },
  },
  cat: {
    desc: 'read a file',
    args: Object.keys(FILES),
    run: ([f]) => (f in FILES ? esc(FILES[f]) : `cat: ${esc(f || '')}: no such file`),
  },
  neofetch: {
    desc: 'system info',
    run: () => {
      const info = [
        '<b class="t-key">dex</b>@<b class="t-key">mintbreeze</b>',
        '<span class="t-dim">──────────────</span>',
        `<b>role</b>     founder`,
        `<b>ships</b>    MintHost, MintBreeze, Zeltra`,
        `<b>lang</b>     TypeScript`,
        `<b>shell</b>    dexsh (handmade)`,
        `<b>time</b>     ${nowET()} ET`,
        `<b>uptime</b>   ${uptime()} on this page`,
      ];
      return NEOFETCH_ART.map((l, i) => `<span class="t-fn">${esc(l)}</span>${info[i] || ''}`).join('\n') +
        '\n' + ' '.repeat(27) + ['#f5faff', '#eaf4fc', '#cfe3f3', '#4aa3df', '#1f4e79'].map((c) => `<i class="swatch" style="background:${c}"></i>`).join('');
    },
  },
  date: { desc: 'current time (ET)', run: () => `${nowET({ weekday: 'short', month: 'short', day: 'numeric' })} ET` },
  echo: { desc: 'say something', run: (args) => esc(args.join(' ')) },
  history: { desc: 'past commands', run: (_, t) => t.history.map((h, i) => `${String(i + 1).padStart(3)}  ${esc(h)}`).join('\n') || '(empty)' },
  clear: { desc: 'clear screen', run: (_, t) => { t.out.innerHTML = ''; return null; } },
  sudo: {
    hidden: true,
    args: ['hire dex'],
    run: (args) => {
      if (args.join(' ') === 'hire dex') {
        return `[sudo] password for you: ********
<span class="t-str">✓ permission granted.</span>
drafting email to support.minthost@gmail.com …
${link('mailto:support.minthost@gmail.com?subject=Let%27s%20build%20something', '→ open the draft')}`;
      }
      if (args.join(' ').startsWith('rm')) return '<span class="t-err">absolutely not.</span>';
      return 'you are not in the sudoers file. This incident will be reported. (try: sudo hire dex)';
    },
  },
  exit: { hidden: true, run: () => 'there is no escape. (try <b>clear</b>)' },
  vim: { hidden: true, run: () => 'you are now trapped in vim. just kidding. <span class="t-dim">:q</span>' },
  coffee: { hidden: true, run: () => '   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   `----\'  brewing…' },
};

export function initTerminal({ onNavigate }) {
  const out = document.getElementById('termOut');
  const form = document.getElementById('termForm');
  const input = document.getElementById('termIn');
  const term = document.getElementById('term');
  if (!out) return;

  const state = { out, history: [], cursor: 0 };

  const print = (html, cls = '') => {
    const div = document.createElement('div');
    div.className = `line ${cls}`;
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  };
  const echoPrompt = (cmd) =>
    print(`<span class="u">dex@mintbreeze</span><span class="c">:</span><span class="p">~</span><span class="c">$</span> ${esc(cmd)}`, 'cmd');

  function exec(raw) {
    const cmd = raw.trim();
    echoPrompt(cmd);
    if (!cmd) return;
    state.history.push(cmd);
    state.cursor = state.history.length;
    const [name, ...args] = cmd.split(/\s+/);
    const c = COMMANDS[name.toLowerCase()];
    if (!c) {
      const jump = ['work', 'stack', 'contact'].find((s) => s === name.toLowerCase().replace(/^cd\s*/, ''));
      if (name === 'cd' && args[0]) {
        const target = args[0].replace(/^~\//, '');
        if (['work', 'stack', 'contact', 'terminal'].includes(target)) { onNavigate?.(target); print(`→ ~/${esc(target)}`); return; }
        print(`cd: ${esc(args[0])}: try work, stack or contact`); return;
      }
      if (jump) { onNavigate?.(jump); return; }
      print(`<span class="t-err">command not found:</span> ${esc(name)}. type <b>help</b>.`);
      return;
    }
    const result = c.run(args, state);
    if (result !== null && result !== undefined) print(result);
  }

  function complete() {
    const val = input.value;
    const parts = val.split(' ');
    let pool;
    if (parts.length === 1) {
      pool = [...Object.keys(COMMANDS), 'cd'].filter((n) => n.startsWith(parts[0]));
      if (pool.length === 1) { input.value = pool[0] + ' '; return; }
    } else {
      const c = COMMANDS[parts[0]];
      const rest = parts.slice(1).join(' ');
      const options = parts[0] === 'cd' ? ['work', 'stack', 'contact'] : c?.args || [];
      pool = options.filter((a) => a.startsWith(rest));
      if (pool.length === 1) { input.value = `${parts[0]} ${pool[0]}`; return; }
    }
    if (pool.length > 1) { echoPrompt(val); print(pool.join('   '), 'dim'); }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    exec(input.value);
    input.value = '';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') { e.preventDefault(); complete(); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (state.cursor > 0) input.value = state.history[--state.cursor];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.cursor = Math.min(state.cursor + 1, state.history.length);
      input.value = state.history[state.cursor] ?? '';
    } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); out.innerHTML = ''; }
  });

  term.addEventListener('click', (e) => {
    if (!e.target.closest('a') && !window.getSelection().toString()) input.focus({ preventScroll: true });
  });

  document.getElementById('termQuick')?.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) { exec(b.textContent); }
  });

  print(`dexsh 1.0  <span class="t-dim">·  ${nowET({ weekday: 'short', month: 'short', day: 'numeric' })} ET</span>
type <b>help</b> to see what this thing can do.`);

  return { exec, focus: () => input.focus() };
}
