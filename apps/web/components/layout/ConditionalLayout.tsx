'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalLayout({
    children,
    navbar,
    footer
}: {
    children: React.ReactNode;
    navbar: React.ReactNode;
    footer: React.ReactNode;
}) {
    const pathname = usePathname();

    const disableNavAndFooter = [
        '/auth/sign-in',
        '/auth/sign-up',
        '/dashboard'
    ];

    const isLayoutDisabled = disableNavAndFooter.some((route) => pathname?.startsWith(route));

    return (
        <>
            {!isLayoutDisabled && navbar}

            <main className="w-full">
                {children}
            </main>

            {!isLayoutDisabled && footer}
        </>
    );
}