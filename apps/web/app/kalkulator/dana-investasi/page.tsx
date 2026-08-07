'use client';

import React, { useState } from 'react';

export default function TimeValueOfMoneyPage() {
    // State untuk ke-5 variabel utama
    const [pv, setPv] = useState<string>('');
    const [pmt, setPmt] = useState<string>('');
    const [fv, setFv] = useState<string>('');
    const [rate, setRate] = useState<string>('');
    const [periods, setPeriods] = useState<string>('');

    // State untuk opsi kalkulator
    const [mode, setMode] = useState<'end' | 'beginning'>('end');
    const [decimals, setDecimals] = useState<number>(2);

    // ==========================================
    // MESIN MATEMATIKA (TVM ENGINE)
    // ==========================================
    
    // Fungsi pembantu untuk faktor anuitas
    const getAnnuityFactor = (r: number, n: number, t: number) => {
        if (r === 0) return n;
        return ((Math.pow(1 + r, n) - 1) / r) * (1 + r * t);
    };

    // Algoritma Newton-Raphson untuk mencari Rate (r) iteratif
    const solveRate = (p: number, m: number, f: number, n: number, t: number) => {
        if (n === 0) return 0;
        
        const MAX_ITER = 1000;
        const TOLERANCE = 1e-7;
        let r_guess = 0.1; // Tebakan awal 10%
        
        // Persamaan f(r) = 0
        const g = (r: number) => {
            if (r === 0) return p + m * n - f;
            let A = (m / r) * (1 + r * t);
            return p * Math.pow(1 + r, n) + A * (Math.pow(1 + r, n) - 1) - f;
        };
        
        for (let i = 0; i < MAX_ITER; i++) {
            let val = g(r_guess);
            if (Math.abs(val) < TOLERANCE) return r_guess;
            
            // Finite difference untuk mendapatkan turunan f'(r)
            const h = 1e-6;
            let diff = (g(r_guess + h) - g(r_guess - h)) / (2 * h);
            
            if (diff === 0) break; 
            r_guess = r_guess - val / diff;
        }
        return r_guess;
    };

    // Fungsi utama eksekusi tombol "Solve"
    const handleSolve = (target: 'pv' | 'pmt' | 'fv' | 'rate' | 'periods') => {
        const p = parseFloat(pv) || 0;
        const m = parseFloat(pmt) || 0;
        const f = parseFloat(fv) || 0;
        const r = (parseFloat(rate) || 0) / 100;
        const n = parseFloat(periods) || 0;
        const t = mode === 'end' ? 0 : 1;

        switch (target) {
            case 'fv':
                const fvRes = p * Math.pow(1 + r, n) + m * getAnnuityFactor(r, n, t);
                setFv(fvRes.toFixed(decimals));
                break;

            case 'pv':
                const pvRes = (f - m * getAnnuityFactor(r, n, t)) / Math.pow(1 + r, n);
                setPv(pvRes.toFixed(decimals));
                break;

            case 'pmt':
                const af = getAnnuityFactor(r, n, t);
                const pmtRes = af === 0 ? 0 : (f - p * Math.pow(1 + r, n)) / af;
                setPmt(pmtRes.toFixed(decimals));
                break;

            case 'periods':
                let nRes = 0;
                if (r === 0) {
                    nRes = m === 0 ? 0 : (f - p) / m;
                } else {
                    const A = (m / r) * (1 + r * t);
                    const num = f + A;
                    const den = p + A;
                    if (num <= 0 || den <= 0) {
                        alert("Kombinasi input tidak valid untuk mencari Periode secara rasional.");
                        return;
                    }
                    nRes = Math.log(num / den) / Math.log(1 + r);
                }
                setPeriods(nRes.toFixed(decimals));
                break;

            case 'rate':
                const rRes = solveRate(p, m, f, n, t) * 100;
                if (isNaN(rRes) || !isFinite(rRes)) {
                    alert("Kombinasi input tidak valid atau Rate tidak dapat dikalkulasikan.");
                } else {
                    setRate(rRes.toFixed(decimals));
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
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
            
            <div className="max-w-4xl mx-auto bg-[#F7F9FB] rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                <h1 className="text-3xl font-semibold text-[#324b61] mb-10">
                    Time Value of Money
                </h1>

                <div className="space-y-4">
                    {/* INPUT ROW: PV */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="w-full md:w-1/3 text-gray-700 font-medium">Present Value</label>
                        <div className="w-full md:w-1/2 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                            <input
                                type="number"
                                step="any"
                                value={pv}
                                onChange={(e) => setPv(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('pv')}
                            className="w-full md:w-1/4 bg-[#D33B49] text-white py-2 px-4 rounded-md font-medium hover:bg-[#b8313e] transition-colors"
                        >
                            Solve PV
                        </button>
                    </div>

                    {/* INPUT ROW: PMT */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="w-full md:w-1/3 text-gray-700 font-medium">Payments</label>
                        <div className="w-full md:w-1/2 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                            <input
                                type="number"
                                step="any"
                                value={pmt}
                                onChange={(e) => setPmt(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('pmt')}
                            className="w-full md:w-1/4 bg-[#D33B49] text-white py-2 px-4 rounded-md font-medium hover:bg-[#b8313e] transition-colors"
                        >
                            Solve PMT
                        </button>
                    </div>

                    {/* INPUT ROW: FV */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="w-full md:w-1/3 text-gray-700 font-medium">Future Value</label>
                        <div className="w-full md:w-1/2 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                            <input
                                type="number"
                                step="any"
                                value={fv}
                                onChange={(e) => setFv(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('fv')}
                            className="w-full md:w-1/4 bg-[#D33B49] text-white py-2 px-4 rounded-md font-medium hover:bg-[#b8313e] transition-colors"
                        >
                            Solve FV
                        </button>
                    </div>

                    {/* INPUT ROW: RATE */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="w-full md:w-1/3 text-gray-700 font-medium">Annual Rate</label>
                        <div className="w-full md:w-1/2 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                            <input
                                type="number"
                                step="any"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('rate')}
                            className="w-full md:w-1/4 bg-[#D33B49] text-white py-2 px-4 rounded-md font-medium hover:bg-[#b8313e] transition-colors"
                        >
                            Solve Rate
                        </button>
                    </div>

                    {/* INPUT ROW: PERIODS */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="w-full md:w-1/3 text-gray-700 font-medium">Periods</label>
                        <div className="w-full md:w-1/2">
                            <input
                                type="number"
                                step="any"
                                value={periods}
                                onChange={(e) => setPeriods(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>
                        <button
                            onClick={() => handleSolve('periods')}
                            className="w-full md:w-1/4 bg-[#D33B49] text-white py-2 px-4 rounded-md font-medium hover:bg-[#b8313e] transition-colors"
                        >
                            Solve Period
                        </button>
                    </div>
                </div>

                <div className="mt-8 space-y-5 border-t border-gray-200 pt-6">
                    {/* OPTIONS: MODE */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="w-full md:w-1/3 text-gray-700 font-medium">Mode</label>
                        <div className="w-full md:w-2/3 flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="mode" 
                                    checked={mode === 'end'} 
                                    onChange={() => setMode('end')}
                                    className="w-4 h-4 text-[#D33B49] focus:ring-[#D33B49]" 
                                />
                                <span>End</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="mode" 
                                    checked={mode === 'beginning'} 
                                    onChange={() => setMode('beginning')}
                                    className="w-4 h-4 text-[#D33B49] focus:ring-[#D33B49]" 
                                />
                                <span>Beginning</span>
                            </label>
                        </div>
                    </div>

                    {/* OPTIONS: DECIMALS */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <label className="w-full md:w-1/3 text-gray-700 font-medium">Decimal Digit</label>
                        <div className="w-full md:w-2/3 flex flex-wrap items-center gap-4 md:gap-6">
                            {[2, 3, 4, 5].map((num) => (
                                <label key={num} className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="decimals" 
                                        checked={decimals === num} 
                                        onChange={() => setDecimals(num)}
                                        className="w-4 h-4 text-[#D33B49] focus:ring-[#D33B49]" 
                                    />
                                    <span className="capitalize">
                                        {num === 2 ? 'Two' : num === 3 ? 'Three' : num === 4 ? 'Four' : 'Five'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RESET BUTTON */}
                <div className="mt-8 pt-4">
                    <button
                        onClick={handleReset}
                        className="bg-[#D33B49] text-white py-2 px-8 rounded-md font-medium hover:bg-[#b8313e] transition-colors"
                    >
                        Reset
                    </button>
                </div>

            </div>
        </div>
    );
}