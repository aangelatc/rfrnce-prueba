export interface SupabaseReference {
  id: string;
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

export interface ConnectionCard {
  connection_title: string;
  why_it_connects: string;
  creative_application: string;
}
