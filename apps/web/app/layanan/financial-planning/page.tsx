'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiArrowLongRight,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineSun,
  HiCheckCircle,
  HiOutlineChartBar,
} from 'react-icons/hi2';

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

function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-goldAccent) 0%, transparent 70%)' }}
    />
  );
}

export default function page() {
  return (
    <div className="flex flex-col min-h-screen bg-pureWhite">

      <section className="relative bg-navyBlue w-full min-h-[80vh] flex items-center overflow-hidden">
        <AmbientGlow />
        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[60vh] bg-goldAccent/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10 pt-32 pb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-goldAccent/30 bg-goldAccent/5 text-goldAccent text-xs font-semibold tracking-widest uppercase mb-8">
              Personal Wealth Service
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] tracking-tight mb-8 leading-[1.15] text-pureWhite">
              Build a Financial Future <br />
              <span className="italic text-goldAccent relative">
                You Can Feel Confident About.
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-goldAccent/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="2" /></svg>
              </span>
            </h1>
            <p className="text-base md:text-lg font-light text-pureWhite/70 leading-relaxed max-w-2xl mx-auto mb-12">
              Perencanaan keuangan komprehensif yang membantu Anda memahami kondisi finansial saat ini, menentukan tujuan dengan presisi, dan membangun strategi terukur untuk mencapainya.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/sign-in"
                className="w-full sm:w-auto group inline-flex justify-center items-center gap-2 px-8 py-4 bg-goldAccent text-navyBlue font-bold rounded-pill hover:bg-pureWhite transition-colors text-sm tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 duration-300"
              >
                Start Your Financial Planning
                <HiArrowLongRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/kontak"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-transparent border-2 border-pureWhite/30 text-pureWhite font-bold rounded-pill hover:border-goldAccent hover:text-goldAccent transition-colors text-sm tracking-wide duration-300"
              >
                Talk to Our Consultant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-pureWhite relative">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 border-b border-softSilver pb-10"
          >
            <div className="max-w-3xl">
              <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Definisi & Ruang Lingkup</span>
              <h2 className="font-serif text-3xl md:text-5xl text-navyBlue leading-tight mb-4">
                Apa Itu <span className="italic text-goldAccent">Financial Planning?</span>
              </h2>
              <p className="text-base text-navyBlue/70 leading-relaxed">
                Banyak yang mengira financial planning hanyalah sekadar mencatat pemasukan dan mengatur pengeluaran harian. Lebih dari itu, financial planning adalah arsitektur kehidupan finansial Anda yang mencakup:
              </p>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              "Cash Flow Management",
              "Manajemen Dana Darurat",
              "Perencanaan Proteksi (Asuransi)",
              "Strategi Investasi",
              "Perencanaan Pendidikan Anak",
              "Perencanaan Pensiun",
              "Manajemen Warisan (Estate)",
              "Tujuan Jangka Pendek & Panjang"
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="group flex items-start gap-3 p-5 rounded-2xl bg-softSilver/50 hover:bg-navyBlue transition-colors duration-300">
                <HiCheckCircle className="w-6 h-6 text-goldAccent shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-navyBlue group-hover:text-pureWhite transition-colors leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-softSilver relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(#0A192F15_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_100%_0%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl px-6 lg:px-12 mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Target Klien</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navyBlue">Siapa yang Membutuhkan Layanan Ini?</h2>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Young Professionals", desc: "Baru mulai bekerja, memiliki penghasilan mandiri, dan ingin membangun fondasi keuangan yang kuat.", icon: HiOutlineBriefcase },
              { title: "Young Families", desc: "Ingin merencanakan pembelian rumah pertama, biaya pendidikan anak, dan keamanan masa depan keluarga.", icon: HiOutlineUserGroup },
              { title: "Business Owners", desc: "Membutuhkan strategi untuk mengelola arus kas dan memisahkan keuangan pribadi dari keuangan bisnis secara sehat.", icon: HiOutlineBuildingOffice2 },
              { title: "Pre-Retirees", desc: "Ingin memastikan kesiapan portofolio finansial sebelum memasuki masa pensiun agar hidup tetap nyaman.", icon: HiOutlineSun }
            ].map((persona, idx) => {
              const Icon = persona.icon;
              return (
                <motion.div key={idx} variants={itemVariants} className="bg-pureWhite p-8 rounded-[2rem] border border-navyBlue/5 hover:border-goldAccent/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-full bg-softSilver group-hover:bg-goldAccent/10 flex items-center justify-center mb-6 transition-colors">
                    <Icon className="w-7 h-7 text-navyBlue group-hover:text-goldAccent transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl text-navyBlue mb-3">{persona.title}</h3>
                  <p className="text-[14px] text-navyBlue/60 leading-relaxed">{persona.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-navyBlue text-pureWhite relative">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Metodologi Kami</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-6">How We Help You</h2>
            <p className="text-pureWhite/70 text-sm md:text-base leading-relaxed">
              Kami menggunakan pendekatan sistematis 5 langkah untuk memastikan setiap rencana yang dibuat benar-benar dapat dieksekusi dan relevan dengan kondisi Anda.
            </p>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: "01", title: "Understand", desc: "Memahami kondisi keuangan, nilai-nilai, dan prioritas hidup Anda saat ini." },
              { num: "02", title: "Analyze", desc: "Menganalisis arus kas, rasio keuangan, dan profil risiko Anda secara mendalam." },
              { num: "03", title: "Plan", desc: "Menyusun strategi dan roadmap keuangan yang sangat terpersonalisasi." },
              { num: "04", title: "Implement", desc: "Membantu Anda menerapkan rekomendasi dan produk instrumen yang tepat." },
              { num: "05", title: "Review", desc: "Melakukan evaluasi dan penyesuaian strategi secara berkala sesuai perubahan hidup." }
            ].map((step, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative group">
                {idx !== 4 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[1px] bg-pureWhite/10 z-0 group-hover:bg-goldAccent/30 transition-colors"></div>
                )}

                <div className="relative z-10 bg-pureWhite/5 border border-pureWhite/10 hover:border-goldAccent/50 p-6 rounded-2xl h-full flex flex-col transition-all duration-300 hover:bg-pureWhite/10 backdrop-blur-sm">
                  <span className="text-goldAccent font-serif text-3xl font-bold mb-4 block">{step.num}</span>
                  <h3 className="font-serif text-xl text-pureWhite mb-3">{step.title}</h3>
                  <p className="text-[13px] text-pureWhite/60 leading-relaxed flex-grow">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-pureWhite border-b border-softSilver">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12"
          >
            <div className="w-16 h-16 rounded-2xl bg-goldAccent/10 flex items-center justify-center mb-8">
              <HiOutlineChartBar className="w-8 h-8 text-goldAccent" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-navyBlue leading-tight mb-6">
              What's Included in <br /><span className="italic text-goldAccent">The Plan?</span>
            </h2>
            <p className="text-base text-navyBlue/70 leading-relaxed mb-8">
              Setiap sesi konsultasi perencanaan keuangan bersama Cerdas Keuangan dirancang untuk memberikan hasil akhir (deliverables) yang konkret dan siap diaplikasikan.
            </p>
            <Link href="/auth/sign-in" className="inline-flex items-center gap-2 text-sm font-bold text-navyBlue uppercase tracking-wider group hover:text-goldAccent transition-colors">
              Lihat Contoh Laporan <HiArrowLongRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="w-full lg:w-7/12 grid sm:grid-cols-2 gap-x-8 gap-y-6 bg-softSilver p-8 md:p-12 rounded-[2.5rem]"
          >
            {[
              "Financial Health Assessment",
              "Cash Flow & Debt Analysis",
              "Goal Setting & Tracking",
              "Investment Portfolio Planning",
              "Insurance & Protection Planning",
              "Retirement Planning Calculation",
              "Personalized Financial Roadmap"
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-navyBlue flex items-center justify-center shrink-0 mt-0.5">
                  <HiCheckCircle className="w-5 h-5 text-pureWhite" />
                </div>
                <span className="text-[15px] font-medium text-navyBlue leading-snug">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-pureWhite text-center px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-goldAccent/5 blur-[150px] rounded-full pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navyBlue mb-8 leading-tight">
            Your financial future <br /><span className="italic text-goldAccent">deserves a plan.</span>
          </h2>
          <Link
            href="/kontak"
            className="group inline-flex justify-center items-center gap-3 px-10 py-5 bg-navyBlue text-pureWhite font-bold rounded-pill hover:bg-goldAccent hover:text-navyBlue transition-all duration-300 text-sm tracking-wide shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1"
          >
            Schedule a Consultation
            <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}