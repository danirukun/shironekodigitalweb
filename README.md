# Shironeko Digital (Astro)

## Commands

| Command | Action |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server at `http://localhost:4321` |
| `pnpm build` | Production build to `dist/` |
| `pnpm preview` | Preview the production build |

## Sanity CMS

- **Project ID:** `m4iidr52` · **Dataset:** `production` · **Org ID:** `oKUpUxLlC`
- **Embedded Studio:** `/admin` (hash-based router so the site stays a static build; Studio uses client-side routing under that path.)
- **Schema:** defined in [`sanity.config.ts`](sanity.config.ts) and [`src/sanity/schemaTypes/`](src/sanity/schemaTypes/).

### First-time setup

1. **CORS:** In [Sanity manage](https://www.sanity.io/manage) → API → CORS origins, add `http://localhost:4321` and your production site origin.
2. **Studio:** Run `pnpm dev` and open **http://localhost:4321/admin** — sign in with your Sanity account. The schema is loaded from this repo’s `sanity.config.ts` (no separate schema upload step for standard Studio).
3. **Seed the ClubCast portfolio document** (optional; requires a token with write access for the HTTP API):

   ```sh
   cp .env.example .env
   # set SANITY_API_WRITE_TOKEN in .env, then:
   export $(grep -v '^#' .env | xargs) && pnpm seed:clubcast
   ```

The portfolio page reads `portfolioProject` documents from Sanity; until you deploy the schema and seed (or create content in Studio), `/portfolio` may list no projects.
