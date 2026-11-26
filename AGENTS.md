# AGENTS.md

## Project Overview

Daily Questions is a Vue 3 + TypeScript single-page application that presents one question for each day of the year. Users can view today's question, navigate by date or previous/next-day controls, and switch between English and Italian.

- The application is built with Vite.
- English and Italian translations are stored in JSON locale files.
- The app uses local storage for the selected locale.
- The app follows the system light/dark theme and updates it dynamically.
- Date calculations and formatting use Luxon.

## Required Tooling

- Node.js 26, as declared by `package.json` and `.github/workflows/build.yml`
- npm
- A modern browser

## Setup and Commands

- Install dependencies: `npm install`
- Start the local development server: `npm run dev`
- Build the production output: `npm run build`
- Preview the production build: `npm run preview`

The development server is configured for `http://localhost:5173/`.

There are currently no lint or test scripts.

## Technology Stack

- Vue 3
- TypeScript
- Vite
- Vue I18n
- Luxon
- `@vueuse/core`

## Project Structure

- `src/App.vue`: Root component; manages locale persistence and system theme detection.
- `src/components/DailyQuestion.vue`: Loads and displays questions; handles date navigation and day-change refresh behavior.
- `src/main.ts`: Initializes Vue, Vue I18n, locale detection, persisted locale, and date formats.
- `src/locales/en.json`: English UI strings and questions.
- `src/locales/it.json`: Italian UI strings and questions.
- `src/style.css`: Global application styles.
- `public/`: Static assets used by the application.
- `.github/workflows/build.yml`: CI workflow that installs dependencies and runs a production build.

## Data and Localization

Questions are keyed by month and day:

```text
questions.<month>.<day>
```

For example, `questions.1.1` is January 1 and `questions.12.31` is December 31.

When adding or changing questions:

- Keep the locale key structure aligned between `src/locales/en.json` and `src/locales/it.json`.
- Use `t('questions.{month}.{day}')` for question lookup.
- Preserve valid JSON and the existing nested month/day structure.
- Update both locales unless there is a documented fallback reason.

Vue I18n is the fallback locale source; English is configured as the fallback.

Locale selection:

- Detects a supported browser locale on startup.
- Falls back to English for unsupported locales.
- Persists the preference under `preferred-locale` in local storage.
- Supports English and Italian through `src/main.ts`.

## Date Handling

Use Luxon for date operations. Do not use the native `Date` constructor in application logic.

- Obtain today's date with `DateTime.now().startOf('day')`.
- Use Luxon's day granularity for date comparisons: `dateTime.hasSame(otherDate, 'day')`.
- Use Luxon for leap-year checks and ISO date formatting.
- Format stored date values with `yyyy-MM-dd`.
- Refresh the displayed question when a locale or selected date changes.

## Component Conventions

- Use Vue 3 `<script setup>` syntax.
- Enable and preserve strict TypeScript types.
- Use `ref()` for component state.
- Use `computed()` for derived state.
- Use `@vueuse/core`'s `useStorage()` for persisted state.
- Watch locale changes and reload translated content when needed.
- Inject the application theme through Vue's injection API.

Component style:

- 2-space indentation for `.vue` and `.ts` files.
- 4-space indentation for other file types.
- CRLF line endings.
- Final newline in Vue and TypeScript files.
- Existing import spacing and quote style should be preserved.
- Use the existing scoped style patterns in Vue components.

## Lifecycle and Browser Behavior

`DailyQuestion.vue` listens for the `visibilitychange` event to detect when the browser tab becomes visible again. If the calendar day has changed, it refreshes from today's date while preserving navigation behavior.

- Always remove listeners in `onBeforeUnmount`.
- Keep date refresh behavior focused on day granularity.
- Preserve navigation to previous, next, and specifically selected dates.

## CI/CD

GitHub Actions runs on pushes to `main`, pull requests, and manual dispatch.

The CI workflow:

1. Checks out the repository.
2. Uses Node.js 26.
3. Runs `npm ci`.
4. Runs `npm run build`.

Pull requests should pass the production build before merge.

## Deployment

The application is deployed through Railway and uses Caddy as the production HTTP server.

- `nixpacks.toml` installs Caddy, formats `Caddyfile`, and starts Caddy in the deployment container.
- `Caddyfile` listens on the `PORT` environment variable.
- Caddy serves the Vite build output from `dist/`.
- `GET /health` returns HTTP 200.
- Static assets are served with gzip encoding.
- SPA routes fall back to `/index.html` through `try_files`.
- Caddy administration and automatic HTTPS are disabled for the Railway environment.
- JSON request logs omit request headers and include the service, event, Railway request ID, and user agent fields.

The deployment flow assumes `npm run build` has created `dist/` before Caddy starts.

## Validation

Before finishing a change, run the smallest relevant validation:

- For application changes: `npm run build`
- For UI or date behavior changes: also run `npm run dev` and manually verify the affected interaction in a browser.
- For dependency or lockfile changes: use `npm ci` or `npm install` consistently with the package manifest.

No automated lint or test suite is configured in the repository.
