import MonthList from '@/components/month-list/month-list.component';
import PlayerList from '@/components/player-list/player-list.component';
import styles from './page.module.scss';

export async function generateStaticParams() {
  const seasons = ['temporada-1', 'temporada-2', 'temporada-3'];
  return seasons.map((season) => ({ season }));
}

async function getData() {
  const res = await fetch(process.env.FOURTEEN_DATA_URL);
  return res.json();
}

export default async function Page({
  params,
}: {
  params: { seasons: string };
}) {
  const data = await getData();
  console.log('data', data);
  // // FIRST
  const audioData = data?.fourteen?.monthsData?.enero?.audioData as AudioData[];
  const allMonths = data?.fourteen?.allMonths as string[];
  const yearTitle = data?.fourteen?.yearTitle as string;
  const monthTitle = data?.fourteen?.monthsData?.enero?.monthTitle as string;
  const year = (data?.fourteen?.year as string) || 'fourteen';

  const firstHalf = allMonths.slice(0, 6);
  const secondHalf =
    year === 'sixteen' || year === 'fourteen' ? allMonths.slice(6) : null;
  return (
    <div className={styles.mainWrapper}>
      {params.seasons}
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
        <PlayerList audioData={audioData} />
      </section>
    </div>
  );
}
