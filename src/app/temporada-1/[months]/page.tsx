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

async function getAllMonths(year: string) {
  const res = await fetch(`${process.env.FOURTEEN_DATA_URL}/${year}/allMonths`);
  return res.json();
}

// async function getYear(year: string) {
//   const res = await fetch(`${process.env.FOURTEEN_DATA_URL}/${year}/year`);
//   return res.json();
// }

export async function generateStaticParams() {
  const allMonths = (await getAllMonths('fourteen')) as string[];
  return allMonths.map((month) => ({
    months: transformMonthToCollection[month],
  }));
}

export default async function Page({ params }: any) {
  const allMonths = (await getAllMonths('fourteen')) as string[];
  // const year = (await getYear('fourteen')) || 'fourteen';

  //This handles edge case for year 'fifteen': Data only has 6 months instead of 12
  // const firstHalf = allMonths.slice(0, 6);
  // const secondHalf =
  //   year === 'sixteen' || year === 'fourteen' ? allMonths.slice(6) : null;

  return (
    <>
      <aside className={styles.monthListWrapper}>
        <MonthList allMonths={allMonths} currentMonth={params.months} />
      </aside>

      <section className={styles.playerListWrapper}>
        {/* @ts-expect-error Server Component */}
        <PlayerList month={params.months} />
      </section>
    </>
  );
}
