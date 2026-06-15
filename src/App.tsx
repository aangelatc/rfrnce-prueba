import { useState } from "react";

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

function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <div className="min-h-screen bg-[#f2f4ff] text-[#201f21]">
      <header className="sticky top-0 z-30 border-b border-rfrnce-gray/20 bg-[#f2f4ff]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-[0.2em] text-[#201f21]">rfrnce</div>
          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.25em] text-[#201f21] md:flex">
           <a href="#que-es" className="text-[#201f21] transition hover:text-[#89f336]">Qué es</a>
<a href="#problema" className="text-[#201f21] transition hover:text-[#89f336]">Problema</a>
<a href="#como-funciona" className="text-[#201f21] transition hover:text-[#89f336]">Cómo funciona</a>
<a href="#para-quien" className="text-[#201f21] transition hover:text-[#89f336]">Para quién</a>
<a href="#acceso" className="text-[#201f21] transition hover:text-[#89f336]">Acceso anticipado</a>
          </nav>
          <a
            href="#acceso"
            className="rounded-full border border-rfrnce-black bg-[#89f336] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#201f21] transition hover:bg-rfrnce-black hover:text-rfrnce-white"
          >
            Únete a la lista
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-20 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.12),transparent_40%),radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.18),transparent_25%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-16 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="max-w-2xl space-y-8">
                <p className="inline-flex rounded-full border border-rfrnce-gray/400 bg-[#ffffff]/70 px-4 py-1 text-xs uppercase tracking-[0.3em] text-[#606060]">
                  Archivo creativo</p>
                <h1 className="text-4xl font-semibold tracking-tight text-[#201f21] sm:text-5xl lg:text-6xl">
                  Todas tus referencias creativas, conectadas en un solo lugar.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-[#606060]">
                  rfrnce es una plataforma digital para guardar, organizar, conectar y recuperar inspiración visual, cultural y conceptual en un archivo creativo vivo.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#acceso"
                    className="inline-flex items-center justify-center rounded-full bg-[#89f336] px-6 py-3 text-sm font-semibold text-[#201f21] transition hover:bg-rfrnce-black hover:text-rfrnce-white"
                  >
                    Únete a la lista de espera
                  </a>
                  <a
                    href="#como-funciona"
                    className="inline-flex items-center justify-center rounded-full border border-rfrnce-black bg-transparent px-6 py-3 text-sm font-semibold text-[#201f21] transition hover:bg-rfrnce-black hover:text-rfrnce-white"
                  >
                    Ver cómo funciona
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="rounded-3xl border border-rfrnce-gray/20 bg-[#ffffff]/70 p-6 shadow-glow backdrop-blur">
                    <div className="h-40 rounded-3xl bg-gradient-to-br from-rfrnce-white via-rfrnce-bg to-rfrnce-lime" />
                    <div className="mt-4 flex items-center justify-between text-sm text-[#606060]">
                      <span>Proyecto</span>
                      <span>93 refs</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#606060]">
                      Tarjeta de referencia con etiquetas, notas y conexiones visuales al archivo principal.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="problema" className="border-t border-rfrnce-gray/20 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#606060]">El problema</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#201f21] sm:text-4xl">
                  La inspiración está en todas partes. Encontrarla de nuevo es el problema.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#606060]">
                  Los creativos guardan referencias constantemente, pero estas terminan dispersas en múltiples lugares. El problema no es solo guardar contenido, sino conservar su contexto y recuperarlo cuando un proyecto lo necesita.
                </p>
                <ul className="mt-8 grid gap-3 text-[#606060] sm:grid-cols-2">
                  {[
                    "Pinterest",
                    "Instagram",
                    "Capturas",
                    "Carpetas locales",
                    "Notas",
                    "Enlaces guardados",
                    "Playlists",
                    "Memes",
                  ].map((item) => (
                    <li key={item} className="rounded-2xl border border-rfrnce-gray/20 bg-[#ffffff]/80 px-4 py-3 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-4xl border border-rfrnce-gray/20 bg-[#ffffff]/80 p-8 shadow-glow">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-rfrnce-gray/20 bg-[#ffffff]">
                  <div className="bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_25%),radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.15),transparent_25%)] h-full p-6">
                    <div className="grid h-full gap-4">
                      <div className="h-16 rounded-3xl bg-[#89f336]/80" />
                      <div className="grid gap-4 rounded-3xl bg-[#89f336]/90 p-4">
                        {[...Array(3)].map((_, index) => (
                          <div key={index} className="h-12 rounded-2xl bg-[#ffffff]/80" />
                        ))}
                      </div>
                      <div className="mt-auto grid gap-3">
                        {[...Array(4)].map((_, index) => (
                          <div key={index} className="h-14 rounded-3xl bg-[#ffffff]/80" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="que-es" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#606060]">Qué es</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#201f21] sm:text-4xl">
                  Un archivo creativo que entiende tus referencias.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#606060]">
                  rfrnce permite centralizar referencias de cualquier formato y organizarlas de forma flexible en colecciones, proyectos y sistemas personales de archivo.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.title} className="rounded-3xl border border-rfrnce-gray/20 bg-[#ffffff]/80 p-6 text-[#606060]">
                    <h3 className="text-xl font-semibold text-[#201f21]">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="border-t border-rfrnce-gray/20 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-[#606060]">Cómo funciona</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#201f21] sm:text-4xl">
                De referencia aislada a red de ideas.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#606060]">
                Un flujo simple para capturar lo que te inspira, darle contexto, organizarlo y encontrar relaciones que alimenten tus proyectos creativos.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Captura una referencia",
                  text: "Añade una imagen, link, texto, vídeo, libro, canción, cita o archivo.",
                },
                {
                  step: "2",
                  title: "Añade contexto",
                  text: "Incluye notas, etiquetas, proyecto, formato, fuente o intención creativa.",
                },
                {
                  step: "3",
                  title: "Organízala en tu archivo",
                  text: "Agrúpala en colecciones, proyectos o tableros.",
                },
                {
                  step: "4",
                  title: "Encuentra conexiones",
                  text: "Visualiza relaciones entre referencias y descubre vínculos culturales.",
                },
              ].map((item) => (
                <div key={item.step} className="rounded-3xl border border-rfrnce-gray/20 bg-[#ffffff]/80 p-8 text-[#606060]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#89f336] text-2xl font-semibold text-[#201f21]">
                    {item.step}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#201f21]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="para-quien" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#606060]">Para quién</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#201f21] sm:text-4xl">
                  Para creativos que necesitan un archivo inteligente.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#606060]">
                  rfrnce está pensado para diseñadores, directores de arte, creativos, equipos de branding, editoriales y cualquiera que trabaje con referencias culturales y visuales.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Equipos creativos",
                  "Estudios de diseño",
                  "Freelancers",
                  "Archivos visuales",
                ].map((item) => (
                  <div key={item} className="rounded-3xl border border-rfrnce-gray/20 bg-[#ffffff]/80 px-6 py-8 text-[#606060]">
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="acceso" className="border-t border-rfrnce-gray/20 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[2rem] border border-rfrnce-gray/20 bg-[#ffffff]/90 p-10 shadow-glow">
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#606060]">Acceso anticipado</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#201f21] sm:text-4xl">
                    Únete a la lista de espera.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-[#606060]">
                    Sé de los primeros en probar rfrnce y recibe noticias cuando el MVP esté listo. Deja tu email para acceso exclusivo y actualizaciones.</p>
                </div>
                <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-rfrnce-gray/20 bg-[#ffffff]/90 p-8">
                  <label htmlFor="email" className="text-sm font-medium text-[#201f21]">Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="tú@ejemplo.com"
                    className="mt-3 w-full rounded-2xl border border-slate-700 bg-[#ffffff] px-4 py-4 text-sm text-[#201f21] outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/30"
                  />
                  <button
                    type="submit"
                    className="mt-6 w-full rounded-full bg-[#89f336] px-6 py-4 text-sm font-semibold text-[#201f21] transition hover:bg-rfrnce-black hover:text-rfrnce-white"
                  >
                    Enviar solicitud
                  </button>
                  {status === "success" && (
                    <p className="mt-4 text-sm text-emerald-400">Gracias, tu email ha sido recibido. Pronto te contactaremos.</p>
                  )}
                  {status === "error" && (
                    <p className="mt-4 text-sm text-rose-400">Por favor ingresa un email válido.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
