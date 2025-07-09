import type { ListeningLessonDetailDTO } from "./ListeningLessonDetailDTO";

export const mockListeningLessonDetail: ListeningLessonDetailDTO = {
  id: 1,
  title: "Daily Conversation: At the Coffee Shop",
  imageUrl:
    "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
  description:
    "Listen to a conversation between a customer and barista at a coffee shop.",
  audioUrl: "/assets/beginner1.mp3",
  duration: 60,
  transcript: [
    { text: "Emma: What is your room like, Ben?", start: 1 },
    {
      text: "Ben: It's small, but it's nice. There is a bed in the corner, and next to it, there is a small table with a lamp.",
      start: 3,
    },
    { text: "Emma: Is there a desk?", start: 10 },
    {
      text: "Ben: Yes, there is. It's by the window. I like to study there because the light is good.",
      start: 13,
    },
    { text: "Emma: That sounds perfect! What else is in the room?", start: 19 },
    {
      text: "Ben: Well, there is a big wardrobe for my clothes, and there is a shelf with some books.",
      start: 23,
    },
    {
      text: "Emma: Oh, I love having books in my room. Do you read a lot?",
      start: 27,
    },
    {
      text: "Ben: Yes, I do. There are about 20 books on the shelf.",
      start: 31,
    },
    { text: "Emma: Wow, that's great! Is there a TV?", start: 35 },
    {
      text: "Ben: No, there isn't a TV. I don't watch much television.",
      start: 41,
    },
    { text: "Emma: I see. Is there a bathroom in your room?", start: 43 },
    {
      text: "Ben: No, there isn't. The bathroom is down the hall. There is only one bathroom for the whole floor.",
      start: 47,
    },
    {
      text: "Emma: That's not too bad. Do you have a view from your window?",
      start: 53,
    },
    {
      text: "Ben: Yes! There are some trees outside, and I can see the park.",
      start: 55,
    },
    { text: "Emma: That sounds so nice! Your room sounds cosy.", start: 59 },
    {
      text: "Ben: Yes, it's small, but it's comfortable. I like it.",
      start: 67,
    },
  ],
  level: "EASY",
  rating: 4.8,
  exercise: "Multiple Choice",
  completedCount: 1250,
  type: "MULTIPLE_CHOICE",
  lessonTitle: "Daily Conversation",
  courseTitle: "English Basics",
};
