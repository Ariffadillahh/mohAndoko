'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiArrowLongRight,
  HiOutlineBuildingOffice2,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineDocumentText,
  HiOutlinePresentationChartLine,
  HiOutlineShieldCheck,
  HiOutlineChartPie,
  HiCheckCircle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentCheck,
  HiOutlineHandThumbUp,
  HiOutlineComputerDesktop,
  HiOutlineVideoCamera
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
      className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 blur-[150px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-goldAccent) 0%, transparent 70%)' }}
    />
  );
}

export default function page() {
  return (
    <div className="flex flex-col min-h-screen bg-pureWhite">

      <section className="relative bg-navyBlue w-full min-h-[80vh] flex items-center overflow-hidden">
        <AmbientGlow />
        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[60vh] bg-goldAccent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-softSilver/20 bg-softSilver/10 text-pureWhite text-xs font-semibold tracking-widest uppercase mb-8">
              Corporate Solutions
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] tracking-tight mb-6 leading-[1.15] text-pureWhite">
              Build a Financially <br />
              <span className="italic text-goldAccent">Confident Workforce.</span>
            </h1>
            <p className="text-base md:text-lg font-light text-pureWhite/70 leading-relaxed max-w-2xl mb-12">
              Program edukasi dan pelatihan keuangan terstruktur, dirancang khusus untuk membantu karyawan perusahaan Anda membangun pemahaman dan kebiasaan finansial yang lebih sehat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kontak"
                className="group inline-flex justify-center items-center gap-3 px-8 py-4 bg-goldAccent text-navyBlue font-bold rounded-pill hover:bg-pureWhite transition-colors text-sm tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 duration-300"
              >
                Request Corporate Program
                <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-softSilver relative">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Mengapa Ini Penting?</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navyBlue mb-4">Why Financial Education Matters</h2>
            <p className="text-sm md:text-base text-navyBlue/70 leading-relaxed">
              Kesejahteraan finansial karyawan berbanding lurus dengan produktivitas perusahaan.
            </p>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mengurangi Financial Stress",
                desc: "Masalah keuangan adalah penyebab utama stres. Financial stress dapat memengaruhi fokus kerja, motivasi, dan kesehatan mental karyawan Anda.",
                icon: HiOutlineChartPie
              },
              {
                title: "Membangun Kemandirian Finansial",
                desc: "Karyawan membutuhkan pemahaman praktis tentang pengelolaan utang, dana darurat, dan investasi agar tidak terjerat masalah finansial jangka panjang.",
                icon: HiOutlineShieldCheck
              },
              {
                title: "Employee Benefit yang Bernilai",
                desc: "Perusahaan yang menyediakan edukasi finansial menunjukkan kepedulian tinggi, yang berdampak pada peningkatan retensi dan loyalitas karyawan.",
                icon: HiOutlineHandThumbUp
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} variants={itemVariants} className="bg-pureWhite p-8 rounded-2xl border border-navyBlue/5 hover:border-goldAccent/40 hover:-translate-y-2 transition-all duration-300 shadow-sm group">
                  <div className="w-14 h-14 rounded-full bg-softSilver group-hover:bg-goldAccent/10 flex items-center justify-center mb-6 transition-colors">
                    <Icon className="w-7 h-7 text-navyBlue group-hover:text-goldAccent transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl text-navyBlue mb-3">{item.title}</h3>
                  <p className="text-[14px] text-navyBlue/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-pureWhite border-b border-softSilver relative">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-softSilver pb-10">
            <div className="max-w-2xl">
              <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Modul Pelatihan</span>
              <h2 className="font-serif text-3xl md:text-5xl text-navyBlue leading-tight">Our Programs</h2>
            </div>
            <p className="text-sm text-navyBlue/60 max-w-sm leading-relaxed mb-2">
              Kurikulum yang dapat disesuaikan (customized) dengan demografi dan kebutuhan spesifik organisasi Anda.
            </p>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { title: "Financial Wellness Program", desc: "Program edukasi keuangan komprehensif untuk meningkatkan kesejahteraan finansial karyawan secara menyeluruh.", icon: HiOutlineUserGroup },
              { title: "Personal Financial Management", desc: "Praktik mengelola pendapatan, rasio pengeluaran, penyelesaian utang, dan strategi membangun tabungan.", icon: HiOutlineBanknotes },
              { title: "Investment Fundamentals", desc: "Pengenalan instrumen investasi, analisis profil risiko, dan cara mengamankan portofolio dari inflasi.", icon: HiOutlinePresentationChartLine },
              { title: "Retirement Planning", desc: "Mempersiapkan masa depan finansial karyawan sejak dini agar mencapai kebebasan finansial di masa pensiun.", icon: HiOutlineBuildingOffice2 }
            ].map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <motion.div key={idx} variants={itemVariants} className="flex flex-col sm:flex-row gap-6 bg-softSilver/30 p-8 rounded-[2rem] border border-transparent hover:border-goldAccent/30 hover:bg-pureWhite transition-all duration-300 group">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-pureWhite border border-navyBlue/5 group-hover:border-goldAccent/30 flex items-center justify-center shadow-sm">
                    <Icon className="w-8 h-8 text-navyBlue group-hover:text-goldAccent transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-navyBlue mb-3">{prog.title}</h3>
                    <p className="text-[14px] text-navyBlue/70 leading-relaxed">{prog.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32  bg-navyBlue text-pureWhite relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-goldAccent/10 blur-[150px] rounded-[100%] pointer-events-none"></div>

        <div className="max-w-7xl px-6 lg:px-12 mx-auto grid lg:grid-cols-2 gap-16 relative z-10">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Fleksibilitas Pelaksanaan</span>
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Available Formats</h2>
            <div className="flex flex-col gap-4">
              {[
                { name: "Seminar", icon: HiOutlineUserGroup },
                { name: "Workshop Interaktif", icon: HiOutlinePresentationChartLine },
                { name: "Corporate Training", icon: HiOutlineBriefcase },
                { name: "Webinar / Online Session", icon: HiOutlineVideoCamera },
                { name: "Employee Financial Coaching", icon: HiOutlineChatBubbleLeftRight }
              ].map((fmt, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-pureWhite/5 border border-pureWhite/10 p-4 rounded-xl hover:bg-goldAccent/10 hover:border-goldAccent/30 transition-colors">
                  <fmt.icon className="w-6 h-6 text-goldAccent shrink-0" />
                  <span className="text-[15px] font-medium tracking-wide">{fmt.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Klien & Mitra</span>
            <h2 className="font-serif text-3xl md:text-4xl mb-8">For Your Organization</h2>
            <p className="text-pureWhite/70 text-sm leading-relaxed mb-8">
              Program kami relevan dan telah diimplementasikan di berbagai lini industri dan institusi, termasuk:
            </p>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {[
                "HR Department",
                "Corporate / Swasta",
                "Financial Institution",
                "Government Institution",
                "Professional Organization",
                "BUMN & BUMD"
              ].map((org, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <HiCheckCircle className="w-5 h-5 text-goldAccent shrink-0 mt-0.5" />
                  <span className="text-sm text-pureWhite/90">{org}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      <section className="py-24 md:py-32 bg-softSilver border-b border-softSilver/50">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto text-center">
          <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Alur Kerja Sama</span>
          <h2 className="font-serif text-3xl md:text-4xl text-navyBlue mb-16">Bagaimana Kami Memulai?</h2>

          <div className="relative">
            <div className="hidden lg:block absolute top-[40px] left-[5%] w-[90%] h-[2px] bg-navyBlue/10 z-0"></div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              {[
                { title: "Request Form", icon: HiOutlineComputerDesktop },
                { title: "Quotation", icon: HiOutlineBanknotes },
                { title: "Proposal", icon: HiOutlineDocumentText },
                { title: "Consultation", icon: HiOutlineChatBubbleLeftRight },
                { title: "Agreement", icon: HiOutlineClipboardDocumentCheck },
                { title: "Payment & Execution", icon: HiOutlineBuildingOffice2 }
              ].map((step, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center group">
                  <div className="w-20 h-20 rounded-full bg-pureWhite border-2 border-softSilver flex items-center justify-center mb-4 group-hover:border-goldAccent transition-colors shadow-sm relative z-10">
                    <step.icon className="w-7 h-7 text-navyBlue group-hover:text-goldAccent transition-colors" />
                  </div>
                  <h3 className="font-serif text-[14px] text-navyBlue font-medium px-2">{step.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-pureWhite text-center px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-goldAccent/5 blur-[150px] rounded-full pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navyBlue mb-8 leading-tight">
            Let's Build a Financially <br /><span className="italic text-goldAccent">Stronger Workforce.</span>
          </h2>
          <p className="text-base text-navyBlue/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Diskusikan kebutuhan spesifik perusahaan Anda bersama konsultan kami. Kami akan merancang proposal program yang paling relevan.
          </p>
          <Link
            href="/kontak" 
            className="group inline-flex justify-center items-center gap-3 px-10 py-5 bg-navyBlue text-pureWhite font-bold rounded-pill hover:bg-goldAccent hover:text-navyBlue transition-all duration-300 text-sm tracking-wide shadow-xl hover:-translate-y-1"
          >
            Discuss Your Program
            <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}