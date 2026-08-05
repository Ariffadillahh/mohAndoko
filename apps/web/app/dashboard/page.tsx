'use client';

import { motion } from 'framer-motion';
import {
    HiOutlineNewspaper,
    HiOutlineTicket,
    HiOutlineBriefcase,
    HiOutlineCurrencyDollar, // Icon baru untuk Revenue
    HiArrowTrendingUp,
    HiOutlinePlus,
    HiOutlineCalendar
} from 'react-icons/hi2';
import Link from 'next/link';
import AdminLayout from '../../components/layout/AdminLayout'; // Sesuaikan path ini

// --- MOCK DATA UNTUK STATISTIK ---
const stats = [
    { title: "Total Artikel", value: "124", icon: HiOutlineNewspaper, trend: "+12 bulan ini", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Event & Seminar", value: "18", icon: HiOutlineTicket, trend: "3 akan datang", color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Track Record", value: "45", icon: HiOutlineBriefcase, trend: "+2 bulan ini", color: "text-amber-600", bg: "bg-amber-50" },
    // Mengganti Pengunjung menjadi Pendapatan
    { title: "Total Pendapatan", value: "Rp 125JT", icon: HiOutlineCurrencyDollar, trend: "+15% dari bulan lalu", color: "text-green-600", bg: "bg-green-50" },
];

// --- MOCK DATA UNTUK CHART PENDAPATAN ---
const revenueChartData = [
    { month: "Jan", amount: 45 },
    { month: "Feb", amount: 52 },
    { month: "Mar", amount: 38 },
    { month: "Apr", amount: 75 },
    { month: "Mei", amount: 65 },
    { month: "Jun", amount: 95 },
    { month: "Jul", amount: 125 }, // Nilai tertinggi
];

// --- MOCK DATA UNTUK AKTIVITAS ---
const recentActivities = [
    { title: "Artikel diterbitkan: 'Strategi Wealth Management 2026'", time: "2 jam yang lalu", type: "blog" },
    { title: "Event baru ditambahkan: 'Workshop Perencanaan Pensiun'", time: "5 jam yang lalu", type: "event" },
    { title: "Track record diperbarui: 'Bank Mandiri Bandung'", time: "1 hari yang lalu", type: "portfolio" },
    { title: "Artikel diperbarui: 'Pentingnya Asuransi Kesehatan'", time: "2 hari yang lalu", type: "blog" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function DashboardPage() {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Mencari nilai tertinggi untuk skala chart dinamis
    const maxRevenue = Math.max(...revenueChartData.map(d => d.amount));

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-8">

                {/* ================= HEADER DASHBOARD ================= */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-pureWhite p-8 rounded-3xl shadow-sm border border-navyBlue/5"
                >
                    <div>
                        <h1 className="font-serif text-3xl text-navyBlue font-medium mb-2">
                            Selamat Datang, <span className="italic text-goldAccent">Admin!</span>
                        </h1>
                        <p className="text-sm text-navyBlue/60">
                            Berikut adalah ringkasan performa dan pendapatan website Anda hari ini.
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-softSilver rounded-full text-xs font-semibold tracking-wide text-navyBlue/70">
                            <HiOutlineCalendar className="w-4 h-4" />
                            {today}
                        </span>
                    </div>
                </motion.div>

                {/* ================= KARTU STATISTIK ================= */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="bg-pureWhite p-6 rounded-3xl shadow-sm border border-navyBlue/5 hover:shadow-md transition-shadow relative overflow-hidden group"
                            >
                                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ${stat.bg}`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-serif text-navyBlue mb-1">{stat.value}</h3>
                                    <p className="text-sm font-medium text-navyBlue/60 mb-4">{stat.title}</p>

                                    <div className="mt-auto flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase text-navyBlue/40">
                                        <HiArrowTrendingUp className="w-3.5 h-3.5" />
                                        {stat.trend}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ================= BAGIAN TENGAH (CHART & QUICK ACTIONS) ================= */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* --- CHART PENDAPATAN (2 Kolom) --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 bg-pureWhite rounded-3xl shadow-sm border border-navyBlue/5 p-8 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="font-serif text-xl text-navyBlue font-medium">Grafik Pendapatan</h2>
                                <p className="text-sm text-navyBlue/50 mt-1">Performa pendapatan 7 bulan terakhir</p>
                            </div>
                            <div className="px-4 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-full">
                                +15% Bulan Ini
                            </div>
                        </div>

                        {/* Custom Bar Chart dengan Framer Motion */}
                        <div className="flex-1 flex items-end gap-3 sm:gap-6 pt-10 h-64 border-b border-softSilver pb-2">
                            {revenueChartData.map((data, idx) => {
                                const heightPercentage = (data.amount / maxRevenue) * 100;
                                const isMax = data.amount === maxRevenue;

                                return (
                                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                                        <div className="relative w-full flex justify-center h-full items-end">
                                            {/* Tooltip Hover (opsional) */}
                                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-navyBlue text-pureWhite text-[10px] font-bold px-2 py-1 rounded-md pointer-events-none whitespace-nowrap">
                                                Rp {data.amount} JT
                                            </div>

                                            {/* Bar Animasi */}
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${heightPercentage}%` }}
                                                transition={{ duration: 1, delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
                                                className={`w-full max-w-[48px] rounded-t-xl transition-colors duration-300 ${isMax ? 'bg-goldAccent' : 'bg-navyBlue hover:bg-navyBlue/80'
                                                    }`}
                                            />
                                        </div>
                                        {/* Label Bulan */}
                                        <span className={`text-xs mt-3 font-medium ${isMax ? 'text-goldAccent font-bold' : 'text-navyBlue/60'}`}>
                                            {data.month}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* --- QUICK ACTIONS / JALAN PINTAS (1 Kolom) --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-navyBlue text-pureWhite rounded-3xl shadow-sm p-8 relative overflow-hidden"
                    >
                        {/* Dekorasi Glow */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-goldAccent/20 blur-3xl rounded-full pointer-events-none" />

                        <h2 className="font-serif text-xl font-medium mb-6 relative z-10">Jalan Pintas</h2>

                        <div className="flex flex-col gap-4 relative z-10">
                            <Link href="/dashboard/blog" className="group flex items-center justify-between p-4 rounded-2xl bg-pureWhite/5 border border-pureWhite/10 hover:bg-goldAccent hover:border-goldAccent hover:text-navyBlue transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <HiOutlineNewspaper className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                                    <span className="text-sm font-medium">Tulis Artikel Baru</span>
                                </div>
                                <HiOutlinePlus className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                            </Link>

                            <Link href="/dashboard/events" className="group flex items-center justify-between p-4 rounded-2xl bg-pureWhite/5 border border-pureWhite/10 hover:bg-goldAccent hover:border-goldAccent hover:text-navyBlue transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <HiOutlineTicket className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                                    <span className="text-sm font-medium">Buat Event Baru</span>
                                </div>
                                <HiOutlinePlus className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                            </Link>

                            <Link href="/dashboard/track-record" className="group flex items-center justify-between p-4 rounded-2xl bg-pureWhite/5 border border-pureWhite/10 hover:bg-goldAccent hover:border-goldAccent hover:text-navyBlue transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <HiOutlineBriefcase className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                                    <span className="text-sm font-medium">Tambah Track Record</span>
                                </div>
                                <HiOutlinePlus className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* ================= AKTIVITAS TERBARU (Full Width) ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-pureWhite rounded-3xl shadow-sm border border-navyBlue/5 p-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-serif text-xl text-navyBlue font-medium">Log Aktivitas Terbaru</h2>
                        <Link href="/dashboard/aktivitas" className="text-xs font-bold text-goldAccent uppercase tracking-widest hover:text-navyBlue transition-colors">
                            Lihat Semua
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        {recentActivities.map((activity, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-softSilver transition-colors">
                                <div className="w-10 h-10 rounded-full bg-softSilver flex items-center justify-center shrink-0 text-navyBlue">
                                    {activity.type === 'blog' && <HiOutlineNewspaper className="w-5 h-5" />}
                                    {activity.type === 'event' && <HiOutlineTicket className="w-5 h-5" />}
                                    {activity.type === 'portfolio' && <HiOutlineBriefcase className="w-5 h-5" />}
                                </div>
                                <div className="pt-1">
                                    <p className="text-sm text-navyBlue font-medium leading-snug">{activity.title}</p>
                                    <p className="text-xs text-navyBlue/50 mt-1.5 flex items-center gap-1">
                                        <HiOutlineCalendar className="w-3.5 h-3.5" />
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </AdminLayout>
    );
}