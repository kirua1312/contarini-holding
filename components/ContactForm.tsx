"use client";

import { useState } from "react";
import ContactButton from "@/components/ContactButton";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const nextErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "Le prénom est requis.";
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Le nom est requis.";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "L'adresse e-mail est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Veuillez saisir une adresse e-mail valide.";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Le message est requis.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
    }
  }

  async function handleSubmit() {
    if (!validate() || status === "loading") {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: formData.firstName.trim(),
          nom: formData.lastName.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setFormData(initialFormData);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-center font-body text-lg text-navy">
        Merci, votre message a bien été envoyé.
      </p>
    );
  }

  const inputClassName =
    "w-full border border-navy bg-transparent px-4 py-3 font-body text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-[#152d4a] focus:ring-1 focus:ring-navy";

  return (
    <div className="flex w-full max-w-[480px] flex-col gap-6">
      <div>
        <label htmlFor="firstName" className="mb-2 block font-body text-navy">
          Prénom
        </label>
        <input
          id="firstName"
          type="text"
          required
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className={inputClassName}
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-700">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="mb-2 block font-body text-navy">
          Nom
        </label>
        <input
          id="lastName"
          type="text"
          required
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className={inputClassName}
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-700">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-body text-navy">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={inputClassName}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-700">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-body text-navy">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`${inputClassName} resize-y`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-700">{errors.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-center font-body text-sm text-red-700">
          Une erreur est survenue, veuillez réessayer.
        </p>
      )}

      <ContactButton
        type="button"
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="w-full text-center"
      >
        {status === "loading" ? "Envoi..." : "Envoyer"}
      </ContactButton>
    </div>
  );
}
