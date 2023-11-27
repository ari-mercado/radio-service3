import { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.scss';
import Header from '../components/header/header.component';
import Footer from '@/components/footer/footer.component';
import { Poppins, Lobster } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: 'normal',
  variable: '--font-poppins',
});

const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lobster',
});

export const metadata: Metadata = {
  title: `Tu Hora Divina`,
  description: `Escucha al pastor hablar sobre la vida, la biblia y Jesucristo.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${lobster.variable}`}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className={styles.main}>
        <div className={styles.bgImage} />
        <div>
          <Header />
        </div>

        <div className={styles.mainContent}>{children}</div>

        <div className={styles.footer}>
          <Footer />
        </div>
      </body>
    </html>
  );
}
