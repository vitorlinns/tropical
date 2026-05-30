"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { List, ChevronDown, ArrowUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/colors";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageLayoutProps {
  badge: string;
  title: ReactNode;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export function LegalPageLayout({
  badge,
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageLayoutProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll-spy: destaca a seção visível no sumário.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Barra de progresso de leitura */}
      <motion.div
        style={{ scaleX: progress, backgroundColor: colors.brand }}
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left"
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
        style={{
          background: `linear-gradient(135deg, ${colors.brandLight} 0%, #ffffff 45%, ${colors.surface} 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(255,107,53,0.10)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm"
              style={{ color: colors.brand }}
            >
              {badge}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display mt-6 text-4xl font-bold leading-tight md:text-6xl"
              style={{ color: colors.ink }}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: colors.ink3 }}
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm"
              style={{ color: colors.ink, border: `1px solid ${colors.border}` }}
            >
              <Calendar className="h-4 w-4" style={{ color: colors.brand }} />
              Última atualização: {lastUpdated}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Sumário fixo (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <div
                  className="rounded-3xl bg-white/70 p-5 shadow-sm backdrop-blur-lg"
                  style={{ border: `1px solid ${colors.border}` }}
                >
                  <div className="mb-4 flex items-center gap-2 px-2">
                    <List className="h-4 w-4" style={{ color: colors.brand }} />
                    <span
                      className="font-display text-xs font-bold uppercase tracking-wider"
                      style={{ color: colors.ink }}
                    >
                      Sumário
                    </span>
                  </div>
                  <nav className="space-y-1">
                    {sections.map((s, i) => (
                      <TocItem
                        key={s.id}
                        index={i}
                        title={s.title}
                        active={activeId === s.id}
                        onClick={() => goTo(s.id)}
                      />
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Coluna de conteúdo */}
            <div className="min-w-0">
              {/* Sumário (mobile) */}
              <div className="sticky top-20 z-30 mb-8 lg:hidden">
                <button
                  onClick={() => setMobileOpen((o) => !o)}
                  className="flex w-full items-center justify-between rounded-2xl bg-white/90 px-5 py-4 shadow-sm backdrop-blur-lg"
                  style={{ border: `1px solid ${colors.border}` }}
                >
                  <span
                    className="font-display flex items-center gap-2 text-sm font-bold"
                    style={{ color: colors.ink }}
                  >
                    <List className="h-4 w-4" style={{ color: colors.brand }} /> Sumário
                  </span>
                  <ChevronDown
                    className={cn("h-5 w-5 transition-transform", mobileOpen && "rotate-180")}
                    style={{ color: colors.brand }}
                  />
                </button>
                <AnimatePresence>
                  {mobileOpen && (
                    <motion.nav
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden rounded-2xl bg-white shadow-md"
                      style={{ border: `1px solid ${colors.border}` }}
                    >
                      <div className="space-y-1 p-2">
                        {sections.map((s, i) => (
                          <TocItem
                            key={s.id}
                            index={i}
                            title={s.title}
                            active={activeId === s.id}
                            onClick={() => goTo(s.id)}
                          />
                        ))}
                      </div>
                    </motion.nav>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-6 md:space-y-8">
                {sections.map((s, i) => (
                  <motion.section
                    key={s.id}
                    id={s.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="scroll-mt-28 md:scroll-mt-32"
                  >
                    <div
                      className="relative rounded-3xl bg-white p-6 shadow-[0_1px_3px_rgba(17,17,17,0.04)] md:p-10"
                      style={{ border: `1px solid ${colors.border}` }}
                    >
                      <div className="mb-6 flex items-center gap-4">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold"
                          style={{
                            backgroundColor: colors.brandLight,
                            color: colors.ink,
                            border: `1px solid ${colors.brandMid}`,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2
                          className="font-display text-lg font-semibold md:text-xl"
                          style={{ color: colors.ink }}
                        >
                          {s.title}
                        </h2>
                      </div>
                      <div>{s.content}</div>
                    </div>
                  </motion.section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voltar ao topo */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-colors"
            style={{ backgroundColor: colors.ink }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.brand)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.ink)}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function TocItem({
  index,
  title,
  active,
  onClick,
}: {
  index: number;
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full rounded-2xl px-3 py-2.5 text-left"
    >
      {active && (
        <motion.span
          layoutId="legal-toc-active"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor: colors.brandLight }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors"
          style={
            active
              ? { backgroundColor: colors.brand, color: colors.white }
              : { backgroundColor: colors.surface, color: colors.ink4 }
          }
        >
          {index + 1}
        </span>
        <span
          className="font-display text-sm font-medium leading-snug transition-colors"
          style={{ color: active ? colors.ink : colors.ink4 }}
        >
          {title}
        </span>
      </span>
    </button>
  );
}
