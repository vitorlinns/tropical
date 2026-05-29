/**
 * Sistema de cores da Tropical Milhas.
 * Fonte única de verdade — importe aqui, não use hex solto nos componentes.
 */
export const colors = {
  // ── Marca ──────────────────────────────────────────────────
  brand:        "#FF6B35",
  brandHover:   "#E85D2B",
  brandLight:   "#FFF1EC",
  brandMid:     "#FFD5C0",

  // ── Texto ──────────────────────────────────────────────────
  ink:          "#111111",
  ink2:         "#444444",
  ink3:         "#555555",
  ink4:         "#666666",
  muted:        "#888888",
  mutedLight:   "#AAAAAA",
  mutedLighter: "#CCCCCC",

  // ── Superfícies ────────────────────────────────────────────
  white:        "#FFFFFF",
  surface:      "#F9F7F4",
  surface2:     "#F0EDE9",
  dark:         "#111111",

  // ── Bordas ─────────────────────────────────────────────────
  border:       "#E8E4DF",
  borderHover:  "#D4CFC9",

  // ── Overlay / transparência ────────────────────────────────
  white10:      "rgba(255,255,255,0.10)",
  white15:      "rgba(255,255,255,0.15)",
  white20:      "rgba(255,255,255,0.20)",
  white25:      "rgba(255,255,255,0.25)",
  white50:      "rgba(255,255,255,0.50)",
  white70:      "rgba(255,255,255,0.70)",
  white80:      "rgba(255,255,255,0.80)",
  black40:      "rgba(0,0,0,0.40)",

  // ── Estado ─────────────────────────────────────────────────
  danger:       "#EF4444",
  dangerLight:  "#FEF2F2",
} as const;

export type ColorKey = keyof typeof colors;
