import React, { useState } from "react";
import RoadmapHeader from "../components/common/RoadmapHeader";
import RoadmapLesson from "../components/common/RoadmapLesson";
import RoadmapProgress from "../components/common/RoadmapProgress";
import RoadmapPreview from "../components/common/RoadmapPreview";
import { Separator } from "../components/ui/separator";
import MainLayout from "@/layouts/MainLayout";

// Mock data for the page
const mockRoadmapData = {
  id: "level-3",
  title: "Level 3: Everyday Conversations",
  description:
    "Practice speaking fluently in common daily scenarios and unlock your conversational superpowers.",
  level: "Intermediate",
  lessonsCount: 6,
  completedLessons: 1,
  duration: "~2 Hours",
  nextBadge: "Conversational Hero 🏆",
  lessons: [
    {
      id: "lesson-1",
      title: "Lesson 1: Ordering Food",
      status: "completed" as const,
      progress: 100,
      stars: 3,
    },
    {
      id: "lesson-2",
      title: "Lesson 2: Asking for Directions",
      status: "in-progress" as const,
      progress: 60,
    },
    {
      id: "lesson-3",
      title: "Lesson 3: Shopping Conversations",
      status: "locked" as const,
      lockMessage: "Locked · Complete Lesson 2",
    },
    {
      id: "lesson-4",
      title: "Lesson 4: Phone Conversations",
      status: "locked" as const,
    },
    {
      id: "lesson-5",
      title: "Lesson 5: Job Interviews",
      status: "locked" as const,
    },
    {
      id: "lesson-6",
      title: "Lesson 6: Social Gatherings",
      status: "locked" as const,
    },
  ],
};

const RoadmapDetail: React.FC = () => {
  const [roadmap, setRoadmap] = useState(mockRoadmapData);

  const handleLessonClick = (lessonId: string) => {
    console.log(`Clicked on lesson: ${lessonId}`);
    // Here you would navigate to the lesson page or open a modal
  };

  const handlePreviewClick = () => {
    console.log("Preview video clicked");
    // Here you would open a video player modal
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainLayout>
        <main className="flex-grow">
          {/* Hero section with roadmap info */}
          <section className="bg-neutral-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <RoadmapHeader
                  title={roadmap.title}
                  description={roadmap.description}
                  level={roadmap.level}
                  lessons={roadmap.lessonsCount}
                  duration={roadmap.duration}
                />
              </div>
            </div>
          </section>

          {/* Lessons section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lessons list - 2/3 width on large screens */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {roadmap.lessons.map((lesson, index) => (
                      <RoadmapLesson
                        key={lesson.id}
                        title={lesson.title}
                        status={lesson.status}
                        index={index + 1}
                        progress={lesson.progress}
                        stars={lesson.stars}
                        lockMessage={lesson.lockMessage}
                        onClick={() => handleLessonClick(lesson.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress tracking - 1/3 width on large screens */}
                <div className="space-y-8">
                  <RoadmapProgress
                    completedLessons={roadmap.completedLessons}
                    totalLessons={roadmap.lessonsCount}
                    nextBadge={roadmap.nextBadge}
                  />

                  <Separator className="my-8" />

                  {/* Preview section */}
                  <div>
                    <h2 className="text-3xl font-medium text-center mb-6">
                      Preview This Level
                    </h2>
                    <RoadmapPreview
                      title="Sample Lesson Preview Video"
                      description="Watch a preview of Level 3 lessons"
                      onClick={handlePreviewClick}
                    />
                    <p className="text-sm text-neutral-600 text-center mt-4">
                      Get a taste of what you'll learn in this level
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </MainLayout>

    </div>
  );
};

export default RoadmapDetail;
