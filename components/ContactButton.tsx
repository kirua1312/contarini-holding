import Link from "next/link";
import type { ReactNode } from "react";

type ContactButtonProps = {
  href?: string;
  type?: "button" | "submit";
  variant?: "solid" | "text";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function ContactButton({
  href,
  type = "button",
  variant = "solid",
  className = "",
  children = "Nous Contacter",
  onClick,
  disabled = false,
}: ContactButtonProps) {
  const solidStyles =
    "inline-block rounded-md bg-navy px-6 py-3 font-body text-sm tracking-wide text-cream transition-colors hover:bg-[#152d4a] disabled:cursor-not-allowed disabled:opacity-60";

  const textStyles =
    "inline-block p-2 font-display text-base font-semibold text-navy transition-opacity hover:opacity-80";

  const styles = variant === "text" ? textStyles : solidStyles;

  if (href) {
    return (
      <Link href={href} className={`${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles} ${className}`}
    >
      {children}
    </button>
  );
}
