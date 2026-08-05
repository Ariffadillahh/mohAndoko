'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    HiOutlineHome, HiChevronRight, HiOutlineClock,
    HiOutlinePhoto, HiXMark, HiOutlineFolderOpen, HiOutlineSignal
} from 'react-icons/hi2';
import AdminLayout from '../../../../components/layout/AdminLayout';

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BLOG_CATEGORIES } from '../../../../lib/utils';

import { useCreateBlog } from '../../../../hooks/useBlog';
import { uploadBlogEditorImageService } from '../../../../services/blog.service';
import { customToast } from '../../../../lib/toast';


function EditorContainer({ onWordCountChange, editorRef }: { onWordCountChange: (count: number) => void, editorRef: React.MutableRefObject<any> }) {

    const editor = useCreateBlockNote({
        uploadFile: async (file: File) => {
            try {
                const response = await uploadBlogEditorImageService(file);

                const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

                return `${baseUrl}${response.url}`;
            } catch (error) {
                console.error("Gagal mengunggah gambar ke editor:", error);
                customToast.error("Gagal mengunggah gambar ke dalam teks.");
                return "";
            }
        }
    });

    useEffect(() => {
        if (editor) {
            editorRef.current = editor;
        }
    }, [editor, editorRef]);

    const handleChange = () => {
        if (!editor) return;

        let text = "";
        editor.document.forEach((block) => {
            if (block.content && Array.isArray(block.content)) {
                block.content.forEach((contentItem: any) => {
                    if (contentItem.type === "text") {
                        text += contentItem.text + " ";
                    }
                });
            }
        });

        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        onWordCountChange(words.length);
    };

    return (
        <div className="relative mt-6">
            <BlockNoteView
                editor={editor}
                onChange={handleChange}
                theme="light"
                className="min-h-[500px]"
            />
        </div>
    );
}

export default function AddEditBlogPage() {
    const { mutate, isPending } = useCreateBlog();

    const [title, setTitle] = useState("");
    const [wordCount, setWordCount] = useState(0);

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const [isMounted, setIsMounted] = useState(false);
    const [category, setCategory] = useState("Wealth Management");
    const [status, setStatus] = useState("Draft");
    const [isDragging, setIsDragging] = useState(false);

    const editorRef = useRef<any>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const processFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setThumbnailPreview(imageUrl);
            setThumbnailFile(file); // Simpan file aslinya
        } else {
            customToast.error("Mohon unggah file berupa gambar (PNG, JPG, WEBP).");
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const removeThumbnail = () => {
        setThumbnailPreview(null);
        setThumbnailFile(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return customToast.error("Judul artikel wajib diisi.");

        let htmlContent = "";
        if (editorRef.current) {
            htmlContent = await editorRef.current.blocksToHTMLLossy(editorRef.current.document);
        }

        if (!htmlContent || htmlContent === "<p></p>") {
            return customToast.error("Konten artikel tidak boleh kosong.");
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('status', status === 'Diterbitkan' ? 'PUBLISHED' : 'DRAFT');
        formData.append('contentHtml', htmlContent);

        if (thumbnailFile) {
            formData.append('thumbnailUrl', thumbnailFile);
        }

        mutate(formData);
    };

    const today = new Date().toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short'
    }).toUpperCase();

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto pb-32 pt-4">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm font-medium text-navyBlue/50">
                        <Link href="/dashboard" className="hover:text-navyBlue transition-colors"><HiOutlineHome className="w-4 h-4" /></Link>
                        <HiChevronRight className="w-3 h-3" />
                        <Link href="/dashboard/blog" className="hover:text-navyBlue transition-colors">Blog</Link>
                        <HiChevronRight className="w-3 h-3" />
                        <span className="text-navyBlue font-semibold">Catatan Baru</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-8 py-2.5 bg-navyBlue text-pureWhite font-medium rounded-xl hover:bg-goldAccent hover:text-navyBlue transition-all shadow-md disabled:opacity-70"
                        >
                            {isPending ? 'Menyimpan...' : 'Simpan Artikel'}
                        </button>
                    </div>
                </div>

                <div className="bg-pureWhite rounded-3xl shadow-sm border border-navyBlue/5 p-8 md:p-12 lg:px-16 lg:py-14">
                    <div className="mb-6 pl-12 md:pl-[52px]">
                        <input
                            type="text"
                            placeholder="Judul Catatan..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full text-4xl md:text-5xl lg:text-[3.5rem] leading-tight font-black font-serif text-navyBlue placeholder:text-navyBlue/20 bg-transparent border-none outline-none focus:ring-0 p-0"
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8 border-b border-softSilver pl-12 md:pl-[52px]">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold tracking-wide">
                                <HiOutlineClock className="w-4 h-4" />
                                {today}
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold tracking-wide uppercase">
                                <span className="font-serif italic text-sm leading-none">T</span>
                                {wordCount} WORDS
                            </div>
                        </div>

                        <div className="md:flex items-center gap-4 space-y-3">
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-navyBlue/40 pointer-events-none">
                                    <HiOutlineFolderOpen className="w-4 h-4" />
                                </div>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="pl-9 pr-8 py-2 bg-softSilver/30 border border-transparent hover:bg-softSilver/50 focus:bg-pureWhite focus:border-goldAccent focus:ring-2 focus:ring-goldAccent/20 rounded-xl text-sm text-navyBlue font-medium appearance-none outline-none transition-all cursor-pointer"
                                >
                                    {BLOG_CATEGORIES.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-navyBlue/40 pointer-events-none">
                                    <HiOutlineSignal className="w-4 h-4" />
                                </div>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={`pl-9 pr-8 py-2 border hover:bg-opacity-80 focus:ring-2 rounded-xl text-sm font-bold tracking-wide appearance-none outline-none transition-all cursor-pointer ${status === "Diterbitkan"
                                        ? "bg-green-50 text-green-700 border-green-200 focus:ring-green-500/20 focus:border-green-400"
                                        : "bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500/20 focus:border-amber-400"
                                        }`}
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Diterbitkan">Diterbitkan</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12 pl-12 md:pl-[52px]">
                        {!thumbnailPreview ? (
                            <label
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`group flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition-all ${isDragging
                                        ? "border-goldAccent bg-goldAccent/5"
                                        : "border-navyBlue/10 bg-softSilver/30 hover:border-goldAccent/50 hover:bg-softSilver/50"
                                    }`}
                            >
                                <div
                                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full shadow-sm transition-all ${isDragging
                                            ? "bg-goldAccent text-pureWhite"
                                            : "bg-pureWhite text-navyBlue/40 group-hover:text-goldAccent"
                                        }`}
                                >
                                    <HiOutlinePhoto className="h-7 w-7" />
                                </div>

                                <h3
                                    className={`max-w-xs text-center text-base font-semibold leading-snug transition-colors ${isDragging ? "text-goldAccent" : "text-navyBlue"
                                        }`}
                                >
                                    {isDragging ? "Lepaskan gambar di sini" : "Klik atau tarik gambar ke sini"}
                                </h3>

                                <p className="mt-2 text-sm text-navyBlue/50">
                                    atau <span className="font-medium text-goldAccent">klik untuk memilih file</span>
                                </p>

                                <p className="mt-3 text-xs text-navyBlue/40">
                                    PNG, JPG, atau WEBP • Maks. 2 MB
                                </p>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-md group">
                                <Image src={thumbnailPreview} alt="Thumbnail preview" fill className="object-cover" />
                                <div className="absolute inset-0 bg-navyBlue/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={removeThumbnail}
                                        className="px-5 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2 shadow-lg"
                                    >
                                        <HiXMark className="w-5 h-5" /> Hapus Gambar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-softSilver pt-8 pl-12 md:pl-[52px]">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-6 h-1 bg-goldAccent rounded-full"></span>
                            <h3 className="text-sm font-bold text-navyBlue/40 uppercase tracking-widest">📝 Isi Konten Artikel</h3>
                        </div>
                    </div>

                    {isMounted ? (
                        <EditorContainer onWordCountChange={setWordCount} editorRef={editorRef} />
                    ) : (
                        <div className="min-h-[500px] flex items-center justify-center text-navyBlue/30 text-sm animate-pulse mt-8">
                            Memuat Editor...
                        </div>
                    )}

                </div>
            </form>
        </AdminLayout>
    );
}