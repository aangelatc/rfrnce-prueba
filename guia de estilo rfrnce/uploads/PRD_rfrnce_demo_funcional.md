# PRD — rfrnce  
## Demo funcional de archivo creativo con conexiones inteligentes

---

## 1. Rol del asistente para Lovable

Eres un diseñador/desarrollador experto en UI/UX, React, TypeScript, Vite, Tailwind CSS y arquitectura de producto para demos funcionales. Tu objetivo es construir una demo usable, no una landing page.

Debes desarrollar **rfrnce**, una plataforma digital de referencias e inspiración creativa que permite guardar, organizar, buscar, recuperar y conectar referencias de distinta naturaleza en un único archivo creativo.

La prioridad es que el usuario pueda **usar el producto desde el primer momento** y experimentar su valor principal: guardar referencias con contexto y descubrir conexiones entre ellas mediante IA o lógica simulada.

No construyas una web promocional. Construye una demo funcional tipo MVP.

---

# 2. Resumen del producto

**rfrnce** es una plataforma digital para personas y equipos creativos que necesitan guardar, organizar y recuperar referencias de inspiración dispersas en múltiples formatos: imágenes, vídeos, enlaces, libros, música, citas, memes, PDFs, notas, campañas visuales, escenas de cine, artículos, piezas sonoras u obras artísticas.

El problema principal es que la inspiración creativa suele quedar fragmentada entre Pinterest, Instagram, capturas, carpetas, notas, enlaces, vídeos, playlists, libros, artículos y documentos. Al perderse el contexto, resulta difícil volver a encontrar esas referencias o relacionarlas con otras ideas.

rfrnce funciona como un **archivo creativo vivo**: cada referencia se guarda con contexto, etiquetas, notas y colección; además, el sistema ayuda a encontrar conexiones entre referencias visuales, textuales, sonoras, culturales o conceptuales.

---

# 3. Objetivo de la demo funcional

El objetivo del MVP es construir una demo funcional donde un usuario pueda:

- Entrar en un archivo creativo ya precargado.
- Ver referencias de diferentes formatos.
- Añadir una nueva referencia.
- Editar y eliminar referencias.
- Organizar referencias por colecciones o proyectos.
- Buscar y filtrar referencias.
- Abrir una referencia en detalle.
- Pulsar un botón para encontrar conexiones.
- Ver conexiones sugeridas entre referencias de distinta naturaleza.
- Leer una explicación clara de por qué dos referencias están conectadas.
- Explorar una vista visual sencilla tipo mapa de conexiones.

La demo debe demostrar el valor diferencial de rfrnce:

> No es solo una herramienta para guardar referencias.  
> Es una herramienta para **conectar ideas**.

---

# 4. Tipo de producto

Aunque se construya como “sitio web” en Lovable, la experiencia debe comportarse como una **web app demo funcional**, no como una landing page.

Debe tener una pantalla inicial mínima, pero la mayor parte de la experiencia debe estar centrada en el producto.

---

# 5. Usuarios principales

## Usuario principal

Personas creativas que trabajan con referencias como parte de su proceso de investigación, dirección visual, escritura, diseño, estrategia, arte o comunicación.

Ejemplos:

- Directores de arte.
- Diseñadores gráficos.
- Diseñadores de producto.
- Creativos publicitarios.
- Escritores.
- Filmmakers.
- Fotógrafos.
- Curadores visuales.
- Investigadores culturales.
- Equipos editoriales.
- Estrategas de marca.
- Estudiantes creativos.
- Equipos de contenido.

## Necesidades principales

El usuario necesita:

- Guardar referencias rápidamente.
- Añadir contexto personal.
- Organizar referencias por proyectos.
- Recuperar inspiración sin perder tiempo.
- Encontrar relaciones inesperadas entre materiales diferentes.
- Usar referencias como materia prima para desarrollar ideas.

---

# 6. Jobs To Be Done

## JTBD 1 — Guardar inspiración con contexto

Cuando encuentro una referencia creativa interesante, quiero guardarla junto con una nota, etiquetas, fuente y razón por la que la guardo, para poder recuperarla más adelante sin perder el contexto.

## JTBD 2 — Organizar un archivo creativo

Cuando trabajo en varios proyectos, quiero agrupar mis referencias por colecciones, formatos y etiquetas, para mantener mi investigación ordenada.

## JTBD 3 — Buscar referencias rápidamente

Cuando necesito inspiración para una idea, quiero buscar por título, etiqueta, tipo, colección, descripción o conceptos, para encontrar referencias relevantes sin recordar exactamente dónde las guardé.

## JTBD 4 — Descubrir conexiones

Cuando estoy explorando una referencia, quiero que el sistema me sugiera otras referencias conectadas, incluso de formatos diferentes, para encontrar relaciones creativas que no había visto.

## JTBD 5 — Entender por qué dos referencias conectan

Cuando el sistema conecta dos referencias, quiero ver una explicación clara de la relación, para poder usar esa conexión como insight creativo.

---

# 7. Principio clave de producto

La demo debe hacer que el usuario entienda rfrnce **usándolo**, no leyendo una explicación comercial.

Evitar secciones tipo:

- Problema.
- Solución.
- Beneficios.
- Público objetivo.
- Roadmap.
- Lista de espera.
- Comparativa.
- CTA final de marketing.

La narrativa debe estar integrada en la interacción.

---

# 8. Stack técnico

## Frontend

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- ShadCN/UI si Lovable lo permite.
- Componentes reutilizables.
- Diseño responsive.
- Arquitectura mobile-first.

## Persistencia

Para una primera demo rápida se recomienda:

### Opción recomendada para MVP rápido

- `localStorage` para guardar referencias añadidas, editadas o eliminadas.
- Dataset inicial embebido en el frontend.
- Lógica simulada para conexiones.

Esta opción permite crear una demo funcional rápidamente sin depender de configuración backend.

### Opción escalable

- Supabase para persistencia real.
- PostgreSQL para referencias, colecciones, conexiones e insights.
- Row Level Security preparada para futuro login.
- Edge Functions para lógica de IA si se activa IA real.

---

# 9. Recomendación de implementación

Para la primera versión de la demo funcional, construir con:

- React + TypeScript + Vite.
- Tailwind CSS.
- Datos iniciales en archivo local `demoData.ts`.
- Persistencia con `localStorage`.
- Conexiones simuladas mediante reglas.
- UI preparada para migrar a Supabase e IA real más adelante.

La IA debe parecer funcional y coherente, pero no es obligatorio usar una API real en la primera demo. La experiencia debe priorizar claridad, fluidez y sensación de producto usable.

---

# 10. Arquitectura general de la experiencia

La aplicación debe tener una estructura tipo archivo creativo:

1. **Home / Entrada a demo**
2. **Archivo / Dashboard**
3. **Añadir referencia**
4. **Detalle de referencia**
5. **Conexiones**
6. **Colección / Proyecto**
7. **Mapa de conexiones**

La navegación debe ser rápida y clara. La pantalla principal debe ser el archivo.

---

# 11. Pantallas

---

## 11.1 Home / Entrada a demo

Pantalla breve de entrada.

No debe ser una landing page extensa. Debe funcionar como una puerta de entrada al producto.

### Contenido

Logo:

```text
rfrnce
```

Frase principal:

```text
Guarda referencias. Añade contexto. Descubre conexiones.
```

Texto breve:

```text
Un archivo creativo vivo para organizar inspiración y encontrar relaciones entre ideas, formatos y culturas visuales.
```

CTA principal:

```text
Entrar en la demo
```

### Comportamiento

Al hacer clic en el CTA, el usuario entra directamente al dashboard de referencias.

### Restricciones

No incluir secciones comerciales extensas.  
No incluir lista de espera.  
No incluir captación de email.  
No incluir pricing.  
No incluir roadmap.

---

## 11.2 Archivo / Dashboard

Pantalla principal del producto.

Debe mostrar todas las referencias disponibles en una interfaz tipo archivo visual/editorial.

### Elementos obligatorios

- Sidebar con colecciones.
- Header superior.
- Buscador.
- Filtros.
- Grid de referencias.
- Botón “Añadir referencia”.
- Acceso a “Mapa de conexiones”.
- Acceso a modo inspiración aleatoria, si se implementa.

### Contenido del dashboard

Cada referencia debe mostrarse como una card con:

- Título.
- Tipo de referencia.
- Preview visual o textual.
- Etiquetas.
- Colección/proyecto.
- Breve nota.
- Fecha de creación.
- Botón para abrir detalle.
- Botón para encontrar conexiones.

### Estados

- Estado con referencias cargadas.
- Estado de búsqueda sin resultados.
- Estado de filtro sin resultados.
- Estado de archivo vacío, aunque en demo no debería aparecer inicialmente porque habrá dataset precargado.

---

## 11.3 Añadir referencia

Puede implementarse como modal, drawer o página dedicada.

### Campos mínimos

- Título.
- Tipo de referencia.
- URL o contenido.
- Descripción.
- Etiquetas.
- Proyecto o colección.
- Nota personal.
- Por qué la guardo.
- Fuente/origen.

### Tipos de referencia

- Imagen.
- Vídeo.
- Texto.
- Link.
- Libro.
- Música.
- Cita.
- Meme.
- PDF/Archivo.
- Nota.
- Obra artística.
- Campaña visual.
- Escena de cine.
- Pieza sonora.
- Otro.

### Comportamiento

Al guardar:

- Se crea una nueva referencia.
- La referencia aparece inmediatamente en el dashboard.
- Se guarda en `localStorage`.
- Se asigna fecha de creación.
- Se generan conceptos básicos a partir de etiquetas, descripción y notas.
- Se muestra un toast de confirmación.

Texto de confirmación:

```text
Referencia guardada en tu archivo.
```

---

## 11.4 Detalle de referencia

Vista individual de una referencia.

Puede abrirse como panel lateral, drawer o página completa.

### Debe mostrar

- Título.
- Tipo de referencia.
- Preview o contenido.
- Descripción.
- Etiquetas.
- Notas.
- Fuente.
- Colección/proyecto.
- Fecha de creación.
- Referencias conectadas.
- Explicación de conexiones generadas por IA o lógica simulada.
- Botones para editar, eliminar y encontrar conexiones.

### Acciones

- Editar referencia.
- Eliminar referencia.
- Encontrar conexiones.
- Ver en mapa de conexiones.
- Volver al archivo.

---

## 11.5 Vista de conexiones

Pantalla o panel que muestra conexiones sugeridas para una referencia seleccionada.

### Activador

Botón:

```text
Encontrar conexiones
```

o

```text
Conectar con otras referencias
```

### Cada conexión debe incluir

- Referencia conectada.
- Tipo de referencia conectada.
- Tipo de relación.
- Explicación breve.
- Nivel de afinidad.
- Etiquetas compartidas.
- Conceptos relacionados.
- Botón para abrir la referencia conectada.
- Opción “Guardar como insight”, si se implementa prioridad media.

### Tipos de conexión posibles

- Estética.
- Temática.
- Cultural.
- Histórica.
- Emocional.
- Formal.
- Narrativa.
- Conceptual.
- Cromática.
- Sonora.
- Visual.
- Simbólica.
- De tono.
- De contexto.
- De uso creativo.

### Ejemplo de output

```text
Esta fotografía nocturna conecta con la pieza musical “Ambient texture reference” por su atmósfera fría, ritmo pausado y sensación de espacio urbano suspendido. Ambas referencias pueden servir para construir una dirección visual cinematográfica, introspectiva y ligeramente distópica.
```

---

## 11.6 Colección / Proyecto

Vista filtrada de una colección concreta.

### Debe mostrar

- Nombre de la colección.
- Descripción.
- Número de referencias.
- Grid de referencias asociadas.
- Filtros internos.
- Botón para añadir referencia a esa colección.
- Conexiones relevantes dentro de la colección.

### Colecciones demo sugeridas

- Campaña visual para marca de moda.
- Investigación sobre cultura digital.
- Moodboard para cortometraje.
- Referencias de identidad editorial.
- Archivo de texturas sonoras.
- Inspiración para dirección de arte.

---

## 11.7 Mapa de conexiones

Vista visual del archivo como red de referencias.

No tiene que ser compleja. Debe comunicar claramente que rfrnce conecta referencias entre sí.

### Opción simple recomendada

- Nodo central para referencia seleccionada.
- Nodos secundarios para referencias conectadas.
- Líneas finas entre nodos.
- Etiquetas con tipo de conexión.
- Nivel de afinidad representado de forma sutil.
- Al hacer clic en un nodo, abrir detalle de referencia.

### Alternativa sencilla

Si el grafo visual resulta complejo para Lovable, crear una vista tipo “mapa de ideas” con:

- Card central.
- Cards conectadas alrededor.
- Líneas o separadores visuales.
- Explicaciones resumidas.

---

# 12. Flujos de usuario

---

## Flujo 1 — Entrar y explorar archivo

1. Usuario llega a Home.
2. Ve logo, frase breve y CTA.
3. Hace clic en “Entrar en la demo”.
4. Accede al dashboard.
5. Ve referencias precargadas.
6. Explora cards en grid.
7. Filtra o busca referencias.
8. Abre una referencia en detalle.

---

## Flujo 2 — Añadir referencia

1. Usuario hace clic en “Añadir referencia”.
2. Se abre formulario.
3. Introduce título, tipo, URL/contenido, descripción, etiquetas, colección, nota, fuente y motivo.
4. Hace clic en “Guardar referencia”.
5. La referencia aparece en el dashboard.
6. Se guarda en `localStorage`.
7. El usuario puede abrirla o buscar conexiones.

---

## Flujo 3 — Buscar y filtrar

1. Usuario escribe en buscador.
2. El sistema busca por título, descripción, etiquetas, notas, colección, tipo y conceptos.
3. Usuario aplica filtros por tipo, colección, etiqueta o fecha.
4. El grid se actualiza en tiempo real.
5. Si no hay resultados, aparece un estado vacío útil.

Ejemplo de estado vacío:

```text
No hay referencias que coincidan con esta búsqueda. Prueba con otra etiqueta, formato o concepto.
```

---

## Flujo 4 — Encontrar conexiones

1. Usuario abre una referencia o pulsa “Encontrar conexiones” desde una card.
2. El sistema analiza etiquetas, conceptos, tipo, descripción y colección.
3. El sistema sugiere referencias conectadas.
4. Las conexiones priorizan formatos distintos al de la referencia original.
5. Cada resultado muestra explicación, afinidad, tipo de relación y conceptos compartidos.
6. Usuario puede abrir una referencia conectada.
7. Usuario puede ver la conexión en el mapa.

---

## Flujo 5 — Explorar colección

1. Usuario selecciona una colección en el sidebar.
2. El dashboard muestra solo referencias de esa colección.
3. Usuario puede buscar dentro de la colección.
4. Usuario puede añadir referencia directamente a esa colección.
5. Usuario puede encontrar conexiones dentro o fuera de la colección.

---

## Flujo 6 — Mapa de conexiones

1. Usuario abre el mapa general o desde una referencia.
2. Ve nodos de referencias conectadas.
3. Puede hacer clic en un nodo.
4. Se abre el detalle de esa referencia.
5. Puede seguir explorando conexiones.

---

# 13. Funcionalidades por prioridad

---

## Prioridad alta — MVP obligatorio

### 1. Dashboard de archivo

Grid visual con referencias demo y referencias creadas por el usuario.

### 2. Cards de referencias

Cada card debe mostrar información básica, tipo, etiquetas, colección y acciones.

### 3. Añadir referencia

Formulario funcional para crear referencias.

### 4. Editar referencia

Permitir modificar campos principales.

### 5. Eliminar referencia

Permitir borrar una referencia con confirmación.

### 6. Vista detalle

Mostrar todos los datos de una referencia.

### 7. Búsqueda

Buscar por:

- Título.
- Etiquetas.
- Tipo.
- Proyecto.
- Descripción.
- Notas.
- Conceptos relacionados.

### 8. Filtros

Filtrar por:

- Tipo de referencia.
- Colección.
- Etiqueta.
- Fecha.
- Referencias conectadas.

### 9. Colecciones/proyectos

Organizar referencias en colecciones.

### 10. Botón “Encontrar conexiones”

Acción central del producto.

### 11. Resultados de conexiones

Mostrar conexiones con explicación clara.

### 12. Vista visual sencilla de conexiones

Mapa, grafo simple o vista de ideas conectadas.

### 13. Dataset inicial

Precargar 20-30 referencias variadas.

---

## Prioridad media

### 1. Etiquetado automático simulado

Sugerir etiquetas a partir del tipo, descripción y notas.

### 2. Sugerencias de etiquetas

Mostrar chips sugeridos al crear o editar referencia.

### 3. Modo inspiración aleatoria

Botón:

```text
Inspiración aleatoria
```

Muestra una referencia random y posibles conexiones.

### 4. Guardar conexión como insight

Permitir guardar una conexión interesante como insight creativo.

### 5. Vista por formatos

Agrupar referencias por imagen, texto, música, libro, vídeo, etc.

### 6. Vista por conceptos

Agrupar referencias por conceptos semánticos.

---

## Prioridad baja

No implementar en la primera demo:

- Login real.
- Subida avanzada de archivos.
- Colaboración entre usuarios.
- Perfiles públicos.
- Pagos.
- Extensión de navegador.
- App móvil nativa.
- IA compleja obligatoria.
- Scraping automático.
- Importación desde Pinterest, Instagram o Notion.
- Panel de administración.

---

# 14. Componentes necesarios

## Estructura general

### `AppShell`

Contenedor principal de la aplicación. Incluye sidebar, header y área de contenido.

### `Sidebar`

Lista colecciones, accesos a dashboard y mapa de conexiones.

### `Header`

Muestra nombre de sección, buscador global, botón de añadir referencia y acceso a mapa.

### `SearchBar`

Input de búsqueda global.

### `FilterBar`

Filtros por tipo, colección, etiqueta, fecha y conectadas.

---

## Referencias

### `ReferenceGrid`

Grid responsive de cards.

### `ReferenceCard`

Card individual de referencia.

Debe incluir:

- Preview.
- Título.
- Tipo.
- Tags.
- Colección.
- Nota breve.
- Acciones.

### `ReferenceTypeBadge`

Badge visual para identificar formato.

### `Tag`

Chip de etiqueta.

### `AddReferenceModal`

Formulario para crear referencia.

### `EditReferenceModal`

Formulario para editar referencia.

### `ReferenceDetailPanel`

Panel o vista de detalle.

---

## Colecciones

### `CollectionList`

Lista de colecciones en sidebar.

### `CollectionView`

Vista de colección concreta.

---

## Conexiones

### `ConnectionCard`

Card de conexión sugerida.

### `ConnectionMap`

Visualización sencilla de conexiones.

### `AIConnectionPanel`

Panel que muestra resultados de “Encontrar conexiones”.

### `AffinityScore`

Indicador visual de afinidad.

### `ConnectionTypeBadge`

Badge para tipo de relación.

---

## Sistema

### `EmptyState`

Estados vacíos.

### `DemoDataSeeder`

Carga dataset inicial si no hay datos en `localStorage`.

### `Toast`

Mensajes de confirmación.

### `Button`

Botón reutilizable.

### `Input`

Campo de texto.

### `Select`

Selector.

### `TextArea`

Área de texto.

### `Modal`

Contenedor modal.

### `Drawer`

Panel lateral opcional.

---

# 15. Modelo de datos

---

## Modelo `Reference`

```ts
type ReferenceType =
  | "image"
  | "video"
  | "text"
  | "link"
  | "book"
  | "music"
  | "quote"
  | "meme"
  | "pdf"
  | "note"
  | "artwork"
  | "campaign"
  | "film_scene"
  | "sound_piece"
  | "other";

type Reference = {
  id: string;
  title: string;
  type: ReferenceType;
  url?: string;
  content?: string;
  preview?: string;
  description: string;
  notes: string;
  reasonSaved: string;
  source: string;
  tags: string[];
  concepts: string[];
  collectionId: string;
  createdAt: string;
  updatedAt: string;
};
```

---

## Modelo `Collection`

```ts
type Collection = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};
```

---

## Modelo `Connection`

```ts
type ConnectionType =
  | "aesthetic"
  | "thematic"
  | "cultural"
  | "historical"
  | "emotional"
  | "formal"
  | "narrative"
  | "conceptual"
  | "chromatic"
  | "sonic"
  | "visual"
  | "symbolic"
  | "tone"
  | "context"
  | "creative_use";

type Connection = {
  id: string;
  sourceReferenceId: string;
  targetReferenceId: string;
  connectionType: ConnectionType;
  explanation: string;
  affinityScore: number;
  sharedTags: string[];
  sharedConcepts: string[];
  createdAt: string;
};
```

---

## Modelo `Insight`

```ts
type Insight = {
  id: string;
  referenceId: string;
  connectionId?: string;
  text: string;
  createdAt: string;
};
```

---

# 16. Tablas Supabase opcionales

Si se decide usar Supabase, contemplar las siguientes tablas.

---

## Tabla `references`

Campos:

- `id`
- `title`
- `type`
- `url`
- `content`
- `preview`
- `description`
- `notes`
- `reason_saved`
- `source`
- `tags`
- `concepts`
- `collection_id`
- `created_at`
- `updated_at`

---

## Tabla `collections`

Campos:

- `id`
- `name`
- `description`
- `created_at`

---

## Tabla `connections`

Campos:

- `id`
- `source_reference_id`
- `target_reference_id`
- `connection_type`
- `explanation`
- `affinity_score`
- `shared_tags`
- `shared_concepts`
- `created_at`

---

## Tabla `insights`

Campos:

- `id`
- `reference_id`
- `connection_id`
- `text`
- `created_at`

---

## Seguridad / RLS

Para la demo sin login:

- No es necesario activar RLS si se usa solo `localStorage`.
- Si se usa Supabase sin autenticación real, usar datos públicos de demo.
- Si se prepara para futuro login, activar RLS por usuario más adelante.

---

# 17. Lógica de IA y conexiones

La conexión de referencias es el núcleo del producto.

El sistema debe permitir seleccionar una referencia y encontrar conexiones con otras referencias del archivo.

---

## Opción 1 — IA simulada para demo

Recomendada para la primera versión.

Usar lógica local basada en:

- Coincidencia de etiquetas.
- Coincidencia de conceptos.
- Relación entre tipos distintos.
- Afinidad temática.
- Reglas manuales.
- Plantillas de explicación.
- Conexiones predefinidas en el dataset inicial.

### Regla principal

Priorizar conexiones entre referencias de **distinto formato**.

Ejemplo:

- Imagen → música.
- Cita → campaña visual.
- Meme → artículo.
- Vídeo → pintura.
- Libro → textura sonora.
- Escena de cine → paleta visual.
- Artículo → imagen de archivo.

### Pseudológica

```ts
function findConnections(reference, allReferences) {
  return allReferences
    .filter(item => item.id !== reference.id)
    .map(item => {
      const sharedTags = getSharedItems(reference.tags, item.tags);
      const sharedConcepts = getSharedItems(reference.concepts, item.concepts);
      const differentTypeBonus = reference.type !== item.type ? 20 : 0;

      const score =
        sharedTags.length * 15 +
        sharedConcepts.length * 20 +
        differentTypeBonus;

      return {
        targetReference: item,
        affinityScore: Math.min(score, 100),
        sharedTags,
        sharedConcepts,
        connectionType: inferConnectionType(reference, item),
        explanation: generateExplanation(reference, item, sharedTags, sharedConcepts)
      };
    })
    .filter(connection => connection.affinityScore > 25)
    .sort((a, b) => b.affinityScore - a.affinityScore)
    .slice(0, 5);
}
```

### Plantilla de explicación

```text
“{Referencia A}” conecta con “{Referencia B}” por una relación {tipo_de_conexión}. Ambas comparten conceptos como {conceptos} y pueden funcionar juntas para construir una dirección creativa basada en {tono/uso creativo}.
```

### Ventajas

- Rápida de implementar.
- Controlable.
- Suficiente para demostrar el concepto.
- No requiere API externa.
- Evita costes.
- Permite una demo estable.

---

## Opción 2 — IA real

Usar una API de IA para:

- Generar embeddings de cada referencia.
- Comparar similitud semántica.
- Sugerir conexiones.
- Explicar relaciones.
- Generar etiquetas automáticas.
- Resumir contenido.
- Proponer usos creativos.

### Posible flujo

1. Usuario añade referencia.
2. Sistema envía título, descripción, notas, etiquetas y contenido a una función de IA.
3. IA devuelve:
   - conceptos semánticos;
   - etiquetas sugeridas;
   - resumen;
   - embeddings;
   - posibles conexiones.
4. Sistema compara embeddings con el archivo.
5. Devuelve conexiones ordenadas por afinidad.
6. IA genera una explicación creativa.

### Recomendación

Para la primera demo funcional, usar **Opción 1 — IA simulada**.  
Diseñar la arquitectura para poder evolucionar después a **Opción 2 — IA real** sin rehacer la interfaz.

---

# 18. Dataset inicial demo

La demo debe incluir entre 20 y 30 referencias precargadas. A continuación se define un dataset inicial de 24 referencias.

---

## Colecciones iniciales

```ts
const demoCollections = [
  {
    id: "col-fashion-campaign",
    name: "Campaña visual para marca de moda",
    description: "Referencias para una campaña sofisticada, urbana y editorial."
  },
  {
    id: "col-digital-culture",
    name: "Investigación sobre cultura digital",
    description: "Memes, artículos, textos y piezas visuales sobre internet, identidad y cultura contemporánea."
  },
  {
    id: "col-short-film",
    name: "Moodboard para cortometraje",
    description: "Atmósferas, escenas, sonidos y referencias narrativas para una pieza audiovisual."
  },
  {
    id: "col-editorial-identity",
    name: "Referencias de identidad editorial",
    description: "Material gráfico, tipográfico y conceptual para sistemas editoriales."
  },
  {
    id: "col-sonic-textures",
    name: "Archivo de texturas sonoras",
    description: "Piezas sonoras, música y atmósferas para inspiración audiovisual."
  },
  {
    id: "col-art-direction",
    name: "Inspiración para dirección de arte",
    description: "Referencias visuales, culturales y formales para construir universos estéticos."
  }
];
```

---

## Referencias iniciales

```ts
const demoReferences = [
  {
    id: "ref-001",
    title: "Nocturnal street reflection",
    type: "image",
    url: "https://images.unsplash.com/photo-placeholder-001",
    preview: "Fotografía urbana nocturna con reflejos sobre asfalto mojado.",
    description: "Imagen de una calle nocturna con luces frías, reflejos y sensación de ciudad suspendida.",
    tags: ["nocturno", "urbano", "reflejos", "cinematográfico"],
    concepts: ["soledad urbana", "atmósfera fría", "distopía suave", "espacio suspendido"],
    collectionId: "col-short-film",
    notes: "Puede funcionar como referencia de tono para una escena introspectiva.",
    reasonSaved: "Por la atmósfera silenciosa y la luz azulada.",
    source: "Unsplash / placeholder",
    createdAt: "2026-01-10",
    updatedAt: "2026-01-10"
  },
  {
    id: "ref-002",
    title: "Ambient texture reference",
    type: "music",
    url: "https://example.com/audio/ambient-texture",
    preview: "Pieza sonora ambiental, fría y pausada.",
    description: "Referencia musical con textura ambiental, ritmo lento y sensación espacial.",
    tags: ["ambient", "frío", "pausado", "textura sonora"],
    concepts: ["espacio suspendido", "introspección", "vacío urbano", "atmósfera fría"],
    collectionId: "col-sonic-textures",
    notes: "Útil para acompañar escenas de ciudad nocturna.",
    reasonSaved: "Por su cualidad envolvente y cinematográfica.",
    source: "Archivo sonoro demo",
    createdAt: "2026-01-11",
    updatedAt: "2026-01-11"
  },
  {
    id: "ref-003",
    title: "Editorial grid system",
    type: "link",
    url: "https://example.com/editorial-grid",
    preview: "Sistema editorial basado en retículas amplias y mucho espacio blanco.",
    description: "Referencia de diseño editorial contemporáneo con estructura modular y jerarquía limpia.",
    tags: ["editorial", "retícula", "minimalismo", "espacio blanco"],
    concepts: ["orden visual", "claridad", "sistema modular", "sofisticación"],
    collectionId: "col-editorial-identity",
    notes: "Puede guiar la estructura visual de una interfaz premium.",
    reasonSaved: "Por su equilibrio entre rigor y sensibilidad visual.",
    source: "Artículo de diseño demo",
    createdAt: "2026-01-12",
    updatedAt: "2026-01-12"
  },
  {
    id: "ref-004",
    title: "Quote on memory and images",
    type: "quote",
    content: "Las imágenes no solo recuerdan: reorganizan la forma en que pensamos.",
    preview: "Cita sobre memoria, pensamiento e imágenes.",
    description: "Cita conceptual sobre cómo las imágenes afectan la memoria y la construcción de ideas.",
    tags: ["memoria", "imagen", "pensamiento", "archivo"],
    concepts: ["memoria visual", "archivo vivo", "pensamiento asociativo"],
    collectionId: "col-digital-culture",
    notes: "Puede servir como insight para explicar la lógica conceptual de rfrnce.",
    reasonSaved: "Resume la relación entre referencias y pensamiento creativo.",
    source: "Cita ficticia demo",
    createdAt: "2026-01-13",
    updatedAt: "2026-01-13"
  },
  {
    id: "ref-005",
    title: "Fragmented internet meme",
    type: "meme",
    url: "https://example.com/meme-fragmented-internet",
    preview: "Meme sobre tener inspiración repartida en demasiadas plataformas.",
    description: "Meme que representa la ansiedad de tener referencias dispersas en apps, carpetas y notas.",
    tags: ["meme", "internet", "fragmentación", "ansiedad digital"],
    concepts: ["sobrecarga informativa", "archivo disperso", "cultura digital"],
    collectionId: "col-digital-culture",
    notes: "Útil para expresar de forma ligera el problema de dispersión.",
    reasonSaved: "Porque sintetiza el caos del archivo creativo contemporáneo.",
    source: "Meme demo",
    createdAt: "2026-01-14",
    updatedAt: "2026-01-14"
  },
  {
    id: "ref-006",
    title: "Essay on digital hoarding",
    type: "article",
    url: "https://example.com/digital-hoarding-essay",
    preview: "Artículo sobre acumulación digital y pérdida de contexto.",
    description: "Ensayo sobre cómo acumulamos información digital sin estructuras de recuperación significativas.",
    tags: ["archivo", "internet", "sobrecarga", "ensayo"],
    concepts: ["acumulación digital", "pérdida de contexto", "memoria externa"],
    collectionId: "col-digital-culture",
    notes: "Base teórica para entender el problema que resuelve rfrnce.",
    reasonSaved: "Aporta una capa crítica al concepto de archivo creativo.",
    source: "Artículo ficticio demo",
    createdAt: "2026-01-15",
    updatedAt: "2026-01-15"
  },
  {
    id: "ref-007",
    title: "Soft brutalist fashion campaign",
    type: "campaign",
    url: "https://example.com/fashion-campaign",
    preview: "Campaña visual con arquitectura brutalista, luz suave y estilismo sobrio.",
    description: "Referencia de campaña de moda con tensión entre dureza arquitectónica y sensibilidad textil.",
    tags: ["moda", "brutalismo", "campaña", "luz suave"],
    concepts: ["contraste material", "sofisticación urbana", "cuerpo y arquitectura"],
    collectionId: "col-fashion-campaign",
    notes: "Buen referente para una dirección de arte sobria y cultural.",
    reasonSaved: "Por la mezcla de arquitectura, moda y quietud.",
    source: "Campaña ficticia demo",
    createdAt: "2026-01-16",
    updatedAt: "2026-01-16"
  },
  {
    id: "ref-008",
    title: "Book cover: The Archive of Air",
    type: "book",
    url: "https://example.com/book-cover-archive-air",
    preview: "Portada de libro con tipografía austera y fotografía atmosférica.",
    description: "Portada editorial minimalista con composición espaciosa, fotografía abstracta y tono poético.",
    tags: ["libro", "portada", "minimalismo", "atmósfera"],
    concepts: ["aire", "vacío", "memoria", "poética visual"],
    collectionId: "col-editorial-identity",
    notes: "Referencia para tono editorial sensible y premium.",
    reasonSaved: "Por su uso del vacío y la tensión tipográfica.",
    source: "Libro ficticio demo",
    createdAt: "2026-01-17",
    updatedAt: "2026-01-17"
  },
  {
    id: "ref-009",
    title: "Film scene: corridor silence",
    type: "film_scene",
    url: "https://example.com/film-scene-corridor",
    preview: "Escena de pasillo silencioso con luz fluorescente.",
    description: "Escena cinematográfica con encuadre simétrico, ritmo lento y sensación de espera.",
    tags: ["cine", "silencio", "simetría", "fluorescente"],
    concepts: ["tensión contenida", "espera", "espacio liminal", "soledad"],
    collectionId: "col-short-film",
    notes: "Puede inspirar una escena de transición emocional.",
    reasonSaved: "Por su capacidad de sugerir tensión sin acción explícita.",
    source: "Escena ficticia demo",
    createdAt: "2026-01-18",
    updatedAt: "2026-01-18"
  },
  {
    id: "ref-010",
    title: "Blue grey palette study",
    type: "image",
    url: "https://example.com/blue-grey-palette",
    preview: "Estudio de paleta cromática en azules, grises y blancos rotos.",
    description: "Paleta fría y sofisticada con tonos urbanos, editoriales y silenciosos.",
    tags: ["color", "azul", "gris", "paleta"],
    concepts: ["frialdad", "sutileza", "urbanidad", "calma visual"],
    collectionId: "col-art-direction",
    notes: "Útil para definir tono visual de proyectos sobrios.",
    reasonSaved: "Por su equilibrio entre calma y tensión.",
    source: "Paleta demo",
    createdAt: "2026-01-19",
    updatedAt: "2026-01-19"
  },
  {
    id: "ref-011",
    title: "Sonic dust loop",
    type: "sound_piece",
    url: "https://example.com/sonic-dust-loop",
    preview: "Loop sonoro granular, seco y repetitivo.",
    description: "Textura sonora con ruido fino, repetición mínima y sensación material.",
    tags: ["sonido", "granular", "textura", "repetición"],
    concepts: ["materialidad", "polvo", "ritmo mínimo", "fricción"],
    collectionId: "col-sonic-textures",
    notes: "Puede acompañar visuales de archivo, papel o materia.",
    reasonSaved: "Por su cualidad táctil.",
    source: "Archivo sonoro demo",
    createdAt: "2026-01-20",
    updatedAt: "2026-01-20"
  },
  {
    id: "ref-012",
    title: "Notebook note: archive as studio",
    type: "note",
    content: "Pensar el archivo no como almacén, sino como mesa de trabajo.",
    preview: "Nota propia sobre archivo creativo y proceso.",
    description: "Reflexión sobre el archivo como espacio activo de pensamiento y composición.",
    tags: ["nota", "archivo", "proceso", "estudio"],
    concepts: ["archivo vivo", "mesa de trabajo", "pensamiento creativo"],
    collectionId: "col-art-direction",
    notes: "Idea central para explicar el comportamiento del producto.",
    reasonSaved: "Porque define el archivo como algo activo.",
    source: "Nota personal demo",
    createdAt: "2026-01-21",
    updatedAt: "2026-01-21"
  },
  {
    id: "ref-013",
    title: "PDF: Cultural signals report",
    type: "pdf",
    url: "https://example.com/cultural-signals-report.pdf",
    preview: "Informe PDF sobre señales culturales emergentes.",
    description: "Documento de análisis sobre tendencias culturales, estética digital y comportamiento creativo.",
    tags: ["pdf", "cultura", "tendencias", "investigación"],
    concepts: ["señales culturales", "observación", "contexto social", "tendencias"],
    collectionId: "col-digital-culture",
    notes: "Puede alimentar conceptos estratégicos para campañas.",
    reasonSaved: "Por su utilidad como base de investigación.",
    source: "PDF ficticio demo",
    createdAt: "2026-01-22",
    updatedAt: "2026-01-22"
  },
  {
    id: "ref-014",
    title: "Archive table still life",
    type: "image",
    url: "https://example.com/archive-table",
    preview: "Mesa con papeles, libros, capturas y objetos ordenados.",
    description: "Bodegón editorial de una mesa de trabajo creativa con materiales de archivo.",
    tags: ["mesa", "archivo", "editorial", "objetos"],
    concepts: ["mesa de trabajo", "investigación material", "orden sensible"],
    collectionId: "col-art-direction",
    notes: "Referencia visual para comunicar rfrnce como espacio de trabajo.",
    reasonSaved: "Por su sensación de archivo físico contemporáneo.",
    source: "Imagen demo",
    createdAt: "2026-01-23",
    updatedAt: "2026-01-23"
  },
  {
    id: "ref-015",
    title: "Article: The aesthetics of slowness",
    type: "article",
    url: "https://example.com/aesthetics-of-slowness",
    preview: "Artículo sobre lentitud, contemplación y diseño visual.",
    description: "Texto sobre la importancia de la pausa y el ritmo lento en experiencias visuales contemporáneas.",
    tags: ["lentitud", "diseño", "contemplación", "artículo"],
    concepts: ["ritmo pausado", "atención", "silencio visual", "contemplación"],
    collectionId: "col-editorial-identity",
    notes: "Útil para pensar una interfaz menos ruidosa.",
    reasonSaved: "Por su relación con la experiencia calmada que debe tener rfrnce.",
    source: "Artículo ficticio demo",
    createdAt: "2026-01-24",
    updatedAt: "2026-01-24"
  },
  {
    id: "ref-016",
    title: "Visual identity: quiet luxury archive",
    type: "campaign",
    url: "https://example.com/quiet-luxury-archive",
    preview: "Sistema visual sobrio con tipografía fina, márgenes amplios y materiales neutros.",
    description: "Identidad visual premium basada en sobriedad, espacio y sensibilidad editorial.",
    tags: ["identidad", "premium", "editorial", "sobriedad"],
    concepts: ["lujo silencioso", "claridad", "espacio blanco", "archivo cultural"],
    collectionId: "col-editorial-identity",
    notes: "Muy cercana al tono visual deseado para rfrnce.",
    reasonSaved: "Por su equilibrio entre herramienta y sensibilidad cultural.",
    source: "Identidad ficticia demo",
    createdAt: "2026-01-25",
    updatedAt: "2026-01-25"
  },
  {
    id: "ref-017",
    title: "Video: hands arranging references",
    type: "video",
    url: "https://example.com/hands-arranging-references",
    preview: "Vídeo corto de manos organizando imágenes y notas sobre una mesa.",
    description: "Referencia audiovisual sobre proceso manual, archivo y composición de ideas.",
    tags: ["vídeo", "manos", "proceso", "archivo"],
    concepts: ["gesto creativo", "organización", "mesa de trabajo", "composición"],
    collectionId: "col-art-direction",
    notes: "Puede servir para representar interacción humana con referencias.",
    reasonSaved: "Por su conexión directa con el gesto de ordenar inspiración.",
    source: "Vídeo demo",
    createdAt: "2026-01-26",
    updatedAt: "2026-01-26"
  },
  {
    id: "ref-018",
    title: "Typography sample: narrow grotesk",
    type: "image",
    url: "https://example.com/narrow-grotesk",
    preview: "Muestra tipográfica con grotesca estrecha y composición editorial.",
    description: "Referencia tipográfica sobria, contemporánea y con carácter cultural.",
    tags: ["tipografía", "grotesk", "editorial", "sistema"],
    concepts: ["voz gráfica", "precisión", "estructura", "identidad editorial"],
    collectionId: "col-editorial-identity",
    notes: "Útil para explorar el tono del logo y los títulos.",
    reasonSaved: "Por su carácter sofisticado y no corporativo.",
    source: "Referencia tipográfica demo",
    createdAt: "2026-01-27",
    updatedAt: "2026-01-27"
  },
  {
    id: "ref-019",
    title: "Painting: pale interior with shadow",
    type: "artwork",
    url: "https://example.com/pale-interior-shadow",
    preview: "Pintura de interior pálido con sombra suave y composición silenciosa.",
    description: "Obra pictórica con tonos claros, vacío espacial y tensión emocional contenida.",
    tags: ["pintura", "interior", "sombra", "silencio"],
    concepts: ["vacío", "quietud", "luz suave", "melancolía"],
    collectionId: "col-short-film",
    notes: "Puede informar el tono emocional de escenas interiores.",
    reasonSaved: "Por su forma de construir emoción con muy pocos elementos.",
    source: "Obra ficticia demo",
    createdAt: "2026-01-28",
    updatedAt: "2026-01-28"
  },
  {
    id: "ref-020",
    title: "Link: Are.na-style research board",
    type: "link",
    url: "https://example.com/research-board",
    preview: "Tablero de investigación visual con referencias mixtas.",
    description: "Ejemplo de archivo visual donde conviven imágenes, textos, enlaces y notas.",
    tags: ["archivo", "tablero", "investigación", "referencias"],
    concepts: ["colección abierta", "pensamiento asociativo", "archivo visual"],
    collectionId: "col-art-direction",
    notes: "Referencia estructural, no visual literal.",
    reasonSaved: "Por la lógica de acumulación y relación entre elementos.",
    source: "Link demo",
    createdAt: "2026-01-29",
    updatedAt: "2026-01-29"
  },
  {
    id: "ref-021",
    title: "Quote: context gives images weight",
    type: "quote",
    content: "Una referencia sin contexto es solo una imagen; con contexto, se convierte en material creativo.",
    preview: "Cita sobre el valor del contexto en las referencias.",
    description: "Frase que resume la importancia de añadir intención y notas a cada referencia.",
    tags: ["contexto", "referencia", "imagen", "material creativo"],
    concepts: ["contextualización", "valor semántico", "archivo vivo"],
    collectionId: "col-digital-culture",
    notes: "Puede aparecer como microcopy en estados vacíos.",
    reasonSaved: "Porque explica de forma simple la propuesta del producto.",
    source: "Cita ficticia demo",
    createdAt: "2026-01-30",
    updatedAt: "2026-01-30"
  },
  {
    id: "ref-022",
    title: "Milanote-like wall of ideas",
    type: "image",
    url: "https://example.com/wall-of-ideas",
    preview: "Pared visual con ideas, imágenes, notas y conexiones.",
    description: "Referencia de composición espacial para organizar materiales creativos.",
    tags: ["moodboard", "ideas", "conexiones", "espacio"],
    concepts: ["mapa mental", "relación visual", "proceso creativo"],
    collectionId: "col-art-direction",
    notes: "Puede inspirar la vista de mapa de conexiones.",
    reasonSaved: "Por la manera en que convierte referencias en sistema espacial.",
    source: "Imagen demo",
    createdAt: "2026-01-31",
    updatedAt: "2026-01-31"
  },
  {
    id: "ref-023",
    title: "Sound: distant train station",
    type: "sound_piece",
    url: "https://example.com/distant-train-station",
    preview: "Ambiente sonoro de estación lejana, ecos y movimiento suave.",
    description: "Pieza sonora con ruido ambiental, distancia, reverberación y tránsito.",
    tags: ["sonido", "estación", "eco", "movimiento"],
    concepts: ["tránsito", "espera", "espacio público", "melancolía urbana"],
    collectionId: "col-sonic-textures",
    notes: "Puede conectar con escenas de cine urbano o fotografía nocturna.",
    reasonSaved: "Por su capacidad de evocar espacio sin imagen.",
    source: "Archivo sonoro demo",
    createdAt: "2026-02-01",
    updatedAt: "2026-02-01"
  },
  {
    id: "ref-024",
    title: "Campaign note: body as archive",
    type: "text",
    content: "Explorar el cuerpo como archivo de gestos, prendas, memorias y contextos sociales.",
    preview: "Nota conceptual para campaña de moda.",
    description: "Texto breve que conecta moda, memoria, cuerpo y contexto cultural.",
    tags: ["moda", "cuerpo", "memoria", "campaña"],
    concepts: ["cuerpo como archivo", "gesto", "identidad", "memoria material"],
    collectionId: "col-fashion-campaign",
    notes: "Puede orientar una narrativa de campaña más conceptual.",
    reasonSaved: "Por su potencial para conectar moda y archivo.",
    source: "Nota demo",
    createdAt: "2026-02-02",
    updatedAt: "2026-02-02"
  }
];
```

---

# 19. Conexiones demo predefinidas

Para que la demo parezca inteligente desde el primer uso, incluir conexiones predefinidas relevantes.

```ts
const demoConnections = [
  {
    id: "con-001",
    sourceReferenceId: "ref-001",
    targetReferenceId: "ref-002",
    connectionType: "emotional",
    affinityScore: 92,
    sharedTags: ["frío"],
    sharedConcepts: ["atmósfera fría", "espacio suspendido"],
    explanation: "La fotografía nocturna conecta con la pieza sonora ambiental por su atmósfera fría, ritmo pausado y sensación de ciudad suspendida. Ambas referencias pueden construir una dirección visual cinematográfica e introspectiva."
  },
  {
    id: "con-002",
    sourceReferenceId: "ref-005",
    targetReferenceId: "ref-006",
    connectionType: "cultural",
    affinityScore: 88,
    sharedTags: ["internet"],
    sharedConcepts: ["sobrecarga informativa", "archivo disperso"],
    explanation: "El meme sobre inspiración fragmentada conecta con el ensayo sobre acumulación digital porque ambos expresan, desde tonos distintos, el mismo problema cultural: guardar demasiado sin poder recuperar significado."
  },
  {
    id: "con-003",
    sourceReferenceId: "ref-009",
    targetReferenceId: "ref-023",
    connectionType: "sonic",
    affinityScore: 84,
    sharedTags: [],
    sharedConcepts: ["espera", "melancolía urbana"],
    explanation: "La escena de pasillo silencioso conecta con el ambiente sonoro de estación lejana por su sensación de espera, tránsito y melancolía urbana. Juntas pueden definir el tono de una secuencia suspendida."
  },
  {
    id: "con-004",
    sourceReferenceId: "ref-003",
    targetReferenceId: "ref-016",
    connectionType: "formal",
    affinityScore: 90,
    sharedTags: ["editorial"],
    sharedConcepts: ["claridad", "espacio blanco"],
    explanation: "El sistema de retícula editorial conecta con la identidad quiet luxury archive por su uso de espacio blanco, sobriedad y orden visual. Ambas referencias pueden guiar una interfaz premium y cultural."
  },
  {
    id: "con-005",
    sourceReferenceId: "ref-007",
    targetReferenceId: "ref-024",
    connectionType: "conceptual",
    affinityScore: 86,
    sharedTags: ["moda", "campaña"],
    sharedConcepts: ["cuerpo y arquitectura", "cuerpo como archivo"],
    explanation: "La campaña de moda brutalista conecta con la nota 'body as archive' porque ambas exploran el cuerpo como superficie cultural, situado entre materialidad, gesto y contexto."
  },
  {
    id: "con-006",
    sourceReferenceId: "ref-008",
    targetReferenceId: "ref-011",
    connectionType: "symbolic",
    affinityScore: 76,
    sharedTags: [],
    sharedConcepts: ["vacío", "materialidad"],
    explanation: "La portada editorial conecta con la textura sonora granular por su forma de convertir el vacío y la materia en atmósfera. Una desde lo visual, otra desde lo sonoro."
  },
  {
    id: "con-007",
    sourceReferenceId: "ref-014",
    targetReferenceId: "ref-012",
    connectionType: "context",
    affinityScore: 91,
    sharedTags: ["archivo"],
    sharedConcepts: ["mesa de trabajo", "archivo vivo"],
    explanation: "La imagen de mesa de archivo conecta con la nota 'archive as studio' porque ambas entienden el archivo como un espacio activo de pensamiento, no como un simple almacén."
  },
  {
    id: "con-008",
    sourceReferenceId: "ref-019",
    targetReferenceId: "ref-015",
    connectionType: "emotional",
    affinityScore: 82,
    sharedTags: [],
    sharedConcepts: ["quietud", "contemplación", "silencio visual"],
    explanation: "La pintura de interior pálido conecta con el artículo sobre la estética de la lentitud por su defensa de la pausa, la atención y la emoción contenida."
  },
  {
    id: "con-009",
    sourceReferenceId: "ref-018",
    targetReferenceId: "ref-003",
    connectionType: "formal",
    affinityScore: 79,
    sharedTags: ["editorial", "sistema"],
    sharedConcepts: ["estructura", "orden visual"],
    explanation: "La muestra tipográfica conecta con el sistema de retícula porque ambas referencias construyen una identidad desde la precisión, la estructura y la jerarquía editorial."
  },
  {
    id: "con-010",
    sourceReferenceId: "ref-020",
    targetReferenceId: "ref-022",
    connectionType: "visual",
    affinityScore: 81,
    sharedTags: ["archivo", "referencias", "conexiones"],
    sharedConcepts: ["pensamiento asociativo", "mapa mental"],
    explanation: "El tablero de investigación conecta con la pared de ideas porque ambos convierten referencias dispersas en una estructura visual navegable y asociativa."
  }
];
```

---

# 20. Búsqueda y filtros

## Búsqueda funcional

El buscador debe consultar los siguientes campos:

- `title`
- `type`
- `description`
- `notes`
- `reasonSaved`
- `source`
- `tags`
- `concepts`
- `collection.name`

La búsqueda debe ser tolerante y actualizar resultados en tiempo real.

## Filtros obligatorios

- Tipo de referencia.
- Colección.
- Etiqueta.
- Fecha.
- Referencias conectadas.

## Ordenación opcional

- Más recientes.
- Más antiguas.
- Mayor número de conexiones.
- Afinidad, cuando se esté en vista de conexiones.

---

# 21. Requisitos de UI/UX

## Dirección visual obligatoria

La demo debe tener fondo blanco, blanco roto o marfil muy claro como base principal.

No usar interfaz oscura.

La estética debe sentirse:

- Limpia.
- Editorial.
- Contemporánea.
- Sofisticada.
- Visual.
- Clara.
- Premium.
- Con mucho espacio en blanco.
- Similar a un archivo cultural vivo.

## Sensación visual buscada

Debe sentirse como una mezcla entre:

- Archivo editorial.
- Biblioteca visual contemporánea.
- Mesa de trabajo creativa.
- Herramienta de investigación cultural.
- Plataforma de referencias premium.

## Inspiraciones permitidas

Puede inspirarse en la lógica o sensibilidad de:

- Are.na.
- Pinterest.
- Cosmos.
- Notion.
- Milanote.
- Readymag.
- Linear.
- Interfaces editoriales.
- Archivos digitales culturales.

No debe copiar ninguna.

## Colores

### Base

- Blanco.
- Blanco roto.
- Marfil claro.
- Gris muy claro.

### Texto

- Negro.
- Grafito.
- Gris muy oscuro.

### Cards

- Blanco.
- Gris muy claro.
- Tonos neutros.

### Bordes

- Gris claro.
- Líneas finas.
- Separadores sutiles.

### Sombras

- Muy suaves.
- Casi imperceptibles.

### Acentos

Acentos puntuales en colores sobrios o culturales:

- Verde oliva apagado.
- Azul grisáceo.
- Terracota muy suave.
- Arena.
- Gris cálido.
- Burdeos apagado.

Evitar colores demasiado saturados.

## Evitar

- Fondos negros.
- Gradientes oscuros.
- Estética cyber.
- Estética tech excesiva.
- SaaS corporativo genérico.
- Cards demasiado coloridas.
- Interfaces densas.
- Exceso de efectos.

---

# 22. Layout recomendado

## Desktop

- Sidebar izquierda fija con colecciones.
- Header superior con búsqueda y acciones.
- Área principal con grid.
- Panel lateral para detalle o conexiones.

## Mobile

- Sidebar colapsada en menú.
- Buscador prominente.
- Grid de una columna.
- Filtros en drawer o chips horizontales.
- Detalle en pantalla completa.
- Mapa de conexiones simplificado.

---

# 23. Microcopy recomendado

## Home

```text
Guarda referencias. Añade contexto. Descubre conexiones.
```

## CTA

```text
Entrar en la demo
```

## Botón añadir

```text
Añadir referencia
```

## Botón conexión

```text
Encontrar conexiones
```

## Estado vacío de búsqueda

```text
No encontramos referencias con esos criterios. Prueba con otra etiqueta, formato o concepto.
```

## Estado de carga IA simulada

```text
Buscando conexiones en tu archivo...
```

## Resultado de conexiones

```text
Encontramos conexiones útiles para esta referencia.
```

## Guardado correcto

```text
Referencia guardada en tu archivo.
```

## Eliminación

```text
Referencia eliminada.
```

---

# 24. Requisitos técnicos

## Estado global

Puede usarse:

- React state.
- Context API.
- Custom hooks.

No es necesario instalar una librería compleja de estado para la demo.

## Hooks sugeridos

- `useReferences`
- `useCollections`
- `useConnections`
- `useSearch`
- `useFilters`
- `useLocalStorage`
- `useDemoSeeder`

## Persistencia local

Al iniciar:

1. Revisar si existe data en `localStorage`.
2. Si no existe, cargar `demoReferences`, `demoCollections` y `demoConnections`.
3. Si existe, usar datos guardados.
4. Permitir resetear demo opcionalmente.

## Estructura sugerida

```text
src/
  components/
    layout/
      AppShell.tsx
      Sidebar.tsx
      Header.tsx
    references/
      ReferenceGrid.tsx
      ReferenceCard.tsx
      ReferenceDetailPanel.tsx
      AddReferenceModal.tsx
      EditReferenceModal.tsx
      ReferenceTypeBadge.tsx
    collections/
      CollectionList.tsx
      CollectionView.tsx
    connections/
      AIConnectionPanel.tsx
      ConnectionCard.tsx
      ConnectionMap.tsx
      AffinityScore.tsx
      ConnectionTypeBadge.tsx
    ui/
      Button.tsx
      Input.tsx
      Select.tsx
      TextArea.tsx
      Modal.tsx
      Drawer.tsx
      Toast.tsx
      EmptyState.tsx
  data/
    demoReferences.ts
    demoCollections.ts
    demoConnections.ts
  hooks/
    useReferences.ts
    useCollections.ts
    useConnections.ts
    useSearch.ts
    useFilters.ts
    useLocalStorage.ts
  utils/
    connectionEngine.ts
    searchReferences.ts
    formatDate.ts
    generateId.ts
  types/
    reference.ts
    collection.ts
    connection.ts
  App.tsx
  main.tsx
```

---

# 25. Reglas de conexión

El motor de conexiones debe tener estas reglas:

## Regla 1 — No conectar una referencia consigo misma

Excluir siempre la referencia seleccionada.

## Regla 2 — Priorizar formatos distintos

Una imagen debe tender a conectar con música, citas, textos, campañas, artículos, escenas o sonidos antes que con otra imagen.

## Regla 3 — Usar etiquetas compartidas

Más etiquetas compartidas aumentan la afinidad.

## Regla 4 — Usar conceptos semánticos compartidos

Más conceptos compartidos aumentan la afinidad.

## Regla 5 — Usar colección como señal secundaria

Misma colección puede sumar, pero no debe dominar.

## Regla 6 — Generar explicación humana

Cada conexión debe explicar el valor creativo de la relación.

## Regla 7 — Mostrar máximo 5 conexiones principales

Evitar saturar al usuario.

---

# 26. Criterios de aceptación

La demo se considerará correcta si cumple lo siguiente:

## Archivo

- El usuario puede entrar en la demo.
- El usuario puede ver un archivo de referencias.
- El archivo incluye referencias de varios formatos.
- Las referencias aparecen en cards visuales.
- Las cards muestran título, tipo, preview, etiquetas, colección y nota breve.

## Crear, editar y eliminar

- El usuario puede añadir una referencia nueva.
- La referencia añadida aparece en el archivo.
- La referencia se guarda en `localStorage`.
- El usuario puede editar una referencia.
- El usuario puede eliminar una referencia.

## Detalle

- El usuario puede abrir una referencia.
- El detalle muestra título, tipo, contenido, descripción, etiquetas, notas, fuente y colección.
- El detalle muestra conexiones relacionadas si existen.

## Búsqueda y filtros

- El usuario puede buscar referencias.
- La búsqueda funciona por título, etiquetas, tipo, proyecto, descripción, notas y conceptos.
- El usuario puede filtrar por tipo.
- El usuario puede filtrar por etiqueta.
- El usuario puede filtrar por colección.
- El usuario puede filtrar por fecha.
- El usuario puede ver referencias conectadas.

## Colecciones

- El usuario puede ver colecciones en la sidebar.
- El usuario puede abrir una colección.
- La colección muestra sus referencias asociadas.
- El usuario puede añadir una referencia a una colección.

## Conexiones

- El usuario puede seleccionar una referencia y pedir conexiones.
- El sistema muestra referencias conectadas.
- Las conexiones priorizan otros formatos.
- Cada conexión incluye explicación.
- Cada conexión incluye tipo de relación.
- Cada conexión incluye nivel de afinidad.
- Cada conexión incluye etiquetas o conceptos relacionados.
- Existe una vista visual o semi-visual de conexiones.

## UX/UI

- La interfaz es responsive.
- La estética es clara, editorial, contemporánea y sofisticada.
- El fondo principal es blanco, blanco roto o marfil claro.
- La demo no parece una landing page.
- La experiencia transmite que rfrnce permite guardar y conectar referencias.

---

# 27. Qué queda fuera del MVP

No incluir en esta primera versión:

- Landing promocional extensa.
- Lista de espera.
- Captación de emails.
- Pricing.
- Login real.
- Perfiles de usuario.
- Perfiles públicos.
- Pagos.
- Colaboración multiusuario.
- Subida avanzada de archivos.
- Procesamiento real de PDFs.
- Importaciones desde redes sociales.
- Extensión de navegador.
- App móvil nativa.
- Panel de administración.
- IA real obligatoria.
- Automatización avanzada.
- Roadmap visual.

---

# 28. Recomendaciones de implementación incremental

## Fase 1 — Base funcional

Construir:

- Home breve.
- AppShell.
- Sidebar.
- Header.
- Dataset inicial.
- Dashboard.
- ReferenceGrid.
- ReferenceCard.

Objetivo: que el usuario pueda entrar y ver el archivo.

---

## Fase 2 — Gestión de referencias

Construir:

- AddReferenceModal.
- EditReferenceModal.
- DeleteReference.
- Persistencia en `localStorage`.
- Toasts.
- DetailPanel.

Objetivo: que la demo se sienta realmente usable.

---

## Fase 3 — Búsqueda y filtros

Construir:

- SearchBar.
- FilterBar.
- Filtro por tipo.
- Filtro por colección.
- Filtro por etiqueta.
- Estado vacío.

Objetivo: demostrar recuperación de referencias.

---

## Fase 4 — Motor de conexiones simulado

Construir:

- `connectionEngine.ts`.
- Botón “Encontrar conexiones”.
- AIConnectionPanel.
- ConnectionCard.
- Explicaciones generadas por plantilla.
- Afinidad.
- Tipos de conexión.

Objetivo: demostrar el valor diferencial de rfrnce.

---

## Fase 5 — Vista visual de conexiones

Construir:

- ConnectionMap.
- Nodo central.
- Nodos relacionados.
- Líneas finas.
- Click en nodo para abrir detalle.

Objetivo: comunicar que rfrnce es un archivo vivo de relaciones.

---

## Fase 6 — Pulido visual

Aplicar:

- Fondo blanco roto.
- Cards limpias.
- Bordes sutiles.
- Tipografía editorial.
- Espaciado generoso.
- Microinteracciones discretas.
- Responsive mobile-first.

Objetivo: que la demo se sienta como una herramienta creativa premium.

---

# 29. Comportamiento esperado de Lovable antes de generar código

Antes de generar código, Lovable debe leer este PRD completo y confirmar en modo conversación que entiende:

1. Que rfrnce debe construirse como una demo funcional, no como una landing page.
2. Que la prioridad es guardar, organizar, buscar y conectar referencias.
3. Que la IA puede ser simulada en la primera versión mediante reglas y dataset demo.
4. Que la estética debe ser clara, editorial, sofisticada y con fondo blanco o blanco roto.
5. Que el MVP debe permitir usar el producto desde el primer momento.

---

# 30. Prompt final para Lovable

Construye una demo funcional de rfrnce siguiendo este PRD.

No hagas una landing page promocional. Crea una web app demo usable donde el usuario pueda entrar, ver un archivo de referencias, añadir nuevas referencias, organizarlas en colecciones, buscar, filtrar, abrir detalles y encontrar conexiones inteligentes entre referencias de distintos formatos.

Usa React, TypeScript, Vite y Tailwind CSS. Usa `localStorage` para persistencia inicial y un dataset demo precargado. Implementa una IA simulada mediante lógica de etiquetas, conceptos, tipos y conexiones predefinidas. La demo debe sentirse real, funcional y coherente.

La estética debe ser blanca o blanco roto, editorial, limpia, sofisticada y contemporánea. Evita interfaz oscura, estética cyber o SaaS corporativo genérico.

El objetivo es que el usuario entienda rfrnce porque lo usa: guarda referencias, añade contexto y descubre conexiones.
