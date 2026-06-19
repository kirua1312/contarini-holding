import Image from "next/image";
import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import DiamondSeparator from "@/components/DiamondSeparator";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-cream">
      <header className="absolute right-0 top-0 z-10 p-6 md:p-8">
        <ContactButton href="/contact" />
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="flex w-full max-w-lg flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/contarini-crest.png"
              alt="Blason Contarini — oie dans un écu, ruban SIC PARVIS MAGNA"
              width={360}
              height={428}
              priority
              className="h-auto w-[260px] md:w-[360px]"
            />

            <h1 className="font-display text-4xl font-medium uppercase tracking-[0.28em] text-navy md:text-5xl">
              Contarini
            </h1>
          </div>

          <DiamondSeparator />

          <div className="flex flex-col gap-2 font-body text-lg italic text-navy">
            <p>Société de participations et d&apos;investissement</p>
            <p>Marseille – France</p>
          </div>

          <DiamondSeparator />

          <footer className="mt-4 font-body text-sm text-navy">
            <p>© 2026 Contarini Holding SAS. Tous droits réservés.</p>
            <Link
              href="#"
              className="mt-2 inline-block text-xs opacity-80 transition-opacity hover:opacity-100"
            >
              Mentions légales
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
