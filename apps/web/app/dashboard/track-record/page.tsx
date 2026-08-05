'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    HiOutlinePlus, HiOutlineMagnifyingGlass, HiOutlinePencilSquare,
    HiOutlineTrash, HiOutlineExclamationTriangle, HiChevronLeft, HiChevronRight
} from 'react-icons/hi2';
import AdminLayout from '../../../components/layout/AdminLayout';
import TrackRecordFormModal, { TrackRecordData } from '../../../components/ui/TrackRecordFormModal';
import Modal from '../../../components/layout/Modal';

import { useGetTrackRecords, useDeleteTrackRecord } from '../../../hooks/useTrackRecord';

export default function TrackRecordPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<TrackRecordData | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data: responseData, isLoading, isFetching } = useGetTrackRecords({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch
    });

    const records: TrackRecordData[] = responseData?.data || [];
    const meta = responseData?.meta || { total: 0, totalPages: 1 };

    const deleteMutation = useDeleteTrackRecord();

    const handleOpenAdd = () => {
        setSelectedRecord(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (record: TrackRecordData) => {
        setSelectedRecord(record);
        setIsFormOpen(true);
    };

    const confirmDelete = (id: string) => {
        setRecordToDelete(id);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        if (recordToDelete) {
            deleteMutation.mutate(recordToDelete, {
                onSuccess: () => setIsDeleteOpen(false)
            });
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-0 pb-10 pt-4">

                {/* ================= HEADER ================= */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-serif text-3xl text-navyBlue font-medium mb-1">Track Record</h1>
                        <p className="text-sm text-navyBlue/60">Kelola portofolio klien dan program yang pernah dijalankan.</p>
                    </div>
                    <button
                        onClick={handleOpenAdd}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navyBlue text-pureWhite font-medium rounded-xl hover:bg-goldAccent hover:text-navyBlue transition-all duration-300 shadow-md shrink-0"
                    >
                        <HiOutlinePlus className="w-5 h-5" />
                        Tambah Data
                    </button>
                </div>

                {/* ================= TOOLBAR (SEARCH) ================= */}
                <div className="bg-pureWhite p-4 rounded-2xl shadow-sm border border-navyBlue/5">
                    <div className="relative w-full md:max-w-md">
                        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama program atau perusahaan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-goldAccent focus:bg-white focus:ring-2 focus:ring-goldAccent/10 rounded-xl text-sm outline-none transition-all text-navyBlue"
                        />
                    </div>
                </div>

                <div className="bg-pureWhite rounded-3xl shadow-sm border border-navyBlue/5 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto relative">
                        {isFetching && !isLoading && (
                            <div className="absolute inset-0 bg-white/50 flex justify-center items-center z-10">
                                <div className="w-6 h-6 border-2 border-goldAccent border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold w-24">
                                        Gambar
                                    </th>
                                    <th className="px-6 py-4 font-semibold">
                                        Informasi Program
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {records.length > 0 ? (
                                    records.map((record, idx) => {
                                        const imageUrl = record.thumbnailUrl
                                            ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${record.thumbnailUrl}`
                                            : "";
                                        return (
                                            <motion.tr
                                                key={record.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="hover:bg-slate-50/50 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                                        {imageUrl ? (
                                                            <Image
                                                                src={imageUrl}
                                                                alt={record.companyName}
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-[10px] font-bold text-goldAccent tracking-widest uppercase">
                                                            {record.companyName} •{" "}
                                                            {record.location}
                                                        </p>

                                                        <p className="text-base font-bold text-navyBlue font-serif">
                                                            {record.programName}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleOpenEdit(record)
                                                            }
                                                            className="p-2 text-slate-400 hover:text-goldAccent hover:bg-goldAccent/10 rounded-lg transition-colors"
                                                            title="Edit Data"
                                                        >
                                                            <HiOutlinePencilSquare className="w-5 h-5" />
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                confirmDelete(record.id as string)
                                                            }
                                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Hapus Data"
                                                        >
                                                            <HiOutlineTrash className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-12 text-center text-slate-400 text-sm"
                                        >
                                            Tidak ada data yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ================= PAGINATION FOOTER ================= */}
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            Tampilkan
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="px-2 py-1 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-goldAccent text-navyBlue"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                            </select>
                            data
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="text-slate-500">
                                Halaman <span className="text-navyBlue font-bold">{currentPage}</span> dari {meta.totalPages}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1 || isLoading}
                                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:text-navyBlue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <HiChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, meta.totalPages))}
                                    disabled={currentPage === meta.totalPages || isLoading}
                                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:text-navyBlue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <HiChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TrackRecordFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                initialData={selectedRecord}
            />

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} maxWidth="max-w-md">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6 text-red-500">
                        <HiOutlineExclamationTriangle className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl text-navyBlue mb-2">Hapus Data?</h3>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                        Data track record yang dihapus tidak dapat dikembalikan.
                    </p>
                    <div className="flex gap-4 w-full">
                        <button onClick={() => setIsDeleteOpen(false)} disabled={deleteMutation.isPending} className="flex-1 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 font-medium disabled:opacity-50">
                            Batal
                        </button>
                        <button onClick={handleDelete} disabled={deleteMutation.isPending} className="flex-1 py-3 bg-red-500 rounded-xl text-white font-medium hover:bg-red-600 shadow-md flex items-center justify-center disabled:opacity-50">
                            {deleteMutation.isPending ? 'Menghapus...' : 'Ya, Hapus'}
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}