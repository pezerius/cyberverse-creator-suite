# Backend handoff — Pixels Hub + Studio

Front-end is contract-ready. Every seam the backend needs to fill is one
of these files. **Do not rename the exported symbols** — the whole UI
imports from them.

## The seams

| File | Owns | What to do |
| ---- | ---- | ---------- |
| `src/lib/types.ts` | Wire types (`Game`, `Asset`, `Quest`, `SessionUser`, …) | Keep names + shapes stable. Server mappers convert DB rows → these types. |
| `src/lib/api.ts`   | Every read the UI performs | Replace each function body with a `createServerFn` call or a `useSuspenseQuery` fetcher. Signatures already return `Promise<T>`. |
| `src/lib/actions.ts` | Every mutation the UI triggers | Replace each `run(schema.parse, …)` body with a `createServerFn({ method: "POST" }).inputValidator(schema.parse).handler(...)` call. Keep the toast. |
| `src/lib/schemas.ts` | Zod validators for POSTs | Reuse **identically** on the server via `.inputValidator(schema.parse)`. No drift. |
| `src/lib/auth.ts` | `useSession()` + role asserts | Swap the fake user for a real `supabase.auth.onAuthStateChange` subscription. Same return shape. |
| `src/routes/_authenticated.tsx` | Auth boundary | Add `beforeLoad` that checks `supabase.auth.getSession()` and redirects to `/login`. Move routes that require auth into this layout (rename file → `_authenticated.<name>.tsx`). |

## Migration recipe (per resource)

1. Add a Supabase table matching the type in `src/lib/types.ts`.
2. In `src/lib/api.ts`, replace the mock read with a server-fn / queryOptions.
3. In `src/lib/actions.ts`, replace the mutation stub — keep the schema parse call, run it server-side too.
4. Delete the `src/lib/mock-<name>.ts` file only after `rg "from \"@/lib/mock-<name>\""` returns nothing.

## Routes needing auth (move under `_authenticated/` when wiring real auth)

`wallet`, `library`, `locker`, `wishlist`, `notifications`, `settings`,
`profile`, `feed`, `studio.*`, `manage.$kind.$id`, `marketplace.list`.

Public: `index`, `hub`, `home`, `g.$slug`, `marketplace.index`,
`marketplace.$assetId`, `u.$handle`, `collections*`, `search`,
`quests` (browsing only — claim requires auth), `tournaments`,
`changelog`, `pro`, `legal.*`, `login`.

## Loading / empty / error primitives

`src/components/DataState.tsx` exports `SkeletonList`, `EmptyState`,
`ErrorState`. Use these on every data page — do not hand-roll variants.

## Auth methods (recommended defaults for Lovable Cloud)

Email + password, Phone (SMS), Apple, Google. TikTok is not native to
Lovable Cloud — connect via Supabase dashboard if needed. Enable HIBP
password check on signup.
