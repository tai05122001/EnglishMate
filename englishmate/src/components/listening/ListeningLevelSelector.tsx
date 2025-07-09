import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";
import { useEffect, useState } from "react";

interface ListeningLevelSelectorProps {
  value: string;
  onChange: (v: string) => void;
}

const ListeningLevelSelector = ({ value, onChange }: ListeningLevelSelectorProps) => {
  const [levels, setLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ApiResponse<string[]>>('/api/public/listening/levels');
        setLevels(response.data.data);
      } catch (error) {
        console.error("Error fetching levels:", error);
        // Fallback to default levels
        setLevels(["EASY", "MEDIUM", "HARD"]);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  if (loading) {
    return (
      <select className="border rounded px-2 py-1" disabled>
        <option>Loading...</option>
      </select>
    );
  }

  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="border rounded px-2 py-1">
      <option value="All">All Levels</option>
      {levels.map(level => (
        <option key={level} value={level}>{level}</option>
      ))}
    </select>
  );
};

export default ListeningLevelSelector; 
