import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
  LessonHeader,
  LessonProgress,
  VocabCard,
  LessonNavigation,
  LessonOverview,
} from "@/components/lesson";
import type { LessonDTO } from "@/types";
import { useCourse } from "@/hooks/useCourse";

const LessonDetail = () => {
  const { lessonId, courseId } = useParams<{
    lessonId: string;
    courseId: string;
  }>();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [lessonData, setLessonData] = useState<LessonDTO>({
    id: 0,
    name: "",
    level: "",
    vocabularyWords: [],
  });

  // Get course data from Redux
  const { vocabularyData, lessons } = useCourse();

  // Load lesson data when component mounts
  useEffect(() => {
    // First try to get data from Redux store
    if (lessonId && lessons.length > 0) {
      // Find the specific lesson
      const lessonIndex = parseInt(lessonId) - 1;
      if (lessonIndex >= 0 && lessonIndex < lessons.length) {
        const lesson = lessons[lessonIndex];

        if (lesson.vocabularyWords && lesson.vocabularyWords.length > 0) {
          const lessonDataFromRedux: LessonDTO = {
            id: lessonIndex + 1,
            name: lesson.name,
            level: lesson.level,
            vocabularyWords: lesson.vocabularyWords,
          };

          setLessonData(lessonDataFromRedux);

          return;
        }
      }
    }

    // Fallback to localStorage if Redux data not available
    const storedLessonData = localStorage.getItem("current_lesson_data");

    if (storedLessonData) {
      try {
        const parsedData = JSON.parse(storedLessonData);
        if (
          parsedData &&
          parsedData.vocabularyWords &&
          parsedData.vocabularyWords.length > 0
        ) {
          setLessonData(parsedData);
        } else {
        }
      } catch (error) {}
    } else {
    }
  }, [lessonId, courseId, lessons]);

  // Calculate learned words
  const learnedWordsCount = lessonData.vocabularyWords.filter(
    (word) => word.isLearned
  ).length;

  // Handle marking words as learned
  const handleMarkLearned = () => {
    const updatedWords = [...lessonData.vocabularyWords];
    updatedWords[currentWordIndex] = {
      ...updatedWords[currentWordIndex],
      isLearned: !updatedWords[currentWordIndex].isLearned,
    };

    const updatedLessonData = {
      ...lessonData,
      vocabularyWords: updatedWords,
    };

    setLessonData(updatedLessonData);
  };

  // Handle navigation
  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentWordIndex < lessonData.vocabularyWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  // Handle selecting specific word from overview
  const handleSelectWord = (wordId: number) => {
    if (wordId === 0) {
      // Handle review logic (for a real app)
      return;
    }

    const index = lessonData.vocabularyWords.findIndex(
      (word) => word.id === wordId
    );
    if (index !== -1) {
      setCurrentWordIndex(index);
    }
  };

  // Handle pronunciation (for a real app this would play audio)
  const handlePlayPronunciation = () => {};

  // Get the current word data
  const currentWord = lessonData.vocabularyWords[currentWordIndex];
  return (
    <MainLayout>
      <div className="pt-16 bg-gray-100">
        {" "}
        {/* Add padding to account for fixed header */}
        {/* Lesson Header */}
        <LessonHeader
          title={lessonData.name}
          description={lessonData.level}
          lessonId={lessonId || ""}
          courseId={courseId || ""}
        />
        {/* Progress Bar */}
        <LessonProgress
          current={learnedWordsCount}
          total={lessonData.vocabularyWords.length}
        />
        {/* Main Content Area */}
        <main className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-4xl mx-auto ">
            {/* Vocabulary Card */}
            {currentWord && (
              <VocabCard
                word={currentWord.word}
                pronunciation={currentWord.pronunciation}
                definition={currentWord.definition}
                examples={currentWord.examples}
                isLearned={currentWord.isLearned}
                onMarkLearned={handleMarkLearned}
                onPlayPronunciation={handlePlayPronunciation}
              />
            )}

            {/* Navigation Controls */}
            <div className="bg-transparent rounded-lg ">
              <LessonNavigation
                currentIndex={currentWordIndex}
                total={lessonData.vocabularyWords.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                disablePrevious={currentWordIndex === 0}
                disableNext={
                  currentWordIndex === lessonData.vocabularyWords.length - 1
                }
              />
            </div>

            {/* Lesson Overview */}
            <LessonOverview
              words={lessonData.vocabularyWords}
              onSelect={handleSelectWord}
              currentWordId={currentWord?.id}
            />
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default LessonDetail;
