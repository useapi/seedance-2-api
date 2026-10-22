# Seedance 2.0 and 2.5 pricing — dataset and calculator

Full write-up: [Seedance 2.0 and 2.5 API Pricing: Every Route, Compared](https://useapi.net/docs/articles/seedance-2-api-pricing?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api)

A sourced price dataset for Seedance 2.0 and Seedance 2.5 across the four useapi.net routes, ByteDance's official API, and the third-party field — plus a CLI that computes the cost of any clip on a monthly and a yearly plan.

```bash
node price.mjs 1080p 5                 # Seedance 2.0, 5-second 1080p clip everywhere, plus the reseller field
node price.mjs 4k 10                   # a 10-second 4K clip
node price.mjs 720p 5
node price.mjs 1080p 5 --model 2.5     # Seedance 2.5 (480p / 720p / 1080p, up to 30s)
```

No account or token needed: it reads [`pricing.json`](./pricing.json).

## What's in `pricing.json`

- `official`: ByteDance BytePlus per-second rates for Seedance 2.0 by resolution, and the fine print (prepaid packs, concurrency limits, the enterprise-only real-face contract).
- `useapi_routes`: per-second cost for PixVerse, Dreamina, MiniMax, and Runway on Seedance 2.0: `credits_per_second`, `usd_per_second` (the route's monthly plan) and `usd_per_second_yearly`, with the plan math and real-faces support for each. Dreamina's figures are for a Canada-region Advanced subscription, with a US yearly row for 720p.
- `third_party_1080p_5s`: a 5-second 1080p Seedance 2.0 price for our four routes, the official API, and every verified reseller (Segmind, RunComfy, EachLabs, Replicate, Poyo, EvoLink, PiAPI, Kie.ai, Atlas Cloud, WaveSpeedAI, fal.ai), with a one-line verdict.
- `seedance_2_5`: the same shapes (`official`, `useapi_routes`, `third_party_1080p_5s`) for Seedance 2.5 on PixVerse, Dreamina, and Runway, plus `third_party_720p_only_5s` for vendors with no 1080p tier.
- `watch_for`: the patterns behind Seedance prices that look too good to be true (distilled "turbo" variants, 720p sold as 1080p, 2.0 prices on a 2.5 page, credits with no dollar value).

Every price was verified on 2026-10-05 (first edition 2026-07-21) and this market moves monthly — re-check the linked source before relying on any figure. Our own route prices are computed from the useapi.net credit calculators and plan prices, the official rate from ByteDance's token formula, and third-party prices from each vendor's live page. The Dreamina figures were re-read on 2026-10-21 (Canadian prices converted at CAD/USD 0.7112), and the MiniMax yearly per-credit rate is back-derived from the article's per-clip figures.
