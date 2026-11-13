# Songbook

A progressive web app to organize your leadsheets.

## Development

Requires Node.js 26 and pnpm (`corepack enable`).

```sh
pnpm install
pnpm start      # dev server
pnpm test       # unit tests (Vitest)
pnpm typecheck  # TypeScript
pnpm lint       # ESLint and Prettier check
pnpm format     # apply Prettier
pnpm build      # production build into build/
```

Pushes to the default branch are deployed to Firebase by GitHub Actions. The workflow expects a `FIREBASE_SERVICE_ACCOUNT` secret holding a service account key with these roles: Firebase Hosting Admin, Firebase Rules Admin and Service Usage Consumer. It deploys Hosting and the Firestore rules; Firestore indexes are not deployed.

To run against local Firebase emulators (requires Java), start `pnpm emulators` in one terminal and `pnpm start:emulators` in another.
