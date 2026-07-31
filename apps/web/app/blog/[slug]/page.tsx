'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    HiArrowLongLeft,
    HiOutlineCalendar,
    HiOutlineClock,
    HiOutlineShare,
    HiOutlineBookmark
} from 'react-icons/hi2';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
    const article = {
        title: "Strategi Wealth Management di Era Ketidakpastian Ekonomi 2026",
        excerpt: "Memahami bagaimana inflasi, suku bunga, dan tren pasar global memengaruhi portofolio Anda, serta langkah taktis untuk mengamankan kekayaan.",
        category: "Wealth Management",
        date: "24 Juli 2026",
        time: "10:30 WIB",
        readTime: "5 Menit Baca",
        author: "Mohamad Andoko",
        authorRole: "Senior Financial Planner",
        image: "/images/dbs.jpeg",
        content: `
            <p>Tahun 2026 membawa dinamika ekonomi yang belum pernah kita saksikan sebelumnya. Kombinasi antara volatilitas pasar global, perubahan kebijakan suku bunga bank sentral, dan inflasi yang bergejolak membuat banyak investor merasa cemas akan masa depan portofolio mereka. Namun, di tengah ketidakpastian ini, strategi <em>wealth management</em> yang solid dapat menjadi jangkar penyelamat.</p>
            
            <h3>1. Diversifikasi Bukan Lagi Sekadar Jargon</h3>
            <p>Selama bertahun-tahun, kita selalu mendengar mantra "jangan menaruh semua telur dalam satu keranjang". Di tahun ini, mantra tersebut berubah menjadi aturan mutlak. Diversifikasi lintas kelas aset—mulai dari ekuitas, pendapatan tetap (obligasi), hingga aset alternatif seperti logam mulia—terbukti mampu meredam volatilitas.</p>

            <blockquote>
                "Ketidakpastian ekonomi bukanlah alasan untuk berhenti berinvestasi, melainkan momen yang tepat untuk meninjau kembali dan merestrukturisasi portofolio Anda agar lebih tangguh."
            </blockquote>

            <p>Fokuslah pada aset yang memiliki fundamental kuat dan rekam jejak dividen yang stabil. Aset-aset ini cenderung lebih tahan banting ketika terjadi koreksi pasar yang tajam.</p>

            <h3>2. Tinjau Ulang Rasio Kas (Cash Ratio)</h3>
            <p>Di era ketidakpastian, uang tunai (*cash is king*) kembali memegang peranan penting. Memiliki rasio kas yang lebih tinggi dari biasanya (misalnya 15-20% dari total portofolio) memberikan Anda dua keuntungan utama: keamanan emosional dan amunisi untuk membeli aset berkualitas saat harganya sedang terdiskon besar-besaran (<em>buy the dip</em>).</p>

            <h3>3. Pentingnya Proteksi Asuransi</h3>
            <p>Wealth management bukan hanya tentang menumbuhkan kekayaan, tetapi juga melindunginya. Inflasi biaya medis yang terus meroket menuntut kita untuk meninjau kembali polis asuransi kesehatan dan jiwa yang kita miliki. Pastikan nilai pertanggungan Anda masih relevan dengan kondisi ekonomi saat ini.</p>

            <p>Pada akhirnya, strategi terbaik adalah tetap disiplin pada tujuan keuangan jangka panjang Anda dan tidak terpancing oleh kepanikan pasar jangka pendek. Berkonsultasilah dengan perencana keuangan profesional untuk mendapatkan panduan yang disesuaikan dengan profil risiko Anda.</p>
        `
    };

    const relatedArticles = [
        { title: "Emas vs Reksa Dana: Mana yang Lebih Cocok untuk Pemula?", category: "Investment", date: "08 Juli 2026", image: "/hero-profile.png" },
        { title: "Review Instrumen Obligasi Pemerintah Terbaru (SBN)", category: "Wealth Management", date: "01 Juli 2026", image: "/hero-profile.png" },
        { title: "Cara Mengelola Arus Kas Bisnis agar Tetap Positif", category: "Business", date: "05 Juli 2026", image: "/hero-profile.png" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-pureWhite">
            <section className="pt-10 pb-12 bg-softSilver/30 border-b border-softSilver">
                <div className="max-w-7xl px-6 lg:px-14 mx-auto">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navyBlue/60 hover:text-goldAccent transition-colors mb-8">
                        <HiArrowLongLeft className="w-5 h-5" /> Kembali ke Berita
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-6 text-[11px] font-bold uppercase tracking-wider text-navyBlue/60">
                        <span className="bg-goldAccent/10 text-goldAccent px-3 py-1.5 rounded-full">{article.category}</span>
                        <span className="flex items-center gap-1.5"><HiOutlineCalendar className="w-4 h-4" /> {article.date}</span>
                        <span className="flex items-center gap-1.5"><HiOutlineClock className="w-4 h-4" /> {article.readTime}</span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="font-serif text-3xl md:text-5xl lg:text-[3.2rem] text-navyBlue leading-tight mb-6"
                    >
                        {article.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg md:text-xl text-navyBlue/70 leading-relaxed font-light mb-8"
                    >
                        {article.excerpt}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-t border-navyBlue/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-softSilver overflow-hidden border-2 border-pureWhite shadow-sm relative">
                                <Image src="/hero-profile.png" alt="Author" fill className="object-cover" />
                            </div>
                            <div>
                                <p className="font-serif text-lg text-navyBlue leading-none mb-1">{article.author}</p>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-goldAccent">{article.authorRole}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-full bg-softSilver/50 flex items-center justify-center text-navyBlue hover:bg-goldAccent hover:text-pureWhite transition-colors shadow-sm">
                                <HiOutlineBookmark className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-softSilver/50 flex items-center justify-center text-navyBlue hover:bg-goldAccent hover:text-pureWhite transition-colors shadow-sm">
                                <HiOutlineShare className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className=" -mt-8 relative z-10">
                <div className="max-w-7xl px-6 lg:px-14 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                        className="relative aspect-[16/7] md:aspect-[21/9] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-navyBlue shadow-2xl border-4 border-pureWhite"
                    >
                        <Image src={article.image} alt={article.title} fill className="object-cover" />
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl px-6 lg:px-14 mx-auto flex flex-col lg:flex-row gap-16">
                    <article className="w-full lg:w-8/12">
                        <div
                            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navyBlue prose-p:text-navyBlue/80 prose-p:leading-relaxed prose-a:text-goldAccent prose-blockquote:border-l-4 prose-blockquote:border-goldAccent prose-blockquote:bg-softSilver/30 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:text-navyBlue prose-blockquote:italic prose-blockquote:rounded-r-xl prose-li:text-navyBlue/80"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        <div className="mt-12 pt-8 border-t border-softSilver">
                            <span className="text-xs font-bold uppercase tracking-widest text-navyBlue/50 block mb-4">Tags:</span>
                            <div className="flex flex-wrap gap-2">
                                {["Wealth Management", "Ekonomi 2026", "Investasi", "Diversifikasi"].map((tag, i) => (
                                    <span key={i} className="bg-softSilver text-navyBlue text-xs font-medium px-4 py-2 rounded-full hover:bg-goldAccent/10 hover:text-goldAccent transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>

                    <aside className="w-full lg:w-4/12">
                        <div className="sticky top-32 space-y-10">
                            <div>
                                <div className="flex items-center gap-3 border-b-2 border-navyBlue/10 pb-3 mb-6">
                                    <div className="w-6 h-1 bg-goldAccent"></div>
                                    <h3 className="font-serif text-xl text-navyBlue">Artikel Terkait</h3>
                                </div>
                                <div className="flex flex-col gap-6">
                                    {relatedArticles.map((rel, idx) => (
                                        <Link href="#" key={idx} className="group flex items-center gap-4">
                                            <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-softSilver">
                                                <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <span className="text-goldAccent text-[9px] font-bold uppercase tracking-wider mb-1 block">{rel.category}</span>
                                                <h4 className="font-serif text-sm text-navyBlue leading-snug group-hover:text-goldAccent transition-colors line-clamp-2 mb-1">
                                                    {rel.title}
                                                </h4>
                                                <span className="text-[10px] text-navyBlue/50">{rel.date}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </aside>

                </div>
            </section>

        </div>
    );
}