// Dex's clock lives in America/New_York, wherever you are.
const TZ = 'America/New_York';

export function nowET(extra = {}) {
  return new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit', ...extra }).format(new Date());
}

export function initClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit', second: '2-digit' });
  const tick = () => { el.textContent = fmt.format(new Date()); el.dateTime = new Date().toISOString(); };
  tick();
  setInterval(tick, 1000);
}
