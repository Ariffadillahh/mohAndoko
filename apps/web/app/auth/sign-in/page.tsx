'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineLockClosed, HiArrowRight, HiOutlineSparkles } from 'react-icons/hi2';
import { HiOutlineMail } from 'react-icons/hi';

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-stretch bg-pureWhite overflow-hidden">

            {/* ================= SISI KIRI: BRANDING & VISUAL ================= */}
            <motion.section
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative hidden lg:flex lg:w-1/2 bg-navyBlue text-pureWhite p-16 flex-col justify-between overflow-hidden"
            >
                {/* ORNAMENT: Grid & Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-goldAccent/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-goldAccent/5 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Logo */}
                <Link href="/" className="flex flex-col relative z-10 w-max group leading-none">
                    <span className="font-serif text-xl tracking-wide text-pureWhite">
                        CERDAS <span className="font-bold text-goldAccent group-hover:text-pureWhite transition-colors">KEUANGAN</span>
                    </span>
                    <span className="mt-1 text-[8px] tracking-[0.25em] uppercase font-sans font-semibold text-pureWhite/60">
                        Financial Experience
                    </span>
                </Link>

                {/* Content/Quote with Floating Animation */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="relative z-10 max-w-lg"
                >
                    <HiOutlineSparkles className="w-10 h-10 text-goldAccent mb-6 opacity-80" />
                    <h2 className="font-serif text-4xl lg:text-5xl leading-tight tracking-wide mb-6">
                        Selamat Datang <span className="italic text-goldAccent underline decoration-goldAccent/30 decoration-dashed underline-offset-8">Kembali</span>
                    </h2>
                    <p className="text-base font-light text-pureWhite/70 leading-relaxed">
                        Lanjutkan perjalanan Anda membangun fondasi keuangan yang kuat. Akses portal personal, kalkulator, dan materi edukasi eksklusif kami.
                    </p>
                </motion.div>

                {/* Footer */}
                <p className="relative z-10 text-xs text-pureWhite/40 font-light">
                    © 2026 PT Cerdas Keuangan Indonesia. All rights reserved.
                </p>
            </motion.section>

            {/* ================= SISI KANAN: FORMULIR ================= */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 relative"
            >
                {/* Mobile Logo Only */}
                <div className="lg:hidden mb-12 text-center">
                    <Link href="/" className="flex flex-col group leading-none items-center">
                        <span className="font-serif text-2xl tracking-wide text-navyBlue">
                            CERDAS <span className="font-bold text-goldAccent">KEUANGAN</span>
                        </span>
                        <span className="mt-1.5 text-[9px] tracking-[0.25em] uppercase font-sans font-semibold text-navyBlue/60">
                            Financial Experience
                        </span>
                    </Link>
                </div>

                <div className="max-w-md mx-auto w-full">
                    <h1 className="font-serif text-3xl md:text-4xl text-navyBlue mb-3">Sign In ke Portal Anda</h1>
                    <p className="text-sm text-navyBlue/60 mb-10">Masukkan detail akun Anda untuk melanjutkan.</p>

                    <form className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-navyBlue/80 uppercase tracking-wider mb-2">Alamat Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiOutlineMail className="h-5 w-5 text-navyBlue/30 group-focus-within:text-goldAccent transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="anda@email.com"
                                    className="w-full pl-11 pr-4 py-3 border border-softSilver rounded-lg text-sm text-navyBlue placeholder:text-navyBlue/30 focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-xs font-semibold text-navyBlue/80 uppercase tracking-wider">Password</label>
                                <Link href="#" className="text-xs font-medium text-goldAccent hover:text-navyBlue transition-colors">Lupa Password?</Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiOutlineLockClosed className="h-5 w-5 text-navyBlue/30 group-focus-within:text-goldAccent transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 border border-softSilver rounded-lg text-sm text-navyBlue placeholder:text-navyBlue/30 focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-goldAccent focus:ring-goldAccent border-softSilver rounded" />
                            <label htmlFor="remember-me" className="ml-2.5 block text-sm text-navyBlue/70">Ingat saya di perangkat ini</label>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="group w-full flex justify-center items-center gap-3 px-6 py-3.5 bg-navyBlue text-pureWhite font-bold rounded-lg hover:bg-goldAccent hover:text-navyBlue transition-all duration-300 text-sm tracking-wide shadow-lg hover:scale-[1.02]"
                            >
                                Masuk Portal <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>

                    {/* Redirect to Sign Up */}
                    <div className="mt-12 text-center border-t border-softSilver pt-8">
                        <p className="text-sm text-navyBlue/70">
                            Belum memiliki akun?{' '}
                            <Link href="/auth/sign-up" className="font-semibold text-goldAccent hover:text-navyBlue transition-colors decoration-goldAccent/30 hover:underline">
                                Daftar Gratis Sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.section>

        </div>
    );
}