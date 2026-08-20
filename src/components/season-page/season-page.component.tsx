import styles from './season-page.module.scss';
import MonthList from '@/components/month-list/month-list.component';
// Imported directly rather than through next/dynamic: this is a Server
// Component, so lazy-loading it saves no client JS and only risks shipping the
// loading spinner to the static HTML in place of the episode list.
import PlayerList from '@/components/player-list/player-list.component';
import { MONTHS, SeasonConfig } from '@/config/seasons';

/**
 * One group page, for either season. Both /temporada-1/[months] and
 * /temporada-2/[months] render this with their own config, so the two seasons
 * cannot drift apart in markup or styling.
 */
const SeasonPage = ({
  season,
  range,
}: {
  season: SeasonConfig;
  range: string;
}) => (
  <main className={styles.mainWrapper}>
    <aside className={styles.monthListWrapper}>
      <MonthList season={season} months={MONTHS} currentRange={range} />
    </aside>

    <section className={styles.playerListWrapper}>
      <PlayerList season={season} range={range} />
    </section>
  </main>
);

export default SeasonPage;
