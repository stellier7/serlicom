"use client";

import { useState, type FormEvent } from "react";
import { CONFIG } from "@/config";
import { WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/whatsapp";

const ZONES = [...CONFIG.areasServed, "Otra"] as const;

export function QuoteForm() {
  const [nombre, setNombre] = useState("");
  const [servicio, setServicio] = useState(CONFIG.services[0]?.name ?? "");
  const [zona, setZona] = useState<string>(CONFIG.areasServed[0] ?? "Comayagua");
  const [mensaje, setMensaje] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const lines = [
      `Hola ${CONFIG.businessName.split(" ")[0]}, quiero cotizar un servicio.`,
      `Nombre: ${nombre.trim() || "—"}`,
      `Servicio: ${servicio}`,
      `Zona: ${zona}`,
    ];
    if (mensaje.trim()) lines.push(`Mensaje: ${mensaje.trim()}`);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/40";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/15 bg-brand-navy/70 p-5 shadow-soft backdrop-blur-md sm:p-6"
    >
      <h3 className="font-heading text-lg font-bold text-white">
        {CONFIG.copy.formTitle}
      </h3>
      <p className="mt-1 text-sm text-white/75">{CONFIG.copy.formSubtitle}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-white/90 sm:col-span-2">
          Nombre
          <input
            type="text"
            name="nombre"
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`mt-1.5 ${fieldClass}`}
            placeholder="Tu nombre"
          />
        </label>

        <label className="block text-sm text-white/90">
          Servicio
          <select
            name="servicio"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            className={`mt-1.5 ${fieldClass}`}
          >
            {CONFIG.services.map((s) => (
              <option key={s.id} value={s.name} className="text-brand-navy">
                {s.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-white/90">
          Zona
          <select
            name="zona"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className={`mt-1.5 ${fieldClass}`}
          >
            {ZONES.map((z) => (
              <option key={z} value={z} className="text-brand-navy">
                {z}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-white/90 sm:col-span-2">
          Mensaje
          <textarea
            name="mensaje"
            rows={3}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className={`mt-1.5 resize-y ${fieldClass}`}
            placeholder="Cuéntanos detalles del trabajo (opcional)"
          />
        </label>
      </div>

      <button
        type="submit"
        className="btn-shine mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:w-auto"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Enviar por WhatsApp
      </button>
    </form>
  );
}
