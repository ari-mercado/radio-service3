import { Suspense } from 'react';
import styles from './player-list.module.scss';
import AudioPlayer from '../player/player.component';
import Button from '../button/button.component';
import { SeasonConfig } from '@/config/seasons';
import { episodesOf } from '@/data/episodes';
import {
  durationToIso8601,
  groupStructuredData,
  serializeJsonLd,
} from '@/utils/structured-data';

const PlayerList = ({
  season,
  range,
}: {
  season: SeasonConfig;
  range: string;
}) => {
  const audioData = episodesOf(season, range);

  return (
    <div className={styles.playerWrapper}>
      {/*
        Describes every episode on this page to crawlers: number, title,
        description, air date, language, and the series and season they belong
        to, plus duration, audio URL and Spotify link where the catalog has
        them. It adds no route of its own — each episode is addressed by the
        `Ep` param that already selects it.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            groupStructuredData(season, range, audioData),
          ),
        }}
      />

      {audioData.map((audio) => (
        <article key={audio.audioFile} className={styles.playerArticle}>
          {/*
            Which episode is open comes from the `Ep` query param, which these
            statically prerendered pages can only read in the browser. That
            forces this subtree to be client-rendered, so the fallback is what
            lands in the HTML — and the collapsed button is exactly the state
            every episode starts in. Prerendering it puts the full episode list
            in the static HTML instead of a spinner, and the browser swaps in
            the player for whichever episode is selected.
          */}
          <Suspense
            fallback={
              <Button
                audioTitle={audio.audioTitle}
                episodeNumber={audio.episodeNumber}
              />
            }
          >
            <AudioPlayer
              audioFile={audio.audioFile}
              audioTitle={audio.audioTitle}
              episodeNumber={audio.episodeNumber}
              description={audio.description}
            />
          </Suspense>

          {/*
            Sighted users only get the description once an episode is open, but
            it belongs to the episode whether it is open or not. Rendering it
            here — on the server, for every episode — is what puts all of it in
            the static HTML for crawlers, and gives screen readers the
            description alongside the episode without a click. The open player
            marks its visible copy `aria-hidden` so this is the only one
            announced.
          */}
          <div className={styles.srOnly}>
            <p>{audio.description}</p>
            <p>
              Episodio {audio.episodeNumber}. Emitido el{' '}
              <time dateTime={audio.date}>{audio.date}</time>.
              {audio.duration && (
                <>
                  {' '}
                  Duración{' '}
                  <time dateTime={durationToIso8601(audio.duration)}>
                    {audio.duration}
                  </time>
                  .
                </>
              )}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PlayerList;
