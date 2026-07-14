import defaultReferenceCatalog from "./defaultReferences.catalog.json";

export type DefaultReference = {
  id: string;
  source: "default";
  kind: "image";
  type: "Imagen";
  title: string;
  description: string;
  imagePath: string;
  tags: string[];
  collection: string;
  connections: number;
  date: string;
};

export type DefaultReferenceCard = DefaultReference & {
  image: string;
};

function getBaseUrl(baseUrl = import.meta.env.BASE_URL) {
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

export function getDefaultReferenceImageUrl(
  reference: Pick<DefaultReference, "imagePath">,
  baseUrl = import.meta.env.BASE_URL
) {
  return `${getBaseUrl(baseUrl)}${reference.imagePath.replace(/^\//, "")}`;
}

export const defaultReferences = defaultReferenceCatalog.map((reference) => ({
  ...reference,
  source: "default",
  kind: "image",
  type: "Imagen",
})) satisfies DefaultReference[];

export const defaultReferenceCards = defaultReferences.map((reference) => ({
  ...reference,
  image: getDefaultReferenceImageUrl(reference),
})) satisfies DefaultReferenceCard[];

export function getDefaultReferenceById(referenceId: string) {
  return defaultReferences.find((reference) => reference.id === referenceId) ?? null;
}

export function isDefaultReferenceId(referenceId: string) {
  return Boolean(getDefaultReferenceById(referenceId));
}
