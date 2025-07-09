export interface VocabularyItem {
  id: string;
  word: string;
  definition: string;
  example: string;
  partOfSpeech: string;
  level: "beginner" | "intermediate" | "advanced";
}

export interface VocabularyList {
  id: string;
  title: string;
  description: string;
  items: VocabularyItem[];
  createdAt: string;
  updatedAt: string;
}
