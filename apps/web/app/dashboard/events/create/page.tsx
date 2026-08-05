'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as yup from 'yup';
import { useQuery } from '@tanstack/react-query';
import {
    HiOutlineHome, HiChevronRight, HiOutlinePhoto, HiXMark,
    HiOutlineCalendar, HiOutlineClock, HiOutlineMapPin,
    HiOutlineCurrencyDollar, HiOutlineDocumentText, HiOutlineLink,
    HiOutlinePlus, HiOutlineTrash, HiOutlineSparkles, HiOutlineDocumentDuplicate
} from 'react-icons/hi2';
import AdminLayout from '../../../../components/layout/AdminLayout';
import { useCreateEvent } from '../../../../hooks/useEvent';
import { customToast } from '../../../../lib/toast';
import { api } from '../../../../lib/axios';

// 1. Fungsi Fetcher Profile User Active
export const getMe = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};

// 2. Skema Validasi Yup
const eventSchema = yup.object().shape({
    title: yup.string().required('Nama Event wajib diisi.'),
    description: yup.string().min(10, 'Deskripsi minimal 10 karakter.').required('Deskripsi Event wajib diisi.'),
    date: yup.string().required('Tanggal wajib diisi.'),
    time: yup.string().required('Waktu wajib diisi.'),
    location: yup.string().required('Lokasi wajib diisi.'),
    linkGrup: yup.string().url('Format URL tidak valid (harus diawali http/https).').nullable().notRequired(),
    locationLink: yup.string().url('Format URL tidak valid.').nullable().notRequired(),
    // mapTag tidak menggunakan .url() agar bisa menerima tag <iframe> html dari gmaps
    mapTag: yup.string().nullable().notRequired(),
});

export default function AddEventPage() {
    const { mutate, isPending } = useCreateEvent();

    const { data: profileResponse, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['me'],
        queryFn: getMe,
    });

    const currentUser = profileResponse?.data;

    const [title, setTitle] = useState("");
    const [type, setType] = useState("Online Class");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [linkGrup, setLinkGrup] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Draft");

    // State untuk link dinamis
    const [locationLink, setLocationLink] = useState("");
    const [mapTag, setMapTag] = useState("");

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [benefits, setBenefits] = useState<string[]>([""]);
    const [resources, setResources] = useState<{ name: string, link: string }[]>([{ name: "", link: "" }]);

    const [priceFormatted, setPriceFormatted] = useState("");
    const [priceRaw, setPriceRaw] = useState(0);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const getInputStyle = (errorField?: string) => `w-full px-4 py-3 bg-slate-50 border focus:bg-white rounded-xl text-sm outline-none transition-all text-navyBlue placeholder:text-slate-400 font-medium ${errorField
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        : "border-slate-200 focus:border-goldAccent focus:ring-2 focus:ring-goldAccent/20"
        }`;

    const handleBenefitChange = (index: number, value: string) => {
        const newBenefits = [...benefits];
        newBenefits[index] = value;
        setBenefits(newBenefits);
    };
    const addBenefit = () => setBenefits([...benefits, ""]);
    const removeBenefit = (index: number) => {
        const newBenefits = benefits.filter((_, i) => i !== index);
        setBenefits(newBenefits.length ? newBenefits : [""]);
    };

    const handleResourceChange = (index: number, field: 'name' | 'link', value: string) => {
        setResources(prevResources => prevResources.map((resource, i) =>
            i === index ? { ...resource, [field]: value } : resource
        ));
    };
    const addResource = () => setResources([...resources, { name: "", link: "" }]);
    const removeResource = (index: number) => {
        const newResources = resources.filter((_, i) => i !== index);
        setResources(newResources.length ? newResources : [{ name: "", link: "" }]);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueOnlyNumbers = e.target.value.replace(/[^0-9]/g, '');
        if (!valueOnlyNumbers) {
            setPriceFormatted("");
            setPriceRaw(0);
            return;
        }
        const numberValue = parseInt(valueOnlyNumbers, 10);
        setPriceRaw(numberValue);
        setPriceFormatted(new Intl.NumberFormat('id-ID').format(numberValue));
    };

    const processFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setThumbnailPreview(imageUrl);
            setThumbnailFile(file);
        } else {
            customToast.error("Mohon unggah file berupa gambar (PNG, JPG, WEBP).");
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!currentUser?.id) {
            customToast.error("Sesi pengguna tidak valid. Silakan login ulang.");
            return;
        }

        try {
            await eventSchema.validate({
                title, description, date, time, location, linkGrup: linkGrup || null, locationLink: locationLink || null, mapTag: mapTag || null
            }, { abortEarly: false });

            if (!thumbnailFile) {
                customToast.error("Harap unggah thumbnail event terlebih dahulu.");
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('type', type === 'Online Class' ? 'ONLINE_CLASS' : 'OFFLINE_EVENT');   
            formData.append('eventDate', date);
            formData.append('eventTime', time);
            formData.append('location', location);

            if (linkGrup) formData.append('groupLink', linkGrup);
            if (locationLink) formData.append('locationLink', locationLink);

            if (type === 'Offline Event' && mapTag) formData.append('mapTag', mapTag);

            formData.append('price', priceRaw.toString());
            formData.append('description', description);
            formData.append('status', status === 'Draft' ? 'DRAFT' : 'PUBLISHED');

            formData.append('authorId', currentUser.id);

            const filteredBenefits = benefits.filter(b => b.trim() !== "");
            const filteredResources = resources.filter(r => r.name.trim() !== "" || r.link.trim() !== "");

            formData.append('benefits', JSON.stringify(filteredBenefits));
            formData.append('resources', JSON.stringify(filteredResources));
            formData.append('thumbnailUrl', thumbnailFile);

            mutate(formData);

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors: { [key: string]: string } = {};
                error.inner.forEach((err) => {
                    if (err.path) validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} noValidate className="max-w-7xl mx-auto pb-32 pt-4 px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
                        <Link href="/dashboard" className="hover:text-navyBlue transition-colors"><HiOutlineHome className="w-4 h-4" /></Link>
                        <HiChevronRight className="w-3 h-3 shrink-0" />
                        <Link href="/dashboard/events" className="hover:text-navyBlue transition-colors whitespace-nowrap">Event & Seminar</Link>
                        <HiChevronRight className="w-3 h-3 shrink-0" />
                        <span className="text-navyBlue font-semibold whitespace-nowrap">Tambah Baru</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link href="/dashboard/events" className="flex-1 sm:flex-none text-center px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm">
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={isPending || isLoadingProfile}
                            className="flex-1 sm:flex-none text-center px-8 py-2.5 bg-navyBlue text-white font-medium rounded-xl hover:bg-goldAccent hover:text-navyBlue transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Menyimpan...' : 'Simpan Event Baru'}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-2/3 space-y-6">
                        {/* INFORMASI UMUM */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                            <h2 className="text-lg font-bold text-navyBlue font-serif border-b border-slate-100 pb-4 mb-6">Informasi Umum</h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-navyBlue">Nama Event <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Contoh: Webinar Wealth Management"
                                        className={getInputStyle(errors.title)}
                                    />
                                    {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-navyBlue">
                                        <HiOutlineDocumentText className="w-4 h-4 text-slate-400" /> Deskripsi Event <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Tuliskan deskripsi lengkap mengenai event ini..."
                                        className={`${getInputStyle(errors.description)} resize-none`}
                                    ></textarea>
                                    {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        {/* BENEFIT PESERTA */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                                <h2 className="flex items-center gap-2 text-lg font-bold text-navyBlue font-serif">
                                    <HiOutlineSparkles className="w-5 h-5 text-goldAccent" /> Benefit Peserta
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">{index + 1}</div>
                                        <input type="text" value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} placeholder="Contoh: E-Certificate / Grup Diskusi" className={getInputStyle()} />
                                        <button type="button" onClick={() => removeBenefit(index)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"><HiOutlineTrash className="w-5 h-5" /></button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addBenefit} className="mt-5 flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 border-dashed text-slate-600 font-medium rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-colors text-sm w-full justify-center">
                                <HiOutlinePlus className="w-4 h-4" /> Tambah Benefit
                            </button>
                        </div>

                        {/* RESOURCE MATERI */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                                <h2 className="flex items-center gap-2 text-lg font-bold text-navyBlue font-serif">
                                    <HiOutlineDocumentDuplicate className="w-5 h-5 text-goldAccent" /> Resources / Materi
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {resources.map((resource, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <div className="w-full sm:w-1/3">
                                            <input type="text" value={resource.name} onChange={(e) => handleResourceChange(index, 'name', e.target.value)} placeholder="Nama (cth: Slide PDF)" className={getInputStyle()} />
                                        </div>
                                        <div className="w-full flex-1 flex items-center gap-3">
                                            <div className="relative w-full">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><HiOutlineLink className="w-4 h-4" /></div>
                                                <input type="url" value={resource.link} onChange={(e) => handleResourceChange(index, 'link', e.target.value)} placeholder="https://drive.google.com/..." className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 focus:border-goldAccent focus:ring-2 focus:ring-goldAccent/20 rounded-xl text-sm outline-none transition-all text-navyBlue placeholder:text-slate-400 font-medium" />
                                            </div>
                                            <button type="button" onClick={() => removeResource(index)} className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-xl transition-colors shrink-0 shadow-sm"><HiOutlineTrash className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addResource} className="mt-5 flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 border-dashed text-slate-600 font-medium rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-colors text-sm w-full justify-center">
                                <HiOutlinePlus className="w-4 h-4" /> Tambah Resource Materi
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 space-y-6">
                        {/* PENGATURAN DASAR */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5">Pengaturan Dasar</h2>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-navyBlue">Status Publikasi</label>
                                    <select value={status} onChange={(e) => setStatus(e.target.value)} className={`w-full px-4 py-3 border focus:ring-2 rounded-xl text-sm font-bold tracking-wide outline-none transition-all cursor-pointer ${status === "Diterbitkan" ? "bg-green-50 text-green-700 border-green-200 focus:ring-green-500/20 focus:border-green-400" : "bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500/20 focus:border-amber-400"}`}>
                                        <option value="Draft">Draft (Disembunyikan)</option>
                                        <option value="Diterbitkan">Diterbitkan (Publik)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-navyBlue">Tipe Event</label>
                                    <select value={type} onChange={(e) => setType(e.target.value)} className={getInputStyle()}>
                                        <option value="Online Class">Online Class</option>
                                        <option value="Offline Event">Offline Event</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* THUMBNAIL */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5">Thumbnail</h2>
                            {!thumbnailPreview ? (
                                <label onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl transition-all cursor-pointer group px-4 text-center ${isDragging ? "border-goldAccent bg-goldAccent/5" : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300"}`}>
                                    <HiOutlinePhoto className={`w-8 h-8 mb-2 ${isDragging ? "text-goldAccent" : "text-slate-400 group-hover:text-navyBlue"}`} />
                                    <p className={`text-xs font-medium ${isDragging ? "text-goldAccent" : "text-slate-600"}`}>Klik atau Tarik Gambar</p>
                                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG (Maks. 2MB)</p>
                                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
                                </label>
                            ) : (
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm group border border-slate-200">
                                    <Image src={thumbnailPreview} alt="Thumbnail" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-navyBlue/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button type="button" onClick={() => { setThumbnailPreview(null); setThumbnailFile(null); }} className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 flex items-center gap-1.5"><HiXMark className="w-4 h-4" /> Ganti Gambar</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* PELAKSANAAN */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5">Pelaksanaan</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-navyBlue mb-1.5"><HiOutlineCalendar className="w-4 h-4 text-slate-400" /> Tanggal <span className="text-red-500">*</span></label>
                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={getInputStyle(errors.date)} />
                                    {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{errors.date}</p>}
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-navyBlue mb-1.5"><HiOutlineClock className="w-4 h-4 text-slate-400" /> Waktu <span className="text-red-500">*</span></label>
                                    <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="09:00 - 12:00 WIB" className={getInputStyle(errors.time)} />
                                    {errors.time && <p className="text-xs text-red-500 mt-1 font-medium">{errors.time}</p>}
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-navyBlue mb-1.5"><HiOutlineMapPin className="w-4 h-4 text-slate-400" /> Lokasi Dasar <span className="text-red-500">*</span></label>
                                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Zoom / Hotel Mulia" className={getInputStyle(errors.location)} />
                                    {errors.location && <p className="text-xs text-red-500 mt-1 font-medium">{errors.location}</p>}
                                </div>

                                {/* CONDITIONAL RENDERING BERDASARKAN TYPE EVENT */}
                                {type === 'Online Class' ? (
                                    <div>
                                        <label className="flex items-center gap-2 text-xs font-bold text-navyBlue mb-1.5"><HiOutlineLink className="w-4 h-4 text-slate-400" /> Link Zoom / GMeet</label>
                                        <input type="url" value={locationLink} onChange={(e) => setLocationLink(e.target.value)} placeholder="https://zoom.us/j/..." className={getInputStyle(errors.locationLink)} />
                                        {errors.locationLink && <p className="text-xs text-red-500 mt-1 font-medium">{errors.locationLink}</p>}
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="flex items-center gap-2 text-xs font-bold text-navyBlue mb-1.5"><HiOutlineLink className="w-4 h-4 text-slate-400" /> Link Google Maps</label>
                                            <input type="url" value={locationLink} onChange={(e) => setLocationLink(e.target.value)} placeholder="https://maps.app.goo.gl/..." className={getInputStyle(errors.locationLink)} />
                                            {errors.locationLink && <p className="text-xs text-red-500 mt-1 font-medium">{errors.locationLink}</p>}
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-xs font-bold text-navyBlue mb-1.5"><HiOutlineMapPin className="w-4 h-4 text-slate-400" /> Tag Maps (Iframe Embed HTML)</label>
                                            <input type="text" value={mapTag} onChange={(e) => setMapTag(e.target.value)} placeholder="<iframe src='...'></iframe>" className={getInputStyle(errors.mapTag)} />
                                            {errors.mapTag && <p className="text-xs text-red-500 mt-1 font-medium">{errors.mapTag}</p>}
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-navyBlue mb-1.5"><HiOutlineLink className="w-4 h-4 text-slate-400" /> Link Grup (WA/Telegram)</label>
                                    <input type="url" value={linkGrup} onChange={(e) => setLinkGrup(e.target.value)} placeholder="https://chat.whatsapp.com/..." className={getInputStyle(errors.linkGrup)} />
                                    {errors.linkGrup && <p className="text-xs text-red-500 mt-1 font-medium">{errors.linkGrup}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5">Tiket</h2>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-navyBlue"><HiOutlineCurrencyDollar className="w-4 h-4 text-slate-400" /> Harga Tiket</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">Rp</span>
                                    <input type="text" value={priceFormatted} onChange={handlePriceChange} placeholder="0" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-goldAccent focus:ring-2 focus:ring-goldAccent/20 rounded-xl text-sm outline-none transition-all text-navyBlue font-bold" />
                                </div>
                                <p className="text-[10px] text-slate-400">Isi 0 untuk kelas Gratis.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}