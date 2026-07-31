'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  HiArrowLongRight,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlineVideoCamera,
  HiOutlineCreditCard,
  HiOutlineTicket
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
      className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-goldAccent) 0%, transparent 70%)' }}
    />
  );
}

export default function page() {
  const upcomingPrograms = [
    {
      slug: 'financial-planning-young-professionals',
      title: 'Financial Planning for Young Professionals',
      date: '15 August 2026',
      time: '09.00 – 12.00 WIB',
      location: 'Online via Zoom',
      isOnline: true,
      price: 150000,
      image: '/hero-profile.png' 
    },
    {
      slug: 'investment-101-stock-market',
      title: 'Investment 101: Stock Market for Beginners',
      date: '22 August 2026',
      time: '13.00 – 15.00 WIB',
      location: 'Online via Zoom',
      isOnline: true,
      price: 200000,
      image: '/hero-profile.png'
    },
    {
      slug: 'comprehensive-retirement-planning',
      title: 'Comprehensive Retirement Planning Masterclass',
      date: '10 September 2026',
      time: '09.00 – 15.00 WIB',
      location: 'Hotel Mulia, Jakarta',
      isOnline: false,
      price: 1500000,
      image: '/hero-profile.png'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-pureWhite">

      <section className="relative bg-navyBlue w-full min-h-[60vh] flex items-center overflow-hidden">
        <AmbientGlow />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10 pt-32 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-goldAccent/30 bg-goldAccent/5 text-goldAccent text-xs font-semibold tracking-widest uppercase mb-8">
              Cerdas Keuangan Academy
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-tight text-pureWhite">
              Learn. Grow. Take Control of Your <span className="italic text-goldAccent">Financial Future.</span>
            </h1>
            <p className="text-base font-light text-pureWhite/70 leading-relaxed mb-10">
              Tingkatkan literasi finansial Anda melalui sesi eksklusif bersama para pakar. Pilih kelas yang sesuai dengan kebutuhan Anda dan mulai langkah pertama menuju kebebasan finansial.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-softSilver relative border-b border-softSilver/50">
        <div className="max-w-7xl px-6 lg:px-12 mx-auto">
          <div className="flex items-center justify-between mb-12 border-b-2 border-navyBlue/10 pb-4">
            <h2 className="font-serif text-2xl md:text-3xl text-navyBlue flex items-center gap-3">
              <div className="w-8 h-1 bg-goldAccent"></div> Upcoming Programs
            </h2>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingPrograms.map((program, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-pureWhite rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-navyBlue/5 hover:border-goldAccent/40 transition-all duration-300 group flex flex-col h-full">
                <div className="relative aspect-video w-full bg-softSilver overflow-hidden">
                  <Image src={program.image} alt={program.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-pureWhite/90 backdrop-blur-sm text-navyBlue text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    {program.isOnline ? <HiOutlineVideoCamera className="w-3.5 h-3.5 text-goldAccent" /> : <HiOutlineMapPin className="w-3.5 h-3.5 text-goldAccent" />}
                    {program.isOnline ? 'Online Class' : 'Offline Event'}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-navyBlue leading-snug mb-5 group-hover:text-goldAccent transition-colors line-clamp-2">
                      {program.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-navyBlue/70">
                        <HiOutlineCalendar className="w-5 h-5 text-navyBlue/40" />
                        <span>{program.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-navyBlue/70">
                        <HiOutlineClock className="w-5 h-5 text-navyBlue/40" />
                        <span>{program.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-navyBlue/70">
                        <HiOutlineMapPin className="w-5 h-5 text-navyBlue/40" />
                        <span>{program.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-softSilver flex items-center justify-between">
                    <span className="font-bold text-lg text-navyBlue">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(program.price)}
                    </span>
                    <Link href={`/layanan/seminar/${program.slug}`} className="text-xs font-bold text-pureWhite bg-navyBlue px-4 py-2.5 rounded-lg group-hover:bg-goldAccent group-hover:text-navyBlue transition-colors flex items-center gap-2">
                      View Details <HiArrowLongRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 lg:px-12 bg-pureWhite text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-navyBlue mb-16">Seamless Registration Flow</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-navyBlue/60">
            <div className="flex flex-col items-center gap-2"><HiOutlineCalendar className="w-8 h-8 text-goldAccent" /> <span className="text-xs font-bold uppercase">Pilih Kelas</span></div>
            <HiArrowLongRight className="hidden md:block w-6 h-6" />
            <div className="flex flex-col items-center gap-2"><HiOutlineCreditCard className="w-8 h-8 text-goldAccent" /> <span className="text-xs font-bold uppercase">Payment Gateway</span></div>
            <HiArrowLongRight className="hidden md:block w-6 h-6" />
            <div className="flex flex-col items-center gap-2"><HiOutlineTicket className="w-8 h-8 text-goldAccent" /> <span className="text-xs font-bold uppercase">Dapat E-Tiket</span></div>
          </div>
        </div>
      </section>

    </div>
  );
}