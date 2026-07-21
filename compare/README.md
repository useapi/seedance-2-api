# Same prompt, four Seedance 2.0 routes

📖 Full write-up: [Seedance 2.0 API Pricing: The Cheapest Ways to Run It, Compared](https://useapi.net/docs/articles/seedance-2-api-pricing)

`compare.mjs` sends one text-to-video prompt to all four Seedance 2.0 routes in parallel — PixVerse, Runway, Dreamina, and MiniMax — polls each until the clip is ready, downloads it, and prints the generation time plus the per-clip cost from [`../pricing/pricing.json`](../pricing/pricing.json).

```bash
node compare.mjs <API_TOKEN> 720p 5
```

Arguments: `resolution` (`480p` / `720p` / `1080p`, default `720p`) and `duration` in seconds (default `5`). Edit the prompt in `prompts.json`. Clips land in `output/`.

Each route speaks a slightly different dialect of the same idea, handled for you in the script:

| Route | Model value | Prompt field | Resolution field | Aspect field | Result URL |
|---|---|---|---|---|---|
| PixVerse | `seedance-2.0` | `prompt` | `quality` (`720p`) | `aspect_ratio` | `url` |
| Runway | `seedance-2` | `text_prompt` | `resolution` (`720p`) | `aspect_ratio` | `artifacts[0].url` |
| Dreamina | `seedance-2.0` | `prompt` | `resolution` (`720p`) | `ratio` | `response.videoUrl` |
| MiniMax | `Seedance-2.0` | `prompt` | `resolution` (`720`, no "p") | `aspectRatio` | `downloadURL` |

Notes worth knowing before you run it:

- **1080p is region- or plan-limited on two routes.** Dreamina serves 1080p and 4K on Canada accounts only, and Runway's 1080p is metered (its unlimited Explore mode caps at 720p and is a legacy perk Runway no longer enables on new accounts). Use `720p` for a clean four-route comparison.
- **Dreamina rejects real human faces** on Seedance 2.0 by moderation; PixVerse, MiniMax, and Runway are friendlier to real people (see the article).
- Multi-account setups can pin an account per service with the `PIXVERSE_EMAIL`, `RUNWAY_EMAIL`, `DREAMINA_ACCOUNT`, and `MINIMAX_ACCOUNT` environment variables. With one account per service, none are needed.
