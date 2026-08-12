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

async function getAllMonths(year: string) {
  const res = await fetch(
    `${process.env.FOURTEEN_DATA_URL}/${year}/allMonths`,
    {
      cache: 'force-cache',
    },
  );
  return res.json();
}

export async function generateStaticParams() {
  const allMonths = (await getAllMonths('fourteen')) as string[];
  return allMonths.map((month) => ({
    months: transformMonthToCollection[month],
  }));
}

export default async function Page({ params }: any) {
  const { months } = await params;
  const allMonths = (await getAllMonths('fourteen')) as string[];
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
