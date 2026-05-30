import { ReactNode } from "react";
import { Info, Mail, Phone, MapPin } from "lucide-react";
import { colors } from "@/lib/colors";

/** Parágrafo padrão de texto legal. */
export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 leading-relaxed" style={{ color: colors.ink3 }}>
      {children}
    </p>
  );
}

/** Subtítulo dentro de uma seção. */
export function Sub({ children }: { children: ReactNode }) {
  return (
    <h3
      className="font-display mt-8 mb-3 text-base font-semibold first:mt-0 md:text-lg"
      style={{ color: colors.ink }}
    >
      {children}
    </h3>
  );
}

/** Destaque inline. */
export function Strong({ children }: { children: ReactNode }) {
  return (
    <strong className="font-semibold" style={{ color: colors.ink }}>
      {children}
    </strong>
  );
}

/** Lista de tópicos com marcadores da marca. */
export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mb-4 space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 leading-relaxed"
          style={{ color: colors.ink3 }}
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: colors.brand }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Caixa de aviso/destaque. */
export function Notice({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="my-6 flex gap-3 rounded-2xl p-5"
      style={{ backgroundColor: colors.brandLight, border: `1px solid ${colors.brandMid}` }}
    >
      <Info className="mt-0.5 h-5 w-5 shrink-0" style={{ color: colors.brand }} />
      <div>
        {title && (
          <p className="mb-1 font-semibold" style={{ color: colors.ink }}>
            {title}
          </p>
        )}
        <div className="text-sm leading-relaxed" style={{ color: colors.ink3 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Cartão de contato reutilizável (e-mail, telefone, endereço). */
export function ContactCard({
  email,
  phone,
  address,
}: {
  email: string;
  phone?: string;
  address?: string;
}) {
  const items: { icon: ReactNode; label: string; value: string; href?: string }[] = [
    { icon: <Mail className="h-5 w-5" />, label: "E-mail", value: email, href: `mailto:${email}` },
  ];
  if (phone)
    items.push({
      icon: <Phone className="h-5 w-5" />,
      label: "Telefone",
      value: phone,
      href: `tel:${phone.replace(/\D/g, "")}`,
    });
  if (address)
    items.push({ icon: <MapPin className="h-5 w-5" />, label: "Endereço", value: address });

  return (
    <div className="mt-2 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-start gap-3 rounded-2xl p-4"
          style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm"
            style={{ color: colors.brand }}
          >
            {item.icon}
          </span>
          <div className="min-w-0">
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: colors.muted }}
            >
              {item.label}
            </p>
            {item.href ? (
              <a
                href={item.href}
                className="break-words font-medium text-[#111111] transition-colors hover:text-[#FF6B35]"
              >
                {item.value}
              </a>
            ) : (
              <p className="break-words font-medium" style={{ color: colors.ink }}>
                {item.value}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
