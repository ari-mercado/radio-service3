import { Metadata } from 'next';
import './globals.css';
import Header from '../components/header/header.component';
import Footer from '@/components/footer/footer.component';
import { Poppins, Lobster } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '300',
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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
