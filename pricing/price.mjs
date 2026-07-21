#!/usr/bin/env node
// Seedance 2.0 cost calculator — prints $ per clip across useapi.net routes, the official
// ByteDance API, and the third-party field, from pricing.json.
//
//   node price.mjs [resolution] [duration]
//     resolution: 480p | 720p | 1080p (default) | 4k | 2160p     duration: seconds, default 5
//
// 📖 Full write-up: https://useapi.net/docs/articles/seedance-2-api-pricing

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RES = (process.argv[2] || '1080p').toLowerCase();
const DUR = Number(process.argv[3] || 5);
const p = JSON.parse(readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'pricing.json'), 'utf8'));
const key = RES === '2160p' ? '4k' : RES;   // pricing.json uses "4k"
const fmt = v => v == null ? '     —    ' : `$${v.toFixed(2)}`.padStart(10);

console.log(`\nSeedance 2.0 — cost of a ${DUR}s ${RES} clip (verified ${p.verified})\n`);

const rows = [];
for (const [k, r] of Object.entries(p.useapi_routes)) {
  if (k === '_about' || k === 'subscription') continue;
  const ps = r.usd_per_second?.[key];
  rows.push({ who: `useapi.net · ${k}`, cost: typeof ps === 'number' ? ps * DUR : null, note: r.plan });
}
const ops = p.official.usd_per_second?.[key];
rows.push({ who: 'official · ByteDance', cost: typeof ops === 'number' ? ops * DUR : null, note: 'BytePlus ModelArk' });

rows.sort((a, b) => (a.cost ?? 1e9) - (b.cost ?? 1e9));
console.log('  Route / provider           Cost      Plan');
console.log('  ' + '─'.repeat(60));
for (const r of rows) console.log(`  ${r.who.padEnd(24)} ${fmt(r.cost)}   ${r.note}`);
console.log('\n  (useapi.net adds a flat $15/mo across every service on top of the account plan.)');

if (key === '1080p' && DUR === 5) {
  console.log('\n  Third-party resellers — 5s 1080p (verified 2026-07-21):');
  console.log('  ' + '─'.repeat(60));
  for (const v of p.third_party_1080p_5s.sort((a, b) => a.usd_per_5s - b.usd_per_5s))
    console.log(`  ${('$' + v.usd_per_5s.toFixed(2)).padStart(7)}  ${v.vendor.padEnd(28)} ${v.verdict}`);
}

console.log('\n  Watch for:');
for (const w of p.watch_for) console.log(`   • ${w}`);
console.log('\n  Prices shift weekly — re-check the source before relying.\n');
