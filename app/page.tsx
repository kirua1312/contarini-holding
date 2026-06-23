import Image from "next/image";
import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import DiamondSeparator from "@/components/DiamondSeparator";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-cream">
      <header className="absolute right-0 top-0 z-10 p-6 md:p-8">
        <ContactButton href="/contact" variant="text">
          Correspondance
        </ContactButton>
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-8">
        <div className="flex w-full max-w-lg flex-col items-center gap-5 text-center">
          <div className="flex w-full flex-col items-center">
            <div className="mb-3 flex w-full justify-center leading-none">
              <Image
                src="/contarini-crest.png"
                alt="Blason Contarini — oie dans un écu, ruban SIC PARVIS MAGNA"
                width={420}
                height={500}
                priority
                className="mx-auto block h-auto w-[320px] md:w-[420px]"
              />
            </div>

            <h1 className="w-full text-center font-display text-4xl font-semibold uppercase leading-none tracking-[0.45em] text-navy md:text-5xl">
              Contarini
            </h1>
          </div>

          <DiamondSeparator />

          <div className="flex flex-col gap-2 font-body text-lg italic text-navy">
            <p>Société de participations et d&apos;investissement</p>
            <p className="font-semibold">Marseille – France</p>
          </div>

          <DiamondSeparator />

          <footer className="font-body text-sm text-navy">
            <p>© 2026 Contarini. Tous droits réservés.</p>
            <Link
              href="#"
              className="mt-2 inline-block text-xs underline opacity-80 transition-opacity hover:opacity-100"
            >
              Mentions légales
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
