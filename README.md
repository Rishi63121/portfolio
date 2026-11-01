# Rishi Roy: portfolio

Next.js 16 · React 19 · Tailwind v4 · static export for GitHub Pages.

The hero is a live adaptive-signal traffic simulation (canvas). Move the cursor through it to create a crowd surge and watch the lights re-time. Two interactive demos sit in the work section, and `Ctrl/⌘ K` opens a command palette.

```bash
npm install
npm run dev      # development
npm run build    # static export to ./out
```

Deploy: pushing to `main` runs `.github/workflows/deploy.yml`. If the repository is not named `<username>.github.io`, set `NEXT_PUBLIC_BASE_PATH=/<repo>` and `NEXT_PUBLIC_SITE_ORIGIN` at build time.
