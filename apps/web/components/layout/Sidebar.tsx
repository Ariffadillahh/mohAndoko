'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineHome,
    HiOutlineNewspaper,
    HiOutlineTicket,
    HiOutlineBriefcase,
    HiOutlineCog8Tooth,
    HiOutlineArrowRightOnRectangle,
    HiBars3,
    HiXMark
} from 'react-icons/hi2';
import { logoutUser } from '../../services/auth.service';

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuItems = [
        { title: "Dashboard", icon: HiOutlineHome, path: "/dashboard" },
        { title: "Blog & Berita", icon: HiOutlineNewspaper, path: "/dashboard/blog" },
        { title: "Event & Seminar", icon: HiOutlineTicket, path: "/dashboard/events" },
        { title: "Track Record", icon: HiOutlineBriefcase, path: "/dashboard/track-record" },
        { title: "Pengaturan", icon: HiOutlineCog8Tooth, path: "/dashboard/settings" },
    ];

    const handleLogout = async () => {
        try {
            await logoutUser();

            router.push("/auth/sign-in");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-black/80 backdrop-blur-md border border-pureWhite/10 text-pureWhite rounded-xl shadow-lg hover:bg-navyBlue transition-colors"
            >
                <HiBars3 className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-navyBlue/60 backdrop-blur-sm"
                            onClick={() => setIsMobileOpen(false)}
                        />

                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="absolute top-4 right-4 z-50 p-2.5 bg-pureWhite/10 backdrop-blur-md border border-pureWhite/20 text-pureWhite rounded-xl shadow-lg hover:bg-red-500/80 hover:border-red-400 transition-all duration-300"
                        >
                            <HiXMark className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.aside
                className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-navyBlue via-[#0a1526] to-[#050a14] text-pureWhite flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-hidden shadow-2xl lg:shadow-none border-r border-pureWhite/5 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-goldAccent/15 rounded-full blur-[60px] pointer-events-none z-0" />
                <div className="absolute top-1/2 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none z-0" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-goldAccent/10 rounded-full blur-[50px] pointer-events-none z-0" />

                <div className="h-24 flex flex-col justify-center px-7 border-b border-pureWhite/10 relative z-10 bg-pureWhite/5 backdrop-blur-sm w-full">
                    <h2 className="font-serif text-[1.65rem] font-bold tracking-wide leading-none drop-shadow-md">
                        <span className="text-goldAccent">Admin</span> Panel
                    </h2>
                    <p className="text-[10px] text-pureWhite/50 mt-2 tracking-[0.2em] uppercase font-medium">
                        by cerdaskeuangan.id
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2 relative z-10 scrollbar-hide">
                    <span className="text-[10px] font-bold tracking-widest text-pureWhite/30 uppercase mb-4 block px-3">
                        Main Menu
                    </span>

                    {menuItems.map((item, idx) => {
                        const Icon = item.icon;

                        const isActive = item.path === '/dashboard'
                            ? pathname === '/dashboard'
                            : pathname === item.path || pathname.startsWith(`${item.path}/`);

                        return (
                            <Link
                                key={idx}
                                href={item.path}
                                onClick={() => setIsMobileOpen(false)}
                                className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden border ${isActive
                                    ? 'bg-gradient-to-r from-goldAccent to-yellow-500 text-navyBlue font-bold border-goldAccent shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                                    : 'bg-transparent border-transparent hover:bg-pureWhite/5 hover:border-pureWhite/10 hover:shadow-lg hover:backdrop-blur-md text-pureWhite/70 hover:text-pureWhite'
                                    }`}
                            >
                                {!isActive && (
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-pureWhite/5 to-transparent pointer-events-none" />
                                )}

                                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-navyBlue scale-110' : 'text-pureWhite/40 group-hover:text-goldAccent group-hover:scale-110'
                                    }`} />
                                <span className="text-sm tracking-wide z-10">{item.title}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="p-5 border-t border-pureWhite/10 relative z-10 bg-gradient-to-t from-[#050a14] to-transparent">
                    <button onClick={handleLogout}
                        className="w-full group flex items-center justify-start gap-3 px-4 py-3.5 rounded-2xl bg-pureWhite/5 border border-pureWhite/10 text-pureWhite/70 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] backdrop-blur-md transition-all duration-300"
                    >
                        <HiOutlineArrowRightOnRectangle className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-semibold tracking-wide">Sign Out</span>
                    </button>
                </div>
            </motion.aside>
        </>
    );
}