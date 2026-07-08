// Hiring board — read-only. Only verified companies post roles, so there is no
// composer. The feed is one flat list of role cards; each card carries the
// employer (logo + gold verified badge), modeled on X's job application card.

// ---- verified employers (inline SVG logos) ----
const X_GLYPH = '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
const TESLA_GLYPH = '<svg viewBox="0 0 24 24"><path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.639 5.038c-3.2 0-4.208.35-4.354 1.79 0 0-2.15-.801-3.231-2.438C5.28 2.427 9.525 2.336 9.525 2.336L12 5.362z"/></svg>';

const COMPANIES = {
  xai:       { name: 'xAI',            bg: '#0a0a0a', logo: X_GLYPH },
  tesla:     { name: 'Tesla',          bg: '#e82127', logo: TESLA_GLYPH },
  spacex:    { name: 'SpaceX',         bg: 'linear-gradient(135deg,#05070d,#12203b)', logo: 'SX' },
  neuralink: { name: 'Neuralink',      bg: '#0a0a0a', logo: 'N' },
  x:         { name: 'X',              bg: '#000',    logo: X_GLYPH },
  sesame:    { name: 'Sesame',         bg: '#5c6bc0', logo: 'SE' },
  character: { name: 'Character.AI',   bg: '#6d4aff', logo: 'CA' },
  hume:      { name: 'Hume AI',        bg: '#ff6d3f', logo: 'H' },
  conductor: { name: 'Conductor',      bg: '#0e7490', logo: 'CO' },
  shift:     { name: 'Shift',          bg: '#334155', logo: 'SH' },
  oku:       { name: 'Oku Trade',      bg: '#0f766e', logo: 'OK' },
  ashby:     { name: 'Ashby',          bg: '#18181b', logo: 'A' },
  kalshi:    { name: 'Kalshi',         bg: '#00a15c', logo: 'K' },
  agi:       { name: 'AGI, Inc.',      bg: '#1f2937', logo: 'AGI' },
  primer:    { name: 'Primer',         bg: '#7c3aed', logo: 'P' },
  moment:    { name: 'Moment',         bg: '#0ea5e9', logo: 'M' },
  tria:      { name: 'Tria',           bg: '#e11d48', logo: 'T' },
  adapt:     { name: 'Adapt',          bg: '#2563eb', logo: 'AD' },
  superw:    { name: 'superwhisper',   bg: '#0a0a0a', logo: 'SW' },
  fuse:      { name: 'Fuse Energy',    bg: '#f59e0b', logo: 'F' },
  notion:    { name: 'Notion',         bg: '#111',    logo: 'N' },
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

  // Product Designer roles across verified companies (from X's job board)
  { co: 'xai',       role: 'Product Designer',        location: 'Palo Alto, United States',          salary: '$180K - $440K per year', cats: ['Design', 'Product'] },
  { co: 'sesame',    role: 'Product Designer',        location: 'San Francisco',                     salary: '$175K - $280K per year', cats: ['Design', 'Product'] },
  { co: 'character', role: 'Product Designer',        location: 'Redwood City, California',          salary: '$150K - $300K per year', cats: ['Design', 'Product'] },
  { co: 'hume',      role: 'Product Designer',        location: 'New York, NY',                      salary: '$120K - $170K per year', cats: ['Design', 'Product'] },
  { co: 'conductor', role: 'Product Designer',        location: 'San Francisco',                     salary: '$175K - $300K per year', cats: ['Design', 'Product'] },
  { co: 'shift',     role: 'Product Designer',        location: 'San Francisco, CA',                 salary: '$130K - $150K per year', cats: ['Design', 'Product'] },
  { co: 'oku',       role: 'Product Designer',        location: 'Chicago or remote (North America)', salary: '$50K - $100K per year',  cats: ['Design', 'Product', 'Remote'] },
  { co: 'ashby',     role: 'Senior Product Designer', location: 'Remote - North America',            salary: '$180K - $210K per year', cats: ['Design', 'Product', 'Remote'] },
  { co: 'superw',    role: 'Product Designer',        location: 'Toronto',                           salary: '$100K - $220K per year', cats: ['Design', 'Product'] },
  { co: 'kalshi',    role: 'Product Designer',        location: 'New York, New York',                salary: '',                        cats: ['Design', 'Product'] },
  { co: 'agi',       role: 'Product Designer',        location: 'San Francisco Office',              salary: '',                        cats: ['Design', 'Product'] },
  { co: 'primer',    role: 'Product Designer',        location: 'San Francisco, CA',                 salary: '',                        cats: ['Design', 'Product'] },
  { co: 'moment',    role: 'Product Designer',        location: 'New York, United States',           salary: '',                        cats: ['Design', 'Product'] },
  { co: 'tria',      role: 'Product Designer',        location: 'Remote',                            salary: '',                        cats: ['Design', 'Product', 'Remote'] },
  { co: 'adapt',     role: 'Product Designer',        location: 'San Francisco, CA (The Presidio)',  salary: '',                        cats: ['Design', 'Product'] },
  { co: 'fuse',      role: 'Product Designer',        location: 'London, United Kingdom',            salary: '',                        cats: ['Design', 'Product'] },
  { co: 'notion',    role: 'Product Designer',        location: 'San Francisco; New York',           salary: '',                        cats: ['Design', 'Product'] },
];

const FILTERS = ['For you', 'Engineering', 'Design', 'Product', 'Research', 'Operations', 'Remote'];

const BADGE_GOLD = '<svg class="badge" viewBox="0 0 22 22" aria-hidden="true"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4e72a"/><stop offset=".55" stop-color="#cd8105"/><stop offset="1" stop-color="#f4e72a"/></linearGradient></defs><path fill="url(#g)" d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"/></svg>';

const ICON_PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 11.5c-1.65 0-3-1.34-3-3s1.35-3 3-3c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/></svg>';
const ICON_BILL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M11.871 4.535c2.89-.377 5.91-.747 9.839.096l.79.169v14.795l-1.183-.22c-3.578-.664-6.31-.286-9.188.09-2.89.377-5.91.747-9.839-.095l-.79-.17V4.405l1.183.22c3.577.664 6.31.285 9.188-.09zM3.5 17.567c.874.154 1.699.24 2.49.282-.095-.92-1.039-2.05-2.49-2.05v1.768zm17-2.317c-1.41 0-2.343.879-2.48 1.772.788.022 1.612.083 2.48.2V15.25zm-8.5-6c-1.352 0-2.25 1.355-2.25 2.75 0 1.394.898 2.75 2.25 2.75 1.352 0 2.25-1.356 2.25-2.75 0-1.395-.898-2.75-2.25-2.75zm-8.5-.5c1.412 0 2.343-.88 2.48-1.775-.789-.02-1.612-.081-2.48-.198V8.75zm14.509-2.6c.093.919 1.039 2.05 2.491 2.05V6.432c-.875-.154-1.7-.242-2.491-.283z"/></svg>';

function jobCardHTML(job) {
  const c = COMPANIES[job.co];
  const [amt, per] = (job.salary || '').split(/\s+per\s+/i);
  const salaryRow = amt
    ? `<span class="jc-dot">·</span>
      <span class="jc-row">${ICON_BILL}<span class="amt">${amt}</span>${per ? `<span>per ${per}</span>` : ''}</span>`
    : '';
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
      ${salaryRow}
    </div>
  </a>`;
}

const ICON_CHEV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"/></svg>';

// derive filterable attributes (defaults when not set on the job)
const locTypeOf = (j) => j.locType || (/remote/i.test(j.location) || (j.cats || []).includes('Remote') ? 'Remote' : 'On-site');
const seniorityOf = (j) => j.seniority || (/senior|lead|staff|principal/i.test(j.role) ? 'Senior' : /intern/i.test(j.role) ? 'Junior' : 'Mid');
const empTypeOf = (j) => j.empType || 'Full-time';
const companyOf = (j) => COMPANIES[j.co].name;

const DROPDOWN_DEFS = [
  { key: 'locType',   label: 'Location Type',   get: locTypeOf,   options: ['On-site', 'Remote', 'Hybrid'] },
  { key: 'seniority', label: 'Seniority',       get: seniorityOf, options: ['Junior', 'Mid', 'Senior'] },
  { key: 'empType',   label: 'Employment Type', get: empTypeOf,   options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  { key: 'company',   label: 'Company',         get: companyOf,   options: [...new Set(JOBS.map(companyOf))].sort() },
];

// ---- state ----
let activeFilter = 'For you';
let kw = '', locq = '';
const df = {}; // active dropdown filters

function matchesJob(job) {
  if (activeFilter !== 'For you' && !(job.cats || []).includes(activeFilter)) return false;
  if (kw && !(`${job.role} ${companyOf(job)}`.toLowerCase().includes(kw.toLowerCase()))) return false;
  if (locq && !job.location.toLowerCase().includes(locq.toLowerCase())) return false;
  return DROPDOWN_DEFS.every((d) => !df[d.key] || d.get(job) === df[d.key]);
}

function renderFilters() {
  document.getElementById('filters').innerHTML = FILTERS
    .map((f) => `<button class="chip ${f === activeFilter ? 'active' : ''}" data-f="${f}">${f}</button>`)
    .join('');
}

function renderDropdowns() {
  const anyActive = Object.keys(df).length || kw || locq || activeFilter !== 'For you';
  document.getElementById('dropdowns').innerHTML = DROPDOWN_DEFS.map((d) => {
    const val = df[d.key];
    return `
    <div class="fchip ${val ? 'on' : ''}" data-key="${d.key}">
      <button type="button">${val || d.label} ${ICON_CHEV}</button>
      <div class="fmenu" hidden>
        ${d.options.map((o) => `<button type="button" data-val="${o}">${o}${val === o ? '<span class="tick">✓</span>' : ''}</button>`).join('')}
      </div>
    </div>`;
  }).join('') + (anyActive ? '<button class="freset" id="reset" type="button">Reset</button>' : '');
}

function renderJobs() {
  const list = JOBS.filter(matchesJob);
  document.getElementById('jobs').innerHTML = list.length
    ? `<div class="jobs-list">${list.map(jobCardHTML).join('')}</div>`
    : '<div class="jc-empty">No roles match your search.</div>';
}

function refresh() { renderFilters(); renderDropdowns(); renderJobs(); }

function closeMenus() {
  document.querySelectorAll('.fchip').forEach((c) => {
    c.classList.remove('open');
    const m = c.querySelector('.fmenu');
    if (m) m.hidden = true;
  });
}

function initHiring() {
  refresh();

  document.getElementById('kw').addEventListener('input', (e) => { kw = e.target.value; renderJobs(); renderDropdowns(); });
  document.getElementById('loc').addEventListener('input', (e) => { locq = e.target.value; renderJobs(); renderDropdowns(); });
  document.getElementById('searchBtn').addEventListener('click', renderJobs);

  // category chips
  document.getElementById('filters').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    activeFilter = chip.dataset.f;
    refresh();
  });

  // dropdown filters
  document.getElementById('dropdowns').addEventListener('click', (e) => {
    if (e.target.closest('#reset')) {
      Object.keys(df).forEach((k) => delete df[k]);
      activeFilter = 'For you'; kw = ''; locq = '';
      document.getElementById('kw').value = ''; document.getElementById('loc').value = '';
      closeMenus(); refresh();
      return;
    }
    const opt = e.target.closest('.fmenu button');
    if (opt) {
      const key = opt.closest('.fchip').dataset.key;
      if (df[key] === opt.dataset.val) delete df[key]; else df[key] = opt.dataset.val;
      closeMenus(); renderDropdowns(); renderJobs();
      return;
    }
    const chipBtn = e.target.closest('.fchip > button');
    if (chipBtn) {
      const chip = chipBtn.parentElement;
      const wasOpen = chip.classList.contains('open');
      closeMenus();
      if (!wasOpen) { chip.classList.add('open'); chip.querySelector('.fmenu').hidden = false; }
    }
  });

  document.addEventListener('click', (e) => { if (!e.target.closest('.dropdowns')) closeMenus(); });

  document.getElementById('jobs').addEventListener('click', (e) => {
    if (e.target.closest('.jcard')) e.preventDefault();
  });
}
