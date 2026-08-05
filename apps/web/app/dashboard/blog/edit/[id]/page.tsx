'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
    HiOutlineHome,
    HiChevronRight,
    HiOutlineClock,
    HiOutlinePhoto,
    HiXMark,
    HiOutlineFolderOpen,
    HiOutlineSignal
} from 'react-icons/hi2';
import AdminLayout from '../../../../../components/layout/AdminLayout';

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BLOG_CATEGORIES } from '../../../../../lib/utils';

import { uploadBlogEditorImageService } from '../../../../../services/blog.service';
import { useGetBlogById, useUpdateBlog } from '../../../../../hooks/useBlog';
import { useQueryClient } from '@tanstack/react-query';

// ==========================================
// KOMPONEN EDITOR BLOCKNOTE
// ==========================================
function EditorContainer({
    onWordCountChange,
    editorRef,
    initialHTML,
    uploadedEditorImages
}: {
    onWordCountChange: (count: number) => void,
    editorRef: React.MutableRefObject<any>,
    initialHTML: string,
    uploadedEditorImages: React.MutableRefObject<string[]>
}) {
    const editor = useCreateBlockNote({
        uploadFile: async (file: File) => {
            try {
                const response = await uploadBlogEditorImageService(file);

                uploadedEditorImages.current.push(response.url);

                return `${process.env.NEXT_PUBLIC_STORAGE_URL}${response.url}`;
            } catch (error) {
                console.error("Gagal mengunggah gambar ke editor:", error);
                return "";
            }
        }
    });

    useEffect(() => {
        if (editor) {
            editorRef.current = editor;

            const loadInitialContent = async () => {
                if (initialHTML) {
                    const blocks = await editor.tryParseHTMLToBlocks(initialHTML);
                    editor.replaceBlocks(editor.document, blocks);
                }
            };

            loadInitialContent();
        }
    }, [editor, editorRef, initialHTML]);

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
        <div className="relative mt-4">
            <BlockNoteView
                editor={editor}
                onChange={handleChange}
                theme="light"
                className="min-h-[500px]"
            />
        </div>
    );
}

// ==========================================
// HALAMAN UTAMA EDIT BLOG
// ==========================================
export default function EditBlogPage() {
    const params = useParams();
    const router = useRouter();
    const articleId = params.id as string;
    const queryClient = useQueryClient();

    const [isMounted, setIsMounted] = useState(false);

    // Tracker untuk gambar editor
    const uploadedEditorImages = useRef<string[]>([]);

    // State Form
    const [title, setTitle] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [category, setCategory] = useState("Wealth Management");
    const [status, setStatus] = useState("DRAFT");
    const [initialHTML, setInitialHTML] = useState("");

    // State Gambar
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [isThumbnailRemoved, setIsThumbnailRemoved] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const editorRef = useRef<any>(null);

    const { data: responseData, isLoading: isLoadingData, isError } = useGetBlogById(articleId);
    const updateMutation = useUpdateBlog();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (responseData?.data) {
            const article = responseData.data;
            setTitle(article.title);
            setCategory(article.category);
            setStatus(article.status);
            setInitialHTML(article.contentHtml);

            if (article.thumbnailUrl) {
                setThumbnailPreview(`${process.env.NEXT_PUBLIC_STORAGE_URL}${article.thumbnailUrl}`);
            }
        }
    }, [responseData]);

    useEffect(() => {
        if (isError) {
            alert("Artikel tidak ditemukan!");
            router.push('/dashboard/blog');
        }
    }, [isError, router]);

    const processFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setThumbnailPreview(imageUrl);
            setThumbnailFile(file);
            setIsThumbnailRemoved(false);
        } else {
            alert("Mohon unggah file berupa gambar (PNG, JPG, WEBP).");
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const removeThumbnail = () => {
        setThumbnailPreview(null);
        setThumbnailFile(null);
        setIsThumbnailRemoved(true);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Judul artikel tidak boleh kosong!");
            return;
        }

        let contentHtml = "";
        if (editorRef.current) {
            contentHtml = await editorRef.current.blocksToHTMLLossy(editorRef.current.document);
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('status', status);
        formData.append('contentHtml', contentHtml);

        if (thumbnailFile) {
            formData.append('thumbnailUrl', thumbnailFile);
        } else if (isThumbnailRemoved) {
            formData.append('removeThumbnail', 'true');
        }

        // Kirim tracker gambar yang diupload ke backend
        if (uploadedEditorImages.current.length > 0) {
            formData.append('uploadedImagesTracker', JSON.stringify(uploadedEditorImages.current));
        }

        updateMutation.mutate(
            { id: articleId, data: formData },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['blog', articleId] });
                    queryClient.invalidateQueries({ queryKey: ['blogs'] });

                    router.push('/dashboard/blog');
                }
            }
        );
    };

    const today = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short'
    }).toUpperCase();

    if (isLoadingData) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-12 h-12 border-4 border-navyBlue/20 border-t-goldAccent rounded-full animate-spin"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto pb-32 pt-4 px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-navyBlue/50">
                        <Link href="/dashboard" className="hover:text-navyBlue transition-colors">
                            <HiOutlineHome className="w-4 h-4" />
                        </Link>
                        <HiChevronRight className="w-3 h-3 shrink-0" />
                        <Link href="/dashboard/blog" className="hover:text-navyBlue transition-colors whitespace-nowrap">
                            Blog
                        </Link>
                        <HiChevronRight className="w-3 h-3 shrink-0" />
                        <span className="text-navyBlue font-semibold whitespace-nowrap">Edit Artikel</span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <Link
                            href="/dashboard/blog"
                            className="flex-1 sm:flex-none text-center px-4 sm:px-6 py-2.5 bg-softSilver text-navyBlue font-medium rounded-xl hover:bg-softSilver/80 transition-colors text-sm sm:text-base"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={updateMutation.isPending}
                            className="flex-1 sm:flex-none text-center px-4 sm:px-8 py-2.5 bg-navyBlue text-pureWhite font-medium rounded-xl hover:bg-goldAccent hover:text-navyBlue transition-all shadow-md text-sm sm:text-base disabled:opacity-50"
                        >
                            {updateMutation.isPending ? 'Menyimpan...' : 'Perbarui'}
                        </button>
                    </div>
                </div>

                <div className="bg-pureWhite rounded-xl sm:rounded-3xl shadow-sm border border-navyBlue/5 p-5 sm:p-8 md:p-12 lg:px-16 lg:py-14">
                    <div className="mb-6 pl-1 sm:pl-[54px]">
                        <input
                            type="text"
                            placeholder="Judul Artikel..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full text-3xl sm:text-4xl md:text-5xl leading-tight font-black font-serif text-navyBlue placeholder:text-navyBlue/20 bg-transparent border-none outline-none focus:ring-0 p-0"
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-softSilver pl-1 sm:pl-[54px]">
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

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className="relative group w-full sm:w-auto">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-navyBlue/40 pointer-events-none">
                                    <HiOutlineFolderOpen className="w-4 h-4" />
                                </div>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full sm:w-auto pl-9 pr-8 py-2 bg-softSilver/30 border border-transparent hover:bg-softSilver/50 focus:bg-pureWhite focus:border-goldAccent focus:ring-2 focus:ring-goldAccent/20 rounded-xl text-sm text-navyBlue font-medium appearance-none outline-none transition-all cursor-pointer"
                                >
                                    {BLOG_CATEGORIES.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative group w-full sm:w-auto">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-navyBlue/40 pointer-events-none">
                                    <HiOutlineSignal className="w-4 h-4" />
                                </div>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={`w-full sm:w-auto pl-9 pr-8 py-2 border hover:bg-opacity-80 focus:ring-2 rounded-xl text-sm font-bold tracking-wide appearance-none outline-none transition-all cursor-pointer ${status === "PUBLISHED"
                                        ? "bg-green-50 text-green-700 border-green-200 focus:ring-green-500/20 focus:border-green-400"
                                        : "bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500/20 focus:border-amber-400"
                                        }`}
                                >
                                    <option value="DRAFT">Draft</option>
                                    <option value="PUBLISHED">Diterbitkan</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-10 sm:mb-12 pl-1 sm:pl-[54px]">
                        {!thumbnailPreview ? (
                            <label
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed rounded-2xl transition-all cursor-pointer group px-4 text-center ${isDragging
                                    ? "border-goldAccent bg-goldAccent/5"
                                    : "border-navyBlue/10 bg-softSilver/30 hover:bg-softSilver/50 hover:border-goldAccent/50"
                                    }`}
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 shadow-sm transition-colors ${isDragging ? "bg-goldAccent text-pureWhite" : "bg-pureWhite text-navyBlue/40 group-hover:text-goldAccent"}`}>
                                    <HiOutlinePhoto className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <p className={`text-xs sm:text-sm font-medium transition-colors ${isDragging ? "text-goldAccent" : "text-navyBlue/70"}`}>
                                    {isDragging ? "Lepaskan gambar di sini..." : "Klik atau Tarik & Lepas (Drag & Drop) Thumbnail"}
                                </p>
                                <p className="text-[10px] sm:text-xs text-navyBlue/40 mt-1">PNG, JPG atau WEBP (Maks. 2MB)</p>
                                <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
                            </label>
                        ) : (
                            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-md group border border-softSilver">
                                <Image src={thumbnailPreview} alt="Thumbnail preview" fill className="object-cover" unoptimized />
                                <div className="absolute inset-0 bg-navyBlue/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={removeThumbnail}
                                        className="px-4 py-2 sm:px-5 sm:py-2.5 bg-red-500 text-white text-sm sm:text-base font-medium rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2 shadow-lg"
                                    >
                                        <HiXMark className="w-4 h-4 sm:w-5 sm:h-5" /> Hapus Gambar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-softSilver pt-6 sm:pt-8 pl-1 sm:pl-[54px]">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <span className="w-4 sm:w-6 h-1 bg-goldAccent rounded-full"></span>
                            <h3 className="text-xs sm:text-sm font-bold text-navyBlue/40 uppercase tracking-widest">📝 Isi Konten Artikel</h3>
                        </div>
                    </div>

                    {isMounted && initialHTML !== "" ? (
                        <EditorContainer
                            onWordCountChange={setWordCount}
                            editorRef={editorRef}
                            initialHTML={initialHTML}
                            uploadedEditorImages={uploadedEditorImages}
                        />
                    ) : (
                        <div className="min-h-[300px] sm:min-h-[500px] flex items-center justify-center text-navyBlue/30 text-xs sm:text-sm animate-pulse mt-8">
                            Memuat Editor...
                        </div>
                    )}
                </div>
            </form>
        </AdminLayout>
    );
}