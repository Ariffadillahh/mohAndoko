'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiArrowLongRight,
  HiOutlineQuestionMarkCircle,
  HiOutlineMap,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiCheckCircle,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineRocketLaunch,
  HiOutlineArrowPath
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
      className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-[150px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-goldAccent) 0%, transparent 70%)' }}
    />
  );
}

export default function page() {
  return (
    <div className="flex flex-col min-h-screen bg-pureWhite">

      <section className="relative bg-navyBlue w-full min-h-[80vh] flex items-center overflow-hidden">
        <AmbientGlow />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10 pt-32 pb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-goldAccent/30 bg-goldAccent/5 text-goldAccent text-xs font-semibold tracking-widest uppercase mb-8">
              Pendampingan Personal Eksklusif
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] tracking-tight mb-6 leading-[1.15] text-pureWhite">
              Your Money. Your Goals. <br />
              <span className="italic text-goldAccent relative">
                Your Personal Financial Coach.
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-goldAccent/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="2" /></svg>
              </span>
            </h1>
            <p className="text-base md:text-lg font-light text-pureWhite/70 leading-relaxed max-w-2xl mx-auto mb-12">
              Sesi diskusi interaktif dan pendampingan 1-on-1 bersama pakar keuangan. Dirancang khusus untuk Anda yang membutuhkan panduan personal, kejelasan arah, dan akuntabilitas dalam mencapai tujuan finansial.
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <Link
                href="/booking"
                className="group inline-flex justify-center items-center gap-2 px-10 py-5 bg-goldAccent text-navyBlue font-bold rounded-pill hover:bg-pureWhite transition-colors text-sm tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 duration-300"
              >
                Book Your Coaching Session
                <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-softSilver relative overflow-hidden">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Identifikasi Tantangan</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navyBlue mb-4">Is This For You?</h2>
            <p className="text-sm md:text-base text-navyBlue/70 leading-relaxed">
              Program ini sangat cocok jika Anda sedang menghadapi salah satu dari tantangan finansial berikut:
            </p>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: "You have income, but don't know where your money goes.",
                desc: "Penghasilan Anda cukup, tetapi di akhir bulan selalu terasa tidak bersisa tanpa mengetahui ke mana larinya uang tersebut.",
                icon: HiOutlineQuestionMarkCircle
              },
              {
                title: "You want to invest but don't know where to start.",
                desc: "Anda menyadari pentingnya investasi, namun ragu dan takut salah langkah karena banyaknya pilihan instrumen di pasar.",
                icon: HiOutlineChartBar
              },
              {
                title: "You have financial goals but struggle to create a plan.",
                desc: "Anda memiliki impian besar (beli rumah, pensiun nyaman, dll), namun kesulitan memecahnya menjadi rencana bulanan yang masuk akal.",
                icon: HiOutlineMap
              },
              {
                title: "You need someone to help you stay accountable.",
                desc: "Anda tahu apa yang harus dilakukan secara teori, tetapi butuh seseorang untuk menjaga disiplin dan mengevaluasi progres Anda.",
                icon: HiOutlineUserGroup
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div key={idx} variants={itemVariants} className="bg-pureWhite p-8 md:p-10 rounded-[2rem] border border-navyBlue/5 hover:border-goldAccent/30 transition-all duration-300 shadow-sm hover:shadow-xl group flex gap-6 items-start">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-softSilver group-hover:bg-goldAccent/10 flex items-center justify-center transition-colors">
                    <Icon className="w-7 h-7 text-navyBlue group-hover:text-goldAccent transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-navyBlue mb-3 leading-snug">{card.title}</h3>
                    <p className="text-[14px] text-navyBlue/60 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-pureWhite border-b border-softSilver relative">
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-softSilver/50 hidden lg:block pointer-events-none"></div>

        <div className="max-w-7xl px-6 lg:px-12 mx-auto flex flex-col lg:flex-row gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Area Fokus Fokus Diskusi</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navyBlue leading-tight mb-6">
              What We Can <br /><span className="italic text-goldAccent">Work On</span>
            </h2>
            <p className="text-base text-navyBlue/70 leading-relaxed mb-8 max-w-lg">
              Sesi coaching ini 100% disesuaikan dengan kebutuhan Anda. Anda yang memegang kendali atas topik yang ingin dibedah bersama pelatih keuangan Anda.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="w-full lg:w-1/2 grid sm:grid-cols-2 gap-4"
          >
            {[
              "Personal Budgeting",
              "Debt Management",
              "Investment Strategy",
              "Financial Goals",
              "Career & Income Planning",
              "Financial Habits & Mindset",
              "Major Financial Decisions"
            ].map((topic, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex items-center gap-4 bg-softSilver/50 p-5 rounded-2xl border border-transparent hover:border-goldAccent/30 hover:bg-pureWhite hover:shadow-md transition-all duration-300">
                <HiCheckCircle className="w-6 h-6 text-goldAccent shrink-0" />
                <span className="text-sm font-semibold text-navyBlue leading-snug">{topic}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-navyBlue text-pureWhite relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-goldAccent/5 blur-[120px] rounded-[100%] pointer-events-none"></div>

        <div className="max-w-7xl px-6 lg:px-12 mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Alur Proses</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-6">How It Works</h2>
            <p className="text-pureWhite/70 text-sm md:text-base leading-relaxed">
              Proses coaching yang simpel dan terstruktur, mulai dari pendaftaran jadwal hingga eksekusi rencana keuangan Anda.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[45px] left-[10%] w-[80%] h-[2px] bg-pureWhite/10 z-0"></div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-4 relative z-10">
              {[
                { title: "Book a Session", desc: "Pilih jadwal, isi data, dan selesaikan pembayaran via portal.", icon: HiOutlineCalendar },
                { title: "Initial Assessment", desc: "Isi kuesioner singkat untuk memetakan kondisi awal Anda.", icon: HiOutlineDocumentText },
                { title: "1-on-1 Coaching", desc: "Sesi diskusi langsung dan privat bersama coach keuangan.", icon: HiOutlineChatBubbleBottomCenterText },
                { title: "Action Plan", desc: "Menerima ringkasan rencana dan langkah nyata yang harus diambil.", icon: HiOutlineRocketLaunch },
                { title: "Follow-up", desc: "Evaluasi berkala untuk memastikan Anda tetap di jalur yang tepat.", icon: HiOutlineArrowPath }
              ].map((step, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center text-center relative group">
                  <div className="w-24 h-24 rounded-full bg-navyBlue border-4 border-pureWhite/10 flex items-center justify-center mb-6 group-hover:border-goldAccent group-hover:bg-pureWhite/5 transition-all duration-300 relative z-10 shadow-xl">
                    <step.icon className="w-8 h-8 text-goldAccent group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-serif text-lg text-pureWhite mb-2">{step.title}</h3>
                  <p className="text-[13px] text-pureWhite/60 leading-relaxed px-2">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-pureWhite text-center px-6 lg:px-12 border-t border-softSilver">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-navyBlue mb-6 leading-tight">
            Ready to Take Control <br /><span className="italic text-goldAccent">of Your Money?</span>
          </h2>
          <p className="text-base text-navyBlue/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Jangan tunda lagi. Jadwalkan sesi coaching Anda sekarang melalui portal *booking* kami yang terintegrasi secara *real-time*.
          </p>

          <div className="flex flex-col items-center gap-5">
            <Link
              href="/booking"
              className="group inline-flex justify-center items-center gap-3 px-10 py-5 bg-goldAccent text-navyBlue font-bold rounded-pill hover:bg-navyBlue hover:text-pureWhite transition-all duration-300 text-sm tracking-wide shadow-xl hover:-translate-y-1"
            >
              Book Your Coaching Session
              <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Visualisasi Alur Singkat di Bawah Tombol */}
            <p className="text-[11px] font-semibold text-navyBlue/50 uppercase tracking-widest flex flex-wrap items-center justify-center gap-2 mt-4">
              Pilih Jadwal <HiArrowLongRight className="w-3 h-3 text-goldAccent" />
              Isi Data <HiArrowLongRight className="w-3 h-3 text-goldAccent" />
              Payment Gateway <HiArrowLongRight className="w-3 h-3 text-goldAccent" />
              Confirmed
            </p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}