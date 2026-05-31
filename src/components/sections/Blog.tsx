"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RiTimeLine, RiArrowRightLine, RiMapPinLine } from "@remixicon/react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { fadeUp } from "@/lib/animations";
import { colors } from "@/lib/colors";

const posts = [
  {
    tag: "Guia de milhas",
    tagColor: colors.brand,
    title: "Como usar milhas do cartão de crédito para voar pela metade do preço",
    excerpt:
      "Você sabia que as milhas acumuladas no seu cartão podem cobrir até 100% da passagem? Descubra como transferir pontos, escolher a melhor data e garantir a emissão sem estresse.",
    readTime: "5 min de leitura",
    destination: "Brasil",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    topics: ["Smiles", "LATAM Pass", "TudoAzul"],
  },
  {
    tag: "Destino",
    tagColor: "#0EA5E9",
    title: "Europa com milhas: os melhores destinos para voar saindo do Brasil",
    excerpt:
      "Lisboa, Paris, Roma ou Amsterdã? Comparamos o custo em milhas para cada rota, as melhores companhias para cada destino e as épocas com mais disponibilidade de assentos.",
    readTime: "8 min de leitura",
    destination: "Europa",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    topics: ["Lisboa", "Paris", "Roma"],
  },
  {
    tag: "Dica rápida",
    tagColor: "#10B981",
    title: "Milhas vencendo? Veja como resgatar antes de perder tudo",
    excerpt:
      "Programas de fidelidade têm prazo de validade. Se você está com milhas prestes a vencer, ainda dá tempo: conheça as opções de resgate de última hora e não deixe seus pontos expirarem.",
    readTime: "3 min de leitura",
    destination: "Qualquer destino",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    topics: ["Livelo", "Nubank", "Itaú"],
  },
];

export function Blog() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="blog" className="py-28 bg-white" aria-labelledby="blog-title">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <h2
              id="blog-title"
              className="font-display font-bold text-4xl md:text-5xl leading-tight"
              style={{ color: colors.ink }}
            >
              <AnimatedText text="Aprenda a viajar " className="block" />
              <AnimatedText text="mais por menos." className="block text-[#FF6B35]" delay={0.1} />
            </h2>
            <p className="mt-4 text-base max-w-md" style={{ color: colors.muted }}>
              Dicas, guias e estratégias para usar suas milhas da melhor forma possível.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 transition-opacity hover:opacity-70 focus-visible:outline-none"
            style={{ color: colors.brand }}
          >
            Ver todos os artigos
            <RiArrowRightLine size={15} aria-hidden="true" />
          </a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              variants={shouldReduce ? {} : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i * 0.1}
              className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.white }}
              tabIndex={0}
              aria-label={`Ler: ${post.title}`}
            >
              {/* Imagem */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Tag */}
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: post.tagColor }}
                >
                  {post.tag}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="flex flex-col flex-1 p-6">
                <h3
                  className="font-display font-bold text-lg leading-snug mb-3 transition-colors group-hover:text-[#FF6B35]"
                  style={{ color: colors.ink }}
                >
                  {post.title}
                </h3>

                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: colors.muted }}>
                  {post.excerpt}
                </p>

                {/* Tópicos */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: colors.surface, color: colors.ink3 }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Rodapé */}
                <div
                  className="flex items-center justify-between pt-4 -mx-6 px-6"
                  style={{ borderTop: `1px solid ${colors.border}` }}
                >
                  <div className="flex items-center gap-3 text-xs" style={{ color: colors.mutedLight }}>
                    <span className="flex items-center gap-1">
                      <RiTimeLine size={13} aria-hidden="true" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <RiMapPinLine size={13} aria-hidden="true" />
                      {post.destination}
                    </span>
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold transition-gap"
                    style={{ color: colors.brand }}
                  >
                    Ler
                    <RiArrowRightLine
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
