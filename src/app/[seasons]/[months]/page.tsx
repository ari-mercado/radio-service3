import MonthList from '@/components/month-list/month-list.component';
import PlayerList from '@/components/player-list/player-list.component';
import styles from '../page.module.scss';

async function getData() {
  const res = await fetch(process.env.FOURTEEN_DATA_URL);
  return res.json();
}

export async function generateStaticParams() {
  const data = await getData();
  const allMonths = data?.fourteen?.allMonths as string[];
  return allMonths.map((month) => ({ months: month }));
}

export default async function Page({ params, children }: any) {
  const data = await getData();
  // // FIRST
  const audioData = data?.fourteen?.monthsData?.enero?.audioData;
  const allMonths = data?.fourteen?.allMonths as string[];
  const yearTitle = data?.fourteen?.yearTitle as string;
  const monthTitle = data?.fourteen?.monthsData?.enero?.monthTitle as string;
  const year = (data?.fourteen?.year as string) || 'fourteen';

  const firstHalf = allMonths.slice(0, 6);
  const secondHalf =
    year === 'sixteen' || year === 'fourteen' ? allMonths.slice(6) : null;
  // console.log('params', params);
  console.log('hello');
  return (
    <div className={styles.mainWrapper}>
      <aside className={styles.monthListWrapper}>
        {firstHalf.length && (
          <MonthList
            allMonths={firstHalf}
            // handleMonth={handleMonth}
            year={year}
            // handleActiveMonth={handleActiveMonth}
            // activeMonth={activeMonth}
          />
        )}

        {secondHalf && (
          <MonthList
            allMonths={secondHalf}
            // handleMonth={handleMonth}
            year={year}
            // handleActiveMonth={handleActiveMonth}
            // activeMonth={activeMonth}
          />
        )}
      </aside>
      <section className={styles.playerListWrapper}>
        <PlayerList />
      </section>
    </div>
  );
}
