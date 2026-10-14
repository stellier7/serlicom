# Serlicom Limpieza

Sitio web de marketing (una sola página) para **Serlicom Limpieza**, empresa de limpieza profesional en Comayagua, Honduras.

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + Motion (`motion/react`)
- **Salida:** export estático (`output: 'export'`) — ideal para Vercel free tier
- **Idioma:** español (es-HN)
- **Conversión:** WhatsApp (sin backend)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # genera /out
npm start       # sirve /out
```

## Contenido de negocio (`src/config.ts`)

Todo el contenido editable vive en **`src/config.ts`**: nombre, teléfono, WhatsApp, email, dueño, servicios, zonas, horarios, reseñas, redes, rutas de imágenes y flag de precios.

Los componentes **solo leen de `CONFIG`**. No hardcodees textos de negocio en componentes.

### Activar precios

Por defecto:

```ts
pricing: { enabled: false }
```

Cada plan muestra **"Cotiza por WhatsApp"**. Para publicar precios:

```ts
pricing: {
  enabled: true,
  plans: {
    diario: "Desde L 350",
    semanal: "Desde L 800",
    mensual: "Desde L 2,500",
  },
}
```

### Agregar citas reales a reseñas

Las reseñas actuales solo muestran nombre + “Lo recomienda” (sin inventar texto). Para añadir una cita:

```ts
{ name: "Erica Fernandez", source: "Facebook", quote: "Texto real de la recomendación." }
```

### Antes / Después

Agrega pares en `CONFIG.beforeAfter`. Si el array está vacío, el bloque se oculta solo.

```ts
beforeAfter: [
  {
    before: "/images/before-after/before-1.webp",
    after: "/images/before-after/after-1.webp",
    alt: "Sala después de limpieza profunda",
  },
]
```

## Fotos

1. Coloca los originales en **`/raw-images/`** (está en `.gitignore`, no se sube a git).
2. Estructura sugerida:

```text
raw-images/
  hero.jpg
  parallax-1.jpg
  parallax-2.jpg
  owner.jpg          # opcional
  services/
    hogar.jpg
    oficinas.jpg
    post-construccion.jpg
    pisos.jpg
    banos.jpg
    vidrios.jpg
    muebles.jpg
    colchones.jpg
    fumigacion.jpg
  gallery/
    01.jpg … 12.jpg
  before-after/
    before-1.jpg
    after-1.jpg
```

3. Optimiza:

```bash
npm run images
```

El script (`scripts/optimize-images.mjs`) escribe WebP en `/public/images/` (calidad ~75, sin metadatos), con presupuestos de tamaño y aviso si algo se pasa. También genera `hero-mobile.webp` desde `hero` si no existe uno aparte.

`npm run build` ejecuta la optimización **solo si** existe `/raw-images`.

Hasta que existan los archivos, el sitio muestra placeholders con gradiente (nada se rompe).

## Despliegue en Vercel

1. Conecta el repo a Vercel.
2. Framework preset: **Next.js**. Build: `npm run build`. Output: estático (`/out` vía `output: 'export'`).
3. **`vercel.json`** limita deploys a **`main`** (sin preview por cada rama de agente).
4. Trabaja en una rama, haz PR y **mergea a `main` para desplegar**.

Actualiza `CONFIG.siteUrl` con tu dominio real antes de publicar (afecta sitemap, Open Graph y JSON-LD).

## Checklist post-lanzamiento

- [ ] Subir fotos reales a `raw-images/` y correr `npm run images`
- [ ] Confirmar `siteUrl` en `src/config.ts`
- [ ] Probar CTAs de WhatsApp en móvil
- [ ] (Opcional) Activar precios y/o quotes de reseñas
