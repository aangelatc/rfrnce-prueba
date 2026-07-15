import type { ReferenceConnection } from "../types/supabaseReferences";

export type CuratedConnection = ReferenceConnection & {
  sourceReferenceId: string;
  targetReferenceId: string;
};

export const curatedConnections: CuratedConnection[] = [
  {
    sourceReferenceId: "demo-case-a-bigger-splash",
    targetReferenceId: "demo-case-jacquemus-le-splash",
    title: "Campaña Jacquemus Le Splash",
    connectionType: ["visual", "conceptual"],
    explanation:
      "Ambas referencias construyen un imaginario de verano aspiracional mediante el agua, el color saturado y una composición geométrica y controlada.",
    creativeApplication:
      "Desarrollar una dirección de arte basada en el concepto de verano escenificado, combinando espacios geométricos, agua, quietud y movimiento.",
    confidence: 4,
    matchedCriteria: ["agua", "color saturado", "geometría", "verano", "ocio escenificado"],
  },
];
