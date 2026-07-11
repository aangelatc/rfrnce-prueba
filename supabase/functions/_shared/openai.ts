const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

if (!openaiApiKey) {
  throw new Error("Missing OPENAI_API_KEY.");
}

const defaultTextModel = Deno.env.get("OPENAI_TEXT_MODEL") ?? "gpt-5.4-mini";

export async function createEmbedding(input: string) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error?.message ?? "OpenAI embeddings request failed.");
  }

  return payload.data[0].embedding as number[];
}

function readOutputText(payload: Record<string, unknown>) {
  if (typeof payload.output_text === "string") return payload.output_text;

  const output = Array.isArray(payload.output) ? payload.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = Array.isArray((item as { content?: unknown }).content)
      ? ((item as { content: unknown[] }).content)
      : [];

    for (const part of content) {
      if (!part || typeof part !== "object") continue;
      const text = (part as { text?: unknown }).text;
      if (typeof text === "string") return text;
    }
  }

  return "";
}

export async function generateJson<T>({
  prompt,
  schema,
  schemaName,
}: {
  prompt: string;
  schema: Record<string, unknown>;
  schemaName: string;
}): Promise<T> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: defaultTextModel,
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: schemaName,
          schema,
          strict: true,
        },
      },
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error?.message ?? "OpenAI text request failed.");
  }

  const outputText = readOutputText(payload);
  if (!outputText) throw new Error("OpenAI response did not include JSON text.");

  return JSON.parse(outputText) as T;
}
