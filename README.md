# dtxdex1020.github.io

Portfolio of **Dex**, founder of [MintHost](https://minthost.org) and [MintBreeze](https://mintbreeze.org).
Live at **https://dtxdex1020.github.io**.

Hand-written HTML, CSS and vanilla JS modules. No framework, no bundler, no build step.

```
index.html        markup
styles.css        all styles (white + ice-blue, Syne / DM Sans)
js/main.js        entry point, wires everything up
js/highlight.js   tiny syntax highlighter (ts / json / html / css)
js/editor.js      hero editor that types TypeScript live
js/terminal.js    interactive terminal: history, tab completion, easter eggs
js/palette.js     Ctrl/Cmd+K command palette with fuzzy search
js/source.js      "view source" drawer that reads the site's own files
js/demos.js       lead-scoring playground, event stream, Zeltra cells
js/fx.js          dot field, cursor glow, scroll reveal
js/clock.js       live clock in America/New_York
```

Respects `prefers-reduced-motion`. To run locally: `python3 -m http.server` and open http://localhost:8000.
