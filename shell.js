// Shared app shell (left nav + right sidebar) for the X clone.
const ICONS = {
  logo: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/></svg>',
  explore: '<svg viewBox="0 0 24 24"><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/></svg>',
  notif: '<svg viewBox="0 0 24 24"><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"/></svg>',
  messages: '<svg viewBox="0 0 24 24"><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.638V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.637-8-3.637V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"/></svg>',
  hiring: '<svg viewBox="0 0 24 24"><path d="M19.5 6h-4V4.5C15.5 3.12 14.38 2 13 2h-2C9.62 2 8.5 3.12 8.5 4.5V6h-4C3.12 6 2 7.12 2 8.5v10C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5v-10C22 7.12 20.88 6 19.5 6zM10.5 4.5c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5V6h-3V4.5zM20 18.5c0 .28-.22.5-.5.5h-15c-.28 0-.5-.22-.5-.5V12h5v1.5c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5V12h5v6.5zM11.5 12h1v.5h-1V12zM20 10H4V8.5c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5V10z"/></svg>',
  profile: '<svg viewBox="0 0 24 24"><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"/></svg>',
  more: '<svg viewBox="0 0 24 24"><path d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75z"/></svg>',
};

function navItem(href, icon, label, opts = {}) {
  const cls = ['nav-item', opts.active ? 'active' : '', opts.hiring ? 'hiring' : ''].join(' ').trim();
  return `<a class="${cls}" href="${href}">${ICONS[icon]}<span>${label}</span></a>`;
}

function renderSidebar(page) {
  return `
  <a class="logo" href="index.html" aria-label="X">${ICONS.logo}</a>
  <nav class="nav">
    ${navItem('index.html', 'home', 'Home', { active: page === 'home' })}
    ${navItem('#', 'explore', 'Explore')}
    ${navItem('#', 'notif', 'Notifications')}
    ${navItem('#', 'messages', 'Messages')}
    ${navItem('hiring.html', 'hiring', 'Hiring', { active: page === 'hiring', hiring: true })}
    ${navItem('#', 'profile', 'Profile')}
    ${navItem('#', 'more', 'More')}
  </nav>
  <button class="post-btn">Post</button>
  <div class="account">
    <div class="avatar"></div>
    <div class="who">
      <div class="name">drafts</div>
      <div class="handle">@drafts013</div>
    </div>
  </div>`;
}

function renderRight(page) {
  const hiringWidget = page === 'hiring' ? `
    <div class="widget">
      <h2>Companies hiring</h2>
      <div class="widget-row"><div class="k">Aerospace</div><div class="v">SpaceX · 42 open roles</div></div>
      <div class="widget-row"><div class="k">AI</div><div class="v">xAI · 27 open roles</div></div>
      <div class="widget-row"><div class="k">Platform</div><div class="v">X Corp · 15 open roles</div></div>
    </div>` : '';
  return `
  <div class="search"><input placeholder="Search"></div>
  ${hiringWidget}
  <div class="widget">
    <h2>What's happening</h2>
    <div class="widget-row"><div class="k">Trending · Tech</div><div class="v">#Vercel</div><div class="k">18.4K posts</div></div>
    <div class="widget-row"><div class="k">Trending</div><div class="v">Hiring season</div><div class="k">9,060 posts</div></div>
    <div class="widget-row"><div class="k">Business · Trending</div><div class="v">Remote work</div><div class="k">42K posts</div></div>
    <div class="more">Show more</div>
  </div>
  <div class="widget">
    <h2>Who to follow</h2>
    <div class="widget-row"><div class="v">xAI</div><div class="k">@xai</div></div>
    <div class="widget-row"><div class="v">Vercel</div><div class="k">@vercel</div></div>
  </div>
  <div class="footer">
    Terms of Service · Privacy Policy · Cookie Policy<br>Accessibility · Ads info · More<br>© 2026 X Corp.
  </div>`;
}

function mountShell(page) {
  const sb = document.querySelector('.sidebar');
  const rt = document.querySelector('.right');
  if (sb) sb.innerHTML = renderSidebar(page);
  if (rt) rt.innerHTML = renderRight(page);
}
