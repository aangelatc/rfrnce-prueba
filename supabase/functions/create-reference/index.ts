import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.1";
import { corsHeaders } from "../_shared/cors.ts";
import { createEmbedding, generateJson } from "../_shared/openai.ts";

type CreateReferencePayload = {
  title?: string;
  type?: string;
  url?: string | null;
  description?: string;
};

type AiAnalysis = {
  ai_summary: string;
  tags: string[];
  mood: string;
  style: string;
};

const analysisSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    ai_summary: { type: "string" },
    tags: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 8,
    },
    mood: { type: "string" },
    style: { type: "string" },
  },
  required: ["ai_summary", "tags", "mood", "style"],
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
    const { title, type, url, description } = (await req.json()) as CreateReferencePayload;

    if (!title || !type || !description) {
      return new Response(JSON.stringify({ error: "title, type and description are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sourceText = [
      `Title: ${title}`,
      `Type: ${type}`,
      url ? `URL: ${url}` : null,
      `Description: ${description}`,
    ]
      .filter(Boolean)
      .join("\n");

    const analysis = await generateJson<AiAnalysis>({
      schemaName: "reference_analysis",
      schema: analysisSchema,
      prompt: `Analiza esta referencia creativa para rfrnce. Devuelve un resumen breve, tags curatoriales, mood y style.\n\n${sourceText}`,
    });

    const embedding = await createEmbedding(
      [
        title,
        type,
        description,
        analysis.ai_summary,
        analysis.tags.join(", "),
        analysis.mood,
        analysis.style,
      ].join("\n")
    );

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("creative_references")
      .insert({
        title,
        type,
        url: url || null,
        description,
        ai_summary: analysis.ai_summary,
        tags: analysis.tags,
        mood: analysis.mood,
        style: analysis.style,
        embedding,
      })
      .select("*")
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ reference: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("CREATE_REFERENCE_ERROR", error);

    const errorDetails =
      error instanceof Error
        ? {
            message: error.message,
            name: error.name,
            stack: error.stack,
          }
        : {
            message: "Non-Error thrown",
            raw: error,
          };

    return new Response(
      JSON.stringify({
        error: errorDetails.message,
        ...errorDetails,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
