import Link from "next/link";
import { Clock, BookOpen, ChevronRight, Zap } from "lucide-react";
import { MOCK_TRACKS, MOCK_USER_PROGRESS } from "@/lib/mockData";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS, cn } from "@/lib/utils";

export default function TracksPage() {
  const categories = [...new Set(MOCK_TRACKS.map(t => t.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="text-h1 mb-2">Todos los Tracks</h1>
        <p className="text-p-large" style={{ color: "var(--color-text-muted)" }}>
          Explora nuestra colección de tracks de aprendizaje. Cada track incluye ejercicios secuenciados,
          vídeos, quizzes y mentoría personalizada.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="btn btn-primary btn-s">Todos</button>
        {categories.map(cat => (
          <button key={cat} className="btn btn-default btn-s">{cat}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_TRACKS.map((track, i) => {
          const progress = MOCK_USER_PROGRESS.find(p => p.trackId === track.id);
          const hasStarted = !!progress;
          const pct = progress?.percentComplete ?? 0;

          return (
            <Link
              key={track.id}
              href={`/tracks/${track.slug}`}
              className={`c-card c-card-hover flex flex-col p-6 animate-fade-up stagger-${Math.min(i+1,6)}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                     style={{ background: `${track.color}18`, border: `1px solid ${track.color}30` }}>
                  {track.emoji}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={cn("text-xs font-medium border rounded-full px-2.5 py-0.5", DIFFICULTY_COLORS[track.difficulty])}>
                    {DIFFICULTY_LABELS[track.difficulty]}
                  </span>
                  <span className="text-p-small" style={{ color: "var(--color-text-muted)" }}>
                    {track.category}
                  </span>
                </div>
              </div>

              {/* Title & description */}
              <h3 className="text-h4 mb-2" style={{ color: track.color }}>{track.title}</h3>
              <p className="text-p-small leading-relaxed mb-4 flex-1"
                 style={{ color: "var(--color-text-muted)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {track.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4"
                   style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {track.totalExercises} ejercicios
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  ~{track.estimatedHours}h
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={12} />
                  hasta {track.totalExercises * 75} XP
                </span>
              </div>

              {/* Progress or CTA */}
              {hasStarted ? (
                <div>
                  <div className="flex justify-between mb-1.5" style={{ fontSize: "0.75rem" }}>
                    <span style={{ color: "var(--color-text-muted)" }}>Progreso</span>
                    <span className="font-semibold" style={{ color: track.color }}>{pct}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${pct}%`, background: track.color }} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                     style={{ color: track.color }}>
                  Comenzar track
                  <ChevronRight size={15} />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
