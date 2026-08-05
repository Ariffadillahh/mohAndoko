'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Modal from '../layout/Modal';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { useCreateTrackRecord, useUpdateTrackRecord } from '../../hooks/useTrackRecord';

export interface TrackRecordData {
    id?: string;
    companyName: string;
    programName: string;
    location: string;
    thumbnailUrl?: string | null;
}

interface TrackRecordFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: TrackRecordData | null;
}

export default function TrackRecordFormModal({ isOpen, onClose, initialData }: TrackRecordFormModalProps) {
    const [companyName, setCompanyName] = useState("");
    const [programName, setProgramName] = useState("");
    const [location, setLocation] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

    const createMutation = useCreateTrackRecord();
    const updateMutation = useUpdateTrackRecord();

    const isPending = createMutation.isPending || updateMutation.isPending;

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setCompanyName(initialData.companyName);
                setProgramName(initialData.programName);
                setLocation(initialData.location);
                setThumbnailPreview(initialData.thumbnailUrl ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${initialData.thumbnailUrl}` : null);
            } else {
                setCompanyName("");
                setProgramName("");
                setLocation("");
                setThumbnailPreview(null);
            }
            setThumbnailFile(null);
        }
    }, [isOpen, initialData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setThumbnailFile(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('programName', programName);
        formData.append('location', location);

        if (thumbnailFile) {
            formData.append('thumbnailUrl', thumbnailFile);
        }

        if (initialData?.id) {
            updateMutation.mutate({ id: initialData.id, data: formData }, { onSuccess: onClose });
        } else {
            createMutation.mutate(formData, { onSuccess: onClose });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl text-navyBlue">
                    {initialData ? 'Edit Track Record' : 'Tambah Track Record'}
                </h3>

            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-navyBlue">Nama Perusahaan <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Contoh: BANK BRI"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-sm outline-none transition-all focus:border-goldAccent focus:ring-2 focus:ring-goldAccent/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-navyBlue">Lokasi <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Contoh: JAKARTA"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-sm outline-none transition-all focus:border-goldAccent focus:ring-2 focus:ring-goldAccent/20"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-navyBlue">Nama Program <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        required
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                        placeholder="Contoh: Brillian Leader Retirement Program"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-sm outline-none transition-all focus:border-goldAccent focus:ring-2 focus:ring-goldAccent/20"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-navyBlue">Gambar Thumbnail</label>
                    {!thumbnailPreview ? (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                            <HiOutlinePhoto className="w-8 h-8 text-slate-400 mb-2" />
                            <p className="text-xs font-medium text-slate-600">Klik untuk unggah gambar</p>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                    ) : (
                        <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-sm group border border-slate-200">
                            <Image src={thumbnailPreview} alt={programName} fill className="object-cover" unoptimized />
                            <div className="absolute inset-0 bg-navyBlue/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button type="button" onClick={() => { setThumbnailPreview(null); setThumbnailFile(null); }} className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600">
                                    Hapus Gambar
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button type="button" onClick={onClose} className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                        Batal
                    </button>
                    <button type="submit" disabled={isPending} className="flex-1 py-3 px-4 rounded-xl bg-navyBlue text-white font-medium hover:bg-goldAccent hover:text-navyBlue shadow-md transition-colors disabled:opacity-50">
                        {isPending ? 'Menyimpan...' : 'Simpan Data'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}