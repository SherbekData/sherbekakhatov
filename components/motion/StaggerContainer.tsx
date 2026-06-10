'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ViewportOptions = {
  once?: boolean;
  amount?: number | 'some' | 'all';
};

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  viewport?: ViewportOptions;
};

export function StaggerContainer({
  children,
  className,
  delayChildren = 0.12,
  staggerChildren = 0.1,
  viewport = { once: true, amount: 0.16 },
}: StaggerContainerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
