# Amity Node

The Amity Node website, built with React, TypeScript, and Vite.

## Development

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## Checks

```bash
npm run typecheck
npm run build
```

The app is configured for static hosting on Netlify. Run `npm run build` to create the deployable site in `dist/`; the included redirect rule keeps client-side routes working on refresh. Set the build command to `npm run build` and the publish directory to `dist`.