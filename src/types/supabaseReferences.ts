export interface SupabaseReference {
  id: string;
  source?: "uploaded" | "default";
  default_reference_id?: string | null;
  user_id?: string | null;
  title: string;
  type: string;
  url: string | null;
  description: string | null;
  ai_summary: string | null;
  tags: string[] | null;
  mood: string | null;
  style: string | null;
  created_at: string;
}

export type ConnectionType = "visual" | "conceptual" | "narrativa" | "cultural" | "contraste";

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

export interface ReferenceConnection {
  title: string;
  connectionType: ConnectionType[];
  explanation: string;
  creativeApplication: string;
  confidence: ConfidenceLevel;
  matchedCriteria: string[];
}

export type ConnectionCard = ReferenceConnection;

export interface FindConnectionReference {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

export interface AiReferenceConnection {
  referenceId: string;
  referenceTitle: string;
  connectionType: ConnectionType;
  explanation: string;
  creativeApplication: string;
  confidence: ConfidenceLevel;
}

export interface FindConnectionsRequest {
  sourceReference: FindConnectionReference;
  candidateReferences: FindConnectionReference[];
}

export interface FindConnectionsResponse {
  connection: AiReferenceConnection;
}
