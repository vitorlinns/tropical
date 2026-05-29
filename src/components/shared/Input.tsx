"use client";

import { type RemixiconComponentType } from "@remixicon/react";
import { colors } from "@/lib/colors";

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  icon?: RemixiconComponentType;
  suffix?: React.ReactNode;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  autoComplete?: string;
  spellCheck?: boolean;
  disabled?: boolean;
}

export function Input({
  label, id, type = "text", value, onChange, placeholder,
  error, icon: Icon, suffix, inputMode, maxLength,
  autoComplete = "off", spellCheck = false, disabled = false,
}: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: colors.ink }}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: colors.mutedLight }}>
            <Icon size={16} aria-hidden="true" />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
          disabled={disabled}
          className="w-full rounded-xl py-3 text-sm focus-visible:outline-none transition-colors disabled:opacity-50"
          style={{
            paddingLeft:  Icon   ? "2.625rem" : "1rem",
            paddingRight: suffix ? "2.625rem" : "1rem",
            border: `1px solid ${error ? colors.danger : colors.border}`,
            backgroundColor: disabled ? colors.surface : colors.white,
            color: colors.ink,
          }}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
        {suffix && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs mt-1" style={{ color: colors.danger }}>{error}</p>
      )}
    </div>
  );
}
