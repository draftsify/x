// Job search — read-only clone of X's jobs page. Data (roles, companies,
// locations, salaries) mirrors the real listing; the job descriptions in the
// detail pane are generic copy written for this demo, not the originals.

// ---- employers ----
const COMPANIES = {
  xai:        { name: 'xAI Careers',        handle: 'xaicareers',      verified: true },
  sesame:     { name: 'Sesame',             handle: 'sesame',          verified: true },
  character:  { name: 'Character.AI',       handle: '',                verified: false },
  hume:       { name: 'Hume AI',            handle: 'hume_ai',         verified: false },
  conductor:  { name: 'Conductor',          handle: 'conductor_build', verified: true },
  shift:      { name: 'Shift Technologies', handle: 'hollyschedules',  verified: false },
  oku:        { name: 'Oku Trade',          handle: 'okutrade',        verified: true },
  ashby:      { name: 'Ashby',              handle: 'ashbyhq',         verified: true },
  kalshi:     { name: 'Kalshi',             handle: 'Kalshi',          verified: true },
  agi:        { name: 'AGI, Inc.',          handle: 'agi_inc',         verified: true },
  primer:     { name: 'Primer',             handle: 'Primer',          verified: true },
  moment:     { name: 'Moment',             handle: '_MomentHQ',       verified: true },
  tria:       { name: 'Tria',               handle: 'useTria',         verified: true },
  adapt:      { name: 'Adapt',              handle: 'Adapt',           verified: true },
  superw:     { name: 'superwhisper',       handle: 'superwhisper',    verified: true },
  fuse:       { name: 'Fuse Energy',        handle: 'fuseenergy',      verified: true },
  notion:     { name: 'Notion',             handle: '',                verified: false },
};

// ---- open roles ----
const JOBS = [
  { co: 'xai',       role: 'Product Designer',        location: 'Palo Alto, United States',          salary: '$180K - $440K per year', locType: 'On-site', seniority: 'Senior', empType: 'Full-time' },
  { co: 'sesame',    role: 'Product Designer',        location: 'San Francisco',                     salary: '$175K - $280K per year', locType: 'On-site', seniority: 'Mid',    empType: 'Full-time' },
  { co: 'character', role: 'Product Designer',        location: 'Redwood City, California',          salary: '$150K - $300K per year', locType: 'On-site', seniority: 'Senior', empType: 'Full-time' },
  { co: 'hume',      role: 'Product Designer',        location: 'New York, NY',                      salary: '$120K - $170K per year', locType: 'On-site', seniority: 'Mid',    empType: 'Full-time' },
  { co: 'conductor', role: 'Product Designer',        location: 'San Francisco',                     salary: '$175K - $300K per year', locType: 'On-site', seniority: 'Senior', empType: 'Full-time' },
  { co: 'shift',     role: 'Product Designer',        location: 'San Francisco, CA',                 salary: '$130K - $150K per year', locType: 'On-site', seniority: 'Mid',    empType: 'Full-time' },
  { co: 'oku',       role: 'Product Designer',        location: 'Chicago or remote (North America)', salary: '$50K - $100K per year',  locType: 'Remote',  seniority: 'Mid',    empType: 'Full-time' },
  { co: 'ashby',     role: 'Senior Product Designer', location: 'Remote - North America',            salary: '$180K - $210K per year', locType: 'Remote',  seniority: 'Senior', empType: 'Full-time' },
  { co: 'kalshi',    role: 'Product Designer',        location: 'New York, New York',                salary: '',                        locType: 'On-site', seniority: 'Senior', empType: 'Full-time' },
  { co: 'agi',       role: 'Product Designer',        location: 'San Francisco Office',              salary: '',                        locType: 'On-site', seniority: 'Senior', empType: 'Full-time' },
  { co: 'primer',    role: 'Product Designer',        location: 'San Francisco, CA',                 salary: '',                        locType: 'On-site', seniority: 'Mid',    empType: 'Full-time' },
  { co: 'moment',    role: 'Product Designer',        location: 'New York, United States',           salary: '',                        locType: 'On-site', seniority: 'Mid',    empType: 'Full-time' },
  { co: 'tria',      role: 'Product Designer',        location: 'Remote',                            salary: '',                        locType: 'Remote',  seniority: 'Mid',    empType: 'Full-time' },
  { co: 'adapt',     role: 'Product Designer',        location: 'San Francisco, CA (The Presidio)',  salary: '',                        locType: 'On-site', seniority: 'Senior', empType: 'Full-time' },
  { co: 'superw',    role: 'Product Designer',        location: 'Toronto',                           salary: '$100K - $220K per year', locType: 'Hybrid',  seniority: 'Mid',    empType: 'Full-time' },
  { co: 'fuse',      role: 'Product Designer',        location: 'London, United Kingdom',            salary: '',                        locType: 'On-site', seniority: 'Mid',    empType: 'Full-time' },
  { co: 'notion',    role: 'Product Designer',        location: 'San Francisco; New York',           salary: '',                        locType: 'Hybrid',  seniority: 'Senior', empType: 'Full-time' },
];

const FILTER_DEFS = [
  { key: 'locType',    label: 'Location Type',   options: ['On-site', 'Remote', 'Hybrid'] },
  { key: 'seniority',  label: 'Seniority',       options: ['Junior', 'Mid', 'Senior'] },
  { key: 'empType',    label: 'Employment Type', options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  { key: 'company',    label: 'Company',         options: Object.values(COMPANIES).map((c) => c.name) },
];

// ---- assets ----
const BADGE_GOLD = '<svg class="badge" viewBox="0 0 22 22" aria-hidden="true"><defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4e72a"/><stop offset=".55" stop-color="#cd8105"/><stop offset="1" stop-color="#f4e72a"/></linearGradient></defs><path fill="url(#gg)" d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"/></svg>';
const ICON_PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 11.5c-1.65 0-3-1.34-3-3s1.35-3 3-3c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/></svg>';
const ICON_BILL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M11.871 4.535c2.89-.377 5.91-.747 9.839.096l.79.169v14.795l-1.183-.22c-3.578-.664-6.31-.286-9.188.09-2.89.377-5.91.747-9.839-.095l-.79-.17V4.405l1.183.22c3.577.664 6.31.285 9.188-.09zM3.5 17.567c.874.154 1.699.24 2.49.282-.095-.92-1.039-2.05-2.49-2.05v1.768zm17-2.317c-1.41 0-2.343.879-2.48 1.772.788.022 1.612.083 2.48.2V15.25zm-8.5-6c-1.352 0-2.25 1.355-2.25 2.75 0 1.394.898 2.75 2.25 2.75 1.352 0 2.25-1.356 2.25-2.75 0-1.395-.898-2.75-2.25-2.75zm-8.5-.5c1.412 0 2.343-.88 2.48-1.775-.789-.02-1.612-.081-2.48-.198V8.75zm14.509-2.6c.093.919 1.039 2.05 2.491 2.05V6.432c-.875-.154-1.7-.242-2.491-.283z"/></svg>';
const ICON_CASE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 6h-4V4.5C15.5 3.12 14.38 2 13 2h-2C9.62 2 8.5 3.12 8.5 4.5V6h-4C3.12 6 2 7.12 2 8.5v10C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5v-10C22 7.12 20.88 6 19.5 6zM10.5 4.5c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5V6h-3V4.5zM20 18.5c0 .28-.22.5-.5.5h-15c-.28 0-.5-.22-.5-.5v-10c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v10z"/></svg>';
const ICON_CHEV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"/></svg>';
const ICON_SHARE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/></svg>';

const LOGO_COLORS = ['#1d9bf0', '#7856ff', '#00ba7c', '#f91880', '#ff7a00', '#e82127', '#12203b', '#0a0a0a', '#5c6bc0', '#00897b'];
function initials(name) {
  const parts = name.replace(/[.,]/g, '').split(/\s+/).filter(Boolean);
  return ((parts[0] || '').charAt(0) + (parts[1] ? parts[1].charAt(0) : (parts[0] || '').charAt(1) || '')).toUpperCase();
}
function logoBox(co, cls) {
  const idx = Object.keys(COMPANIES).indexOf(co);
  const c = COMPANIES[co];
  return `<div class="jlogo ${cls || ''}" style="background:${LOGO_COLORS[idx % LOGO_COLORS.length]}">${initials(c.name)}</div>`;
}

// ---- state ----
let kw = '', locq = '';
const f = {}; // active dropdown filters
let selectedIndex = 0;

function matches(job) {
  const c = COMPANIES[job.co];
  if (kw && !(`${job.role} ${c.name}`.toLowerCase().includes(kw.toLowerCase()))) return false;
  if (locq && !job.location.toLowerCase().includes(locq.toLowerCase())) return false;
  if (f.locType && job.locType !== f.locType) return false;
  if (f.seniority && job.seniority !== f.seniority) return false;
  if (f.empType && job.empType !== f.empType) return false;
  if (f.company && c.name !== f.company) return false;
  return true;
}
function results() { return JOBS.filter(matches); }

// ---- rendering ----
function itemHTML(job, active) {
  const c = COMPANIES[job.co];
  const salary = job.salary ? `<span class="row sal">${ICON_BILL}${job.salary}</span>` : '';
  return `
  <button class="jitem ${active ? 'sel' : ''}" data-i="${JOBS.indexOf(job)}" type="button">
    ${logoBox(job.co)}
    <div class="jitem-body">
      <div class="jitem-title">${job.role}</div>
      <div class="jitem-co"><span class="cname">${c.name}</span>${c.verified ? BADGE_GOLD : ''}${c.handle ? `<span class="handle">@${c.handle}</span>` : ''}</div>
      <div class="jitem-sub">
        <span class="row">${ICON_PIN}${job.location}</span>
        ${salary}
      </div>
    </div>
  </button>`;
}

function detailHTML(job) {
  const c = COMPANIES[job.co];
  const salary = job.salary || 'Competitive';
  return `
  <div class="jdetail-inner">
    <div class="jdetail-head">
      ${logoBox(job.co)}
      <div class="jdetail-emp">
        <div class="name">${c.name}${c.verified ? BADGE_GOLD : ''}</div>
        ${c.handle ? `<div class="handle">@${c.handle}</div>` : ''}
      </div>
    </div>
    <div class="jdetail-role">${job.role}</div>
    <div class="jdetail-tags">
      <span class="jtag">${ICON_PIN}${job.location}</span>
      <span class="jtag">${ICON_CASE}${job.empType} · ${job.seniority} · ${job.locType}</span>
      ${job.salary ? `<span class="jtag sal">${ICON_BILL}${job.salary}</span>` : ''}
    </div>
    <div class="jdetail-actions">
      <button class="japply" type="button">Apply now</button>
      <button class="jshare" type="button" aria-label="Share job">${ICON_SHARE}</button>
    </div>
    <div class="jdetail-body">
      <h3>About ${c.name}</h3>
      <p>${c.name} is a verified company hiring on X. They're building an ambitious product with a small, high-agency team that ships fast and cares deeply about craft.</p>
      <h3>About the role</h3>
      <p>As a ${job.role}, you'll own the end-to-end experience of core product surfaces — from early exploration to pixel-perfect delivery — and partner closely with engineering and product to raise the bar on quality.</p>
      <h3>What you'll do</h3>
      <ul>
        <li>Design flows, interfaces and interactions across web and mobile.</li>
        <li>Turn ambiguous problems into clear, opinionated product decisions.</li>
        <li>Prototype quickly and validate ideas with real users.</li>
        <li>Uphold a high visual and interaction standard across the product.</li>
      </ul>
      <h3>What we're looking for</h3>
      <ul>
        <li>A strong portfolio of shipped, widely-used product work.</li>
        <li>Comfort working at ${job.seniority}-level scope in a fast-paced team.</li>
        <li>Fluency in modern design tooling and prototyping.</li>
      </ul>
      <h3>Location &amp; type</h3>
      <p>${job.location} · ${job.empType} · ${job.locType}.</p>
      <h3>Compensation</h3>
      <p>${salary}${job.salary ? '' : ' — depending on experience'}, plus equity and benefits.</p>
    </div>
  </div>`;
}

function render() {
  const list = results();
  const listEl = document.getElementById('jobs-list');
  const detailEl = document.getElementById('jobs-detail');

  if (!list.length) {
    listEl.innerHTML = '<div class="jobs-count">No jobs match your search.</div>';
    detailEl.innerHTML = '<div class="jdetail-empty">Try adjusting your search or filters.</div>';
    return;
  }
  if (!list.includes(JOBS[selectedIndex])) selectedIndex = JOBS.indexOf(list[0]);

  listEl.innerHTML = `<div class="jobs-count">${list.length} job${list.length > 1 ? 's' : ''}</div>` +
    list.map((j) => itemHTML(j, JOBS.indexOf(j) === selectedIndex)).join('');
  detailEl.innerHTML = detailHTML(JOBS[selectedIndex]);
}

function renderFilters() {
  const el = document.getElementById('filters');
  el.innerHTML = FILTER_DEFS.map((d) => {
    const val = f[d.key];
    return `
    <div class="fchip ${val ? 'on' : ''}" data-key="${d.key}">
      <button type="button">${val || d.label} ${ICON_CHEV}</button>
      <div class="fmenu" hidden>
        ${d.options.map((o) => `<button type="button" data-val="${o}">${o}${val === o ? '<span class="tick">✓</span>' : ''}</button>`).join('')}
      </div>
    </div>`;
  }).join('') + '<button class="freset" id="reset" type="button">Reset</button>';
}

function closeMenus() {
  document.querySelectorAll('.fchip').forEach((c) => {
    c.classList.remove('open');
    const m = c.querySelector('.fmenu');
    if (m) m.hidden = true;
  });
}

function initHiring() {
  renderFilters();
  render();

  document.getElementById('kw').addEventListener('input', (e) => { kw = e.target.value; render(); });
  document.getElementById('loc').addEventListener('input', (e) => { locq = e.target.value; render(); });
  document.getElementById('searchBtn').addEventListener('click', render);

  // select a job in the list
  document.getElementById('jobs-list').addEventListener('click', (e) => {
    const item = e.target.closest('.jitem');
    if (!item) return;
    selectedIndex = Number(item.dataset.i);
    render();
    document.getElementById('jobs-detail').scrollTop = 0;
  });

  // filter dropdowns
  document.getElementById('filters').addEventListener('click', (e) => {
    const reset = e.target.closest('#reset');
    if (reset) { Object.keys(f).forEach((k) => delete f[k]); closeMenus(); renderFilters(); render(); return; }

    const opt = e.target.closest('.fmenu button');
    if (opt) {
      const key = opt.closest('.fchip').dataset.key;
      f[key] = (f[key] === opt.dataset.val) ? undefined : opt.dataset.val;
      if (!f[key]) delete f[key];
      closeMenus(); renderFilters(); render();
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

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.jobs-filters')) closeMenus();
  });
}
