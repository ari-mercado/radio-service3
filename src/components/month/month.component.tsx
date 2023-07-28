import React from 'react';
import styles from './month.module.scss';

interface MonthProps {
  month: string;
  handleMonth: (month: string) => unknown;
  activeMonth: string;
  handleActiveMonth: (month: string, year: string) => unknown;
  year: string;
}

const transformData = {
  enero: '1 - 4',
  febrero: '5 - 8',
  marzo: '9 - 13',
  abril: '14 - 17',
  mayo: '18 - 21',
  junio: '22',
  julio: '23',
  agosto: '24 - 28',
  septiembre: '29 - 30',
  octubre: '31 - 34',
  noviembre: '35 - 39',
  diciembre: '40',
};

const Month = ({
  month,
  handleMonth,
  activeMonth,
  handleActiveMonth,
  year,
}: MonthProps) => {
  // disabled because there actually isn't data available and it created an error
  const shouldDisable = month === 'diciembre' && year === 'sixteen';
  const active = activeMonth === month;
  return (
    <button
      onClick={() => {
        handleMonth(month);
        handleActiveMonth(month, year);
      }}
      className={`
        ${styles.monthButton} ${active ? styles.activeMonth : ''}
      `}
      disabled={shouldDisable}
    >
      Eps. {transformData[month]}
    </button>
  );
};

export default Month;
