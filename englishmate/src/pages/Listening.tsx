import ListeningDetail from "@/components/listening/ListeningDetail";
import ListeningList from "@/components/listening/ListeningList";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import axiosInstance from "@/lib/axios";
import { Badge, CheckCircle, ChevronDown, Filter, Headphones, Lightbulb, Search } from "lucide-react";
import React, { useState } from "react";

const DEFAULT_LEVELS = ["EASY", "MEDIUM", "HARD"];
const DEFAULT_TOPICS = ["Daily Conversation", "Work", "Academic", "Travel"];

const Listening: React.FC = () => {
  const [level, setLevel] = useState("All");
  const [topic, setTopic] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const { data: levels, loading: loadingLevels } = useApi<string[]>(
    () => axiosInstance.get('/api/public/listening/levels'),
    []
  );

  const { data: topics, loading: loadingTopics } = useApi<string[]>(
    () => axiosInstance.get('/api/public/listening/topics'),
    []
  );

  const handleReset = () => {
    setLevel("All");
    setTopic("All");
    setSearch("");
  };

  return (
    <>
      {/* Header section with gradient and SVG shape */}
      <section className="w-full py-16 text-center bg-gradient-to-br from-[#e0f7f5] via-[#f3fafe] to-white relative overflow-hidden">
        {/* SVG shape */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 0 }}>
          <path fill="#02b2a4" fillOpacity="0.08" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-2 text-[#02b2a4]">
            <Headphones className="w-10 h-10 text-[#02b2a4]" /> Listening Practice
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Improve your English listening skills with interactive exercises and real-world audio.
          </p>
        </div>
      </section>
      <section className="mt-8 px-4 md:px-0 max-w-7xl mx-auto">
        <div className="">
          {/* Modern Search & Filter Bar - only show in list view */}
          {selectedId === null && (
            <div className="w-full mb-8" id="listening-search-bar">
              <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row items-center gap-4 relative">
                <div className="hidden md:flex items-center justify-center w-10 h-10 bg-[#e0f7f5] rounded-full mr-2">
                  <Headphones className="text-[#02b2a4] w-6 h-6" />
                </div>
                {/* Search input with icon */}
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search listening exercises..."
                    className="w-full border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#02b2a4] text-gray-700"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {/* Filter icon */}
                <span className="text-gray-400">
                  <Filter size={20} />
                </span>
                {/* Level dropdown with icon */}
                <div className="relative flex items-center">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#02b2a4]">
                    <ChevronDown size={16} />
                  </span>
                  <select
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                    className="border border-gray-200 rounded-lg px-7 py-2 focus:outline-none focus:ring-2 focus:ring-[#02b2a4] min-w-[100px] appearance-none"
                  >
                    <option value="All">All Levels</option>
                    {loadingLevels ? (
                      <option disabled>Loading...</option>
                    ) : (
                      (levels && levels.length > 0 ? levels : DEFAULT_LEVELS).map(l => <option key={l} value={l}>{l}</option>)
                    )}
                  </select>
                </div>
                {/* Topic dropdown with icon */}
                <div className="relative flex items-center gap-1">
                  <span className="text-gray-500 text-sm">Category</span>
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#02b2a4]">
                    <ChevronDown size={16} />
                  </span>
                  <select
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="border border-gray-200 rounded-lg px-7 py-2 focus:outline-none focus:ring-2 focus:ring-[#02b2a4] min-w-[100px] appearance-none"
                  >
                    <option value="All">All Topics</option>
                    {loadingTopics ? (
                      <option disabled>Loading...</option>
                    ) : (
                      (topics && topics.length > 0 ? topics : DEFAULT_TOPICS).map(t => <option key={t} value={t}>{t}</option>)
                    )}
                  </select>
                </div>
                {/* Reset button */}
                <Button
                  variant="outline"
                  className="ml-2 border-[#02b2a4] text-[#02b2a4] hover:bg-[#e0f7f5]"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
              {/* Tips for better listening */}
              <div className="mt-4 bg-[#e0f7f5] border-l-4 border-[#02b2a4] rounded-lg p-4 flex items-start gap-3 animate-fade-in">
                <Lightbulb className="text-[#02b2a4] w-6 h-6 mt-1" />
                <div>
                  <div className="font-semibold text-[#02b2a4] mb-1">Tips for better listening</div>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    <li>Listen to the audio once without reading the transcript.</li>
                    <li>Try to catch the main idea before focusing on details.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {/* List or Detail */}
          {selectedId !== null ? (
            <ListeningDetail listeningId={selectedId} onBack={() => setSelectedId(null)} />
          ) : (
            <ListeningList />
          )}
        </div>
      </section>

    </>
  );
};

export default Listening;