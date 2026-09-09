export type CaseCategory = "unknown" | "auto" | "hvac" | "plumbing" | "roofing";
export type CaseStatus = "draft" | "ready_for_extraction" | "needs_context" | "analyzed" | "decided" | "completed";
export type DocumentSource = "camera" | "photo_library" | "pdf";

export type CaseDocument = {
  id: string;
  source: DocumentSource;
  uri: string;
  name: string;
  mimeType: string | null;
  size: number | null;
  width: number | null;
  height: number | null;
  createdAt: string;
};

export type SpendProofCase = {
  id: string;
  title: string;
  category: CaseCategory;
  status: CaseStatus;
  documents: CaseDocument[];
  createdAt: string;
  updatedAt: string;
};

export type NewCaseInput = {
  title?: string;
  category?: CaseCategory;
  documents: CaseDocument[];
};
