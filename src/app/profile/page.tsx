import Link from "next/link";
import { MapPin, Clock, ChevronRight, Award } from "lucide-react";
import { MOCK_USER, MOCK_USER_BADGES, MOCK_BADGES, MOCK_TESTIMONIALS, MOCK_USER_PROGRESS, MOCK_TRACKS } from "@/lib/mockData";
import { formatXp, formatJoinDate, RARITY_COLORS, cn } from "@/lib/utils";
import { getLevelFromXp } from "@/lib/types";

export default function ProfilePage() {
  const user = MOCK_USER;
  const level = getLevelFromXp(user.totalXp);
  const earnedBadgeIds = new Set(MOCK_USER_BADGES.map(ub => ub.badgeId));
  const earnedBadges = MOCK_BADGES.filter(b => earnedBadgeIds.has(b.id));
  const totalMentored = 51;
  const totalStudents = 46;

  return (
    <div id="page-profile">
      {/* Profile header */}
      <div className="c-profile-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Info section */}
          <div className="flex items-start gap-5 pb-6 flex-wrap">
            {/* Avatar */}
            <div className="c-avatar c-avatar-xl border-4 border-white shadow-card-lg"
                 style={{ backgroundImage: `url("${user.avatarUrl}")`, borderRadius: "50%", flexShrink: 0 }} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-h1 m-0">{user.displayName}</h1>
                <span className="c-primary-reputation">
                  <Award size={14} />
                  {formatXp(user.totalXp)}
                </span>
                {/* Track icons */}
                <div className="flex items-center gap-1">
                  {MOCK_USER_PROGRESS.slice(0,2).map(prog => {
                    const track = MOCK_TRACKS.find(t => t.id === prog.trackId);
                    if (!track) return null;
                    return (
                      <div key={prog.trackId} className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                           style={{ background: `${track.color}18` }}>
                        {track.emoji}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="font-medium text-sm mb-2" style={{ color: "var(--color-text-muted)" }}>@{user.username}</div>
              {/* Details */}
              <div className="flex flex-wrap items-center gap-4 mb-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {user.location && (
                  <span className="flex items-center gap-1"><MapPin size={13} />{user.location}</span>
                )}
                {user.pronouns && (
                  <span className="flex items-center gap-1">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
                    {user.pronouns}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock size={13} />Miembro desde {formatJoinDate(user.joinedAt)}
                </span>
              </div>
              {/* Bio */}
              {user.bio && (
                <p className="text-p-small leading-relaxed max-w-2xl" style={{ color: "var(--color-text-muted)" }}>
                  {user.bio}
                </p>
              )}
            </div>

            {/* Badges preview */}
            <div className="c-card p-4 min-w-[200px]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Award size={16} style={{ color: "var(--color-purple)" }} />
                  {earnedBadges.length} badges
                </div>
                <Link href="/journey" className="c-prominent-link text-xs">
                  Ver todos <ChevronRight size={12} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {earnedBadges.slice(0, 5).map(badge => (
                  <div key={badge.id} className={cn("c-badge-medallion", `--${badge.rarity}`)}>
                    <Award size={16} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 border-t" style={{ borderColor: "var(--color-border)" }}>
            {[
              { href: "/profile", label: "Resumen",             icon: "📊", active: true },
              { href: "/profile/solutions", label: "Soluciones publicadas", icon: "💻" },
              { href: "/profile/testimonials", label: "Testimonios",   icon: "💬" },
              { href: "/profile/badges", label: "Badges",            icon: "🏅" },
            ].map(tab => (
              <Link key={tab.href} href={tab.href}
                className={cn("c-tab", tab.active && "selected")}>
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            ))}
            {/* External links */}
            <div className="flex items-center gap-3 ml-auto">
              {user.githubHandle && (
                <a href={`https://github.com/${user.githubHandle}`} target="_blank" rel="noreferrer"
                   className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Contributions summary */}
        <section className="c-card p-6 mb-8">
          <h2 className="text-h3 mb-5">Contribuciones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Soluciones publicadas", value: 53,              icon: "💻", color: "#6200ee" },
              { label: "Alumnos mentorizados",  value: totalStudents,   icon: "👥", color: "#00c65e" },
              { label: "Discusiones de mentoría",value: totalMentored, icon: "💬", color: "#f5a623" },
              { label: "Reputación",            value: formatXp(user.totalXp), icon: "⭐", color: "#e74c3c" },
            ].map(stat => (
              <div key={stat.label} className="text-center p-3 rounded-xl"
                   style={{ background: `${stat.color}10` }}>
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-h3 font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-p-small" style={{ color: "var(--color-text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        {MOCK_TESTIMONIALS.length > 0 && (
          <section className="mb-8">
            <div className="section-header">
              <div className="c-icon-hex">💬</div>
              <h2 className="text-h3">{MOCK_TESTIMONIALS.length} testimonios recibidos</h2>
              <hr className="c-divider" />
              <Link href="/profile/testimonials" className="c-prominent-link text-sm whitespace-nowrap">
                Ver todos <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_TESTIMONIALS.map((t, i) => (
                <div key={t.id} className={`c-card p-5 animate-fade-up stagger-${i+1}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="c-avatar"
                         style={{ backgroundImage: `url("${t.student.avatarUrl}")` }} />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{t.student.handle}</div>
                      <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        en {t.exercise.title} · {t.track.title}
                      </div>
                    </div>
                  </div>
                  <p className="text-p-small italic" style={{ color: "var(--color-text-2)" }}>
                    "{t.content}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
