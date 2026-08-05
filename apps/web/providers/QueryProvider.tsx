'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0B132B', 
            color: '#FFFFFF', 
            border: '1px solid rgba(212, 175, 55, 0.3)',
            padding: '12px 18px',
            borderRadius: '12px',
            fontSize: '14px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37', 
              secondary: '#0B132B',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444', 
              secondary: '#FFFFFF',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}