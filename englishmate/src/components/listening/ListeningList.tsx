import Pagination from "@/components/ui/pagination";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import type { ListeningLessonDTO } from "@/types";
import ListeningCard from "./ListeningCard";
import { useApi } from "@/hooks/useApi";
import { toast } from "sonner";

interface ListeningListProps {
  level: string;
  topic: string;
  onSelect: (id: number) => void;
  search?: string;
}

const PAGE_SIZE = 1;

const ListeningList: React.FC = () => {
  const { data: lessons, loading, error } = useApi<ListeningLessonDTO[]>(
    () => axiosInstance.get("/api/public/listening/lessons"),
    []
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {(lessons || []).map(lesson => (
        <ListeningCard key={lesson.id} lesson={lesson} onStart={() => { }} />
      ))}
    </div>
  );
};

export default ListeningList;
