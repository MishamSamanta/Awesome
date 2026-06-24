import React from 'react';
import { motion } from 'motion/react';

interface SectionQuoteProps {
  quote: string;
  id?: string;
}

export default function SectionQuote({ quote, id }: SectionQuoteProps) {
  return (
    <div id={id} className="py-24 md:py-32 flex justify-center px-6 border-y border-[#18181b]/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl text-center"
      >
        <p className="font-display text-xl md:text-3xl font-light italic text-[#f4f4f6]/90 leading-relaxed tracking-wide">
          "{quote}"
        </p>
      </motion.div>
    </div>
  );
}
