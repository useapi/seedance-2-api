#!/usr/bin/env node
// Same prompt, four Seedance 2.0 routes — PixVerse, Runway, Dreamina, MiniMax — through the
// useapi.net API. Submits one text-to-video prompt to each, polls until the clip is ready,
// downloads it, and prints the generation time and the per-clip cost from ../pricing/pricing.json.
//
//   node compare.mjs <API_TOKEN> [resolution] [duration]
//     resolution : 480p | 720p (default) | 1080p     duration: seconds, default 5
//
// Optional env for multi-account setups (omit if you have one account per service):
//   PIXVERSE_EMAIL  RUNWAY_EMAIL  DREAMINA_ACCOUNT  MINIMAX_ACCOUNT
//
// 📖 Full pricing write-up: https://useapi.net/docs/articles/seedance-2-api-pricing

import { readFileSync, mkdirSync, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOKEN = process.argv[2];
if (!TOKEN) { console.error('Usage: node compare.mjs <API_TOKEN> [resolution] [duration]'); process.exit(1); }
const RES = process.argv[3] || '720p';          // 480p | 720p | 1080p
const DUR = Number(process.argv[4] || 5);
const here = path.dirname(fileURLToPath(import.meta.url));
const prompt = JSON.parse(readFileSync(path.join(here, 'prompts.json'), 'utf8')).prompt;
const pricing = JSON.parse(readFileSync(path.join(here, '..', 'pricing', 'pricing.json'), 'utf8')).useapi_routes;
const outDir = path.join(here, 'output');
mkdirSync(outDir, { recursive: true });

const H = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const now = () => Date.now();

async function api(method, url, body) {
  const res = await fetch(url, { method, headers: H, body: body ? JSON.stringify(body) : undefined });
  let json; try { json = JSON.parse(await res.text()); } catch { json = {}; }
  return { status: res.status, json };
}
async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(file));
}
function costOf(routeKey) {
  const perSec = pricing[routeKey]?.usd_per_second?.[RES];
  return typeof perSec === 'number' ? `$${(perSec * DUR).toFixed(2)}` : 'metered/unpriced';
}

// NOTE: ids go into the poll path RAW — never URL-encode the ':' or '@' (breaks the path match).
const POLL_MS = 15_000, TIMEOUT_MS = 25 * 60 * 1000;

const routes = [
  { key: 'pixverse', name: 'PixVerse', model: 'seedance-2.0',
    submit: async () => {
      const body = { model: 'seedance-2.0', prompt, quality: RES, duration: DUR, aspect_ratio: '16:9' };
      if (process.env.PIXVERSE_EMAIL) body.email = process.env.PIXVERSE_EMAIL;
      const r = await api('POST', 'https://api.useapi.net/v2/pixverse/videos/create', body);
      if (r.status >= 300) throw new Error(JSON.stringify(r.json).slice(0, 200));
      return r.json.video_id;
    },
    poll: async id => {
      const r = await api('GET', `https://api.useapi.net/v2/pixverse/videos/${id}`);
      if (r.status === 404) return null;                       // still processing
      if (r.json.video_status_name && !['COMPLETED', 'QUEUED', 'GENERATING'].includes(r.json.video_status_name) && r.json.video_status_final)
        throw new Error(`status ${r.json.video_status_name}`);
      return r.json.video_status_final && r.json.url ? { url: r.json.url } : null;
    } },
  { key: 'runway', name: 'Runway', model: 'seedance-2',
    submit: async () => {
      const body = { model: 'seedance-2', text_prompt: prompt, resolution: RES, duration: DUR, aspect_ratio: '16:9' };
      if (process.env.RUNWAY_EMAIL) body.email = process.env.RUNWAY_EMAIL;
      const r = await api('POST', 'https://api.useapi.net/v1/runwayml/videos/create', body);
      if (r.status >= 300) throw new Error(JSON.stringify(r.json).slice(0, 200));
      return r.json.taskId;
    },
    poll: async id => {
      const r = await api('GET', `https://api.useapi.net/v1/runwayml/tasks/${id}`);
      if (r.json.status === 'FAILED') throw new Error('runway task failed');
      return r.json.status === 'SUCCEEDED' ? { url: r.json.artifacts?.[0]?.url } : null;
    } },
  { key: 'dreamina', name: 'Dreamina', model: 'seedance-2.0',
    submit: async () => {
      const body = { model: 'seedance-2.0', prompt, resolution: RES, duration: DUR, ratio: '16:9' };
      if (process.env.DREAMINA_ACCOUNT) body.account = process.env.DREAMINA_ACCOUNT;
      const r = await api('POST', 'https://api.useapi.net/v1/dreamina/videos', body);
      if (r.status >= 300) throw new Error(JSON.stringify(r.json).slice(0, 200));
      return r.json.jobid;
    },
    poll: async id => {
      const r = await api('GET', `https://api.useapi.net/v1/dreamina/videos/${id}`);
      if (r.json.status === 'failed') throw new Error('dreamina job failed');
      return r.json.status === 'completed' ? { url: r.json.response?.videoUrl } : null;
    } },
  { key: 'minimax', name: 'MiniMax', model: 'Seedance-2.0',
    submit: async () => {
      const body = { model: 'Seedance-2.0', prompt, resolution: RES.replace('p', ''), duration: DUR, aspectRatio: '16:9' };
      if (process.env.MINIMAX_ACCOUNT) body.account = process.env.MINIMAX_ACCOUNT;
      const r = await api('POST', 'https://api.useapi.net/v1/minimax/videos/create', body);
      if (r.status >= 300) throw new Error(JSON.stringify(r.json).slice(0, 200));
      return r.json.videoId;
    },
    poll: async id => {
      const r = await api('GET', `https://api.useapi.net/v1/minimax/videos/${id}`);
      if (r.json.status === 3) throw new Error('minimax video failed');
      return r.json.status === 2 ? { url: r.json.downloadURL || r.json.videoURL } : null;
    } },
];

console.log(`Seedance 2.0 · ${RES} · ${DUR}s · "${prompt.slice(0, 60)}..."\n`);
const results = await Promise.allSettled(routes.map(async (rt, i) => {
  await sleep(i * 2000);
  const t0 = now();
  const id = await rt.submit();
  console.log(`[${rt.name}] submitted (${rt.model})`);
  let done = null;
  while (!done) {
    if (now() - t0 > TIMEOUT_MS) throw new Error('timeout');
    await sleep(POLL_MS);
    done = await rt.poll(id);
  }
  const secs = Math.round((now() - t0) / 1000);
  const file = path.join(outDir, `${rt.key}-${RES}.mp4`);
  if (done.url) await download(done.url, file);
  console.log(`[${rt.name}] done in ${secs}s · cost ${costOf(rt.key)} · ${path.basename(file)}`);
  return { route: rt.name, seconds: secs, cost: costOf(rt.key) };
}));

console.log('\n─ Summary ─────────────────────────────');
results.forEach((r, i) => {
  if (r.status === 'fulfilled') console.log(`  ${r.value.route.padEnd(9)} ${r.value.cost.padStart(16)}   ${r.value.seconds}s`);
  else console.log(`  ${routes[i].name.padEnd(9)} FAILED: ${String(r.reason).slice(0, 80)}`);
});
console.log('\nCosts from ../pricing/pricing.json (verified 2026-07-21). Re-check before relying.');
