export interface TranscriptLine {
  text: string;
  start: number;
}

export interface ListeningLessonDetailDTO {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  audioUrl: string;
  duration: number;
  transcript: TranscriptLine[];
  level: string;
  rating: number;
  exercise: string;
  completedCount: number;
  type: string;
  lessonTitle: string;
  courseTitle: string;
}
