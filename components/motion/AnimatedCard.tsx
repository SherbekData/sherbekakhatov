'use client';

import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
  lift?: number;
  style?: CSSProperties;
};

export function AnimatedCard({ children, className, lift = 6, style }: AnimatedCardProps) {
  return (
    <motion.div
      className={cn('will-change-transform', className)}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{ y: -lift }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
