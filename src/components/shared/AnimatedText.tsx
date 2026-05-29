"use client";

import { motion, useReducedMotion } from "framer-motion";
import { wordReveal, staggerContainer } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimatedText({ text, className = "", delay = 0, once = true }: AnimatedTextProps) {
  const shouldReduce = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      style={{ transitionDelay: `${delay}s` }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span className="inline-block" variants={wordReveal}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
