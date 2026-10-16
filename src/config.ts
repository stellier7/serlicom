export type ServiceId =
  | "casas"
  | "oficinas"
  | "post-construccion"
  | "pisos"
  | "banos"
  | "vidrios"
  | "muebles-colchones"
  | "pizarras"
  | "fumigacion";

export type Service = {
  id: ServiceId;
  name: string;
  shortDescription: string;
  image: string;
  whatsappMessage: string;
};

export type HomePlan = {
  id: "diario" | "semanal" | "mensual";
  name: string;
  bullets: string[];
  price?: string;
};

export type Review = {
  name: string;
  source: "Facebook";
  quote?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BeforeAfterPair = {
  before: string;
  after: string;
  alt: string;
};

export type PricingConfig =
  | { enabled: false }
  | {
      enabled: true;
      plans: Partial<Record<HomePlan["id"], string>>;
    };

export type SiteConfig = {
  businessName: string;
  tagline: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  email: string;
  facebook: string;
  owner: string;
  experienceClaim: string;
  hours: string;
  siteUrl: string;
  areasServed: string[];
  pricing: PricingConfig;
  services: Service[];
  homePlans: HomePlan[];
  postConstructionIncludes: string[];
  audiences: { name: string; icon: AudienceIcon }[];
  benefits: { title: string; description: string; icon: BenefitIcon }[];
  gallery: GalleryImage[];
  beforeAfter: BeforeAfterPair[];
  reviews: Review[];
  images: {
    hero: string;
    heroMobile: string;
    parallax1: string;
    parallax2: string;
    owner: string;
    logo: string;
  };
  nav: { href: string; label: string }[];
  trustChips: string[];
  credit: string;
  labels: {
    quoteWhatsApp: string;
    quoteWhatsAppLong: string;
    quoteCta: string;
    callCta: string;
    seeServices: string;
    recommends: string;
    viaFacebook: string;
    seeFacebookPage: string;
    otherZoneChip: string;
  };
  copy: {
    seoTitle: string;
    seoDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesSubtitle: string;
    homeEyebrow: string;
    homeTitle: string;
    homeSubtitle: string;
    postEyebrow: string;
    postTitle: string;
    postSubtitle: string;
    postIncludesTitle: string;
    audiencesEyebrow: string;
    audiencesTitle: string;
    whyEyebrow: string;
    whyTitle: string;
    whySubtitle: string;
    galleryEyebrow: string;
    galleryTitle: string;
    gallerySubtitle: string;
    beforeAfterTitle: string;
    beforeAfterSubtitle: string;
    coverageEyebrow: string;
    coverageTitle: string;
    coverageSubtitle: string;
    reviewsEyebrow: string;
    reviewsTitle: string;
    reviewsSubtitle: string;
    aboutEyebrow: string;
    aboutP1: string;
    aboutP2: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaSubtitle: string;
    formTitle: string;
    formSubtitle: string;
  };
  defaultWhatsAppMessage: string;
  keywords: string[];
};

export type AudienceIcon =
  | "plazas"
  | "oficinas"
  | "casas"
  | "locales"
  | "colegios"
  | "clinicas";

export type BenefitIcon =
  | "personal"
  | "horarios"
  | "presupuesto"
  | "productos";

const homePlanBullets = [
  "Productos incluidos",
  "Nos acomodamos a tu presupuesto",
  "Personal capacitado y honrado",
  "Horarios flexibles",
] as const;

export const CONFIG: SiteConfig = {
  businessName: "Serlicom Limpieza",
  tagline: "Servicios de Limpieza Profesional",
  phoneDisplay: "9530-6336",
  phoneE164: "+50495306336",
  whatsappNumber: "50495306336",
  email: "serlicom88@yahoo.com",
  facebook: "https://www.facebook.com/serlicom88",
  owner: "Edwin Amaya",
  experienceClaim:
    "Décadas de experiencia en servicios de limpieza en Comayagua",
  hours: "Atención 24/7",
  siteUrl: "https://serlicom-limpieza.vercel.app",
  areasServed: ["Comayagua", "Siguatepeque", "Palmerola"],
  pricing: { enabled: false },
  services: [
    {
      id: "casas",
      name: "Limpieza de casas a domicilio",
      shortDescription:
        "Dejamos tu hogar impecable, con el cuidado y respeto que merece tu familia.",
      image: "/images/services/hogar.webp",
      whatsappMessage:
        "Hola Serlicom, quiero cotizar: Limpieza de casas a domicilio",
    },
    {
      id: "oficinas",
      name: "Limpieza de oficinas y locales",
      shortDescription:
        "Espacios de trabajo limpios y presentables para tu equipo y tus clientes.",
      image: "/images/services/oficinas.webp",
      whatsappMessage:
        "Hola Serlicom, quiero cotizar: Limpieza de oficinas y locales",
    },
    {
      id: "post-construccion",
      name: "Limpieza post construcción",
      shortDescription:
        "Retiramos polvo, residuos y manchas para entregar tu obra lista para estrenar.",
      image: "/images/services/post-construccion.webp",
      whatsappMessage:
        "Hola Serlicom, quiero cotizar: Limpieza post construcción",
    },
    {
      id: "pisos",
      name: "Pulido de pisos",
      shortDescription:
        "Recuperamos el brillo y la presentación de tus pisos con acabado profesional.",
      image: "/images/services/pisos.webp",
      whatsappMessage: "Hola Serlicom, quiero cotizar: Pulido de pisos",
    },
    {
      id: "banos",
      name: "Pulido de baños",
      shortDescription:
        "Limpieza profunda y pulido para baños higiénicos y con excelente apariencia.",
      image: "/images/services/banos.webp",
      whatsappMessage: "Hola Serlicom, quiero cotizar: Pulido de baños",
    },
    {
      id: "vidrios",
      name: "Limpieza de vidrios",
      shortDescription:
        "Ventanas y cristales transparentes, sin marcas ni residuos.",
      image: "/images/services/vidrios.webp",
      whatsappMessage: "Hola Serlicom, quiero cotizar: Limpieza de vidrios",
    },
    {
      id: "muebles-colchones",
      name: "Lavado de muebles y colchones",
      shortDescription:
        "Frescos, limpios y listos para usar, con atención a telas y superficies.",
      image: "/images/services/muebles.webp",
      whatsappMessage:
        "Hola Serlicom, quiero cotizar: Lavado de muebles y colchones",
    },
    {
      id: "pizarras",
      name: "Limpieza y pulido de pizarras",
      shortDescription:
        "Pizarras claras y presentables para aulas, oficinas y salas de reunión.",
      image: "/images/services/oficinas.webp",
      whatsappMessage:
        "Hola Serlicom, quiero cotizar: Limpieza y pulido de pizarras",
    },
    {
      id: "fumigacion",
      name: "Fumigación de casas y negocios",
      shortDescription:
        "Control de plagas para hogares y locales, con trato profesional y discreto.",
      image: "/images/services/fumigacion.webp",
      whatsappMessage:
        "Hola Serlicom, quiero cotizar: Fumigación de casas y negocios",
    },
  ],
  homePlans: [
    {
      id: "diario",
      name: "Diario",
      bullets: [...homePlanBullets],
    },
    {
      id: "semanal",
      name: "Semanal",
      bullets: [...homePlanBullets],
    },
    {
      id: "mensual",
      name: "Mensual",
      bullets: [...homePlanBullets],
    },
  ],
  postConstructionIncludes: [
    "Aspirado",
    "Limpieza de vidrios",
    "Pulido de piso",
    "Limpieza de baños",
    "Limpieza de área exterior",
    "Limpieza de puertas y ventanas",
    "Cocina",
    "Closets y lámparas",
  ],
  audiences: [
    { name: "Plazas comerciales", icon: "plazas" },
    { name: "Oficinas", icon: "oficinas" },
    { name: "Casas de habitación", icon: "casas" },
    { name: "Locales", icon: "locales" },
    { name: "Colegios", icon: "colegios" },
    { name: "Clínicas", icon: "clinicas" },
  ],
  benefits: [
    {
      title: "Personal capacitado y honrado",
      description:
        "Equipo de confianza, con trato respetuoso en tu hogar o negocio.",
      icon: "personal",
    },
    {
      title: "Horarios flexibles, 24/7",
      description:
        "Nos adaptamos a tu agenda. Atención disponible cuando nos necesites.",
      icon: "horarios",
    },
    {
      title: "Nos acomodamos a tu presupuesto",
      description:
        "Cotizamos según el trabajo real. Sin sorpresas y con opciones claras.",
      icon: "presupuesto",
    },
    {
      title: "Productos incluidos (hogar)",
      description:
        "En limpieza de casas llevamos los productos necesarios para el servicio.",
      icon: "productos",
    },
  ],
  gallery: [
    {
      src: "/images/gallery/01.webp",
      alt: "Personal Serlicom listo para el servicio",
      width: 800,
      height: 1000,
    },
    {
      src: "/images/gallery/02.webp",
      alt: "Lavado profesional de muebles en sala",
      width: 800,
      height: 600,
    },
    {
      src: "/images/gallery/03.webp",
      alt: "Escalera de mármol y vidrios impecables",
      width: 800,
      height: 1000,
    },
    {
      src: "/images/gallery/04.webp",
      alt: "Interior con vidrios y pisos brillantes",
      width: 800,
      height: 600,
    },
    {
      src: "/images/gallery/05.webp",
      alt: "Sala con vista panorámica después de la limpieza",
      width: 800,
      height: 600,
    },
    {
      src: "/images/gallery/06.webp",
      alt: "Equipo de limpieza residencial en acción",
      width: 800,
      height: 600,
    },
    {
      src: "/images/gallery/07.webp",
      alt: "Limpieza de oficinas Serlicom",
      width: 800,
      height: 1000,
    },
    {
      src: "/images/gallery/08.webp",
      alt: "Piso pulido post construcción",
      width: 800,
      height: 600,
    },
    {
      src: "/images/gallery/09.webp",
      alt: "Baño limpio y desinfectado",
      width: 800,
      height: 800,
    },
    {
      src: "/images/gallery/10.webp",
      alt: "Fachada de vidrio limpia",
      width: 800,
      height: 500,
    },
    {
      src: "/images/gallery/11.webp",
      alt: "Antes y después de lavado de muebles",
      width: 800,
      height: 800,
    },
    {
      src: "/images/gallery/12.webp",
      alt: "Limpieza post construcción en proceso",
      width: 800,
      height: 600,
    },
  ],
  beforeAfter: [
    {
      before: "/images/before-after/before-1.webp",
      after: "/images/before-after/after-1.webp",
      alt: "Piso post construcción — antes y después del pulido",
    },
    {
      before: "/images/before-after/before-2.webp",
      after: "/images/before-after/after-2.webp",
      alt: "Baño — antes y después de la limpieza profunda",
    },
  ],
  reviews: [
    { name: "Erica Fernandez", source: "Facebook" },
    { name: "Nelson Carranza", source: "Facebook" },
  ],
  images: {
    hero: "/images/hero.webp",
    heroMobile: "/images/hero-mobile.webp",
    parallax1: "/images/parallax-1.webp",
    parallax2: "/images/parallax-2.webp",
    owner: "/images/owner.webp",
    logo: "/logo.png",
  },
  nav: [
    { href: "#servicios", label: "Servicios" },
    { href: "#hogar", label: "Hogar" },
    { href: "#galeria", label: "Galería" },
    { href: "#cobertura", label: "Cobertura" },
    { href: "#contacto", label: "Contacto" },
  ],
  trustChips: [
    "Atención 24/7",
    "Comayagua · Siguatepeque · Palmerola",
    "Personal capacitado y honrado",
  ],
  credit: "Sitio web por IAGO Digital",
  labels: {
    quoteWhatsApp: "Cotiza por WhatsApp",
    quoteWhatsAppLong: "Cotizar por WhatsApp",
    quoteCta: "Cotizar",
    callCta: "Llamar",
    seeServices: "Ver servicios",
    recommends: "Lo recomienda",
    viaFacebook: "vía Facebook",
    seeFacebookPage: "Ver nuestra página en Facebook",
    otherZoneChip: "¿Otra zona? Consúltanos",
  },
  copy: {
    seoTitle:
      "Serlicom Limpieza | Servicios de Limpieza Profesional en Comayagua",
    seoDescription:
      "Limpieza profesional en Comayagua, Siguatepeque y Palmerola. Casas, oficinas, locales y post construcción. Atención 24/7. Cotiza por WhatsApp.",
    heroTitle: "Limpieza profesional en Comayagua",
    heroSubtitle:
      "Casas, oficinas, locales y obras. Personal capacitado, horarios flexibles y atención 24/7.",
    servicesEyebrow: "Servicios",
    servicesTitle: "Lo que hacemos por ti",
    servicesSubtitle:
      "Cotiza el servicio que necesitas por WhatsApp. Respondemos rápido y con claridad.",
    homeEyebrow: "Limpieza de casas",
    homeTitle: "Planes a tu ritmo",
    homeSubtitle:
      "Elige la frecuencia que mejor se adapte a tu hogar. Cotizamos según el tamaño y las necesidades de tu casa.",
    postEyebrow: "Post construcción",
    postTitle: "Tu obra, lista para estrenar",
    postSubtitle:
      "Retiramos polvo, residuos y manchas de la construcción para entregar un espacio limpio y presentable.",
    postIncludesTitle: "Qué incluye",
    audiencesEyebrow: "A quién servimos",
    audiencesTitle: "Espacios que dejamos impecables",
    whyEyebrow: "Por qué elegirnos",
    whyTitle: "Confianza, flexibilidad y buen trabajo",
    whySubtitle:
      "Trabajamos con honestidad y cuidado. Sin promesas exageradas: solo un servicio serio y limpio.",
    galleryEyebrow: "Galería",
    galleryTitle: "Resultados que se notan",
    gallerySubtitle:
      "Mira nuestros trabajos en movimiento. Arrastra con el dedo o el mouse, o toca una foto para verla completa.",
    beforeAfterTitle: "Antes / Después",
    beforeAfterSubtitle: "Arrastra el control para comparar.",
    coverageEyebrow: "Cobertura",
    coverageTitle: "Servimos en toda la zona",
    coverageSubtitle:
      "Atendemos hogares y negocios en Comayagua y alrededores. Si estás en otra zona cercana, escríbenos y te confirmamos disponibilidad.",
    reviewsEyebrow: "Recomendaciones",
    reviewsTitle: "Recomendados en Facebook",
    reviewsSubtitle:
      "Personas reales de nuestra comunidad que nos recomiendan.",
    aboutEyebrow: "Sobre nosotros",
    aboutP1:
      "En Serlicom Limpieza nos importa dejar tu espacio limpio, ordenado y con la confianza de un servicio honesto. Atendemos casas, oficinas, locales y obras con personal capacitado y horarios flexibles.",
    aboutP2:
      "Si necesitas una cotización clara y un trabajo bien hecho, estamos listos para ayudarte.",
    ctaEyebrow: "Contacto",
    ctaTitle: "¿Listo para un espacio impecable?",
    ctaSubtitle:
      "Escríbenos por WhatsApp o llámanos. Cotizamos rápido y nos adaptamos a tu horario.",
    formTitle: "Solicita tu cotización",
    formSubtitle:
      "Completa el formulario y te abrimos WhatsApp con tu mensaje listo.",
  },
  defaultWhatsAppMessage:
    "Hola Serlicom, quiero cotizar un servicio de limpieza",
  keywords: [
    "limpieza Comayagua",
    "Serlicom Limpieza",
    "limpieza profesional Honduras",
    "limpieza post construcción",
    "pulido de pisos Comayagua",
    "fumigación Comayagua",
  ],
};
