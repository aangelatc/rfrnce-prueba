import { defaultReferenceCards } from "./defaultReferences";
import type { DefaultReferenceCard } from "./defaultReferences";

export type ImageRef = DefaultReferenceCard;

export type TextRef = {
  id: string;
  source: "demo";
  kind: "text";
  type: string;
  title: string;
  quote: string;
  sourceLabel: string;
  tags: string[];
  collection: string;
  connections: number;
  date: string;
};

export type ReferenceCard = ImageRef | TextRef;

export const archiveRefs: ReferenceCard[] = [
  defaultReferenceCards[0],
  {
    id: "demo-text-collecting-001",
    source: "demo",
    kind: "text",
    type: "Cita",
    title: "Sobre coleccionar",
    quote:
      "Coleccionar es establecer relaciones entre objetos que, de otro modo, permanecerían mudos.",
    sourceLabel: "- Walter Benjamin, Libro de los Pasajes",
    tags: ["archivo", "cultura", "memoria"],
    collection: "Teoría del archivo",
    connections: 14,
    date: "8 feb 2026",
  },
  defaultReferenceCards[1],
  defaultReferenceCards[2],
  defaultReferenceCards[3],
  {
    id: "demo-text-inspiration-work-002",
    source: "demo",
    kind: "text",
    type: "Cita",
    title: "La inspiración y el trabajo",
    quote: "La inspiración existe, pero te tiene que encontrar trabajando.",
    sourceLabel: "- Pablo Picasso",
    tags: ["proceso creativo", "trabajo", "inspiración"],
    collection: "Teoría del archivo",
    connections: 22,
    date: "15 nov 2025",
  },
  defaultReferenceCards[4],
  defaultReferenceCards[5],
  defaultReferenceCards[6],
  defaultReferenceCards[7],
];

export function getReferenceKey(reference: ReferenceCard) {
  return reference.id;
}

export const legacyReferenceKeyMap = new Map(
  archiveRefs.map((reference) => [reference.title, getReferenceKey(reference)])
);
