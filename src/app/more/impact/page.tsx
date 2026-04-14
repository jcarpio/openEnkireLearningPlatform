import { MOCK_IMPACT, MOCK_TRACKS } from "@/lib/mockData";
import Link from "next/link";

export default function ImpactPage() {
  return (
    <div id="impact-page">
      {/* Hero */}
      <header className="journey-hero py-16 text-white text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-h5 mb-4 opacity-70 flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zM2 20h20v2H2v-2zm2-4V6l8-4 8 4v10H4zm2-1.5h12V7.5l-6-3-6 3v7z"/></svg>
            Enkire Impact Report
          </h1>
          <h2 className="text-h0 mb-4 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Hemos proporcionado{" "}
            <strong className="px-3 py-1 rounded-lg"
                    style={{ background: "#f5a623", color: "#1b1b2e" }}>
              {(MOCK_IMPACT.minutesOfLearning).toLocaleString("es-ES")}
            </strong>{" "}
            minutos de educación gratuita.
          </h2>
          <p className="text-p-large opacity-70 max-w-xl mx-auto">
            ¡Y añadimos más cada día! Todo en un proyecto open source financiado por personas como tú.
          </p>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          {/* Numbers */}
          <div className="c-card overflow-hidden">
            {[
              { label: "Alumnos",              value: MOCK_IMPACT.students.toLocaleString("es-ES"),         bg: "var(--color-surface)" },
              { label: "Ejercicios enviados",  value: MOCK_IMPACT.exerciseSubmissions.toLocaleString("es-ES"), bg: "var(--color-bg)" },
              { label: "Discusiones de mentoría", value: MOCK_IMPACT.mentoringDiscussions.toLocaleString("es-ES"), bg: "var(--color-surface)" },
            ].map(stat => (
              <div key={stat.label} className="py-4 px-6" style={{ background: stat.bg, borderBottom: "1px solid var(--color-border)" }}>
                <div className="label-large mb-1">{stat.label}</div>
                <div className="text-h1 font-bold" style={{ color: "var(--color-purple)" }}>
                  {stat.value}
                </div>
              </div>
            ))}
            <div className="p-5" style={{ background: "var(--color-bg)" }}>
              <p className="text-p-base font-semibold mb-1">Todo en Enkire es 100% gratuito.</p>
              <p className="text-p-small" style={{ color: "var(--color-text-muted)" }}>
                Enkire enseña a través de tracks de contenido variado usando una mezcla única de aprendizaje, práctica y mentoría.
              </p>
            </div>
          </div>

          {/* Tracks available */}
          <div className="c-card p-6">
            <h3 className="text-h4 mb-4">Tracks disponibles</h3>
            <div className="space-y-3">
              {MOCK_TRACKS.map(track => (
                <Link key={track.id} href={`/tracks/${track.slug}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="text-2xl">{track.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{track.title}</div>
                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {track.totalExercises} ejercicios · {track.estimatedHours}h
                    </div>
                  </div>
                  <div className="text-xs px-2 py-0.5 rounded-full font-medium"
                       style={{ background: `${track.color}18`, color: track.color }}>
                    {track.category}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="c-card p-8 mb-8 text-center"
             style={{ background: "linear-gradient(135deg, #1b1b2e, #2d1b69)", color: "white" }}>
          <h2 className="text-h1 mb-4">
            Enkire está impulsado por formadores y alumnos apasionados.
          </h2>
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-6">
            {[
              { value: "10", label: "Mentores" },
              { value: "∞", label: "Colaboradores" },
              { value: "3", label: "Equipo central" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-h1 font-bold" style={{ color: "#f5a623" }}>{s.value}</div>
                <div className="text-p-small opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="c-card p-8 text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-h2 mb-3">Conviértete en combustible de nuestra misión</h2>
          <p className="text-p-large mb-6" style={{ color: "var(--color-text-muted)" }}>
            Hemos construido todo esto de forma gratuita. ¡Imagina lo que podríamos hacer con tu apoyo!
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/more/donate" className="btn btn-primary">❤️ Donar</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-default">
              ⭐ Star en GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
