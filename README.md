# 🌿 Enkire Learning Platform

**Una plataforma de aprendizaje por tracks — open source, gratuita, gamificada.**

Inspirada en [Exercism.org](https://exercism.org), adaptada para cualquier tipo de contenido: guitarra, yoga, tantra, mindfulness, programación y más. Con mentoría humana, quizzes autograduados, soporte dual de vídeo y la estética limpia de Exercism.

---

## ✨ Features

| Feature | Descripción |
|---|---|
| **Tracks** | Colecciones de ejercicios secuenciados por tema |
| **Vídeo dual** | YouTube (privado/no listado) + Cloudflare Stream / Bunny.net |
| **Quiz autograduado** | Preguntas con feedback inmediato y explicaciones |
| **Entrega multimedia** | Vídeo/audio/imagen — mentor revisa y da feedback |
| **Gamificación** | XP, niveles, badges estilo Exercism |
| **Journey** | Tu historia en la plataforma (reputación, badges, historial) |
| **Panel mentor** | Revisa entregas, aprueba, otorga XP |
| **Comunidad** | Alumnos se ayudan entre sí, testimonios |
| **Estética Exercism** | Poppins, paleta dark navy/violeta, hexágonos |

---

## 🚀 Instalación en 3 pasos

```bash
git clone https://github.com/tu-usuario/enkire.git
cd enkire
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — funciona con datos mock sin configuración adicional.

---

## 📹 Soporte de vídeo

### Opción A: YouTube (gratis, recomendado para empezar)

1. Sube tu vídeo a YouTube como **"No listado"** o **"Privado"**
2. Añade los emails de tus alumnos como espectadores (si es privado)
3. En el ejercicio, pon `videoProvider: "youtube"` y el ID del vídeo

```typescript
// En mockData.ts o en la base de datos:
{
  type: "video_lesson",
  videoProvider: "youtube",
  videoId: "dQw4w9WgXcQ",  // el ID después de ?v= en la URL
}
```

⚠️ **Limitación:** YouTube no listado no es 100% hermético. Cualquiera con el link puede ver el vídeo.

### Opción B: Cloudflare Stream (≈$5/mes — recomendado para producción)

URLs firmadas por usuario/tiempo — solo alumnos matriculados acceden.

1. Crea cuenta en [cloudflare.com/products/cloudflare-stream](https://cloudflare.com/products/cloudflare-stream)
2. Sube tus vídeos y copia el Stream ID
3. Configura en `.env.local`:

```env
CLOUDFLARE_ACCOUNT_ID=tu-account-id
CLOUDFLARE_STREAM_TOKEN=tu-token
```

### Opción C: Bunny.net (más barato, ~$0.005/min)

Similar a Cloudflare pero más económico para volúmenes pequeños.

---

## 🗄️ Base de datos (Supabase)

### 1. Crear proyecto

Ve a [supabase.com](https://supabase.com) → **New Project** → elige región EU (GDPR).

### 2. Ejecutar schema

En **SQL Editor**, pega y ejecuta `supabase/schema.sql`.

### 3. Variables de entorno

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## ☁️ Deploy en Vercel

```bash
# Opción A: desde GitHub (recomendado)
# 1. Push a GitHub
# 2. Importa en vercel.com
# 3. Añade las variables de entorno
# 4. Deploy ✅

# Opción B: Vercel CLI
npm i -g vercel
vercel --prod
```

---

## 🗂️ Estructura

```
enkire/
├── src/
│   ├── app/
│   │   ├── page.tsx              → Dashboard principal
│   │   ├── tracks/               → Catálogo de tracks
│   │   ├── tracks/[slug]/        → Detalle de track
│   │   ├── exercises/[id]/       → Ejercicio (quiz/video/entrega)
│   │   ├── journey/              → Tu Journey (XP, badges, historial)
│   │   ├── profile/              → Perfil público
│   │   ├── dashboard/            → Mis tracks y progreso
│   │   ├── mentor/               → Panel de mentoría
│   │   └── more/impact/          → Nuestro impacto
│   ├── components/
│   │   ├── layout/Navbar.tsx     → Navbar completa con 5 menús
│   │   └── video/VideoPlayer.tsx → Player YouTube + Cloudflare + Bunny
│   └── lib/
│       ├── types.ts              → Todos los tipos TypeScript
│       ├── mockData.ts           → Datos de demo
│       └── utils.ts              → Utilidades
└── supabase/
    └── schema.sql                → Schema completo + RLS + triggers
```

---

## 🎨 Estética

Inspirada fielmente en Exercism.org:

- **Fuente:** Poppins (misma que Exercism)
- **Colores:** `#1b1b2e` header · `#6200ee` violeta · `#f5f6fb` background
- **Badges:** hexagonales con rareza (common → ultimate)
- **Reputación:** contador violeta estilo Exercism
- **Journey:** página hero oscura con gradiente
- **Progreso:** barras en violeta

---

## 📋 Navegación v1

| Menú | Items |
|---|---|
| **Aprender** | Tracks, Mis Tracks |
| **Descubrir** | Vídeos, Serie intro, Entrevistas, Foro, Comunidad, Testimonios |
| **Contribuir** | Cómo empezar, Mentoría, Docs, Colaboradores, Traductores |
| **Más** | Acerca de, Nuestro impacto, GitHub, Donar |
| **Barra usuario** | 🔔 Notificaciones · ⚡ XP · Perfil · Journey · Ajustes |

---

## 🔮 Roadmap

- [ ] Autenticación real (Supabase Auth + OAuth)
- [ ] Editor visual de ejercicios (sin código)
- [ ] Notificaciones por email al mentor
- [ ] Foro con threads y respuestas
- [ ] Racha diaria (streak tracking)
- [ ] Certificados PDF al completar track
- [ ] PWA — modo móvil offline
- [ ] Alumnos avanzados como mentores junior
- [ ] Multi-instancia (cada formador, su Enkire)

---

## 🛠️ Stack

| Tech | Uso |
|---|---|
| **Next.js 14** | Framework + App Router |
| **TypeScript** | Tipos estrictos |
| **Tailwind CSS** | Estilos |
| **Supabase** | Auth + PostgreSQL + Storage |
| **Vercel** | Deploy |

---

*Enkire — donde las preguntas correctas abren el camino* 🌿

© 2026 Enkire Learning Platform · Open Source · MIT License
