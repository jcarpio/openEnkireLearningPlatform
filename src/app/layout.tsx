import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Enkire — Learning Platform",
  description: "Aprende con propósito. Tracks de guitarra, yoga, tantra, mindfulness, programación y más. Con mentoría humana y gamificación.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Poppins from Google Fonts as fallback */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 112px)" }}>
          {children}
        </main>
        <footer style={{
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          padding: "48px 0 32px",
          marginTop: "64px",
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-enkire-purple flex items-center justify-center text-white font-bold text-sm">E</div>
                  <span className="font-semibold text-base" style={{ color: "var(--color-text)" }}>enkire</span>
                </div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", maxWidth: "280px", lineHeight: "1.6" }}>
                  Una plataforma de aprendizaje open source para formadores y alumnos. Gratuita, colaborativa y gamificada.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
                {[
                  { title: "Aprender", links: [["Tracks", "/tracks"], ["Mi progreso", "/dashboard"], ["Journey", "/journey"]] },
                  { title: "Contribuir", links: [["Mentoría", "/mentor"], ["Docs", "/contribute/docs"], ["GitHub", "https://github.com"]] },
                  { title: "Comunidad", links: [["Foro", "/discover/forum"], ["Vídeos", "/discover/videos"], ["Testimonios", "/discover/testimonials"]] },
                  { title: "Más", links: [["Acerca de", "/more/about"], ["Impacto", "/more/impact"], ["Donar", "/more/donate"]] },
                ].map(col => (
                  <div key={col.title}>
                    <h3 style={{ fontWeight: 600, marginBottom: "12px", fontSize: "0.8125rem", color: "var(--color-text)" }}>{col.title}</h3>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                      {col.links.map(([label, href]) => (
                        <li key={label}>
                          <a href={href} style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.8125rem" }}
                             className="hover:text-enkire-purple transition-colors">
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", margin: 0 }}>
                Enkire es un proyecto open source. Todos los formadores son bienvenidos.
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", margin: 0 }}>
                © 2026 Enkire Learning Platform
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
