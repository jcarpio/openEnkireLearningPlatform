import Link from "next/link";
import { ChevronRight, BookOpen, Clock, Users, Award, TrendingUp } from "lucide-react";
import { MOCK_TRACKS, MOCK_USER, MOCK_USER_PROGRESS, MOCK_USER_BADGES } from "@/lib/mockData";
import { getLevelFromXp, getLevelProgress, getXpToNextLevel } from "@/lib/types";
import { formatRelativeDate, formatXp } from "@/lib/utils";

export default function HomePage() {
  const user = MOCK_USER;
  const level = getLevelFromXp(user.totalXp);
  const levelProgress = getLevelProgress(user.totalXp);
  const xpToNext = getXpToNextLevel(user.totalXp);
  const recentProgress = MOCK_USER_PROGRESS.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Summary bar */}
      <div className="c-card mb-6 p-4 sm:p-5 flex items-center gap-4 flex-wrap">
        <div className="c-avatar c-avatar-lg border-2 border-enkire-purple/20"
             style={{ backgroundImage: `url("${user.avatarUrl}")` }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="text-h4 m-0" style={{ color: "var(--color-text)" }}>
              {user.displayName}
            </h1>
            <span className="c-primary-reputation" style={{ fontSize: "0.8125rem" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {formatXp(user.totalXp)}
            </span>
          </div>
          {/* XP bar */}
          <div className="flex items-center gap-3">
            <span className="text-p-small" style={{ color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
              Nivel {level}
            </span>
            <div className="progress-bar-track flex-1" style={{ maxWidth: "200px" }}>
              <div className="progress-bar-fill" style={{ width: `${levelProgress}%` }} />
            </div>
            <span className="text-p-small" style={{ color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
              {xpToNext} XP para nv.{level + 1}
            </span>
          </div>
        </div>

        {/* Badges preview */}
        <Link href="/journey" className="flex items-center gap-2 group">
          <div className="flex items-center gap-1">
            {MOCK_USER_BADGES.slice(0, 4).map((ub, i) => (
              <div key={ub.badgeId} className="c-badge-medallion --rare" style={{ marginLeft: i > 0 ? "-8px" : "0", zIndex: 4 - i, position: "relative" }}>
                <Award size={16} />
              </div>
            ))}
            {MOCK_USER_BADGES.length > 4 && (
              <span className="text-p-small ml-2" style={{ color: "var(--color-text-muted)" }}>
                + {MOCK_USER_BADGES.length - 4} más
              </span>
            )}
          </div>
        </Link>

        <Link href="/journey" className="c-prominent-link">
          <TrendingUp size={15} />
          Ver tu Journey
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Where to start */}
          <section>
            <h2 className="text-h3 mb-4">Por dónde empezar…</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: BookOpen, label: "Continuar\nen tus tracks",    href: "/tracks",          color: "#6200ee" },
                { icon: Users,    label: "Probar la\nmentoría",          href: "/mentor",          color: "#00c65e" },
                { icon: Users,    label: "Unirte a la\ncomunidad",       href: "/discover/community", color: "#f5a623" },
                { icon: Award,    label: "Ver tu\nJourney",             href: "/journey",         color: "#e74c3c" },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="c-card c-card-hover flex flex-col items-center text-center p-4 gap-2 text-decoration-none"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                       style={{ background: `${item.color}18` }}>
                    <item.icon size={22} style={{ color: item.color }} />
                  </div>
                  <span className="text-p-small font-medium whitespace-pre-line leading-tight">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Active tracks */}
          <section>
            <h2 className="text-h3 mb-4">Tus Tracks</h2>
            {recentProgress.length === 0 ? (
              <div className="c-card p-8 text-center" style={{ color: "var(--color-text-muted)" }}>
                <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                <p>Aún no has empezado ningún track.</p>
                <Link href="/tracks" className="btn btn-primary mt-4 inline-flex">Explorar tracks</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProgress.map((prog, i) => {
                  const track = MOCK_TRACKS.find(t => t.id === prog.trackId);
                  if (!track) return null;
                  return (
                    <Link key={prog.trackId} href={`/tracks/${track.slug}`}
                      className={`c-card c-card-hover flex items-center gap-4 p-4 animate-fade-up stagger-${i+1}`}
                      style={{ textDecoration: "none", color: "inherit" }}>
                      <div className="text-3xl">{track.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{track.title}</span>
                          <span className="text-sm font-bold" style={{ color: "var(--color-purple)" }}>
                            {prog.percentComplete}%
                          </span>
                        </div>
                        <div className="progress-bar-track mb-1">
                          <div className="progress-bar-fill" style={{ width: `${prog.percentComplete}%` }} />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-p-small" style={{ color: "var(--color-text-muted)" }}>
                            {prog.completedExercises.length} / {track.totalExercises} ejercicios
                          </span>
                          <span className="text-p-small" style={{ color: "var(--color-text-muted)" }}>
                            Último: {formatRelativeDate(prog.lastTouched)}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
                    </Link>
                  );
                })}
                <Link href="/tracks" className="c-prominent-link text-sm">
                  Ver todos tus tracks <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Stats */}
          <section className="c-card p-5">
            <h3 className="text-h5 mb-4">Estadísticas</h3>
            <div className="space-y-3">
              {[
                { label: "XP total",          value: formatXp(user.totalXp), icon: "⚡" },
                { label: "Tracks activos",     value: recentProgress.length,  icon: "📚" },
                { label: "Badges obtenidos",   value: MOCK_USER_BADGES.length, icon: "🏅" },
                { label: "Nivel actual",       value: `Nivel ${level}`,        icon: "🎯" },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between py-2"
                     style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <span className="text-p-small" style={{ color: "var(--color-text-muted)" }}>
                    {stat.icon} {stat.label}
                  </span>
                  <span className="font-semibold text-sm">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Clear workspace */}
          <div className="c-card p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-h5 mb-2">Tu espacio está libre.</h3>
            <p className="text-p-small mb-4" style={{ color: "var(--color-text-muted)" }}>
              ¿Tienes tiempo para mentorear a más alumnos?
            </p>
            <Link href="/mentor" className="btn btn-default btn-s">
              Ver cola de mentoría
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
