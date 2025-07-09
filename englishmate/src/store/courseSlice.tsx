import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LessonDTO, VocabularyWordDTO } from "@/types";

interface CourseState {
  courseInfo: {
    title: string;
    poster: File | null;
    vocabularyFile: File | null;
  };
  courseConfig: {
    totalWords: string;
    numLessons: string;
    wordsPerLesson: string;
    quizletLink: string;
  };
  totalWords: number;
  desiredLessons: number;
  lessons: LessonDTO[];
  vocabularyData: VocabularyWordDTO[];
  isPreviewVisible: boolean;
  editedLessons: LessonDTO[];
  fileUploaded: boolean;
  currentLessonId: string | null;
}

const initialState: CourseState = {
  courseInfo: {
    title: "",
    poster: null,
    vocabularyFile: null,
  },
  courseConfig: {
    totalWords: "0",
    numLessons: "1",
    wordsPerLesson: "0 words/lesson",
    quizletLink: "",
  },
  totalWords: 0,
  desiredLessons: 10,
  lessons: [],
  vocabularyData: [],
  isPreviewVisible: false,
  editedLessons: [],
  fileUploaded: false,
  currentLessonId: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseInfo: (state, action: PayloadAction<any>) => {
      state.courseInfo = action.payload;
    },
    setTotalWords: (state, action: PayloadAction<number>) => {
      state.totalWords = action.payload;
    },
    setDesiredLessons: (state, action: PayloadAction<number>) => {
      state.desiredLessons = action.payload;
    },
    setLessons: (state, action: PayloadAction<LessonDTO[]>) => {
      state.lessons = action.payload;
    },
    setVocabularyData: (state, action: PayloadAction<VocabularyWordDTO[]>) => {
      state.vocabularyData = action.payload;
    },
    setCourseConfig: (state, action: PayloadAction<any>) => {
      state.courseConfig = action.payload;
    },
    setIsPreviewVisible: (state, action: PayloadAction<boolean>) => {
      state.isPreviewVisible = action.payload;
    },
    setEditedLessons: (state, action: PayloadAction<LessonDTO[]>) => {
      state.editedLessons = action.payload;
    },
    setFileUploaded: (state, action: PayloadAction<boolean>) => {
      state.fileUploaded = action.payload;
    },
    setCurrentLessonId: (state, action: PayloadAction<string | null>) => {
      state.currentLessonId = action.payload;
    },
    resetCourseState: () => initialState,
  },
});

export const {
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
} = courseSlice.actions;

export default courseSlice.reducer;
