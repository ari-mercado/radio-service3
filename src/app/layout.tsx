import { Metadata } from 'next';
import './globals.css';
import Header from '../components/header/header.component';
import Footer from '@/components/footer/footer.component';

export const metadata: Metadata = {
  title: `TypeScript starter for Next.js`,
  description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
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
