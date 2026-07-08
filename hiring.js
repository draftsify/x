// Hiring board — read-only. Only verified companies post roles, so there is no
// composer. The feed is one flat list of role cards; each card carries the
// employer (logo + gold verified badge), modeled on X's job application card.

// ---- verified employers (inline SVG logos) ----
const X_GLYPH = '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
const TESLA_GLYPH = '<svg viewBox="0 0 24 24"><path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.639 5.038c-3.2 0-4.208.35-4.354 1.79 0 0-2.15-.801-3.231-2.438C5.28 2.427 9.525 2.336 9.525 2.336L12 5.362z"/></svg>';

const COMPANIES = {
  xai:       { name: 'xAI',       bg: '#0a0a0a', logo: X_GLYPH },
  tesla:     { name: 'Tesla',     bg: '#e82127', logo: TESLA_GLYPH },
  spacex:    { name: 'SpaceX',    bg: 'linear-gradient(135deg,#05070d,#12203b)', logo: 'SX' },
  neuralink: { name: 'Neuralink', bg: '#0a0a0a', logo: 'N' },
  x:         { name: 'X',         bg: '#000',    logo: X_GLYPH },
};

// ---- open roles ----
const JOBS = [
  { co: 'xai',       role: 'AI Research Engineer',        location: 'Palo Alto, CA',    salary: '$250K - $1.5M per year', cats: ['Research', 'Engineering'] },
  { co: 'tesla',     role: 'Autopilot Software Engineer', location: 'Palo Alto, CA',    salary: '$180K - $320K per year', cats: ['Engineering'] },
  { co: 'spacex',    role: 'Propulsion Engineer',         location: 'Hawthorne, CA',    salary: '$130K - $200K per year', cats: ['Engineering'] },
  { co: 'neuralink', role: 'Product Designer',            location: 'Remote',           salary: '$140K - $220K per year', cats: ['Design', 'Remote'] },
  { co: 'x',         role: 'Senior Frontend Engineer',    location: 'Remote',           salary: '$180K - $300K per year', cats: ['Engineering', 'Remote'] },
  { co: 'tesla',     role: 'Mechanical Design Engineer',  location: 'Fremont, CA',      salary: '$120K - $180K per year', cats: ['Design', 'Engineering'] },
  { co: 'xai',       role: 'Infrastructure Engineer',     location: 'San Francisco, CA',salary: '$220K - $600K per year', cats: ['Engineering'] },
  { co: 'x',         role: 'Product Manager',             location: 'San Francisco, CA',salary: '$200K - $350K per year', cats: ['Product'] },
  { co: 'spacex',    role: 'Avionics Technician',         location: 'Starbase, TX',     salary: '$90K - $140K per year',  cats: ['Operations'] },
  { co: 'neuralink', role: 'Firmware Engineer',           location: 'Fremont, CA',      salary: '$150K - $250K per year', cats: ['Engineering'] },
];

const FILTERS = ['For you', 'Engineering', 'Design', 'Product', 'Research', 'Operations', 'Remote'];

const BADGE_GOLD = '<svg class="badge" viewBox="0 0 22 22" aria-hidden="true"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4e72a"/><stop offset=".55" stop-color="#cd8105"/><stop offset="1" stop-color="#f4e72a"/></linearGradient></defs><path fill="url(#g)" d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"/></svg>';

const ICON_PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 11.5c-1.65 0-3-1.34-3-3s1.35-3 3-3c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/></svg>';
const ICON_BILL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M11.871 4.535c2.89-.377 5.91-.747 9.839.096l.79.169v14.795l-1.183-.22c-3.578-.664-6.31-.286-9.188.09-2.89.377-5.91.747-9.839-.095l-.79-.17V4.405l1.183.22c3.577.664 6.31.285 9.188-.09zM3.5 17.567c.874.154 1.699.24 2.49.282-.095-.92-1.039-2.05-2.49-2.05v1.768zm17-2.317c-1.41 0-2.343.879-2.48 1.772.788.022 1.612.083 2.48.2V15.25zm-8.5-6c-1.352 0-2.25 1.355-2.25 2.75 0 1.394.898 2.75 2.25 2.75 1.352 0 2.25-1.356 2.25-2.75 0-1.395-.898-2.75-2.25-2.75zm-8.5-.5c1.412 0 2.343-.88 2.48-1.775-.789-.02-1.612-.081-2.48-.198V8.75zm14.509-2.6c.093.919 1.039 2.05 2.491 2.05V6.432c-.875-.154-1.7-.242-2.491-.283z"/></svg>';

function jobCardHTML(job) {
  const c = COMPANIES[job.co];
  const [amt, per] = job.salary.split(/\s+per\s+/i);
  return `
  <a class="jcard" href="#" tabindex="0">
    <div class="jc-head">
      <div class="jc-emp">
        <div class="jc-logo" style="background:${c.bg}">${c.logo}</div>
        <div class="jc-name"><span>${c.name}</span>${BADGE_GOLD}</div>
      </div>
      <button class="jc-apply">Apply</button>
    </div>
    <div class="jc-role">${job.role}</div>
    <div class="jc-meta">
      <span class="jc-row">${ICON_PIN}<span>${job.location}</span></span>
      <span class="jc-dot">·</span>
      <span class="jc-row">${ICON_BILL}<span class="amt">${amt}</span>${per ? `<span>per ${per}</span>` : ''}</span>
    </div>
  </a>`;
}

let activeFilter = 'For you';

function renderFilters() {
  document.getElementById('filters').innerHTML = FILTERS
    .map((f) => `<button class="chip ${f === activeFilter ? 'active' : ''}" data-f="${f}">${f}</button>`)
    .join('');
}

function renderJobs() {
  const list = activeFilter === 'For you'
    ? JOBS
    : JOBS.filter((j) => j.cats.includes(activeFilter));
  document.getElementById('jobs').innerHTML = list.length
    ? `<div class="jobs-list">${list.map(jobCardHTML).join('')}</div>`
    : '<div class="jc-empty">No open roles in this category yet.</div>';
}

function initHiring() {
  renderFilters();
  renderJobs();
  document.getElementById('filters').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    activeFilter = chip.dataset.f;
    renderFilters();
    renderJobs();
  });
  document.getElementById('jobs').addEventListener('click', (e) => {
    if (e.target.closest('.jcard')) e.preventDefault();
  });
}
