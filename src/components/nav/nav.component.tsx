import React from 'react';
import Link from 'next/link';
import styles from './nav.module.scss';

type Season = {
  key: string;
  label: string;
  // Swapped in for `label` on narrow screens. Which one shows is a media query
  // in the stylesheet, so both ship in the HTML and neither depends on JS.
  shortLabel: string;
  // `null` while the season has no pages to link to, which is what makes it
  // render as "coming soon" rather than as a link.
  href: string | null;
};

const seasons: Season[] = [
  {
    key: 'fourteen',
    label: 'Temporada 1',
    shortLabel: 'Temp 1',
    href: '/temporada-1/1-4?Ep=1',
  },
  {
    key: 'fifteen',
    label: 'Temporada 2',
    shortLabel: 'Temp 2',
    href: null,
  },
];

// Only one season is published, so the highlighted item never changes and can
// be decided here at build time. Once Temporada 2 ships, this has to come from
// the current route instead — `usePathname()` in a client component, or a prop
// threaded down from the route's own layout to keep the nav on the server.
const ACTIVE_SEASON_KEY = 'fourteen';

const SeasonLabel = ({ season }: { season: Season }) => (
  <>
    <span className={styles.labelLong}>{season.label}</span>
    <span className={styles.labelShort}>{season.shortLabel}</span>
    {season.href === null && (
      <span className={styles.pronto}> (llegará pronto)</span>
    )}
  </>
);

const NavBar = () => {
  return (
    <nav className={styles.mainMenu}>
      <ul>
        {seasons.map((season) => {
          const isActive = season.key === ACTIVE_SEASON_KEY;

          return (
            <li
              key={season.key}
              className={[
                isActive ? styles.activeItem : '',
                season.href === null ? styles.comingSoon : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {season.href === null ? (
                <span className={styles.seasonLink} aria-disabled="true">
                  <SeasonLabel season={season} />
                </span>
              ) : (
                <Link
                  href={season.href}
                  className={styles.seasonLink}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <SeasonLabel season={season} />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
