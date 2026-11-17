# PROXIL — Stability in Every Movement

Marketing site for PROXIL, a prototype-stage passive anti-tremor glove concept.
React 19 + TypeScript + Vite + Tailwind CSS v4.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # type-check
npm run build    # outputs dist/
```

## Deploy to GitHub Pages
1. Push this project to a GitHub repository (branch `main`).
2. In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml` and publishes the site at
   `https://<user>.github.io/<repo>/`.

The build uses `base: './'`, so it works from any sub-path.

## Forms
Forms run in preview mode (nothing is sent). To collect real submissions, set a repo
variable `VITE_FORM_ENDPOINT` (Settings → Secrets and variables → Actions → Variables)
to a form endpoint that accepts JSON POST (Formspree, Basin, your own API).

## Photos
Add real photos to `public/media/`: `hand-back.jpg`, `hand-side.jpg`, `hand-cup.jpg`,
`hand-writing.jpg`, `hand-spoon.jpg`, `hand-pickup.jpg`. Until then, illustrations are shown.

## Before launch
| Item | Status |
|---|---|
| Form backend | Not connected (preview mode) |
| Photos | Placeholders |
| Privacy Policy / Terms | Drafts, need legal review |
| Contact details | None published, add real ones |
| Sizing guide, pricing | Not available yet |
