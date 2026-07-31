'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const disableNavAndFooter = [
        '/auth/sign-in',
        '/auth/sign-up',
        '/dashboard'
    ];

    const isLayoutDisabled = disableNavAndFooter.some((route) => pathname?.startsWith(route));

    return (
        <>
            {!isLayoutDisabled && <Navbar />}

            <main className="w-full">
                {children}
            </main>

            {!isLayoutDisabled && <Footer />}
        </>
    );
}