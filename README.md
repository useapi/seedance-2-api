# Seedance 2.0 and 2.5 API — four ways to run it, priced honestly (useapi.net)

Runnable examples and an honest price dataset for **ByteDance's Seedance 2.0 and Seedance 2.5** video models, run through [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api). One useapi.net token drives Seedance on **four** platforms — [PixVerse](https://useapi.net/docs/api-pixverse-v2?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), [Runway](https://useapi.net/docs/api-runwayml-v1?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), [Dreamina](https://useapi.net/docs/api-dreamina-v1?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), and [MiniMax](https://useapi.net/docs/api-minimax-v1?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) — each with a different strength.

📖 Full write-up with the pricing math and sources: **[Seedance 2.0 and 2.5 API Pricing: Every Route, Compared](https://useapi.net/docs/articles/seedance-2-api-pricing?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api)**

## The short version — Seedance 2.0 (5-second 1080p clip, verified October 5, 2026)

| Route / provider | Cost | Note |
|---|---:|---|
| **useapi.net · PixVerse** | **$1.44** yearly · $1.80 monthly | cheapest verified 1080p, and the cheapest 4K ($3.20 yearly) |
| useapi.net · Runway | $1.60 yearly · $2.00 monthly | Max plan; real faces, lighter moderation |
| useapi.net · Dreamina | ~$1.66 yearly | Canada accounts only at 1080p; approximate |
| useapi.net · MiniMax | $1.70 yearly · $2.00–2.12 monthly | 4K plus a rich reference-image workflow |
| Segmind | $1.70 | the only reseller below official |
| Official ByteDance | $1.87 | the yardstick |
| Replicate | $2.25 | official model badge |
| fal.ai | $3.41 | the market default — and still the most expensive |

In July the PixVerse route was $1.20 a clip. PixVerse has since repriced Seedance and ended its Pro/Premium discount, so it is now $1.80 on a monthly plan and $1.44 billed yearly. Yearly prices assume you use the plan's credits, and useapi.net's flat $15/month comes on top.

## Seedance 2.5 (5-second clip)

| Route / provider | 480p | 720p | 1080p |
|---|---:|---:|---:|
| Official ByteDance | $0.51 | $1.16 | **$2.84** |
| useapi.net · PixVerse (Premium monthly / yearly) | $0.70 / $0.56 | $1.50 / $1.20 | $3.40 / **$2.72** |
| useapi.net · Dreamina (CA / US, yearly) | $0.64 / $0.69 | $1.40 / $1.50 | $3.41 *(CA only)* |
| useapi.net · Runway (Max monthly / yearly) | $1.00 / $0.80 | $1.50 / $1.20 | — |

On Seedance 2.5 the official API is the cheapest choice except PixVerse Premium billed yearly at 1080p. Our routes are there for real human faces (Dreamina and Runway; the official API rejects them), clips past 30 seconds (Dreamina long video mode, up to 180s), and no $32 prepaid pack. MiniMax does not carry 2.5.

Run `node pricing/price.mjs 1080p 5` (or add `--model 2.5`) to reproduce these numbers at any resolution and duration.

| Example | What it does | Docs |
|---|---|---|
| [`compare/`](./compare) | Send one prompt to all four Seedance 2.0 routes, poll, download, and print cost + generation time per route | [PixVerse](https://useapi.net/docs/api-pixverse-v2/post-pixverse-videos-create-v4?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) · [Runway](https://useapi.net/docs/api-runwayml-v1/post-runwayml-videos-create?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) · [Dreamina](https://useapi.net/docs/api-dreamina-v1/post-dreamina-videos?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) · [MiniMax](https://useapi.net/docs/api-minimax-v1/post-minimax-videos-create?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) |
| [`pricing/`](./pricing) | A sourced Seedance 2.0 + 2.5 price dataset ([`pricing.json`](./pricing/pricing.json)) + a CLI cost calculator ([`price.mjs`](./pricing/price.mjs)) across every route and vendor | [pricing article](https://useapi.net/docs/articles/seedance-2-api-pricing?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) |

## Quick start

You need [Node.js](https://nodejs.org) v21 or newer (no dependencies to install) and a useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api). The calculator needs nothing else:

```bash
git clone https://github.com/useapi/seedance-2-api.git
cd seedance-2-api
node pricing/price.mjs 1080p 5               # Seedance 2.0 — no account needed
node pricing/price.mjs 1080p 5 --model 2.5   # Seedance 2.5
```

To generate real clips across all four routes, connect [PixVerse](https://useapi.net/docs/start-here/setup-pixverse?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), [Runway](https://useapi.net/docs/start-here/setup-runwayml?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), [Dreamina](https://useapi.net/docs/start-here/setup-dreamina?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), and [MiniMax](https://useapi.net/docs/start-here/setup-minimax?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) accounts (one [$15/month subscription](https://useapi.net/docs/subscription?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) covers every useapi.net service):

```bash
cd compare
node compare.mjs <API_TOKEN> 720p 5
```

Edit `compare/prompts.json` to change the prompt. Results land in `compare/output/`. Use `720p` while testing — it works on every route and, on a grandfathered Runway Explore-mode account, generates without spending credits. To try Seedance 2.5, set `model` to `seedance-2.5` on PixVerse or Dreamina, or `seedance-2-5` on Runway (see each endpoint's docs).

## About useapi.net

[useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) is an experimental REST API for AI services. These routes drive your own [PixVerse](https://pixverse.ai), [Runway](https://runwayml.com), [Dreamina](https://dreamina.capcut.com), and [MiniMax](https://hailuoai.video) accounts, so you spend those platforms' consumer credits instead of metered developer-API pricing. On Seedance 2.0 that lands below the official rate; on Seedance 2.5 it mostly does not, and the case is real faces, longer clips, and no prepaid pack. See the [model matrix](https://useapi.net/model-matrix?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) and the [pricing article](https://useapi.net/docs/articles/seedance-2-api-pricing?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api).

Visit our [Discord Server](https://discord.gg/w28uK3cnmF) or [Telegram Channel](https://t.me/use_api) for support. Guides and demos on the [YouTube Channel](https://www.youtube.com/@useapi-net).

*Prices in this repo were verified 2026-10-05 (first published 2026-07-21) and this market moves monthly — re-check the source before relying on any figure.*

## License

The example code in this repository is released under the [MIT License](./LICENSE). It covers the example scripts only, not the useapi.net service or API.
