import { useState, useRef, useEffect } from "react";
import type { ReferenceCard } from "../data/references";
import type { Collection, SavedRef } from "../hooks/useArchive";
import { UNCATEGORIZED_ID } from "../hooks/useArchive";

interface Props {
  open: boolean;
  onClose: () => void;
  collections: Collection[];
  savedRefs: SavedRef[];
  allRefs: ReferenceCard[];
  onMove: (key: string, collectionId: string) => void;
  onRemove: (key: string) => void;
  onCreateCollection: (name: string) => string;
  onRenameCollection: (id: string, name: string) => void;
  onDeleteCollection: (id: string) => void;
}

function MoveSelect({
  refKey,
  currentCollectionId,
  collections,
  onMove,
}: {
  refKey: string;
  currentCollectionId: string;
  collections: Collection[];
  onMove: (key: string, collectionId: string) => void;
}) {
  return (
    <select
      value={currentCollectionId}
      onChange={(e) => onMove(refKey, e.target.value)}
      className="text-[11px] text-rfrnce-gray bg-rfrnce-offwhite border border-rfrnce-black/20 px-2 py-[3px] outline-none cursor-pointer hover:border-rfrnce-black/40 transition-colors"
      style={{ borderRadius: 0 }}
      title="Mover a otra colección"
    >
      {collections.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export function ArchivePanel({
  open,
  onClose,
  collections,
  savedRefs,
  allRefs,
  onMove,
  onRemove,
  onCreateCollection,
  onRenameCollection,
  onDeleteCollection,
}: Props) {
  const [newColName, setNewColName] = useState("");
  const [showNewInput, setShowNewInput] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const newInputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showNewInput) newInputRef.current?.focus();
  }, [showNewInput]);

  useEffect(() => {
    if (renamingId) renameInputRef.current?.focus();
  }, [renamingId]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleCreate = () => {
    if (newColName.trim()) {
      onCreateCollection(newColName.trim());
      setNewColName("");
      setShowNewInput(false);
    }
  };

  const handleRename = () => {
    if (renamingId && renameValue.trim()) {
      onRenameCollection(renamingId, renameValue.trim());
    }
    setRenamingId(null);
  };

  const getRef = (key: string) => allRefs.find((r) => r.title === key);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(32,31,33,0.18)",
          backdropFilter: open ? "blur(2px)" : "none",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full w-full z-50 bg-white flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          maxWidth: "440px",
          transform: open ? "translateX(0)" : "translateX(100%)",
          borderLeft: "1px solid rgba(32,31,33,0.10)",
          boxShadow: open ? "-4px 0 32px rgba(32,31,33,0.08)" : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 py-6 border-b border-rfrnce-black/10 flex-none">
          <div>
            <h2
              style={{
                fontFamily: "'Newsreader', serif",
                fontWeight: 300,
                fontSize: "26px",
                lineHeight: 1.1,
              }}
            >
              Mi archivo
            </h2>
            <p className="text-[12px] text-rfrnce-gray mt-1 font-semibold uppercase tracking-[0.16em]">
              {savedRefs.length}{" "}
              {savedRefs.length === 1 ? "referencia guardada" : "referencias guardadas"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-rfrnce-gray hover:text-rfrnce-black transition-colors mt-1"
            style={{ fontSize: "22px", lineHeight: 1 }}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* New collection */}
        <div className="px-8 py-4 border-b border-rfrnce-black/10 flex-none">
          {showNewInput ? (
            <div className="flex gap-2 items-center">
              <input
                ref={newInputRef}
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreate();
                  if (e.key === "Escape") setShowNewInput(false);
                }}
                placeholder="Nombre de la colección"
                className="flex-1 border border-rfrnce-black/20 px-3 py-2 text-[13px] text-rfrnce-black outline-none focus:border-rfrnce-black/50 placeholder:text-rfrnce-gray/50"
                style={{ borderRadius: 0 }}
              />
              <button
                onClick={handleCreate}
                className="bg-rfrnce-lime text-rfrnce-black font-semibold text-[12px] px-3 py-2 rounded-sm flex-none"
              >
                Crear
              </button>
              <button
                onClick={() => setShowNewInput(false)}
                className="text-rfrnce-gray text-[12px] hover:text-rfrnce-black transition-colors flex-none"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowNewInput(true)}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rfrnce-gray hover:text-rfrnce-black transition-colors flex items-center gap-2"
            >
              <span className="text-rfrnce-lime text-[16px] leading-none font-normal">+</span>
              Nueva colección
            </button>
          )}
        </div>

        {/* Collections */}
        <div className="flex-1 overflow-y-auto">
          {savedRefs.length === 0 ? (
            <div className="px-8 py-16 text-center">
              <p
                className="text-rfrnce-gray text-[18px] mb-2"
                style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontWeight: 300 }}
              >
                Tu archivo está vacío.
              </p>
              <p className="text-[13px] text-rfrnce-gray leading-[1.6]">
                Guarda referencias desde la sección de abajo para empezar a construir tu archivo.
              </p>
            </div>
          ) : (
            collections.map((col) => {
              const colRefs = savedRefs.filter((r) => r.collectionId === col.id);
              if (colRefs.length === 0 && col.id !== UNCATEGORIZED_ID) return null;

              return (
                <div key={col.id} className="border-b border-rfrnce-black/10">
                  {/* Collection header */}
                  <div className="flex items-center justify-between px-8 py-4 bg-rfrnce-offwhite">
                    {renamingId === col.id ? (
                      <input
                        ref={renameInputRef}
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename();
                          if (e.key === "Escape") setRenamingId(null);
                        }}
                        onBlur={handleRename}
                        className="text-[13px] font-semibold text-rfrnce-black border-b border-rfrnce-black/40 outline-none bg-transparent flex-1 mr-4"
                        style={{ borderRadius: 0 }}
                      />
                    ) : (
                      <div
                        className="flex items-center gap-2 flex-1 min-w-0"
                        onDoubleClick={() => {
                          if (col.id !== UNCATEGORIZED_ID) {
                            setRenamingId(col.id);
                            setRenameValue(col.name);
                          }
                        }}
                      >
                        <span className="text-[13px] font-semibold text-rfrnce-black truncate">
                          {col.name}
                        </span>
                        <span className="text-[12px] text-rfrnce-gray font-normal flex-none">
                          ({colRefs.length})
                        </span>
                      </div>
                    )}
                    {col.id !== UNCATEGORIZED_ID && (
                      <div className="flex items-center gap-3 flex-none ml-2">
                        <button
                          onClick={() => {
                            setRenamingId(col.id);
                            setRenameValue(col.name);
                          }}
                          className="text-[11px] text-rfrnce-gray hover:text-rfrnce-black transition-colors uppercase tracking-[0.12em] font-semibold"
                        >
                          Renombrar
                        </button>
                        <button
                          onClick={() => onDeleteCollection(col.id)}
                          className="text-[11px] text-rfrnce-gray hover:text-rfrnce-black transition-colors uppercase tracking-[0.12em] font-semibold"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Refs in collection */}
                  {colRefs.length === 0 ? (
                    <p className="px-8 py-4 text-[13px] text-rfrnce-gray/60 italic">
                      Sin referencias
                    </p>
                  ) : (
                    <div className="flex flex-col gap-0">
                      {colRefs.map((savedRef) => {
                        const ref = getRef(savedRef.refKey);
                        if (!ref) return null;

                        return (
                          <div
                            key={savedRef.refKey}
                            className="flex gap-0 border-b border-rfrnce-black/[0.06] last:border-b-0 hover:bg-rfrnce-offwhite/50 transition-colors"
                          >
                            {/* Thumbnail */}
                            {ref.kind === "image" ? (
                              <div className="w-16 h-16 flex-none overflow-hidden">
                                <img
                                  src={ref.image}
                                  alt={ref.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div
                                className="w-16 h-16 flex-none bg-rfrnce-black flex items-center justify-center"
                                style={{ borderLeft: "3px solid #89f336" }}
                              >
                                <span
                                  className="text-rfrnce-lime text-[24px]"
                                  style={{
                                    fontFamily: "'Newsreader', serif",
                                    fontStyle: "italic",
                                    lineHeight: 1,
                                  }}
                                >
                                  "
                                </span>
                              </div>
                            )}

                            {/* Info + actions */}
                            <div className="flex-1 px-4 py-3 min-w-0">
                              <p className="text-[13px] font-medium text-rfrnce-black truncate leading-snug">
                                {ref.title}
                              </p>
                              {ref.kind === "text" && (
                                <p className="text-[11px] text-rfrnce-gray truncate mt-0.5">
                                  {ref.source}
                                </p>
                              )}
                              <div className="flex items-center gap-3 mt-2">
                                <MoveSelect
                                  refKey={savedRef.refKey}
                                  currentCollectionId={savedRef.collectionId}
                                  collections={collections}
                                  onMove={onMove}
                                />
                                <button
                                  onClick={() => onRemove(savedRef.refKey)}
                                  className="text-[11px] font-semibold uppercase tracking-[0.1em] text-rfrnce-gray hover:text-rfrnce-black transition-colors"
                                >
                                  Quitar
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
