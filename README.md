# Amity Node

Amity Node is a responsive technology services website built with React, TypeScript, and Vite. It includes the home page, all 11 service details, a quote configurator, concept portfolio, interactive Three.js lab, local journal, searchable FAQ, About and Contact pages, legal pages, global content search, and the rule-based Amity Guide.

## Development

```bash
npm install
npm run dev -- --host 0.0.0.0
```

In Codespaces, forward port `5173` and open the forwarded address.

## Checks

```bash
npm run typecheck
npm run build
```

Run `npm run build` to create the deployable site in `dist/`. The Netlify redirect in `public/_redirects` keeps client-side routes working on refresh. Set the build command to `npm run build` and the publish directory to `dist`.

No environment variables or backend services are required. The configurator creates a local enquiry summary and opens WhatsApp or an email draft only when the visitor chooses; it does not submit data to a server. WhatsApp uses the business number `+968 78301334`. A public business email address has not been provided, so the email draft leaves the recipient blank. The site owner should set that destination before promoting email enquiries.

The concept portfolio is explicitly labeled as concept work. Journal articles are local editorial content, not a live news feed. The interactive lab requires browser WebGL and includes a fallback when WebGL is unavailable.

The production hostname is not configured in this repository. Add the final domain before publishing a canonical URL or absolute sitemap; a sitemap with an assumed hostname would be misleading.