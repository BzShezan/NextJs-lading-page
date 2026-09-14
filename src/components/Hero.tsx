"use client";
import type { HeroData } from "@/lib/types";
import { motion } from "framer-motion";

export default function Hero({ data }: { data: HeroData }) {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${data.image || "/images/hero.jpg"})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-white px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          {data.title}
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto text-stone-200">
          {data.subtitle}
        </p>
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="bg-amber-700 hover:bg-amber-600 px-7 py-3 rounded-full font-medium transition"
          >
            {data.cta1}
          </a>
          <a
            href="#contact"
            className="border border-white/70 px-7 py-3 rounded-full font-medium hover:bg-white hover:text-stone-900 transition"
          >
            {data.cta2}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
