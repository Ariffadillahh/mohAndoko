import Link from 'next/link';
import { BiLogoGmail } from 'react-icons/bi';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-navyBlue text-pureWhite/80 pt-16 pb-8 md:pt-20 md:pb-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 pb-12 border-b border-pureWhite/10">

                    <div className="md:col-span-1 space-y-4">
                        <h3 className="font-serif text-xl font-bold text-pureWhite tracking-wide">
                            <span className="text-goldAccent">Mohamad</span> Andoko
                        </h3>
                        <p className="text-[13px] font-light leading-relaxed text-pureWhite/70 pr-4">
                            Indonesia&apos;s Trusted Financial Planning & Wealth Management Training Consultant. Lebih dari 20 tahun pengalaman mendampingi bank, institusi, dan keluarga Indonesia.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-serif text-[15px] font-medium text-pureWhite tracking-wide">Navigasi</h4>
                        <ul className="space-y-3 text-[13px]">
                            <li><Link href="/about" className="text-pureWhite/70 hover:text-goldAccent transition-colors">Tentang Saya</Link></li>
                            <li><Link href="/profil" className="text-pureWhite/70 hover:text-goldAccent transition-colors">Profil Trainer</Link></li>
                            <li><Link href="/layanan" className="text-pureWhite/70 hover:text-goldAccent transition-colors">Layanan & Program</Link></li>
                            <li><Link href="/blog" className="text-pureWhite/70 hover:text-goldAccent transition-colors">Sumber Belajar (Blog)</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-serif text-[15px] font-medium text-pureWhite tracking-wide">Program</h4>
                        <ul className="space-y-3 text-[13px]">
                            <li><Link href="/mentoring-cfp" className="text-pureWhite/70 hover:text-goldAccent transition-colors">CFP Exam Preparation</Link></li>
                            <li><Link href="/layanan#corporate" className="text-pureWhite/70 hover:text-goldAccent transition-colors">Corporate Training</Link></li>
                            <li><Link href="/layanan#coaching" className="text-pureWhite/70 hover:text-goldAccent transition-colors">One on One Coaching</Link></li>
                            <li><Link href="/layanan#seminar" className="text-pureWhite/70 hover:text-goldAccent transition-colors">Seminar & Workshop</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-serif text-[15px] font-medium text-pureWhite tracking-wide">Hubungi Kami</h4>
                        <p className="text-[13px] text-pureWhite/70 leading-relaxed pr-4">
                            PT Cerdas Keuangan Indonesia<br />
                            Siap mendampingi kebutuhan finansial & pelatihan tim Anda.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-[11px] font-semibold uppercase tracking-widest border border-pureWhite/20 hover:bg-goldAccent hover:border-goldAccent hover:text-navyBlue text-pureWhite px-5 py-2.5 rounded-pill transition-all"
                            >
                                Chat via WhatsApp →
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-pureWhite/40 gap-4 tracking-wide">
                    <p>© {new Date().getFullYear()} PT Cerdas Keuangan Indonesia. All rights reserved.</p>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <Link
                                href="https://www.instagram.com/andokomohamad"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-pureWhite/5 flex items-center justify-center text-pureWhite/70 hover:bg-goldAccent hover:text-navyBlue transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </Link>
                            <Link
                                href="mailto:andoko99@gmail.com"
                                className="w-8 h-8 rounded-full bg-pureWhite/5 flex items-center justify-center text-pureWhite/70 hover:bg-goldAccent hover:text-navyBlue transition-all duration-300"
                                aria-label="Email"
                            >
                                <BiLogoGmail className="w-4 h-4" />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/mohamad-andoko-mm-cfp-qwp-aepp-06883538/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-pureWhite/5 flex items-center justify-center text-pureWhite/70 hover:bg-goldAccent hover:text-navyBlue transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}