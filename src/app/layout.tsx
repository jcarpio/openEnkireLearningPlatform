import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Enkire — Learning Platform",
  description: "Aprende con propósito. Tracks de guitarra, yoga, tantra, mindfulness, programación y más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                     style={{ background: "var(--color-purple)" }}>E</div>
                <span className="font-semibold" style={{ color: "var(--color-text)" }}>enkire</span>
              </div>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", margin: 0 }}>
                © 2026 Enkire Learning Platform · Open Source · MIT License
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
