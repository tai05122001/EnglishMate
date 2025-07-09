import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";
import { useEffect, useState } from "react";

interface ListeningTopicSelectorProps {
  value: string;
  onChange: (v: string) => void;
}

const ListeningTopicSelector = ({ value, onChange }: ListeningTopicSelectorProps) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ApiResponse<string[]>>('/api/public/listening/topics');
        setTopics(response.data.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
        // Fallback to default topics
        setTopics(["Daily Conversation", "Work", "Academic", "Travel"]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
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
      <option value="All">All Topics</option>
      {topics.map(topic => (
        <option key={topic} value={topic}>{topic}</option>
      ))}
    </select>
  );
};

export default ListeningTopicSelector;
