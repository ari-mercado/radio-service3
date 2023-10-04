import dynamic from 'next/dynamic';
import styles from '../page.module.scss';
import MonthList from '@/components/month-list/month-list.component';
const PlayerList = dynamic(
  () => import('@/components/player-list/player-list.component' as string),
  {
    loading: () => <div className={styles.spinner} />,
  },
);
import { transformMonthToCollection } from '@/utils/utils';

async function getData() {
  const res = await fetch(process.env.FOURTEEN_DATA_URL);
  return res.json();
}

export async function generateStaticParams() {
  const data = await getData();
  const allMonths = data?.fourteen?.allMonths as string[];
  return allMonths.map((month) => ({
    months: transformMonthToCollection[month],
  }));
}

export default async function Page({ params }: any) {
  const data = await getData();
  const allMonths = data?.fourteen?.allMonths as string[];
  const year = (data?.fourteen?.year as string) || 'fourteen';

  const firstHalf = allMonths.slice(0, 6);
  const secondHalf =
    year === 'sixteen' || year === 'fourteen' ? allMonths.slice(6) : null;

  return (
    <>
      <aside className={styles.monthListWrapper}>
        {firstHalf.length && (
          <MonthList allMonths={firstHalf} currentMonth={params.months} />
        )}

        {secondHalf.length && (
          <MonthList allMonths={secondHalf} currentMonth={params.months} />
        )}
      </aside>
      <section className={styles.playerListWrapper}>
        {/* @ts-expect-error Server Component */}
        <PlayerList month={params.months} />
      </section>
    </>
  );
}
