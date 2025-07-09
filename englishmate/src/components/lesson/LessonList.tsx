import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon, CheckIcon, XIcon } from "lucide-react";
import * as XLSX from "xlsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { LessonDTO, VocabularyWordDTO } from "@/types";

export interface Lesson {
  id: number;
  name: string;
  wordCount: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  vocabularyData?: VocabularyWordDTO[]; // Added vocabulary data
}

interface LessonListProps {
  lessons: LessonDTO[];
  onViewDetails: (
    lessonId: number,
    vocabularyData?: VocabularyWordDTO[]
  ) => void; // Updated to pass vocabulary data
  onEdit: (lessonId: number, updatedLesson: Partial<LessonDTO>) => void;
  onDelete: (lessonId: number) => void;
  onRecalculate?: (totalLessons: number) => void;
  onLessonsChanged?: (updatedLessons: LessonDTO[]) => void;
  constantTotalWords?: number;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  onViewDetails,
  onEdit,
  onDelete,
  onRecalculate,
  onLessonsChanged,
  constantTotalWords,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [totalWords, setTotalWords] = useState<number>(0);
  const [desiredLessons, setDesiredLessons] = useState<number>(10);
  const [wordsPerLesson, setWordsPerLesson] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [allVocabularyData, setAllVocabularyData] = useState<
    VocabularyWordDTO[]
  >([]);

  // Calculate total words from lessons if constantTotalWords is not provided
  const calculatedTotalWords = React.useMemo(() => {
    if (constantTotalWords !== undefined) {
      return constantTotalWords;
    }
    return lessons.reduce(
      (sum, lesson) => sum + lesson.vocabularyWords.length,
      0
    );
  }, [lessons, constantTotalWords]);

  // Track which lesson is currently being edited
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
  // Store edited values temporarily
  const [editValues, setEditValues] = useState<{
    name: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
  }>({
    name: "",
    difficulty: "Beginner",
  });

  // Distribute vocabulary data among lessons whenever allVocabularyData changes
  useEffect(() => {
    if (allVocabularyData.length > 0 && lessons.length > 0) {
      distributeVocabularyToLessons();
    }
  }, [allVocabularyData, lessons.length]);

  // Function to distribute vocabulary data among lessons
  const distributeVocabularyToLessons = () => {
    if (allVocabularyData.length === 0 || lessons.length === 0) return;

    const vocabularyCount = allVocabularyData.length;
    const updatedLessons = [...lessons];
    const wordsPerLesson = Math.ceil(vocabularyCount / lessons.length);

    for (let i = 0; i < updatedLessons.length; i++) {
      const startIndex = i * wordsPerLesson;
      const endIndex = Math.min((i + 1) * wordsPerLesson, vocabularyCount);
      updatedLessons[i] = {
        ...updatedLessons[i],
        vocabularyWords: allVocabularyData.slice(startIndex, endIndex),
      };
    }

    if (onLessonsChanged) {
      onLessonsChanged(updatedLessons);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDesiredLessonsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value) || 0;
    setDesiredLessons(value);
    if (value > 0 && totalWords > 0) {
      setWordsPerLesson(Math.ceil(totalWords / value));
    }
  };

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processExcelFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<
          string,
          any
        >[];

        // Parse vocabulary data from Excel
        const vocabularyData: VocabularyWordDTO[] = jsonData.map(
          (row, index) => {
            const word = row.Word || row.word || "";
            const definition = row.Definition || row.definition || "";
            const pronunciation =
              row.IPA || row.Pronunciation || row.pronunciation || "";

            // Create example sentences
            let examples = [];
            if (row["Example Sentence"] || row.Example) {
              const exampleText = row["Example Sentence"] || row.Example || "";
              examples.push({
                text: exampleText,
                highlightedWord: word,
              });
            }

            // Create up to 3 examples if available
            if (row["Example Sentence 2"] || row["Example 2"]) {
              examples.push({
                text: row["Example Sentence 2"] || row["Example 2"],
                highlightedWord: word,
              });
            }

            if (row["Example Sentence 3"] || row["Example 3"]) {
              examples.push({
                text: row["Example Sentence 3"] || row["Example 3"],
                highlightedWord: word,
              });
            }

            // If no examples were found, create a default one
            if (examples.length === 0) {
              examples.push({
                text: `This is an example with the word ${word}.`,
                highlightedWord: word,
              });
            }

            return {
              id: index + 1,
              word,
              pronunciation,
              definition,
              examples: examples,
              isLearned: false,
            };
          }
        );

        setAllVocabularyData(vocabularyData);
        setTotalWords(vocabularyData.length);

        if (desiredLessons > 0) {
          setWordsPerLesson(Math.ceil(vocabularyData.length / desiredLessons));
        }
      };
      reader.readAsBinaryString(file);
    },
    [desiredLessons]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          processExcelFile(file);
        }
      }
    },
    [processExcelFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          processExcelFile(file);
        }
      }
    },
    [processExcelFile]
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Function to download sample Excel file
  const downloadSampleExcel = () => {
    // Sample data for vocabulary Excel
    const sampleData = [
      {
        Word: "abandon",
        Definition: "to leave someone or something behind forever",
        "Example Sentence": "The crew had to abandon the sinking ship.",
        "Translation (Optional)": "từ bỏ, rời bỏ",
        "Part of Speech": "verb",
        IPA: "/əˈbændən/",
      },
      {
        Word: "absurd",
        Definition: "completely ridiculous; not logical and sensible",
        "Example Sentence":
          "The idea of a vacation in Antarctica seemed absurd to her.",
        "Translation (Optional)": "phi lý, vô lý",
        "Part of Speech": "adjective",
        IPA: "/əbˈsɜːrd/",
      },
      {
        Word: "accomplish",
        Definition: "to succeed in doing something",
        "Example Sentence": "She accomplished her goal of running a marathon.",
        "Translation (Optional)": "hoàn thành, đạt được",
        "Part of Speech": "verb",
        IPA: "/əˈkɒmplɪʃ/",
      },
      {
        Word: "diligent",
        Definition: "showing care and effort in your work or duties",
        "Example Sentence":
          "The diligent student studied every night for the exam.",
        "Translation (Optional)": "chăm chỉ, cần mẫn",
        "Part of Speech": "adjective",
        IPA: "/ˈdɪlɪdʒənt/",
      },
      {
        Word: "eloquent",
        Definition: "fluent or persuasive in speaking or writing",
        "Example Sentence": "His eloquent speech moved the entire audience.",
        "Translation (Optional)": "hùng biện, lưu loát",
        "Part of Speech": "adjective",
        IPA: "/ˈeləkwənt/",
      },
      {
        Word: "fascinate",
        Definition: "to attract and hold the attention of someone strongly",
        "Example Sentence":
          "Stars have always fascinated humans throughout history.",
        "Translation (Optional)": "mê hoặc, hấp dẫn",
        "Part of Speech": "verb",
        IPA: "/ˈfæsɪneɪt/",
      },
      {
        Word: "genuine",
        Definition: "truly what something is said to be; authentic",
        "Example Sentence": "Her smile was genuine and warm.",
        "Translation (Optional)": "chân thật, thật sự",
        "Part of Speech": "adjective",
        IPA: "/ˈdʒenjuɪn/",
      },
      {
        Word: "hesitate",
        Definition: "to pause before saying or doing something",
        "Example Sentence":
          "He hesitated before answering the difficult question.",
        "Translation (Optional)": "lưỡng lự, do dự",
        "Part of Speech": "verb",
        IPA: "/ˈhezɪteɪt/",
      },
      {
        Word: "inevitable",
        Definition: "certain to happen and impossible to avoid",
        "Example Sentence": "Change is inevitable as we grow older.",
        "Translation (Optional)": "không thể tránh khỏi",
        "Part of Speech": "adjective",
        IPA: "/ɪnˈevɪtəbl/",
      },
      {
        Word: "jubilant",
        Definition: "feeling or expressing great happiness",
        "Example Sentence":
          "The team was jubilant after winning the championship.",
        "Translation (Optional)": "hân hoan, vui mừng",
        "Part of Speech": "adjective",
        IPA: "/ˈdʒuːbɪlənt/",
      },
    ];

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(sampleData);

    // Add column widths for better readability
    const wscols = [
      { wch: 15 }, // Word
      { wch: 40 }, // Definition
      { wch: 50 }, // Example
      { wch: 25 }, // Translation
      { wch: 15 }, // Part of Speech
      { wch: 15 }, // Difficulty
      { wch: 15 }, // IPA
    ];
    ws["!cols"] = wscols;

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vocabulary");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "vocabulary_sample.xlsx");
  };

  // Start editing a lesson
  const handleStartEdit = (lesson: LessonDTO) => {
    setEditingLessonId(lesson.id);
    setEditValues({
      name: lesson.name,
      difficulty: lesson.level as "Beginner" | "Intermediate" | "Advanced",
    });
  };

  // Save edited lesson
  const handleSaveEdit = (lessonId: number) => {
    onEdit(lessonId, editValues);
    setEditingLessonId(null);

    // Notify parent component about the change using onLessonsChanged if available
    if (onLessonsChanged) {
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, ...editValues } : lesson
      );
      onLessonsChanged(updatedLessons);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingLessonId(null);
  };

  // Update edit values when input changes
  const handleEditChange = (field: string, value: string) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle view details with vocabulary data
  const handleViewDetailsWithVocabulary = (lessonId: number) => {
    const lesson = lessons.find((lesson) => lesson.id === lessonId);
    console.log("lesson", lesson);
    if (lesson) {
      onViewDetails(lessonId, lesson.vocabularyWords);
    } else {
      onViewDetails(lessonId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lesson ID</TableHead>
              <TableHead className="w-[200px]">Lesson Name</TableHead>
              <TableHead>Vocabulary Count</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.id}</TableCell>
                <TableCell className="font-medium">
                  {editingLessonId === lesson.id ? (
                    <Input
                      value={editValues.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    lesson.name
                  )}
                </TableCell>
                <TableCell>{lesson.vocabularyWords.length} words</TableCell>
                <TableCell>
                  {editingLessonId === lesson.id ? (
                    <Select
                      value={editValues.difficulty}
                      onValueChange={(
                        value: "Beginner" | "Intermediate" | "Advanced"
                      ) => handleEditChange("difficulty", value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      className={`font-medium ${getDifficultyColor(
                        lesson.level
                      )}`}
                    >
                      {lesson.level}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {editingLessonId === lesson.id ? (
                    <>
                      <Button
                        variant="action"
                        size="sm"
                        className="border-none bg-green-600 hover:bg-green-700 focus:border-none focus:ring-0 transition-all duration-300 ease-in-out"
                        onClick={() => handleSaveEdit(lesson.id)}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="action"
                        size="sm"
                        className="border-none bg-gray-500 hover:bg-gray-600 focus:border-none focus:ring-0 transition-all duration-300 ease-in-out"
                        onClick={handleCancelEdit}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="action"
                        size="sm"
                        className="border-none bg-blue-700/70 hover:bg-blue-700 focus:border-none focus:ring-0 transition-all duration-300 ease-in-out"
                        onClick={() =>
                          handleViewDetailsWithVocabulary(lesson.id)
                        }
                      >
                        <EyeIcon />
                      </Button>
                      <Button
                        variant="action"
                        size="sm"
                        className="border-none bg-green-700/70 hover:bg-green-700 focus:border-none focus:ring-0 transition-all duration-300 ease-in-out"
                        onClick={() => handleStartEdit(lesson)}
                      >
                        <PencilIcon />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LessonList;
