import { redirect } from 'next/navigation';
import { firstEpisodeOfRange, getSeason, rangesOf } from '@/config/seasons';

// The site has no landing page of its own — it opens on the first group of the
// first season. Derived from the season config so it follows any change there.
const MainContent = async () => {
  const season = getSeason(1);
  const firstRange = rangesOf(season)[0];
  redirect(
    `${season.basePath}/${firstRange}?Ep=${firstEpisodeOfRange(firstRange)}`,
  );
};

export default MainContent;
