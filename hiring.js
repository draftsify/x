// Hiring board — base version. Jobs are stored in localStorage so the board
// persists between visits. Seeded with a couple of example roles.
const STORE_KEY = 'x_hiring_jobs';

const SEED = [
  {
    role: 'Senior Frontend Engineer', company: 'Vercel', location: 'Remote',
    type: 'Full-time', salary: '$150k–$200k',
    desc: 'Build the tools millions of developers use to ship. React, Next.js, and a lot of taste.',
  },
  {
    role: 'AI Research Engineer', company: 'xAI', location: 'San Francisco, CA',
    type: 'Full-time', salary: '$250k+',
    desc: 'Push the frontier of large-scale models. Strong ML fundamentals required.',
  },
];

function loadJobs() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(STORE_KEY, JSON.stringify(SEED));
  return [...SEED];
}

function saveJobs(jobs) {
  localStorage.setItem(STORE_KEY, JSON.stringify(jobs));
}

function jobHTML(j) {
  const tags = [j.location, j.type].filter(Boolean)
    .map((t) => `<span class="tag">${escapeHTML(t)}</span>`).join('');
  return `
  <article class="job">
    <div class="top">
      <div>
        <div class="role">${escapeHTML(j.role)}</div>
        <div class="company">${escapeHTML(j.company)}</div>
      </div>
      ${j.salary ? `<div class="salary">${escapeHTML(j.salary)}</div>` : ''}
    </div>
    <div class="tags">${tags}</div>
    ${j.desc ? `<div class="desc">${escapeHTML(j.desc)}</div>` : ''}
    <button class="apply">Apply</button>
  </article>`;
}

function escapeHTML(s = '') {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderJobs() {
  document.getElementById('jobs').innerHTML = loadJobs().map(jobHTML).join('');
}

function initHiring() {
  renderJobs();
  document.getElementById('job-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    const job = {
      role: f.role.value.trim(),
      company: f.company.value.trim(),
      location: f.location.value.trim(),
      type: f.type.value,
      salary: f.salary.value.trim(),
      desc: f.desc.value.trim(),
    };
    if (!job.role || !job.company) return;
    const jobs = loadJobs();
    jobs.unshift(job);
    saveJobs(jobs);
    renderJobs();
    f.reset();
  });
}
