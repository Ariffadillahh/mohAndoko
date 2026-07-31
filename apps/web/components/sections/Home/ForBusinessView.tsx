'use client';

import Link from "next/link";
import { AmbientGlow } from "../../../app/page"; // Pastikan path import ini sudah benar di proyek Anda
import Image from "next/image";
import { HiArrowLongRight, HiCheck } from "react-icons/hi2";
import { motion } from 'framer-motion';
import { useRef, useState } from "react";

// Data statis bisa diletakkan di luar komponen
const trackRecords = [
    { title: "Brillian Leader Retirement Program", client: "Bank BRI", location: "Malang", img: "/hero-profile.png" },
    { title: "Strategi Pajak Penghasilan Pribadi", client: "Kompas Institute", location: "Jakarta", img: "/hero-profile.png" },
    { title: "Financial Planning for Community", client: "Komunitas", location: "Jakarta", img: "/hero-profile.png" },
    { title: "Wealth Management Masterclass", client: "Bank Mandiri", location: "Bandung", img: "/hero-profile.png" },
    { title: "Employee Financial Wellness", client: "Pertamina", location: "Surabaya", img: "/hero-profile.png" }
];

export function ForBusinessView() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const handleScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

            const maxScrollLeft = scrollWidth - clientWidth;

            if (maxScrollLeft <= 0) {
                setActiveSlide(0);
                return;
            }

            const scrollPercentage = scrollLeft / maxScrollLeft;

            const currentIndex = Math.round(scrollPercentage * (trackRecords.length - 1));

            setActiveSlide(currentIndex);
        }
    };

    const scrollToSlide = (index: number) => {
        if (sliderRef.current) {
            const { scrollWidth, clientWidth } = sliderRef.current;
            const maxScrollLeft = scrollWidth - clientWidth;

            const targetScrollLeft = (maxScrollLeft / (trackRecords.length - 1)) * index;

            sliderRef.current.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth'
            });
            setActiveSlide(index);
        }
    };

    return (
        <>
            <section className="relative bg-navyBlue w-full overflow-hidden text-pureWhite">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1.05fr_0.95fr] min-h-[560px] lg:min-h-[620px] items-stretch lg:pl-5">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative z-10 flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-16 lg:py-0"
                    >
                        <AmbientGlow />
                        <span className="text-bronzeSoft text-[11px] font-mono tracking-[0.25em] uppercase mb-5 block">
                            Corporate Financial Wellness
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.6rem] tracking-tight mb-6 leading-[1.15]">
                            Berdayakan Tim Anda Lewat <span className="italic text-bronzeSoft">Literasi Finansial</span>
                        </h1>
                        <p className="text-[15px] md:text-base font-light text-pureWhite/70 leading-relaxed max-w-lg mb-10">
                            Membantu perusahaan dan organisasi membangun financial wellness melalui edukasi, training, seminar, dan
                            workshop yang relevan dengan kebutuhan karyawan dan organisasi.
                        </p>
                        <div>
                            <Link
                                href="/layanan#corporate"
                                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-goldAccent text-navyBlue font-semibold rounded-pill hover:bg-bronzeSoft transition-colors text-sm tracking-wide"
                            >
                                Lihat Program Kami
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
                            src="/hero-profile.png"
                            alt="Corporate Training & Financial Wellness"
                            fill
                            className="object-cover object-center brightness-[0.85] contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navyBlue/70 via-transparent to-navyBlue/10" />
                    </motion.div>
                </div>
            </section>

            <section className="py-20 md:py-28 border-b border-softSilver px-6 lg:px-14">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Employee Wellbeing</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-navyBlue mb-6">Financial Wellness Is Part of Employee Wellbeing</h2>
                    <p className="text-base md:text-lg text-navyBlue/70 leading-relaxed">
                        Tantangan finansial tidak hanya berdampak pada kehidupan pribadi. Financial stress dapat memengaruhi fokus, produktivitas, dan kesejahteraan karyawan di tempat kerja. Melalui program edukasi dan financial wellness, perusahaan dapat membantu karyawan membangun pemahaman dan kebiasaan keuangan yang lebih sehat.
                    </p>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-softSilver border-b border-navyBlue/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">

                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">
                            Program Korporasi
                        </span>

                        <h2 className="font-serif text-3xl md:text-4xl text-navyBlue">
                            Designed for Your Organization
                        </h2>
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
                                title: "Leadership & Professional Development",
                                desc: "Pengembangan wawasan keuangan dan kepemimpinan untuk mendukung profesionalisme dan pengambilan keputusan."
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

            <section className="py-20 md:py-28 border-b border-softSilver bg-pureWhite">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Kurikulum & Materi</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-navyBlue">Topics We Cover</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            "Personal Financial Management",
                            "Financial Planning",
                            "Investment",
                            "Managing Debt",
                            "Retirement Planning",
                            "Financial Wellness",
                            "Wealth Management",
                            "Financial Mindset"
                        ].map((topic, idx) => (
                            <div key={idx} className="bg-softSilver p-5 rounded-ui flex items-center gap-3 border border-navyBlue/5 hover:border-goldAccent/30 transition-colors">
                                <HiCheck className="w-5 h-5 text-goldAccent shrink-0" />
                                <span className="text-sm font-medium text-navyBlue">{topic}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-softSilver/50 border-b border-softSilver overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Impact in Action</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-navyBlue mb-4">Track Record Kegiatan Kami</h2>
                        <p className="text-sm md:text-base text-navyBlue/70 leading-relaxed">
                            Dipercaya oleh berbagai institusi, BUMN, dan perusahaan terkemuka di Indonesia untuk membangun literasi dan kapabilitas finansial para profesional.
                        </p>
                    </div>

                    {/* SLIDER CONTAINER */}
                    <div
                        ref={sliderRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto gap-6 pb-8 pt-4 px-4 -mx-4 lg:px-0 lg:-mx-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {trackRecords.map((event, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="shrink-0 w-[85vw] md:w-[320px] lg:w-[380px] snap-center group relative bg-pureWhite rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-navyBlue/5 cursor-pointer transition-all duration-300"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-softSilver">
                                    <Image
                                        src={event.img}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navyBlue/90 via-navyBlue/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
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

                    {/* INDIKATOR INTERAKTIF (DOTS) */}
                    <div className="flex items-center justify-center gap-2.5 mt-6">
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

            <section className="py-20 md:py-28 bg-pureWhite">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Metodologi</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-navyBlue">From Awareness to Action</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { num: "01", title: "Understand", desc: "Memahami kebutuhan dan tantangan finansial peserta." },
                            { num: "02", title: "Learn", desc: "Mendapatkan pengetahuan dan wawasan yang relevan." },
                            { num: "03", title: "Apply", desc: "Menerapkan pembelajaran dalam kehidupan nyata." },
                            { num: "04", title: "Grow", desc: "Membangun kebiasaan finansial yang lebih sehat dalam jangka panjang." }
                        ].map((step, idx) => (
                            <div key={idx} className="bg-softSilver/50 p-8 rounded-ui border border-navyBlue/5 shadow-sm">
                                <span className="text-goldAccent font-serif text-2xl font-bold mb-4 block">{step.num}</span>
                                <h3 className="font-serif text-xl text-navyBlue mb-2">{step.title}</h3>
                                <p className="text-sm text-navyBlue/60 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 px-6 lg:px-14 border-t border-softSilver bg-softSilver/30">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="text-goldAccent text-[11px] font-bold tracking-widest uppercase mb-3 block">Fleksibilitas Program</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-navyBlue mb-6">A Program That Fits Your Organization</h2>
                    <p className="text-base text-navyBlue/70 leading-relaxed max-w-2xl mx-auto mb-10">
                        Setiap organisasi memiliki karakteristik dan kebutuhan yang berbeda. Karena itu, kami menyediakan program yang dapat disesuaikan dengan profil peserta, tujuan perusahaan, topik, durasi, dan format pelaksanaan.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <span className="px-6 py-2.5 bg-pureWhite shadow-sm rounded-full text-sm font-semibold text-navyBlue border border-navyBlue/5">On-Site</span>
                        <span className="px-6 py-2.5 bg-pureWhite shadow-sm rounded-full text-sm font-semibold text-navyBlue border border-navyBlue/5">Online</span>
                        <span className="px-6 py-2.5 bg-pureWhite shadow-sm rounded-full text-sm font-semibold text-navyBlue border border-navyBlue/5">Hybrid</span>
                    </div>
                    <Link href="/kontak" className="inline-block px-8 py-4 bg-goldAccent text-navyBlue font-bold rounded-pill hover:bg-navyBlue hover:text-pureWhite transition-colors text-sm tracking-wide shadow-md">
                        Discuss Your Program
                    </Link>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-navyBlue text-pureWhite px-6 lg:px-14 text-center relative overflow-hidden">
                <AmbientGlow />
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
                        Let's Build a <span className="italic text-goldAccent">Financially Stronger Organization</span>
                    </h2>
                    <p className="text-base font-light text-pureWhite/70 leading-relaxed mb-10">
                        Bersama-sama membangun budaya financial wellness melalui edukasi yang relevan dan berdampak.
                    </p>
                    <Link href="/kontak" className="inline-block px-8 py-4 bg-goldAccent text-navyBlue font-bold rounded-pill hover:bg-pureWhite transition-colors text-sm tracking-wide">
                        Talk to Our Team
                    </Link>
                </div>
            </section>
        </>
    );
}