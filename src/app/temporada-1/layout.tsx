import styles from './page.module.scss';

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.mainWrapper}>{children}</main>;
}
