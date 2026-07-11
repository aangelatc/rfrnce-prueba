import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { archiveRefs } from "../data/references";
import type { ReferenceCard } from "../data/references";
import { supabase } from "../lib/supabase";
import type { SupabaseReference } from "../types/supabaseReferences";

type FormState = {
  title: string;
  type: string;
  url: string;
  description: string;
};

type ConnectionReference = {
  id: string;
  title: string;
  type: string;
  url?: string | null;
  description?: string | null;
  ai_summary?: string | null;
  style?: string | null;
  tags?: string[] | null;
};

const initialForm: FormState = {
  title: "",
  type: "Imagen",
  url: "",
  description: "",
};

const typeOptions = ["Imagen", "Video", "Texto", "Cita", "Musica", "Libro", "Link", "Archivo"];

const stopWords = new Set([
  "a",
  "al",
  "algo",
  "ante",
  "con",
  "como",
  "de",
  "del",
  "desde",
  "el",
  "ella",
  "en",
  "entre",
  "es",
  "esta",
  "este",
  "esto",
  "la",
  "las",
  "lo",
  "los",
  "mas",
  "me",
  "mi",
  "muy",
  "o",
  "para",
  "pero",
  "por",
  "que",
  "se",
  "sin",
  "sobre",
  "su",
  "sus",
  "un",
  "una",
  "unas",
  "uno",
  "unos",
  "y",
]);

const conceptGroups = [
  ["mirada", "ver", "visual", "imagen", "percepción", "representación", "medio", "medios"],
  ["amor", "deseo", "romance", "intimidad", "melancolía"],
  ["ciudad", "urbano", "calle", "arquitectura", "espacio"],
  ["memoria", "recuerdo", "archivo", "nostalgia", "pasado"],
  ["crítica", "sociedad", "cultura", "publicidad", "consumo", "espectáculo"],
  ["cuerpo", "identidad", "género", "presencia", "retrato"],
  ["sonido", "música", "canción", "ritmo", "atmósfera", "cinematográfico"],
  ["editorial", "diseño", "tipografía", "composición", "layout"],
  ["color", "textura", "forma", "material", "superficie"],
];

const conceptGroupLabels = [
  "cultura visual",
  "deseo/melancolía",
  "ciudad/espacio",
  "memoria",
  "crítica cultural",
  "identidad/cuerpo",
  "sonido/atmósfera",
  "diseño editorial",
  "color/textura",
];

function normalizeKeyword(keyword: string) {
  return keyword
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getKeywords(text?: string | null) {
  if (!text) return [];

  return Array.from(
    new Set(
      normalizeKeyword(text)
        .replace(/[.,;:!?¿¡()[\]{}"'`´]/g, " ")
        .replace(/[^a-z0-9\s]+/g, " ")
        .split(/\s+/)
        .map((word) => word.trim())
        .filter((word) => word.length > 3 && !stopWords.has(word))
    )
  );
}

function getReferenceKeywordText(reference: ConnectionReference, includeTags = true) {
  return [
    reference.title,
    reference.description,
    reference.ai_summary,
    reference.style,
    includeTags ? reference.tags?.join(" ") : null,
  ]
    .filter(Boolean)
    .join(" ");
}

function createStableId(title: string) {
  return `generic-${normalizeKeyword(title)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

function normalizeGenericReference(reference: ReferenceCard): ConnectionReference {
  const description =
    reference.kind === "text"
      ? `${reference.quote} ${reference.source}`
      : reference.description;

  return {
    id: createStableId(reference.title),
    title: reference.title,
    type: reference.type,
    url: null,
    description,
    ai_summary: description,
    style: reference.collection,
    tags: reference.tags,
  };
}

function dedupeConnectionReferences(connectionReferences: ConnectionReference[]) {
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();

  return connectionReferences.filter((reference) => {
    const normalizedTitle = normalizeKeyword(reference.title);

    if (seenIds.has(reference.id) || seenTitles.has(normalizedTitle)) {
      return false;
    }

    seenIds.add(reference.id);
    seenTitles.add(normalizedTitle);
    return true;
  });
}

function getSharedConcepts(currentKeywords: string[], referenceKeywords: string[]) {
  return conceptGroups
    .map((group, index) => {
      const normalizedGroup = group.map(normalizeKeyword);
      const currentMatches = currentKeywords.filter((keyword) => normalizedGroup.includes(keyword));
      const referenceMatches = referenceKeywords.filter((keyword) =>
        normalizedGroup.includes(keyword)
      );

      if (currentMatches.length === 0 || referenceMatches.length === 0) return null;

      return conceptGroupLabels[index] ?? group[0];
    })
    .filter((concept): concept is string => Boolean(concept));
}

function getFunctionUrl(functionName: string) {
  return `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${functionName}`;
}

function getAuthHeaders() {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${anonKey}`,
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

export function SupabaseReferenceManager() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [references, setReferences] = useState<SupabaseReference[]>([]);
  const [connectionsByReference, setConnectionsByReference] = useState<Record<string, string[]>>(
    {}
  );
  const [loadingReferences, setLoadingReferences] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => Boolean(form.title.trim() && form.type.trim() && form.description.trim()),
    [form.description, form.title, form.type]
  );

  const allConnectionReferences = useMemo(
    () =>
      dedupeConnectionReferences([
        ...references,
        ...archiveRefs.map((reference) => normalizeGenericReference(reference)),
      ]),
    [references]
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
        headers: getAuthHeaders(),
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

    const currentExactKeywords = getKeywords(getReferenceKeywordText(currentReference, false));
    const currentConceptKeywords = getKeywords(getReferenceKeywordText(currentReference));

    const relatedReferences = allConnectionReferences
      .filter((ref) => ref.id !== referenceId)
      .map((ref) => {
        const currentTags = currentReference.tags ?? [];
        const refTags = ref.tags ?? [];

        const normalizedCurrentTags = new Set(currentTags.map(normalizeKeyword));
        const sharedTags = refTags.filter((tag) => normalizedCurrentTags.has(normalizeKeyword(tag)));
        const sameType = ref.type === currentReference.type;
        const sameStyle = Boolean(
          currentReference.style &&
            ref.style &&
            normalizeKeyword(ref.style) === normalizeKeyword(currentReference.style)
        );
        const referenceExactKeywords = getKeywords(getReferenceKeywordText(ref, false));
        const referenceConceptKeywords = getKeywords(getReferenceKeywordText(ref));
        const sharedKeywords = currentExactKeywords.filter((keyword) =>
          referenceExactKeywords.includes(keyword)
        );
        const sharedConcepts = getSharedConcepts(currentConceptKeywords, referenceConceptKeywords);

        const score =
          (sameType ? 1 : 0) +
          (sameStyle ? 2 : 0) +
          sharedTags.length * 2 +
          sharedKeywords.length +
          sharedConcepts.length * 3;

        const reasons = [
          sameType ? "mismo tipo" : "",
          sameStyle ? "mismo estilo" : "",
          sharedTags.length > 0 ? `etiquetas compartidas: ${sharedTags.join(", ")}` : "",
          sharedConcepts.length > 0
            ? `concepto compartido: ${sharedConcepts.join(", ")}`
            : "",
          sharedKeywords.length > 0 ? `palabras compartidas: ${sharedKeywords.join(", ")}` : "",
        ].filter(Boolean);

        return {
          title: ref.title,
          score,
          hasConnection:
            sameType ||
            sameStyle ||
            sharedTags.length > 0 ||
            sharedConcepts.length > 0 ||
            sharedKeywords.length >= 2,
          reason: reasons.join(", "),
        };
      })
      .filter((connection) => connection.score > 0 && connection.hasConnection)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (relatedReferences.length === 0) {
      setConnectionsByReference((current) => ({
        ...current,
        [referenceId]: [
          "No se han encontrado conexiones directas. Añade más referencias con etiquetas, tipo o estilo similares.",
        ],
      }));

      setConnectingId(null);
      return;
    }

    setConnectionsByReference((current) => ({
      ...current,
      [referenceId]: relatedReferences.map(
        (connection) => `${connection.title} · Coincide por: ${connection.reason}`
      ),
    }));

    setStatus("Conexiones generadas correctamente.");
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
          ) : references.length === 0 ? (
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
              {references.map((reference) => {
                const connections = connectionsByReference[reference.id] ?? [];

                return (
                  <article key={reference.id} className="px-6 py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rfrnce-lime bg-rfrnce-black px-[10px] py-1 rounded-sm">
                            {reference.type}
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

                      <div className="flex-none md:max-w-[320px]">
                        <button
                          type="button"
                          onClick={() => handleGenerateConnections(reference.id)}
                          disabled={connectingId === reference.id}
                          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rfrnce-black"
                        >
                          {connectingId === reference.id ? "Buscando..." : "Encontrar conexiones IA"}
                        </button>

                        {connections.length > 0 && (
                          <div className="mt-4 rounded-2xl border border-[#606060]/20 bg-[#f2f4ff] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#606060]">
                              Conexiones encontradas
                            </p>

                            <ul className="mt-3 space-y-2">
                              {connections.map((connection) => (
                                <li
                                  key={connection}
                                  className="rounded-xl bg-white px-3 py-2 text-sm text-[#201f21]"
                                >
                                  {connection}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <ReferenceMeta label="Resumen IA" value={reference.ai_summary} />
                      <ReferenceMeta label="Estilo" value={reference.style} />
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
            <div className="rounded-2xl border border-[#606060]/20 bg-[#f2f4ff] p-5 text-sm text-[#606060]">
              Todavía no hay conexiones generadas. Pulsa “Encontrar conexiones IA” en alguna
              referencia para construir tu mapa.
            </div>
          ) : (
            <div className="grid gap-4">
              {generatedConnectionEntries.map(([referenceId, connections]) => {
                const sourceReference = allConnectionReferences.find((ref) => ref.id === referenceId);

                return (
                  <article
                    key={referenceId}
                    className="rounded-2xl border border-[#606060]/20 bg-white p-5"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#89f336]" />
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#606060]">
                        Referencia origen
                      </p>
                    </div>

                    <h4 className="text-lg font-semibold text-[#201f21]">
                      {sourceReference?.title ?? "Referencia sin título"}
                    </h4>

                    <ul className="mt-4 space-y-2">
                      {connections.map((connection) => (
                        <li
                          key={connection}
                          className="rounded-xl bg-[#f2f4ff] px-4 py-3 text-sm text-[#201f21]"
                        >
                          {connection}
                        </li>
                      ))}
                    </ul>
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
