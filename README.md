# Seedance 2.0 API — four ways to run it, priced honestly (useapi.net)

Runnable examples and an honest price dataset for **ByteDance's Seedance 2.0** video model, run through [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api). One useapi.net token drives Seedance 2.0 on **four** platforms — [PixVerse](https://useapi.net/docs/api-pixverse-v2), [Runway](https://useapi.net/docs/api-runwayml-v1), [Dreamina](https://useapi.net/docs/api-dreamina-v1), and [MiniMax](https://useapi.net/docs/api-minimax-v1) — each with a different strength.

📖 Full write-up with the pricing math and sources: **[Seedance 2.0 API Pricing: The Cheapest Ways to Run It, Compared](https://useapi.net/docs/articles/seedance-2-api-pricing)**

## The short version (5-second 1080p clip, verified July 2026)

| Route / provider | Cost | Note |
|---|---:|---|
| **useapi.net · PixVerse** | **$1.20** | cheapest verified 1080p, and the lowest-priced 4K |
| Segmind | $1.70 | the only reseller below official |
| Official ByteDance | $1.87 | the yardstick |
| Replicate | $2.25 | official model badge |
| fal.ai | $3.41 | the market default — and the most expensive standard 2.0 |

Run `node pricing/price.mjs 1080p 5` to reproduce this, or any resolution/duration.

| Example | What it does | Docs |
|---|---|---|
| [`compare/`](./compare) | Send one prompt to all four Seedance routes, poll, download, and print cost + generation time per route | [PixVerse](https://useapi.net/docs/api-pixverse-v2/post-pixverse-videos-create-v4) · [Runway](https://useapi.net/docs/api-runwayml-v1/post-runwayml-videos-create) · [Dreamina](https://useapi.net/docs/api-dreamina-v1/post-dreamina-videos) · [MiniMax](https://useapi.net/docs/api-minimax-v1/post-minimax-videos-create) |
| [`pricing/`](./pricing) | A sourced Seedance 2.0 price dataset ([`pricing.json`](./pricing/pricing.json)) + a CLI cost calculator ([`price.mjs`](./pricing/price.mjs)) across every route and vendor | [pricing article](https://useapi.net/docs/articles/seedance-2-api-pricing) |

## Quick start

You need [Node.js](https://nodejs.org) v21 or newer (no dependencies to install) and a useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api). The calculator needs nothing else:

```bash
git clone https://github.com/useapi/seedance-2-api.git
cd seedance-2-api
node pricing/price.mjs 1080p 5        # cost calculator — no account needed
```

To generate real clips across all four routes, connect [PixVerse](https://useapi.net/docs/start-here/setup-pixverse), [Runway](https://useapi.net/docs/start-here/setup-runwayml), [Dreamina](https://useapi.net/docs/start-here/setup-dreamina), and [MiniMax](https://useapi.net/docs/start-here/setup-minimax) accounts (one [$15/month subscription](https://useapi.net/docs/subscription?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) covers every useapi.net service):

```bash
cd compare
node compare.mjs <API_TOKEN> 720p 5
```

Edit `compare/prompts.json` to change the prompt. Results land in `compare/output/`. Use `720p` while testing — it works on every route and, on a grandfathered Runway Explore-mode account, generates without spending credits.

## About useapi.net

[useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) is an experimental REST API for AI services. These routes drive your own [PixVerse](https://pixverse.ai), [Runway](https://runwayml.com), [Dreamina](https://dreamina.capcut.com), and [MiniMax](https://hailuoai.video) accounts, so you spend those platforms' consumer credits instead of metered developer-API pricing — which is why Seedance runs cheaper here. See the [model matrix](https://useapi.net/model-matrix?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) and the [pricing article](https://useapi.net/docs/articles/seedance-2-api-pricing).

Visit our [Discord Server](https://discord.gg/w28uK3cnmF) or [Telegram Channel](https://t.me/use_api) for support. Guides and demos on the [YouTube Channel](https://www.youtube.com/@midjourneyapi).

*Prices in this repo were verified 2026-07-21 and shift weekly — re-check the source before relying on any figure.*
