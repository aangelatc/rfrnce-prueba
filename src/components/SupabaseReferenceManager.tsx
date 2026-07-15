import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { archiveRefs } from "../data/references";
import type { ReferenceCard } from "../data/references";
import { supabase } from "../lib/supabase";
import type { ReferenceConnection, SupabaseReference } from "../types/supabaseReferences";
import {
  dedupeConnectionReferences,
  generateLocalConnections,
  normalizeGenericReference,
  normalizeUploadedReference,
} from "../utils/connectionEngine";

type FormState = {
  title: string;
  type: string;
  url: string;
  description: string;
};

interface SupabaseReferenceManagerProps {
  savedReferences?: ReferenceCard[];
}

const initialForm: FormState = {
  title: "",
  type: "Imagen",
  url: "",
  description: "",
};

const typeOptions = ["Imagen", "Video", "Texto", "Cita", "Musica", "Libro", "Link", "Archivo"];

function getFunctionUrl(functionName: string) {
  return `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${functionName}`;
}

async function getAuthHeaders() {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token ?? anonKey}`,
  };
}

function ReferenceMeta({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rfrnce-gray mb-1">
        {label}
      </p>
      <p className="text-[13px] leading-[1.55] text-rfrnce-black">{value}</p>
    </div>
  );
}

function ConnectionInsightCard({ connection }: { connection: ReferenceConnection }) {
  return (
    <article className="rounded-sm border border-rfrnce-black/10 bg-white p-4 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p
            className="text-rfrnce-black"
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: "20px",
              lineHeight: 1.18,
              fontWeight: 300,
            }}
          >
            {connection.title}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {connection.connectionType.map((type) => (
              <span
                key={type}
                className="rounded-sm bg-rfrnce-lime px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-rfrnce-black"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <span className="flex-none text-[11px] font-semibold uppercase tracking-[0.14em] text-rfrnce-gray">
          Confianza: {connection.confidence}/5
        </span>
      </div>

      <p className="mt-4 text-[14px] leading-[1.6] text-rfrnce-black">
        {connection.explanation}
      </p>

      <div className="mt-4 border-l-[3px] border-rfrnce-lime pl-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rfrnce-gray">
          Aplicacion creativa
        </p>
        <p className="mt-2 text-[13px] leading-[1.6] text-rfrnce-black">
          {connection.creativeApplication}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {connection.matchedCriteria.map((criterion) => (
          <span
            key={criterion}
            className="rounded-full border border-rfrnce-black/15 px-3 py-1 text-[12px] text-rfrnce-gray"
          >
            {criterion}
          </span>
        ))}
      </div>
    </article>
  );
}

export function SupabaseReferenceManager({
  savedReferences = [],
}: SupabaseReferenceManagerProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [references, setReferences] = useState<SupabaseReference[]>([]);
  const [connectionsByReference, setConnectionsByReference] = useState<
    Record<string, ReferenceConnection[]>
  >({});
  const [loadingReferences, setLoadingReferences] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => Boolean(form.title.trim() && form.type.trim() && form.description.trim()),
    [form.description, form.title, form.type]
  );

  const savedConnectionReferences = useMemo(
    () => savedReferences.map((reference) => normalizeGenericReference(reference)),
    [savedReferences]
  );

  const allConnectionReferences = useMemo(
    () =>
      dedupeConnectionReferences([
        ...references.map((reference) => normalizeUploadedReference(reference)),
        ...archiveRefs.map((reference) => normalizeGenericReference(reference)),
      ]),
    [references]
  );

  const displayedReferences = useMemo(
    () =>
      dedupeConnectionReferences([
        ...references.map((reference) => normalizeUploadedReference(reference)),
        ...savedConnectionReferences,
      ]),
    [references, savedConnectionReferences]
  );

  const loadReferences = async () => {
    setLoadingReferences(true);
    setError(null);

    const { data, error: loadError } = await supabase
      .from("creative_references")
      .select("*")
      .order("created_at", { ascending: false });

    if (loadError) {
      setError(loadError.message);
      setReferences([]);
    } else {
      setReferences((data ?? []) as SupabaseReference[]);
    }

    setLoadingReferences(false);
  };

  useEffect(() => {
    void loadReferences();
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setStatus(null);
    setError(null);

    try {
      const response = await fetch(getFunctionUrl("create-reference"), {
        method: "POST",
        headers: await getAuthHeaders(),
        body: JSON.stringify({
          title: form.title.trim(),
          type: form.type.trim(),
          url: form.url.trim() || null,
          description: form.description.trim(),
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload && typeof payload === "object" && "error" in payload
            ? String((payload as { error: unknown }).error)
            : "No se pudo guardar la referencia."
        );
      }

      setForm(initialForm);
      setStatus("Referencia enviada a Supabase y analizada por IA.");
      await loadReferences();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Error inesperado.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGenerateConnections = (referenceId: string) => {
    setConnectingId(referenceId);
    setStatus(null);
    setError(null);

    const currentReference = allConnectionReferences.find((ref) => ref.id === referenceId);

    if (!currentReference) {
      setError("No se ha encontrado la referencia seleccionada.");
      setConnectingId(null);
      return;
    }

    const relatedReferences = generateLocalConnections(referenceId, allConnectionReferences);

    setConnectionsByReference((current) => ({
      ...current,
      [referenceId]: relatedReferences,
    }));

    setStatus(
      relatedReferences.length > 0
        ? "Conexiones generadas correctamente."
        : "No se han encontrado conexiones con suficiente contexto."
    );
    setConnectingId(null);
  };

  const generatedConnectionEntries = Object.entries(connectionsByReference);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
      <form
        onSubmit={handleSubmit}
        className="border border-rfrnce-black/10 bg-white p-6 md:p-8 shadow-card"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rfrnce-gray mb-4">
          Nueva referencia
        </p>
        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-rfrnce-gray">
              Titulo
            </span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border border-rfrnce-black/15 px-4 py-3 text-[14px] outline-none focus:border-rfrnce-black/45"
              placeholder="Brutalist poster archive"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-rfrnce-gray">
              Tipo
            </span>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border border-rfrnce-black/15 bg-white px-4 py-3 text-[14px] outline-none focus:border-rfrnce-black/45"
            >
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-rfrnce-gray">
              URL
            </span>
            <input
              name="url"
              value={form.url}
              onChange={handleChange}
              className="border border-rfrnce-black/15 px-4 py-3 text-[14px] outline-none focus:border-rfrnce-black/45"
              placeholder="https://..."
            />
          </label>

          <label className="grid gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-rfrnce-gray">
              Descripcion
            </span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="resize-none border border-rfrnce-black/15 px-4 py-3 text-[14px] leading-[1.6] outline-none focus:border-rfrnce-black/45"
              placeholder="Que contiene, por que importa, como podria usarse..."
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="bg-rfrnce-black text-white text-[13px] font-semibold px-5 py-3 rounded-sm hover:bg-rfrnce-lime hover:text-rfrnce-black transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Analizando con IA..." : "Guardar referencia"}
          </button>
        </div>
      </form>

      <div className="border border-rfrnce-black/10 bg-white shadow-card">
        <div className="flex items-center justify-between gap-4 border-b border-rfrnce-black/10 px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rfrnce-gray">
              Referencias guardadas
            </p>
            <p
              className="mt-1 text-rfrnce-black"
              style={{ fontFamily: "'Newsreader', serif", fontSize: "24px", fontWeight: 300 }}
            >
              Archivo conectado
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadReferences()}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rfrnce-gray border border-rfrnce-black/15 px-3 py-2 hover:text-rfrnce-black hover:border-rfrnce-black/40 transition-colors"
          >
            Actualizar
          </button>
        </div>

        {(status || error) && (
          <div className="border-b border-rfrnce-black/10 px-6 py-3">
            {status && <p className="text-[13px] text-rfrnce-black">{status}</p>}
            {error && <p className="text-[13px] text-rfrnce-gray">{error}</p>}
          </div>
        )}

        <div className="max-h-[760px] overflow-y-auto">
          {loadingReferences ? (
            <p className="px-6 py-10 text-[14px] text-rfrnce-gray">Cargando referencias...</p>
          ) : displayedReferences.length === 0 ? (
            <div className="px-6 py-10">
              <p
                className="text-[19px] text-rfrnce-gray"
                style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontWeight: 300 }}
              >
                Aun no hay referencias guardadas en Supabase.
              </p>
              <p className="mt-2 text-[13px] leading-[1.6] text-rfrnce-gray">
                Crea la primera para probar la Edge Function create-reference.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-rfrnce-black/10">
              {displayedReferences.map((reference) => {
                const connections = connectionsByReference[reference.id] ?? [];
                const sourceLabel =
                  reference.source === "uploaded"
                    ? "Subida"
                    : reference.source === "default"
                      ? "Predeterminada guardada"
                      : "Demo guardada";

                return (
                  <article key={reference.id} className="px-6 py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex gap-4">
                        {reference.imageUrl && (
                          <div className="h-20 w-20 flex-none overflow-hidden border border-rfrnce-black/10 bg-rfrnce-offwhite">
                            <img
                              src={reference.imageUrl}
                              alt={reference.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rfrnce-lime bg-rfrnce-black px-[10px] py-1 rounded-sm">
                              {reference.type}
                            </span>
                            <span className="text-[12px] text-rfrnce-gray border border-rfrnce-black/15 px-3 py-1 rounded-full">
                              {sourceLabel}
                            </span>
                            {reference.mood && (
                              <span className="text-[12px] text-rfrnce-gray border border-rfrnce-black/15 px-3 py-1 rounded-full">
                                {reference.mood}
                              </span>
                            )}
                          </div>
                          <h3
                            className="text-rfrnce-black"
                            style={{
                              fontFamily: "'Newsreader', serif",
                              fontSize: "26px",
                              lineHeight: 1.15,
                              fontWeight: 300,
                            }}
                          >
                            {reference.title}
                          </h3>
                          {reference.url && (
                            <a
                              href={reference.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 block max-w-[42ch] truncate text-[12px] text-rfrnce-gray hover:text-rfrnce-black"
                            >
                              {reference.url}
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex-none md:max-w-[320px]">
                        <button
                          type="button"
                          onClick={() => handleGenerateConnections(reference.id)}
                          disabled={connectingId === reference.id}
                          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rfrnce-black"
                        >
                          {connectingId === reference.id ? "Buscando..." : "Encontrar conexiones IA"}
                        </button>
                      </div>
                    </div>

                    {connections.length > 0 && (
                      <div className="mt-5 grid gap-3">
                        {connections.map((connection) => (
                          <ConnectionInsightCard key={connection.title} connection={connection} />
                        ))}
                      </div>
                    )}

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <ReferenceMeta label="Resumen IA" value={reference.ai_summary ?? null} />
                      <ReferenceMeta label="Estilo" value={reference.style ?? null} />
                    </div>

                    {reference.tags && reference.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {reference.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[12px] text-rfrnce-gray border border-rfrnce-black/20 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <section id="mapa-conexiones" className="scroll-mt-24 border-t border-[#606060]/20 px-6 py-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#606060]">
                Mapa de conexiones
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#201f21]">
                Relaciones generadas en tu archivo
              </h3>
            </div>
          </div>

          {generatedConnectionEntries.length === 0 ? (
            <div className="rounded-sm border border-[#606060]/20 bg-rfrnce-offwhite p-5 text-sm text-[#606060]">
              Todavia no hay conexiones generadas. Pulsa "Encontrar conexiones IA" en alguna
              referencia para construir tu mapa.
            </div>
          ) : (
            <div className="grid gap-4">
              {generatedConnectionEntries.map(([referenceId, connections]) => {
                const sourceReference = allConnectionReferences.find((ref) => ref.id === referenceId);

                return (
                  <article
                    key={referenceId}
                    className="rounded-sm border border-[#606060]/20 bg-white p-5"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#89f336]" />
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#606060]">
                        Referencia origen
                      </p>
                    </div>

                    <h4 className="text-lg font-semibold text-[#201f21]">
                      {sourceReference?.title ?? "Referencia sin titulo"}
                    </h4>

                    {connections.length === 0 ? (
                      <p className="mt-4 rounded-sm bg-rfrnce-offwhite px-4 py-3 text-sm text-[#606060]">
                        No hay suficiente informacion para generar una conexion fiable.
                      </p>
                    ) : (
                      <div className="mt-4 grid gap-3">
                        {connections.map((connection) => (
                          <ConnectionInsightCard key={connection.title} connection={connection} />
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
