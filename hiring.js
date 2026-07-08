// Hiring board — read-only. Only verified companies post roles, so there is no
// composer here: this renders a feed of company posts, each with job tiles
// modeled exactly on X's job application card (the Axiom example).

const FILTERS = ['For you', 'Engineering', 'Design', 'Product', 'Remote', 'Growth'];

const COMPANIES = [
  {
    name: 'Axiom', handle: 'axiomexchange', grad: 'linear-gradient(135deg,#0f172a,#334155)', logo: 'AX',
    jobs: [
      { title: 'Founding Software Engineer', location: 'Austin, Texas', salary: '$200K - $1M per year', tags: ['Engineering'] },
      { title: 'Product Designer', location: 'Austin, Texas', salary: '$180K - $400K per year', tags: ['Design', 'Product'] },
      { title: 'Growth Lead', location: 'Remote', salary: '$150K - $350K per year', tags: ['Growth', 'Remote'] },
      { title: 'Backend Engineer', location: 'Remote', salary: '$190K - $500K per year', tags: ['Engineering', 'Remote'] },
    ],
  },
  {
    name: 'xAI', handle: 'xai', grad: 'linear-gradient(135deg,#000,#3a3a3a)', logo: 'x',
    jobs: [
      { title: 'AI Research Engineer', location: 'San Francisco, CA', salary: '$250K - $1.5M per year', tags: ['Engineering'] },
      { title: 'Infrastructure Engineer', location: 'Palo Alto, CA', salary: '$220K - $600K per year', tags: ['Engineering'] },
    ],
  },
  {
    name: 'Vercel', handle: 'vercel', grad: 'linear-gradient(135deg,#111,#555)', logo: '▲',
    jobs: [
      { title: 'Senior Frontend Engineer', location: 'Remote', salary: '$160K - $260K per year', tags: ['Engineering', 'Remote'] },
      { title: 'Design Engineer', location: 'Remote', salary: '$170K - $280K per year', tags: ['Design', 'Remote'] },
    ],
  },
];

const BADGE_GOLD = '<svg class="badge" viewBox="0 0 22 22" aria-hidden="true"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4e72a"/><stop offset=".55" stop-color="#cd8105"/><stop offset="1" stop-color="#f4e72a"/></linearGradient></defs><path fill="url(#g)" d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"/></svg>';

const ICON_PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 11.5c-1.65 0-3-1.34-3-3s1.35-3 3-3c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/></svg>';

const ICON_BILL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M11.871 4.535c2.89-.377 5.91-.747 9.839.096l.79.169v14.795l-1.183-.22c-3.578-.664-6.31-.286-9.188.09-2.89.377-5.91.747-9.839-.095l-.79-.17V4.405l1.183.22c3.577.664 6.31.285 9.188-.09zM3.5 17.567c.874.154 1.699.24 2.49.282-.095-.92-1.039-2.05-2.49-2.05v1.768zm17-2.317c-1.41 0-2.343.879-2.48 1.772.788.022 1.612.083 2.48.2V15.25zm-8.5-6c-1.352 0-2.25 1.355-2.25 2.75 0 1.394.898 2.75 2.25 2.75 1.352 0 2.25-1.356 2.25-2.75 0-1.395-.898-2.75-2.25-2.75zm-8.5-.5c1.412 0 2.343-.88 2.48-1.775-.789-.02-1.612-.081-2.48-.198V8.75zm14.509-2.6c.093.919 1.039 2.05 2.491 2.05V6.432c-.875-.154-1.7-.242-2.491-.283z"/></svg>';

const ICON_CHEVRON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"/></svg>';

function tileHTML(job) {
  return `
  <a class="tile" href="#" tabindex="0">
    <div class="t-title">${job.title}</div>
    <div class="t-meta">
      <div class="t-row">${ICON_PIN}<span>${job.location}</span></div>
      <div class="t-row t-salary">
        <span class="t-money">${ICON_BILL}<span>${job.salary}</span></span>
        <span class="t-chevron">${ICON_CHEVRON}</span>
      </div>
    </div>
  </a>`;
}

function companyHTML(c, jobs) {
  return `
  <section class="hire-post">
    <div class="hire-head">
      <div class="hire-avatar" style="background:${c.grad}">${c.logo}</div>
      <div>
        <div class="hire-name">${c.name}${BADGE_GOLD}</div>
        <div class="hire-sub">@${c.handle} · Hiring ${jobs.length} role${jobs.length > 1 ? 's' : ''}</div>
      </div>
    </div>
    <div class="tiles">${jobs.map(tileHTML).join('')}</div>
  </section>`;
}

let activeFilter = 'For you';

function renderFilters() {
  document.getElementById('filters').innerHTML = FILTERS
    .map((f) => `<button class="chip ${f === activeFilter ? 'active' : ''}" data-f="${f}">${f}</button>`)
    .join('');
}

function renderJobs() {
  const out = COMPANIES.map((c) => {
    const jobs = activeFilter === 'For you'
      ? c.jobs
      : c.jobs.filter((j) => j.tags.includes(activeFilter));
    return jobs.length ? companyHTML(c, jobs) : '';
  }).join('');
  document.getElementById('jobs').innerHTML = out || '<div class="hiring-head"><p>No open roles in this category yet.</p></div>';
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
  // tiles are demo cards — keep navigation inert for the base
  document.getElementById('jobs').addEventListener('click', (e) => {
    if (e.target.closest('.tile')) e.preventDefault();
  });
}
