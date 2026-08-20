import { Metadata } from 'next';
import SeasonPage from '@/components/season-page/season-page.component';
import { getSeason, rangesOf } from '@/config/seasons';
import { seasonGroupMetadata } from '@/utils/season-metadata';

const season = getSeason(2);

export function generateStaticParams() {
  return rangesOf(season).map((months) => ({ months }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { months } = await params;
  return seasonGroupMetadata(season, months);
}

export default async function Page({ params }: any) {
  const { months } = await params;
  return <SeasonPage season={season} range={months} />;
}
