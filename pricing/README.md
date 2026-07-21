# Seedance 2.0 pricing — dataset + calculator

📖 Full write-up: [Seedance 2.0 API Pricing: The Cheapest Ways to Run It, Compared](https://useapi.net/docs/articles/seedance-2-api-pricing)

An honest, sourced price dataset for Seedance 2.0 across the four useapi.net routes, ByteDance's official API, and the third-party field — plus a CLI that computes the cost of any clip.

```bash
node price.mjs 1080p 5        # cost of a 5-second 1080p clip everywhere
node price.mjs 4k 10          # a 10-second 4K clip
node price.mjs 720p 5
```

No account or token needed — it reads [`pricing.json`](./pricing.json).

## What's in `pricing.json`

- **`official`** — ByteDance BytePlus per-second rates by resolution, and the fine print (prepaid packs, no free 2.0 trial, the enterprise-only real-face contract).
- **`useapi_routes`** — per-second cost for PixVerse, Dreamina, MiniMax, and Runway on the cheapest sensible plan, with the credit math and the real-faces support for each.
- **`third_party_1080p_5s`** — a 5-second 1080p price for each verified reseller (Segmind, Replicate, fal.ai, and more), with a one-line verdict.
- **`watch_for`** — the patterns behind Seedance prices that look too good to be true (flat-rate cross-subsidies, distilled "turbo" variants, 720p-sold-as-1080p, capped "unlimited", credits with no dollar value).

Every price was verified on **2026-07-21** and this market moves weekly — re-check the linked source before relying on any figure. The dataset is deliberately transparent about method: our own route prices are computed from published credit calculators, the official rate from ByteDance's token formula, and third-party prices from each vendor's live page.
