import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
  CourseInfoForm,
  CourseConfigForm,
  CoursePreview,
} from "@/components/course";
import type { Lesson } from "@/components/course";
import type { LessonDTO, VocabularyWordDTO } from "@/types";
import { useCourse } from "@/hooks/useCourse";

// Helper function to distribute words optimally with minimum 10 words per lesson
const distributeWords = (
  totalWords: number,
  numLessons: number
): { wordCounts: number[] } => {
  if (totalWords === 0 || numLessons === 0) {
    return { wordCounts: [] };
  }

  // Ensure minimum 10 words per lesson
  const minWordsPerLesson = 10;
  const maxPossibleLessons = Math.floor(totalWords / minWordsPerLesson);
  const adjustedNumLessons = Math.min(numLessons, maxPossibleLessons);

  if (adjustedNumLessons <= 0) {
    return { wordCounts: [totalWords] }; // All words in one lesson
  }

  if (adjustedNumLessons === 1) {
    return { wordCounts: [totalWords] }; // All words in one lesson
  }

  // Calculate base words per lesson and remaining words
  const baseWordsPerLesson = Math.floor(totalWords / adjustedNumLessons);
  const remainingWords = totalWords % adjustedNumLessons;

  // Distribute words evenly, adding one extra word to early lessons if there are remaining words
  const wordCounts = Array(adjustedNumLessons).fill(baseWordsPerLesson);
  for (let i = 0; i < remainingWords; i++) {
    wordCounts[i]++;
  }

  return { wordCounts };
};

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();

  // Use Redux state and actions through the custom hook
  const {
    courseInfo,
    courseConfig,
    totalWords,
    desiredLessons,
    lessons,
    vocabularyData,
    isPreviewVisible,
    editedLessons,
    fileUploaded,

    // Actions
    updateCourseInfo,
    updateTotalWords,
    updateDesiredLessons,
    updateLessons,
    updateVocabularyData,
    updateCourseConfig,
    showPreview,
    updateEditedLessons,
    updateFileUploaded,
  } = useCourse();

  // Generate dynamic lessons based on total words and number of lessons
  const generateLessons = (total: number, numLessons: number): LessonDTO[] => {
    if (total === 0 || numLessons === 0) return [];

    // Get optimal distribution of words per lesson
    const { wordCounts } = distributeWords(total, numLessons);

    // Create lessons with the distributed word counts and vocabulary data
    const generatedLessons = wordCounts.map((wordCount, index) => {
      // Ensure IDs always start from 1 for each new file
      const lessonId = index + 1;

      // Calculate vocabulary slice for this lesson
      const startIndex = index * wordCount;
      const endIndex = Math.min(startIndex + wordCount, vocabularyData.length);
      const lessonVocabulary = vocabularyData.slice(startIndex, endIndex);

      // Randomly assign difficulty
      const difficultyOptions: ("Beginner" | "Intermediate" | "Advanced")[] = [
        "Beginner",
        "Intermediate",
        "Advanced",
      ];
      const randomDifficulty =
        difficultyOptions[Math.floor(Math.random() * difficultyOptions.length)];

      return {
        id: lessonId,
        name: `Lesson ${lessonId}: ${
          index % 3 === 0
            ? "Business"
            : index % 2 === 0
            ? "Communication"
            : "Vocabulary"
        } ${lessonId}`,
        vocabularyWords: lessonVocabulary,
        level: randomDifficulty,
      };
    });

    return generatedLessons;
  };

  // Generate mock lessons based on current configuration
  const mockLessons = React.useMemo(() => {
    if (editedLessons.length > 0) {
      return editedLessons;
    }

    const numLessons = Number(courseConfig?.numLessons || 1);
    const generatedLessons = generateLessons(totalWords, numLessons);

    return generatedLessons;
  }, [
    totalWords,
    courseConfig?.numLessons,
    editedLessons,
    fileUploaded,
    vocabularyData,
  ]);

  const handleCourseInfoSubmit = (data: any) => {
    updateCourseInfo(data);
  };

  const handleTotalWordsCalculated = (total: number) => {
    updateTotalWords(total);
    const newLessons = generateLessons(total, desiredLessons);
    updateLessons(newLessons);
  };

  const handleVocabularyDataLoaded = (data: VocabularyWordDTO[]) => {
    updateVocabularyData(data);
    // Regenerate lessons with the new vocabulary data
    const newLessons = generateLessons(data.length, desiredLessons);
    updateLessons(newLessons);
    updateFileUploaded(true);
  };

  const handleCourseConfigSubmit = (data: any) => {
    updateCourseConfig(data);
    // Reset edited lessons when configuration changes
    updateEditedLessons([]);

    // Make sure numLessons doesn't exceed maximum possible lessons
    const maxPossibleLessons = Math.floor(totalWords / 10);
    const numLessons = Math.min(Number(data.numLessons), maxPossibleLessons);

    if (numLessons !== Number(data.numLessons)) {
      updateCourseConfig({
        ...data,
        numLessons: numLessons.toString(),
      });
    }
  };

  const handlePreview = () => {
    showPreview(true);
  };

  const handleLessonsChanged = (updatedLessons: LessonDTO[]) => {
    updateEditedLessons(updatedLessons);

    // Update course config to reflect new lesson count
    updateCourseConfig({
      ...courseConfig,
      numLessons: updatedLessons.length.toString(),
    });

    // Log the deleted lessons by comparing with current lessons
    const currentIds = new Set(mockLessons.map((lesson) => lesson.id));
    const updatedIds = new Set(updatedLessons.map((lesson) => lesson.id));

    // Find IDs that were in current but not in updated (deleted lessons)
    const deletedIds = [...currentIds].filter((id) => !updatedIds.has(id));

    if (deletedIds.length > 0) {
      console.log("Lessons deleted:", deletedIds);
    }

    console.log("Current lessons after update:", updatedLessons);
  };

  const handleCourseSubmit = (notes: string, lessons: LessonDTO[]) => {};

  const wordsPerLesson = React.useMemo(() => {
    if (!mockLessons.length) return 0;
    // We get the first regular lesson's word count
    return mockLessons.length > 1
      ? mockLessons[0].vocabularyWords.length
      : mockLessons[0].vocabularyWords.length;
  }, [mockLessons]);

  return (
    <MainLayout>
      <div className="pt-24 pb-12 px-4 md:px-0 max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Vocabulary Course
          </h1>
          <p className="text-gray-500 mt-2">
            Upload your vocabulary file and configure lesson settings
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left column: Step 1 & 2 */}
          {/* Step 1: Course Information Form */}
          <div>
            <CourseInfoForm
              onSubmit={handleCourseInfoSubmit}
              onTotalWordsCalculated={handleTotalWordsCalculated}
              onVocabularyDataLoaded={handleVocabularyDataLoaded}
              initialValues={courseInfo}
            />
          </div>

          {/* Step 2: Course Configuration Form */}
          <div>
            <CourseConfigForm
              totalWords={totalWords}
              onSubmit={handleCourseConfigSubmit}
              onPreview={handlePreview}
              initialValues={courseConfig}
            />
          </div>

          {/* Right column - Step 3: Preview */}
        </div>
        {isPreviewVisible && (
          <div>
            <CoursePreview
              totalWords={totalWords}
              totalLessons={Number(courseConfig?.numLessons || 1)}
              wordsPerLesson={wordsPerLesson}
              lessons={mockLessons}
              onSubmit={handleCourseSubmit}
              onLessonsChanged={handleLessonsChanged}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CreateCourse;
