import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Zap, Lock, CheckCircle2, ChevronRight, PlayCircle, FileQuestion, Upload } from "lucide-react";
import { MOCK_TRACKS, MOCK_EXERCISES, MOCK_USER_PROGRESS } from "@/lib/mockData";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS, cn } from "@/lib/utils";

interface PageProps { params: Promise<{ slug: string }> }

export default async function TrackPage({ params }: PageProps) {
  const { slug } = await params;
  const track = MOCK_TRACKS.find(t => t.slug === slug);
  if (!track) notFound();

  const exercises = MOCK_EXERCISES
    .filter(e => e.trackSlug === slug)
    .sort((a, b) => a.order - b.order);

  const progress = MOCK_USER_PROGRESS.find(p => p.trackId === track.id);
  const completedIds = new Set(progress?.completedExercises ?? []);
  const pct = progress?.percentComplete ?? 0;

  const EXERCISE_TYPE_ICONS = {
    quiz:             { icon: FileQuestion, label: "Quiz",    color: "#f5a623", bg: "#fffbeb" },
    media_submission: { icon: Upload,       label: "Entrega", color: "#e74c3c", bg: "#fef2f2" },
    video_lesson:     { icon: PlayCircle,   label: "Vídeo",   color: "#6200ee", bg: "#f5f3ff" },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link href="/tracks" className="inline-flex items-center gap-1.5 text-sm mb-6 group"
            style={{ color: "var(--color-text-muted)", textDecoration: "none" }}>
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Todos los tracks
      </Link>

      {/* Header card */}
      <div className="c-card p-7 mb-8 animate-fade-up"
           style={{ background: `linear-gradient(135deg, ${track.color}10, ${track.color}05)`, borderColor: `${track.color}30` }}>
        <div className="flex items-start gap-5 flex-wrap">
          <div className="text-6xl">{track.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={cn("text-xs font-medium border rounded-full px-2.5 py-0.5", DIFFICULTY_COLORS[track.difficulty])}>
                {DIFFICULTY_LABELS[track.difficulty]}
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{track.category}</span>
              {track.tags.map(tag => (
                <span key={tag} className="text-xs rounded-full px-2.5 py-0.5 border"
                      style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border)" }}>
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-h1 mb-2" style={{ color: track.color }}>{track.title}</h1>
            <p className="text-p-base leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
              {track.longDescription ?? track.description}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <span className="flex items-center gap-1.5"><BookOpen size={14} />{track.totalExercises} ejercicios</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />~{track.estimatedHours}h estimadas</span>
              <span className="flex items-center gap-1.5"><Zap size={14} />Hasta {track.totalExercises * 75} XP</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        {progress && (
          <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${track.color}30` }}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span style={{ color: "var(--color-text-muted)" }}>Tu progreso</span>
              <span className="font-bold" style={{ color: track.color }}>{pct}%</span>
            </div>
            <div className="progress-bar-track" style={{ height: "8px" }}>
              <div className="progress-bar-fill" style={{ width: `${pct}%`, background: track.color }} />
            </div>
          </div>
        )}
      </div>

      {/* Exercises */}
      <div>
        <h2 className="text-h3 mb-4">Ejercicios</h2>
        <div className="space-y-3">
          {exercises.map((ex, i) => {
            const done     = completedIds.has(ex.id);
            const isNext   = !done && (i === 0 || completedIds.has(exercises[i-1]?.id));
            const isLocked = !done && !isNext && i > 0;
            const typeInfo = EXERCISE_TYPE_ICONS[ex.type];

            return (
              <Link
                key={ex.id}
                href={isLocked ? "#" : `/exercises/${ex.id}`}
                className={cn(
                  "c-card flex items-center gap-4 p-5 animate-fade-up",
                  `stagger-${Math.min(i+1,6)}`,
                  !isLocked && "c-card-hover",
                  isLocked && "opacity-50 pointer-events-none",
                  done && "border-green-200",
                  isNext && "ring-2 ring-enkire-purple/30"
                )}
                style={{ textDecoration: "none", color: "inherit",
                         background: done ? "#f0fdf4" : isNext ? "#faf5ff" : undefined }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-semibold text-sm",
                  done      ? "bg-green-100 text-green-600" :
                  isLocked  ? "bg-gray-100 text-gray-400" :
                              "text-white"
                )}
                     style={!done && !isLocked ? { background: track.color } : undefined}>
                  {done ? <CheckCircle2 size={20} /> : isLocked ? <Lock size={16} /> : ex.order}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-semibold text-sm">{ex.title}</span>
                    <span className="text-xs rounded-full px-2 py-0.5 font-medium"
                          style={{ background: typeInfo.bg, color: typeInfo.color }}>
                      <typeInfo.icon size={11} className="inline mr-1" />
                      {typeInfo.label}
                    </span>
                  </div>
                  <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
                    {ex.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: "var(--color-purple)" }}>
                    <Zap size={12} />{ex.xpReward} XP
                  </span>
                  {!isLocked && <ChevronRight size={16} style={{ color: "var(--color-text-muted)" }} />}
                </div>
              </Link>
            );
          })}

          {track.totalExercises > exercises.length && (
            <div className="c-card p-5 text-center text-sm opacity-40"
                 style={{ color: "var(--color-text-muted)" }}>
              🔮 {track.totalExercises - exercises.length} ejercicios más próximamente…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: "guitarra-flamenca" }, { slug: "yoga-hatha" },
    { slug: "tantra-consciente" }, { slug: "mindfulness-diario" },
    { slug: "prolog-ia" }, { slug: "haskell-funcional" }
  ];
}
