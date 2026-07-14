import { supabase } from "./supabase";

type DefaultReferenceMutationResult = {
  persisted: boolean;
  message?: string;
};

function getFunctionUrl(functionName: string) {
  return `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${functionName}`;
}

async function getAccessToken() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token ?? null;
}

export async function saveDefaultReference(
  defaultReferenceId: string
): Promise<DefaultReferenceMutationResult> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { persisted: false, message: "Sin sesión de Supabase; guardado local." };
  }

  const response = await fetch(getFunctionUrl("default-reference-collection"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ defaultReferenceId }),
  });

  if (!response.ok && response.status !== 409) {
    const payload = await response.json().catch(() => null);
    throw new Error(
      payload && typeof payload === "object" && "error" in payload
        ? String((payload as { error: unknown }).error)
        : "No se pudo guardar la referencia predeterminada."
    );
  }

  return { persisted: true };
}

export async function removeDefaultReference(
  defaultReferenceId: string
): Promise<DefaultReferenceMutationResult> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { persisted: false, message: "Sin sesión de Supabase; eliminado local." };
  }

  const response = await fetch(getFunctionUrl("default-reference-collection"), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ defaultReferenceId }),
  });

  if (!response.ok && response.status !== 404) {
    const payload = await response.json().catch(() => null);
    throw new Error(
      payload && typeof payload === "object" && "error" in payload
        ? String((payload as { error: unknown }).error)
        : "No se pudo quitar la referencia predeterminada."
    );
  }

  return { persisted: true };
}
