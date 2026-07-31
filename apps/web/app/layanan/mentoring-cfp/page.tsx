'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiArrowLongRight,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineStar,
  HiCheckCircle,
  HiOutlineMagnifyingGlassCircle,
  HiOutlinePencilSquare,
  HiOutlineDocumentCheck,
  HiOutlineCheckBadge,
  HiOutlineCalendar,
  HiOutlineClock
} from 'react-icons/hi2';
import { HiOutlineLibrary, HiOutlineTrendingUp } from 'react-icons/hi';

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
      className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[150px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-goldAccent) 0%, transparent 70%)' }}
    />
  );
}

export default function page() {
  return (
    <div className="flex flex-col min-h-screen bg-pureWhite">

      <section className="relative bg-navyBlue w-full min-h-[80vh] flex items-center overflow-hidden">
        <AmbientGlow />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10 pt-32 pb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-goldAccent/30 bg-goldAccent/10 text-goldAccent text-xs font-semibold tracking-widest uppercase mb-8 shadow-sm">
              Premium Education Program
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] tracking-tight mb-8 leading-[1.15] text-pureWhite">
              Prepare for Your CFP Certification <br />
              <span className="italic text-goldAccent relative">
                with Confidence.
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-goldAccent/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="2" /></svg>
              </span>
            </h1>
            <p className="text-base md:text-lg font-light text-pureWhite/70 leading-relaxed max-w-2xl mx-auto mb-12">
              Program pembelajaran terstruktur dan panduan eksklusif dari praktisi berpengalaman, dirancang khusus untuk memandu Anda melewati perjalanan sertifikasi CFP® dengan sukses.
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <Link
                href="#batch"
                className="group inline-flex justify-center items-center gap-2 px-10 py-5 bg-goldAccent text-navyBlue font-bold rounded-pill hover:bg-pureWhite transition-colors text-sm tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 duration-300"
              >
                Join CFP Preparation Program
                <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-softSilver relative">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Nilai Sertifikasi</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navyBlue mb-4">Why CFP?</h2>
            <p className="text-sm md:text-base text-navyBlue/70 leading-relaxed">
              Certified Financial Planner (CFP®) adalah standar emas global dalam perencanaan keuangan profesional.
            </p>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Professional Credibility", desc: "Mendapatkan pengakuan global sebagai profesional keuangan yang kompeten dan beretika.", icon: HiOutlineStar },
              { title: "In-Depth Knowledge", desc: "Menguasai ilmu perencanaan keuangan secara komprehensif, mulai dari investasi hingga pajak.", icon: HiOutlineAcademicCap },
              { title: "Career Development", desc: "Membuka peluang karir yang lebih luas di berbagai institusi keuangan terkemuka.", icon: HiOutlineBriefcase },
              { title: "Professional Growth", desc: "Membangun kepercayaan klien dan meningkatkan standar layanan profesional Anda.", icon: HiOutlineTrendingUp }
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-pureWhite p-8 rounded-2xl border border-navyBlue/5 hover:border-goldAccent/30 transition-all duration-300 shadow-sm hover:shadow-xl group">
                <div className="w-14 h-14 rounded-full bg-softSilver group-hover:bg-goldAccent/10 flex items-center justify-center mb-6 transition-colors">
                  <item.icon className="w-7 h-7 text-navyBlue group-hover:text-goldAccent transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-navyBlue mb-3 leading-snug">{item.title}</h3>
                <p className="text-[14px] text-navyBlue/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-pureWhite border-b border-softSilver relative">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto flex flex-col lg:flex-row gap-16 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-5/12">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Fasilitas Program</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navyBlue leading-tight mb-6">
              CFP Exam <br /><span className="italic text-goldAccent">Preparation Program</span>
            </h2>
            <p className="text-base text-navyBlue/70 leading-relaxed mb-8">
              Kami tidak hanya memberikan teori, tetapi juga membekali Anda dengan studi kasus nyata, latihan intensif, dan strategi khusus untuk menghadapi ujian CFP® dengan tingkat kelulusan tinggi.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full lg:w-7/12 grid sm:grid-cols-2 gap-4">
            {[
              "Modul Pembelajaran Komprehensif",
              "Bank Soal (Practice Questions)",
              "Bedah Studi Kasus (Case Studies)",
              "Simulasi Ujian (Mock Exams)",
              "Expert Coaching Sessions",
              "Exam Strategy & Time Management"
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex items-center gap-4 bg-softSilver/50 p-6 rounded-2xl border border-transparent hover:border-goldAccent/30 hover:bg-pureWhite hover:shadow-md transition-all duration-300">
                <HiCheckCircle className="w-6 h-6 text-goldAccent shrink-0" />
                <span className="text-[15px] font-semibold text-navyBlue leading-snug">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      <section className="py-24 md:py-32 bg-navyBlue text-pureWhite relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-goldAccent/5 blur-[150px] rounded-[100%] pointer-events-none"></div>

        <div className="max-w-7xl px-6 lg:px-12 mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Tahapan Belajar</span>
            <h2 className="font-serif text-3xl md:text-5xl mb-6">Learning Journey</h2>
            <p className="text-pureWhite/70 text-sm md:text-base leading-relaxed">
              Kurikulum yang dirancang secara bertahap untuk memastikan pemahaman mendalam dari dasar hingga siap ujian.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[40px] left-[10%] w-[80%] h-[2px] bg-pureWhite/10 z-0"></div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-4 relative z-10">
              {[
                { title: "Foundation", desc: "Memahami fundamental perencanaan keuangan secara utuh.", icon: HiOutlineLibrary },
                { title: "Deep Dive", desc: "Mempelajari secara intensif materi inti dan modul CFP.", icon: HiOutlineMagnifyingGlassCircle },
                { title: "Practice", desc: "Mengerjakan ribuan latihan soal dan bedah studi kasus nyata.", icon: HiOutlinePencilSquare },
                { title: "Mock Exam", desc: "Mengikuti simulasi ujian dengan standar dan waktu sesungguhnya.", icon: HiOutlineDocumentCheck },
                { title: "Exam Ready", desc: "Review akhir, pemantapan mental, dan strategi menghadapi ujian.", icon: HiOutlineCheckBadge }
              ].map((step, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center text-center relative group">
                  <span className="absolute -top-6 -right-1 text-pureWhite/10 font-serif text-6xl font-bold z-0 pointer-events-none">0{idx + 1}</span>
                  <div className="w-20 h-20 rounded-full bg-navyBlue border-4 border-pureWhite/10 flex items-center justify-center mb-5 group-hover:border-goldAccent group-hover:bg-pureWhite/5 transition-all duration-300 relative z-10 shadow-xl">
                    <step.icon className="w-7 h-7 text-goldAccent group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-serif text-lg text-pureWhite mb-2">{step.title}</h3>
                  <p className="text-[13px] text-pureWhite/60 leading-relaxed px-2">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="batch" className="py-24 md:py-32 px-6 lg:px-12 bg-softSilver border-b border-softSilver/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Jadwal Kelas</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navyBlue">Upcoming CFP Batches</h2>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { batch: "Batch 42", startDate: "10 September 2026", duration: "10 Minggu", type: "Online Live (Zoom)", price: 8500000, status: "Open" },
              { batch: "Batch 43", startDate: "15 November 2026", duration: "10 Minggu", type: "Online Live (Zoom)", price: 8500000, status: "Early Bird" }
            ].map((cls, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="bg-pureWhite p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between border border-navyBlue/5 hover:border-goldAccent/30 hover:shadow-xl transition-all duration-300 gap-6"
              >
                <div className="flex-grow text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className="font-serif text-2xl text-navyBlue font-bold">{cls.batch}</h3>
                    <span className="bg-goldAccent/10 text-goldAccent text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{cls.status}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm text-navyBlue/70">
                    <span className="flex items-center gap-1.5"><HiOutlineCalendar className="w-4 h-4 text-navyBlue/50" /> Mulai {cls.startDate}</span>
                    <span className="flex items-center gap-1.5"><HiOutlineClock className="w-4 h-4 text-navyBlue/50" /> {cls.duration}</span>
                    <span className="flex items-center gap-1.5"><HiOutlineBriefcase className="w-4 h-4 text-navyBlue/50" /> {cls.type}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-softSilver pt-6 md:pt-0 md:pl-6">
                  <span className="font-bold text-xl text-navyBlue">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(cls.price)}
                  </span>
                  <Link href={`/layanan/seminar/cfp-${cls.batch.toLowerCase().replace(' ', '-')}`} className="w-full text-center text-xs font-bold text-pureWhite bg-navyBlue px-8 py-3.5 rounded-lg hover:bg-goldAccent hover:text-navyBlue transition-colors">
                    Lihat Detail & Daftar
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-pureWhite text-center px-6 lg:px-12 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-navyBlue mb-8 leading-tight">
            Ready to take the next step <br /><span className="italic text-goldAccent">in your career?</span>
          </h2>
          <p className="text-base text-navyBlue/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Daftarkan diri Anda sekarang dan dapatkan akses instan ke LMS (Learning Management System) kami setelah pembayaran berhasil dikonfirmasi.
          </p>
          <Link
            href="#batch"
            className="group inline-flex justify-center items-center gap-3 px-10 py-5 bg-navyBlue text-pureWhite font-bold rounded-pill hover:bg-goldAccent hover:text-navyBlue transition-all duration-300 text-sm tracking-wide shadow-xl hover:-translate-y-1"
          >
            Pilih Batch Sekarang
            <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}