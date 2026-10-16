import { CONFIG } from "@/config";
import { FacebookIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { mailtoLink, telLink, waLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CONFIG.images.logo}
              alt={CONFIG.businessName}
              width={48}
              height={48}
              className="h-12 w-12 rounded-md object-contain"
            />
            <div>
              <p className="font-heading text-lg font-bold">{CONFIG.businessName}</p>
              <p className="text-sm text-white/70">{CONFIG.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            {CONFIG.experienceClaim}. Servicio confiable en{" "}
            {CONFIG.areasServed.join(", ")}.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-brand-yellow">
            Contacto
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={telLink()}
                className="inline-flex items-center gap-2 text-white/90 transition hover:text-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                <PhoneIcon className="h-4 w-4" />
                {CONFIG.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 transition hover:text-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={mailtoLink()}
                className="inline-flex items-center gap-2 text-white/90 transition hover:text-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                <MailIcon className="h-4 w-4" />
                {CONFIG.email}
              </a>
            </li>
            <li>
              <a
                href={CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 transition hover:text-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                <FacebookIcon className="h-4 w-4" />
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-brand-yellow">
            Cobertura y horario
          </h2>
          <p className="mt-4 text-sm text-white/90">{CONFIG.hours}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CONFIG.areasServed.map((area) => (
              <li
                key={area}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {CONFIG.businessName}
          </p>
          <p>{CONFIG.credit}</p>
        </div>
      </div>
    </footer>
  );
}
