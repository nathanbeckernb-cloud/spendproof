import React from "react";
import type { CaseDocument, NewCaseInput, SpendProofCase } from "./types";

type CaseStoreValue = {
  cases: SpendProofCase[];
  createCase: (input: NewCaseInput) => SpendProofCase;
  getCase: (id: string) => SpendProofCase | undefined;
  addDocuments: (caseId: string, documents: CaseDocument[]) => void;
  deleteCase: (caseId: string) => void;
};

const CaseStoreContext = React.createContext<CaseStoreValue | null>(null);

function makeId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function makeDocumentId() {
  return makeId("doc");
}

export function CaseStoreProvider({ children }: { children: React.ReactNode }) {
  const [cases, setCases] = React.useState<SpendProofCase[]>([]);

  const createCase = React.useCallback((input: NewCaseInput) => {
    const now = new Date().toISOString();
    const created: SpendProofCase = {
      id: makeId("case"),
      title: input.title?.trim() || "New quote",
      category: input.category ?? "unknown",
      status: input.documents.length ? "ready_for_extraction" : "draft",
      documents: input.documents,
      createdAt: now,
      updatedAt: now,
    };
    setCases((current) => [created, ...current]);
    return created;
  }, []);

  const getCase = React.useCallback((id: string) => cases.find((item) => item.id === id), [cases]);

  const addDocuments = React.useCallback((caseId: string, documents: CaseDocument[]) => {
    if (!documents.length) return;
    setCases((current) => current.map((item) => {
      if (item.id !== caseId) return item;
      return {
        ...item,
        status: "ready_for_extraction",
        documents: [...item.documents, ...documents],
        updatedAt: new Date().toISOString(),
      };
    }));
  }, []);

  const deleteCase = React.useCallback((caseId: string) => {
    setCases((current) => current.filter((item) => item.id !== caseId));
  }, []);

  const value = React.useMemo(() => ({ cases, createCase, getCase, addDocuments, deleteCase }), [cases, createCase, getCase, addDocuments, deleteCase]);
  return <CaseStoreContext value={value}>{children}</CaseStoreContext>;
}

export function useCaseStore() {
  const value = React.use(CaseStoreContext);
  if (!value) throw new Error("useCaseStore must be used inside CaseStoreProvider");
  return value;
}
