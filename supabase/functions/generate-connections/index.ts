import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.1";
import { corsHeaders } from "../_shared/cors.ts";
import { generateJson } from "../_shared/openai.ts";

type GenerateConnectionsPayload = {
  referenceId?: string;
};

type ReferenceMatch = {
  id: string;
  title: string;
  type: string;
  url: string | null;
  description: string;
  ai_summary: string | null;
  tags: string[] | null;
  mood: string | null;
  style: string | null;
  similarity: number;
};

type ConnectionResponse = {
  connections: {
    title: string;
    connectionType: ("visual" | "conceptual" | "narrativa" | "cultural" | "contraste")[];
    explanation: string;
    creativeApplication: string;
    confidence: 1 | 2 | 3 | 4 | 5;
    matchedCriteria: string[];
  }[];
};

const connectionsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    connections: {
      type: "array",
      minItems: 0,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          connectionType: {
            type: "array",
            minItems: 1,
            maxItems: 3,
            items: {
              type: "string",
              enum: ["visual", "conceptual", "narrativa", "cultural", "contraste"],
            },
          },
          explanation: { type: "string" },
          creativeApplication: { type: "string" },
          confidence: { type: "integer", minimum: 1, maximum: 5 },
          matchedCriteria: {
            type: "array",
            minItems: 1,
            maxItems: 8,
            items: { type: "string" },
          },
        },
        required: [
          "title",
          "connectionType",
          "explanation",
          "creativeApplication",
          "confidence",
          "matchedCriteria",
        ],
      },
    },
  },
  required: ["connections"],
};

function getSupabaseAdmin() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase server environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { referenceId } = (await req.json()) as GenerateConnectionsPayload;

    if (!referenceId) {
      return new Response(JSON.stringify({ error: "referenceId is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = getSupabaseAdmin();
    const { data: reference, error: referenceError } = await supabase
      .from("creative_references")
      .select("*")
      .eq("id", referenceId)
      .single();

    if (referenceError) throw referenceError;
    if (!reference.embedding) throw new Error("Selected reference does not have an embedding.");

    const { data: matches, error: matchesError } = await supabase.rpc("match_references", {
      query_embedding: reference.embedding,
      reference_type: reference.type,
      match_count: 5,
      match_threshold: 0.2,
    });

    if (matchesError) throw matchesError;

    const typedMatches = (matches ?? []) as ReferenceMatch[];
    if (typedMatches.length === 0) {
      return new Response(JSON.stringify({ connections: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const connectionResponse = await generateJson<ConnectionResponse>({
      schemaName: "reference_connections",
      schema: connectionsSchema,
      prompt: `Eres la capa de inteligencia cultural de rfrnce. Genera conexiones creativas entre una referencia origen y referencias similares de otra naturaleza. No inventes referencias nuevas: usa solo las candidatas.

Referencia origen:
${JSON.stringify(reference, null, 2)}

Candidatas:
${JSON.stringify(typedMatches, null, 2)}

Cada conexion debe devolver title, connectionType, explanation, creativeApplication, confidence y matchedCriteria. No uses "mismo tipo" como explicacion principal, no justifiques solo por una palabra compartida y prioriza conexiones entre disciplinas diferentes.`,
    });

    return new Response(JSON.stringify(connectionResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unexpected error." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
