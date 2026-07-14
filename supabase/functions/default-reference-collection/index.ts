import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.1";
import { corsHeaders } from "../_shared/cors.ts";
import {
  defaultReferences,
  getDefaultReferenceById,
  type DefaultReference,
} from "../_shared/defaultReferences.ts";
import { createEmbedding, generateJson } from "../_shared/openai.ts";

type DefaultReferencePayload = {
  defaultReferenceId?: string;
  collectionId?: string;
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

function getSupabaseEnv() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    throw new Error("Missing Supabase server environment variables.");
  }

  return { supabaseUrl, anonKey, serviceRoleKey };
}

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function getUser(req: Request) {
  const { supabaseUrl, anonKey } = getSupabaseEnv();
  const authorization = req.headers.get("Authorization");

  if (!authorization) return null;

  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
  });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
}

function getSupabaseAdmin() {
  const { supabaseUrl, serviceRoleKey } = getSupabaseEnv();
  return createClient(supabaseUrl, serviceRoleKey);
}

async function buildDefaultReferenceAnalysis(reference: DefaultReference) {
  const sourceText = [
    `ID: ${reference.id}`,
    `Title: ${reference.title}`,
    `Type: ${reference.type}`,
    `URL: ${reference.imagePath}`,
    `Description: ${reference.description}`,
    `Collection: ${reference.collection}`,
    `Tags: ${reference.tags.join(", ")}`,
  ].join("\n");

  const analysis = await generateJson<AiAnalysis>({
    schemaName: "default_reference_analysis",
    schema: analysisSchema,
    prompt: `Analiza esta referencia predeterminada de rfrnce. Devuelve un resumen breve, tags curatoriales, mood y style.\n\n${sourceText}`,
  });

  const embedding = await createEmbedding(
    [
      reference.title,
      reference.type,
      reference.description,
      reference.collection,
      reference.tags.join(", "),
      analysis.ai_summary,
      analysis.mood,
      analysis.style,
    ].join("\n")
  );

  return { analysis, embedding };
}

async function ensureCreativeReference(reference: DefaultReference) {
  const supabase = getSupabaseAdmin();
  const { data: existing, error: existingError } = await supabase
    .from("creative_references")
    .select("*")
    .eq("default_reference_id", reference.id)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) return existing;

  const { analysis, embedding } = await buildDefaultReferenceAnalysis(reference);
  const { data, error } = await supabase
    .from("creative_references")
    .insert({
      source: "default",
      default_reference_id: reference.id,
      title: reference.title,
      type: reference.type,
      url: reference.imagePath,
      description: reference.description,
      ai_summary: analysis.ai_summary,
      tags: analysis.tags,
      mood: analysis.mood,
      style: analysis.style,
      embedding,
    })
    .select("*")
    .single();

  if (!error) return data;

  if ("code" in error && error.code === "23505") {
    const { data: racedReference, error: racedReferenceError } = await supabase
      .from("creative_references")
      .select("*")
      .eq("default_reference_id", reference.id)
      .single();

    if (racedReferenceError) throw racedReferenceError;
    return racedReference;
  }

  throw error;
}

async function readPayload(req: Request) {
  return (await req.json().catch(() => ({}))) as DefaultReferencePayload;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const user = await getUser(req);
    if (!user) return jsonResponse({ error: "Authentication is required." }, 401);

    const supabase = getSupabaseAdmin();

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("user_default_references")
        .select("default_reference_id, creative_reference_id, collection_id, saved_at")
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false });

      if (error) throw error;

      const savedReferences = (data ?? []).map((savedReference) => {
        const catalogReference = getDefaultReferenceById(savedReference.default_reference_id);

        return {
          ...savedReference,
          reference: catalogReference,
        };
      });

      return jsonResponse({
        savedDefaultReferenceIds: savedReferences.map(
          (savedReference) => savedReference.default_reference_id
        ),
        savedReferences,
        catalog: defaultReferences,
      });
    }

    if (req.method === "POST") {
      const { defaultReferenceId, collectionId } = await readPayload(req);
      if (!defaultReferenceId) {
        return jsonResponse({ error: "defaultReferenceId is required." }, 400);
      }

      const catalogReference = getDefaultReferenceById(defaultReferenceId);
      if (!catalogReference) {
        return jsonResponse({ error: "Unknown default reference id." }, 404);
      }

      const creativeReference = await ensureCreativeReference(catalogReference);
      const { data, error } = await supabase
        .from("user_default_references")
        .insert({
          user_id: user.id,
          default_reference_id: catalogReference.id,
          creative_reference_id: creativeReference.id,
          collection_id: collectionId?.trim() || "uncategorized",
        })
        .select("*")
        .single();

      if (error) {
        if ("code" in error && error.code === "23505") {
          return jsonResponse({ error: "Default reference already saved." }, 409);
        }

        throw error;
      }

      return jsonResponse({ savedReference: data, reference: catalogReference }, 201);
    }

    if (req.method === "DELETE") {
      const { defaultReferenceId } = await readPayload(req);
      if (!defaultReferenceId) {
        return jsonResponse({ error: "defaultReferenceId is required." }, 400);
      }

      const catalogReference = getDefaultReferenceById(defaultReferenceId);
      if (!catalogReference) {
        return jsonResponse({ error: "Unknown default reference id." }, 404);
      }

      const { count, error } = await supabase
        .from("user_default_references")
        .delete({ count: "exact" })
        .eq("user_id", user.id)
        .eq("default_reference_id", catalogReference.id);

      if (error) throw error;
      if (!count) return jsonResponse({ error: "Default reference was not saved." }, 404);

      return jsonResponse({ removed: true, defaultReferenceId: catalogReference.id });
    }

    return jsonResponse({ error: "Method not allowed." }, 405);
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      500
    );
  }
});
