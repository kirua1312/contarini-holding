import Link from "next/link";
import type { ReactNode } from "react";

type ContactButtonProps = {
  href?: string;
  type?: "button" | "submit";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function ContactButton({
  href,
  type = "button",
  className = "",
  children = "Nous Contacter",
  onClick,
  disabled = false,
}: ContactButtonProps) {
  const styles =
    "inline-block rounded-md bg-navy px-6 py-3 font-body text-sm tracking-wide text-cream transition-colors hover:bg-[#152d4a] disabled:cursor-not-allowed disabled:opacity-60";

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
