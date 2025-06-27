# 🎯 Project Gameplan — **Kanban Task‑Management Web App**

*(Frontend Mentor challenge — mobile‑first, UI‑driven, BFF to Spring back‑end, Keycloak + Google/GitHub auth, full quality‑gate test suite)*

---

## 0. Architectural North Star

| Layer | Stack | Purpose |
| --- | --- | --- |
| **UI (Next 14, TS, React 18)** | Design tokens → Atomic UI → Pages (mobile → tablet → desktop) | Fast SSR/ISR, PWA‑ready |
| **BFF (API routes)** | Next API (zod + ts‑rest / tRPC) | Shape/validate payloads; enrich with session; hide back‑end details |
| **Auth** | Keycloak OIDC → next‑auth adaptor (Google, GitHub) | SSO, token refresh & role claims |
| **Back‑End** | Spring Boot 3 + Hexagonal ports/adapters | Business rules, persistence |
| **Quality Gates** | Jest (RTL) • MSW • Supertest • **Percy** • Storybook • WebdriverIO + Cucumber | Catch defects early / cross‑device |

> **Why Percy?** Percy by BrowserStack offers multi‑browser rendering, Keycloak‑friendly SSO and a generous free tier, making it the most popular cloud visual‑diff service in 2025.

---

## 1. Bootstrap (Week 1)

```bash
npx create-next-app kanban --ts --eslint --tailwind
cd kanban && npx sb init
```

**Tooling**

* ESLint + Prettier (single‑quotes, minimal spacing)  
* Husky + lint‑staged → pre‑commit gate  
* Conventional Commits + Commitizen

**Testing base**

```bash
npm i -D jest @testing-library/react @testing-library/jest-dom        msw supertest ts-node        @wdio/cli @wdio/local-runner @wdio/cucumber-framework        percy-storybook @percy/cli
```

---

## 2. Design System & Component‑Driven Dev (Weeks 2‑5)

| Sprint | Deliverables | Tests |
| --- | --- | --- |
| **2** | Tokens, Button, Icon, Avatar | Jest unit; Percy baseline |
| **3** | Input, Modal, Dropdown, Tag, Progress | RTL interaction; Percy |
| **4** | Card, Column, Task tile, DnD | Keyboard + pointer a11y |
| **5** | AuthGuard, Navbar, Drawer | WebdriverIO viewport (375 × 812) |

> Pattern: build inside Storybook → commit only when **unit + Percy** pass.

---

## 3. Page Composition (Weeks 6‑9)

1. `/login` – Keycloak redirect → callback  
2. `/board` (mobile) – columns list, infinite scroll tasks  
3. `/board/[id]` – details modal, task CRUD  
4. `/settings` – theme, account

### Responsive Enhancements

| Week | Tablet (768 × 1024) | Desktop (1280 +) | Tests |
| --- | --- | --- | --- |
| 7 | 2‑col board, collapsible sidebar | Fluid grid ≥ 4 cols | Percy diff breakpoints |
| 8 | Split‑pane edit modal | Drag‑drop multi‑select | WebdriverIO viewport matrix |
| 9 | Hotkeys & ARIA landmarks | Debounced resize | Layout‑scroll assertions |

---

## 4. BFF Layer (parallel from Week 4)

1. **Contracts** – zod schemas shared UI ↔ API  
2. **Routes**

   | BFF Route | Downstream |
   | --- | --- |
   | `GET /api/boards` | `/spring/boards` |
   | `POST /api/tasks` | `/spring/tasks` |

   _Role/tenant injected from Keycloak claims._

3. **Integration tests**: Supertest + MSW

```ts
it('creates task & updates store', async () => {
  server.use(...createTaskHandler)
  const res = await request(app).post('/api/tasks').send(mock)
  expect(res.status).toBe(201)
  expect(store.getState().tasks).toHaveLength(1)
})
```

---

## 5. End‑to‑End Flow (Weeks 8‑10)

* **Docker‑compose** with Keycloak, Postgres, Spring API  
* **Cucumber scenarios**

  | Feature | Scenario |
  | --- | --- |
  | `login.feature` | Google OIDC happy path |
  | `create_task.feature` | drag task, verify counts |
  | `offline_mode.feature` | SW queue → sync |

* **WebdriverIO** runs on mobile + desktop Chrome headless.

---

## 6. Visual Regression with **Percy**

```jsonc
"scripts": {
  "percy:storybook": "percy storybook --config .storybook/main.ts"
}
```

```ts
// e2e step
await browser.percyScreenshot('Board-Mobile', { widths: [375] })
```

*CI fails on diff > 0.1 %*

---

## 7. CI/CD Pipeline (GitHub Actions)

```yaml
name: CI

jobs:
  unit-integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - run: pnpm install
      - run: pnpm test
  storybook-percy:
    needs: unit-integration
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm percy:storybook
  e2e:
    needs: storybook-percy
    services:
      keycloak: …
    steps:
      - run: pnpm wdio run wdio.conf.ts
```

---

## 8. Security & Auth Testing

| Layer | Approach |
| --- | --- |
| **Unit** | Mock `useSession` to assert role gates |
| **Integration** | MSW mocks Keycloak OIDC endpoints |
| **E2E** | Real Keycloak (docker), seeded users |
| **Visual** | Percy snapshots **after** auth cookie |

---

## 9. Timeline (12‑week Roadmap)

| Week | Focus |
| --- | --- |
| **1** | Scaffold, lint, Storybook, Percy baseline |
| 2‑5 | Components (+unit/visual) |
| 4‑7 | API routes & integration tests |
| 6‑7 | Mobile board & CRUD |
| 7‑9 | Tablet & desktop layouts |
| 8‑10 | E2E scenarios |
| 10 | A11y, Lighthouse, perf budgets |
| 11 | Beta launch (staging) |
| 12 | Buffer & retro |

---

## 10. Exit Criteria

* 100 % Storybook coverage of states  
* ≥ 80 % line & branch coverage (Jest)  
* Green Percy baseline (mobile, tablet, desktop)  
* E2E flows pass on Chrome & Firefox  
* Keycloak SSO roles enforced (unit + E2E)  
* CI pipeline < 10 min per PR
