'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineScale,
  HiOutlineHeart,
  HiOutlineBriefcase,
  HiArrowLongRight,
  HiOutlineCalculator,
  HiOutlineClipboardDocumentCheck,
  HiOutlineArrowTrendingUp,
  HiOutlineBuildingOffice2,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';
import { useRef, useState } from 'react';

export function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-goldAccent) 0%, transparent 70%)' }}
    />
  );
}

const trackRecords = [
  { title: "Brillian Leader Retirement Program", client: "Bank BRI", location: "Malang", img: "/images/andoko/img-3.webp" },
  { title: "Strategi Pajak Penghasilan Pribadi", client: "Kompas Institute", location: "Jakarta", img: "/images/andoko/img-3.webp" },
  { title: "Financial Planning for Community", client: "Komunitas", location: "Jakarta", img: "/images/andoko/img-3.webp" },
  { title: "Wealth Management Masterclass", client: "Bank Mandiri", location: "Bandung", img: "/images/andoko/img-3.webp" },
  { title: "Employee Financial Wellness", client: "Pertamina", location: "Surabaya", img: "/images/andoko/img-3.webp" },
  { title: "Employee Financial Wellness", client: "Pertamina", location: "Surabaya", img: "/images/andoko/img-3.webp" },
];

export default function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;

    if (scrollLeft <= 5) {
      setActiveSlide(0);
      return;
    }

    if (Math.abs(scrollLeft - maxScrollLeft) <= 5) {
      setActiveSlide(trackRecords.length - 1);
      return;
    }

    const firstChild = container.children[0] as HTMLElement;
    if (firstChild) {
      const cardWidth = firstChild.offsetWidth + 24;
      const currentIndex = Math.round(scrollLeft / cardWidth);
      setActiveSlide(currentIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;

    const firstChild = container.children[0] as HTMLElement;
    if (!firstChild) return;

    const cardWidth = firstChild.offsetWidth + 24;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    const container = sliderRef.current;
    if (!container) return;
    const firstChild = container.children[0] as HTMLElement;
    if (!firstChild) return;

    const cardWidth = firstChild.offsetWidth + 24;
    container.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    const container = sliderRef.current;
    if (!container) return;
    const firstChild = container.children[0] as HTMLElement;
    if (!firstChild) return;

    const cardWidth = firstChild.offsetWidth + 24;
    container.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-pureWhite">
      <section className="relative bg-navyBlue w-full overflow-hidden text-pureWhite">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1.05fr_0.95fr] min-h-[560px] lg:min-h-[620px] items-stretch lg:pl-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0"
          >
            <AmbientGlow />
            <span className="text-bronzeSoft text-[11px] font-mono tracking-[0.25em] uppercase mb-5 block">
              Financial Planning · Est. Clarity
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.6rem] tracking-tight mb-6 leading-[1.15]">
              Susun Masa Depan <span className="italic text-bronzeSoft">Finansial Anda</span>
            </h1>
            <p className="text-[15px] md:text-base font-light text-pureWhite/70 leading-relaxed max-w-lg mb-10">
              Membangun kehidupan finansial yang lebih terencana dimulai dengan memahami kondisi keuangan Anda hari
              ini. Cerdas Keuangan membantu Anda menyusun strategi, membangun kebiasaan finansial yang sehat, dan
              merencanakan masa depan sesuai dengan tujuan hidup Anda.
            </p>
            <div>
              <Link
                href="/kontak"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-goldAccent text-navyBlue font-semibold rounded-pill hover:bg-bronzeSoft transition-colors text-sm tracking-wide"
              >
                Mulai Perjalanan Anda
                <HiArrowLongRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative min-h-[340px] md:min-h-[420px] lg:min-h-full w-full lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]"
          >
            <Image
              src="/images/andoko/img-3.webp"
              alt="Mohamad Andoko - Financial Planning"
              fill
              className="object-cover object-center brightness-[0.85] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navyBlue/70 via-transparent to-navyBlue/10" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-b border-softSilver">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          >
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Pendekatan Personal</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navyBlue mb-4">Your Financial Journey Is Unique</h2>
            <p className="text-sm md:text-base text-navyBlue/70 leading-relaxed">
              Setiap orang memiliki perjalanan finansial yang berbeda. Penghasilan, kebutuhan, tanggung jawab, dan tujuan hidup Anda tidak sama dengan orang lain. Karena itu, pendekatan terhadap keuangan juga perlu disesuaikan dengan kondisi dan prioritas Anda.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Understand", desc: "Memahami kondisi keuangan Anda saat ini secara komprehensif." },
              { step: "02", title: "Plan", desc: "Menentukan tujuan finansial yang ingin dicapai secara terukur." },
              { step: "03", title: "Act", desc: "Mengambil langkah nyata berdasarkan strategi yang telah disusun." },
              { step: "04", title: "Review", desc: "Mengevaluasi dan menyesuaikan rencana sesuai perubahan hidup." }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-softSilver p-8 rounded-ui flex flex-col justify-between border border-navyBlue/5 hover:border-goldAccent/30 transition-colors"
              >
                <div>
                  <span className="text-goldAccent font-serif text-2xl font-bold mb-4 block">{card.step}</span>
                  <h3 className="font-serif text-xl text-navyBlue mb-2">{card.title}</h3>
                  <p className="text-sm text-navyBlue/60 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-softSilver border-b border-navyBlue/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Fokus Perencanaan</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navyBlue">What Are You Planning For?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Financial Freedom", desc: "Membangun fondasi keuangan untuk mencapai kebebasan finansial.", icon: HiOutlineChartBar },
              { title: "Family & Future", desc: "Mempersiapkan kebutuhan keluarga dan masa depan orang-orang yang Anda cintai.", icon: HiOutlineHeart },
              { title: "Investment & Wealth", desc: "Mengelola dan mengembangkan aset secara terencana.", icon: HiOutlineBriefcase },
              { title: "Retirement", desc: "Mempersiapkan kehidupan yang nyaman setelah masa produktif.", icon: HiOutlineShieldCheck },
              { title: "Education", desc: "Merencanakan kebutuhan pendidikan anak dan keluarga.", icon: HiOutlineAcademicCap },
              { title: "Protection", desc: "Mempersiapkan perlindungan dari risiko finansial yang tidak terduga.", icon: HiOutlineScale }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-pureWhite p-8 rounded-ui border border-navyBlue/5 hover:border-goldAccent/50 transition-colors shadow-sm"
                >
                  <IconComponent className="w-8 h-8 text-goldAccent mb-4" />
                  <h3 className="font-serif text-xl text-navyBlue mb-2">{item.title}</h3>
                  <p className="text-sm text-navyBlue/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-pureWhite border-b border-softSilver">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Alat Finansial Terpadu</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navyBlue mb-4">Kalkulator Cerdas</h2>
            <p className="text-sm md:text-base text-navyBlue/70 leading-relaxed">
              Simulasikan tujuan keuangan Anda dengan mudah. Hitung kebutuhan dana masa depan Anda melalui perangkat kalkulator eksklusif kami.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { title: "Time Value of Money", icon: HiOutlineCalculator, link: "/kalkulator/time-value-of-money" },
              { title: "Financial Checkup", icon: HiOutlineClipboardDocumentCheck, link: "/kalkulator/financial-checkup" },
              { title: "Dana Investasi", icon: HiOutlineArrowTrendingUp, link: "/kalkulator/dana-investasi" },
              { title: "Dana Pendidikan", icon: HiOutlineAcademicCap, link: "/kalkulator/dana-pendidikan" },
              { title: "Dana Pensiun", icon: HiOutlineBuildingOffice2, link: "/kalkulator/dana-pensiun" }
            ].map((calc, idx) => {
              const Icon = calc.icon;
              return (
                <Link href={calc.link} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="group bg-softSilver/50 p-6 rounded-2xl flex flex-col items-center text-center border border-transparent hover:border-goldAccent/40 hover:bg-pureWhite hover:shadow-xl transition-all duration-300 h-full cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full bg-pureWhite flex items-center justify-center mb-4 text-navyBlue group-hover:text-goldAccent group-hover:scale-110 transition-all shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-[15px] text-navyBlue leading-snug">{calc.title}</h3>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="corporate" className="relative w-full overflow-hidden text-pureWhite bg-gradient-to-br from-navyBlue via-[#0f1f38] to-navyBlue">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1.05fr_0.95fr] min-h-[500px] items-stretch lg:pl-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-16 lg:py-0"
          >
            <AmbientGlow />
            <span className="text-bronzeSoft text-[11px] font-mono tracking-[0.25em] uppercase mb-5 block">
              Corporate Financial Wellness
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6 leading-tight">
              Berdayakan Tim Anda Lewat <span className="italic text-bronzeSoft">Literasi Finansial</span>
            </h2>
            <p className="text-[15px] md:text-base font-light text-pureWhite/70 leading-relaxed max-w-lg mb-10">
              Membantu perusahaan dan organisasi membangun financial wellness melalui edukasi, training, seminar, dan
              workshop yang relevan dengan kebutuhan karyawan dan organisasi.
            </p>
            <div>
              <Link
                href="/layanan"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-goldAccent text-navyBlue font-semibold rounded-pill hover:bg-bronzeSoft transition-colors text-sm tracking-wide shadow-lg hover:shadow-goldAccent/20"
              >
                Lihat Program Kami
                <HiArrowLongRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative min-h-[340px] md:min-h-[420px] lg:min-h-full w-full lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]"
          >
            <Image
              src="/images/andoko/img-2.webp"
              alt="Corporate Training & Financial Wellness"
              fill
              className="object-cover object-center brightness-[0.85] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navyBlue/90 via-navyBlue/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-navyBlue via-navyBlue/30 to-transparent lg:from-navyBlue/90" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-softSilver border-b border-navyBlue/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">
              Program Korporasi
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-navyBlue mb-4">
              Designed for Your Organization
            </h2>
            <p className="text-sm md:text-base text-navyBlue/70 leading-relaxed">
              Tantangan finansial tidak hanya berdampak pada kehidupan pribadi. Melalui program edukasi dan financial wellness, perusahaan dapat membantu karyawan membangun kebiasaan keuangan yang lebih sehat, meningkatkan produktivitas, dan kesejahteraan di tempat kerja.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Corporate Training",
                desc: "Program pelatihan keuangan yang dirancang untuk meningkatkan pemahaman finansial karyawan."
              },
              {
                title: "Seminar & Workshop",
                desc: "Sesi edukasi interaktif yang dapat disesuaikan dengan tema dan kebutuhan organisasi."
              },
              {
                title: "Financial Wellness Program",
                desc: "Program yang membantu karyawan memahami dan mengelola aspek keuangan dalam kehidupan mereka."
              },
              {
                title: "Leadership & Professional Dev",
                desc: "Pengembangan wawasan keuangan dan kepemimpinan untuk mendukung profesionalisme."
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-pureWhite p-8 rounded-ui border border-navyBlue/5 shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="font-serif text-2xl text-navyBlue mb-3">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-navyBlue/60 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION: TRACK RECORD (ANTI NYANGKUT) ================= */}
      <section className="py-20 md:py-28 bg-softSilver/50 border-b border-softSilver overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Impact in Action</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navyBlue mb-4">Track Record Kegiatan</h2>
            <p className="text-sm md:text-base text-navyBlue/70 leading-relaxed">
              Dipercaya oleh berbagai institusi, BUMN, dan perusahaan terkemuka di Indonesia untuk membangun literasi dan kapabilitas finansial para profesional.
            </p>
          </div>

          <div className="relative group">
            {/* PANAH KIRI */}
            <button
              onClick={handlePrev}
              disabled={activeSlide === 0}
              aria-label="Previous Slide"
              className={`absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-pureWhite shadow-xl border border-navyBlue/10 transition-all duration-300 ${activeSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-goldAccent hover:text-navyBlue text-navyBlue/70 hover:scale-105'}`}
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>

            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-6 py-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {trackRecords.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="shrink-0 w-[85vw] md:w-[320px] lg:w-[380px] snap-start relative bg-pureWhite rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-navyBlue/5 cursor-pointer transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-softSilver">
                    <Image
                      src={event.img}
                      alt={event.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navyBlue/90 via-navyBlue/20 to-transparent opacity-80 hover:opacity-90 transition-opacity duration-300" />
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                    <span className="text-goldAccent text-[10px] font-bold tracking-widest uppercase mb-2 block">
                      {event.client} · {event.location}
                    </span>
                    <h3 className="font-serif text-lg lg:text-xl text-pureWhite leading-snug">
                      {event.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PANAH KANAN */}
            <button
              onClick={handleNext}
              disabled={activeSlide === trackRecords.length - 1}
              aria-label="Next Slide"
              className={`absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-pureWhite shadow-xl border border-navyBlue/10 transition-all duration-300 ${activeSlide === trackRecords.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-goldAccent hover:text-navyBlue text-navyBlue/70 hover:scale-105'}`}
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2.5 mt-8">
            {trackRecords.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${activeSlide === idx
                  ? 'w-10 bg-goldAccent'
                  : 'w-2.5 bg-navyBlue/20 hover:bg-navyBlue/40'
                  }`}
              />
            ))}
          </div>

        </div>
      </section>

      <section className="py-20 md:py-28 px-6 lg:px-14 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-navyBlue mb-6">Your Future Deserves a Plan</h2>
          <p className="text-base text-navyBlue/70 leading-relaxed mb-8">
            Mulai pahami kondisi finansial Anda hari ini dan susun langkah yang lebih terarah untuk masa depan, baik secara personal maupun bersama organisasi Anda.
          </p>
          <Link href="/kontak" className="inline-block px-8 py-4 bg-navyBlue text-pureWhite font-bold rounded-pill hover:bg-goldAccent hover:text-navyBlue transition-colors text-sm tracking-wide">
            Start Your Journey
          </Link>
        </div>
      </section>

    </div>
  );
}