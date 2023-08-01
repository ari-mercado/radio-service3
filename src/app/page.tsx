// import React, { useState, useEffect } from 'react';
import MonthList from '@/components/month-list/month-list.component';
import PlayerList from '@/components/player-list/player-list.component';
import styles from '@/app/page.module.scss';
import { AudioData } from '@/types/types';
import data from '@/data/data.json';

interface MainContentProps {
  allMonths: string[];
  yearTitle: string;
  audioData: AudioData[];
  monthTitle: string;
  handleMonth: (month: string) => unknown;
  year: string;
}

async function getData() {
  const res = await fetch(process.env.FOURTEEN_DATA_URL);
  return res.json();
}

const MainContent = async () => {
  const data = await getData();
  console.log('data', data);
  // // FIRST
  const audioData = data?.fourteen?.monthsData?.enero?.audioData as AudioData[];
  const allMonths = data?.fourteen?.allMonths as string[];
  const yearTitle = data?.fourteen?.yearTitle as string;
  const monthTitle = data?.fourteen?.monthsData?.enero?.monthTitle as string;
  const year = (data?.fourteen?.year as string) || 'fourteen';

  // const [yearTitle, setYearTitle] = useState<string>(initialYearTitle);
  // const [allMonths, setAllMonths] = useState<string[]>(initialAllMonths);
  // const [audioData, setAudioData] = useState<AudioData[]>(initialAudioData);
  // const [monthTitle, setMonthTitle] = useState<string>(initialMonthTitle);
  // const [year, setYear] = useState<string>(initialYear);

  // const handleMonth = (month: string) => {
  //   const monthData = data[year]?.monthsData[month];
  //   const { monthTitle, audioData } = monthData ?? {};
  //   setMonthTitle(monthTitle as string);
  //   setAudioData(audioData as AudioData[]);
  // };

  // const handleYear = async (yearSelected: string) => {
  //   const {
  //     yearTitle,
  //     year = '',
  //     allMonths,
  //     monthsData,
  //   } = (await data[yearSelected]) ?? {};

  //   // 2016 and 2016 both begin in Janurary, while 2015 begins in July.
  //   // (according to the data available, obviously not on an actual calendar)
  //   const { monthTitle = '', audioData }: any =
  //     yearSelected === 'fifteen' ? monthsData?.julio : monthsData?.enero;

  //   setAllMonths((_) => allMonths as string[]);
  //   setYearTitle((_) => yearTitle as string);
  //   setYear((_) => year);
  //   setMonthTitle((_) => monthTitle);
  //   setAudioData((_) => audioData);
  // };

  // //SECOND
  // const [activeMonthSixteen, setActiveMonthSixteen] = useState<
  //   string | undefined
  // >('enero');
  // const [activeMonthFifteen, setActiveMonthFifteen] = useState<
  //   string | undefined
  // >('julio');
  // const [activeMonthFourteen, setActiveMonthFourteen] = useState<
  //   string | undefined
  // >('enero');

  const firstHalf = allMonths.slice(0, 6);
  const secondHalf =
    year === 'sixteen' || year === 'fourteen' ? allMonths.slice(6) : null;
  // let activeMonth;

  // if (year === 'sixteen') {
  //   activeMonth = activeMonthSixteen;
  // } else if (year === 'fifteen') {
  //   activeMonth = activeMonthFifteen;
  // } else if (year === 'fourteen') {
  //   activeMonth = activeMonthFourteen;
  // } else {
  //   activeMonth = '';
  // }

  // const handleActiveMonth = (month?: string, currentYear?: string) => {
  //   if (currentYear === 'sixteen') {
  //     setActiveMonthSixteen(month);
  //   } else if (currentYear === 'fifteen') {
  //     setActiveMonthFifteen(month);
  //   } else if (currentYear === 'fourteen') {
  //     setActiveMonthFourteen(month);
  //   }
  // };

  // useEffect(() => {
  //   handleActiveMonth();
  // }, [activeMonthSixteen, activeMonthFifteen, activeMonthFourteen, year]);

  return (
    <main className={styles.mainWrapper}>
      {/* <aside className={styles.monthListWrapper}>
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
      </section> */}
    </main>
  );
};

export default MainContent;
