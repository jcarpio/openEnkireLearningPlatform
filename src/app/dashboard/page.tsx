import Link from "next/link";
import { ChevronRight, Zap, BookOpen, Award, TrendingUp } from "lucide-react";
import { MOCK_USER, MOCK_TRACKS, MOCK_USER_PROGRESS, MOCK_USER_BADGES } from "@/lib/mockData";
import { getLevelFromXp, getLevelProgress, getXpToNextLevel, getXpInLevel } from "@/lib/types";
import { formatXp, formatRelativeDate, cn } from "@/lib/utils";

export default function DashboardPage() {
  const user = MOCK_USER;
  const level = getLevelFromXp(user.totalXp);
  const levelPct = getLevelProgress(user.totalXp);
  const xpInLevel = getXpInLevel(user.totalXp);
  const xpToNext = getXpToNextLevel(user.totalXp);
  const totalCompleted = MOCK_USER_PROGRESS.reduce((a, p) => a + p.completedExercises.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8 animate-fade-up">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
             style={{ background: "linear-gradient(135deg, #6200ee, #7c3aed)" }}>
          {level}
        </div>
        <div>
          <h1 className="text-h1 mb-1">Hola, {user.displayName.split(" ")[0]} 👋</h1>
          <p className="text-p-base" style={{ color: "var(--color-text-muted)" }}>{user.bio?.slice(0, 80)}...</p>
        </div>
      </div>

      {/* XP Bar */}
      <div className="c-card p-5 mb-6 stagger-1 animate-fade-up">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-h3 font-bold">Nivel {level}</span>
            <span className="c-primary-reputation text-xs">{formatXp(user.totalXp)} XP total</span>
          </div>
          <span className="text-p-small" style={{ color: "var(--color-text-muted)" }}>
            {xpInLevel} / 500 · faltan {xpToNext} XP para nv. {level + 1}
          </span>
        </div>
        <div className="progress-bar-track" style={{ height: "10px" }}>
          <div className="progress-bar-fill" style={{ width: `${levelPct}%` }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 stagger-2 animate-fade-up">
        {[
          { icon: Zap,       label: "XP total",        value: formatXp(user.totalXp), color: "#6200ee", bg: "#faf5ff" },
          { icon: BookOpen,  label: "Ejercicios",       value: totalCompleted,         color: "#00c65e", bg: "#f0fdf4" },
          { icon: Award,     label: "Badges",           value: MOCK_USER_BADGES.length, color: "#f5a623", bg: "#fffbeb" },
          { icon: TrendingUp,label: "Tracks activos",   value: MOCK_USER_PROGRESS.length, color: "#e74c3c", bg: "#fef2f2" },
        ].map(s => (
          <div key={s.label} className="c-card p-5 flex items-start gap-3" style={{ background: s.bg }}>
            <s.icon size={20} style={{ color: s.color, marginTop: "2px" }} />
            <div>
              <div className="text-h2 font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-p-small" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tracks */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h3">Mis Tracks</h2>
          <div className="flex items-center gap-1 text-sm font-semibold"
               style={{ background: "var(--color-bg)", padding: "4px 10px", borderRadius: "9999px", border: "1px solid var(--color-border)" }}>
            {MOCK_USER_PROGRESS.length} tracks
          </div>
        </div>

        {MOCK_USER_PROGRESS.length === 0 ? (
          <div className="c-card p-8 text-center" style={{ color: "var(--color-text-muted)" }}>
            <div className="text-4xl mb-3">🌱</div>
            <p className="font-semibold">Aún no has empezado ningún track.</p>
            <Link href="/tracks" className="btn btn-primary mt-4 inline-flex">Explorar tracks</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {MOCK_USER_PROGRESS.map((prog, i) => {
              const track = MOCK_TRACKS.find(t => t.id === prog.trackId);
              if (!track) return null;
              return (
                <Link key={prog.trackId} href={`/tracks/${track.slug}`}
                  className={cn("c-card c-card-hover flex items-center gap-5 p-5 animate-fade-up", `stagger-${i+1}`)}
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="text-3xl">{track.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold">{track.title}</span>
                      <span className="font-bold text-sm" style={{ color: track.color }}>{prog.percentComplete}%</span>
                    </div>
                    <div className="progress-bar-track mb-1.5">
                      <div className="progress-bar-fill" style={{ width: `${prog.percentComplete}%`, background: track.color }} />
                    </div>
                    <div className="flex justify-between text-xs" style={{ color: "var(--color-text-muted)" }}>
                      <span>{prog.completedExercises.length} / {track.totalExercises} ejercicios</span>
                      <span>+{prog.totalXpEarned} XP · {formatRelativeDate(prog.lastTouched)}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
                </Link>
              );
            })}
            <Link href="/tracks" className="btn btn-default w-full justify-center mt-2">
              + Explorar más tracks
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
