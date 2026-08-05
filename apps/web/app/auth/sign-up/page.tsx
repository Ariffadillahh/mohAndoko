'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    HiOutlineLockClosed,
    HiOutlineUser,
    HiArrowRight,
    HiOutlineHeart,
    HiOutlinePhoto
} from 'react-icons/hi2';
import { HiOutlineMail } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRegister } from '../../../hooks/useAuth';


const registerSchema = yup.object().shape({
    name: yup.string().required('Nama lengkap wajib diisi'),
    email: yup.string().email('Format email tidak valid').required('Alamat email wajib diisi'),
    password: yup.string().min(8, 'Password minimal 8 karakter').required('Password wajib diisi'),
    terms: yup.boolean().oneOf([true], 'Anda harus menyetujui Syarat & Ketentuan'),
    avatar: yup.mixed<FileList>()
        .test('fileSize', 'Ukuran file maksimal 2MB', (value) => {
            if (!value || value.length === 0) return true;
            const file = value[0];
            return file ? file.size <= 2 * 1024 * 1024 : true;
        })
        .test('fileType', 'Hanya file gambar (JPG, PNG, WebP)', (value) => {
            if (!value || value.length === 0) return true;
            const file = value[0];
            return file ? ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) : true;
        }),
});

type RegisterFormValues = yup.InferType<typeof registerSchema>;

export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema),
    });

    const { mutate: registerAccount, isPending } = useRegister();

    // 4. Handler Submit
    const onSubmit = (data: RegisterFormValues) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        const avatarFile = data.avatar?.[0];
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        registerAccount(formData);
    };

    return (
        <div className="min-h-screen flex items-stretch bg-pureWhite overflow-hidden">

            <motion.section
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative hidden lg:flex lg:w-1/2 bg-navyBlue text-pureWhite p-16 flex-col justify-between overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-goldAccent/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-goldAccent/5 blur-[80px] rounded-full pointer-events-none"></div>

                <Link href="/" className="flex flex-col relative z-10 w-max group leading-none">
                    <span className="font-serif text-xl tracking-wide text-pureWhite">
                        CERDAS <span className="font-bold text-goldAccent group-hover:text-pureWhite transition-colors">KEUANGAN</span>
                    </span>
                    <span className="mt-1 text-[8px] tracking-[0.25em] uppercase font-sans font-semibold text-pureWhite/60">
                        Financial Experience
                    </span>
                </Link>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    className="relative z-10 max-w-lg"
                >
                    <HiOutlineHeart className="w-11 h-11 text-goldAccent mb-6 opacity-80" />
                    <h2 className="font-serif text-4xl lg:text-5xl leading-tight tracking-wide mb-6">
                        Mulai Langkah <span className="italic text-goldAccent relative">
                            Cerdas
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-goldAccent/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="2" /></svg>
                        </span> Anda
                    </h2>
                    <p className="text-base font-light text-pureWhite/70 leading-relaxed">
                        Bergabunglah dengan komunitas Cerdas Keuangan. Jadilah Perencana Keuangan bagi diri Anda sendiri, pelajari strategi praktis, dan bangun masa depan finansial yang lebih baik.
                    </p>
                </motion.div>

                <p className="relative z-10 text-xs text-pureWhite/40 font-light">
                    © 2026 PT Cerdas Keuangan Indonesia. All rights reserved.
                </p>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 relative overflow-y-auto"
            >
                <div className="lg:hidden mb-12 text-center mt-8">
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
                    <h1 className="font-serif text-3xl md:text-4xl text-navyBlue mb-3">Buat Akun Komunitas</h1>
                    <p className="text-sm text-navyBlue/60 mb-10">Lengkapi detail di bawah untuk mendaftar gratis.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        <div>
                            <label htmlFor="name" className="block text-xs font-semibold text-navyBlue/80 uppercase tracking-wider mb-2">Nama Lengkap</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiOutlineUser className="h-5 w-5 text-navyBlue/30 group-focus-within:text-goldAccent transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Nama lengkap Anda"
                                    {...register('name')}
                                    className={`w-full pl-11 pr-4 py-3 border rounded-lg text-sm text-navyBlue placeholder:text-navyBlue/30 focus:ring-2 focus:ring-goldAccent/20 transition-all outline-none ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-softSilver focus:border-goldAccent'}`}
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-navyBlue/80 uppercase tracking-wider mb-2">Alamat Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiOutlineMail className="h-5 w-5 text-navyBlue/30 group-focus-within:text-goldAccent transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="anda@email.com"
                                    {...register('email')}
                                    className={`w-full pl-11 pr-4 py-3 border rounded-lg text-sm text-navyBlue placeholder:text-navyBlue/30 focus:ring-2 focus:ring-goldAccent/20 transition-all outline-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-softSilver focus:border-goldAccent'}`}
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-semibold text-navyBlue/80 uppercase tracking-wider mb-2">Buat Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiOutlineLockClosed className="h-5 w-5 text-navyBlue/30 group-focus-within:text-goldAccent transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Minimal 8 karakter"
                                    {...register('password')}
                                    className={`w-full pl-11 pr-4 py-3 border rounded-lg text-sm text-navyBlue placeholder:text-navyBlue/30 focus:ring-2 focus:ring-goldAccent/20 transition-all outline-none ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-softSilver focus:border-goldAccent'}`}
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="avatar" className="block text-xs font-semibold text-navyBlue/80 uppercase tracking-wider mb-2">Foto Profil (Opsional)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiOutlinePhoto className="h-5 w-5 text-navyBlue/30 group-focus-within:text-goldAccent transition-colors" />
                                </div>
                                <input
                                    type="file"
                                    id="avatar"
                                    accept="image/jpeg, image/png, image/webp"
                                    {...register('avatar')}
                                    className="w-full pl-11 pr-4 py-2 border border-softSilver rounded-lg text-sm text-navyBlue/70 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-goldAccent/10 file:text-goldAccent hover:file:bg-goldAccent/20 focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent transition-all outline-none"
                                />
                            </div>
                            {errors.avatar && <p className="mt-1 text-xs text-red-500">{errors.avatar.message}</p>}
                        </div>

                        <div>
                            <div className="flex items-start mt-4">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    {...register('terms')}
                                    className="mt-1 h-4 w-4 text-goldAccent focus:ring-goldAccent border-softSilver rounded"
                                />
                                <label htmlFor="terms" className="ml-2.5 block text-xs text-navyBlue/70 leading-relaxed">
                                    Saya menyetujui{' '}
                                    <Link href="#" className="font-semibold text-goldAccent hover:text-navyBlue transition-colors hover:underline">Syarat & Ketentuan</Link>{' '}
                                    serta{' '}
                                    <Link href="#" className="font-semibold text-goldAccent hover:text-navyBlue transition-colors hover:underline">Kebijakan Privasi</Link>{' '}
                                    Cerdas Keuangan.
                                </label>
                            </div>
                            {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms.message}</p>}
                        </div>

                        <div className="pt-3">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="group w-full flex justify-center items-center gap-3 px-6 py-4 bg-goldAccent text-navyBlue font-bold rounded-lg hover:bg-navyBlue hover:text-pureWhite transition-all duration-300 text-sm tracking-wide shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Memproses...' : 'Buat Akun Gratis'}
                                {!isPending && <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 text-center border-t border-softSilver pt-8">
                        <p className="text-sm text-navyBlue/70">
                            Sudah memiliki akun?{' '}
                            <Link href="/auth/sign-in" className="font-semibold text-goldAccent hover:text-navyBlue transition-colors decoration-goldAccent/30 hover:underline">
                                Sign In ke Portal
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.section>

        </div>
    );
}