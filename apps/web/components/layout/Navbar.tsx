'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiMiniBars3BottomRight,
    HiMiniXMark,
    HiOutlineChartPie,
    HiOutlineAcademicCap,
    HiOutlineUserGroup,
    HiOutlinePresentationChartLine,
    HiOutlineChatBubbleLeftRight,
    HiOutlineBuildingOffice2,
    HiOutlineVideoCamera,
    HiOutlineCheckBadge
} from "react-icons/hi2";

function getCookie(name: string) {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('individu');
    const [isMounted, setIsMounted] = useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        const savedTab = getCookie('cerdas_keuangan_tab');
        if (savedTab) {
            setActiveTab(savedTab);
        }
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        document.cookie = `cerdas_keuangan_tab=${tab}; path=/; max-age=31536000; SameSite=Lax`;

        setIsMobileMenuOpen(false);

        if (pathname === '/') {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    };

    const layananLinks = [
        { name: 'Financial Planning', href: '/layanan/financial-planning', icon: HiOutlineChartPie },
        { name: 'Qualified Wealth Planner Certificate', href: '/layanan/qwp-certificate', icon: HiOutlineAcademicCap },
        { name: 'Inhouse Training', href: '/layanan/inhouse-training', icon: HiOutlineUserGroup },
        { name: 'Master Class Financial Planning Series', href: '/layanan/master-class', icon: HiOutlinePresentationChartLine },
        { name: 'One on One Coaching', href: '/layanan/coaching', icon: HiOutlineChatBubbleLeftRight },
        { name: 'Corporate Training', href: '/layanan/corporate', icon: HiOutlineBuildingOffice2 },
        { name: 'Seminar & Workshop', href: '/layanan/seminar', icon: HiOutlineVideoCamera },
        { name: 'CFP Exam Preparation', href: '/layanan/mentoring-cfp', icon: HiOutlineCheckBadge },
    ];

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname?.startsWith(path);
    };

    const navLinkClass = (path: string) => {
        const active = isActive(path);
        return `relative py-1 text-sm font-medium transition-colors ${active ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'
            } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-goldAccent after:transition-all after:duration-300 ${active ? 'after:w-full' : 'after:w-0 hover:after:w-full'
            }`;
    };

    return (
        <header className="sticky top-0 z-50 flex flex-col w-full bg-pureWhite drop-shadow">
            <div className="hidden min-[900px]:block bg-softSilver">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-end gap-1">
                    <button
                        onClick={() => handleTabChange('individu')}
                        className={`px-5 py-2 text-[13px] font-medium transition-colors rounded-t-lg ${activeTab === 'individu'
                            ? 'bg-pureWhite text-navyBlue'
                            : 'text-navyBlue/60 hover:text-navyBlue hover:bg-pureWhite/50'
                            }`}
                    >
                        For You
                    </button>
                    <button
                        onClick={() => handleTabChange('perusahaan')}
                        className={`px-5 py-2 text-[13px] font-medium transition-colors rounded-t-lg ${activeTab === 'perusahaan'
                            ? 'bg-pureWhite text-navyBlue'
                            : 'text-navyBlue/60 hover:text-navyBlue hover:bg-pureWhite/50'
                            }`}
                    >
                        For Business
                    </button>
                </div>
            </div>

            <div className="bg-pureWhite relative z-10 border-b border-softSilver">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
                    <Link href="/" className="flex flex-col group leading-none">
                        <span className="font-serif text-xl md:text-2xl tracking-wide text-navyBlue transition-colors duration-300">
                            Mohamad <span className="font-bold text-goldAccent">Andoko</span>
                        </span>
                        <span className="mt-1 text-[8px] md:text-[9px] tracking-[0.25em] uppercase font-sans font-semibold text-navyBlue/70">
                            Financial Experience
                        </span>
                    </Link>

                    <nav className="hidden min-[900px]:flex items-center gap-7">
                        <Link href="/" className={navLinkClass('/')}>
                            Home
                        </Link>

                        <Link href="/about" className={navLinkClass('/about')}>
                            Tentang Saya
                        </Link>

                        <div
                            className="relative py-6"
                            onMouseEnter={() => setIsServicesDropdownOpen(true)}
                            onMouseLeave={() => setIsServicesDropdownOpen(false)}
                        >
                            <button className={`flex items-center gap-1 ${navLinkClass('/layanan')}`}>
                                Layanan
                                <svg
                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180 text-goldAccent' : ''}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isServicesDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute top-[60px] left-1/2 -translate-x-[65%] w-[600px] bg-pureWhite shadow-2xl border border-softSilver rounded-xl overflow-hidden p-4 grid grid-cols-2 gap-2"
                                    >
                                        {layananLinks.map((link) => {
                                            const Icon = link.icon;
                                            return (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    onClick={() => setIsServicesDropdownOpen(false)}
                                                    // MENGUBAH ITEMS-START MENJADI ITEMS-CENTER AGAR SEJAJAR VERTIKAL
                                                    className={`group flex items-center gap-3 p-4 rounded-lg transition-colors hover:bg-softSilver/50 ${pathname === link.href.split('#')[0] ? 'bg-softSilver/30' : ''}`}
                                                >
                                                    <div className={`p-2 rounded-lg shrink-0 transition-colors ${pathname === link.href.split('#')[0] ? 'bg-goldAccent/20 text-goldAccent' : 'bg-softSilver group-hover:bg-goldAccent/10 text-navyBlue group-hover:text-goldAccent'}`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        {/* MENGHAPUS mb-1 AGAR TEKS TIDAK NAIK KE ATAS */}
                                                        <span className={`text-[13px] font-bold leading-snug transition-colors ${pathname === link.href.split('#')[0] ? 'text-goldAccent' : 'text-navyBlue group-hover:text-goldAccent'}`}>
                                                            {link.name}
                                                        </span>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/blog" className={navLinkClass('/blog')}>
                            Blog
                        </Link>
                        <Link href="/faq" className={navLinkClass('/faq')}>
                            FAQ
                        </Link>

                        <Link href="/auth/sign-in" className="text-sm font-medium text-pureWhite bg-navyBlue hover:bg-goldAccent hover:text-navyBlue transition-colors px-5 py-2.5 rounded-pill ml-2 shadow-sm">
                            Sign In
                        </Link>
                    </nav>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className=" min-[900px]:hidden text-navyBlue focus:outline-none p-2 -mr-2"
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            initial={false}
                            animate={{
                                rotate: isMobileMenuOpen ? 90 : 0,
                                scale: isMobileMenuOpen ? 1.1 : 1
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            {isMobileMenuOpen ? (
                                <HiMiniXMark className="w-7 h-7" />
                            ) : (
                                <HiMiniBars3BottomRight className="w-7 h-7" />
                            )}
                        </motion.div>
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="min-[900px]:hidden overflow-hidden bg-pureWhite border-t border-softSilver"
                        >
                            <div className="px-6 py-4 flex flex-col gap-3">
                                <div className="flex bg-softSilver rounded-lg p-1 mb-2">
                                    <button
                                        onClick={() => handleTabChange('individu')}
                                        className={`flex-1 py-1.5 text-[13px] font-medium rounded-md transition-colors ${activeTab === 'individu' ? 'bg-pureWhite shadow-sm text-navyBlue' : 'text-navyBlue/60'
                                            }`}
                                    >
                                        For You
                                    </button>
                                    <button
                                        onClick={() => handleTabChange('perusahaan')}
                                        className={`flex-1 py-1.5 text-[13px] font-medium rounded-md transition-colors ${activeTab === 'perusahaan' ? 'bg-pureWhite shadow-sm text-navyBlue' : 'text-navyBlue/60'
                                            }`}
                                    >
                                        For Business
                                    </button>
                                </div>

                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-[15px] font-medium border-b border-softSilver pb-2 ${isActive('/') ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'}`}>Home</Link>

                                <Link href="/tentang-kami" onClick={() => setIsMobileMenuOpen(false)} className={`text-[15px] font-medium py-2 border-b border-softSilver ${isActive('/tentang-kami') ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'}`}>Tentang Kami</Link>

                                <div className="py-2 border-b border-softSilver flex flex-col gap-3">
                                    <span className={`text-[15px] font-bold ${isActive('/layanan') ? 'text-goldAccent' : 'text-navyBlue'}`}>Layanan</span>
                                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-softSilver">
                                        {layananLinks.map((link) => {
                                            const Icon = link.icon;
                                            return (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 text-[14px] font-medium text-navyBlue/80 hover:text-goldAccent"
                                                >
                                                    <Icon className="w-4 h-4 text-goldAccent" />
                                                    {link.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className={`text-[15px] font-medium py-2 border-b border-softSilver ${isActive('/blog') ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'}`}>Blog</Link>
                                <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className={`text-[15px] font-medium py-2 border-b border-softSilver ${isActive('/faq') ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'}`}>FAQ</Link>

                                <Link href="/auth/sign-in" onClick={() => setIsMobileMenuOpen(false)} className="text-[15px] font-bold text-pureWhite bg-navyBlue text-center py-3 mt-4 rounded-lg">
                                    Sign In
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}