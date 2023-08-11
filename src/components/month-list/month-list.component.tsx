import Month from '../month/month.component';
import styles from './month-list.module.scss';

interface MonthListProps {
  allMonths: string[];
  currentMonth: string;
}

const MonthList = ({ allMonths, currentMonth }: MonthListProps) => {
  return (
    <div className={styles.monthsWrapper}>
      {allMonths.map((month) => (
        <Month month={month} key={month} currentMonth={currentMonth} />
      ))}
    </div>
  );
};

export default MonthList;
