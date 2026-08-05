import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import ConditionalLayout from '../components/layout/ConditionalLayout';
import QueryProvider from '../providers/QueryProvider';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const advercase = localFont({
  src: [
    {
      path: './fonts/Advercase-Font-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Advercase-Font-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Advercase-Font-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Advercase-Font-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-advercase',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Cerdas Keuangan | Financial Planning Consultant",
  description: 'Lebih dari 20 tahun pengalaman membantu bank, perusahaan asuransi, institusi, dan keluarga Indonesia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${advercase.variable} ${inter.variable}`}>
      <body className="font-sans bg-pureWhite text-navyBlue antialiased selection:bg-goldAccent selection:text-navyBlue">
        <QueryProvider>
          <ConditionalLayout navbar={<Navbar />} footer={<Footer />}>
            {children}
          </ConditionalLayout>
        </QueryProvider>
      </body>
    </html>
  );
}