import type { AudienceIcon, BenefitIcon } from "@/config";
import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.25c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.98c0 5.45-4.44 9.87-9.89 9.87Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.8c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.12.18 2.12.18v2.33h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" {...props}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5 13.8 9.2 20.5 11 13.8 12.8 12 19.5 10.2 12.8 3.5 11l6.7-1.8L12 2.5Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function baseTile(props: IconProps, paths: ReactNode) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      {paths}
    </svg>
  );
}

export function AudienceGlyph({
  name,
  className,
}: {
  name: AudienceIcon;
  className?: string;
}) {
  const props = { className, stroke: "currentColor", strokeWidth: 2 };

  switch (name) {
    case "plazas":
      return baseTile(props, (
        <>
          <path d="M8 38V18l16-10 16 10v20" />
          <path d="M18 38V26h12v12" />
          <path d="M8 38h32" />
        </>
      ));
    case "oficinas":
      return baseTile(props, (
        <>
          <rect x="10" y="8" width="28" height="30" rx="2" />
          <path d="M16 14h6M26 14h6M16 22h6M26 22h6M16 30h6M26 30h6" />
        </>
      ));
    case "casas":
      return baseTile(props, (
        <>
          <path d="M8 22 24 10l16 12v16H8V22Z" />
          <path d="M20 38V26h8v12" />
        </>
      ));
    case "locales":
      return baseTile(props, (
        <>
          <path d="M8 18h32v20H8z" />
          <path d="M8 18 12 10h24l4 8" />
          <path d="M20 38v-8h8v8" />
        </>
      ));
    case "colegios":
      return baseTile(props, (
        <>
          <path d="M8 20 24 12l16 8-16 8-16-8Z" />
          <path d="M14 24v8c4 3 16 3 20 0v-8" />
          <path d="M40 20v12" />
        </>
      ));
    case "clinicas":
      return baseTile(props, (
        <>
          <rect x="10" y="10" width="28" height="28" rx="4" />
          <path d="M24 16v16M16 24h16" />
        </>
      ));
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

export function BenefitGlyph({
  name,
  className,
}: {
  name: BenefitIcon;
  className?: string;
}) {
  const props = { className, stroke: "currentColor", strokeWidth: 2 };

  switch (name) {
    case "personal":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
          <circle cx="24" cy="16" r="7" />
          <path d="M10 38c2.5-8 25.5-8 28 0" />
          <path d="M33 14l3 3 6-6" />
        </svg>
      );
    case "horarios":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
          <circle cx="24" cy="24" r="14" />
          <path d="M24 16v9l6 4" />
        </svg>
      );
    case "presupuesto":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
          <rect x="8" y="12" width="32" height="24" rx="3" />
          <path d="M8 20h32" />
          <path d="M16 28h8" />
        </svg>
      );
    case "productos":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
          <path d="M14 18h20l-2 20H16L14 18Z" />
          <path d="M18 18c0-4 12-4 12 0" />
          <path d="M24 26v8" />
        </svg>
      );
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}
