import { Metadata } from 'next';
import './globals.css';
import Header from '../components/header/header.component';
import Footer from '@/components/footer/footer.component';

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
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
