import { Resend } from "resend";
import { NextResponse } from "next/server";

type ContactPayload = {
  prenom?: string;
  nom?: string;
  email?: string;
  message?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
  }

  const prenom = body.prenom?.trim();
  const nom = body.nom?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!prenom || !nom || !email || !message) {
    return NextResponse.json(
      { error: "Tous les champs sont requis (prénom, nom, e-mail, message)." },
      { status: 400 },
    );
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "L'adresse e-mail n'est pas valide." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !contactToEmail) {
    return NextResponse.json(
      { error: "Configuration serveur incomplète." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Contarini <onboarding@resend.dev>",
      to: contactToEmail,
      replyTo: email,
      subject: `Nouveau message de ${prenom} ${nom}`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; color: #1C3A5E; line-height: 1.6;">
          <h2 style="margin: 0 0 16px; font-size: 20px;">Nouveau message — formulaire de contact</h2>
          <p><strong>Prénom :</strong> ${escapeHtml(prenom)}</p>
          <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
          <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "L'envoi de l'e-mail a échoué." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Une erreur inattendue est survenue." },
      { status: 500 },
    );
  }
}
