import type {
  Track, Exercise, Badge, User, UserProgress, UserBadge, Testimonial
} from "./types";

// ─── Mock Tracks ─────────────────────────────────────────────────────
export const MOCK_TRACKS: Track[] = [
  {
    id: "t1", slug: "guitarra-flamenca",
    title: "Guitarra Flamenca",
    description: "Desde los rasgueos básicos hasta las falsetas más expresivas. Un viaje al corazón del flamenco.",
    longDescription: "El flamenco es mucho más que música — es alma en movimiento. En este track aprenderás postura, rasgueos, compás, escalas y las técnicas que hacen inconfundible el sonido flamenco.",
    emoji: "🎸", iconUrl: undefined,
    color: "#e74c3c", category: "Música",
    difficulty: "beginner", totalExercises: 12, estimatedHours: 20,
    tags: ["música","flamenco","guitarra","ritmo"],
    authorId: "u-jose", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z", isPublished: true,
  },
  {
    id: "t2", slug: "yoga-hatha",
    title: "Yoga Hatha: Fundamentos",
    description: "Conecta cuerpo, mente y respiración. Un camino hacia el equilibrio interior.",
    longDescription: "El Hatha Yoga es la raíz de la mayoría de estilos modernos. Asanas, pranayama y meditación para desarrollar fuerza, flexibilidad y presencia.",
    emoji: "🧘", iconUrl: undefined,
    color: "#27ae60", category: "Bienestar",
    difficulty: "beginner", totalExercises: 10, estimatedHours: 15,
    tags: ["yoga","meditación","bienestar","respiración"],
    authorId: "u-jose", createdAt: "2024-02-01T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z", isPublished: true,
  },
  {
    id: "t3", slug: "tantra-consciente",
    title: "Tantra Consciente",
    description: "Explora la energía vital y la conexión profunda. Un camino de autoconocimiento y expansión.",
    emoji: "🌺", iconUrl: undefined,
    color: "#e67e22", category: "Desarrollo Personal",
    difficulty: "intermediate", totalExercises: 8, estimatedHours: 12,
    tags: ["tantra","consciencia","energía","cuerpo"],
    authorId: "u-jose", createdAt: "2024-03-01T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z", isPublished: true,
  },
  {
    id: "t4", slug: "mindfulness-diario",
    title: "Mindfulness en lo Cotidiano",
    description: "Transforma los momentos ordinarios en oportunidades de presencia y paz interior.",
    emoji: "🍃", iconUrl: undefined,
    color: "#16a085", category: "Meditación",
    difficulty: "beginner", totalExercises: 15, estimatedHours: 10,
    tags: ["mindfulness","meditación","presencia","estrés"],
    authorId: "u-jose", createdAt: "2024-04-01T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z", isPublished: true,
  },
  {
    id: "t5", slug: "prolog-ia",
    title: "Prolog e Inteligencia Artificial",
    description: "El lenguaje de la lógica. Aprende a pensar como una máquina que razona.",
    emoji: "🧠", iconUrl: undefined,
    color: "#6200ee", category: "Programación",
    difficulty: "advanced", totalExercises: 20, estimatedHours: 40,
    tags: ["prolog","IA","lógica","programación"],
    authorId: "u-jose", createdAt: "2024-05-01T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z", isPublished: true,
  },
  {
    id: "t6", slug: "haskell-funcional",
    title: "Haskell Funcional",
    description: "Programación funcional pura. Tipos, monads y elegancia matemática.",
    emoji: "λ", iconUrl: undefined,
    color: "#5c6bc0", category: "Programación",
    difficulty: "advanced", totalExercises: 18, estimatedHours: 35,
    tags: ["haskell","funcional","tipos","monads"],
    authorId: "u-jose", createdAt: "2024-05-15T10:00:00Z", updatedAt: "2024-06-01T10:00:00Z", isPublished: true,
  },
];

// ─── Mock Exercises ───────────────────────────────────────────────────
export const MOCK_EXERCISES: Exercise[] = [
  {
    id: "e1", trackId: "t1", trackSlug: "guitarra-flamenca",
    title: "La postura correcta", order: 1, xpReward: 50, difficulty: "beginner",
    type: "quiz",
    description: "La base de todo — aprende cómo sostener la guitarra flamenca.",
    instructions: "Antes de tocar una sola nota, la postura lo es todo. Responde para demostrar que comprendes los fundamentos.",
    questions: [
      {
        id: "q1", text: "¿En qué pierna descansa la guitarra flamenca para un guitarrista diestro?",
        type: "single",
        options: [
          { id: "a", text: "Pierna derecha", isCorrect: false },
          { id: "b", text: "Pierna izquierda", isCorrect: true },
          { id: "c", text: "Ambas por igual", isCorrect: false },
        ],
        explanation: "En flamenco la guitarra descansa sobre la pierna izquierda (diestros), con el pie en un pequeño taburete.",
      },
    ],
    passingScore: 100,
    createdAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "e2", trackId: "t1", trackSlug: "guitarra-flamenca",
    title: "Introducción al flamenco", order: 0, xpReward: 30, difficulty: "beginner",
    type: "video_lesson",
    description: "Historia y esencia del flamenco. Vídeo introductorio.",
    instructions: "Mira el vídeo completo antes de continuar.",
    videoProvider: "youtube",
    videoId: "dQw4w9WgXcQ", // placeholder
    videoDurationMins: 12,
    requiresCompletion: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "e3", trackId: "t1", trackSlug: "guitarra-flamenca",
    title: "Tu primer rasgueo", order: 2, xpReward: 100, difficulty: "beginner",
    type: "media_submission",
    description: "Graba tu primer intento de rasgueo básico.",
    instructions: "Practica el rasgueo simple: ppp-i (pulgar + índice). Graba 30 segundos mostrando tu mano derecha.",
    submissionPrompt: "Graba un vídeo corto (30-60 seg) mostrando tu rasgueo. El mentor te dará feedback personalizado.",
    acceptedTypes: ["video"],
    maxFileSizeMb: 50,
    createdAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "e4", trackId: "t2", trackSlug: "yoga-hatha",
    title: "Fundamentos del Pranayama", order: 1, xpReward: 50, difficulty: "beginner",
    type: "quiz",
    description: "La respiración es el puente entre el cuerpo y la mente.",
    instructions: "Aprende las tres fases de la respiración completa yoga.",
    questions: [
      {
        id: "q3", text: "¿Cuál es el significado de Pranayama?",
        type: "single",
        options: [
          { id: "a", text: "Respiración profunda", isCorrect: false },
          { id: "b", text: "Extensión de la energía vital", isCorrect: true },
          { id: "c", text: "Postura corporal", isCorrect: false },
        ],
        explanation: "Prana = energía vital. Ayama = extensión. El pranayama expande la energía a través de la respiración.",
      },
    ],
    passingScore: 100,
    createdAt: "2024-02-02T10:00:00Z",
  },
];

// ─── Badges ───────────────────────────────────────────────────────────
export const MOCK_BADGES: Badge[] = [
  { id: "b1", slug: "member",       name: "Miembro",       description: "Te uniste a Enkire",            iconName: "logo",        rarity: "common",    numAwardees: 2776984, condition: "Únete a la plataforma" },
  { id: "b2", slug: "rookie",       name: "Rookie",        description: "Enviaste tu primer ejercicio",  iconName: "editor",      rarity: "common",    numAwardees: 881306,  condition: "Completa 1 ejercicio" },
  { id: "b3", slug: "hello-world",  name: "¡Hola Mundo!",  description: "Empezaste 5 tracks distintos",  iconName: "hello-world", rarity: "rare",      numAwardees: 24138,   condition: "Inicia 5 tracks" },
  { id: "b4", slug: "mentor",       name: "Mentor",        description: "Ayudaste a 10 alumnos",         iconName: "mentor",      rarity: "rare",      numAwardees: 2930,    condition: "Mentorea 10 alumnos" },
  { id: "b5", slug: "contributor",  name: "Contribuidor",  description: "Contribuiste al proyecto",      iconName: "contributors",rarity: "ultimate",  numAwardees: 15667,   condition: "Contribuye al proyecto" },
  { id: "b6", slug: "discourser",   name: "Forer@",        description: "Te uniste al foro",             iconName: "discourser",  rarity: "common",    numAwardees: 11458,   condition: "Únete al foro" },
  { id: "b7", slug: "whatever",     name: "Lo que sea",    description: "Completaste el ejercicio Bob",  iconName: "whatever",    rarity: "common",    numAwardees: 95924,   condition: "Completa ejercicio Bob" },
  { id: "b8", slug: "mindshift",    name: "Cambio Mental", description: "5 ejercicios en 1 semana",      iconName: "mindshift",   rarity: "rare",      numAwardees: 1330,    condition: "5 ejercicios en 7 días" },
  { id: "b9", slug: "streak-7",     name: "Racha x7",      description: "7 días consecutivos",          iconName: "streak",      rarity: "epic",      numAwardees: 8522,    condition: "Racha de 7 días" },
];

// ─── Mock User ────────────────────────────────────────────────────────
export const MOCK_USER: User = {
  id: "u-jose",
  email: "jose@enkire.com",
  username: "enkire",
  displayName: "enkire",
  avatarUrl: "https://assets.exercism.org/avatars/1863110/1",
  role: "mentor",
  bio: "More than 15 years teaching Prolog and Haskell at University of Huelva at the south of Spain next to Portugal. I love Technology, Yoga, Business, Trading, Nature and Kitesurfing.",
  location: "Huelva",
  pronouns: "He/him/his",
  githubHandle: "jcarpio",
  linkedinHandle: "josecarpio",
  twitterHandle: "jcarpio",
  totalXp: 1850,
  level: 4,
  joinedAt: "2024-04-01T11:47:16Z",
};

export const MOCK_USER_PROGRESS: UserProgress[] = [
  { userId:"u-jose", trackId:"t1", completedExercises:["e1","e2"], currentExerciseOrder:3, totalXpEarned:80, startedAt:"2024-06-01T10:00:00Z", percentComplete:17, lastTouched:"2024-06-10T10:00:00Z" },
  { userId:"u-jose", trackId:"t2", completedExercises:["e4"], currentExerciseOrder:2, totalXpEarned:50, startedAt:"2024-06-05T10:00:00Z", percentComplete:10, lastTouched:"2024-06-08T10:00:00Z" },
  { userId:"u-jose", trackId:"t5", completedExercises:[], currentExerciseOrder:1, totalXpEarned:0, startedAt:"2024-06-12T10:00:00Z", percentComplete:0, lastTouched:"2024-06-12T10:00:00Z" },
];

export const MOCK_USER_BADGES: UserBadge[] = [
  { userId:"u-jose", badgeId:"b1", earnedAt:"2024-04-01T11:47:16Z" },
  { userId:"u-jose", badgeId:"b2", earnedAt:"2024-04-01T12:40:05Z" },
  { userId:"u-jose", badgeId:"b3", earnedAt:"2025-05-09T08:54:42Z" },
  { userId:"u-jose", badgeId:"b4", earnedAt:"2025-03-03T13:36:30Z" },
  { userId:"u-jose", badgeId:"b5", earnedAt:"2024-05-14T05:00:12Z" },
  { userId:"u-jose", badgeId:"b6", earnedAt:"2024-04-05T13:48:10Z" },
  { userId:"u-jose", badgeId:"b7", earnedAt:"2025-02-21T21:34:37Z" },
  { userId:"u-jose", badgeId:"b8", earnedAt:"2025-05-08T10:01:04Z" },
  { userId:"u-jose", badgeId:"b9", earnedAt:"2025-01-23T15:06:42Z" },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id:"tm1",
    content:"I truly appreciate enkire's guidance on my Prolog code. It was incredibly helpful and made a big difference.",
    student:{ handle:"dengqj", avatarUrl:"https://assets.exercism.org/avatars/2172013/0" },
    mentor:{ handle:"enkire", avatarUrl:"https://assets.exercism.org/avatars/1863110/1" },
    exercise:{ title:"Anagram", iconUrl:"https://assets.exercism.org/exercises/anagram.svg" },
    track:{ title:"Prolog", iconUrl:"https://assets.exercism.org/tracks/prolog.svg" },
    createdAt:"2025-03-15T01:55:24Z",
  },
  {
    id:"tm2",
    content:"Jose helped a lot, and actually linked a lesson that he made himself!",
    student:{ handle:"lucasqueiroz23", avatarUrl:"https://assets.exercism.org/avatars/1267649/0" },
    mentor:{ handle:"enkire", avatarUrl:"https://assets.exercism.org/avatars/1863110/1" },
    exercise:{ title:"Queen Attack", iconUrl:"https://assets.exercism.org/exercises/queen-attack.svg" },
    track:{ title:"Prolog", iconUrl:"https://assets.exercism.org/tracks/prolog.svg" },
    createdAt:"2025-04-30T18:12:31Z",
  },
];

// ─── Live activity (Impact page) ─────────────────────────────────────
export const MOCK_IMPACT = {
  students: 127,
  exerciseSubmissions: 843,
  mentoringDiscussions: 52,
  minutesOfLearning: 12460,
  tracksAvailable: MOCK_TRACKS.length,
};
