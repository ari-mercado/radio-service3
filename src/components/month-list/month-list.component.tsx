import Month from '../month/month.component';
import styles from './month-list.module.scss';

interface MonthListProps {
  allMonths: string[];
  handleMonth: (month: string) => unknown;
  activeMonth: string;
  handleActiveMonth: (month: string, year: string) => unknown;
  year: string;
}

const MonthList = ({
  allMonths,
  handleMonth,
  year,
  handleActiveMonth,
  activeMonth,
}: MonthListProps) => {
  return (
    <div className={styles.monthsWrapper}>
      {allMonths.map((month) => (
        <Month
          month={month}
          handleMonth={handleMonth}
          year={year}
          handleActiveMonth={handleActiveMonth}
          activeMonth={activeMonth}
          key={`${month}/${year}`}
        />
      ))}
    </div>
  );
};

export default MonthList;
