'use client';

import React, { useState } from 'react';

export default function TimeValueOfMoneyPage() {
    // State untuk ke-5 variabel utama (disimpan sebagai string agar koma tidak hilang)
    const [pv, setPv] = useState<string>('');
    const [pmt, setPmt] = useState<string>('');
    const [fv, setFv] = useState<string>('');
    const [rate, setRate] = useState<string>('');
    const [periods, setPeriods] = useState<string>('');

    // State untuk opsi kalkulator
    const [mode, setMode] = useState<'end' | 'beginning'>('end');
    const [decimals, setDecimals] = useState<number>(2);

    // ==========================================
    // FUNGSI FORMATTER (Ubah Angka Jadi Koma & Sebaliknya)
    // ==========================================

    const formatNumber = (value: string | number) => {
        if (value === '' || value === null || value === undefined) return '';
        let valString = value.toString();

        // Bersihkan semua karakter selain angka, minus, dan titik desimal
        let cleanVal = valString.replace(/[^\d.-]/g, '');

        // Tangani tanda minus (hanya boleh ada di paling depan)
        const isNegative = cleanVal.startsWith('-');
        cleanVal = cleanVal.replace(/-/g, '');
        if (isNegative) cleanVal = '-' + cleanVal;

        // Tangani titik desimal (pastikan hanya ada 1 titik)
        const parts = cleanVal.split('.');
        let integerPart = parts[0] || ''; 
        const decimalPart = parts.length > 1 ? '.' + parts.slice(1).join('') : '';

        // Tambahkan koma setiap 3 digit pada bagian bilangan bulat
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return integerPart + decimalPart;
    };

    const parseNumber = (value: string) => {
        if (!value) return 0;
        const cleanVal = value.replace(/,/g, '');
        return parseFloat(cleanVal) || 0;
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(formatNumber(e.target.value));
        };

    // ==========================================
    // MESIN MATEMATIKA (PURE ALGEBRAIC TVM ENGINE)
    // ==========================================
    
    const getFVA = (r: number, n: number, t: number) => {
        if (r === 0) return n;
        return ((Math.pow(1 + r, n) - 1) / r) * (1 + r * t);
    };

    const solveRate = (p: number, m: number, f: number, n: number, t: number) => {
        if (n === 0) return 0;
        const MAX_ITER = 1000;
        const TOLERANCE = 1e-7;
        let r_guess = 0.1; 
        const g = (r: number) => {
            if (r === 0) return p + m * n + f;
            let A = (m / r) * (1 + r * t);
            return p * Math.pow(1 + r, n) + A * (Math.pow(1 + r, n) - 1) + f;
        };
        for (let i = 0; i < MAX_ITER; i++) {
            let val = g(r_guess);
            if (Math.abs(val) < TOLERANCE) return r_guess;
            const h = 1e-6;
            let diff = (g(r_guess + h) - g(r_guess - h)) / (2 * h);
            if (diff === 0) break; 
            r_guess = r_guess - val / diff;
        }
        return r_guess;
    };

    const handleSolve = (target: 'pv' | 'pmt' | 'fv' | 'rate' | 'periods') => {
        const p = parseNumber(pv);
        const m = parseNumber(pmt);
        const f = parseNumber(fv);
        const r = parseNumber(rate) / 100;
        const n = parseNumber(periods);
        const t = mode === 'end' ? 0 : 1;

        const fva = getFVA(r, n, t);
        const pvf = Math.pow(1 + r, n);

        switch (target) {
            case 'fv':
                const fvRes = -(p * pvf + m * fva);
                setFv(formatNumber(fvRes.toFixed(decimals)));
                break;
            case 'pv':
                const pvRes = -(f + m * fva) / pvf;
                setPv(formatNumber(pvRes.toFixed(decimals)));
                break;
            case 'pmt':
                const pmtRes = fva === 0 ? 0 : -(f + p * pvf) / fva;
                setPmt(formatNumber(pmtRes.toFixed(decimals)));
                break;
            case 'periods':
                let nRes = 0;
                if (r === 0) {
                    nRes = m === 0 ? 0 : -(f + p) / m;
                } else {
                    const A = (m * (1 + r * t)) / r;
                    const num = A - f;
                    const den = p + A;
                    if (num / den <= 0) {
                        alert("Kombinasi input tidak valid. Pastikan Anda menggunakan tanda minus (-) dengan benar untuk arus kas keluar (PV/PMT).");
                        return;
                    }
                    nRes = Math.log(num / den) / Math.log(1 + r);
                }
                setPeriods(formatNumber(nRes.toFixed(decimals)));
                break;
            case 'rate':
                const rRes = solveRate(p, m, f, n, t) * 100;
                if (isNaN(rRes) || !isFinite(rRes)) {
                    alert("Kombinasi input tidak valid atau Rate tidak dapat dikalkulasikan. Pastikan penulisan tanda minus/plus sudah tepat.");
                } else {
                    setRate(formatNumber(rRes.toFixed(decimals)));
                }
                break;
        }
    };

    const handleReset = () => {
        setPv('');
        setPmt('');
        setFv('');
        setRate('');
        setPeriods('');
        setMode('end');
        setDecimals(2);
    };

    // ==========================================
    // UI COMPONENTS
    // ==========================================

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
            
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-12 relative overflow-hidden">
                
                {/* Aksen Garis Emas */}
                <div className="absolute top-0 left-0 w-full h-8 bg-[#DBAA47]"></div>

                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-[#0B1727]">
                        Time Value of Money
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm">
                        Kalkulator finansial untuk menghitung nilai waktu dari uang. <br/>
                        <span className="text-[#DBAA47] font-medium">*Gunakan tanda minus (-) untuk arus kas keluar (contoh: setoran/investasi).</span>
                    </p>
                </div>

                <div className="space-y-5">
                    {/* INPUT ROW: PV */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <label className="w-full md:w-1/3 text-slate-700 font-semibold text-sm tracking-wide">Present Value</label>
                        <div className="w-full md:w-1/2 relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-[#DBAA47] transition-colors">Rp</span>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={pv}
                                onChange={handleInputChange(setPv)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/30 focus:border-[#DBAA47] focus:bg-white transition-all duration-300"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('pv')}
                            className="w-full md:w-1/4 bg-[#0B1727] text-white py-3 px-4 rounded-xl font-medium shadow-md hover:bg-[#DBAA47] hover:text-[#0B1727] hover:shadow-lg hover:shadow-[#DBAA47]/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Solve PV
                        </button>
                    </div>

                    {/* INPUT ROW: PMT */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <label className="w-full md:w-1/3 text-slate-700 font-semibold text-sm tracking-wide">Payments</label>
                        <div className="w-full md:w-1/2 relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-[#DBAA47] transition-colors">Rp</span>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={pmt}
                                onChange={handleInputChange(setPmt)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/30 focus:border-[#DBAA47] focus:bg-white transition-all duration-300"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('pmt')}
                            className="w-full md:w-1/4 bg-[#0B1727] text-white py-3 px-4 rounded-xl font-medium shadow-md hover:bg-[#DBAA47] hover:text-[#0B1727] hover:shadow-lg hover:shadow-[#DBAA47]/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Solve PMT
                        </button>
                    </div>

                    {/* INPUT ROW: FV */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <label className="w-full md:w-1/3 text-slate-700 font-semibold text-sm tracking-wide">Future Value</label>
                        <div className="w-full md:w-1/2 relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-[#DBAA47] transition-colors">Rp</span>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={fv}
                                onChange={handleInputChange(setFv)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/30 focus:border-[#DBAA47] focus:bg-white transition-all duration-300"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('fv')}
                            className="w-full md:w-1/4 bg-[#0B1727] text-white py-3 px-4 rounded-xl font-medium shadow-md hover:bg-[#DBAA47] hover:text-[#0B1727] hover:shadow-lg hover:shadow-[#DBAA47]/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Solve FV
                        </button>
                    </div>

                    {/* INPUT ROW: RATE */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <label className="w-full md:w-1/3 text-slate-700 font-semibold text-sm tracking-wide">Annual Rate</label>
                        <div className="w-full md:w-1/2 relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-[#DBAA47] transition-colors">%</span>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={rate}
                                onChange={handleInputChange(setRate)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/30 focus:border-[#DBAA47] focus:bg-white transition-all duration-300"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('rate')}
                            className="w-full md:w-1/4 bg-[#0B1727] text-white py-3 px-4 rounded-xl font-medium shadow-md hover:bg-[#DBAA47] hover:text-[#0B1727] hover:shadow-lg hover:shadow-[#DBAA47]/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Solve Rate
                        </button>
                    </div>

                    {/* INPUT ROW: PERIODS */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <label className="w-full md:w-1/3 text-slate-700 font-semibold text-sm tracking-wide">Periods</label>
                        <div className="w-full md:w-1/2 relative group">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={periods}
                                onChange={handleInputChange(setPeriods)}
                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/30 focus:border-[#DBAA47] focus:bg-white transition-all duration-300"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('periods')}
                            className="w-full md:w-1/4 bg-[#0B1727] text-white py-3 px-4 rounded-xl font-medium shadow-md hover:bg-[#DBAA47] hover:text-[#0B1727] hover:shadow-lg hover:shadow-[#DBAA47]/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Solve Period
                        </button>
                    </div>
                </div>

                <div className="mt-10 space-y-6 border-t border-slate-100 pt-8">
                    {/* OPTIONS: MODE */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <label className="w-full md:w-1/3 text-slate-700 font-semibold text-sm tracking-wide">Payment Mode</label>
                        <div className="w-full md:w-2/3 flex items-center gap-8">
                            <label className="flex items-center gap-3 cursor-pointer group p-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="radio" 
                                        name="mode" 
                                        checked={mode === 'end'} 
                                        onChange={() => setMode('end')}
                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-[#DBAA47] group-hover:border-[#DBAA47] group-hover:shadow-[0_0_8px_rgba(219,170,71,0.5)] transition-all duration-300 cursor-pointer" 
                                    />
                                    <div className="absolute w-2.5 h-2.5 bg-[#DBAA47] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                                </div>
                                <span className="text-slate-600 font-medium group-hover:text-[#0B1727] transition-colors">End</span>
                            </label>
                            
                            <label className="flex items-center gap-3 cursor-pointer group p-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="radio" 
                                        name="mode" 
                                        checked={mode === 'beginning'} 
                                        onChange={() => setMode('beginning')}
                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-[#DBAA47] group-hover:border-[#DBAA47] group-hover:shadow-[0_0_8px_rgba(219,170,71,0.5)] transition-all duration-300 cursor-pointer" 
                                    />
                                    <div className="absolute w-2.5 h-2.5 bg-[#DBAA47] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                                </div>
                                <span className="text-slate-600 font-medium group-hover:text-[#0B1727] transition-colors">Beginning</span>
                            </label>
                        </div>
                    </div>

                    {/* OPTIONS: DECIMALS */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <label className="w-full md:w-1/3 text-slate-700 font-semibold text-sm tracking-wide">Decimal Digit</label>
                        <div className="w-full md:w-2/3 flex flex-wrap items-center gap-6">
                            {[2, 3, 4, 5].map((num) => (
                                <label key={num} className="flex items-center gap-3 cursor-pointer group p-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="relative flex items-center justify-center">
                                        <input 
                                            type="radio" 
                                            name="decimals" 
                                            checked={decimals === num} 
                                            onChange={() => setDecimals(num)}
                                            className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-[#DBAA47] group-hover:border-[#DBAA47] group-hover:shadow-[0_0_8px_rgba(219,170,71,0.5)] transition-all duration-300 cursor-pointer" 
                                        />
                                        <div className="absolute w-2.5 h-2.5 bg-[#DBAA47] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                                    </div>
                                    <span className="capitalize text-slate-600 font-medium group-hover:text-[#0B1727] transition-colors">
                                        {num === 2 ? 'Two' : num === 3 ? 'Three' : num === 4 ? 'Four' : 'Five'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RESET BUTTON */}
                <div className="mt-10 pt-6 border-t border-slate-100">
                    <button
                        onClick={handleReset}
                        className="bg-slate-100 text-slate-600 py-3 px-10 rounded-xl font-semibold hover:bg-slate-200 hover:text-slate-800 transition-colors"
                    >
                        Reset Kalkulator
                    </button>
                </div>

            </div>
        </div>
    );
}