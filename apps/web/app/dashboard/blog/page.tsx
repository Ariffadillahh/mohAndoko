'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    HiOutlinePlus,
    HiOutlineMagnifyingGlass,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineFunnel,
    HiOutlineExclamationTriangle,
    HiOutlineFolderOpen,
    HiChevronLeft,
    HiChevronRight
} from 'react-icons/hi2';
import AdminLayout from '../../../components/layout/AdminLayout';
import Modal from '../../../components/layout/Modal';
import { BLOG_CATEGORIES } from '../../../lib/utils';
import { useGetBlogs, useDeleteBlog } from '../../../hooks/useBlog';

export default function BlogManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("Semua");
    const [filterCategory, setFilterCategory] = useState("Semua");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, filterStatus, filterCategory, itemsPerPage]);

    const { data: responseData, isLoading, isFetching } = useGetBlogs({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch || undefined,
        category: filterCategory !== "Semua" ? filterCategory : undefined,
        status: filterStatus !== "Semua" ? filterStatus : undefined,
    });

    const articles = responseData?.data || [];
    const meta = responseData?.meta || { totalPages: 1 };

    const deleteMutation = useDeleteBlog();

    const confirmDelete = (id: string) => {
        setArticleToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (articleToDelete) {
            deleteMutation.mutate(articleToDelete, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setArticleToDelete(null);
                }
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-8 pb-10">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-serif text-3xl text-navyBlue font-medium mb-1">Manajemen Blog</h1>
                        <p className="text-sm text-navyBlue/60">Kelola semua artikel dan berita untuk website Anda.</p>
                    </div>
                    <Link
                        href="/dashboard/blog/create"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navyBlue text-pureWhite font-medium rounded-xl hover:bg-goldAccent hover:text-navyBlue transition-all duration-300 shadow-md hover:shadow-goldAccent/20 shrink-0"
                    >
                        <HiOutlinePlus className="w-5 h-5" />
                        Tambah Artikel
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 bg-pureWhite p-4 rounded-2xl shadow-sm border border-navyBlue/5">
                    <div className="relative flex-1">
                        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navyBlue/40" />
                        <input
                            type="text"
                            placeholder="Cari judul artikel..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-softSilver/50 border border-transparent focus:border-goldAccent focus:bg-pureWhite focus:ring-4 focus:ring-goldAccent/10 rounded-xl text-sm outline-none transition-all text-navyBlue placeholder:text-navyBlue/40"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="relative shrink-0 w-full sm:w-44">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <HiOutlineFunnel className="w-5 h-5 text-navyBlue/40" />
                            </div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full pl-11 pr-10 py-2.5 bg-softSilver/50 border border-transparent focus:border-navyBlue focus:bg-pureWhite focus:ring-4 focus:ring-navyBlue/10 rounded-xl text-sm outline-none transition-all text-navyBlue appearance-none cursor-pointer"
                            >
                                <option value="Semua">Semua Status</option>
                                <option value="PUBLISHED">Diterbitkan</option>
                                <option value="DRAFT">Draft</option>
                            </select>
                        </div>

                        <div className="relative shrink-0 w-full sm:w-56">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <HiOutlineFolderOpen className="w-5 h-5 text-goldAccent/80" />
                            </div>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full pl-11 pr-10 py-2.5 bg-goldAccent/5 border border-transparent focus:border-goldAccent focus:bg-pureWhite focus:ring-4 focus:ring-goldAccent/20 rounded-xl text-sm outline-none transition-all text-navyBlue appearance-none cursor-pointer"
                            >
                                <option value="Semua">Semua Kategori</option>
                                {BLOG_CATEGORIES.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-pureWhite rounded-3xl shadow-sm border border-navyBlue/5 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto relative min-h-[300px]">
                        {isFetching && !isLoading && (
                            <div className="absolute inset-0 bg-white/60 flex justify-center items-center z-10">
                                <div className="w-8 h-8 border-4 border-goldAccent border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-softSilver/30 text-navyBlue/60 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Judul Artikel</th>
                                    <th className="px-6 py-4 font-semibold">Kategori</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Created At</th>
                                    <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-softSilver">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-navyBlue/50 text-sm">
                                            <div className="flex justify-center items-center gap-3">
                                                <div className="w-5 h-5 border-2 border-goldAccent border-t-transparent rounded-full animate-spin"></div>
                                                Memuat artikel...
                                            </div>
                                        </td>
                                    </tr>
                                ) : articles.length > 0 ? (
                                    articles.map((article: any, idx: number) => (
                                        <motion.tr
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            key={article.id}
                                            className="hover:bg-softSilver/20 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-navyBlue line-clamp-1">{article.title}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-navyBlue/70 bg-softSilver px-2.5 py-1 rounded-md font-medium">
                                                    {article.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${article.status === 'PUBLISHED'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {article.status === 'PUBLISHED' ? 'Diterbitkan' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-navyBlue/60">
                                                {formatDate(article.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/blog/edit/${article.id}`}
                                                        className="p-2 text-navyBlue/40 hover:text-goldAccent hover:bg-goldAccent/10 rounded-lg transition-colors"
                                                        title="Edit Artikel"
                                                    >
                                                        <HiOutlinePencilSquare className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => confirmDelete(article.id)}
                                                        className="p-2 text-navyBlue/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                        title="Hapus Artikel"
                                                    >
                                                        <HiOutlineTrash className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-navyBlue/50 text-sm">
                                            Tidak ada artikel yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-softSilver bg-pureWhite flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-navyBlue/60 font-medium">
                            Tampilkan
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="px-2 py-1 bg-softSilver/50 border border-transparent rounded-lg focus:outline-none focus:border-goldAccent focus:bg-white text-navyBlue"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                            </select>
                            data
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="text-navyBlue/60">
                                Halaman <span className="text-navyBlue font-bold">{currentPage}</span> dari {meta.totalPages}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1 || isLoading}
                                    className="p-2 rounded-lg border border-softSilver text-navyBlue/60 hover:bg-softSilver hover:text-navyBlue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <HiChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, meta.totalPages))}
                                    disabled={currentPage === meta.totalPages || isLoading}
                                    className="p-2 rounded-lg border border-softSilver text-navyBlue/60 hover:bg-softSilver hover:text-navyBlue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

                    <h3 className="font-serif text-2xl text-navyBlue mb-2">Hapus Artikel?</h3>
                    <p className="text-sm text-navyBlue/60 mb-8 leading-relaxed">
                        Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan dan artikel akan dihapus secara permanen dari database.
                    </p>

                    <div className="flex gap-4 w-full">
                        <button
                            disabled={deleteMutation.isPending}
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="flex-1 py-3 px-4 rounded-xl border border-navyBlue/10 text-navyBlue font-medium hover:bg-softSilver transition-colors disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            disabled={deleteMutation.isPending}
                            onClick={handleDelete}
                            className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-pureWhite font-medium hover:bg-red-600 shadow-md shadow-red-500/20 transition-colors disabled:opacity-50 flex justify-center items-center"
                        >
                            {deleteMutation.isPending ? 'Menghapus...' : 'Ya, Hapus'}
                        </button>
                    </div>
                </div>
            </Modal>

        </AdminLayout>
    );
}