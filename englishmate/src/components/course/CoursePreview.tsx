import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import StatsCard from "./StatsCard";
import LessonList from "../lesson/LessonList";
import type { LessonDTO, VocabularyWordDTO } from "@/types";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { useCourse } from "@/hooks/useCourse";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface CoursePreviewProps {
  totalWords: number;
  totalLessons: number;
  wordsPerLesson: number;
  lessons: LessonDTO[];
  onSubmit: (notes: string, lessons: LessonDTO[]) => void;
  onLessonsChanged: (lessons: LessonDTO[]) => void;
  className?: string;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({
  lessons,
  onSubmit,
  onLessonsChanged,
  className,
}) => {
  const [notes, setNotes] = React.useState("");
  const [currentLessons, setCurrentLessons] = useState<LessonDTO[]>(lessons);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setCurrentLesson } = useCourse();

  // Update currentLessons when props change
  React.useEffect(() => {
    setCurrentLessons(lessons);
  }, [lessons]);

  // Calculate actual stats from current lessons
  const stats = React.useMemo(() => {
    const actualTotalWords = currentLessons.reduce(
      (sum, lesson) => sum + lesson.vocabularyWords.length,
      0
    );
    const actualTotalLessons = currentLessons.length;
    const actualWordsPerLesson =
      actualTotalLessons > 0
        ? Math.round(actualTotalWords / actualTotalLessons)
        : 0;

    return {
      totalWords: actualTotalWords,
      totalLessons: actualTotalLessons,
      wordsPerLesson: actualWordsPerLesson,
      quizCount: Math.round(actualTotalLessons / 10),
    };
  }, [currentLessons]);

  const handleViewDetails = (
    lessonId: number,
    vocabularyData?: VocabularyWordDTO[]
  ) => {
    // Find lesson data by ID
    const lessonData = currentLessons.find((lesson) => lesson.id === lessonId);

    if (lessonData) {
      // Store the current lessonId in Redux
      setCurrentLesson(lessonId.toString());

      // Create lesson data object using structure expected by LessonDetail
      const vocabularyLesson = {
        id: `lesson-${lessonId}`,
        title: lessonData.name,
        description: `Learn ${lessonData.vocabularyWords.length} vocabulary words (${lessonData.level} level)`,
        courseId: "course-1",
        // Use either the passed vocabularyData or lessonData.vocabularyData or an empty array
        vocabularyWords: vocabularyData || lessonData.vocabularyWords || [],
      };

      // Save data to localStorage for LessonDetail to access
      localStorage.setItem(
        "current_lesson_data",
        JSON.stringify(vocabularyLesson)
      );

      // Navigate to lesson detail page
      navigate(`/lesson/preview/${lessonId}`);
    } else {
    }
  };

  const handleEdit = (lessonId: number, updatedData: Partial<LessonDTO>) => {
    // Update lesson in local state
    const updatedLessons = currentLessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, ...updatedData } : lesson
    );

    setCurrentLessons(updatedLessons);

    // Notify parent component if callback exists
    if (onLessonsChanged) {
      onLessonsChanged(updatedLessons);
    }
  };

  const handleDelete = (lessonId: number) => {
    // Filter out the deleted lesson
    const updatedLessons = currentLessons.filter(
      (lesson) => lesson.id !== lessonId
    );

    setCurrentLessons(updatedLessons);

    // Notify parent component if callback exists
    if (onLessonsChanged) {
      onLessonsChanged(updatedLessons);
    }
  };

  const handleRecalculate = (remainingLessonsCount: number) => {
    if (remainingLessonsCount <= 0) return;

    // Calculate the new words per lesson
    const newWordsPerLesson = Math.ceil(
      stats.totalWords / remainingLessonsCount
    );

    // Update word counts in each lesson but preserve IDs and other properties
    const recalculatedLessons = currentLessons.map((lesson) => ({
      ...lesson,
      wordCount: newWordsPerLesson,
    }));

    setCurrentLessons(recalculatedLessons);

    // Notify parent component if callback exists
    if (onLessonsChanged) {
      onLessonsChanged(recalculatedLessons);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    setDialogOpen(false);
    onSubmit(notes, currentLessons);
  };

  const handleLessonsChanged = (updatedLessons: LessonDTO[]) => {
    setCurrentLessons(updatedLessons);
    onLessonsChanged(updatedLessons);
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
    >
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Lesson Preview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            value={stats.totalWords}
            label="Total Words"
            variant="primary"
          />

          <StatsCard
            value={stats.totalLessons}
            label="Total Lessons"
            variant="secondary"
          />

          <StatsCard
            value={stats.wordsPerLesson}
            label="Words per Lesson"
            variant="success"
          />

          <StatsCard value={stats.quizCount} label="Quiz" variant="warning" />
        </div>

        <div>
          <LessonList
            lessons={currentLessons}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRecalculate={handleRecalculate}
            onLessonsChanged={handleLessonsChanged}
          />
        </div>

        <div className="pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes for Admin (Optional):
          </label>
          <Textarea
            placeholder="Add any special requests or context for the admin..."
            className="min-h-[100px]"
            value={notes}
            onChange={handleNotesChange}
          />
        </div>

        <Button
          onClick={handleOpenDialog}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
        >
          Submit for Approval
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Submission</DialogTitle>
              <DialogDescription>
                Are you sure you want to submit this course for approval? Once
                submitted, you will not be able to make changes until it's
                reviewed by an administrator.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="action"
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={handleSubmit}
              >
                Confirm Submission
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CoursePreview;
