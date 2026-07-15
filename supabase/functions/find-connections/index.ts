import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type ConnectionType = "visual" | "conceptual" | "narrativa" | "cultural" | "contraste";

type ReferenceInput = {
  id?: unknown;
  title?: unknown;
  description?: unknown;
  category?: unknown;
  tags?: unknown;
  imageUrl?: unknown;
};

type FindConnectionsPayload = {
  sourceReference?: ReferenceInput;
  candidateReferences?: ReferenceInput[];
};

type CleanReference = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
};

type FindConnectionsResponse = {
  connection: {
    referenceId: string;
    referenceTitle: string;
    connectionType: ConnectionType;
    explanation: string;
    creativeApplication: string;
    confidence: 1 | 2 | 3 | 4 | 5;
  };
};

const allowedOrigins = new Set(["https://angelatorrijos.com", "http://localhost:5173"]);

// Change this default if your OpenAI project does not have access to the selected model.
const defaultModel = Deno.env.get("OPENAI_FIND_CONNECTIONS_MODEL") ?? "gpt-5.6-luna";

const responseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    connection: {
      type: "object",
      additionalProperties: false,
      properties: {
        referenceId: { type: "string" },
        referenceTitle: { type: "string" },
        connectionType: {
          type: "string",
          enum: ["visual", "conceptual", "narrativa", "cultural", "contraste"],
        },
        explanation: { type: "string" },
        creativeApplication: { type: "string" },
        confidence: { type: "integer", minimum: 1, maximum: 5 },
      },
      required: [
        "referenceId",
        "referenceTitle",
        "connectionType",
        "explanation",
        "creativeApplication",
        "confidence",
      ],
    },
  },
  required: ["connection"],
};

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") ?? "";
  const allowOrigin = allowedOrigins.has(origin) ? origin : "";

  return {
    ...(allowOrigin ? { "Access-Control-Allow-Origin": allowOrigin } : {}),
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(req: Request, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
  });
}

function isOriginAllowed(req: Request) {
  const origin = req.headers.get("Origin");
  return !origin || allowedOrigins.has(origin);
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanTags(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function cleanReference(reference: ReferenceInput, fieldName: string): CleanReference {
  const id = cleanString(reference.id);
  const title = cleanString(reference.title);

  if (!id || !title) {
    throw new Error(`${fieldName} must include a valid id and title.`);
  }

  return {
    id,
    title,
    description: cleanString(reference.description),
    category: cleanString(reference.category),
    tags: cleanTags(reference.tags),
    imageUrl: cleanString(reference.imageUrl),
  };
}

function validatePayload(payload: FindConnectionsPayload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Request body must be a JSON object.");
  }

  if (!payload.sourceReference || typeof payload.sourceReference !== "object") {
    throw new Error("sourceReference is required.");
  }

  if (!Array.isArray(payload.candidateReferences)) {
    throw new Error("candidateReferences must be an array.");
  }

  const sourceReference = cleanReference(payload.sourceReference, "sourceReference");
  const candidateReferences = payload.candidateReferences
    .map((reference, index) => cleanReference(reference, `candidateReferences[${index}]`))
    .filter((reference) => reference.id !== sourceReference.id);

  const uniqueCandidates = Array.from(
    new Map(candidateReferences.map((reference) => [reference.id, reference])).values()
  );

  if (uniqueCandidates.length === 0) {
    throw new Error("At least one candidate reference different from sourceReference is required.");
  }

  return { sourceReference, candidateReferences: uniqueCandidates };
}

function readOutputText(payload: Record<string, unknown>) {
  if (typeof payload.output_text === "string") return payload.output_text;

  const output = Array.isArray(payload.output) ? payload.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;

    const content = Array.isArray((item as { content?: unknown }).content)
      ? (item as { content: unknown[] }).content
      : [];

    for (const part of content) {
      if (!part || typeof part !== "object") continue;
      const text = (part as { text?: unknown }).text;
      if (typeof text === "string") return text;
    }
  }

  return "";
}

async function readJsonOrText(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function requestOpenAi(
  sourceReference: CleanReference,
  candidateReferences: CleanReference[]
) {
  const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

  if (!openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not configured in Supabase secrets.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: defaultModel,
      instructions:
        "Eres la capa de inteligencia cultural de RFRNCE. Selecciona exactamente una candidata con la conexion creativa mas relevante para direccion de arte. Usa solo los ids, titulos y datos recibidos. No inventes autores, titulos, fechas ni contexto externo. No selecciones una conexion solo porque comparta una palabra: justifica una relacion visual, conceptual, narrativa, cultural o por contraste. Responde en espanol con JSON estructurado.",
      input: JSON.stringify(
        {
          sourceReference,
          candidateReferences,
        },
        null,
        2
      ),
      max_output_tokens: 700,
      text: {
        format: {
          type: "json_schema",
          name: "find_connections_response",
          schema: responseSchema,
          strict: true,
        },
      },
    }),
  });

  const payload = await readJsonOrText(response);

  if (!response.ok) {
    console.error("OPENAI_FIND_CONNECTIONS_ERROR", {
      status: response.status,
      body: payload,
      model: defaultModel,
    });

    const message =
      payload &&
      typeof payload === "object" &&
      "error" in payload &&
      payload.error &&
      typeof payload.error === "object" &&
      "message" in payload.error
        ? String((payload.error as { message: unknown }).message)
        : "OpenAI rejected the request.";

    throw new Error(
      `${message} Model used: ${defaultModel}. Change it in supabase/functions/find-connections/index.ts or set OPENAI_FIND_CONNECTIONS_MODEL.`
    );
  }

  return payload as Record<string, unknown>;
}

function assertConnectionResponse(
  payload: unknown,
  candidateReferences: CleanReference[]
): FindConnectionsResponse {
  if (!payload || typeof payload !== "object") {
    throw new Error("OpenAI returned an empty response.");
  }

  const outputText = readOutputText(payload as Record<string, unknown>);
  if (!outputText) {
    throw new Error("OpenAI response did not include structured JSON text.");
  }

  let parsed: FindConnectionsResponse;
  try {
    parsed = JSON.parse(outputText) as FindConnectionsResponse;
  } catch {
    throw new Error("OpenAI returned invalid JSON.");
  }

  const connection = parsed.connection;
  if (!connection || typeof connection !== "object") {
    throw new Error("OpenAI response is missing connection.");
  }

  const candidate = candidateReferences.find(
    (reference) => reference.id === connection.referenceId
  );
  if (!candidate) {
    throw new Error("OpenAI selected a referenceId that was not in candidateReferences.");
  }

  const validTypes: ConnectionType[] = [
    "visual",
    "conceptual",
    "narrativa",
    "cultural",
    "contraste",
  ];

  if (!validTypes.includes(connection.connectionType)) {
    throw new Error("OpenAI returned an invalid connectionType.");
  }

  if (
    !Number.isInteger(connection.confidence) ||
    connection.confidence < 1 ||
    connection.confidence > 5
  ) {
    throw new Error("OpenAI returned an invalid confidence value.");
  }

  return {
    connection: {
      referenceId: candidate.id,
      referenceTitle: candidate.title,
      connectionType: connection.connectionType,
      explanation: cleanString(connection.explanation),
      creativeApplication: cleanString(connection.creativeApplication),
      confidence: connection.confidence,
    },
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: isOriginAllowed(req) ? 200 : 403,
      headers: getCorsHeaders(req),
    });
  }

  if (!isOriginAllowed(req)) {
    return jsonResponse(req, { error: "Origin is not allowed." }, 403);
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { error: "Method not allowed. Use POST." }, 405);
  }

  try {
    const rawPayload = (await req.json().catch(() => null)) as FindConnectionsPayload | null;
    if (!rawPayload) {
      return jsonResponse(req, { error: "Request body must be valid JSON." }, 400);
    }

    const { sourceReference, candidateReferences } = validatePayload(rawPayload);
    const openAiPayload = await requestOpenAi(sourceReference, candidateReferences);
    const result = assertConnectionResponse(openAiPayload, candidateReferences);

    return jsonResponse(req, result);
  } catch (error) {
    console.error("FIND_CONNECTIONS_ERROR", error);

    const message =
      error instanceof Error
        ? error.message
        : "The connection could not be generated because an unknown non-Error value was thrown.";

    const status =
      message.includes("required") ||
      message.includes("must") ||
      message.includes("At least one") ||
      message.includes("valid JSON")
        ? 400
        : 502;

    return jsonResponse(req, { error: message }, status);
  }
});
