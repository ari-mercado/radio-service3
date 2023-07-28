/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Metadata } from 'next';
import './globals.css';
import Header from '../components/header/header.component';
import data from '../data/data.json';
import { useRouter } from 'next/router';
import { AudioData } from '../types/types';
import React, { useState, useEffect } from 'react';
// export const metadata: Metadata = {
//   title: `TypeScript starter for Next.js`,
//   description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialAudioData = data?.fourteen?.monthsData?.enero
    ?.audioData as AudioData[];
  const initialAllMonths = data?.fourteen?.allMonths as string[];
  const initialYearTitle = data?.fourteen?.yearTitle as string;
  const initialMonthTitle = data?.fourteen?.monthsData?.enero
    ?.monthTitle as string;
  const initialYear = (data?.fourteen?.year as string) || 'fourteen';

  const [yearTitle, setYearTitle] = useState<string>(initialYearTitle);
  const [allMonths, setAllMonths] = useState<string[]>(initialAllMonths);
  const [audioData, setAudioData] = useState<AudioData[]>(initialAudioData);
  const [monthTitle, setMonthTitle] = useState<string>(initialMonthTitle);
  const [year, setYear] = useState<string>(initialYear);

  const handleMonth = (month: string) => {
    const monthData = data[year]?.monthsData[month];
    const { monthTitle, audioData } = monthData ?? {};
    setMonthTitle(monthTitle as string);
    setAudioData(audioData as AudioData[]);
  };

  const handleYear = async (yearSelected: string) => {
    const {
      yearTitle,
      year = '',
      allMonths,
      monthsData,
    } = (await data[yearSelected]) ?? {};

    // 2016 and 2016 both begin in Janurary, while 2015 begins in July.
    // (according to the data available, obviously not on an actual calendar)
    const { monthTitle = '', audioData }: any =
      yearSelected === 'fifteen' ? monthsData?.julio : monthsData?.enero;

    setAllMonths((_) => allMonths as string[]);
    setYearTitle((_) => yearTitle as string);
    setYear((_) => year);
    setMonthTitle((_) => monthTitle);
    setAudioData((_) => audioData);
  };
  return (
    <html lang="en">
      <body>
        <Header handleYear={handleYear} />
        {children}
      </body>
    </html>
  );
}
