// A tiny hand-rolled syntax highlighter. No dependencies, ~100 lines.
// Each language is an ordered list of [className | classifyFn, stickyRegex].

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const TS_KEYWORDS = new Set(
  ('import export default from const let var function return async await for of in if else ' +
   'type interface as satisfies new class extends throw try catch typeof void this switch case break')
    .split(' ')
);
const LITERALS = new Set(['true', 'false', 'null', 'undefined']);
const PRIMITIVES = new Set(['string', 'number', 'boolean', 'unknown', 'never']);

// Regex literals are only legal after these characters (good enough for our snippets).
const REGEX_OK_AFTER = new Set(['', '(', '[', ',', '=', ':', '!', '&', '|', '?', '{', '}', ';']);

const prevSignificant = (src, i) => {
  for (let j = i - 1; j >= 0; j--) if (!/\s/.test(src[j])) return src[j];
  return '';
};
const nextSignificant = (src, i) => {
  for (let j = i; j < src.length; j++) if (!/[ \t]/.test(src[j])) return src[j];
  return '';
};

function classifyIdent(word, src, start, end) {
  if (TS_KEYWORDS.has(word)) return 'kw';
  if (LITERALS.has(word)) return 'lit';
  const before = prevSignificant(src, start);
  const after = nextSignificant(src, end);
  if (after === '(') return 'fn';
  if (before === '.') return 'prop';
  if (after === ':' && /[{,\n]/.test(prevSignificant(src, start) || '\n')) return 'key';
  if (/^[A-Z]/.test(word) || PRIMITIVES.has(word)) return 'type';
  return 'id';
}

const LANGS = {
  ts: [
    ['com', /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/y],
    ['str', /`(?:[^`\\]|\\.)*`?|"(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?/y],
    ['re', /\/(?![/*\s])(?:[^/\\\n[]|\\.|\[(?:[^\]\\\n]|\\.)*\])+\/[gimsuy]*/y,
      (src, i) => REGEX_OK_AFTER.has(prevSignificant(src, i))],
    ['num', /\b\d[\d_]*(?:\.\d+)?\b/y],
    [classifyIdent, /[A-Za-z_$][\w$]*/y],
    ['op', /=>|===|!==|\?\?|&&|\|\||[=+\-*<>!?]/y],
    ['pun', /[{}()[\];,.:]/y],
  ],
  json: [
    ['key', /"(?:[^"\\\n]|\\.)*"(?=\s*:)/y],
    ['str', /"(?:[^"\\\n]|\\.)*"?/y],
    ['num', /-?\b\d+(?:\.\d+)?\b/y],
    ['lit', /\b(?:true|false|null)\b/y],
    ['pun', /[{}[\],:]/y],
  ],
  html: [
    ['com', /<!--[\s\S]*?(?:-->|$)/y],
    ['kw', /<\/?[a-zA-Z][\w-]*|\/?>/y],
    ['str', /"[^"]*"?|'[^']*'?/y],
    ['prop', /[a-zA-Z-:]+(?==)/y],
    ['lit', /&[a-z#0-9]+;/y],
  ],
  css: [
    ['com', /\/\*[\s\S]*?(?:\*\/|$)/y],
    ['str', /"[^"\n]*"?|'[^'\n]*'?/y],
    ['kw', /@[\w-]+/y],
    ['prop', /--?[a-zA-Z][\w-]*(?=\s*:)|[a-z-]+(?=\s*:[^:])/y],
    ['num', /#[0-9a-fA-F]{3,8}\b|-?\b\d*\.?\d+(?:px|rem|em|%|s|ms|vh|vw|deg|fr)?\b/y],
    ['fn', /[a-z-]+(?=\()/y],
    ['pun', /[{}();:,]/y],
  ],
};

export function highlight(src, lang = 'ts') {
  const rules = LANGS[lang] || LANGS.ts;
  let out = '';
  let plain = '';
  let i = 0;
  const flush = () => { if (plain) { out += esc(plain); plain = ''; } };

  outer: while (i < src.length) {
    for (const [cls, re, guard] of rules) {
      re.lastIndex = i;
      const m = re.exec(src);
      if (!m || !m[0].length) continue;
      if (guard && !guard(src, i)) continue;
      const text = m[0];
      const name = typeof cls === 'function' ? cls(text, src, i, i + text.length) : cls;
      flush();
      out += name === 'id' ? esc(text) : `<span class="t-${name}">${esc(text)}</span>`;
      i += text.length;
      continue outer;
    }
    plain += src[i++];
  }
  flush();
  return out;
}

export function highlightAll(root = document) {
  root.querySelectorAll('code.hl').forEach((el) => {
    el.innerHTML = highlight(el.textContent, el.dataset.lang || 'ts');
  });
}
