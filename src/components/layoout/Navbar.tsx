"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen, Compass, Users, MoreHorizontal, Bell,
  ChevronRight, LogOut, Settings, User, Map,
  Video, MessageSquare, Star, FileText, Globe,
  Heart, Info, TrendingUp, Github, PlayCircle,
  Mic, BookMarked, Award
} from "lucide-react";
import { MOCK_USER, MOCK_USER_BADGES } from "@/lib/mockData";
import { getLevelFromXp, formatXp } from "@/lib/types";
import { cn } from "@/lib/utils";

// ── Menu definitions ────────────────────────────────────────────────

const LEARN_ITEMS = [
  { href: "/tracks",   icon: BookOpen,    title: "Tracks",     desc: "Todos los tracks disponibles" },
  { href: "/dashboard",icon: Compass,     title: "Mis Tracks", desc: "Tu progreso y tracks activos" },
];

const DISCOVER_ITEMS = [
  { href: "/discover/videos",      icon: Video,        title: "Vídeos de la comunidad", desc: "Streamings, walkthroughs y más" },
  { href: "/discover/intro-series",icon: PlayCircle,   title: "Serie de introducción",  desc: "Presentaciones cortas de cada track" },
  { href: "/discover/interviews",  icon: Mic,          title: "Entrevistas e historias", desc: "Inspírate con las historias de otros" },
  { href: "/discover/forum",       icon: MessageSquare,title: "Foro",                   desc: "Profundiza en los temas" },
  { href: "/discover/community",   icon: Users,        title: "Comunidad",              desc: "Feed de actividad y respuestas" },
  { href: "/discover/testimonials",icon: Star,         title: "Testimonios",            desc: "Valoraciones a los mentores" },
];

const CONTRIBUTE_ITEMS = [
  { href: "/contribute",            icon: Compass,  title: "Cómo empezar",    desc: "Cómo puedes ayudar a Enkire" },
  { href: "/mentor",                icon: Users,    title: "Mentoría",        desc: "Apoya a otros mientras aprenden" },
  { href: "/contribute/docs",       icon: FileText, title: "Docs",            desc: "Todo lo que necesitas para ayudar" },
  { href: "/contribute/contributors",icon: Award,  title: "Colaboradores",   desc: "El equipo detrás de Enkire" },
  { href: "/contribute/translators",icon: Globe,   title: "Traductores",     desc: "Apoya el proyecto de localización" },
];

const MORE_ITEMS = [
  { href: "/more/about",    icon: Info,        title: "Acerca de",       desc: "Misión y filosofía open source" },
  { href: "/more/impact",   icon: TrendingUp,  title: "Nuestro impacto", desc: "Estadísticas de la plataforma" },
  { href: "https://github.com/enkire/enkire-platform", icon: Github, title: "GitHub", desc: "Repositorio open source", external: true },
  { href: "/more/donate",   icon: Heart,       title: "Donar",           desc: "Para mantener el proyecto vivo" },
];

// ── Dropdown component ───────────────────────────────────────────────
function NavDropdown({ items, onClose }: {
  items: typeof LEARN_ITEMS;
  onClose: () => void;
}) {
  return (
    <div className="nav-dropdown" style={{ minWidth: "260px" }}>
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="nav-dropdown-item"
          {...("external" in item && item.external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          <div className="icon-wrap">
            <item.icon size={18} style={{ color: "var(--color-purple)" }} />
          </div>
          <div>
            <h6>{item.title}</h6>
            <p>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ── User dropdown ────────────────────────────────────────────────────
function UserDropdown({ user, onClose }: { user: typeof MOCK_USER; onClose: () => void }) {
  return (
    <div className="nav-dropdown" style={{ minWidth: "220px", right: 0, left: "auto" }}>
      {/* Profile row */}
      <Link href="/profile" onClick={onClose} className="nav-dropdown-item" style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "12px", marginBottom: "4px" }}>
        <div className="c-avatar" style={{ backgroundImage: `url("${user.avatarUrl}")`, width:40, height:40 }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{user.displayName}</div>
          <div style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>@{user.username}</div>
        </div>
        <ChevronRight size={14} style={{ marginLeft: "auto", color: "var(--color-text-muted)" }} />
      </Link>
      {/* Reputation */}
      <div style={{ padding: "8px 16px", borderBottom: "1px solid var(--color-border)", marginBottom: "4px" }}>
        <span className="c-primary-reputation" style={{ fontSize: "0.8125rem" }}>
          <Award size={14} />
          {user.totalXp} XP
        </span>
      </div>
      {[
        { href: "/profile",   label: "Perfil público" },
        { href: "/journey",   label: "Tu Journey" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/tracks",    label: "Tracks" },
        { href: "/mentor",    label: "Mentoría" },
      ].map(item => (
        <Link key={item.href} href={item.href} onClick={onClose}
          className="nav-dropdown-item" style={{ padding: "8px 16px" }}>
          <span style={{ fontSize: "0.875rem" }}>{item.label}</span>
        </Link>
      ))}
      <div style={{ borderTop: "1px solid var(--color-border)", marginTop: "4px", paddingTop: "4px" }}>
        <Link href="/settings" onClick={onClose} className="nav-dropdown-item" style={{ padding: "8px 16px" }}>
          <Settings size={15} style={{ color: "var(--color-text-muted)" }} />
          <span style={{ fontSize: "0.875rem" }}>Ajustes</span>
        </Link>
        <button className="nav-dropdown-item w-full text-left" style={{ padding: "8px 16px", background: "none", border: "none", cursor: "pointer", color: "var(--color-error)", width: "100%" }}>
          <LogOut size={15} />
          <span style={{ fontSize: "0.875rem" }}>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}

// ── NavItem with dropdown ────────────────────────────────────────────
function NavItem({ label, items, isActive }: {
  label: string;
  items: typeof LEARN_ITEMS;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
          "text-white/80 hover:text-white hover:bg-white/10",
          open && "bg-white/10 text-white"
        )}
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" className={cn("transition-transform", open && "rotate-180")}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </button>
      {open && <NavDropdown items={items} onClose={() => setOpen(false)} />}
    </li>
  );
}

// ── Main Navbar ──────────────────────────────────────────────────────
export function Navbar() {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const user = MOCK_USER;
  const level = getLevelFromXp(user.totalXp);
  const earnedCount = MOCK_USER_BADGES.length;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <Link href="/more/about" className="announcement-bar hidden md:flex">
        <span>🌿</span>
        <span>Enkire es un proyecto open source y gratuito —</span>
        <strong>¡Contribuye si puedes!</strong>
      </Link>

      {/* Main header */}
      <header
        style={{ background: "var(--color-header-bg)", borderBottom: "1px solid var(--color-header-border)" }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-enkire-purple flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <span className="text-white font-semibold text-base hidden xl:block tracking-tight group-hover:text-white/90 transition-colors">
                enkire
              </span>
            </Link>

            {/* Nav */}
            <nav className="flex-1">
              <ul className="flex items-center gap-0.5">
                <NavItem label="Aprender"   items={LEARN_ITEMS}      isActive={pathname?.startsWith("/tracks") || pathname === "/dashboard"} />
                <NavItem label="Descubrir"  items={DISCOVER_ITEMS}   isActive={pathname?.startsWith("/discover")} />
                <NavItem label="Contribuir" items={CONTRIBUTE_ITEMS} isActive={pathname?.startsWith("/contribute") || pathname?.startsWith("/mentor")} />
                <NavItem label="Más"        items={MORE_ITEMS}        isActive={pathname?.startsWith("/more")} />
              </ul>
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Bell size={18} />
                <span className="notif-dot">3</span>
              </button>

              {/* XP / Reputation */}
              <Link href="/journey" className="hidden sm:flex">
                <span className="c-primary-reputation" style={{ fontSize: "0.8125rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  {formatXp(user.totalXp)}
                </span>
              </Link>

              {/* User avatar */}
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  className={cn(
                    "flex items-center gap-2 p-1 rounded-lg transition-all",
                    "hover:bg-white/10",
                    userMenuOpen && "bg-white/10"
                  )}
                >
                  <div
                    className="c-avatar border-2 border-white/20"
                    style={{ backgroundImage: `url("${user.avatarUrl}")`, width: 34, height: 34 }}
                  />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/60">
                    <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
                {userMenuOpen && (
                  <UserDropdown user={user} onClose={() => setUserMenuOpen(false)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
