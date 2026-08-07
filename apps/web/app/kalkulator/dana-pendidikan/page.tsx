'use client';

import React, { useState } from 'react';

export default function DanaPendidikanPage() {
    // ==========================================
    // STATE: GLOBAL INPUTS
    // ==========================================
    const [inflationRate, setInflationRate] = useState<string>('');
    const [currentAge, setCurrentAge] = useState<string>('');
    const [returnRate, setReturnRate] = useState<string>('');

    // ==========================================
    // STATE: TABLE ROWS
    // ==========================================
    const [rows, setRows] = useState([
        { id: 'sd', label: 'SD', targetAge: '', fee: '', type: 'fixed', multiplier: 72 },
        { id: 'smp', label: 'SMP', targetAge: '', fee: '', type: 'fixed', multiplier: 36 },
        { id: 'sma', label: 'SMA', targetAge: '', fee: '', type: 'fixed', multiplier: 36 },
        { id: 'kuliah', label: 'Kuliah', targetAge: '', fee: '', type: 'radio', radioVal: 8 }, // Default 8 (S1)
        { id: 's2', label: 'S2', targetAge: '', fee: '', type: 'fixed', multiplier: 4 },
    ]);

    // ==========================================
    // UTILITIES: FORMATTERS
    // ==========================================
    const formatNumber = (value: string | number) => {
        if (value === '' || value === null || value === undefined) return '';
        let valString = value.toString();
        let cleanVal = valString.replace(/[^\d.-]/g, '');

        const isNegative = cleanVal.startsWith('-');
        cleanVal = cleanVal.replace(/-/g, '');
        if (isNegative) cleanVal = '-' + cleanVal;

        const parts = cleanVal.split('.');
        let integerPart = parts[0] || ''; 
        const decimalPart = parts.length > 1 ? '.' + parts.slice(1).join('') : '';

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return integerPart + decimalPart;
    };

    const parseNumber = (value: string) => {
        if (!value) return 0;
        const cleanVal = value.replace(/,/g, '');
        return parseFloat(cleanVal) || 0;
    };

    // Format angka hasil kalkulasi dengan 4 desimal & pemisah ribuan
    const formatResult = (value: number) => {
        if (isNaN(value) || value === 0) return '0.0000';
        const fixed = value.toFixed(4);
        const parts = fixed.split('.');
        let integerPart = parts[0] || '0';
        const decimalPart = parts[1] || '0000';
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${integerPart}.${decimalPart}`;
    };

    // ==========================================
    // HANDLERS
    // ==========================================
    const handleRowChange = (index: number, field: 'targetAge' | 'fee', value: string) => {
        const newRows = [...rows];
        if (newRows[index]) {
            newRows[index][field] = formatNumber(value);
            setRows(newRows);
        }
    };

    const handleRadioChange = (index: number, value: number) => {
        const newRows = [...rows];
        if (newRows[index]) {
            newRows[index].radioVal = value;
            setRows(newRows);
        }
    };

    const handleReset = () => {
        setInflationRate('');
        setCurrentAge('');
        setReturnRate('');
        setRows([
            { id: 'sd', label: 'SD', targetAge: '', fee: '', type: 'fixed', multiplier: 72 },
            { id: 'smp', label: 'SMP', targetAge: '', fee: '', type: 'fixed', multiplier: 36 },
            { id: 'sma', label: 'SMA', targetAge: '', fee: '', type: 'fixed', multiplier: 36 },
            { id: 'kuliah', label: 'Kuliah', targetAge: '', fee: '', type: 'radio', radioVal: 8 },
            { id: 's2', label: 'S2', targetAge: '', fee: '', type: 'fixed', multiplier: 4 },
        ]);
    };

    // ==========================================
    // MATH ENGINE
    // ==========================================
    const calcGlobal = {
        age: parseNumber(currentAge),
        inf: parseNumber(inflationRate) / 100,
        ret: parseNumber(returnRate) / 100,
    };

    let totalBiayaSaatIni = 0;
    let totalDanaInflasi = 0;
    let totalDanaSekarang = 0;
    let totalInvestTahunan = 0;
    let totalInvestBulanan = 0;

    const calculatedRows = rows.map((row) => {
        const tAge = parseNumber(row.targetAge);
        const fee = parseNumber(row.fee);
        const mult = row.type === 'fixed' ? row.multiplier : row.radioVal;
        
        // 1. Total Biaya SPP = Fee * Multiplier
        const currentTotal = fee * (mult || 0);

        // 2. Jangka waktu persiapan (dlm tahun)
        const yearsToPrep = tAge > calcGlobal.age ? tAge - calcGlobal.age : 0;

        // 3. Biaya total setelah inflasi (FV) berdasar Total Biaya SPP
        const fvCost = yearsToPrep > 0 ? currentTotal * Math.pow(1 + calcGlobal.inf, yearsToPrep) : currentTotal;

        // 4. Dana yang diperlukan sekarang (PV)
        const pvCost = yearsToPrep > 0 ? fvCost / Math.pow(1 + calcGlobal.ret, yearsToPrep) : fvCost;

        // 5. Dana investasi tahunan (PMT Tahunan)
        let pmtYearly = 0;
        if (yearsToPrep > 0 && fvCost > 0) {
            if (calcGlobal.ret === 0) {
                pmtYearly = fvCost / yearsToPrep;
            } else {
                pmtYearly = (fvCost * calcGlobal.ret) / (Math.pow(1 + calcGlobal.ret, yearsToPrep) - 1);
            }
        }

        // 6. Dana investasi bulanan (PMT Bulanan)
        let pmtMonthly = 0;
        const monthsToPrep = yearsToPrep * 12;
        const retMonthly = calcGlobal.ret / 12;
        if (monthsToPrep > 0 && fvCost > 0) {
            if (retMonthly === 0) {
                pmtMonthly = fvCost / monthsToPrep;
            } else {
                pmtMonthly = (fvCost * retMonthly) / (Math.pow(1 + retMonthly, monthsToPrep) - 1);
            }
        }

        // Accumulate totals
        totalBiayaSaatIni += currentTotal;
        totalDanaInflasi += fvCost;
        totalDanaSekarang += pvCost;
        totalInvestTahunan += pmtYearly;
        totalInvestBulanan += pmtMonthly;

        return {
            ...row,
            currentTotal,
            yearsToPrep,
            fvCost,
            pvCost,
            pmtYearly,
            pmtMonthly
        };
    });

    // ==========================================
    // UI COMPONENTS
    // ==========================================
    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-[1450px] mx-auto bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                
                {/* Header Section */}
                <div className="bg-[#0B1727] px-8 py-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#DBAA47] opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Dana Pendidikan
                        </h1>
                        <p className="text-slate-400 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
                            Proyeksikan kebutuhan dana pendidikan anak Anda di masa depan dengan standar perhitungan finansial profesional.
                        </p>
                    </div>
                </div>

                <div className="p-8 sm:p-10 lg:p-12 space-y-12">
                    
                    {/* GLOBAL INPUTS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="space-y-2">
                            <label className="text-slate-700 font-semibold text-sm tracking-wide">Inflasi biaya pendidikan</label>
                            <div className="relative group">
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-[#DBAA47] transition-colors">%</span>
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={inflationRate}
                                    onChange={(e) => setInflationRate(formatNumber(e.target.value))}
                                    placeholder="Contoh: 8"
                                    className="w-full px-5 py-3 pr-10 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/50 focus:border-[#DBAA47] transition-all duration-300 font-mono text-lg font-medium text-[#0B1727]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-700 font-semibold text-sm tracking-wide">Usia anak saat ini</label>
                            <div className="relative group">
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-[#DBAA47] transition-colors">Tahun</span>
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={currentAge}
                                    onChange={(e) => setCurrentAge(formatNumber(e.target.value))}
                                    placeholder="Contoh: 3"
                                    className="w-full px-5 py-3 pr-16 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/50 focus:border-[#DBAA47] transition-all duration-300 font-mono text-lg font-medium text-[#0B1727]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-700 font-semibold text-sm tracking-wide">Ekspektasi imbal hasil yang diinginkan</label>
                            <div className="relative group">
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-[#DBAA47] transition-colors">%</span>
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={returnRate}
                                    onChange={(e) => setReturnRate(formatNumber(e.target.value))}
                                    placeholder="Contoh: 10"
                                    className="w-full px-5 py-3 pr-10 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/50 focus:border-[#DBAA47] transition-all duration-300 font-mono text-lg font-medium text-[#0B1727]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* TABLE SECTION */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                        <table className="w-full text-left border-collapse min-w-[1250px]">
                            <thead>
                                <tr className="bg-[#0B1727] text-white">
                                    <th className="py-4 px-4 font-semibold text-sm tracking-wide border-b border-slate-700 w-44">Jenjang pendidikan</th>
                                    <th className="py-4 px-4 font-semibold text-sm tracking-wide border-b border-slate-700 border-l border-slate-700/50 w-32">Usia Masuk</th>
                                    <th className="py-4 px-4 font-semibold text-sm tracking-wide border-b border-slate-700 border-l border-slate-700/50 w-48">Biaya SPP/Smt (Rp)</th>
                                    <th className="py-4 px-4 font-semibold text-sm tracking-wide border-b border-slate-700 border-l border-slate-700/50 bg-[#152A4A]/50 text-[#DBAA47] w-40 text-right">Total Biaya SPP</th>
                                    <th className="py-4 px-4 font-semibold text-sm tracking-wide border-b border-slate-700 border-l border-slate-700/50 w-28 text-center">Waktu Persiapan</th>
                                    <th className="py-4 px-4 font-semibold text-sm tracking-wide border-b border-slate-700 border-l border-slate-700/50">Biaya Total Setelah Inflasi</th>
                                    <th className="py-4 px-4 font-semibold text-sm tracking-wide border-b border-slate-700 border-l border-slate-700/50">Dana Yg Diperlukan Sekarang</th>
                                    <th className="py-4 px-4 font-semibold text-sm tracking-wide border-b border-slate-700 border-l border-slate-700/50">Dana Yg Diinvest Setiap Tahun</th>
                                    <th className="py-4 px-4 font-semibold text-sm tracking-wide border-b border-slate-700 border-l border-slate-700/50">Dana Yg Diinvest Setiap Bulan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {calculatedRows.map((row, idx) => (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                        
                                        {/* JENJANG PENDIDIKAN */}
                                        <td className="py-4 px-4 align-middle">
                                            <div className="font-bold text-[#0B1727]">{row.label}</div>
                                            {row.type === 'radio' && (
                                                <div className="mt-2 flex items-center gap-3">
                                                    <label className="flex items-center gap-1.5 cursor-pointer group">
                                                        <input 
                                                            type="radio" 
                                                            checked={row.radioVal === 6} 
                                                            onChange={() => handleRadioChange(idx, 6)}
                                                            className="appearance-none w-3.5 h-3.5 border-2 border-slate-300 rounded-full checked:border-[#DBAA47] checked:bg-[#DBAA47] group-hover:border-[#DBAA47] transition-all cursor-pointer shadow-sm" 
                                                        />
                                                        <span className="text-[11px] font-semibold text-slate-500 group-hover:text-[#0B1727]">D3 (6 Smt)</span>
                                                    </label>
                                                    <label className="flex items-center gap-1.5 cursor-pointer group">
                                                        <input 
                                                            type="radio" 
                                                            checked={row.radioVal === 8} 
                                                            onChange={() => handleRadioChange(idx, 8)}
                                                            className="appearance-none w-3.5 h-3.5 border-2 border-slate-300 rounded-full checked:border-[#DBAA47] checked:bg-[#DBAA47] group-hover:border-[#DBAA47] transition-all cursor-pointer shadow-sm" 
                                                        />
                                                        <span className="text-[11px] font-semibold text-slate-500 group-hover:text-[#0B1727]">S1 (8 Smt)</span>
                                                    </label>
                                                </div>
                                            )}
                                            {row.type === 'fixed' && (
                                                <div className="text-[10px] text-slate-400 mt-0.5 uppercase font-bold tracking-wider">
                                                    {row.multiplier} {row.id === 's2' ? 'Semester' : 'Bulan'}
                                                </div>
                                            )}
                                        </td>

                                        {/* USIA MASUK (INPUT) */}
                                        <td className="py-4 px-4 border-l border-slate-100 align-middle">
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={row.targetAge}
                                                onChange={(e) => handleRowChange(idx, 'targetAge', e.target.value)}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/50 focus:border-[#DBAA47] text-center font-mono font-medium text-[#0B1727]"
                                            />
                                        </td>

                                        {/* BIAYA SPP (INPUT) */}
                                        <td className="py-4 px-4 border-l border-slate-100 align-middle">
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={row.fee}
                                                onChange={(e) => handleRowChange(idx, 'fee', e.target.value)}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBAA47]/50 focus:border-[#DBAA47] text-right font-mono font-medium text-[#0B1727]"
                                            />
                                        </td>

                                        {/* TOTAL BIAYA SPP (CALCULATED) */}
                                        <td className="py-4 px-4 border-l border-slate-100 bg-amber-50/20 align-middle text-right font-mono font-bold text-[#0B1727]">
                                            {formatNumber(row.currentTotal.toFixed(0))}
                                        </td>

                                        {/* WAKTU PERSIAPAN (CALCULATED) */}
                                        <td className="py-4 px-4 border-l border-slate-100 align-middle text-center font-mono text-slate-600 font-medium">
                                            {row.yearsToPrep} thn
                                        </td>

                                        {/* BIAYA TOTAL SETELAH INFLASI (CALCULATED) */}
                                        <td className="py-4 px-4 border-l border-slate-100 align-middle text-right font-mono text-slate-700">
                                            {formatResult(row.fvCost)}
                                        </td>

                                        {/* DANA YG DIPERLUKAN SEKARANG (CALCULATED) */}
                                        <td className="py-4 px-4 border-l border-slate-100 align-middle text-right font-mono text-slate-700">
                                            {formatResult(row.pvCost)}
                                        </td>

                                        {/* DANA YG DIINVEST SETIAP TAHUN (CALCULATED) */}
                                        <td className="py-4 px-4 border-l border-slate-100 align-middle text-right font-mono text-blue-700 font-medium">
                                            {formatResult(row.pmtYearly)}
                                        </td>

                                        {/* DANA YG DIINVEST SETIAP BULAN (CALCULATED) */}
                                        <td className="py-4 px-4 border-l border-slate-100 align-middle text-right font-mono text-green-700 font-bold">
                                            {formatResult(row.pmtMonthly)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            
                            {/* TOTAL FOOTER ROW */}
                            <tfoot>
                                <tr className="bg-slate-100 border-t-2 border-slate-200 font-bold text-[#0B1727]">
                                    <td colSpan={3} className="py-5 px-4 text-right uppercase tracking-widest text-sm">
                                        Total
                                    </td>
                                    <td className="py-5 px-4 border-l border-slate-200 text-right font-mono text-base text-[#DBAA47]">
                                        {formatNumber(totalBiayaSaatIni.toFixed(0))}
                                    </td>
                                    <td className="py-5 px-4 border-l border-slate-200 bg-slate-100"></td>
                                    <td className="py-5 px-4 border-l border-slate-200 text-right font-mono text-base">
                                        {formatResult(totalDanaInflasi)}
                                    </td>
                                    <td className="py-5 px-4 border-l border-slate-200 text-right font-mono text-base">
                                        {formatResult(totalDanaSekarang)}
                                    </td>
                                    <td className="py-5 px-4 border-l border-slate-200 text-right font-mono text-blue-700 text-base">
                                        {formatResult(totalInvestTahunan)}
                                    </td>
                                    <td className="py-5 px-4 border-l border-slate-200 text-right font-mono text-green-700 text-lg">
                                        {formatResult(totalInvestBulanan)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* RESET BUTTON */}
                    <div className="pt-4 flex justify-end">
                        <button
                            onClick={handleReset}
                            className="bg-slate-100 text-slate-600 py-3 px-8 rounded-xl font-bold hover:bg-slate-200 hover:text-slate-900 transition-colors uppercase tracking-widest text-xs"
                        >
                            Reset Kalkulator
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}