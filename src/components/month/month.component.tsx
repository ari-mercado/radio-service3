import React from 'react';
import styles from './month.module.scss';
import Link from 'next/link';

import {
  MonthName,
  SeasonConfig,
  firstEpisodeOfRange,
  spacedRange,
} from '@/config/seasons';

interface MonthProps {
  season: SeasonConfig;
  month: MonthName;
  currentRange: string;
}

const Month = ({ season, month, currentRange }: MonthProps) => {
  const range = season.monthRanges[month];
  const isActive = range === currentRange;
  // Absolute rather than relative, so a link means the same thing regardless of
  // which season's page it is rendered on.
  const href = `${season.basePath}/${range}?Ep=${firstEpisodeOfRange(range)}`;

  return (
    <Link
      href={href}
      scroll={false}
      className={`
      ${styles.link} ${isActive ? styles.activeMonth : ''}
    `}
      aria-current={isActive ? 'page' : undefined}
    >
      {spacedRange(range)}
    </Link>
  );
};

export default Month;
