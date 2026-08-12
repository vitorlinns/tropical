"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Plane } from "lucide-react";
import Image from "next/image";
import { destinations, type Destination } from "@/lib/data/destinations";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { fadeUp } from "@/lib/animations";
import { DestinationDrawer } from "@/components/shared/DestinationDrawer";
import { fmtNumber } from "@/lib/utils";

export function Destinations() {
  const shouldReduce = useReducedMotion();
  const [selected, setSelected] = useState<Destination | null>(null);

  return (
    <section id="destinos" className="py-28 bg-white" aria-labelledby="dest-title">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <h2 id="dest-title" className="font-display font-bold text-4xl md:text-5xl text-[#111111] leading-tight">
            <AnimatedText text="Para onde você " className="block" />
            <AnimatedText text="quer voar?" className="text-[#FF6B35] block" delay={0.1} />
          </h2>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          role="list"
          aria-label="Lista de destinos"
        >
          {destinations.map((dest, i) => (
            <motion.article
              key={dest.id}
              role="listitem"
              variants={shouldReduce ? {} : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i * 0.07}
              className={`card overflow-hidden group cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""} ${i === 8 ? "hidden md:block" : ""}`}
              onClick={() => setSelected(dest)}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(dest); } }}
              aria-label={`Ver voos para ${dest.city}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "h-44 md:h-full md:min-h-[280px]" : "h-44"}`}>
                <Image
                  src={dest.imageUrl}
                  alt={`${dest.city}, ${dest.country}`}
                  fill
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={i < 2 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    dest.directFlight
                      ? "bg-[#FF6B35] text-white"
                      : "bg-black/40 text-white/80 backdrop-blur-sm"
                  }`}>
                    {dest.directFlight ? "Direto" : "Com escala"}
                  </span>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-display font-bold text-white text-lg leading-tight">{dest.city}</p>
                      <p className="text-white/70 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin size={10} aria-hidden="true" />
                        {dest.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold text-sm flex items-center gap-1">
                        <Plane size={12} aria-hidden="true" />
                        {fmtNumber(dest.miles)}
                      </p>
                      <p className="text-white/60 text-xs">milhas</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      <DestinationDrawer destination={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
