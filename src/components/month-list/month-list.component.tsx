import Month from '../month/month.component';
import styles from './month-list.module.scss';
import { MonthName, SeasonConfig } from '@/config/seasons';

interface MonthListProps {
  season: SeasonConfig;
  months: readonly MonthName[];
  /** The range slug currently on screen, e.g. `41-43`. */
  currentRange: string;
}

const MonthList = ({ season, months, currentRange }: MonthListProps) => {
  return (
    <div className={styles.monthsWrapper}>
      {months.map((month) => (
        <Month
          key={month}
          season={season}
          month={month}
          currentRange={currentRange}
        />
      ))}
    </div>
  );
};

export default MonthList;
