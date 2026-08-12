"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMapPinLine,
  RiArrowLeftRightLine,
  RiCalendarLine,
  RiUserLine,
  RiSearchLine,
  RiAddLine,
  RiSubtractLine,
  RiFlightTakeoffLine,
  RiFlightLandLine,
} from "@remixicon/react";
import { colors } from "@/lib/colors";
import { searchAirports, type Airport } from "@/lib/data/airports";
import { useMounted } from "@/lib/hooks/useMounted";

/* ─── Types ────────────────────────────────────────────────── */
type TripType = "roundtrip" | "oneway";
type CabinClass = "economy" | "premium" | "business" | "first";

interface Pax { adults: number; children: number; infants: number }

const CABIN_LABELS: Record<CabinClass, string> = {
  economy:  "Econômica",
  premium:  "Econômica Premium",
  business: "Executiva",
  first:    "Primeira Classe",
};

/* ─── Airport autocomplete input ───────────────────────────── */
function AirportInput({
  id, label, placeholder, value, onChange, icon: Icon,
}: {
  id: string; label: string; placeholder: string;
  value: Airport | null; onChange: (a: Airport | null) => void;
  icon: typeof RiMapPinLine;
}) {
  const [query,       setQuery]       = useState(value ? `${value.city} (${value.code})` : "");
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [open,        setOpen]        = useState(false);
  const [dropPos,     setDropPos]     = useState<{ top: number; left: number; width: number } | null>(null);
  const mounted                       = useMounted();
  const inputRef  = useRef<HTMLInputElement>(null);
  const listRef   = useRef<HTMLUListElement>(null);

  const calcPos = useCallback(() => {
    if (!inputRef.current) return;
    const r = inputRef.current.getBoundingClientRect();
    setDropPos({ top: r.bottom + 6, left: r.left, width: r.width });
  }, []);

  const handleChange = (q: string) => {
    setQuery(q);
    onChange(null);
    const results = searchAirports(q);
    setSuggestions(results);
    calcPos();
    setOpen(results.length > 0);
  };

  const handleSelect = (airport: Airport) => {
    onChange(airport);
    setQuery(`${airport.city} (${airport.code})`);
    setOpen(false);
    setSuggestions([]);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) { calcPos(); setOpen(true); }
  };

  useEffect(() => {
    if (!open) return;
    const onMouse = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!inputRef.current?.contains(t) && !listRef.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize",  calcPos, { passive: true });
    window.addEventListener("scroll",  calcPos, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", calcPos);
      window.removeEventListener("scroll", calcPos);
    };
  }, [open, calcPos]);

  const dropdown = dropPos && mounted && (
    <AnimatePresence>
      {open && (
        <motion.ul
          ref={listRef}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, y: -4, transition: { duration: 0.1 } }}
          className="no-scrollbar"
          style={{
            position: "fixed",
            top: dropPos.top, left: dropPos.left, width: dropPos.width,
            zIndex: 49,
            backgroundColor: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: "0.875rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            overflowY: "auto",
            maxHeight: "16rem",
            overscrollBehavior: "contain",
          }}
        >
          {suggestions.map((a) => (
            <li key={`${a.code}-${a.name}`}>
              <button
                type="button"
                onClick={() => handleSelect(a)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm focus-visible:outline-none transition-colors"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.surface; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-bold text-xs"
                  style={{ backgroundColor: colors.brandLight, color: colors.brand }}>
                  {a.code}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate" style={{ color: colors.ink }}>{a.city}</p>
                  <p className="text-xs truncate" style={{ color: colors.muted }}>{a.name} · {a.country}</p>
                </div>
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex-1 min-w-0">
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
        style={{ color: colors.muted }}>
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: colors.brand }} aria-hidden="true" />
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-full pl-9 pr-3 py-3 text-sm rounded-xl focus-visible:outline-none transition-colors"
          style={{
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.white,
            color: colors.ink,
          }}
        />
      </div>
      {mounted && createPortal(dropdown, document.body)}
    </div>
  );
}

/* ─── Passenger selector ───────────────────────────────────── */
function PaxSelector({
  pax, setPax, cabinClass, setCabinClass,
}: {
  pax: Pax; setPax: (p: Pax) => void;
  cabinClass: CabinClass; setCabinClass: (c: CabinClass) => void;
}) {
  const [open,    setOpen]    = useState(false);
  const [dropPos, setDropPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const mounted                = useMounted();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  const total = pax.adults + pax.children + pax.infants;

  const label = `${total} passageiro${total > 1 ? "s" : ""} · ${CABIN_LABELS[cabinClass]}`;

  const calcPos = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setDropPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 280) });
  }, []);

  const handleOpen = () => { calcPos(); setOpen((v) => !v); };

  useEffect(() => {
    if (!open) return;
    const onMouse = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !listRef.current?.contains(t)) setOpen(false);
    };
    const onKey   = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown",   onKey);
    window.addEventListener("resize", calcPos, { passive: true });
    window.addEventListener("scroll", calcPos, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown",   onKey);
      window.removeEventListener("resize", calcPos);
      window.removeEventListener("scroll", calcPos);
    };
  }, [open, calcPos]);

  const Counter = ({ field, label: lbl, sub }: { field: keyof Pax; label: string; sub: string }) => {
    const val = pax[field];
    const min = field === "adults" ? 1 : 0;
    return (
      <div className="flex items-center justify-between py-3"
        style={{ borderBottom: `1px solid ${colors.border}` }}>
        <div>
          <p className="text-sm font-medium" style={{ color: colors.ink }}>{lbl}</p>
          <p className="text-xs" style={{ color: colors.muted }}>{sub}</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button"
            onClick={() => setPax({ ...pax, [field]: Math.max(min, val - 1) })}
            disabled={val <= min}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none disabled:opacity-30"
            style={{ border: `1.5px solid ${colors.border}`, cursor: val > min ? "pointer" : "default" }}
            onMouseEnter={(e) => { if (val > min) e.currentTarget.style.borderColor = colors.brand; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; }}
            aria-label={`Reduzir ${lbl}`}
          >
            <RiSubtractLine size={14} style={{ color: colors.ink }} aria-hidden="true" />
          </button>
          <span className="w-4 text-center font-semibold text-sm" style={{ color: colors.ink }}>{val}</span>
          <button type="button"
            onClick={() => setPax({ ...pax, [field]: val + 1 })}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none"
            style={{ border: `1.5px solid ${colors.border}`, cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.brand; e.currentTarget.style.backgroundColor = colors.brandLight; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.backgroundColor = "transparent"; }}
            aria-label={`Aumentar ${lbl}`}
          >
            <RiAddLine size={14} style={{ color: colors.ink }} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  };

  const dropdown = dropPos && mounted && (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, y: -4, transition: { duration: 0.1 } }}
          style={{
            position: "fixed",
            top: dropPos.top, left: dropPos.left, width: dropPos.width,
            zIndex: 49,
            backgroundColor: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: "1rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            padding: "1rem",
          }}
        >
          <Counter field="adults"   label="Adultos"   sub="12 anos ou mais" />
          <Counter field="children" label="Crianças"  sub="2 a 11 anos" />
          <Counter field="infants"  label="Bebês"     sub="Até 23 meses" />

          {/* Classe */}
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: colors.muted }}>Classe</p>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(CABIN_LABELS) as CabinClass[]).map((cls) => (
                <button key={cls} type="button"
                  onClick={() => setCabinClass(cls)}
                  className="py-2 px-3 rounded-xl text-xs font-medium text-left transition-colors focus-visible:outline-none"
                  style={{
                    backgroundColor: cabinClass === cls ? colors.brandLight : colors.surface,
                    color:           cabinClass === cls ? colors.brand : colors.ink3,
                    border:          `1.5px solid ${cabinClass === cls ? colors.brandMid : "transparent"}`,
                    cursor: "pointer",
                  }}
                >
                  {CABIN_LABELS[cls]}
                </button>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => setOpen(false)}
            className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none"
            style={{ backgroundColor: colors.brand, color: colors.white, cursor: "pointer" }}>
            Confirmar
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex-1 min-w-0">
      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
        style={{ color: colors.muted }}>
        Passageiros
      </label>
      <button ref={triggerRef} type="button" onClick={handleOpen}
        className="w-full flex items-center gap-2 pl-9 pr-3 py-3 text-sm rounded-xl text-left transition-colors focus-visible:outline-none relative"
        style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.white, color: colors.ink, cursor: "pointer" }}>
        <RiUserLine size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: colors.brand }} aria-hidden="true" />
        <span className="truncate">{label}</span>
      </button>
      {mounted && createPortal(dropdown, document.body)}
    </div>
  );
}

/* ─── Date Picker ──────────────────────────────────────────── */
const MONTHS_PT = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const DAYS_PT   = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

function DatePicker({ id, label, value, onChange, min }: {
  id: string; label: string; value: string; onChange: (v: string) => void; min?: string;
}) {
  const todayDate = new Date(); todayDate.setHours(0, 0, 0, 0);
  const minDate   = (() => {
    const d = min ? new Date(min + "T00:00:00") : new Date(todayDate);
    d.setHours(0, 0, 0, 0);
    return d;
  })();
  const selDate = value ? (() => { const d = new Date(value + "T00:00:00"); d.setHours(0,0,0,0); return d; })() : null;

  const [open,      setOpen]      = useState(false);
  const [dropPos,   setDropPos]   = useState<{ top: number; left: number; width: number } | null>(null);
  const mounted                    = useMounted();
  const [viewYear,  setViewYear]  = useState(() => selDate ? selDate.getFullYear() : todayDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => selDate ? selDate.getMonth()    : todayDate.getMonth());

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selDate) { setViewYear(selDate.getFullYear()); setViewMonth(selDate.getMonth()); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const calcPos = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setDropPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 256) });
  }, []);

  const handleOpen = () => { calcPos(); setOpen((v) => !v); };

  useEffect(() => {
    if (!open) return;
    const onMouse  = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !panelRef.current?.contains(t)) setOpen(false);
    };
    const onKey    = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown",   onKey);
    window.addEventListener("resize", calcPos, { passive: true });
    window.addEventListener("scroll", calcPos, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown",   onKey);
      window.removeEventListener("resize", calcPos);
      window.removeEventListener("scroll", calcPos);
    };
  }, [open, calcPos]);

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const canGoPrev    = viewYear > minDate.getFullYear() || (viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth());

  const prevMonth = () => {
    if (!canGoPrev) return;
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  const selectDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < minDate) return;
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  };

  const displayValue = selDate
    ? `${String(selDate.getDate()).padStart(2, "0")}/${String(selDate.getMonth() + 1).padStart(2, "0")}/${selDate.getFullYear()}`
    : null;

  const dropdown = dropPos && (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: "easeOut" } }}
          exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.1 } }}
          style={{
            position: "fixed",
            top: dropPos.top, left: dropPos.left, width: dropPos.width,
            zIndex: 49,
            backgroundColor: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: "0.875rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            padding: "1rem",
            userSelect: "none",
          }}
        >
          {/* Navegação de mês */}
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth} disabled={!canGoPrev}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none"
              style={{ cursor: canGoPrev ? "pointer" : "default", opacity: canGoPrev ? 1 : 0.25 }}
              onMouseEnter={(e) => { if (canGoPrev) e.currentTarget.style.backgroundColor = colors.surface; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              aria-label="Mês anterior"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 3l-4 4 4 4" stroke={colors.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-sm font-semibold" style={{ color: colors.ink }}>
              {MONTHS_PT[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none"
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.surface; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              aria-label="Próximo mês"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 3l4 4-4 4" stroke={colors.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Cabeçalhos de dia da semana */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_PT.map((d) => (
              <div key={d} className="h-7 flex items-center justify-center text-xs font-semibold"
                style={{ color: colors.muted }}>{d}</div>
            ))}
          </div>

          {/* Grade de dias */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstWeekday }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day    = i + 1;
              const date   = new Date(viewYear, viewMonth, day);
              const isPast = date < minDate;
              const isSel  = selDate != null &&
                date.getFullYear() === selDate.getFullYear() &&
                date.getMonth()    === selDate.getMonth()    &&
                date.getDate()     === selDate.getDate();
              const isToday = date.getTime() === todayDate.getTime();
              return (
                <button key={day} type="button" onClick={() => selectDay(day)} disabled={isPast}
                  className="h-8 flex items-center justify-center rounded-lg text-xs transition-colors focus-visible:outline-none"
                  style={{
                    backgroundColor: isSel ? colors.brand : "transparent",
                    color:   isSel  ? colors.white
                           : isPast ? colors.mutedLight
                           : isToday ? colors.brand
                           : colors.ink,
                    fontWeight: isSel || isToday ? 600 : 400,
                    cursor: isPast ? "default" : "pointer",
                  }}
                  onMouseEnter={(e) => { if (!isPast && !isSel) e.currentTarget.style.backgroundColor = colors.brandLight; }}
                  onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex-1 min-w-0">
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
        style={{ color: colors.muted }}>
        {label}
      </label>
      <div className="relative">
        <RiCalendarLine size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: colors.brand }} aria-hidden="true" />
        <button
          ref={triggerRef}
          id={id}
          type="button"
          onClick={handleOpen}
          className="w-full flex items-center pl-9 pr-3 py-3 text-sm rounded-xl focus-visible:outline-none transition-colors text-left"
          style={{
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.white,
            color: displayValue ? colors.ink : colors.muted,
            cursor: "pointer",
          }}
        >
          {displayValue ?? "dd/mm/aaaa"}
        </button>
      </div>
      {mounted && createPortal(dropdown, document.body)}
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────── */
export function FlightSearch() {
  const [tripType,    setTripType]    = useState<TripType>("roundtrip");
  const [origin,      setOrigin]      = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);
  const [departure,   setDeparture]   = useState("");
  const [returnDate,  setReturnDate]  = useState("");
  const [pax,         setPax]         = useState<Pax>({ adults: 1, children: 0, infants: 0 });
  const [cabinClass,  setCabinClass]  = useState<CabinClass>("economy");

  const swap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui conectaria com API de busca de voos
    alert("Buscando voos disponíveis…");
  };

  return (
    <section aria-label="Buscar voos" className="relative z-10 py-12"
      style={{ backgroundColor: colors.brand }}>

      {/* Pattern decorativo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          backgroundImage: "url('/images/site/pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
          filter: "brightness(0) invert(1)",
          opacity: 0.07,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex items-center gap-3 mb-5">
          <RiFlightTakeoffLine size={22} style={{ color: "rgba(255,255,255,0.92)" }} aria-hidden="true" />
          <h2 className="font-display font-bold text-xl text-white tracking-tight">
            Buscar voos
          </h2>
        </div>

        <div className="rounded-3xl p-5 md:p-6"
          style={{ backgroundColor: colors.white, border: `1px solid ${colors.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-5">
            {([
              { key: "roundtrip", label: "Ida e volta" },
              { key: "oneway",    label: "Só ida"      },
            ] as { key: TripType; label: string }[]).map(({ key, label }) => (
              <button key={key} type="button"
                onClick={() => setTripType(key)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none"
                style={{
                  backgroundColor: tripType === key ? colors.brandLight : "transparent",
                  color:           tripType === key ? colors.brand : colors.muted,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch}>
            <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3">

              {/* Origem */}
              <AirportInput
                id="origin"
                label="Origem"
                placeholder="Cidade ou aeroporto"
                value={origin}
                onChange={setOrigin}
                icon={RiFlightTakeoffLine}
              />

              {/* Swap */}
              <button
                type="button"
                onClick={swap}
                className="hidden lg:flex w-9 h-9 flex-shrink-0 mb-0.5 self-end items-center justify-center rounded-full transition-colors focus-visible:outline-none"
                style={{ border: `1.5px solid ${colors.border}`, backgroundColor: colors.white, cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.brandLight; e.currentTarget.style.borderColor = colors.brandMid; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.white; e.currentTarget.style.borderColor = colors.border; }}
                aria-label="Trocar origem e destino"
              >
                <RiArrowLeftRightLine size={15} style={{ color: colors.brand }} aria-hidden="true" />
              </button>

              {/* Destino */}
              <AirportInput
                id="destination"
                label="Destino"
                placeholder="Cidade ou aeroporto"
                value={destination}
                onChange={setDestination}
                icon={RiFlightLandLine}
              />

              {/* Datas */}
              <DatePicker
                id="departure"
                label="Ida"
                value={departure}
                onChange={setDeparture}
              />
              <AnimatePresence>
                {tripType === "roundtrip" && (
                  <motion.div className="flex-1 min-w-0"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}>
                    <DatePicker
                      id="return"
                      label="Volta"
                      value={returnDate}
                      onChange={setReturnDate}
                      min={departure}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Passageiros */}
              <PaxSelector pax={pax} setPax={setPax} cabinClass={cabinClass} setCabinClass={setCabinClass} />

              {/* Botão buscar */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 focus-visible:outline-none flex-shrink-0"
                style={{ backgroundColor: colors.brand, color: colors.white, cursor: "pointer", minWidth: "7rem" }}
              >
                <RiSearchLine size={16} aria-hidden="true" />
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
