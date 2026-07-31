'use client';

import { useState, useEffect } from 'react';
import { ForYouView } from '../components/sections/Home/ForYouView';
import { ForBusinessView } from '../components/sections/Home/ForBusinessView';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('individu');

  useEffect(() => {
    const checkTab = () => {
      const match = document.cookie.match(new RegExp('(^| )cerdas_keuangan_tab=([^;]+)'));
      if (match?.[2]) {
        setActiveTab(match[2]);
      }
    };

    checkTab();
    const interval = setInterval(checkTab, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-pureWhite">
      {activeTab === 'perusahaan' ? <ForBusinessView /> : <ForYouView />}
    </div>
  );
}

export function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-goldAccent) 0%, transparent 70%)' }}
    />
  );
}





