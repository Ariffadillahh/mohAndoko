'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineCalendar } from 'react-icons/hi2';
import { HiOutlineTrendingUp } from 'react-icons/hi';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: ("easeOut" as any) }
    }
};

export default function BlogPage() {
    const headlineArticle = {
        slug: "strategi-wealth-management-2026",
        title: "Strategi Wealth Management di Era Ketidakpastian Ekonomi 2026",
        excerpt: "Memahami bagaimana inflasi, suku bunga, dan tren pasar global memengaruhi portofolio Anda, serta langkah taktis untuk mengamankan kekayaan.",
        category: "Wealth Management",
        date: "24 Juli 2026",
        time: "10:30 WIB",
        image: "/images/andoko/img-3.webp"
    };

    const featuredArticles = [
        { slug: "5-langkah-financial-check-up", title: "5 Langkah Melakukan Financial Check-Up Mandiri di Pertengahan Tahun", category: "Personal Finance", date: "23 Juli 2026", image: "/images/andoko/img-3.webp" },
        { slug: "financial-wellness-prioritas-hrd", title: "Mengapa Financial Wellness Karyawan Kini Jadi Prioritas HRD?", category: "Corporate", date: "22 Juli 2026", image: "/images/andoko/img-3.webp" },
    ];

    const latestArticles = [
        { slug: "persiapan-dana-pendidikan-anak", title: "Mempersiapkan Dana Pendidikan Anak: Mulai dari Mana?", excerpt: "Biaya pendidikan naik rata-rata 10-15% per tahun. Simak instrumen yang tepat untuk menyiapkannya.", category: "Education", date: "20 Juli 2026", image: "/images/andoko/img-3.webp" },
        { slug: "kesalahan-perencanaan-pensiun", title: "Kesalahan Umum dalam Perencanaan Pensiun yang Harus Dihindari", excerpt: "Banyak pekerja terjebak pada ilusi dana pensiun dari perusahaan. Ketahui cara menghitung kebutuhan riil Anda.", category: "Retirement", date: "18 Juli 2026", image: "/images/andoko/img-3.webp" },
        { slug: "mindset-investasi-jangka-panjang", title: "Membangun Mindset Investasi Jangka Panjang di Tengah Pasar Volatil", excerpt: "Kunci sukses investasi bukanlah market timing, melainkan time in the market. Berikut panduannya.", category: "Investment", date: "15 Juli 2026", image: "/images/andoko/img-3.webp" },
        { slug: "pentingnya-asuransi-keuangan", title: "Pentingnya Asuransi dalam Piramida Keuangan Keluarga", excerpt: "Jangan sampai aset yang dikumpulkan bertahun-tahun habis seketika karena risiko tak terduga.", category: "Protection", date: "12 Juli 2026", image: "/images/andoko/img-3.webp" },
    ];

    const trendingArticles = [
        { slug: "panduan-lapor-spt-tahunan", title: "Pajak Penghasilan: Panduan Lengkap Pelaporan SPT Tahunan", category: "Tax Planning", date: "10 Juli 2026", image: "/images/andoko/img-3.webp" },
        { slug: "emas-vs-reksa-dana", title: "Emas vs Reksa Dana: Mana yang Lebih Cocok untuk Pemula?", category: "Investment", date: "08 Juli 2026", image: "/images/andoko/img-3.webp" },
        { slug: "mengelola-arus-kas-bisnis", title: "Cara Mengelola Arus Kas Bisnis agar Tetap Positif", category: "Business", date: "05 Juli 2026", image: "/images/andoko/img-3.webp" },
        { slug: "review-obligasi-pemerintah", title: "Review Instrumen Obligasi Pemerintah Terbaru", category: "Wealth Management", date: "01 Juli 2026", image: "/images/andoko/img-3.webp" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-pureWhite">

            <section className="bg-navyBlue pt-32 pb-24 text-pureWhite relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-14 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6">
                            Financial <span className="italic text-goldAccent">Insights</span>
                        </h1>
                        <p className="text-[15px] md:text-lg font-light text-pureWhite/70 max-w-2xl mx-auto">
                            Berita terkini, analisis pasar, dan wawasan edukatif seputar perencanaan keuangan dari pakar Cerdas Keuangan.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 bg-softSilver/30 border-t border-softSilver">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        <div className="lg:col-span-2">
                            <div className="mb-8 flex items-center gap-3 border-b-2 border-navyBlue/10 pb-3">
                                <div className="w-8 h-1 bg-goldAccent"></div>
                                <h3 className="font-serif text-2xl text-navyBlue">Berita Terkini</h3>
                            </div>

                            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-8">
                                {latestArticles.map((article, idx) => (
                                    <motion.div key={idx} variants={itemVariants} className="group cursor-pointer">
                                        <Link href={`/blog/${article.slug}`} className="block">
                                            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-softSilver mb-5 shadow-sm">
                                                <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute bottom-4 left-4 bg-pureWhite/90 backdrop-blur-sm text-navyBlue text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                                                    {article.category}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-serif text-xl text-navyBlue mb-3 leading-snug group-hover:text-goldAccent transition-colors">
                                                    {article.title}
                                                </h4>
                                                <p className="text-[14px] text-navyBlue/60 leading-relaxed mb-4 line-clamp-2">
                                                    {article.excerpt}
                                                </p>
                                                <span className="text-[11px] font-medium text-navyBlue/50 flex items-center gap-1">
                                                    <HiOutlineCalendar className="w-3.5 h-3.5" /> {article.date}
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="sticky top-24 space-y-10 self-start">
                            <div className="mb-8 flex items-center gap-3 border-b-2 border-navyBlue/10 pb-3">
                                <HiOutlineTrendingUp className="w-6 h-6 text-goldAccent" />
                                <h3 className="font-serif text-2xl text-navyBlue">Terpopuler</h3>
                            </div>

                            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
                                {trendingArticles.map((article, idx) => (
                                    <motion.div key={idx} variants={itemVariants}>
                                        <Link href={`/blog/${article.slug}`} className="group flex items-center gap-4 border-b border-softSilver pb-6 last:border-0">
                                            <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-softSilver shadow-sm">
                                                <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute top-0 left-0 bg-goldAccent text-navyBlue w-6 h-6 flex items-center justify-center text-xs font-bold rounded-br-lg z-10">
                                                    {idx + 1}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-center">
                                                <span className="text-goldAccent text-[10px] font-bold uppercase tracking-wider mb-1.5 block">{article.category}</span>
                                                <h4 className="font-serif text-[15px] text-navyBlue leading-snug group-hover:text-goldAccent transition-colors line-clamp-2 mb-2">
                                                    {article.title}
                                                </h4>
                                                <span className="text-[11px] text-navyBlue/50">{article.date}</span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}