'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'max-w-md'
}: ModalProps) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`relative w-full ${maxWidth} bg-pureWhite rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]`}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-navyBlue/40 hover:text-navyBlue hover:bg-softSilver rounded-full transition-colors z-10"
                        >
                            <HiXMark className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {title && (
                            <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-softSilver shrink-0">
                                <h3 className="font-serif text-xl sm:text-2xl text-navyBlue font-bold pr-8">
                                    {title}
                                </h3>
                            </div>
                        )}

                        <div className="p-6 sm:p-8 overflow-y-auto scrollbar-hide">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}