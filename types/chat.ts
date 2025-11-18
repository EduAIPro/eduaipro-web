export type ChatResponse = {
  id: string;
  content: string;
  response: string;
  metadata: {
    confidence: number;
    question_type: string;
    is_within_scope: boolean;
  };
  createdAt: string;
  moduleItemId: string;
  staffId: string;
};
