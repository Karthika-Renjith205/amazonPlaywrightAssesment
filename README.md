# Amazon Playwright Test Assessment

This project contains Playwright UI and API test suites for Amazon-style automation workflows and supporting API validation.

- **UI tests** ([tests/UI_tests/](tests/UI_tests)) — browser-based tests against Amazon Australia (amazon.com.au), using Page Object Models in [pages/](pages).
- **API tests** ([tests/API_tests/](tests/API_tests)) — CRUD tests against the public Petstore API (`https://petstore.swagger.io/v2/`), using Playwright's `request` context.

Shared settings (base URLs, timeouts, screenshot paths) live in [config.json](config.json) and are read via [config/ConfigManager.ts](config/ConfigManager.ts).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- Git

## Setup (after cloning)

1. Clone the repository and move into it:
   ```
   git clone <repo-url>
   cd amazonPlaywrightAssesment
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install the Playwright browsers (required for the UI tests):
   ```
   npx playwright install
   ```

## Running the tests

The project defines two Playwright projects: `chromium` (UI tests) and `api` (API tests).

### Run everything (UI + API)
```
npm test
```

### Run only the UI tests
```
npm run test:ui
```
Equivalent direct command:
```
npx playwright test --project=chromium
```

### Run only the API tests
```
npm run test:api
```
Equivalent direct command:
```
npx playwright test --project=api
```

### Run a single test file
```
npx playwright test tests/UI_tests/amazon.spec.ts
npx playwright test tests/API_tests/pet.spec.ts
```

### Run a single test by name
```
npx playwright test -g "Category Navigation"
npx playwright test -g "Create a Resource"
```

### Run UI tests in headed mode (visible browser)
```
npm run test:headed
```

### View the HTML report after a run
```
npm run test:report
```

## Project structure

```
config.json                     Shared base URLs, timeouts, screenshot paths
config/ConfigManager.ts         Reads config.json and exposes typed getters
pages/                          Page Object Models for the UI tests
tests/UI_tests/amazon.spec.ts   UI test specs (home page, category nav, search)
tests/API_tests/pet.spec.ts     API CRUD test specs (Petstore)
tests/API_tests/data/*.json     Request headers and payload templates for API tests
playwright.config.ts            Playwright config (chromium + api projects)
screenshots/                    Screenshots captured by UI tests
```
