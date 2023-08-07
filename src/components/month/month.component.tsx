'use client';

import React from 'react';
import styles from './month.module.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  transformMonthToCollectionWithSpace,
  transformMonthToCollection,
} from '@/utils/utils';

interface MonthProps {
  month: string;
}

const Month = ({ month }: MonthProps) => {
  // disabled because there actually isn't data available and it created an error
  // const shouldDisable = month === 'diciembre' && year === 'sixteen';
  const params = useParams();
  const isActive = transformMonthToCollection[month] === params.months;
  return (
    <Link
      href={`${transformMonthToCollection[month]}`}
      className={`
      ${styles.link} ${isActive ? styles.activeMonth : ''}
    `}
    >
      {transformMonthToCollectionWithSpace[month]}
    </Link>
  );
};

export default Month;
