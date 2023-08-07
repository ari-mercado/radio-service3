import Month from '../month/month.component';
import styles from './month-list.module.scss';

interface MonthListProps {
  allMonths: string[];
}

const MonthList = ({ allMonths }: MonthListProps) => {
  return (
    <div className={styles.monthsWrapper}>
      {allMonths.map((month) => (
        <Month month={month} key={month} />
      ))}
    </div>
  );
};

export default MonthList;
