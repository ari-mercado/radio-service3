import dynamic from 'next/dynamic';
import styles from '../page.module.scss';
import MonthList from '@/components/month-list/month-list.component';
const PlayerList = dynamic(
  () => import('@/components/player-list/player-list.component'),
  {
    loading: () => <div className={styles.spinner} />,
  },
);
import { transformMonthToCollection } from '@/utils/utils';
import data from '@/data/data.json';

function getAllMonths(year: string) {
  return data[year].allMonths as string[];
}

export async function generateStaticParams() {
  const allMonths = getAllMonths('fourteen');
  return allMonths.map((month) => ({
    months: transformMonthToCollection[month],
  }));
}

export default async function Page({ params }: any) {
  const { months } = await params;
  const allMonths = getAllMonths('fourteen');
  return (
    <>
      <aside className={styles.monthListWrapper}>
        <MonthList allMonths={allMonths} currentMonth={months} />
      </aside>

      <section className={styles.playerListWrapper}>
        <PlayerList month={months} />
      </section>
    </>
  );
}
