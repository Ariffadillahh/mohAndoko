'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    HiOutlineAcademicCap,
    HiOutlineBriefcase,
    HiOutlineChartBar,
    HiOutlineHeart,
    HiOutlineLightBulb,
    HiOutlineScale,
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
    HiCheckCircle
} from 'react-icons/hi2';
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

export default function TentangSaya() {
    return (
        <div className="flex flex-col min-h-screen bg-pureWhite">

            <section className="relative bg-navyBlue w-full overflow-hidden text-pureWhite pt-32 pb-24 lg:pt-40 lg:pb-32">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-goldAccent/10 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-6 lg:px-14 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-4 block">Professional Profile</span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl tracking-wide mb-8 leading-[1.1]">
                            Mengenal Lebih Dekat <span className="italic text-goldAccent">Mohamad Andoko</span>
                        </h1>
                        <p className="text-[16px] md:text-lg font-light text-pureWhite/80 leading-relaxed max-w-3xl mx-auto">
                            Berdedikasi untuk membantu Anda membangun pemahaman serta kemampuan dalam mengelola keuangan demi mencapai kendali penuh atas masa depan finansial Anda.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="relative bg-goldAccent text-navyBlue py-20 md:py-28 overflow-hidden">
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-pureWhite/20 blur-3xl rounded-full"></div>
                <div className="absolute right-10 bottom-10 text-navyBlue/10 text-[150px] font-serif leading-none rotate-12 pointer-events-none">"</div>

                <div className="max-w-5xl mx-auto px-6 lg:px-14 relative z-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-3xl md:text-4xl lg:text-5xl leading-snug font-medium"
                    >
                        "I believe financial literacy is not just about knowing more. It's about <span className="italic">making better decisions.</span>"
                    </motion.h2>
                </div>
            </section>

            {/* ================= 3. OUR WHY ================= */}
            <section className="py-24 md:py-32 bg-pureWhite relative">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-4 block">Our Why</span>
                        <h2 className="font-serif text-3xl md:text-5xl text-navyBlue mb-8">Mengapa Saya Melakukan Ini?</h2>
                        <div className="space-y-6 text-base md:text-lg text-navyBlue/70 leading-relaxed">
                            <p>
                                Sepanjang karir saya, saya melihat begitu banyak individu dan keluarga yang bekerja keras setiap hari, namun terjebak dalam masalah finansial hanya karena kurangnya perencanaan dan literasi yang tepat.
                            </p>
                            <p>
                                Saya menyadari bahwa edukasi keuangan tidak boleh hanya menjadi hak eksklusif segelintir orang. Misi terbesar saya adalah <strong>mendekratisasi akses terhadap perencanaan keuangan</strong>, memecah konsep yang terlihat rumit menjadi langkah-langkah nyata yang bisa diterapkan oleh siapa saja untuk mencapai kesejahteraan (*wellness*) dan ketenangan pikiran (*peace of mind*).
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-softSilver relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 items-center relative z-10">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="w-full lg:w-5/12"
                    >
                        <div className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden bg-navyBlue shadow-2xl border-4 border-pureWhite">
                            <Image src="/images/andoko/img-1.webp" alt="Mohamad Andoko" fill className="object-cover object-top brightness-95" />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-navyBlue via-navyBlue/70 to-transparent">
                                <h3 className="font-serif text-2xl text-pureWhite mb-1">Mohamad Andoko</h3>
                                <p className="text-xs font-bold text-goldAccent tracking-widest uppercase">Senior Financial Planner</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="w-full lg:w-7/12"
                    >
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">My Journey</span>
                        <h2 className="font-serif text-3xl md:text-5xl text-navyBlue mb-8 leading-tight">
                            Berdedikasi untuk <span className="italic text-goldAccent">Masa Depan Finansial</span> Anda.
                        </h2>

                        <div className="space-y-6 text-[15px] text-navyBlue/70 leading-relaxed mb-10">
                            <p>
                                Dengan pengalaman lebih dari 20 tahun di industri keuangan, saya telah mendampingi ratusan klien—mulai dari profesional muda, keluarga, hingga berbagai korporasi besar di Indonesia—dalam menyusun strategi <i>wealth management</i> yang terukur.
                            </p>
                            <p>
                                Saya tidak hanya berfokus pada angka dan instrumen investasi, tetapi pada "cerita" di balik uang Anda. Saya percaya bahwa perencanaan keuangan yang sukses dimulai dengan mendengarkan, menganalisis, dan kemudian mengeksekusi rencana yang selaras dengan nilai dan tujuan hidup klien saya.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 border-t border-navyBlue/10 pt-8">
                            {[
                                "Certified Financial Planner (CFP®)",
                                "Qualified Wealth Planner (QWP®)",
                                "Associate Estate Planning Practitioner (AEPP)",
                                "Magister Manajemen (MM)",
                                "20+ Tahun Pengalaman Industri",
                                "Corporate Financial Consultant"
                            ].map((cert, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <HiCheckCircle className="w-5 h-5 text-goldAccent shrink-0" />
                                    <span className="text-sm font-medium text-navyBlue">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-pureWhite border-b border-softSilver">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Misi</span>
                        <h2 className="font-serif text-3xl md:text-5xl text-navyBlue mb-8 leading-tight">
                            A place to <span className="italic text-goldAccent">LEARN, SHARE</span> and <span className="italic text-goldAccent">PRACTICE</span> your financial.
                        </h2>
                        <div className="space-y-6 text-[15px] md:text-base text-navyBlue/70 leading-relaxed mb-12">
                            <p>
                                Belajar Perencanaan Keuangan itu tidak sesulit yang dipikirkan. <strong>IT'S VERY EASY TO LEARN FINANCIAL PLAN.</strong> Melalui Cerdas Keuangan, saya membangun wadah yang asik bagi Anda untuk bersosialisasi, berkolaborasi, dan mempraktikkan langsung ilmu keuangan Anda.
                            </p>
                            <p>
                                Mulai dari kalkulator *Financial Check Up*, artikel edukasi, hingga kelas *masterclass*, saya mengajak Anda untuk tumbuh bersama sebuah komunitas yang memiliki satu tujuan: mencapai kebebasan finansial yang terencana.
                            </p>
                        </div>
                        <Link href="/auth/sign-in" className="inline-flex items-center gap-2 px-10 py-4 bg-navyBlue text-pureWhite font-bold rounded-pill hover:bg-goldAccent hover:text-navyBlue transition-all duration-300 text-sm tracking-wide shadow-lg hover:-translate-y-1">
                            Join Komunitas Cerdas Keuangan
                        </Link>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-softSilver/30 border-b border-softSilver">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Spesialisasi</span>
                        <h2 className="font-serif text-3xl md:text-5xl text-navyBlue">My Expertise</h2>
                    </div>

                    <motion.div
                        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {[
                            { name: "Financial Planning", icon: HiOutlineChartBar },
                            { name: "Wealth Management", icon: HiOutlineBriefcase },
                            { name: "Financial Education", icon: HiOutlineAcademicCap },
                            { name: "Corporate Training", icon: HiOutlineUserGroup },
                            { name: "Professional Development", icon: HiOutlineTrendingUp }
                        ].map((expert, idx) => {
                            const Icon = expert.icon;
                            return (
                                <motion.div key={idx} variants={itemVariants} className="group flex items-center gap-3 px-6 py-4 bg-pureWhite shadow-sm rounded-full border border-navyBlue/5 hover:border-goldAccent/40 hover:shadow-lg transition-all duration-300 cursor-default">
                                    <Icon className="w-6 h-6 text-navyBlue group-hover:text-goldAccent transition-colors" />
                                    <span className="text-sm font-semibold text-navyBlue">{expert.name}</span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            <section className="py-24 md:py-32 px-6 lg:px-14 bg-navyBlue text-pureWhite relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-goldAccent/5 blur-[120px] rounded-[100%] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Prinsip Kerja</span>
                        <h2 className="font-serif text-3xl md:text-5xl">My Core Values</h2>
                    </div>

                    <motion.div
                        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center"
                    >
                        {[
                            { title: "Integrity", icon: HiOutlineShieldCheck, desc: "Bekerja dengan jujur dan transparan." },
                            { title: "Professionalism", icon: HiOutlineBriefcase, desc: "Memberikan standar layanan tertinggi." },
                            { title: "Education", icon: HiOutlineLightBulb, desc: "Memprioritaskan pemahaman klien." },
                            { title: "Trust", icon: HiOutlineHeart, desc: "Menjaga kerahasiaan & kepercayaan." },
                            { title: "Continuous Growth", icon: HiOutlineScale, desc: "Terus berkembang & beradaptasi." }
                        ].map((val, idx) => {
                            const Icon = val.icon;
                            return (
                                <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center gap-4 group">
                                    <div className="w-20 h-20 rounded-full bg-pureWhite/5 flex items-center justify-center border-2 border-pureWhite/10 group-hover:bg-goldAccent group-hover:border-goldAccent transition-all duration-300 shadow-xl">
                                        <Icon className="w-8 h-8 text-goldAccent group-hover:text-navyBlue transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-lg tracking-wide mb-1 text-pureWhite">{val.title}</h4>
                                        <p className="text-[12px] text-pureWhite/50 leading-tight">{val.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

        </div>
    );
}