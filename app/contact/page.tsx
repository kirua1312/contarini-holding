import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import DiamondSeparator from "@/components/DiamondSeparator";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-cream">
      <Link
        href="/"
        className="absolute left-0 top-0 z-10 p-6 font-body text-sm text-navy opacity-70 transition-opacity hover:opacity-100 md:p-8"
      >
        ← Retour
      </Link>

      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="font-display text-3xl font-medium uppercase tracking-[0.25em] text-navy md:text-4xl">
              Nous Contacter
            </h1>
            <DiamondSeparator />
          </div>

          <ContactForm />
        </div>
      </main>
    </div>
  );
}
