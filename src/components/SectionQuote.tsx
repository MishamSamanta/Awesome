import React from 'react';
import { motion } from 'motion/react';

interface SectionQuoteProps {
  quote: string;
  id?: string;
}

export default function SectionQuote({ quote, id }: SectionQuoteProps) {
  return (
    <div id={id} className="py-12 md:py-16 max-w-7xl mx-auto w-full px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0f0f13]/30 px-8 py-16 md:px-16 md:py-24 text-center backdrop-blur-2xl flex flex-col items-center justify-center w-full shadow-[0_30px_70px_rgba(0,0,0,0.8),0_15px_30px_rgba(255,255,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.2)]"
      >
        {/* Subtle vertical grid lines background overlay */}
        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-80">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="border-r border-white/[0.12] h-full" />
          ))}
        </div>

        {/* Rich green glow gradient inspired by the reference image's left-heavy light leak */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] bg-[#d2ff00]/[0.18] rounded-full filter blur-[100px] pointer-events-none -translate-x-1/3" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#d2ff00]/[0.06] rounded-full filter blur-[80px] pointer-events-none translate-y-1/3" />

        <p className="relative z-10 font-display text-2xl md:text-5xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl px-4">
          {quote}
        </p>
      </motion.div>
    </div>
  );
}
