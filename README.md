# Seedance 2.0 and 2.5 API — four ways to run it, priced honestly (useapi.net)

Runnable examples and a sourced price dataset for ByteDance's Seedance 2.0 and Seedance 2.5 video models, run through [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), a third-party REST API. One useapi.net token runs Seedance on four platforms, each with your website subscription there: [PixVerse](https://useapi.net/docs/api-pixverse-v2?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), [Runway](https://useapi.net/docs/api-runwayml-v1?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), [Dreamina](https://useapi.net/docs/api-dreamina-v1?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), and [MiniMax](https://useapi.net/docs/api-minimax-v1?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), each with a different strength.

Full write-up with the pricing math and sources: [Seedance 2.0 and 2.5 API Pricing: Every Route, Compared](https://useapi.net/docs/articles/seedance-2-api-pricing?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api)

## The short version: Seedance 2.0, a 5-second 1080p clip (as of October 2026)

| Route / provider | Cost | Note |
|---|---:|---|
| useapi.net · PixVerse | $1.44 yearly · $1.80 monthly | PixVerse Premium, the cheapest verified 1080p, and the cheapest 4K ($3.20 yearly) |
| useapi.net · Runway | $1.60 yearly | Runway Max billed yearly, real faces, lighter moderation |
| useapi.net · Dreamina | $1.83 yearly · $1.86 monthly | Dreamina Advanced, Canada accounts only at 1080p |
| useapi.net · MiniMax | $1.70 yearly · $2.00 to $2.12 monthly | Hailuo AI Master billed yearly, Max or Master monthly, 4K plus a rich reference-image workflow |
| Segmind | $1.70 | the only reseller below official |
| Official ByteDance | $1.87 | the yardstick |
| Replicate | $2.25 | official model badge |
| fal.ai | $3.41 | the market default, and still the most expensive |

In July the PixVerse route was $1.20 a clip. PixVerse has since repriced Seedance and ended its Pro and Premium discount, so it is now $1.80 on a monthly plan and $1.44 billed yearly. At 4K only PixVerse and MiniMax billed yearly come in under the official $3.89. Each route price is the website subscription's cost for the credits that clip uses, and yearly prices assume you use the plan's credits.

## Seedance 2.5: real faces and clips past 30 seconds

Through useapi.net you can run Seedance 2.5 on real people and on long clips, which ByteDance's official API restricts. Its own [Seedance 2.5 guide](https://docs.byteplus.com/en/docs/modelark/seedance-2-5) says: "Seedance 2.5 does not support directly uploading reference images or videos containing real human faces". It also stops at 30 seconds a clip. Our [Dreamina route](https://useapi.net/docs/api-dreamina-v1/post-dreamina-videos?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) takes a real photo as a reference or first frame, and its long video mode runs 31 to 180 seconds in one job. The [Runway route](https://useapi.net/docs/api-runwayml-v1/post-runwayml-videos-create?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) also accepts real faces on Seedance.

At 1080p, a 5-second Seedance 2.5 clip costs less on our PixVerse and Runway routes than on the official API (as of October 2026):

| Route / provider | 1080p, 5 s |
|---|---:|
| useapi.net · PixVerse (Premium billed yearly) | $2.72 |
| useapi.net · Runway (Max billed yearly) | $2.72 |
| Official ByteDance | $2.84 |

Yearly prices assume you use the plan's credits.

Run `node pricing/price.mjs 1080p 5` (or add `--model 2.5`) to reproduce these numbers at any resolution and duration.

| Example | What it does | Docs |
|---|---|---|
| [`compare/`](./compare) | Send one prompt to all four Seedance 2.0 routes, poll, download, and print the cost and generation time per route | [PixVerse](https://useapi.net/docs/api-pixverse-v2/post-pixverse-videos-create-v4?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) · [Runway](https://useapi.net/docs/api-runwayml-v1/post-runwayml-videos-create?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) · [Dreamina](https://useapi.net/docs/api-dreamina-v1/post-dreamina-videos?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) · [MiniMax](https://useapi.net/docs/api-minimax-v1/post-minimax-videos-create?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) |
| [`pricing/`](./pricing) | A sourced Seedance 2.0 and 2.5 price dataset ([`pricing.json`](./pricing/pricing.json)) and a CLI cost calculator ([`price.mjs`](./pricing/price.mjs)) across every route and vendor | [pricing article](https://useapi.net/docs/articles/seedance-2-api-pricing?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) |

## Quick start

You need [Node.js](https://nodejs.org) v21 or newer (no dependencies to install) and a useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api). The calculator needs nothing else:

```bash
git clone https://github.com/useapi/seedance-2-api.git
cd seedance-2-api
node pricing/price.mjs 1080p 5               # Seedance 2.0 — no account needed
node pricing/price.mjs 1080p 5 --model 2.5   # Seedance 2.5
```

To generate real clips across all four routes, connect [PixVerse](https://useapi.net/docs/start-here/setup-pixverse?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), [Runway](https://useapi.net/docs/start-here/setup-runwayml?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), [Dreamina](https://useapi.net/docs/start-here/setup-dreamina?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), and [MiniMax](https://useapi.net/docs/start-here/setup-minimax?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) accounts (one [$15/month subscription](https://useapi.net/docs/subscription?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) covers every useapi.net API and 3 accounts on each):

```bash
cd compare
node compare.mjs <API_TOKEN> 720p 5
```

Edit `compare/prompts.json` to change the prompt. Results land in `compare/output/`. Use `720p` while testing: it works on every route and, on a grandfathered Runway Explore-mode account, generates without spending credits. To try Seedance 2.5, set `model` to `seedance-2.5` on PixVerse or Dreamina, or `seedance-2-5` on Runway (see each endpoint's docs).

## About useapi.net

[useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) is a third-party REST API for AI services. These routes run on your [PixVerse](https://app.pixverse.ai/subscribe), [Runway](https://runway.com/pricing), [Dreamina](https://dreamina.capcut.com/pricing/dreamina-price) and [Hailuo AI](https://hailuoai.video/subscribe/modal) (MiniMax) website subscriptions, so you spend those platforms' credits instead of metered developer-API pricing. On Seedance 2.0 at 1080p that lands below the official rate on every route billed yearly, and on PixVerse and Dreamina billed monthly. On Seedance 2.5 the Dreamina route takes real human faces and clips up to 180 seconds, and PixVerse or Runway billed yearly is cheaper at 1080p. See the [pricing article](https://useapi.net/docs/articles/seedance-2-api-pricing?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), the [Sora 2 alternatives comparison](https://useapi.net/docs/articles/sora-2-api-alternatives?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api), the [Dreamina tutorial](https://useapi.net/docs/articles/dreamina-bash?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api) and the [model matrix](https://useapi.net/model-matrix?utm_source=github.com&utm_medium=referral&utm_campaign=seedance-2-api).

Visit our [Discord Server](https://discord.gg/w28uK3cnmF) or [Telegram Channel](https://t.me/use_api) for support. Guides and demos on the [YouTube Channel](https://www.youtube.com/@useapi-net).

Prices in this repo were verified 2026-10-05 (first published 2026-07-21), with the Dreamina figures re-read on 2026-10-21 and every route re-checked against the useapi.net API overviews on 2026-10-22. This market moves monthly, so re-check the source before relying on any figure.

## License

The example code in this repository is released under the [MIT License](./LICENSE). It covers the example scripts only, not the useapi.net service or API.
