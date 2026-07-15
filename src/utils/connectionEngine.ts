import { curatedConnections } from "../data/demoConnections";
import type { ReferenceCard } from "../data/references";
import type {
  ConfidenceLevel,
  ConnectionType,
  ReferenceConnection,
  SupabaseReference,
} from "../types/supabaseReferences";

export type ConnectionReference = {
  id: string;
  source: "uploaded" | "default" | "demo";
  title: string;
  type: string;
  url?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  ai_summary?: string | null;
  mood?: string | null;
  style?: string | null;
  tags?: string[] | null;
  collection?: string | null;
  date?: string | null;
};

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
  {
    label: "cultura visual",
    criteria: "mirada visual",
    type: "visual" as const,
    words: ["mirada", "ver", "visual", "imagen", "percepción", "representación", "medio", "medios"],
  },
  {
    label: "deseo y melancolía",
    criteria: "emoción",
    type: "conceptual" as const,
    words: ["amor", "deseo", "romance", "intimidad", "melancolía"],
  },
  {
    label: "ciudad y espacio",
    criteria: "espacio",
    type: "cultural" as const,
    words: ["ciudad", "urbano", "calle", "arquitectura", "espacio"],
  },
  {
    label: "memoria",
    criteria: "memoria",
    type: "conceptual" as const,
    words: ["memoria", "recuerdo", "archivo", "nostalgia", "pasado"],
  },
  {
    label: "contexto cultural",
    criteria: "contexto cultural",
    type: "cultural" as const,
    words: ["crítica", "sociedad", "cultura", "publicidad", "consumo", "espectáculo"],
  },
  {
    label: "identidad y cuerpo",
    criteria: "presencia",
    type: "narrativa" as const,
    words: ["cuerpo", "identidad", "género", "presencia", "retrato"],
  },
  {
    label: "sonido y atmósfera",
    criteria: "atmósfera",
    type: "visual" as const,
    words: ["sonido", "música", "canción", "ritmo", "atmósfera", "cinematográfico"],
  },
  {
    label: "diseño editorial",
    criteria: "composición",
    type: "visual" as const,
    words: ["editorial", "diseño", "tipografía", "composición", "layout"],
  },
  {
    label: "color y materialidad",
    criteria: "materialidad",
    type: "visual" as const,
    words: ["color", "textura", "forma", "material", "superficie"],
  },
  {
    label: "verano escenificado",
    criteria: "ocio escenificado",
    type: "conceptual" as const,
    words: ["verano", "agua", "piscina", "mar", "playa", "ocio", "escenificado"],
  },
];

const visualCriteriaWords = new Set([
  "agua",
  "arquitectura",
  "color",
  "color saturado",
  "composición",
  "geometría",
  "horizonte",
  "luz",
  "luz dorada",
  "mar",
  "minimalismo",
  "paisaje",
  "playa",
  "silueta",
  "textura",
]);

const culturalCriteriaWords = new Set([
  "archivo",
  "calle",
  "cultura",
  "folklore",
  "madrid",
  "memoria",
  "roma",
  "street art",
  "urbano",
]);

const narrativeCriteriaWords = new Set([
  "branding",
  "contemplativo",
  "moda",
  "narración",
  "ocio escenificado",
  "proceso creativo",
  "verano",
]);

const atmosphereCriteriaWords = new Set([
  "calma",
  "melancolía",
  "naturaleza",
  "silencio",
  "atmósfera",
]);

const meaningfulKeywordCriteria = new Set([
  ...visualCriteriaWords,
  ...culturalCriteriaWords,
  ...narrativeCriteriaWords,
  ...atmosphereCriteriaWords,
  "agua",
  "composicion",
  "color",
  "geometria",
  "materialidad",
  "verano",
]);

export function normalizeKeyword(keyword: string) {
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
    reference.collection,
    includeTags ? reference.tags?.join(" ") : null,
  ]
    .filter(Boolean)
    .join(" ");
}

export function normalizeGenericReference(reference: ReferenceCard): ConnectionReference {
  const description =
    reference.kind === "text"
      ? `${reference.quote} ${reference.sourceLabel}`
      : reference.description;

  return {
    id: reference.id,
    source: reference.source,
    title: reference.title,
    type: reference.type,
    url: reference.kind === "image" ? reference.image : null,
    imageUrl: reference.kind === "image" ? reference.image : null,
    description,
    ai_summary: description,
    mood: null,
    style: reference.collection,
    tags: reference.tags,
    collection: reference.collection,
    date: reference.date,
  };
}

export function normalizeUploadedReference(reference: SupabaseReference): ConnectionReference {
  return {
    ...reference,
    source: "uploaded",
    imageUrl: reference.type.toLowerCase() === "imagen" ? reference.url : null,
    collection: null,
    date: reference.created_at,
  };
}

export function dedupeConnectionReferences(connectionReferences: ConnectionReference[]) {
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

function uniqueItems(items: string[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const normalized = normalizeKeyword(item);
    if (!normalized || seen.has(normalized)) return false;

    seen.add(normalized);
    return true;
  });
}

function getSharedConcepts(currentKeywords: string[], referenceKeywords: string[]) {
  return conceptGroups
    .map((group) => {
      const normalizedGroup = group.words.map(normalizeKeyword);
      const currentMatches = currentKeywords.filter((keyword) => normalizedGroup.includes(keyword));
      const referenceMatches = referenceKeywords.filter((keyword) =>
        normalizedGroup.includes(keyword)
      );

      if (currentMatches.length === 0 || referenceMatches.length === 0) return null;

      return group;
    })
    .filter((concept): concept is (typeof conceptGroups)[number] => Boolean(concept));
}

function getSharedTags(currentReference: ConnectionReference, reference: ConnectionReference) {
  const currentTags = currentReference.tags ?? [];
  const referenceTags = reference.tags ?? [];
  const normalizedCurrentTags = new Set(currentTags.map(normalizeKeyword));

  return referenceTags.filter((tag) => normalizedCurrentTags.has(normalizeKeyword(tag)));
}

function getSharedKeywords(currentReference: ConnectionReference, reference: ConnectionReference) {
  const currentExactKeywords = getKeywords(getReferenceKeywordText(currentReference, false));
  const referenceExactKeywords = getKeywords(getReferenceKeywordText(reference, false));

  return currentExactKeywords.filter((keyword) => referenceExactKeywords.includes(keyword));
}

function normalizeTitle(title: string) {
  return normalizeKeyword(title)
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function areNearDuplicateTitles(currentTitle: string, referenceTitle: string) {
  const current = normalizeTitle(currentTitle);
  const reference = normalizeTitle(referenceTitle);

  return (
    current.length > 8 &&
    reference.length > 8 &&
    (current.includes(reference) || reference.includes(current))
  );
}

function getMeaningfulSharedKeywords(sharedKeywords: string[]) {
  return sharedKeywords.filter((keyword) => meaningfulKeywordCriteria.has(normalizeKeyword(keyword)));
}

function getMatchedCriteria({
  sharedTags,
  sharedConcepts,
  sharedKeywords,
  sameStyle,
}: {
  sharedTags: string[];
  sharedConcepts: ReturnType<typeof getSharedConcepts>;
  sharedKeywords: string[];
  sameStyle: boolean;
}) {
  const criteria = [
    ...sharedTags,
    ...sharedConcepts.map((concept) => concept.criteria),
    sameStyle ? "territorio creativo compartido" : "",
    ...getMeaningfulSharedKeywords(sharedKeywords).slice(0, 3),
  ].filter(Boolean);

  return uniqueItems(criteria).slice(0, 7);
}

function getConnectionTypes({
  criteria,
  sharedConcepts,
  isContrast,
}: {
  criteria: string[];
  sharedConcepts: ReturnType<typeof getSharedConcepts>;
  isContrast: boolean;
}) {
  const types = new Set<ConnectionType>();

  sharedConcepts.forEach((concept) => types.add(concept.type));

  criteria.forEach((criterion) => {
    const normalized = normalizeKeyword(criterion);
    if (visualCriteriaWords.has(normalized)) types.add("visual");
    if (culturalCriteriaWords.has(normalized)) types.add("cultural");
    if (narrativeCriteriaWords.has(normalized)) types.add("narrativa");
    if (atmosphereCriteriaWords.has(normalized)) types.add("conceptual");
  });

  if (isContrast) types.add("contraste");
  if (types.size === 0) types.add("conceptual");

  return Array.from(types).slice(0, 3);
}

function getConfidence(score: number): ConfidenceLevel {
  if (score >= 14) return 5;
  if (score >= 10) return 4;
  if (score >= 7) return 3;
  if (score >= 4) return 2;
  return 1;
}

function formatList(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} y ${items[1]}`;

  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

function buildExplanation({
  currentReference,
  reference,
  criteria,
  confidence,
  isCrossDiscipline,
  isContrast,
}: {
  currentReference: ConnectionReference;
  reference: ConnectionReference;
  criteria: string[];
  confidence: ConfidenceLevel;
  isCrossDiscipline: boolean;
  isContrast: boolean;
}) {
  const criteriaText = formatList(criteria.slice(0, 4));

  if (confidence <= 2) {
    return criteriaText
      ? `La relación entre ambas referencias es exploratoria: comparten señales de ${criteriaText}, pero los datos disponibles todavía son limitados.`
      : "La relación es débil y debe leerse como una asociación abierta: faltan metadatos suficientes para justificar una conexión fuerte.";
  }

  const disciplineText = isCrossDiscipline
    ? ` La conexión gana interés porque traduce esas señales entre ${currentReference.type.toLowerCase()} y ${reference.type.toLowerCase()}.`
    : "";
  const contrastText = isContrast
    ? " También puede funcionar por contraste, al poner en tensión contextos visuales diferentes."
    : "";

  return `Ambas referencias se relacionan por ${criteriaText}, construyendo un territorio visual y conceptual compatible.${disciplineText}${contrastText}`;
}

function buildCreativeApplication({
  criteria,
  connectionTypes,
  confidence,
}: {
  criteria: string[];
  connectionTypes: ConnectionType[];
  confidence: ConfidenceLevel;
}) {
  const criteriaText = formatList(criteria.slice(0, 4));

  if (confidence <= 2) {
    return "Usarla como punto de partida para una exploración inicial: contrastar moodboards, ajustar etiquetas y validar si la relación sostiene una dirección visual.";
  }

  if (connectionTypes.includes("contraste")) {
    return `Explorar una dirección de arte basada en contraste, usando ${criteriaText} para tensionar tono, encuadre y materialidad sin perder coherencia conceptual.`;
  }

  if (connectionTypes.includes("visual")) {
    return `Traducir ${criteriaText} en decisiones de paleta, encuadre, ritmo compositivo y tratamiento de imagen para una campaña o sistema visual.`;
  }

  if (connectionTypes.includes("cultural")) {
    return `Usar ${criteriaText} como eje de investigación cultural para definir tono, referencias secundarias y narrativa de marca.`;
  }

  return `Convertir ${criteriaText} en un concepto rector para ordenar moodboard, mensajes, materiales y posibles rutas de diseño.`;
}

function getCuratedConnection(
  currentReference: ConnectionReference,
  reference: ConnectionReference
): ReferenceConnection | null {
  const direct = curatedConnections.find(
    (connection) =>
      connection.sourceReferenceId === currentReference.id &&
      connection.targetReferenceId === reference.id
  );

  if (direct) {
    return {
      title: direct.title,
      connectionType: direct.connectionType,
      explanation: direct.explanation,
      creativeApplication: direct.creativeApplication,
      confidence: direct.confidence,
      matchedCriteria: direct.matchedCriteria,
    };
  }

  const reverse = curatedConnections.find(
    (connection) =>
      connection.sourceReferenceId === reference.id &&
      connection.targetReferenceId === currentReference.id
  );

  if (!reverse) return null;

  return {
    title: reference.title,
    connectionType: reverse.connectionType,
    explanation: reverse.explanation,
    creativeApplication: reverse.creativeApplication,
    confidence: reverse.confidence,
    matchedCriteria: reverse.matchedCriteria,
  };
}

function getCuratedConnectionByKnownTitle(
  currentReference: ConnectionReference,
  reference: ConnectionReference
) {
  const currentTitle = normalizeTitle(currentReference.title);
  const referenceTitle = normalizeTitle(reference.title);
  const isABiggerSplashToJacquemus =
    currentTitle.includes("a bigger splash") &&
    referenceTitle.includes("campana jacquemus le splash");
  const isJacquemusToABiggerSplash =
    currentTitle.includes("campana jacquemus le splash") &&
    referenceTitle.includes("a bigger splash");

  if (!isABiggerSplashToJacquemus && !isJacquemusToABiggerSplash) return null;

  const curatedConnection = curatedConnections.find(
    (connection) =>
      connection.sourceReferenceId === "demo-case-a-bigger-splash" &&
      connection.targetReferenceId === "demo-case-jacquemus-le-splash"
  );

  if (!curatedConnection) return null;

  return {
    title: reference.title,
    connectionType: curatedConnection.connectionType,
    explanation: curatedConnection.explanation,
    creativeApplication: curatedConnection.creativeApplication,
    confidence: curatedConnection.confidence,
    matchedCriteria: curatedConnection.matchedCriteria,
  } satisfies ReferenceConnection;
}

function scoreConnection(currentReference: ConnectionReference, reference: ConnectionReference) {
  const isCrossDiscipline = currentReference.type !== reference.type;
  const sameStyle = Boolean(
    currentReference.style &&
      reference.style &&
      normalizeKeyword(currentReference.style) === normalizeKeyword(reference.style)
  );
  const sharedTags = getSharedTags(currentReference, reference);
  const sharedKeywords = getSharedKeywords(currentReference, reference);
  const meaningfulSharedKeywords = getMeaningfulSharedKeywords(sharedKeywords);
  const currentConceptKeywords = getKeywords(getReferenceKeywordText(currentReference));
  const referenceConceptKeywords = getKeywords(getReferenceKeywordText(reference));
  const sharedConcepts = getSharedConcepts(currentConceptKeywords, referenceConceptKeywords);
  const matchedCriteria = getMatchedCriteria({
    sharedTags,
    sharedConcepts,
    sharedKeywords,
    sameStyle,
  });
  const hasSubstantiveSignal =
    sharedTags.length > 0 ||
    sharedConcepts.length > 0 ||
    sameStyle ||
    (meaningfulSharedKeywords.length >= 2 && isCrossDiscipline);
  const isContrast =
    isCrossDiscipline &&
    matchedCriteria.length >= 2 &&
    !sameStyle &&
    sharedTags.length === 0 &&
    sharedConcepts.length > 0;

  const score =
    (isCrossDiscipline ? 2 : -1) +
    (sameStyle ? 2 : 0) +
    sharedTags.length * 3 +
    sharedConcepts.length * 3 +
    Math.min(meaningfulSharedKeywords.length, 3) +
    (isContrast ? 1 : 0);

  return {
    isCrossDiscipline,
    isContrast,
    matchedCriteria,
    score,
    hasSubstantiveSignal,
    sharedConcepts,
  };
}

export function generateLocalConnections(
  referenceId: string,
  connectionReferences: ConnectionReference[]
) {
  const currentReference = connectionReferences.find((reference) => reference.id === referenceId);
  if (!currentReference) return [];

  return connectionReferences
    .filter(
      (reference) =>
        reference.id !== referenceId &&
        !areNearDuplicateTitles(currentReference.title, reference.title)
    )
    .map((reference) => {
      const curatedConnection =
        getCuratedConnection(currentReference, reference) ??
        getCuratedConnectionByKnownTitle(currentReference, reference);
      if (curatedConnection) {
        return {
          connection: curatedConnection,
          score: 100,
        };
      }

      const scoredConnection = scoreConnection(currentReference, reference);
      const confidence = getConfidence(scoredConnection.score);

      if (!scoredConnection.hasSubstantiveSignal) return null;

      const connectionTypes = getConnectionTypes({
        criteria: scoredConnection.matchedCriteria,
        sharedConcepts: scoredConnection.sharedConcepts,
        isContrast: scoredConnection.isContrast,
      });

      return {
        connection: {
          title: reference.title,
          connectionType: connectionTypes,
          explanation: buildExplanation({
            currentReference,
            reference,
            criteria: scoredConnection.matchedCriteria,
            confidence,
            isCrossDiscipline: scoredConnection.isCrossDiscipline,
            isContrast: scoredConnection.isContrast,
          }),
          creativeApplication: buildCreativeApplication({
            criteria: scoredConnection.matchedCriteria,
            connectionTypes,
            confidence,
          }),
          confidence,
          matchedCriteria:
            scoredConnection.matchedCriteria.length > 0
              ? scoredConnection.matchedCriteria
              : ["asociación exploratoria"],
        } satisfies ReferenceConnection,
        score: scoredConnection.score,
      };
    })
    .filter(
      (result): result is { connection: ReferenceConnection; score: number } => result !== null
    )
    .sort((a, b) => {
      if (b.connection.confidence !== a.connection.confidence) {
        return b.connection.confidence - a.connection.confidence;
      }

      return b.score - a.score;
    })
    .slice(0, 5)
    .map((result) => result.connection);
}
