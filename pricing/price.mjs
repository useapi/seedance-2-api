#!/usr/bin/env node
// Seedance 2.0 / 2.5 cost calculator — prints $ per clip across the useapi.net routes (monthly and
// yearly plan), the official ByteDance API, and the third-party field, from pricing.json.
//
//   node price.mjs [resolution] [duration] [--model 2.0|2.5]
//     resolution: 480p | 720p | 1080p (default) | 4k | 2160p     duration: seconds, default 5
//     --model   : 2.0 (default) or 2.5 — Seedance 2.5 tops out at 1080p
//
// 📖 Full write-up: https://useapi.net/docs/articles/seedance-2-api-pricing

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
let MODEL = '2.0';
const pos = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--model') MODEL = args[++i];
  else if (a.startsWith('--model=')) MODEL = a.slice(8);
  else pos.push(a);
}
if (!['2.0', '2.5'].includes(MODEL)) { console.error(`Unknown --model ${MODEL} (use 2.0 or 2.5)`); process.exit(1); }
const RES = (pos[0] || '1080p').toLowerCase();
const DUR = Number(pos[1] || 5);
if (!Number.isFinite(DUR) || DUR <= 0) { console.error('Usage: node price.mjs [resolution] [duration] [--model 2.0|2.5]'); process.exit(1); }

const p = JSON.parse(readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'pricing.json'), 'utf8'));
const data = MODEL === '2.5'
  ? p.seedance_2_5
  : { official: p.official, useapi_routes: p.useapi_routes, third_party_1080p_5s: p.third_party_1080p_5s };

// pricing.json keys 4K as "4k" (official, MiniMax, Dreamina) or "2160p" (PixVerse) — accept either.
const KEYS = (RES === '4k' || RES === '2160p') ? ['4k', '2160p'] : [RES];
const perSec = obj => { for (const k of KEYS) if (typeof obj?.[k] === 'number') return obj[k]; return null; };
const clip = ps => ps == null ? null : ps * DUR;
const fmt = v => (v == null ? '—' : `$${v.toFixed(2)}`).padStart(9);

console.log(`\nSeedance ${MODEL} — cost of a ${DUR}s ${RES} clip (verified ${p.verified})\n`);

const rows = [];
for (const [k, r] of Object.entries(data.useapi_routes)) {
  if (k === '_about' || k === 'subscription') continue;
  const yearlyOnly = r.usd_per_second_billing === 'yearly';
  const monthly = yearlyOnly ? null : clip(perSec(r.usd_per_second));
  const yearly = clip(perSec(r.usd_per_second_yearly));
  rows.push({ who: `useapi.net · ${k}${r.plan_us ? ' (CA)' : ''}`, monthly, yearly, note: r.plan });
  if (r.usd_per_second_us_yearly) {
    const us = clip(perSec(r.usd_per_second_us_yearly));
    rows.push({ who: `useapi.net · ${k} (US)`, monthly: null, yearly: us, note: r.plan_us });
  }
}
const off = clip(perSec(data.official.usd_per_second));
rows.push({ who: 'official · ByteDance', monthly: off, yearly: off, note: 'BytePlus ModelArk, pay per token (prepaid pack required)' });

const best = r => Math.min(r.monthly ?? 1e9, r.yearly ?? 1e9);
rows.sort((a, b) => best(a) - best(b));
console.log('  Route / provider              Monthly    Yearly   Plan');
console.log('  ' + '─'.repeat(78));
for (const r of rows) console.log(`  ${r.who.padEnd(27)} ${fmt(r.monthly)} ${fmt(r.yearly)}   ${r.note}`);
console.log('\n  "—" = not offered at this resolution, or no figure for that billing period.');
console.log('  useapi.net adds a flat $15/mo across every service on top of the account plan.');

if (RES === '1080p' && DUR === 5) {
  console.log(`\n  Third-party field — Seedance ${MODEL}, 5s 1080p (verified ${p.verified}):`);
  console.log('  ' + '─'.repeat(78));
  for (const v of [...data.third_party_1080p_5s].sort((a, b) => a.usd_per_5s - b.usd_per_5s)) {
    const price = v.usd_per_5s_high ? `$${v.usd_per_5s.toFixed(2)}–${v.usd_per_5s_high.toFixed(2)}` : `$${v.usd_per_5s.toFixed(2)}`;
    console.log(`  ${price.padStart(11)}  ${v.vendor.padEnd(28)} ${v.verdict}`);
  }
  for (const v of data.third_party_720p_only_5s || [])
    console.log(`  ${'720p only'.padStart(11)}  ${v.vendor.padEnd(28)} $${v.usd_per_5s_720p.toFixed(2)} at 720p — ${v.verdict}`);
}

console.log('\n  Watch for:');
for (const w of p.watch_for) console.log(`   • ${w}`);
console.log('\n  Prices shift monthly — re-check the source before relying.\n');
