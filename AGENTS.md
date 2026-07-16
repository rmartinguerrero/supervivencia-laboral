# Supervivencia Laboral — Project Context

## Goal
- Build "Supervivencia Laboral" — a humorous/sarcastic bilingual (ES/IT) web about work survival with absurd tools, retro 90s aesthetic, deployed on Netlify.

## Constraints & Preferences
- No AI, no login, no user accounts, no dashboard, no CMS, no e-commerce yet
- Tools store data in localStorage/cookies only; only Libro de Firmas uses a database (Netlify Blobs)
- Humor must be culturally adapted ES/IT, not literal translations
- Architecture must support future `/shop` section (currently hidden)
- Retro 90s/early 2000s aesthetic direction
- Salary ranges for phrases: low <1400€, mid 1400-2000€, high ≥2000€
- Libro de Firmas: 1 signature per IP, moderation-ready
- Retirement: countdown at 0 until configured, confetti on retirement day
- Footer: "Hecho con desmotivación y café por RaulMGuerrero"
- Language switcher must stay on current page (translate slug, don't redirect to home)
- Database (Netlify Blobs) works as-is, no changes needed
- Site URL: `https://job-survival.netlify.app`
- `site` config in astro.config.mjs must match actual Netlify URL

## Progress

### Done
- Project at `C:\Users\Raul\Documents\GitHub\supervivencia-laboral` with Astro 5 + React + Netlify adapter
- i18n routing with `/es/` and `/it/` prefixes, `redirectToDefaultLocale: false`
- All 6 tool pages ES + IT (salary, friday, life, retirement, signature book, boss game)
- Shop placeholder at `/shop` (hidden from navbar and footer)
- Footer: correct GitHub link (`https://github.com/rmartinguerrero/supervivencia-laboral`), credits, terms, privacy
- **Open Graph meta tags**: `Base.astro` has comprehensive OG tags for Facebook, WhatsApp, Telegram, Twitter/X, LinkedIn, Pinterest, Discord — all with absolute URLs (`https://job-survival.netlify.app/opengraph.png`), `og:image` 1200×630
- **OG image**: `public/opengraph.png` resized to 1200×630 using sharp-cli
- **Browser language detection**: root `/` uses client-side JS (`window.location.replace`) with `<noscript>` fallback to `/es/`
- **`site` config**: updated to `https://job-survival.netlify.app`
- Boss game: Web Audio API sounds, no external files
- **Slug translation**: `src/utils/slugs.ts` with ES↔IT mapping; `Navigation.astro` uses `translatePath()`
- **Countdowns fixed (all 4 components)**: `isConfigured` flag, counter stays at 0 until configured
- **Salary phrases restructured**: `low/mid/high` (salary-level-based)
- **Friday phrases day mapping fixed**: keys match JS `getDay()` (0=Sun..6=Sat)
- **Retirement phrases**: `days` category for <1 month; full hierarchy
- **Funny 404 page**: bilingual, glitch animation, sarcastic excuses
- **Under-construction banner removed**, **Marquee moved to top** of home pages
- **MySpace-style retro visitor counter**
- **Slug `colpisci-il-props` → `colpisci-il-boss`**
- **`@astrojs/check` + `typescript@5` installed**, all type errors fixed
- **Shop `className` → `class`** fixes
- **ES pages removed `lang` prop** from components that no longer accept it
- **Unused variables cleaned**: `useRef` from BossHitsGame, `lang` from LifeSalaryCalc, `showConfetti` state, `request` from firmas.ts GET, `_yearsContributed` prefixed in dates.ts
- **`FormEvent` deprecation**: typed with `<HTMLFormElement>` generic
- **`jornada-4` category deleted** from ES/IT phrases and SignatureBook.tsx
- **Checkbox styling improved**: custom retro checkboxes with `appearance: none`, golden checkmark, orange fill
- **Netlify secrets scan**: `SECRETS_SCAN_ENABLED = "false"` in netlify.toml
- **`netlify.toml`**: build command, Node 22, secrets scan disabled
- **README.md** (ES) and **README-IT.md** (IT) created with language switcher table using flags
- **Hamburger menu for mobile**: logo LEFT, hamburger RIGHT; `position: absolute` dropdown, overlay click-outside to close, `aria-expanded` for accessibility, `astro:page-load` for View Transitions; **uses `is:global`** to fix Astro scoping issue with JS-toggled `.open` class
- **`netlify.toml` added headers** for `/_astro/*` cache-control immutable

### In Progress
- (none)

### Blocked
- (none)

## Key Decisions
- **Framework**: Astro 5 with React integration
- **Database**: Netlify Blobs for Libro de Firmas — confirmed working at `https://job-survival.netlify.app/api/firmas?lang=es&page=1&limit=20`
- **Root `/` language detection**: client-side JS only, `Astro.redirect('/es')` removed; `redirectToDefaultLocale: false` prevents Astro from replacing `index.html` at build time
- **OG image**: resized from 456×430 to 1200×630 using sharp-cli
- **Secrets scan**: disabled entirely (`SECRETS_SCAN_ENABLED = "false"`) because `NETLIFY_AUTH_TOKEN`/`NETLIFY_SITE_ID` values leaked into `node_modules` docs
- **Env vars not needed in production**: `@netlify/blobs` with Netlify adapter uses built-in auth
- **Sounds**: Web Audio API oscillators
- **Slug mapping**: dedicated `slugs.ts` translation map
- **isConfigured flag**: distinguishes "never configured" from "configured with defaults"
- **Phrase selection rules**: Friday=day-of-week, Salary=salary-level, Retirement=time-remaining
- **Nav hamburger**: `<style is:global>` to prevent Astro scoping from breaking JS-toggled `.open` classes
- **Hamburger position**: button RIGHT, logo LEFT

## Next Steps
1. Push all changes to Git and verify deploy succeeds on Netlify
2. Test hamburger menu on mobile device
3. Full visual review of all pages (user mentioned "mañana damos un repaso a toda la parte visual a fondo")
4. **OG image cache**: WhatsApp/social media cache OG data aggressively — use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to force re-crawl after deploy

## Critical Context
- Build: `pnpm run build` — all 17 pages prerender successfully; EPERM symlink error at end is Windows-only, doesn't affect Netlify
- Dev: `pnpm dev` on `localhost:4321`
- API route `src/pages/api/firmas.ts` has `export const prerender = false`
- API test: `https://job-survival.netlify.app/api/firmas?lang=es&page=1&limit=20` returns `{"firmas":[],"total":0,...}`
- localStorage keys: `salary-config`, `friday-config`, `retirement-config` (all include `isConfigured: boolean`)
- `sharp` installed as devDependency (used for OG image resize)
- The `style is:global` on Navigation.astro is critical — without it, Astro scoped styles prevent JS `.open` class toggling from working

## Relevant Files
- `astro.config.mjs` — `site: 'https://job-survival.netlify.app'`, `redirectToDefaultLocale: false`, i18n, Netlify adapter
- `tsconfig.json` — extends `astro/tsconfigs/strict`, React JSX
- `package.json` — dependencies including `@netlify/blobs`, `canvas-confetti`, `sharp` (devDep)
- `netlify.toml` — build config, `SECRETS_SCAN_ENABLED = "false"`, `NODE_VERSION = "22"`, cache headers for `/_astro/*`
- `src/layouts/Base.astro` — Layout with comprehensive OG/Twitter/LinkedIn/Pinterest meta tags, absolute image URLs
- `src/components/Navigation.astro` — Nav with hamburger button (RIGHT), logo (LEFT), `translatePath()`, `<style is:global>` for JS toggle, click-outside overlay
- `src/pages/index.astro` — Root page with client-side language detection (no server redirect), `<noscript>` fallback
- `src/utils/slugs.ts` — ES↔IT slug translation map
- `src/utils/localStorage.ts` — Config interfaces with `isConfigured` flag
- `src/utils/dates.ts` — Date utilities including `calculateRetirement`
- `src/styles/global.css` — Global styles with custom checkbox styles
- `src/data/es/phrases.ts` — ES phrases (no `jornada-4`)
- `src/data/it/phrases.ts` — IT phrases (no `jornada-4`)
- `src/components/SalaryCountdown.tsx` — ES salary countdown
- `src/components/SalaryCountdownIT.tsx` — IT version
- `src/components/FridayCountdown.tsx` / `IT` — Friday countdowns
- `src/components/RetirementCalc.tsx` / `IT` — Retirement
- `src/components/SignatureBook.tsx` / `IT` — Signature books
- `src/components/BossHitsGame.tsx` / `IT` — Boss game
- `src/components/LifeSalaryCalc.tsx` / `IT` — Life salary
- `src/pages/404.astro` — Funny 404 page
- `src/pages/api/firmas.ts` — Netlify Blobs API
- `src/pages/shop/index.astro` — Shop placeholder
- `public/opengraph.png` — OG image (1200×630)
- `README.md` — ES readme with language switcher table
- `README-IT.md` — IT readme with native translation
