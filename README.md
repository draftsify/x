# X — clone + Hiring

A clean recreation of the X (Twitter) home page, with an extra **Hiring** section
to post and browse job offers. Built as a static site (HTML/CSS/vanilla JS), deployed on Vercel.

## Pages
- `index.html` — Home timeline (left nav, feed, right sidebar).
- `hiring.html` — Hiring board: a form to post job offers + a live list (stored in `localStorage`).

## Structure
- `styles.css` — all styling (dark theme).
- `shell.js` — shared left nav + right sidebar.
- `feed.js` — home timeline demo data + renderer.
- `hiring.js` — hiring board logic.

## Run locally
Just open `index.html` in a browser, or serve the folder:
```
npx serve .
```

This is a base — the Hiring section is intentionally minimal, ready to build on.
