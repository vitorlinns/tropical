"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiCheckLine } from "@remixicon/react";
import { useMounted } from "@/lib/hooks/useMounted";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

interface DropdownPos {
  top: number;
  left: number;
  width: number;
}

export function Select({
  label, id, value, onChange, options, placeholder = "Selecione", error, disabled = false,
}: SelectProps) {
  const [open, setOpen]       = useState(false);
  const [pos,  setPos]        = useState<DropdownPos | null>(null);
  const mounted                = useMounted();
  const triggerRef            = useRef<HTMLButtonElement>(null);
  const listRef               = useRef<HTMLUListElement>(null);
  const selected              = options.find((o) => o.value === value);

  /* Calcula posição do dropdown com base no trigger (coordenadas de viewport para position:fixed) */
  const updatePos = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 6, left: r.left, width: r.width });
  }, []);

  const handleOpen = () => {
    if (disabled) return;
    updatePos();
    setOpen((v) => !v);
  };

  /* Fecha ao clicar fora e com Escape; reposiciona no resize/scroll */
  useEffect(() => {
    if (!open) return;
    const onMouse  = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = triggerRef.current?.contains(target);
      const insideList    = listRef.current?.contains(target);
      if (!insideTrigger && !insideList) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown",   onKey);
    window.addEventListener("resize", updatePos, { passive: true });
    window.addEventListener("scroll", updatePos, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown",   onKey);
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos);
    };
  }, [open, updatePos]);

  const dropdown = pos && (
    <AnimatePresence>
      {open && (
        <motion.ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-label={label}
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: "easeOut" } }}
          exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.1 } }}
          className="no-scrollbar"
          style={{
            position: "fixed",
            top:      pos.top,
            left:     pos.left,
            width:    pos.width,
            zIndex:   49,
            backgroundColor: "var(--color-white)",
            border: `1px solid var(--color-border)`,
            borderRadius: "0.75rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
            overflowY: "auto",
            maxHeight: "14rem",
            padding: "0.25rem 0",
            overscrollBehavior: "contain",
          }}
        >
          {options.map((opt) => {
            const isActive = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors focus-visible:outline-none"
                  style={{
                    color: isActive ? "var(--color-brand)" : "var(--color-ink)",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-surface)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {opt.label}
                  {isActive && <RiCheckLine size={14} aria-hidden="true" style={{ color: "var(--color-brand)" }} />}
                </button>
              </li>
            );
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-ink)" }}>
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        disabled={disabled}
        onClick={handleOpen}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-left transition-colors focus-visible:outline-none disabled:opacity-50"
        style={{
          border: `1px solid ${error ? "var(--color-danger)" : "var(--color-border)"}`,
          backgroundColor: disabled ? "var(--color-surface)" : "var(--color-white)",
          color: selected ? "var(--color-ink)" : "var(--color-muted-light)",
          cursor: disabled ? "default" : "pointer",
        }}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>

        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          aria-hidden="true"
          className="flex-shrink-0 ml-2"
          style={{ color: "var(--color-muted-light)" }}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      {error && (
        <p id={`${id}-error`} className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>{error}</p>
      )}

      {mounted && createPortal(dropdown, document.body)}
    </div>
  );
}
