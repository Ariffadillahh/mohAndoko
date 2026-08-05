'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiMiniBars3BottomRight, HiMiniXMark, HiOutlineChartPie, HiOutlineAcademicCap,
    HiOutlineUserGroup, HiOutlinePresentationChartLine, HiOutlineChatBubbleLeftRight,
    HiOutlineBuildingOffice2, HiOutlineVideoCamera, HiOutlineCheckBadge,
    HiOutlineUser, HiOutlineArrowRightOnRectangle, HiOutlineSquares2X2
} from "react-icons/hi2";
import { UserProfile } from '../../../server/auth.server';
import { useNavbar } from '../../../hooks/useNavbar';


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

export default function NavbarClient({ initialUser }: { initialUser: UserProfile | null }) {
    const {
        user, isMounted,
        isMobileMenuOpen, setIsMobileMenuOpen,
        isServicesDropdownOpen, setIsServicesDropdownOpen,
        isProfileDropdownOpen, setIsProfileDropdownOpen,
        handleLogout, isActive, pathname
    } = useNavbar(initialUser);

    const navLinkClass = (path: string) => {
        const active = isActive(path);
        return `relative py-1 text-sm font-medium transition-colors ${active ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'
            } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-goldAccent after:transition-all after:duration-300 ${active ? 'after:w-full' : 'after:w-0 hover:after:w-full'
            }`;
    };

    return (
        <header className="sticky top-0 z-50 flex flex-col w-full bg-pureWhite drop-shadow">
            <div className="bg-pureWhite relative z-10 border-b border-softSilver">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
                    <Link href="/" className="flex flex-col group leading-none">
                        <span className="font-serif text-xl md:text-2xl tracking-wide text-navyBlue transition-colors duration-300">
                            Mohamad <span className="font-bold text-goldAccent">Andoko</span>
                        </span>
                        <span className="mt-1 text-[8px] md:text-[12px] tracking-[0.25em] uppercase font-sans font-semibold text-navyBlue/70">
                            Financial consultant
                        </span>
                    </Link>

                    <nav className="hidden min-[900px]:flex items-center gap-7">
                        <Link href="/" className={navLinkClass('/')}>Home</Link>
                        <Link href="/about" className={navLinkClass('/about')}>Tentang Saya</Link>

                        <div
                            className="relative py-6"
                            onMouseEnter={() => setIsServicesDropdownOpen(true)}
                            onMouseLeave={() => setIsServicesDropdownOpen(false)}
                        >
                            <button className={`flex items-center gap-1 ${navLinkClass('/layanan')}`}>
                                Layanan
                                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180 text-goldAccent' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                                    key={link.name} href={link.href}
                                                    onClick={() => setIsServicesDropdownOpen(false)}
                                                    className={`group flex items-center gap-3 p-4 rounded-lg transition-colors hover:bg-softSilver/50 ${pathname === link.href.split('#')[0] ? 'bg-softSilver/30' : ''}`}
                                                >
                                                    <div className={`p-2 rounded-lg shrink-0 transition-colors ${pathname === link.href.split('#')[0] ? 'bg-goldAccent/20 text-goldAccent' : 'bg-softSilver group-hover:bg-goldAccent/10 text-navyBlue group-hover:text-goldAccent'}`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
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

                        <Link href="/blog" className={navLinkClass('/blog')}>Blog</Link>
                        <Link href="/faq" className={navLinkClass('/faq')}>FAQ</Link>

                        {isMounted && (
                            user ? (
                                <div
                                    className="relative py-4 ml-2"
                                    onMouseEnter={() => setIsProfileDropdownOpen(true)}
                                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                                >
                                    <button className="flex items-center gap-3 bg-softSilver/50 hover:bg-softSilver p-1.5 pr-4 rounded-full transition-all border border-softSilver">
                                        <div className="w-8 h-8 rounded-full bg-navyBlue text-goldAccent flex items-center justify-center font-bold text-sm overflow-hidden">
                                            {user.avatarUrl ? (
                                                <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${user.avatarUrl}`} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-navyBlue max-w-[120px] truncate">{user.name}</span>
                                    </button>

                                    <AnimatePresence>
                                        {isProfileDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15, ease: "easeOut" }}
                                                className="absolute right-0 top-[55px] w-56 bg-pureWhite shadow-2xl border border-softSilver rounded-xl overflow-hidden p-2 z-50"
                                            >
                                                <div className="px-3 py-2.5 border-b border-softSilver mb-1">
                                                    <p className="text-xs font-bold text-navyBlue truncate">{user.name}</p>
                                                    <p className="text-[11px] text-navyBlue/60 truncate">{user.email}</p>
                                                    <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-goldAccent/20 text-goldAccent">{user.role}</span>
                                                </div>

                                                {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
                                                    <Link href="/dashboard" onClick={() => setIsProfileDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-navyBlue hover:bg-softSilver/50 rounded-lg transition-colors">
                                                        <HiOutlineSquares2X2 className="w-4 h-4 text-goldAccent" />
                                                        Dashboard
                                                    </Link>
                                                )}

                                                <Link href="/profile" onClick={() => setIsProfileDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-navyBlue hover:bg-softSilver/50 rounded-lg transition-colors">
                                                    <HiOutlineUser className="w-4 h-4 text-goldAccent" />
                                                    Pengaturan Profil
                                                </Link>

                                                <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1 border-t border-softSilver/50 pt-2">
                                                    <HiOutlineArrowRightOnRectangle className="w-4 h-4 text-red-500" />
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link href="/auth/sign-in" className="text-sm font-medium text-pureWhite bg-navyBlue hover:bg-goldAccent hover:text-navyBlue transition-colors px-5 py-2.5 rounded-full ml-2 shadow-sm">
                                    Sign In
                                </Link>
                            )
                        )}
                    </nav>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="min-[900px]:hidden text-navyBlue focus:outline-none p-2 -mr-2"
                        aria-label="Toggle menu"
                    >
                        <motion.div initial={false} animate={{ rotate: isMobileMenuOpen ? 90 : 0, scale: isMobileMenuOpen ? 1.1 : 1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                            {isMobileMenuOpen ? <HiMiniXMark className="w-7 h-7" /> : <HiMiniBars3BottomRight className="w-7 h-7" />}
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
                                {user && (
                                    <div className="flex items-center gap-3 p-3 bg-softSilver/40 rounded-xl mb-2">
                                        <div className="w-10 h-10 rounded-full bg-navyBlue text-goldAccent flex items-center justify-center font-bold text-base overflow-hidden shrink-0">
                                            {user.avatarUrl ? (
                                                <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${user.avatarUrl}`} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div className="flex flex-col truncate">
                                            <span className="text-sm font-bold text-navyBlue truncate">{user.name}</span>
                                            <span className="text-xs text-navyBlue/60 truncate">{user.email}</span>
                                        </div>
                                    </div>
                                )}

                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-[15px] font-medium border-b border-softSilver pb-2 ${isActive('/') ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'}`}>Home</Link>
                                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`text-[15px] font-medium py-2 border-b border-softSilver ${isActive('/about') ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'}`}>Tentang Saya</Link>

                                <div className="py-2 border-b border-softSilver flex flex-col gap-3">
                                    <span className={`text-[15px] font-bold ${isActive('/layanan') ? 'text-goldAccent' : 'text-navyBlue'}`}>Layanan</span>
                                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-softSilver">
                                        {layananLinks.map((link) => {
                                            const Icon = link.icon;
                                            return (
                                                <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[14px] font-medium text-navyBlue/80 hover:text-goldAccent">
                                                    <Icon className="w-4 h-4 text-goldAccent" /> {link.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className={`text-[15px] font-medium py-2 border-b border-softSilver ${isActive('/blog') ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'}`}>Blog</Link>
                                <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className={`text-[15px] font-medium py-2 border-b border-softSilver ${isActive('/faq') ? 'text-goldAccent' : 'text-navyBlue hover:text-goldAccent'}`}>FAQ</Link>

                                {user ? (
                                    <div className="flex flex-col gap-2 pt-2">
                                        {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
                                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-[14px] font-semibold text-navyBlue border border-navyBlue text-center py-2.5 rounded-lg">
                                                Dashboard Admin
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="text-[14px] font-bold text-red-600 bg-red-50 text-center py-2.5 rounded-lg">
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <Link href="/auth/sign-in" onClick={() => setIsMobileMenuOpen(false)} className="text-[15px] font-bold text-pureWhite bg-navyBlue text-center py-3 mt-4 rounded-lg">
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}