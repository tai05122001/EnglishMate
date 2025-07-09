import type { ListeningLessonDTO } from "./ListeningLessonDTO";

export const mockListeningLessons: ListeningLessonDTO[] = [
  {
    id: 1,
    title: "Daily Conversation: At the Coffee Shop",
    imageUrl:
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Listen to a conversation between a customer and barista at a coffee shop.",
    audioUrl: "/assets/beginner1.mp3",
    duration: 225,
    level: "EASY",
    rating: 4.8,
    completedCount: 1250,
    category: "food",
  },
  {
    id: 2,
    title: "Ordering Coffee",
    imageUrl:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "A customer orders coffee at a café.",
    audioUrl: "/assets/beginner2.mp3",
    duration: 150,
    level: "EASY",
    rating: 4.7,
    completedCount: 980,
    category: "food",
  },
  {
    id: 3,
    title: "Asking for Directions",
    imageUrl:
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "A tourist asks for directions to the train station.",
    audioUrl: "/assets/beginner3.mp3",
    duration: 130,
    level: "EASY",
    rating: 4.6,
    completedCount: 870,
    category: "travel",
  },
  {
    id: 4,
    title: "Job Interview",
    imageUrl:
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "A job applicant answers questions in an interview.",
    audioUrl: "/assets/intermediate1.mp3",
    duration: 245,
    level: "MEDIUM",
    rating: 4.9,
    completedCount: 1100,
    category: "work",
  },
  {
    id: 5,
    title: "Travel Plans",
    imageUrl:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "Friends discuss their upcoming holiday plans.",
    audioUrl: "/assets/intermediate2.mp3",
    duration: 200,
    level: "MEDIUM",
    rating: 4.7,
    completedCount: 990,
    category: "travel",
  },
];
