/**
 * ENKIRE — Exercism Assets Registry
 *
 * Todos los assets de Exercism son públicos en su CDN.
 * Exercism es open source (MIT) — https://github.com/exercism/website
 *
 * Uso: <img src={EXERCISM_ICONS.logo} alt="..." className="c-icon" />
 *      o con el componente <ExIcon name="logo" size={24} />
 */

const CDN = "https://assets.exercism.org";

// ── Logo & Branding ───────────────────────────────────────────────────
export const EXERCISM_BRAND = {
  logo:              `${CDN}/assets/icons/logo-42e9b829cf6816496069a62608cb51e7c13624bd.svg`,
  logoWithText:      `${CDN}/assets/icons/exercism-with-logo-black-12752bd7fcf6862ba8ad7a2b75e21a9b2409d7fd.svg`,
  face:              `${CDN}/assets/icons/exercism-face-0c7e5dc39e944a18810e6e770430b3f1e06a81cb.svg`,
  faceGradient:      `${CDN}/assets/icons/exercism-face-gradient-31ce1b1261c54ead735cf687a2dc8549b3d00bb1.svg`,
  insiders:          `${CDN}/assets/icons/insiders-d0418ec8b59d21a8852f7326404fa20b2d21785d.svg`,
} as const;

// ── Navigation icons ──────────────────────────────────────────────────
export const EXERCISM_NAV = {
  tracks:            `${CDN}/assets/icons/nav-tracks-9fea2eca1d8eb6bcb7da69ce8e4fd34631b366e3.svg`,
  journey:           `${CDN}/assets/icons/nav-journey-08d0785bc7b3d22d165f2865db17ed403851890a.svg`,
  favorites:         `${CDN}/assets/icons/nav-favorites-94337452e7a69ccfe6225f33837a8c4a370834da.svg`,
  codingFundamentals:`${CDN}/assets/icons/nav-coding-fundamentals-5a04ade8f48cdf1c24c58f4bbff0ec9dcfbf3765.svg`,
} as const;

// ── UI Icons ──────────────────────────────────────────────────────────
export const EXERCISM_ICONS = {
  // Actions & navigation
  arrowRight:        `${CDN}/assets/icons/arrow-right-0f5e363467e0c55fe280b4864639a9c677afa0d2.svg`,
  chevronRight:      `${CDN}/assets/icons/chevron-right-4edf20ec1116acf2e371e8ff03809451274a7b32.svg`,
  chevronDown:       `${CDN}/assets/icons/chevron-down-5ae28e42ee217bae38f4eb1c119cafd0301dd5f6.svg`,
  externalLink:      `${CDN}/assets/icons/external-link-49b422d65245eaf4cb29a072e85d73b5c6b8aa04.svg`,
  moreVertical:      `${CDN}/assets/icons/more-vertical-371ef6f2314bb5dbe5d3892a7ee098c6ebc3cf30.svg`,
  lock:              `${CDN}/assets/icons/lock-e31e8fe15f90d87b88f4248a93af74aeab20205a.svg`,
  envelope:          `${CDN}/assets/icons/envelope-c4a7eb91155513dbe700ac10b9c33d0bf5430756.svg`,

  // User & profile
  reputation:        `${CDN}/assets/icons/reputation-5b5938e36519908ac61075db3b9826307a0f907a.svg`,
  badges:            `${CDN}/assets/icons/badges-72101413cc294464bcbce9d5b1a87a8876fd7cab.svg`,
  codeHistory:       `${CDN}/assets/icons/code-history-f2bb78481f54c3df3b45e294bdc554bbdff4d2b1.svg`,
  journeyIcon:       `${CDN}/assets/icons/journey-640fcffe3952962f384526ed76d053f6d8285151.svg`,
  overview:          `${CDN}/assets/icons/overview-9e9a39e9f2e81d2a28adf4254c588f9864d7e3a3.svg`,
  clock:             `${CDN}/assets/icons/clock-0de46e42eaaa13df638aa34b8f027f4ca1939bc9.svg`,
  location:          `${CDN}/assets/icons/location-bd26e6dfc9d9d8b448b8e1f4637792133e507d2e.svg`,
  pronouns:          `${CDN}/assets/icons/pronouns-914e32be9d1a00f80a2648d8850a0f76c4a0320b.svg`,

  // Profile tabs
  communitySolutions:`${CDN}/assets/icons/community-solutions-ca68d8db02e92d9d9c5e4c46680902caa24d1c11.svg`,
  testimonials:      `${CDN}/assets/icons/testimonials-15961f7587c64f2c588fb12b520cf2b87d029155.svg`,
  editor:            `${CDN}/assets/icons/editor-f3dbecf27d40b9fe69cc3d72364d6376cf9e8710.svg`,

  // Contribute
  mentoring:         `${CDN}/assets/icons/mentoring-4d1e266458e8e3293b94679b92ccea4aa2cdb58b.svg`,
  contributors:      `${CDN}/assets/icons/contributors-8873894d89a89d8a22512b9253d17a57b91df2d7.svg`,
  docs:              `${CDN}/assets/icons/docs-95801430359f8daa2166eda2663cf925b26e7ac6.svg`,
  world:             `${CDN}/assets/icons/world-4ba05a7284d474778d3f04189a4b1cd4b9072abc.svg`,

  // More
  donate:            `${CDN}/assets/icons/donate-f0162e3dfad842a240d30ef6d422c5f4a969d857.svg`,
  report:            `${CDN}/assets/icons/report-23dfcc2b358696fb11fa6c7797edfc0d41ae0803.svg`,
  githubSync:        `${CDN}/assets/icons/feature-github-sync-dcc832dc0153eaefd504c7ec66753b9577fbe1b4.svg`,

  // Discover
  perks:             `${CDN}/assets/icons/perks-gradient-0e53b8b88c052e0ccfe01e285368fc9f9af379d7.svg`,
  briefIntroductions:`${CDN}/assets/icons/brief-introductions-gradient-3439520e35035eed80d2dd3007a6cd169002a506.svg`,
  interviews:        `${CDN}/assets/icons/interview-gradient-af38864f2f7811ce5ed451df999f845ff7ea615b.svg`,
  discourser:        `${CDN}/assets/icons/discourser-a9f3a217ecdcdf6ad48cc87060162217030d2eb8.svg`,

  // Stats & charts
  graphStats:        `${CDN}/assets/icons/graph-stats-gradient-0dd41f7e05fc5bb3d773d1163a85c404b48a9e45.svg`,
  graphStatsAscend:  `${CDN}/assets/icons/graph-stats-ascend-29b3b3b3d2bd334cda360f105d32abcb20dc5a1d.svg`,

  // Social
  youtube:           `${CDN}/assets/icons/external-site-youtube-576ec3c908a28230467d08470876b23c722f30da.svg`,
  discord:           `${CDN}/assets/icons/external-site-discord-blue-601d4e0f105167ec2923cc05ff798066cef6018c.svg`,
  github:            `${CDN}/assets/icons/external-site-github-10a8a76f55f4e6955417df6aa374dd48fab4392b.svg`,
  twitter:           `${CDN}/assets/icons/external-site-twitter-6717f73e3402edb200e17233edc6d9aa756d084c.svg`,
  linkedin:          `${CDN}/assets/icons/external-site-linkedin-1e825fbe14315235a1da06998809a2a43df943fd.svg`,
  facebook:          `${CDN}/assets/icons/external-site-facebook-30d7c9862735514b98cc354bc12f460a4a40d26b.svg`,
} as const;

// ── Badges ────────────────────────────────────────────────────────────
export const EXERCISM_BADGES = {
  member:         `${CDN}/assets/icons/logo-42e9b829cf6816496069a62608cb51e7c13624bd.svg`,
  rookie:         `${CDN}/assets/icons/editor-f3dbecf27d40b9fe69cc3d72364d6376cf9e8710.svg`,
  mentor:         `${CDN}/assets/icons/mentor-7fa3f6f7fa650a6071d1aa948a1fa473e6165eac.svg`,
  helloWorld:     `${CDN}/assets/icons/hello-world-8a137e4e845879992ff11d5ec033abe7d22506c2.svg`,
  contributor:    `${CDN}/assets/icons/contributors-8873894d89a89d8a22512b9253d17a57b91df2d7.svg`,
  discourser:     `${CDN}/assets/icons/discourser-a9f3a217ecdcdf6ad48cc87060162217030d2eb8.svg`,
  mindshiftMay:   `${CDN}/assets/icons/badge-mind-shifting-may-8fe3782de178e58f9c8227bd1bd5824b22378ac9.svg`,
  participant48in24: `${CDN}/assets/icons/48in24-participant-bd0b363b0549c66b3fa8551a69caf32ac08b6853.svg`,
} as const;

// ── Illustrations / Graphics ──────────────────────────────────────────
export const EXERCISM_GRAPHICS = {
  bookworm:          `${CDN}/assets/graphics/bookworm-b39e980b491e10b663396031154cfc970919a9a0.svg`,
  mentoring:         `${CDN}/assets/graphics/mentoring-20449daf6b95a22d0abd6aae371a8eb9d79991d5.svg`,
  contributing:      `${CDN}/assets/graphics/contributing-header-427afae89cc113b9f90c19abdc12fab7ed213880.svg`,
  floatingCash:      `${CDN}/assets/graphics/floating-cash-e98605b30b350b681009ec481a48b58226f26a69.svg`,
  personCelebrating: `${CDN}/assets/graphics/person-celebrating-34db9abf8929114a4b32aeadd383196f74b03370.svg`,
  missingTrack:      `${CDN}/assets/graphics/missing-track-e3d861058d4702c1dc4036617689249659b8d37d.svg`,
} as const;

// ── Programming Language Track Icons ──────────────────────────────────
export const EXERCISM_TRACKS = {
  prolog:      `${CDN}/tracks/prolog.svg`,
  haskell:     `${CDN}/tracks/haskell.svg`,
  rust:        `${CDN}/tracks/rust.svg`,
  python:      `${CDN}/tracks/python.svg`,
  javascript:  `${CDN}/tracks/javascript.svg`,
  typescript:  `${CDN}/tracks/typescript.svg`,
  ruby:        `${CDN}/tracks/ruby.svg`,
  java:        `${CDN}/tracks/java.svg`,
  go:          `${CDN}/tracks/go.svg`,
  csharp:      `${CDN}/tracks/csharp.svg`,
  cpp:         `${CDN}/tracks/cpp.svg`,
  elixir:      `${CDN}/tracks/elixir.svg`,
  scala:       `${CDN}/tracks/scala.svg`,
  kotlin:      `${CDN}/tracks/kotlin.svg`,
  swift:       `${CDN}/tracks/swift.svg`,
  bash:        `${CDN}/tracks/bash.svg`,
  // Add any other language your tracks cover:
  // "your-lang": `${CDN}/tracks/your-lang.svg`,
} as const;

// ── Exercise type icons ───────────────────────────────────────────────
// These work for any exercise — Exercism has 200+ exercise icons
export function getExerciseIconUrl(slug: string): string {
  return `${CDN}/exercises/${slug}.svg`;
}

// ── Helper component types ────────────────────────────────────────────
export type ExIconCategory = "icons" | "badges" | "graphics" | "tracks" | "nav";

/**
 * Get any Exercism icon URL by category + name
 *
 * Usage:
 *   getExercismAsset("badges", "mentor")     → mentor badge SVG URL
 *   getExercismAsset("graphics", "bookworm") → bookworm illustration URL
 *   getExercismAsset("tracks", "prolog")     → Prolog track icon URL
 */
export function getExercismAsset(
  category: ExIconCategory,
  name: string
): string | undefined {
  const map: Record<ExIconCategory, Record<string, string>> = {
    icons:    EXERCISM_ICONS,
    badges:   EXERCISM_BADGES,
    graphics: EXERCISM_GRAPHICS,
    tracks:   EXERCISM_TRACKS,
    nav:      EXERCISM_NAV,
  };
  return (map[category] as Record<string, string>)[name];
}
