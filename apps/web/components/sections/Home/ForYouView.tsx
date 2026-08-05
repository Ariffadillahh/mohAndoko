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
} from 'react-icons/hi2';
import { AmbientGlow } from '../../../app/page';

export function ForYouView() {
  return (
    <>
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

      {/* SECTION BARU: KALKULATOR CERDAS */}
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
              { title: "Time Value of Money", icon: HiOutlineCalculator },
              { title: "Financial Checkup", icon: HiOutlineClipboardDocumentCheck },
              { title: "Dana Investasi", icon: HiOutlineArrowTrendingUp },
              { title: "Dana Pendidikan", icon: HiOutlineAcademicCap },
              { title: "Dana Pensiun", icon: HiOutlineBuildingOffice2 }
            ].map((calc, idx) => {
              const Icon = calc.icon;
              return (
                <Link href="/auth/sign-in" key={idx}>
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

      <section className="py-20 md:py-28 border-b border-softSilver bg-softSilver/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Layanan Kami</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navyBlue">How We Can Help You</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Financial Planning", desc: "Membantu Anda memahami kondisi keuangan dan menyusun strategi untuk mencapai tujuan finansial secara lebih terarah.", link: '/layanan/financial-planning' },
              { title: "One on One Coaching", desc: "Pendampingan personal untuk membantu Anda membangun kebiasaan dan pola pikir finansial yang lebih sehat.", link: '/layanan/coaching' },
              { title: "Financial Education", desc: "Membekali Anda dengan pemahaman dan pengetahuan untuk membuat keputusan keuangan yang lebih bijak.", link: '/layanan/financial-planning' }
            ].map((serv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-pureWhite p-8 rounded-ui flex flex-col justify-between shadow-sm border border-navyBlue/5"
              >
                <div>
                  <h3 className="font-serif text-2xl text-navyBlue mb-4">{serv.title}</h3>
                  <p className="text-sm text-navyBlue/70 leading-relaxed mb-6">{serv.desc}</p>
                </div>
                <Link href={serv.link} className="text-xs font-bold text-navyBlue hover:text-goldAccent flex items-center gap-2 uppercase tracking-wider">
                  Pelajari Layanan <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-navyBlue text-pureWhite px-6 lg:px-14 text-center relative overflow-hidden">
        <AmbientGlow />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
            Financial Confidence <span className="italic text-goldAccent">Starts With Understanding</span>
          </h2>
          <p className="text-base md:text-lg font-light text-pureWhite/70 leading-relaxed mb-10">
            Keputusan finansial yang baik tidak hanya membutuhkan angka, tetapi juga pemahaman. Kami percaya bahwa edukasi dan perencanaan yang tepat dapat membantu Anda mengambil keputusan dengan lebih percaya diri.
          </p>
          <Link href="/layanan" className="inline-block px-8 py-4 bg-goldAccent text-navyBlue font-bold rounded-pill hover:bg-pureWhite transition-colors text-sm tracking-wide">
            Explore Our Services
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 lg:px-14 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-navyBlue mb-6">Your Future Deserves a Plan</h2>
          <p className="text-base text-navyBlue/70 leading-relaxed mb-8">
            Mulai pahami kondisi finansial Anda dan susun langkah yang lebih terarah untuk masa depan.
          </p>
          <Link href="/kontak" className="inline-block px-8 py-4 bg-navyBlue text-pureWhite font-bold rounded-pill hover:bg-goldAccent hover:text-navyBlue transition-colors text-sm tracking-wide">
            Start Your Journey
          </Link>
        </div>
      </section>
    </>
  );
}