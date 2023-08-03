import styles from './page.module.scss';

export async function generateStaticParams() {
  // In the data from API, these 'seasons' are labeled as years
  const seasonsData = ['temporada-1', 'temporada-2', 'temporada-3'];
  return seasonsData.map((season) => ({
    seasons: season,
  }));
}

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.mainWrapper}>{children}</main>;
}
