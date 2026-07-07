'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 1450);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#08120d]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.12),transparent_34%),linear-gradient(135deg,rgba(16,38,29,0.86),rgba(3,15,9,1))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 flex h-14 w-14 rotate-45 items-center justify-center border border-[#d4af37]/70 shadow-[0_0_40px_rgba(212,175,55,0.12)]">
              <span className="h-full w-px bg-[#d4af37]/75" />
              <span className="absolute h-px w-full bg-[#d4af37]/75" />
            </div>

            <div className="leading-none tracking-[0.16em]">
              <motion.div
                className="text-[42px] font-medium uppercase text-[#f5f0e8] sm:text-6xl"
                initial={{ opacity: 0, letterSpacing: '0.24em' }}
                animate={{ opacity: 1, letterSpacing: '0.16em' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Miraki
              </motion.div>
              <motion.div
                className="mt-2 text-[36px] font-medium uppercase text-[#d4af37] sm:text-5xl"
                initial={{ opacity: 0, letterSpacing: '0.24em' }}
                animate={{ opacity: 1, letterSpacing: '0.18em' }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                Gardens
              </motion.div>
            </div>

            <div className="mt-9 h-px w-56 overflow-hidden rounded-full bg-[#f5f0e8]/12 sm:w-72">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>

            <motion.p
              className="mt-5 font-[family-name:var(--font-montserrat)] text-[10px] uppercase tracking-[0.32em] text-[#f5f0e8]/48"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.35 }}
            >
              Shahrisabz mountain retreat
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
