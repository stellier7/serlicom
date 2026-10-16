import { CONFIG } from "@/config";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    name: CONFIG.businessName,
    description: CONFIG.copy.seoDescription,
    url: CONFIG.siteUrl,
    telephone: CONFIG.phoneE164,
    email: CONFIG.email,
    image: `${CONFIG.siteUrl}${CONFIG.images.hero}`,
    areaServed: CONFIG.areasServed.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [CONFIG.facebook],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
