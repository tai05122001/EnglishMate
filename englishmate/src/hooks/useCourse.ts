import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  setCourseInfo,
  setTotalWords,
  setDesiredLessons,
  setLessons,
  setVocabularyData,
  setCourseConfig,
  setIsPreviewVisible,
  setEditedLessons,
  setFileUploaded,
  setCurrentLessonId,
  resetCourseState,
} from "@/store/courseSlice";
import type { LessonDTO, VocabularyWordDTO } from "@/types";

export const useCourse = () => {
  const dispatch = useDispatch();
  const courseState = useSelector((state: RootState) => state.course);

  return {
    // State
    courseInfo: courseState.courseInfo,
    courseConfig: courseState.courseConfig,
    totalWords: courseState.totalWords,
    desiredLessons: courseState.desiredLessons,
    lessons: courseState.lessons,
    vocabularyData: courseState.vocabularyData,
    isPreviewVisible: courseState.isPreviewVisible,
    editedLessons: courseState.editedLessons,
    fileUploaded: courseState.fileUploaded,
    currentLessonId: courseState.currentLessonId,

    // Actions
    updateCourseInfo: (info: any) => dispatch(setCourseInfo(info)),
    updateTotalWords: (count: number) => dispatch(setTotalWords(count)),
    updateDesiredLessons: (count: number) => dispatch(setDesiredLessons(count)),
    updateLessons: (lessons: LessonDTO[]) => dispatch(setLessons(lessons)),
    updateVocabularyData: (data: VocabularyWordDTO[]) =>
      dispatch(setVocabularyData(data)),
    updateCourseConfig: (config: any) => dispatch(setCourseConfig(config)),
    showPreview: (isVisible: boolean) =>
      dispatch(setIsPreviewVisible(isVisible)),
    updateEditedLessons: (lessons: LessonDTO[]) =>
      dispatch(setEditedLessons(lessons)),
    updateFileUploaded: (isUploaded: boolean) =>
      dispatch(setFileUploaded(isUploaded)),
    setCurrentLesson: (lessonId: string | null) =>
      dispatch(setCurrentLessonId(lessonId)),
    resetCourse: () => dispatch(resetCourseState()),
  };
};
