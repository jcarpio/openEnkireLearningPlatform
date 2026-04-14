"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock, MessageSquare, Send, Zap } from "lucide-react";
import { cn, formatRelativeDate } from "@/lib/utils";
import type { SubmissionStatus } from "@/lib/types";

const PENDING_SUBMISSIONS = [
  { id: "s1", studentName: "Carlos Mendoza", studentInitial: "C", exerciseTitle: "Tu primer rasgueo", trackTitle: "Guitarra Flamenca", trackEmoji: "🎸", mediaType: "video" as const, submittedAt: "2024-06-10T14:30:00Z", status: "pending" as SubmissionStatus, note: "He grabado el rasgueo lento a 60BPM. No estoy seguro si la postura de la muñeca es correcta.", xpToAward: 100 },
  { id: "s2", studentName: "Laura Vidal",    studentInitial: "L", exerciseTitle: "Tu primer rasgueo", trackTitle: "Guitarra Flamenca", trackEmoji: "🎸", mediaType: "audio" as const, submittedAt: "2024-06-09T09:15:00Z", status: "in_review" as SubmissionStatus, note: "Primera vez que toco. Espero mejorar mucho con tu feedback.", xpToAward: 100 },
  { id: "s3", studentName: "Marco Silva",    studentInitial: "M", exerciseTitle: "Postura en Tadasana", trackTitle: "Yoga Hatha",        trackEmoji: "🧘", mediaType: "image" as const, submittedAt: "2024-06-08T18:00:00Z", status: "pending" as SubmissionStatus, note: "Adjunto foto frontal y lateral de mi postura en Tadasana.", xpToAward: 80 },
];

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  pending:    "bg-yellow-50 text-yellow-700 border-yellow-200",
  in_review:  "bg-blue-50 text-blue-700 border-blue-200",
  approved:   "bg-green-50 text-green-700 border-green-200",
  needs_work: "bg-red-50 text-red-700 border-red-200",
};
const STATUS_LABEL: Record<SubmissionStatus, string> = {
  pending: "Pendiente", in_review: "En revisión", approved: "Aprobado", needs_work: "A mejorar",
};

export default function MentorPage() {
  const [submissions, setSubmissions] = useState(PENDING_SUBMISSIONS);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  const pending = submissions.filter(s => !resolved.has(s.id));
  const selectedSub = submissions.find(s => s.id === selected);

  function handleResolve(id: string) {
    setResolved(prev => new Set(Array.from(prev).concat(id)));
    setSelected(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="text-h1 mb-1">Panel de Mentoría</h1>
        <p className="text-p-large" style={{ color: "var(--color-text-muted)" }}>
          Revisa las entregas de tus alumnos y ofréceles feedback personalizado.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8 stagger-1 animate-fade-up">
        {[
          { label: "Pendientes",    value: pending.length,  color: "#f5a623", bg: "#fffbeb" },
          { label: "Resueltas hoy", value: resolved.size,   color: "#00c65e", bg: "#f0fdf4" },
          { label: "Alumnos activos", value: 8,             color: "var(--color-purple)", bg: "#faf5ff" },
        ].map(s => (
          <div key={s.label} className="c-card p-5 text-center" style={{ background: s.bg }}>
            <div className="text-h1 font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-p-small mt-1" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Submission list */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-h4 mb-3">Entregas pendientes</h2>
          {pending.length === 0 ? (
            <div className="c-card p-10 text-center" style={{ color: "var(--color-text-muted)" }}>
              <CheckCircle2 size={36} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">¡Todo al día!</p>
              <p className="text-p-small mt-1">No hay entregas pendientes.</p>
            </div>
          ) : (
            pending.map((sub, i) => (
              <button key={sub.id} onClick={() => setSelected(sub.id)}
                className={cn(
                  "c-card c-card-hover w-full text-left p-4 animate-fade-up border-2 transition-all",
                  `stagger-${i+1}`,
                  selected === sub.id
                    ? "border-enkire-purple/40 bg-enkire-light-purple/20"
                    : "border-transparent"
                )}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                       style={{ background: "var(--color-purple)" }}>
                    {sub.studentInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-semibold text-sm">{sub.studentName}</span>
                      <span className={cn("text-xs border rounded-full px-2 py-0.5", STATUS_STYLES[sub.status])}>
                        {STATUS_LABEL[sub.status]}
                      </span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
                      {sub.trackEmoji} {sub.exerciseTitle}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                      {formatRelativeDate(sub.submittedAt)}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Review panel */}
        <div className="lg:col-span-3">
          {!selectedSub ? (
            <div className="c-card p-12 text-center h-full flex flex-col items-center justify-center"
                 style={{ color: "var(--color-text-muted)" }}>
              <MessageSquare size={40} className="mb-4 opacity-30" />
              <p className="font-semibold">Selecciona una entrega</p>
              <p className="text-p-small mt-1">para revisar y dar feedback</p>
            </div>
          ) : (
            <div className="c-card p-6 space-y-5 animate-fade-in">
              {/* Student */}
              <div className="flex items-start gap-4 pb-5" style={{ borderBottom: "1px solid var(--color-border)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
                     style={{ background: "var(--color-purple)" }}>
                  {selectedSub.studentInitial}
                </div>
                <div>
                  <div className="font-bold">{selectedSub.studentName}</div>
                  <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    {selectedSub.trackEmoji} {selectedSub.trackTitle} — {selectedSub.exerciseTitle}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                      <Clock size={11} /> {formatRelativeDate(selectedSub.submittedAt)}
                    </span>
                    <span className={cn("text-xs border rounded-full px-2 py-0.5", STATUS_STYLES[selectedSub.status])}>
                      {STATUS_LABEL[selectedSub.status]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student note */}
              <div>
                <p className="label-large mb-2">Nota del alumno</p>
                <div className="p-4 rounded-xl text-sm italic leading-relaxed"
                     style={{ background: "var(--color-bg)", color: "var(--color-text-2)", borderLeft: "3px solid var(--color-purple)" }}>
                  "{selectedSub.note}"
                </div>
              </div>

              {/* Media */}
              <div>
                <p className="label-large mb-2">Entrega ({selectedSub.mediaType})</p>
                <div className="p-6 text-center rounded-xl text-sm"
                     style={{ background: "var(--color-bg)", color: "var(--color-text-muted)", border: "2px dashed var(--color-border)" }}>
                  {selectedSub.mediaType === "video" && "🎬 Vídeo adjunto"}
                  {selectedSub.mediaType === "audio" && "🎵 Audio adjunto"}
                  {selectedSub.mediaType === "image" && "📷 Imagen adjunta"}
                  <br/>
                  <span className="text-xs opacity-60">(En producción se muestra el archivo real de Supabase Storage)</span>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <p className="label-large mb-2">Tu feedback</p>
                <textarea
                  value={feedback[selectedSub.id] ?? ""}
                  onChange={e => setFeedback(prev => ({ ...prev, [selectedSub.id]: e.target.value }))}
                  placeholder={`Hola ${selectedSub.studentName.split(" ")[0]}, he revisado tu entrega...\n\nPuntos fuertes: ...\nÁreas de mejora: ...\n\n¡Sigue así! 💪`}
                  rows={5}
                  className="w-full c-card p-4 text-sm resize-none focus:outline-none focus:ring-2"
                  style={{ fontFamily: "inherit" }}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleResolve(selectedSub.id)}
                  disabled={!feedback[selectedSub.id]?.trim()}
                  className="btn flex-1 justify-center disabled:opacity-40 text-white"
                  style={{ background: "#00c65e", border: "none" }}>
                  <CheckCircle2 size={15} />
                  Aprobar (+{selectedSub.xpToAward} XP)
                </button>
                <button
                  onClick={() => handleResolve(selectedSub.id)}
                  disabled={!feedback[selectedSub.id]?.trim()}
                  className="btn flex-1 justify-center disabled:opacity-40 text-white"
                  style={{ background: "#e74c3c", border: "none" }}>
                  <XCircle size={15} />
                  Pedir mejora
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
