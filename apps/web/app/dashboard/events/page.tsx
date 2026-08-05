'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    HiOutlinePlus, HiOutlineMagnifyingGlass, HiOutlinePencilSquare,
    HiOutlineTrash, HiOutlineFunnel, HiOutlineExclamationTriangle,
    HiOutlineCalendar, HiOutlineClock, HiOutlineMapPin,
    HiOutlineVideoCamera, HiChevronLeft, HiChevronRight
} from 'react-icons/hi2';
import AdminLayout from '../../../components/layout/AdminLayout';
import Modal from '../../../components/layout/Modal';
import { useGetEvents, useDeleteEvent } from '../../../hooks/useEvent';

export default function EventManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filterType, setFilterType] = useState("Semua");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1); 
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterType, itemsPerPage]);

    const { data: responseData, isLoading, isFetching } = useGetEvents({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch,
        type: filterType
    });

    const events = responseData?.data || [];
    const meta = responseData?.meta || { total: 0, totalPages: 1 };

    const deleteMutation = useDeleteEvent();

    const confirmDelete = (id: string) => {
        setEventToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (eventToDelete) {
            deleteMutation.mutate(eventToDelete, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setEventToDelete(null);
                }
            });
        }
    };

    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
    };

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-0 pb-10">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
                    <div>
                        <h1 className="font-serif text-3xl text-navyBlue font-medium mb-1">Event & Seminar</h1>
                        <p className="text-sm text-navyBlue/60">Kelola jadwal kelas online dan acara offline Anda.</p>
                    </div>
                    <Link href="/dashboard/events/create" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navyBlue text-pureWhite font-medium rounded-xl hover:bg-goldAccent hover:text-navyBlue transition-all duration-300 shadow-md">
                        <HiOutlinePlus className="w-5 h-5" />
                        Tambah Event
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 bg-pureWhite p-4 rounded-2xl shadow-sm border border-navyBlue/5">
                    <div className="relative flex-1">
                        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navyBlue/40" />
                        <input
                            type="text"
                            placeholder="Cari nama event..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-softSilver/50 border border-transparent focus:border-goldAccent focus:bg-pureWhite focus:ring-4 focus:ring-goldAccent/10 rounded-xl text-sm outline-none transition-all text-navyBlue placeholder:text-navyBlue/40"
                        />
                    </div>

                    <div className="relative shrink-0 w-full sm:w-56">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <HiOutlineFunnel className="w-5 h-5 text-navyBlue/40" />
                        </div>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full pl-11 pr-10 py-2.5 bg-softSilver/50 border border-transparent focus:border-navyBlue focus:bg-pureWhite focus:ring-4 focus:ring-navyBlue/10 rounded-xl text-sm outline-none transition-all text-navyBlue appearance-none cursor-pointer font-medium"
                        >
                            <option value="Semua">Semua Tipe Event</option>
                            <option value="Online Class">Online Class</option>
                            <option value="Offline Event">Offline Event</option>
                        </select>
                    </div>
                </div>

                <div className="bg-pureWhite rounded-3xl shadow-sm border border-navyBlue/5 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto relative">
                        {isFetching && !isLoading && (
                            <div className="absolute inset-0 bg-white/50 flex justify-center items-center z-10">
                                <div className="w-6 h-6 border-2 border-goldAccent border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-softSilver/30 text-navyBlue/60 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold w-2/5">Informasi Event</th>
                                    <th className="px-6 py-4 font-semibold">Jadwal & Lokasi</th>
                                    <th className="px-6 py-4 font-semibold">Harga</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-softSilver">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-navyBlue/50 text-sm">
                                            <div className="flex justify-center items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-goldAccent border-t-transparent rounded-full animate-spin"></div>
                                                Memuat data event...
                                            </div>
                                        </td>
                                    </tr>
                                ) : events.length > 0 ? (
                                    events.map((event: any, idx: number) => {
                                        const uiType = event.type === 'ONLINE_CLASS' ? 'Online Class' : 'Offline Event';
                                        const uiStatus = event.status === 'PUBLISHED' ? 'Diterbitkan' : 'Draft';

                                        return (
                                            <motion.tr
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                key={event.id}
                                                className="hover:bg-softSilver/20 transition-colors group"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className={`inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${uiType === 'Online Class' ? 'bg-amber-50 text-goldAccent border-goldAccent/30' : 'bg-navyBlue/5 text-navyBlue border-navyBlue/10'}`}>
                                                            {uiType === 'Online Class' ? <HiOutlineVideoCamera className="w-3 h-3" /> : <HiOutlineMapPin className="w-3 h-3" />}
                                                            {uiType}
                                                        </span>
                                                        <p className="text-sm font-bold text-navyBlue font-serif leading-snug">{event.title}</p>
                                                        <p className="text-xs text-navyBlue/60 line-clamp-2 mt-1 pr-4">{event.description}</p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col gap-2 text-xs text-navyBlue/70 font-medium">
                                                        <div className="flex items-center gap-2"><HiOutlineCalendar className="w-4 h-4 text-navyBlue/40 shrink-0" />{formatDate(event.eventDate)}</div>
                                                        <div className="flex items-center gap-2"><HiOutlineClock className="w-4 h-4 text-navyBlue/40 shrink-0" />{event.eventTime}</div>
                                                        <div className="flex items-center gap-2"><HiOutlineMapPin className="w-4 h-4 text-navyBlue/40 shrink-0" /><span className="truncate max-w-[150px]">{event.location}</span></div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-bold text-navyBlue">{event.price === 0 ? "Gratis" : formatRupiah(event.price)}</p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${uiStatus === 'Diterbitkan' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {uiStatus}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/dashboard/events/edit/${event.id}`} className="p-2 text-navyBlue/40 hover:text-goldAccent hover:bg-goldAccent/10 rounded-lg transition-colors" title="Edit Event">
                                                            <HiOutlinePencilSquare className="w-5 h-5" />
                                                        </Link>
                                                        <button onClick={() => confirmDelete(event.id)} className="p-2 text-navyBlue/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Hapus Event">
                                                            <HiOutlineTrash className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan={5} className="px-6 py-12 text-center text-navyBlue/50 text-sm">Tidak ada event yang ditemukan.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-softSilver bg-softSilver/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-navyBlue/60 font-medium">
                            Tampilkan
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="px-2 py-1 bg-pureWhite border border-navyBlue/10 rounded-lg focus:outline-none focus:border-goldAccent text-navyBlue"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                            </select>
                            data per halaman
                        </div>

                        <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="text-navyBlue/60">
                                Halaman <span className="text-navyBlue font-bold">{currentPage}</span> dari {meta.totalPages}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1 || isLoading}
                                    className="p-2 rounded-lg border border-navyBlue/10 text-navyBlue/60 hover:bg-pureWhite hover:text-navyBlue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <HiChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, meta.totalPages))}
                                    disabled={currentPage === meta.totalPages || isLoading}
                                    className="p-2 rounded-lg border border-navyBlue/10 text-navyBlue/60 hover:bg-pureWhite hover:text-navyBlue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <HiChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} maxWidth="max-w-md">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6 text-red-500">
                        <HiOutlineExclamationTriangle className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl text-navyBlue mb-2">Hapus Event?</h3>
                    <p className="text-sm text-navyBlue/60 mb-8 leading-relaxed">Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.</p>
                    <div className="flex gap-4 w-full">
                        <button onClick={() => setIsDeleteModalOpen(false)} disabled={deleteMutation.isPending} className="flex-1 py-3 px-4 rounded-xl border border-navyBlue/10 text-navyBlue font-medium hover:bg-softSilver transition-colors disabled:opacity-50">Batal</button>
                        <button onClick={handleDelete} disabled={deleteMutation.isPending} className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-pureWhite font-medium hover:bg-red-600 shadow-md shadow-red-500/20 transition-colors flex items-center justify-center disabled:opacity-50">
                            {deleteMutation.isPending ? 'Menghapus...' : 'Ya, Hapus'}
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}