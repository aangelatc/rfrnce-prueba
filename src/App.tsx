import { useState } from "react";
import { archiveRefs } from "./data/references";
import { useArchive } from "./hooks/useArchive";
import { ArchivePanel } from "./components/ArchivePanel";
import { SupabaseReferenceManager } from "./components/SupabaseReferenceManager";
import type { ReferenceCard } from "./data/references";

const features = [
  {
    title: "Guardar",
    description:
      "Añade imágenes, vídeos, texto, citas, enlaces y archivos en un solo archivo creativo.",
  },
  {
    title: "Organizar",
    description:
      "Clasifica referencias por proyectos, colecciones, etiquetas y estados del proceso.",
  },
  {
    title: "Conectar",
    description:
      "Descubre relaciones entre ideas, estilos, autores y referencias culturales.",
  },
  {
    title: "Recuperar",
    description:
      "Encuentra lo que necesitas con búsqueda contextual, etiquetas y conexiones.",
  },
];

const mockCards = [
  { type: "Imagen", title: "Nocturnal street reflection", tags: ["nocturno", "reflejo"], dark: true },
  { type: "Música", title: "corridor silence", tags: ["ambiente", "pausa"], dark: false },
  { type: "Cita", title: "El archivo es una mesa de trabajo", tags: ["editorial"], dark: false },
  { type: "Vídeo", title: "Urban textures vol.3", tags: ["ciudad", "textura"], dark: true },
];

// ─── Reference card with save functionality ──────────────────────────────────

function RefCard({
  card,
  isSaved,
  collectionName,
  onSave,
  onRemove,
}: {
  card: ReferenceCard;
  isSaved: boolean;
  collectionName: string;
  onSave: () => void;
  onRemove: () => void;
}) {
  const ref = card;
  const saveArea = (
    <div className="mt-3">
      {isSaved ? (
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-[6px] text-[12px] font-semibold text-rfrnce-black">
            <span className="w-[7px] h-[7px] rounded-full bg-rfrnce-lime flex-none" />
            {collectionName}
          </span>
          <button
            onClick={onRemove}
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rfrnce-gray hover:text-rfrnce-black transition-colors"
          >
            Quitar
          </button>
        </div>
      ) : (
        <button
          onClick={onSave}
          className="w-full text-[12px] font-semibold uppercase tracking-[0.14em] text-rfrnce-gray border border-rfrnce-black/20 px-3 py-[6px] rounded-sm hover:border-rfrnce-black/40 hover:text-rfrnce-black transition-colors"
        >
          Guardar en archivo
        </button>
      )}
    </div>
  );

  if (ref.kind === "image") {
    return (
      <div className="border border-rfrnce-black/10 bg-white shadow-card">
        <div className="relative overflow-hidden" style={{ height: "220px" }}>
          <img src={ref.image} alt={ref.title} className="w-full h-full object-cover" />
          <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-[0.14em] bg-rfrnce-lime text-rfrnce-black px-[10px] py-1 rounded-sm">
            {ref.type}
          </span>
          {isSaved && (
            <span className="absolute top-3 right-3 w-[8px] h-[8px] rounded-full bg-rfrnce-lime shadow-sm" />
          )}
        </div>
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rfrnce-gray mb-2">
            {ref.collection}
          </p>
          <p
            className="mb-3"
            style={{ fontFamily: "'Newsreader', serif", fontSize: "20px", lineHeight: 1.25 }}
          >
            {ref.title}
          </p>
          <p className="text-[14px] text-rfrnce-gray leading-[1.55] mb-4">{ref.description}</p>
          <div className="flex flex-wrap gap-2 mb-1">
            {ref.tags.map((tag) => (
              <span
                key={tag}
                className="text-[12px] text-rfrnce-gray border border-rfrnce-black/20 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          {saveArea}
          <div
            className="flex items-center justify-between mt-3 pt-3"
            style={{ borderTop: "1px solid rgba(32,31,33,0.08)" }}
          >
            <span className="text-[12px] text-rfrnce-gray">{ref.date}</span>
            <span className="text-[13px] font-semibold text-rfrnce-black flex items-center gap-[6px]">
              <span className="w-[6px] h-[6px] rounded-full bg-rfrnce-lime" />
              {ref.connections} conexiones
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-rfrnce-black/10 bg-white shadow-card p-5 flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rfrnce-lime bg-rfrnce-black px-[10px] py-1 rounded-sm">
          {ref.type}
        </span>
        {isSaved && <span className="w-[8px] h-[8px] rounded-full bg-rfrnce-lime" />}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rfrnce-gray mb-3">
        {ref.collection}
      </p>
      <div className="pl-5 flex-1 mb-4" style={{ borderLeft: "3px solid #89f336" }}>
        <p
          className="text-rfrnce-black mb-3"
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: "20px",
            lineHeight: 1.5,
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          "{ref.quote}"
        </p>
        <p className="text-[13px] text-rfrnce-gray font-semibold">{ref.source}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-1">
        {ref.tags.map((tag) => (
          <span
            key={tag}
            className="text-[12px] text-rfrnce-gray border border-rfrnce-black/20 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      {saveArea}
      <div
        className="flex items-center justify-between mt-3 pt-3"
        style={{ borderTop: "1px solid rgba(32,31,33,0.08)" }}
      >
        <span className="text-[12px] text-rfrnce-gray">{ref.date}</span>
        <span className="text-[13px] font-semibold text-rfrnce-black flex items-center gap-[6px]">
          <span className="w-[6px] h-[6px] rounded-full bg-rfrnce-lime" />
          {ref.connections} conexiones
        </span>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [panelOpen, setPanelOpen] = useState(false);

  const archive = useArchive();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setFormStatus("error");
      return;
    }
    setFormStatus("success");
  };

  return (
    <div className="min-h-screen bg-white text-rfrnce-black font-archivo">

      {/* Archive panel */}
      <ArchivePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        collections={archive.collections}
        savedRefs={archive.savedRefs}
        allRefs={archiveRefs}
        onMove={archive.moveRef}
        onRemove={archive.removeRef}
        onCreateCollection={archive.createCollection}
        onRenameCollection={archive.renameCollection}
        onDeleteCollection={archive.deleteCollection}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-30 border-b border-rfrnce-black/10"
        style={{ background: "rgba(255,255,255,0.86)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-[1080px] mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <div className="flex items-center gap-[14px]">
            <span className="font-newsreader italic text-[22px] tracking-[-0.01em]">rfrnce</span>
            <span className="w-[5px] h-[5px] rounded-full bg-rfrnce-lime" />
            <span className="hidden sm:block text-[11px] font-semibold uppercase tracking-[0.22em] text-rfrnce-gray">
              Archivo creativo
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "#archivo", label: "Archivo" },
              { href: "#mapa-conexiones", label: "Conexiones" },
              { href: "#que-es", label: "Qué es" },
              { href: "#como-funciona", label: "Cómo funciona" },
              { href: "#para-quien", label: "Para quién" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rfrnce-gray hover:text-rfrnce-black transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {archive.totalSaved > 0 && (
              <button
                onClick={() => setPanelOpen(true)}
                className="flex items-center gap-[6px] text-[12px] font-semibold text-rfrnce-black border border-rfrnce-black/20 px-4 py-[7px] rounded-sm hover:border-rfrnce-black/50 transition-colors"
              >
                <span className="w-[6px] h-[6px] rounded-full bg-rfrnce-lime" />
                Mi archivo ({archive.totalSaved})
              </button>
            )}
            <a
              href="#acceso"
              className="bg-rfrnce-black text-white text-[13px] font-semibold px-5 py-2 rounded-sm hover:bg-rfrnce-lime hover:text-rfrnce-black transition-colors"
            >
              Únete a la lista
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-[1080px] mx-auto px-6 md:px-12 py-24 md:py-[140px]">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.65fr] lg:items-start">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-rfrnce-gray mb-16">
                Archivo creativo vivo
              </p>
              <h1
                className="mb-7 max-w-[18ch]"
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontWeight: 300,
                  fontSize: "clamp(40px, 5.5vw, 64px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                }}
              >
                Guarda referencias.<br />
                Añade contexto.<br />
                <em>Descubre conexiones.</em>
              </h1>
              <p className="text-[19px] leading-[1.6] text-rfrnce-gray max-w-[54ch] mb-10">
                rfrnce es una plataforma para guardar, organizar, conectar y recuperar inspiración visual,
                cultural y conceptual en un archivo creativo vivo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#acceso"
                  className="inline-flex items-center justify-center bg-rfrnce-lime text-rfrnce-black text-[14px] font-semibold px-[22px] py-3 rounded-sm hover:bg-rfrnce-black hover:text-white transition-colors"
                >
                  Únete a la lista de espera
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center border border-rfrnce-black/25 bg-transparent text-rfrnce-black text-[14px] font-semibold px-[22px] py-[11px] rounded-sm hover:bg-rfrnce-black hover:text-white transition-colors"
                >
                  Ver cómo funciona
                </a>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
              {mockCards.map((card, i) => (
                <div key={i} className="border border-rfrnce-black/10 bg-white shadow-card">
                  <div className={`h-28 relative ${card.dark ? "bg-rfrnce-black" : "bg-rfrnce-offwhite"}`}>
                    <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-[0.14em] bg-rfrnce-lime text-rfrnce-black px-[10px] py-1 rounded-sm">
                      {card.type}
                    </span>
                  </div>
                  <div className="p-4">
                    <p
                      className="mb-3"
                      style={{ fontFamily: "'Newsreader', serif", fontSize: "15px", lineHeight: 1.35 }}
                    >
                      {card.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] text-rfrnce-gray border border-rfrnce-black/20 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Archivo de referencias */}
        <section id="archivo" className="border-t border-rfrnce-black/10 bg-rfrnce-offwhite">
          <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-24 md:py-[104px]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-rfrnce-gray mb-4">
                  Archivo de referencias
                </p>
                <h2
                  className="max-w-[22ch]"
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontWeight: 300,
                    fontSize: "clamp(28px, 3.5vw, 40px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Así se ve el archivo <em>en uso.</em>
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <p className="text-[14px] text-rfrnce-gray max-w-[36ch] leading-[1.6] sm:text-right">
                  Guarda cualquier referencia en tu archivo personal. Organízalas en colecciones.
                </p>
                {archive.totalSaved > 0 && (
                  <button
                    onClick={() => setPanelOpen(true)}
                    className="self-start sm:self-auto flex items-center gap-[6px] text-[12px] font-semibold text-rfrnce-black border border-rfrnce-black/20 px-4 py-[7px] rounded-sm hover:border-rfrnce-black/50 transition-colors bg-white"
                  >
                    <span className="w-[6px] h-[6px] rounded-full bg-rfrnce-lime" />
                    Ver mi archivo ({archive.totalSaved})
                  </button>
                )}
              </div>
            </div>

            <div className="mb-14">
              <SupabaseReferenceManager />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {archiveRefs.map((ref) => (
                <RefCard
                  key={ref.title}
                  card={ref}
                  isSaved={archive.isSaved(ref.title)}
                  collectionName={archive.getCollectionName(ref.title)}
                  onSave={() => archive.saveRef(ref.title)}
                  onRemove={() => archive.removeRef(ref.title)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 01 Qué es */}
        <section id="que-es" className="border-t border-rfrnce-black/10">
          <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-24 md:py-[104px]">
            <div className="grid gap-8 md:grid-cols-[220px_1fr]">
              <div>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: "48px", lineHeight: 1 }}>01</p>
                <div className="w-9 h-[3px] bg-rfrnce-lime my-4" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-rfrnce-gray">Qué es</p>
              </div>
              <div>
                <p
                  className="max-w-[24ch] mb-14"
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontWeight: 300,
                    fontSize: "34px",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  rfrnce no es una herramienta para <em>guardar</em> referencias. Es una herramienta para{" "}
                  <span className="bg-rfrnce-lime px-[6px]">conectar ideas</span>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-10">
                  {features.map((f) => (
                    <div key={f.title}>
                      <div className="inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-rfrnce-lime bg-rfrnce-black px-2 py-1 mb-2">
                        {f.title}
                      </div>
                      <p className="text-[15px] text-rfrnce-gray leading-[1.6] mt-2">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 Cómo funciona */}
        <section id="como-funciona" className="border-t border-rfrnce-black/10 bg-rfrnce-offwhite">
          <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-24 md:py-[104px]">
            <div className="grid gap-8 md:grid-cols-[220px_1fr] mb-16">
              <div>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: "48px", lineHeight: 1 }}>02</p>
                <div className="w-9 h-[3px] bg-rfrnce-lime my-4" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-rfrnce-gray">
                  Cómo funciona
                </p>
              </div>
              <div>
                <h2
                  className="max-w-[24ch]"
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontWeight: 300,
                    fontSize: "34px",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  De referencia aislada a <em>red de ideas.</em>
                </h2>
                <p className="mt-6 text-[16px] leading-[1.6] text-rfrnce-gray max-w-[48ch]">
                  Un flujo simple para capturar lo que te inspira, darle contexto, organizarlo y
                  encontrar relaciones que alimenten tus proyectos creativos.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { step: "1", title: "Captura una referencia", text: "Añade una imagen, link, texto, vídeo, libro, canción, cita o archivo." },
                { step: "2", title: "Añade contexto", text: "Incluye notas, etiquetas, proyecto, formato, fuente o intención creativa." },
                { step: "3", title: "Organízala en tu archivo", text: "Agrúpala en colecciones, proyectos o tableros." },
                { step: "4", title: "Encuentra conexiones", text: "Visualiza relaciones entre referencias y descubre vínculos culturales." },
              ].map((item) => (
                <div key={item.step} className="border border-rfrnce-black/10 bg-white p-8 shadow-card">
                  <div className="inline-flex items-center justify-center bg-rfrnce-lime text-rfrnce-black font-semibold text-[14px] w-9 h-9 rounded-sm">
                    {item.step}
                  </div>
                  <h3 className="mt-6 text-[16px] font-semibold text-rfrnce-black leading-snug">{item.title}</h3>
                  <p className="mt-3 text-[14px] text-rfrnce-gray leading-[1.6]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Para quién */}
        <section id="para-quien" className="border-t border-rfrnce-black/10">
          <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-24 md:py-[104px]">
            <div className="grid gap-8 md:grid-cols-[220px_1fr]">
              <div>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: "48px", lineHeight: 1 }}>03</p>
                <div className="w-9 h-[3px] bg-rfrnce-lime my-4" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-rfrnce-gray">Para quién</p>
              </div>
              <div>
                <h2
                  className="max-w-[26ch] mb-10"
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontWeight: 300,
                    fontSize: "34px",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Para creativos que necesitan un <em>archivo inteligente.</em>
                </h2>
                <p className="text-[16px] leading-[1.6] text-rfrnce-gray max-w-[48ch] mb-10">
                  rfrnce está pensado para diseñadores, directores de arte, creativos, equipos de
                  branding, editoriales y cualquiera que trabaje con referencias culturales y visuales.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["Equipos creativos", "Estudios de diseño", "Freelancers", "Archivos visuales"].map((item) => (
                    <div key={item} className="border border-rfrnce-black/10 bg-rfrnce-offwhite px-5 py-6 shadow-card">
                      <p className="text-[14px] text-rfrnce-black font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 Acceso anticipado */}
        <section id="acceso" className="border-t border-rfrnce-black/10 bg-rfrnce-offwhite">
          <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-24 md:py-[104px]">
            <div className="grid gap-8 md:grid-cols-[220px_1fr] mb-14">
              <div>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: "48px", lineHeight: 1 }}>04</p>
                <div className="w-9 h-[3px] bg-rfrnce-lime my-4" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-rfrnce-gray">
                  Acceso anticipado
                </p>
              </div>
              <div>
                <h2
                  className="max-w-[22ch] mb-6"
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontWeight: 300,
                    fontSize: "34px",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Únete a la lista de espera.
                </h2>
                <p className="text-[16px] leading-[1.6] text-rfrnce-gray max-w-[44ch]">
                  Sé de los primeros en probar rfrnce y recibe noticias cuando el MVP esté listo.
                  Deja tu email para acceso exclusivo y actualizaciones.
                </p>
              </div>
            </div>
            <div className="max-w-[560px]">
              <form
                onSubmit={handleSubmit}
                className="border border-rfrnce-black/10 bg-white p-10 shadow-card"
              >
                <label
                  htmlFor="email"
                  className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-rfrnce-gray mb-3"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tú@ejemplo.com"
                  className="w-full border border-rfrnce-black/15 bg-white px-4 py-3 text-[15px] text-rfrnce-black outline-none transition focus:border-rfrnce-black/40 placeholder:text-rfrnce-gray/50"
                  style={{ borderRadius: 0 }}
                />
                <button
                  type="submit"
                  className="mt-5 w-full bg-rfrnce-lime text-rfrnce-black font-semibold text-[14px] py-3 rounded-sm hover:bg-rfrnce-black hover:text-white transition-colors"
                >
                  Enviar solicitud
                </button>
                {formStatus === "success" && (
                  <p
                    className="mt-4 text-[15px] text-rfrnce-black"
                    style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}
                  >
                    Solicitud recibida en tu archivo. Te avisaremos cuando esté listo.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="mt-4 text-[14px] text-rfrnce-gray">
                    Por favor, introduce un email válido.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-rfrnce-black/10 bg-rfrnce-offwhite">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-16 flex items-end justify-between flex-wrap gap-6">
          <div>
            <span
              className="block mb-4"
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: "22px",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              rfrnce
            </span>
            <p className="text-[13px] text-rfrnce-gray max-w-[36ch] leading-[1.6]">
              Guarda referencias. Añade contexto. Descubre conexiones.
            </p>
          </div>
          <div className="text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-rfrnce-gray leading-loose">
            Acceso anticipado<br />
            Junio 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
