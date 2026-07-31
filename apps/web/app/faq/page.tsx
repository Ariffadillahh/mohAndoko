'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePlus, HiOutlineMinus, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import Link from 'next/link';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-navyBlue/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`font-serif text-lg md:text-xl transition-colors ${isOpen ? 'text-goldAccent' : 'text-navyBlue group-hover:text-goldAccent'}`}>
          {question}
        </span>
        <div className={`ml-4 shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-goldAccent text-pureWhite' : 'bg-softSilver text-navyBlue group-hover:bg-goldAccent/10'}`}>
          {isOpen ? <HiOutlineMinus className="w-5 h-5" /> : <HiOutlinePlus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[15px] text-navyBlue/70 leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const faqData = [
    {
      category: "Umum & Layanan",
      qas: [
        { q: "Apa itu Cerdas Keuangan?", a: "Cerdas Keuangan adalah konsultan dan lembaga edukasi yang berfokus pada Perencanaan Keuangan (Financial Planning) dan Wealth Management. Kami membantu individu maupun korporasi melalui sesi konsultasi, training, dan mentoring." },
        { q: "Siapa saja yang bisa menggunakan layanan ini?", a: "Layanan kami terbuka untuk semua kalangan, mulai dari individu, keluarga, profesional, hingga perusahaan dan institusi yang ingin meningkatkan financial wellness karyawannya." },
        { q: "Bagaimana cara menjadwalkan konsultasi (One-on-One)?", a: "Anda dapat menghubungi kami melalui halaman Kontak atau klik tombol 'Sign In' untuk membuat akun dan menjadwalkan sesi langsung dengan tim perencana keuangan kami." }
      ]
    },
    {
      category: "Korporasi & Training",
      qas: [
        { q: "Apakah program Corporate Training bisa disesuaikan (custom)?", a: "Tentu. Kami merancang materi pelatihan sesuai dengan profil karyawan, industri perusahaan Anda, serta tantangan finansial spesifik yang sedang dihadapi." },
        { q: "Di mana pelatihan atau seminar dilakukan?", a: "Kami menyediakan fleksibilitas pelaksanaan. Program dapat dilakukan secara On-Site (di kantor Anda), Online (via Zoom/Webinar), maupun format Hybrid." }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-pureWhite">
      
      {/* HEADER */}
      <section className="bg-navyBlue pt-32 pb-24 text-pureWhite relative overflow-hidden">
        <div className="absolute -left-32 top-0 w-96 h-96 bg-goldAccent/10 blur-[100px] rounded-full"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-14 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-4 block">Bantuan & Informasi</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6">
              Frequently Asked <span className="italic text-goldAccent">Questions</span>
            </h1>
            <p className="text-[15px] md:text-lg font-light text-pureWhite/70">
              Punya pertanyaan seputar layanan kami? Temukan jawabannya di bawah ini.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ ACCORDION LIST */}
      <section className="py-20 md:py-28 px-6 lg:px-14">
        <div className="max-w-4xl mx-auto">
          {faqData.map((section, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-goldAccent mb-6 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-goldAccent"></div>
                {section.category}
              </h2>
              <div className="bg-softSilver/30 p-2 md:p-8 rounded-3xl">
                {section.qas.map((faq, faqIdx) => (
                  <FAQItem key={faqIdx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-softSilver px-6 lg:px-14 text-center">
        <div className="max-w-2xl mx-auto">
          <HiOutlineChatBubbleLeftRight className="w-12 h-12 text-navyBlue mx-auto mb-6 opacity-80" />
          <h3 className="font-serif text-2xl md:text-3xl text-navyBlue mb-4">Masih Punya Pertanyaan Lain?</h3>
          <p className="text-sm text-navyBlue/70 mb-8">
            Tim kami siap membantu Anda. Jangan ragu untuk menghubungi kami untuk diskusi lebih lanjut.
          </p>
          <Link href="/kontak" className="inline-block px-8 py-3.5 bg-navyBlue text-pureWhite font-bold rounded-pill hover:bg-goldAccent hover:text-navyBlue transition-colors text-sm tracking-wide shadow-lg">
            Hubungi Tim Kami
          </Link>
        </div>
      </section>

    </div>
  );
}