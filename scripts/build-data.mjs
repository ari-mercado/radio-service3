// Regenerates src/data/data.json from src/data/catalog.json.
//
// catalog.json is the authoritative, flat list of every episode. data.json is
// the derived shape the site reads: episodes bucketed by website season and by
// the twelve labels each season is presented under. Edit the catalog, run this,
// commit both.
//
//   pnpm data:build          rewrite data.json
//   pnpm data:build --check  verify data.json is up to date, write nothing
//
// The checks below are the interesting part: they fail the build rather than
// let a bad catalog through, and the Temporada 1 assertion in particular is
// what stops a data edit from silently moving a published URL.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CATALOG = join(root, 'src/data/catalog.json');
const OUT = join(root, 'src/data/data.json');

const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

// Temporada 1's groups follow the real 2014 air dates. These are the ranges
// that produces, and they are live URLs — if a catalog edit changes them, that
// is a redirect to plan, not a diff to wave through.
const SEASON_1_RANGES = {
  enero: '1-4',
  febrero: '5-8',
  marzo: '9-13',
  abril: '14-17',
  mayo: '18-21',
  junio: '22',
  julio: '23',
  agosto: '24-28',
  septiembre: '29-30',
  octubre: '31-34',
  noviembre: '35-39',
  diciembre: '40',
};

// Temporada 2's labels carry no calendar meaning: its recordings are scattered
// across 2015 and 2016 and an episode's date plays no part in its group or URL.
// Episodes are assigned strictly by global number. Keep in step with
// `SEASONS[1].monthRanges` in src/config/seasons.ts.
const SEASON_2_RANGES = {
  enero: [41, 43],
  febrero: [44, 46],
  marzo: [47, 49],
  abril: [50, 52],
  mayo: [53, 55],
  junio: [56, 58],
  julio: [59, 61],
  agosto: [62, 64],
  septiembre: [65, 67],
  octubre: [68, 70],
  noviembre: [71, 72],
  diciembre: [73, 74],
};

// Exits rather than throwing: a bad catalog is a reportable condition, not a
// crash, and a stack trace would bury the message that says what to fix.
const fail = (message) => {
  console.error(`✗ ${message}`);
  process.exit(1);
};

const catalog = JSON.parse(readFileSync(CATALOG, 'utf8'));
const episodes = catalog.episodes;
const total = episodes.length;

// ---- the catalog itself -----------------------------------------------------
if (total !== catalog.episodeCount) {
  fail(`episodeCount says ${catalog.episodeCount}, found ${total} episodes`);
}
const numbers = episodes.map((e) => e.episodeNumber).sort((a, b) => a - b);
const expected = Array.from({ length: total }, (_, i) => i + 1);
if (numbers.join() !== expected.join()) {
  fail(`episode numbers are not exactly 1..${total} with no gaps or duplicates`);
}
for (const field of ['slug', 'audioFile']) {
  const seen = new Set(episodes.map((e) => e[field]));
  if (seen.size !== total) fail(`duplicate ${field} in the catalog`);
}
for (const e of episodes) {
  if (e.season !== 1 && e.season !== 2) {
    fail(`episode ${e.episodeNumber} has season ${e.season}; expected 1 or 2`);
  }
}

const byNumber = new Map(episodes.map((e) => [e.episodeNumber, e]));

/** Catalog fields in a stable key order. Values are copied verbatim. */
const episode = (n) => {
  const e = byNumber.get(n);
  const out = {
    date: e.date,
    audioFile: e.audioFile,
    audioTitle: e.audioTitle,
    episodeNumber: e.episodeNumber,
    season: e.season,
    description: e.description,
    slug: e.slug,
  };
  // Optional in the schema: emit only when the catalog has them.
  if (e.spotifyUrl !== undefined) out.spotifyUrl = e.spotifyUrl;
  if (e.duration !== undefined) out.duration = e.duration;
  return out;
};

const season = (seasonNumber, seasonTitle, groups) => ({
  seasonNumber,
  seasonTitle,
  allMonths: MONTHS,
  monthsData: Object.fromEntries(
    MONTHS.map((month) => [
      month,
      {
        monthTitle: month[0].toUpperCase() + month.slice(1),
        audioData: groups[month].map(episode),
      },
    ]),
  ),
});

// ---- Temporada 1: grouped by the calendar month of its 2014 air date --------
const s1 = Object.fromEntries(MONTHS.map((m) => [m, []]));
for (const e of episodes.filter((e) => e.season === 1)) {
  s1[MONTHS[Number(e.date.slice(5, 7)) - 1]].push(e.episodeNumber);
}
for (const m of MONTHS) s1[m].sort((a, b) => a - b);

// ---- Temporada 2: grouped strictly by global episode number ----------------
const s2 = Object.fromEntries(
  Object.entries(SEASON_2_RANGES).map(([month, [lo, hi]]) => [
    month,
    Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
  ]),
);

const data = {
  fourteen: season(1, 'Temporada 1', s1),
  seasonTwo: season(2, 'Temporada 2', s2),
};

// ---- the emitted structure --------------------------------------------------
const flat = ['fourteen', 'seasonTwo'].flatMap((key) =>
  MONTHS.flatMap((m) =>
    data[key].monthsData[m].audioData.map((a) => a.episodeNumber),
  ),
);
if (flat.join() !== expected.join()) {
  fail('emitted episodes are not 1..N in order across the two seasons');
}
for (const m of MONTHS) {
  const ns = s1[m];
  if (!ns.length) fail(`Temporada 1 has no episodes for ${m}`);
  const range = ns[0] === ns[ns.length - 1] ? `${ns[0]}` : `${ns[0]}-${ns.at(-1)}`;
  if (range !== SEASON_1_RANGES[m]) {
    fail(
      `Temporada 1 ${m} would become "${range}", was "${SEASON_1_RANGES[m]}" — ` +
        `this changes a published URL. Update SEASON_1_RANGES and ` +
        `src/config/seasons.ts deliberately, and plan a redirect.`,
    );
  }
}
for (const [month, [lo, hi]] of Object.entries(SEASON_2_RANGES)) {
  const ns = data.seasonTwo.monthsData[month].audioData.map(
    (a) => a.episodeNumber,
  );
  const want = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  if (ns.join() !== want.join()) {
    fail(`Temporada 2 ${month} holds ${ns.join()}, expected ${want.join()}`);
  }
}

const serialized = `${JSON.stringify(data, null, 2)}\n`;

if (process.argv.includes('--check')) {
  const current = readFileSync(OUT, 'utf8');
  if (current !== serialized) {
    fail('src/data/data.json is stale — run `pnpm data:build` and commit it');
  }
  console.log(`✓ data.json is up to date with catalog.json (${total} episodes)`);
} else {
  writeFileSync(OUT, serialized);
  console.log(`✓ wrote src/data/data.json from catalog.json (${total} episodes)`);
}
