import type { Metadata } from 'next';
import { Cormorant_Garamond, Google_Sans_Flex, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import localFont from 'next/font/local';
import ConditionalLayout from '../components/layout/ConditionalLayout';

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

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
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
    <html lang="id" className={`${advercase.variable} ${inter.variable} ${googleSansFlex.variable}`}>
      <body className="font-sans bg-pureWhite text-navyBlue antialiased selection:bg-goldAccent selection:text-navyBlue">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}