import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ListeningLessonDTO,
  ListeningLessonDetailDTO,
  ApiResponse,
} from "@/types";

export const listeningApi = createApi({
  reducerPath: "listeningApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "https://api.englishmate.com",
  }),
  endpoints: (builder) => ({
    getAllListeningLessons: builder.query<
      ApiResponse<{
        content: ListeningLessonDTO[];
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;
      }>,
      {
        level?: string;
        topic?: string;
        title?: string;
        page?: number;
        size?: number;
      } | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.level && params.level !== "All")
          searchParams.append("level", params.level);
        if (params?.topic && params.topic !== "All")
          searchParams.append("topic", params.topic);
        if (params?.title) searchParams.append("title", params.title);
        if (params?.page !== undefined)
          searchParams.append("page", params.page.toString());
        if (params?.size !== undefined)
          searchParams.append("size", params.size.toString());
        return `/api/public/listening/lessons?${searchParams.toString()}`;
      },
    }),
    getListeningLessonById: builder.query<
      ApiResponse<ListeningLessonDetailDTO>,
      number
    >({
      query: (id) => `/api/public/listening/lessons/${id}`,
    }),
    getAllLessonLevels: builder.query<ApiResponse<string[]>, void>({
      query: () => "/api/public/listening/levels",
    }),
    getAllTopics: builder.query<ApiResponse<string[]>, void>({
      query: () => "/api/public/listening/topics",
    }),
  }),
});

export const {
  useGetAllListeningLessonsQuery,
  useGetListeningLessonByIdQuery,
  useGetAllLessonLevelsQuery,
  useGetAllTopicsQuery,
} = listeningApi;
