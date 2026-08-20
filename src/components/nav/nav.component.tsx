'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav.module.scss';
import {
  SEASONS,
  firstEpisodeOfRange,
  rangesOf,
  seasonForPath,
} from '@/config/seasons';

// Both seasons are published, so the highlighted item depends on where the
// visitor is. `usePathname` is read during prerendering too, so each statically
// generated page ships with its own season already marked active — unlike
// `useSearchParams`, it needs no Suspense boundary and forces no bailout.
const NavBar = () => {
  const pathname = usePathname() ?? '';
  const activeSeason = seasonForPath(pathname);

  return (
    <nav className={styles.mainMenu}>
      <ul>
        {SEASONS.map((season) => {
          const isActive = season.number === activeSeason?.number;
          // Open each season on its first group, with its first episode
          // selected — the same entry point the month links use.
          const firstRange = rangesOf(season)[0];
          const href = `${season.basePath}/${firstRange}?Ep=${firstEpisodeOfRange(firstRange)}`;

          return (
            <li
              key={season.number}
              className={isActive ? styles.activeItem : ''}
            >
              <Link
                href={href}
                className={styles.seasonLink}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.labelLong}>{season.label}</span>
                <span className={styles.labelShort}>{season.shortLabel}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
