'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    HiOutlineUser,
    HiOutlineLockClosed,
    HiOutlineUsers,
    HiOutlinePhoto,
    HiOutlinePlus,
    HiOutlineTrash,
    HiOutlineShieldCheck
} from 'react-icons/hi2';
import AdminLayout from '../../../components/layout/AdminLayout'; // Sesuaikan path
import Modal from '../../../components/layout/Modal';

// =========================================================================
// MOCK DATA: SIMULASI SESI LOGIN SAAT INI
// =========================================================================
const loggedInUser = {
    id: 1,
    name: "Arif Fadillah Wicaksono",
    email: "tik24@stu.pnj.ac.id",
    role: "superadmin", // Ubah ke "admin" untuk melihat efek tab Kelola Akun menghilang
    avatar: null
};

// Mock Data: Daftar User untuk di-manage oleh Superadmin
const initialUsersList = [
    { id: 1, name: "Arif Fadillah Wicaksono", email: "tik24@stu.pnj.ac.id", role: "superadmin" },
    { id: 2, name: "Feyas", email: "feyas@cerdaskeuangan.id", role: "admin" },
    { id: 3, name: "Andoko Duta", email: "andoko@cerdaskeuangan.id", role: "admin" }
];

export default function SettingsPage() {
    // State Tab Aktif
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'users'>('profile');

    // State Profil
    const [name, setName] = useState(loggedInUser.name);
    const [email, setEmail] = useState(loggedInUser.email);

    // State Keamanan (Password)
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // State Manajemen User (Khusus Superadmin)
    const [users, setUsers] = useState(initialUsersList);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "admin" });

    // Daftar Tab Dinamis berdasarkan Role
    const tabs = [
        { id: 'profile', label: 'Profil Saya', icon: HiOutlineUser },
        { id: 'security', label: 'Keamanan', icon: HiOutlineLockClosed },
        // Tab Kelola Akun HANYA dimasukkan jika role === superadmin
        ...(loggedInUser.role === 'superadmin' ? [{ id: 'users', label: 'Kelola Akun', icon: HiOutlineUsers }] : [])
    ] as const;

    // --- HANDLER SUBMIT PROFIL ---
    const handleUpdateProfile = (e: FormEvent) => {
        e.preventDefault();
        alert("Profil berhasil diperbarui!");
    };

    // --- HANDLER SUBMIT PASSWORD ---
    const handleUpdatePassword = (e: FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Password baru dan konfirmasi password tidak cocok!");
            return;
        }
        alert("Password berhasil diubah!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    // --- HANDLER MANAJEMEN USER ---
    const handleAddUser = (e: FormEvent) => {
        e.preventDefault();
        const createdUser = {
            id: Date.now(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };
        setUsers([...users, createdUser]);
        setIsAddUserModalOpen(false);
        setNewUser({ name: "", email: "", password: "", role: "admin" });
        alert(`Akun ${newUser.role} berhasil dibuat!`);
    };

    const handleDeleteUser = (id: number) => {
        if (id === loggedInUser.id) {
            alert("Anda tidak bisa menghapus akun Anda sendiri!");
            return;
        }
        if (confirm("Yakin ingin menghapus akun ini?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    // Style Input Global
    const inputStyle = "w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-goldAccent focus:ring-2 focus:ring-goldAccent/20 rounded-xl text-sm outline-none transition-all text-navyBlue font-medium";

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-0">

                <div>
                    <h1 className="font-serif text-3xl text-navyBlue font-medium mb-1">Pengaturan</h1>
                    <p className="text-sm text-slate-500">Kelola preferensi akun, keamanan, dan akses administrator.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as 'profile' | 'security' | 'users')}
                                    className={`flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl transition-all font-medium text-sm text-left ${isActive
                                        ? "bg-navyBlue text-white shadow-md"
                                        : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-navyBlue"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? "text-goldAccent" : "text-slate-400"}`} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* ================= KONTEN TABS ================= */}
                    <div className="flex-1 w-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">

                        {/* TAB 1: PROFIL SAYA */}
                        {activeTab === 'profile' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8">
                                <h2 className="text-xl font-bold text-navyBlue font-serif border-b border-slate-100 pb-4 mb-6">Profil Saya</h2>
                                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">

                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden relative group">
                                            {loggedInUser.avatar ? (
                                                <Image src={loggedInUser.avatar} alt="Avatar" fill className="object-cover" />
                                            ) : (
                                                <HiOutlineUser className="w-8 h-8" />
                                            )}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                <HiOutlinePhoto className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-navyBlue mb-1">Foto Profil</h3>
                                            <p className="text-xs text-slate-500 mb-3">Disarankan rasio 1:1, Maksimal 2MB.</p>
                                            <button type="button" className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors">
                                                Ubah Foto
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-navyBlue">Nama Lengkap</label>
                                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputStyle} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-navyBlue">Alamat Email</label>
                                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle} />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button type="submit" className="px-8 py-3 bg-navyBlue text-white font-medium rounded-xl hover:bg-goldAccent hover:text-navyBlue transition-all shadow-md text-sm">
                                            Simpan Profil
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* TAB 2: KEAMANAN (PASSWORD) */}
                        {activeTab === 'security' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8">
                                <h2 className="text-xl font-bold text-navyBlue font-serif border-b border-slate-100 pb-4 mb-6">Keamanan Akun</h2>
                                <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-md">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-navyBlue">Password Saat Ini</label>
                                        <input type="password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={inputStyle} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-navyBlue">Password Baru</label>
                                        <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputStyle} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-navyBlue">Konfirmasi Password Baru</label>
                                        <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputStyle} />
                                    </div>

                                    <div className="pt-4">
                                        <button type="submit" className="px-8 py-3 bg-navyBlue text-white font-medium rounded-xl hover:bg-goldAccent hover:text-navyBlue transition-all shadow-md text-sm">
                                            Perbarui Password
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* TAB 3: KELOLA AKUN (HANYA SUPERADMIN) */}
                        {activeTab === 'users' && loggedInUser.role === 'superadmin' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-navyBlue font-serif">Kelola Akun Admin</h2>
                                        <p className="text-xs text-slate-500 mt-1">Tambah atau hapus akses administrator sistem.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsAddUserModalOpen(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-navyBlue text-white rounded-xl hover:bg-goldAccent hover:text-navyBlue transition-all text-sm font-medium shadow-sm"
                                    >
                                        <HiOutlinePlus className="w-4 h-4" /> Tambah Akun
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                                                <th className="px-4 py-3 font-semibold rounded-tl-xl">Nama Pengguna</th>
                                                <th className="px-4 py-3 font-semibold">Email</th>
                                                <th className="px-4 py-3 font-semibold">Role / Hak Akses</th>
                                                <th className="px-4 py-3 font-semibold text-right rounded-tr-xl">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {users.map(user => (
                                                <tr key={user.id} className="hover:bg-slate-50/50">
                                                    <td className="px-4 py-4 text-sm font-bold text-navyBlue">{user.name}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-600">{user.email}</td>
                                                    <td className="px-4 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${user.role === 'superadmin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                                            }`}>
                                                            {user.role === 'superadmin' && <HiOutlineShieldCheck className="w-3 h-3" />}
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        {user.id !== loggedInUser.id && (
                                                            <button
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Hapus Akses"
                                                            >
                                                                <HiOutlineTrash className="w-5 h-5" />
                                                            </button>
                                                        )}
                                                        {user.id === loggedInUser.id && (
                                                            <span className="text-xs text-slate-400 italic">Akun Anda</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

            </div>

            <Modal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                title="Tambah Akun Admin"
                maxWidth="max-w-md"
            >
                <form onSubmit={handleAddUser} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-navyBlue">Nama Lengkap</label>
                        <input
                            type="text" required value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            className={inputStyle} placeholder="Masukkan nama..."
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-navyBlue">Email Login</label>
                        <input
                            type="email" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className={inputStyle} placeholder="admin@domain.com"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-navyBlue">Password Sementara</label>
                        <input
                            type="password" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className={inputStyle} placeholder="Buat password sementara..."
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-navyBlue">Hak Akses (Role)</label>
                        <select
                            value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className={inputStyle}
                        >
                            <option value="admin">Admin Biasa</option>
                            <option value="superadmin">Superadmin (Akses Penuh)</option>
                        </select>
                        <p className="text-[10px] text-slate-500 mt-1">Superadmin dapat menambah/menghapus akun admin lainnya.</p>
                    </div>

                    <div className="flex gap-3 pt-4 mt-6 border-t border-slate-100">
                        <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl font-medium hover:bg-slate-100 transition-colors">
                            Batal
                        </button>
                        <button type="submit" className="flex-1 py-3 bg-navyBlue text-white rounded-xl font-medium hover:bg-goldAccent hover:text-navyBlue transition-all shadow-md">
                            Buat Akun
                        </button>
                    </div>
                </form>
            </Modal>

        </AdminLayout>
    );
}