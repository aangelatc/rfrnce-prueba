export type ImageRef = {
  kind: "image";
  type: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  collection: string;
  connections: number;
  date: string;
};

export type TextRef = {
  kind: "text";
  type: string;
  title: string;
  quote: string;
  source: string;
  tags: string[];
  collection: string;
  connections: number;
  date: string;
};

export type ReferenceCard = ImageRef | TextRef;

export const archiveRefs: ReferenceCard[] = [
  {
    kind: "image",
    type: "Imagen",
    title: "Atardecer mediterráneo",
    description:
      "Luz cálida sobre las rocas al final del día. Paleta para proyectos con carácter contemplativo.",
    image: "/references/IMG-2327%20(2).jpg",
    tags: ["luz", "mar", "calma"],
    collection: "Paisaje y atmósfera",
    connections: 6,
    date: "12 mar 2026",
  },
  {
    kind: "text",
    type: "Cita",
    title: "Sobre coleccionar",
    quote:
      "Coleccionar es establecer relaciones entre objetos que, de otro modo, permanecerían mudos.",
    source: "— Walter Benjamin, Libro de los Pasajes",
    tags: ["archivo", "cultura", "memoria"],
    collection: "Teoría del archivo",
    connections: 14,
    date: "8 feb 2026",
  },
  {
    kind: "image",
    type: "Imagen",
    title: "Siluetas en La Mancha",
    description:
      "Molino al atardecer con siluetas de mujeres sobre la pared blanca. Iconografía visual para narración.",
    image: "/references/IMG_7870.jpg",
    tags: ["silueta", "folklore", "paisaje"],
    collection: "Cultura española",
    connections: 8,
    date: "3 ene 2026",
  },
  {
    kind: "image",
    type: "Imagen",
    title: "Pared de stickers — Madrid",
    description:
      "Superposición de pegatinas como archivo urbano. Cultura visual acumulada en capas.",
    image: "/references/IMG_4291.jpg",
    tags: ["street art", "collage", "urbano"],
    collection: "Cultura de la calle",
    connections: 11,
    date: "19 ene 2026",
  },
  {
    kind: "image",
    type: "Imagen",
    title: "Tíber al amanecer, Roma",
    description: "Escala monumental, silencio. La ciudad antes de que empiece el ruido.",
    image: "/references/IMG_9554.jpg",
    tags: ["Roma", "ciudad", "luz dorada"],
    collection: "Ciudades europeas",
    connections: 5,
    date: "27 oct 2025",
  },
  {
    kind: "text",
    type: "Cita",
    title: "La inspiración y el trabajo",
    quote: "La inspiración existe, pero te tiene que encontrar trabajando.",
    source: "— Pablo Picasso",
    tags: ["proceso creativo", "trabajo", "inspiración"],
    collection: "Teoría del archivo",
    connections: 22,
    date: "15 nov 2025",
  },
  {
    kind: "image",
    type: "Imagen",
    title: "Fachada amarilla, Malasaña",
    description:
      "Arquitectura de Madrid en un día nublado. Contraste de color cálido con cielo frío.",
    image: "/references/IMG_4303.jpg",
    tags: ["arquitectura", "Madrid", "color"],
    collection: "Ciudades europeas",
    connections: 4,
    date: "11 abr 2026",
  },
  {
    kind: "image",
    type: "Imagen",
    title: "Steinburg — identidad gráfica",
    description:
      "Packaging de cerveza artesana. Tipografía editorial aplicada a producto. Referencia para branding austero.",
    image: "/references/IMG_0360.JPG",
    tags: ["packaging", "tipografía", "branding"],
    collection: "Diseño gráfico",
    connections: 9,
    date: "22 feb 2026",
  },
  {
    kind: "image",
    type: "Imagen",
    title: "Costa mediterránea — acantilado",
    description:
      "Luz cenital sobre el Mediterráneo. Vegetación de garriga y reflejo del sol en el agua.",
    image: "/references/IMG-2351.jpg",
    tags: ["paisaje", "mediterráneo", "naturaleza"],
    collection: "Paisaje y atmósfera",
    connections: 7,
    date: "5 mar 2026",
  },
  {
    kind: "image",
    type: "Imagen",
    title: "Playa al crepúsculo",
    description:
      "Arena, horizonte y agua en tonos azules. Composición mínima de tres bandas horizontales.",
    image: "/references/DSCF1087.JPG",
    tags: ["playa", "minimalismo", "horizonte"],
    collection: "Paisaje y atmósfera",
    connections: 3,
    date: "20 sep 2025",
  },
];
