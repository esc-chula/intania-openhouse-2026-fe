# Intania Openhouse 2026 - Frontend

Welcome to the Intania Openhouse 2026 frontend repository! This is a modern Next.js project strictly organized using a modular architecture for API calls, UI sections, and type-safety.

This README serves as a guide for all coworkers contributing to this codebase to ensure consistency in coding standards.

## 🚀 Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **UI & Styling:** [Material-UI (MUI)](https://mui.com/)
- **State & Data Fetching:** [TanStack React Query](https://tanstack.com/query/latest)
- **HTTP Client:** [`ky`](https://github.com/sindresorhus/ky) (Fetch API wrapper)
- **Forms & Validation:** `react-hook-form` + `zod`
- **Package Manager:** `bun`

---

## 📂 Project Structure

We follow a strict separation of concerns pattern to keep features cleanly isolated from API layers and shared components.

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, global providers)
├── components/           # Generic, highly reusable UI elements (e.g., CustomButton)
├── contexts/             # Global Context Providers (e.g., ReactQueryProvider)
├── layouts/              # Scoped layout components (Main layout, headers, etc)
├── lib/                  # Utilities, Zod schemas, constants, Firebase config
├── sections/             # 🔥 Feature-specific UI components (Views)
├── services/             # 🔥 API fetching logic and hooks
└── types/                # Typescript Definitions aligning with backend JSON models
```

### The `sections/` Directory

Instead of putting all UI logic into `app/[route]/page.tsx`, we extract feature modules into `sections/`.
For example, the form logic lives entirely inside `sections/form/`. The main orchestrator is typically `view/form-view.tsx`. The `app/form/page.tsx` file purely serves to render this View component.

### The `services/` Directory (API Layer)

We use an enterprise-level API layer approach to strictly type and handle API requests over `ky` using React Query. Every new feature should create a folder here (e.g., `services/user/` or `services/form/`).

Inside a feature service folder, segregate by action type:

#### 1. Mutations (POST/PUT/DELETE)

Located in `services/[feature]/mutation/`.

- Define the `fetch` execution function.
- Export a React Hook wrapping `useMutation`.
- Create an `index.ts` to export it nicely.

```typescript
// Example: src/services/form/mutation/use-submit-form.ts
export function useSubmitFormMutation() {
  return useMutation({
    mutationFn: postSubmitForm,
  });
}
```

#### 2. Queries (GET)

Located in `services/[feature]/query/`.

- Must export a `[feature]QueryKeys` object factory.
- Must export the raw `fetch` function.
- Can export `queryOptions()` objects tailored for global `useQuery` usage.

```typescript
// Example: src/services/user/query/user-query.ts
const usersQueryKeys = {
  all: () => ["users"] as const,
  meOptions: (payload) => queryOptions({ ... }),
};
```

---

## 🛠️ Development Workflow: Adding a New Feature

When adding a new feature that communicates with the Backend, follow these 4 steps:

1. **Define the Types (`src/types/`)**
   Look at the OpenAPI spec and create exact TypeScript definitions for the payload requests and responses. (Avoid using generic `any` types).

2. **Create the API Integration (`src/services/`)**
   - If it's a GET request: create `services/[feature]/query/...`
   - If it's a POST/PUT/DELETE: create a hooked `services/[feature]/mutation/use-[name].ts`
   - _Note:_ Use the pre-configured `ky` instance available at `src/services/ky.ts`.

3. **Build the UI (`src/sections/`)**
   Create a new folder for the specific view components. Inject the queries/mutations created in Step 2 directly into the component via React Query hooks.

4. **Add the Route (`src/app/`)**
   Build the `page.tsx`/`layout.tsx` route, import the component from `sections/` and render it.

---

## 🏃‍♂️ Getting Started Locally

Install dependencies using `bun`:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The API proxy points to `localhost:8000` locally.
