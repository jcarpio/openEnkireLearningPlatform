import Link from "next/link";
import { Award, BookOpen, Users, Star, ChevronRight } from "lucide-react";
import { MOCK_USER, MOCK_USER_BADGES, MOCK_BADGES, MOCK_USER_PROGRESS, MOCK_TRACKS } from "@/lib/mockData";
import { getLevelFromXp, getLevelProgress, getXpToNextLevel, getXpInLevel } from "@/lib/types";
import { formatXp, formatRelativeDate, formatJoinDate, RARITY_LABELS, RARITY_COLORS, cn } from "@/lib/utils";

export default function JourneyPage() {
  const user = MOCK_USER;
  const level = getLevelFromXp(user.totalXp);
  const levelPct = getLevelProgress(user.totalXp);
  const xpInLevel = getXpInLevel(user.totalXp);
  const xpToNext = getXpToNextLevel(user.totalXp);
  const earnedBadgeIds = new Set(MOCK_USER_BADGES.map(ub => ub.badgeId));
  const totalCompleted = MOCK_USER_PROGRESS.reduce((acc, p) => acc + p.completedExercises.length, 0);

  return (
    <div>
      {/* Hero — dark gradient like Exercism */}
      <div className="journey-hero relative py-16 px-4 text-white text-center overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Privacy badge */}
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-3 py-1 text-sm mb-6 text-white/70">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z"/>
            </svg>
            Privado · Solo tú puedes ver esto
          </div>

          {/* Journey icon */}
          <svg className="mx-auto mb-4 opacity-80" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7.5 3.767L5.934 1.418a1.5 1.5 0 00-2.59.161L.75 6.767h12L10.681 2.629a1.5 1.5 0 00-2.4-.39l-1.1 1.053"/>
            <polygon points="20.25 3 17.25 11.25 23.25 11.25 20.25 3"/>
            <line x1="20.25" y1="11.25" x2="20.25" y2="14.25"/>
            <polygon points="3.75 12 0.75 20.25 6.75 20.25 3.75 12"/>
            <line x1="3.75" y1="20.25" x2="3.75" y2="23.25"/>
          </svg>

          <h1 className="text-h0 mb-2">Tu Journey</h1>
          <p className="text-p-large opacity-70 mb-8">Explorando tu tiempo en Enkire</p>

          {/* Track icons */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {MOCK_USER_PROGRESS.map(prog => {
              const track = MOCK_TRACKS.find(t => t.id === prog.trackId);
              if (!track) return null;
              return (
                <div key={prog.trackId}
                     className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-2xl bg-white/10 backdrop-blur-sm">
                  {track.emoji}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Overview stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "XP Total",     value: formatXp(user.totalXp), icon: "⚡", color: "#6200ee" },
            { label: "Ejercicios",   value: totalCompleted,         icon: "📝", color: "#00c65e" },
            { label: "Badges",       value: earnedBadgeIds.size,    icon: "🏅", color: "#f5a623" },
            { label: "Nivel",        value: level,                  icon: "🎯", color: "#e74c3c" },
          ].map(stat => (
            <div key={stat.label} className="c-card p-5 text-center animate-fade-up">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-h1 font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="label-large">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* XP & Level */}
        <section className="c-card p-6 mb-8">
          <h2 className="text-h3 mb-5 flex items-center gap-2">
            <span>⚡</span> Reputación y Nivel
          </h2>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                 style={{ background: "linear-gradient(135deg, #6200ee, #7c3aed)" }}>
              {level}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1.5 text-sm">
                <span className="font-semibold">Nivel {level}</span>
                <span style={{ color: "var(--color-text-muted)" }}>
                  {xpInLevel} / 500 XP · faltan {xpToNext} XP
                </span>
              </div>
              <div className="progress-bar-track" style={{ height: "10px" }}>
                <div className="progress-bar-fill" style={{ width: `${levelPct}%` }} />
              </div>
            </div>
          </div>
          <p className="text-p-small" style={{ color: "var(--color-text-muted)" }}>
            XP total acumulado: <strong style={{ color: "var(--color-purple)" }}>{formatXp(user.totalXp)}</strong> · Miembro desde {formatJoinDate(user.joinedAt)}
          </p>
        </section>

        {/* Learning tracks */}
        <section className="mb-8">
          <div className="section-header">
            <div className="c-icon-hex"><BookOpen size={20} style={{ color: "var(--color-purple)" }} /></div>
            <h2 className="text-h3">Aprendizaje</h2>
            <hr className="c-divider" />
          </div>
          <div className="space-y-4">
            {MOCK_USER_PROGRESS.map((prog, i) => {
              const track = MOCK_TRACKS.find(t => t.id === prog.trackId);
              if (!track) return null;
              return (
                <Link key={prog.trackId} href={`/tracks/${track.slug}`}
                  className={`c-card c-card-hover flex items-center gap-4 p-5 animate-fade-up stagger-${i+1}`}
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="text-3xl">{track.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold">{track.title}</span>
                      <span className="text-sm font-bold" style={{ color: "var(--color-purple)" }}>
                        {prog.percentComplete}%
                      </span>
                    </div>
                    <div className="progress-bar-track mb-1.5">
                      <div className="progress-bar-fill" style={{ width: `${prog.percentComplete}%` }} />
                    </div>
                    <div className="flex justify-between text-xs" style={{ color: "var(--color-text-muted)" }}>
                      <span>{prog.completedExercises.length} / {track.totalExercises} ejercicios completados</span>
                      <span>Último: {formatRelativeDate(prog.lastTouched)}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--color-text-muted)" }} />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Badges */}
        <section>
          <div className="section-header">
            <div className="c-icon-hex"><Award size={20} style={{ color: "var(--color-purple)" }} /></div>
            <h2 className="text-h3">{earnedBadgeIds.size} badges coleccionados</h2>
            <hr className="c-divider" />
            <Link href="/journey/badges" className="c-prominent-link text-sm whitespace-nowrap">
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {MOCK_BADGES.map((badge, i) => {
              const earned = earnedBadgeIds.has(badge.id);
              const userBadge = MOCK_USER_BADGES.find(ub => ub.badgeId === badge.id);
              return (
                <div key={badge.id}
                  className={cn(
                    "c-card p-4 flex flex-col items-center text-center gap-2 transition-all",
                    "animate-fade-up",
                    `stagger-${Math.min(i+1,6)}`,
                    !earned && "opacity-40 grayscale"
                  )}>
                  <div className={cn("c-badge-medallion", `--${badge.rarity}`)} style={{ width: 48, height: 48 }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-xs leading-tight">{badge.name}</div>
                    <div className={cn("text-xs font-medium uppercase tracking-wide mt-0.5", RARITY_COLORS[badge.rarity])}>
                      {RARITY_LABELS[badge.rarity]}
                    </div>
                  </div>
                  <p className="text-xs leading-snug" style={{ color: "var(--color-text-muted)" }}>
                    {badge.description}
                  </p>
                  {earned && userBadge && (
                    <div className="text-xs font-medium" style={{ color: "var(--color-success)" }}>
                      ✓ Obtenido
                    </div>
                  )}
                  {!earned && (
                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {badge.condition}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
