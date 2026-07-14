import { useState, useEffect, useCallback } from "react";
import { legacyReferenceKeyMap } from "../data/references";

export interface Collection {
  id: string;
  name: string;
}

export interface SavedRef {
  refKey: string;
  collectionId: string;
  savedAt: number;
}

export const UNCATEGORIZED_ID = "uncategorized";
const UNCATEGORIZED: Collection = { id: UNCATEGORIZED_ID, name: "Sin clasificar" };
const STORAGE_KEY = "rfrnce-archive";

interface State {
  collections: Collection[];
  savedRefs: SavedRef[];
}

function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as State;
      const migratedSavedRefs = parsed.savedRefs.reduce<SavedRef[]>((savedRefs, savedRef) => {
        const refKey = legacyReferenceKeyMap.get(savedRef.refKey) ?? savedRef.refKey;

        if (savedRefs.some((reference) => reference.refKey === refKey)) return savedRefs;

        savedRefs.push({ ...savedRef, refKey });
        return savedRefs;
      }, []);

      // Ensure default collection always exists
      if (!parsed.collections.find((c) => c.id === UNCATEGORIZED_ID)) {
        parsed.collections.unshift(UNCATEGORIZED);
      }

      return { ...parsed, savedRefs: migratedSavedRefs };
    }
  } catch {}
  return { collections: [UNCATEGORIZED], savedRefs: [] };
}

export function useArchive() {
  const [state, setState] = useState<State>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const isSaved = useCallback(
    (key: string) => state.savedRefs.some((r) => r.refKey === key),
    [state.savedRefs]
  );

  const getCollectionId = useCallback(
    (key: string) =>
      state.savedRefs.find((r) => r.refKey === key)?.collectionId ?? UNCATEGORIZED_ID,
    [state.savedRefs]
  );

  const getCollectionName = useCallback(
    (key: string) => {
      const colId =
        state.savedRefs.find((r) => r.refKey === key)?.collectionId ?? UNCATEGORIZED_ID;
      return state.collections.find((c) => c.id === colId)?.name ?? "Sin clasificar";
    },
    [state]
  );

  const saveRef = useCallback((key: string, collectionId = UNCATEGORIZED_ID) => {
    setState((prev) => {
      if (prev.savedRefs.some((r) => r.refKey === key)) return prev;
      return {
        ...prev,
        savedRefs: [...prev.savedRefs, { refKey: key, collectionId, savedAt: Date.now() }],
      };
    });
  }, []);

  const removeRef = useCallback((key: string) => {
    setState((prev) => ({
      ...prev,
      savedRefs: prev.savedRefs.filter((r) => r.refKey !== key),
    }));
  }, []);

  const moveRef = useCallback((key: string, collectionId: string) => {
    setState((prev) => ({
      ...prev,
      savedRefs: prev.savedRefs.map((r) =>
        r.refKey === key ? { ...r, collectionId } : r
      ),
    }));
  }, []);

  const createCollection = useCallback((name: string): string => {
    const id = `col-${Date.now()}`;
    setState((prev) => ({
      ...prev,
      collections: [...prev.collections, { id, name: name.trim() }],
    }));
    return id;
  }, []);

  const renameCollection = useCallback((id: string, name: string) => {
    if (id === UNCATEGORIZED_ID) return;
    setState((prev) => ({
      ...prev,
      collections: prev.collections.map((c) =>
        c.id === id ? { ...c, name: name.trim() } : c
      ),
    }));
  }, []);

  const deleteCollection = useCallback((id: string) => {
    if (id === UNCATEGORIZED_ID) return;
    setState((prev) => ({
      ...prev,
      collections: prev.collections.filter((c) => c.id !== id),
      savedRefs: prev.savedRefs.map((r) =>
        r.collectionId === id ? { ...r, collectionId: UNCATEGORIZED_ID } : r
      ),
    }));
  }, []);

  return {
    collections: state.collections,
    savedRefs: state.savedRefs,
    totalSaved: state.savedRefs.length,
    isSaved,
    getCollectionId,
    getCollectionName,
    saveRef,
    removeRef,
    moveRef,
    createCollection,
    renameCollection,
    deleteCollection,
  };
}
