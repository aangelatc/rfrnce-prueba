# PRD — Sitio Web para rfrnce

## 1. Rol del Asistente

Eres un diseñador/desarrollador experto en UI/UX, branding digital, diseño editorial, interfaces Mobile-First, React, Tailwind CSS y VITE dentro del entorno nativo de Lovable.

Tu objetivo es construir un sitio web visualmente atractivo, claro, contemporáneo y orientado a conversión para presentar **rfrnce**, una plataforma digital de referencias e inspiración creativa.

El sitio debe transmitir sensibilidad estética, orden, inteligencia, archivo, cultura visual, inspiración y confianza. La experiencia debe sentirse como una mezcla entre una plataforma tecnológica moderna, un archivo editorial creativo y una herramienta conceptual para profesionales de la cultura visual.

No generes todavía una aplicación funcional completa. El objetivo de este proyecto es construir una **web de presentación, validación y captación de interés** para el producto.

---

## 2. Descripción General y Visión

**rfrnce** es una plataforma digital de referencias e inspiración creativa pensada para ayudar a personas y equipos creativos a guardar, organizar, conectar y recuperar referencias de distinta naturaleza en un único espacio.

El proyecto nace de una necesidad común en los procesos creativos: las referencias suelen estar dispersas en Pinterest, Instagram, capturas de pantalla, notas, carpetas locales, enlaces guardados, playlists, libros, vídeos, memes, artículos o archivos personales. Esto provoca que muchas referencias se pierdan, queden descontextualizadas o sean difíciles de encontrar cuando realmente se necesitan.

rfrnce propone un sistema más amplio, flexible e inteligente que las plataformas tradicionales de inspiración visual. No se limita a imágenes, sino que permite trabajar con referencias heterogéneas: fotografías, vídeos, textos, música, libros, citas, enlaces, archivos, fragmentos culturales, ideas sueltas o cualquier elemento que pueda servir como punto de partida creativo.

La web debe presentar rfrnce como una plataforma situada en la intersección entre:

- archivo creativo;
- plataforma de inspiración;
- herramienta de organización;
- sistema inteligente de conexiones culturales;
- infraestructura creativa para personas y equipos.

El objetivo de la web es explicar el concepto del producto, mostrar su valor diferencial, transmitir una identidad de marca fuerte y captar usuarios interesados mediante una lista de espera o solicitud de acceso anticipado.

### Objetivo principal del sitio web

Crear una landing page / sitio web promocional que permita:

1. Entender rápidamente qué es rfrnce.
2. Explicar el problema que resuelve.
3. Mostrar cómo ayuda a creativos a guardar, organizar, conectar y recuperar referencias.
4. Comunicar una identidad visual sofisticada, editorial y contemporánea.
5. Generar interés y validación mediante un formulario de lista de espera o acceso anticipado.

### Objetivo de conversión

El objetivo principal de conversión es que el usuario se registre en una **lista de espera** o solicite **acceso anticipado al MVP**.

CTA principal recomendado:

> Join the waitlist

o en español:

> Únete a la lista de espera

El tono puede ser bilingüe o principalmente en inglés si se busca una marca más internacional, pero para esta versión se debe mantener el contenido en español salvo que se especifique lo contrario.

---

## 3. Stack y Restricciones Técnicas

### Frontend

Construir el sitio usando:

- React
- TypeScript
- VITE
- Tailwind CSS
- Componentes reutilizables
- Diseño Mobile-First
- Responsive design para móvil, tablet y desktop

### Backend

Backend opcional.

Para esta primera versión, solo se requiere backend si se implementa un formulario funcional de lista de espera.

Opciones aceptables:

- formulario visual sin conexión real;
- formulario conectado a Supabase;
- formulario conectado a una tabla de leads;
- integración futura con herramientas externas como Mailchimp, Beehiiv, Airtable, Notion, Make o n8n.

### Autenticación

No se requiere autenticación en esta versión del sitio web.

### Restricciones

- No construir todavía la plataforma completa tipo app.
- No implementar panel de usuario, dashboard real, login ni sistema de gestión de referencias.
- El sitio debe simular visualmente el producto mediante mockups, tarjetas, grids, interfaces ficticias o prototipos visuales.
- La prioridad es claridad, estética, narrativa y conversión.

---

## 4. Flujo de Usuario y Estructura de Navegación

El sitio debe funcionar como una experiencia de descubrimiento progresiva.

### Estructura general recomendada

#### Header

Debe incluir:

- logotipo / wordmark: `rfrnce`
- navegación simple
- CTA visible

Elementos del menú:

- Qué es
- Problema
- Cómo funciona
- Para quién
- Visión
- Acceso anticipado

CTA en header:

> Únete a la lista de espera

El header debe ser limpio, fijo o sticky, con estética minimalista y editorial.

---

## 5. Secciones del Sitio

### 5.1 Hero Section

La primera pantalla debe comunicar de forma inmediata la propuesta de valor.

#### Mensaje principal sugerido

> Todas tus referencias creativas, conectadas en un solo lugar.

#### Subtítulo sugerido

> rfrnce es una plataforma digital para guardar, organizar, conectar y recuperar inspiración visual, cultural y conceptual en un archivo creativo vivo.

#### CTA principal

> Únete a la lista de espera

#### CTA secundario

> Ver cómo funciona

#### Elementos visuales

Incluir una representación visual del producto mediante:

- grid de referencias;
- tarjetas con distintos formatos;
- interfaz ficticia de archivo creativo;
- etiquetas;
- conexiones visuales entre referencias;
- mini tablero tipo moodboard;
- búsqueda semántica simulada;
- colecciones o proyectos.

La hero debe sentirse elegante, aspiracional y clara, no excesivamente tecnológica ni genérica.

---

### 5.2 Sección Problema

Explicar de forma directa el problema que viven los creativos.

#### Título sugerido

> La inspiración está en todas partes. Encontrarla de nuevo es el problema.

#### Contenido

Los creativos guardan referencias constantemente, pero estas terminan dispersas en múltiples lugares:

- Pinterest;
- Instagram;
- capturas de pantalla;
- carpetas locales;
- notas;
- enlaces guardados;
- playlists;
- libros;
- vídeos;
- memes;
- artículos;
- archivos personales.

El problema no es solo guardar contenido, sino conservar su contexto, entender por qué fue importante y poder recuperarlo cuando un proyecto lo necesita.

#### Diseño recomendado

Usar una composición visual con múltiples “fuentes de referencia” dispersas que luego convergen hacia rfrnce.

Puede representarse como:

- tarjetas flotantes;
- una nube de formatos;
- columnas desordenadas que se reorganizan;
- contraste entre “dispersión” y “archivo conectado”.

---

### 5.3 Sección Propuesta de Valor

#### Título sugerido

> Un archivo creativo que entiende tus referencias.

#### Contenido

rfrnce permite centralizar referencias de cualquier formato y organizarlas de forma flexible en colecciones, proyectos y sistemas personales de archivo.

A diferencia de una carpeta de enlaces o un tablero visual, rfrnce trata cada referencia como material vivo: algo que puede tener contexto, etiquetas, notas, relaciones, origen, intención y conexión con otras ideas.

#### Puntos clave

Mostrar cuatro bloques principales:

1. **Guardar**  
   Guarda imágenes, vídeos, textos, enlaces, citas, música, libros, archivos, ideas o fragmentos culturales.

2. **Organizar**  
   Clasifica referencias por proyectos, colecciones, etiquetas, formatos, temas o estados del proceso creativo.

3. **Conectar**  
   Descubre relaciones entre estilos, conceptos, autores, épocas, medios, ideas y proyectos.

4. **Recuperar**  
   Encuentra referencias mediante búsqueda, contexto, etiquetas, notas o relaciones semánticas.

---

### 5.4 Sección “Cómo funciona”

Explicar el producto de manera simple, aunque todavía sea una plataforma en fase conceptual o MVP.

#### Título sugerido

> De referencia aislada a red de ideas.

#### Flujo sugerido

1. **Captura una referencia**  
   Añade una imagen, link, texto, vídeo, libro, canción, cita o archivo.

2. **Añade contexto**  
   Incluye notas, etiquetas, proyecto, formato, fuente o intención creativa.

3. **Organízala en tu archivo**  
   Agrúpala en colecciones, proyectos o tableros.

4. **Encuentra conexiones**  
   Visualiza relaciones entre referencias y descubre vínculos culturales, visuales o conceptuales.

5. **Recupérala cuando la necesites**  
   Usa búsqueda y filtros para volver a encontrar inspiración relevante.

#### Diseño recomendado

Usar una secuencia horizontal en desktop y vertical en mobile, con microinteracciones suaves.

---

### 5.5 Sección Mockup del Producto

Esta sección debe mostrar una simulación visual de la plataforma.

#### Título sugerido

> Diseñado para trabajar con referencias de verdad.

#### Mockup recomendado

Crear una interfaz ficticia con:

- sidebar de proyectos;
- barra de búsqueda;
- tablero de referencias;
- tarjetas de diferentes formatos;
- etiquetas;
- notas;
- filtros;
- vista de colección;
- vista de conexiones o mapa conceptual.

#### Ejemplos de tarjetas

- Imagen: “Brutalist poster archive”
- Vídeo: “Opening title sequence”
- Cita: “Form follows feeling”
- Libro: “Ways of Seeing”
- Música: “Ambient texture reference”
- Link: “Essay on visual culture”
- Meme: “Internet vernacular”
- Fotografía: “Urban night lighting”
- Archivo: “Campaign moodboard.pdf”

La interfaz no necesita ser funcional, pero debe parecer creíble, sofisticada y útil.

---

### 5.6 Sección IA

La IA debe presentarse como una capa de apoyo, no como el centro absoluto del producto.

#### Título sugerido

> IA para ampliar tu criterio, no para sustituirlo.

#### Contenido

La inteligencia artificial en rfrnce ayuda a ordenar, conectar y recuperar referencias. Puede sugerir etiquetas, detectar relaciones entre contenidos, facilitar búsquedas semánticas y proponer conexiones inesperadas entre ideas, estilos, épocas, autores o proyectos.

La IA no reemplaza el criterio creativo del usuario. Su función es ampliar la capacidad de encontrar patrones y relaciones dentro del archivo personal o colectivo.

#### Funciones de IA a mostrar

- etiquetado automático;
- búsqueda semántica;
- sugerencias de relaciones;
- agrupación por temas;
- recuperación contextual;
- conexiones inesperadas entre referencias.

---

### 5.7 Sección Comparativa / Diferenciación

#### Título sugerido

> Más que un tablero visual. Más que una carpeta de enlaces.

#### Contenido

rfrnce no busca ser únicamente una alternativa a Pinterest. Su propuesta es más amplia y conceptual: convertirse en el lugar donde las referencias se conservan, se entienden, se conectan y se transforman en nuevas ideas.

#### Comparativa conceptual

Mostrar una comparación visual sencilla:

| Herramienta | Lógica principal | Limitación |
|---|---|---|
| Pinterest | Inspiración visual | Centrado principalmente en imágenes |
| Are.na | Curaduría conceptual | Menos accesible para públicos amplios |
| Notion | Organización flexible | No diseñado específicamente para referencias creativas |
| Google Drive | Almacenamiento | Poco contexto y baja conexión conceptual |
| rfrnce | Archivo creativo conectado | Diseñado para inspiración, contexto y relaciones |

No presentar la comparación de forma agresiva. El tono debe ser elegante, estratégico y seguro.

---

### 5.8 Sección Público Objetivo

#### Título sugerido

> Para quienes piensan, crean y trabajan con referencias.

#### Usuarios iniciales

El sitio debe comunicar que rfrnce está pensado para:

- diseñadores gráficos;
- directores de arte;
- creativos digitales;
- estudiantes de diseño;
- artistas visuales;
- estudios boutique;
- creadores de contenido;
- fotógrafos;
- filmmakers;
- equipos creativos;
- profesionales vinculados a cultura visual, diseño, moda, arte, música, cine, comunicación o branding.

#### Enfoque

El foco inicial debe estar en usuarios creativos con alta sensibilidad estética, acostumbrados a recopilar referencias, pero frustrados por la dispersión de sus materiales y la falta de herramientas que conecten inspiración, archivo y proceso creativo.

---

### 5.9 Sección Visión de Producto

#### Título sugerido

> Una infraestructura creativa para la inspiración.

#### Contenido

La visión de rfrnce es convertirse en una infraestructura creativa para personas y equipos que trabajan con inspiración.

Un espacio donde cada referencia tenga contexto, donde los archivos personales no se pierdan y donde la tecnología ayude a revelar relaciones que alimenten el pensamiento creativo.

A largo plazo, rfrnce puede evolucionar hacia una plataforma colaborativa donde usuarios, estudios, escuelas, artistas y comunidades creativas construyan archivos compartidos, publiquen colecciones, descubran referentes y generen nuevas formas de investigación cultural y visual.

---

### 5.10 Sección Roadmap Conceptual

Incluir una sección que muestre la evolución del producto.

#### Título sugerido

> Empezamos por el archivo. Avanzamos hacia la red.

#### Fases

**Fase 1 — MVP**

- guardar referencias;
- clasificar por colecciones o proyectos;
- añadir etiquetas y notas;
- visualizar archivo personal;
- buscar referencias.

**Fase 2 — Inteligencia**

- etiquetado asistido por IA;
- búsqueda semántica;
- sugerencias de conexiones;
- agrupación automática;
- recuperación contextual.

**Fase 3 — Colaboración**

- espacios compartidos;
- colecciones públicas;
- perfiles creativos;
- colaboración por equipos;
- archivos comunitarios.

**Fase 4 — Cultura y descubrimiento**

- exploración de referentes;
- archivos curatoriales;
- recomendaciones culturales;
- mapas visuales y conceptuales;
- comunidades creativas.

---

### 5.11 Sección CTA Final

#### Título sugerido

> Construye un archivo creativo que puedas volver a usar.

#### Subtítulo sugerido

> rfrnce está en desarrollo. Únete a la lista de espera y sé de las primeras personas en probar una nueva forma de guardar, conectar y recuperar inspiración.

#### CTA principal

> Únete a la lista de espera

#### Formulario

Campos recomendados:

- nombre;
- email;
- perfil creativo;
- uso principal esperado;
- opción para dejar comentario breve.

Ejemplos de perfil creativo:

- diseñador/a;
- director/a de arte;
- estudiante;
- artista;
- filmmaker;
- fotógrafo/a;
- creador/a de contenido;
- estudio/equipo;
- otro.

---

### 5.12 Footer

El footer debe incluir:

- wordmark `rfrnce`;
- breve frase de marca;
- enlaces internos;
- email de contacto, si existe;
- redes sociales, si existen;
- aviso de producto en desarrollo.

Frase sugerida:

> rfrnce — an archive for creative references.

o

> rfrnce — un archivo vivo para la inspiración creativa.

---

## 6. Funcionalidades Clave

### Funcionalidades incluidas en la web

1. **Landing page responsive**  
   Sitio web adaptado a móvil, tablet y desktop.

2. **Header con navegación**  
   Navegación interna por secciones y CTA visible.

3. **Hero section con propuesta de valor**  
   Mensaje claro, visual atractivo y llamada a la acción.

4. **Explicación del problema**  
   Mostrar la dispersión de referencias y la necesidad de centralización.

5. **Propuesta de valor**  
   Explicar guardar, organizar, conectar y recuperar referencias.

6. **Mockup visual del producto**  
   Interfaz ficticia que ayude a entender cómo funcionaría rfrnce.

7. **Sección de IA**  
   Presentar la IA como capa de apoyo para etiquetado, conexiones y búsqueda.

8. **Comparativa conceptual**  
   Diferenciar rfrnce de Pinterest, Are.na, Notion y Google Drive.

9. **Público objetivo**  
   Mostrar claramente para quién está pensado.

10. **Roadmap conceptual**  
    Explicar hacia dónde puede evolucionar el producto.

11. **Formulario de lista de espera**  
    Captación de leads para validar interés.

12. **CTA final**  
    Reforzar conversión al final de la página.

---

## 7. Lineamientos de Diseño UI/UX

### Estilo visual

El diseño debe sentirse:

- editorial;
- contemporáneo;
- minimalista;
- sofisticado;
- cultural;
- ordenado;
- visualmente sensible;
- tecnológico sin parecer frío;
- creativo sin parecer caótico.

La dirección visual debe evitar una estética SaaS genérica. rfrnce debe sentirse como una marca con criterio cultural, cercana al diseño, el arte, la moda, la música, el cine, la fotografía y la investigación visual.

### Referencias estéticas conceptuales

El diseño puede inspirarse en:

- archivos editoriales;
- bibliotecas visuales;
- moodboards curatoriales;
- interfaces de herramientas creativas;
- sistemas de diseño minimalistas;
- publicaciones culturales contemporáneas;
- plataformas como Are.na, Cosmos, Readymag, Framer, Linear o Notion, pero sin copiarlas.

### Paleta de color recomendada

Usar una paleta sobria, con fuerte presencia de neutros.

Opciones sugeridas:

- fondo principal: blanco roto, marfil, gris muy claro o negro suave;
- texto principal: negro, grafito o gris profundo;
- acentos: azul eléctrico, verde ácido, naranja quemado, violeta o gris metálico;
- tarjetas: tonos neutros con bordes sutiles;
- estados hover: suaves, elegantes y precisos.

La paleta debe reforzar la idea de archivo, sistema y cultura visual.

### Tipografía

Usar tipografía limpia, moderna y editorial.

Recomendaciones:

- títulos grandes, con personalidad;
- cuerpo de texto muy legible;
- jerarquía clara;
- posible combinación de sans-serif moderna con detalles editoriales.

Evitar tipografías demasiado corporativas o infantiles.

### Layout

El sitio debe usar:

- grid editorial;
- mucho espacio en blanco;
- tarjetas modulares;
- bloques asimétricos controlados;
- mockups visuales;
- secciones respiradas;
- composición Mobile-First.

En desktop, se pueden usar layouts más experimentales pero siempre claros.

### Componentes UI

Crear componentes reutilizables:

- Header
- Hero
- CTA Button
- Section Heading
- Feature Card
- Reference Card
- Product Mockup
- Waitlist Form
- Comparison Table
- Roadmap Card
- Footer

### Microinteracciones

Incluir animaciones suaves y elegantes:

- hover en tarjetas;
- aparición progresiva de secciones;
- transiciones sutiles;
- desplazamiento suave hacia secciones;
- estados activos en botones;
- interacción visual en mockups.

No usar animaciones excesivas ni efectos llamativos que resten claridad.

---

## 8. Tono de Comunicación

La voz de marca debe ser clara, inteligente, editorial y sensible.

Debe evitar parecer demasiado técnica, demasiado corporativa o demasiado comercial.

### Rasgos de tono

- preciso;
- creativo;
- contemporáneo;
- cultural;
- estratégico;
- aspiracional;
- sobrio;
- confiable.

### Mensajes clave

Usar ideas como:

- “guardar referencias con contexto”;
- “conectar inspiración dispersa”;
- “un archivo creativo vivo”;
- “de referencias aisladas a redes de ideas”;
- “inspiración recuperable”;
- “una infraestructura para el pensamiento creativo”;
- “IA como apoyo al criterio creativo”.

---

## 9. Formulario de Lista de Espera

El formulario debe estar integrado en la landing y ser simple.

### Campos

- Nombre
- Email
- Perfil creativo
- ¿Para qué usarías rfrnce?
- Comentario opcional

### Validaciones

- El email debe ser obligatorio.
- El nombre puede ser obligatorio.
- El perfil creativo puede ser un selector.
- El comentario puede ser opcional.

### Mensaje de éxito

Después de enviar:

> Gracias por unirte. Te avisaremos cuando rfrnce abra el acceso anticipado.

### Mensaje de error

> No hemos podido registrar tu email. Inténtalo de nuevo.

### Datos esperados

Si se usa Supabase, crear una tabla llamada `waitlist`.

Campos sugeridos:

- `id`
- `name`
- `email`
- `creative_profile`
- `intended_use`
- `comment`
- `created_at`

---

## 10. Alcance del Proyecto

### Incluido

Esta primera versión debe incluir:

- sitio web responsive;
- landing page completa;
- narrativa clara de producto;
- diseño visual premium;
- mockups ficticios de la plataforma;
- explicación del problema;
- propuesta de valor;
- sección de IA;
- sección de público objetivo;
- roadmap conceptual;
- formulario de lista de espera;
- CTA principal y secundario;
- footer;
- estructura preparada para futuras iteraciones.

### Excluido

Esta versión no debe incluir:

- login;
- registro de usuarios completo;
- dashboard real;
- subida real de archivos;
- guardado real de referencias;
- buscador funcional del archivo;
- IA real;
- mapas de conexiones funcionales;
- colaboración entre usuarios;
- perfiles públicos;
- pagos;
- suscripciones;
- panel de administración;
- extensión de navegador;
- app móvil nativa.

---

## 11. Requisitos de Responsive Design

El sitio debe construirse Mobile-First.

### Mobile

- navegación simplificada;
- CTA visible;
- secciones en una columna;
- tarjetas apiladas;
- mockups adaptados;
- textos claros y no excesivamente largos.

### Tablet

- grids de dos columnas;
- mayor protagonismo visual de mockups;
- cards más amplias.

### Desktop

- layout editorial;
- hero de alto impacto;
- grids amplios;
- mockup de producto destacado;
- composición más sofisticada;
- navegación completa visible.

---

## 12. Recomendaciones de Copy Principal

### Hero

**Título:**

> Todas tus referencias creativas, conectadas en un solo lugar.

**Subtítulo:**

> rfrnce es un archivo creativo vivo para guardar, organizar, conectar y recuperar inspiración visual, cultural y conceptual.

**CTA:**

> Únete a la lista de espera

---

### Problema

**Título:**

> Tus referencias no deberían perderse entre capturas, carpetas y pestañas abiertas.

**Texto:**

> La inspiración aparece en todas partes, pero rara vez vive en un sistema pensado para volver a encontrarla, entenderla y usarla cuando un proyecto la necesita.

---

### Propuesta de valor

**Título:**

> Guarda menos caos. Recupera más contexto.

**Texto:**

> rfrnce convierte referencias dispersas en un archivo organizado, flexible y conectado.

---

### IA

**Título:**

> Inteligencia para conectar ideas, no para reemplazarlas.

**Texto:**

> La IA ayuda a etiquetar, relacionar y recuperar referencias, manteniendo siempre el criterio creativo en el centro.

---

### CTA final

**Título:**

> Empieza a construir un archivo creativo que puedas volver a usar.

**Texto:**

> Únete a la lista de espera y sé de las primeras personas en probar rfrnce.

---

## 13. Criterios de Aceptación

El sitio se considerará correcto si cumple con lo siguiente:

1. Explica claramente qué es rfrnce en la primera pantalla.
2. Comunica el problema de dispersión de referencias.
3. Presenta la propuesta de valor de forma clara.
4. Diferencia rfrnce de herramientas como Pinterest, Are.na, Notion y Google Drive.
5. Tiene una identidad visual cuidada, editorial y contemporánea.
6. Incluye mockups visuales de la plataforma.
7. Muestra el papel de la IA como capa de apoyo.
8. Incluye una llamada a la acción clara.
9. Permite captar interés mediante formulario de lista de espera.
10. Funciona correctamente en móvil, tablet y desktop.
11. No intenta construir todavía la app completa.
12. El código debe estar organizado en componentes reutilizables.

---

## 14. Nota Final para Lovable

Antes de generar código, lee este documento completo y confirma en modo conversación que has entendido:

- que se trata de un **sitio web de presentación**, no de la aplicación completa;
- que el objetivo principal es explicar el proyecto y captar usuarios interesados;
- que la estética debe ser editorial, sofisticada y contemporánea;
- que el producto debe presentarse como un archivo creativo vivo e inteligente;
- que la IA debe aparecer como apoyo al criterio creativo, no como sustituto;
- que el formulario de lista de espera es la funcionalidad principal de conversión.

Una vez confirmado, procede a construir el sitio web en React, TypeScript, VITE y Tailwind CSS siguiendo una estrategia Mobile-First.
