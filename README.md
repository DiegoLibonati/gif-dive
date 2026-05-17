# Gif Dive

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Gif Dive** is a single-page web application for discovering and browsing animated GIFs powered by the [Giphy API](https://developers.giphy.com/). It lets you build a personal dashboard of GIF categories in real time, each one populated with a configurable number of results fetched directly from Giphy.

**Core features:**

- **Category search** — Type any keyword into the search field and press GO. A new section for that category is immediately added to the page and filled with GIFs matching your query.
- **Configurable result count** — A number input next to the search field controls how many GIFs are fetched per category. Change it before or between searches to get exactly the amount you want.
- **Surprise mode** — Hit the SURPRISE button to let the app fetch a completely random GIF from Giphy, extract its category automatically, and add it to your board. Useful for discovering unexpected content without having to think of a keyword.
- **Category management** — Each category card has its own delete button so you can remove individual sections when you are done with them. A global REMOVE ALL CATEGORIES button clears the entire board at once.
- **Duplicate prevention** — Submitting a category that already exists on the board is silently ignored, keeping the layout clean.
- **GIF preview modal** — Clicking the title of any GIF opens it in a full-screen modal overlay for a closer look. The modal closes with a single click on the X button, returning you to the board without losing any context.
- **Author information** — Each GIF card surfaces the Giphy creator's avatar, username, and bio. A direct link to the creator's Giphy profile and a one-click WebP download link are included for every GIF.

## Technologies used

Under the hood, Gif Dive is built on top of the following stack:

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

On top of that stack, the project relies on the following packages:

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"msw": "2.10.4"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"undici": "^7.25.0"
"vite": "^7.1.6"
```

## Getting Started

With the stack and dependencies in mind, you can spin the app up locally by following these steps:

1. Clone the repository
2. Navigate to the project folder
3. Copy `.env.example` to `.env` and fill in your Giphy credentials (`VITE_API_URL` and `VITE_API_KEY`) — without these the app cannot reach the Giphy API
4. Execute: `npm install`
5. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app is running locally, you can verify everything works as expected by running the test suite:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

### Pipeline overview

```
                  ┌─── PR or push to main ───┐
                  ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│     testing      │─▶│      build       │
│ eslint · type-check  │  │  jest (jsdom)    │  │ tsc + vite build │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

### Validation jobs (run on every PR and push to `main`)

1. **`lint-and-audit`** — installs dependencies with `npm ci`, then runs `npm run lint` (ESLint over `src/`) and `npm run type-check` (`tsc -p tsconfig.app.json --noEmit`).
2. **`testing`** — runs `npm run test` (Jest under `jest-environment-jsdom`, with MSW intercepting network calls). Depends on `lint-and-audit` passing.
3. **`build`** — runs `npm run build` (type-check via `tsc -p tsconfig.app.json` followed by `vite build`). Depends on `testing` passing.

All three jobs share the same Ubuntu runner, install dependencies with `npm ci`, and pin the Node version through [`.nvmrc`](.nvmrc) using `actions/setup-node` with npm caching enabled.

### Conventional Commits

While the pipeline does not enforce them, commits in this repository follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`feat:`, `fix:`, `chore:`, `refactor:`, etc.) to keep history readable and PRs easy to skim.

### Where the build outputs live

| Output                                    | Location                     |
| ----------------------------------------- | ---------------------------- |
| Validation logs (lint, type-check, tests) | **Actions** tab on GitHub    |
| Production bundle (`dist/`)               | Ephemeral, inside the runner |

> **Note:** the `build` job is a smoke test that confirms a production bundle can be produced; the resulting `dist/` directory is not uploaded as an artifact or deployed automatically.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

## Security Audit

Beyond functional tests, you can also audit the project for vulnerabilities and overall health:

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/gif-dive`](https://www.diegolibonati.com.ar/#/project/gif-dive)
