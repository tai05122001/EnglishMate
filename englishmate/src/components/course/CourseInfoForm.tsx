import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CourseUploadField from "./CourseUploadField";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import * as XLSX from "xlsx";
import type { VocabularyWord } from "@/components/lesson";

const formSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  poster: z.any().optional(),
  vocabularyFile: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CourseInfoFormProps {
  onSubmit: (values: FormValues) => void;
  className?: string;
  onTotalWordsCalculated?: (totalWords: number) => void;
  onVocabularyDataLoaded?: (vocabularyData: VocabularyWord[]) => void;
  initialValues?: {
    title: string;
    poster: File | null;
    vocabularyFile: File | null;
  };
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({
  onSubmit,
  className,
  onTotalWordsCalculated,
  onVocabularyDataLoaded,
  initialValues,
}) => {
  const [processingFile, setProcessingFile] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || "",
      poster: initialValues?.poster || undefined,
      vocabularyFile: initialValues?.vocabularyFile || undefined,
    },
  });

  // Apply initialValues when they change
  useEffect(() => {
    if (initialValues) {
      form.setValue("title", initialValues.title || "");
      if (initialValues.poster) {
        form.setValue("poster", initialValues.poster);
      }
      if (initialValues.vocabularyFile) {
        form.setValue("vocabularyFile", initialValues.vocabularyFile);
      }
    }
  }, [initialValues, form]);

  const handlePosterChange = (file: File | null) => {
    form.setValue("poster", file);
  };

  const handleVocabularyFileChange = (file: File | null) => {
    form.setValue("vocabularyFile", file);

    if (
      file &&
      (file.name.endsWith(".xlsx") ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".xls"))
    ) {
      setProcessingFile(true);

      // Process Excel file to count words
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<
            string,
            any
          >[];

          // Process vocabulary data
          const vocabularyData: VocabularyWord[] = jsonData.map(
            (row, index) => {
              const word = row.Word || row.word || "";
              const definition = row.Definition || row.definition || "";
              const pronunciation =
                row.IPA || row.Pronunciation || row.pronunciation || "";

              // Create example sentences
              let examples = [];
              if (row["Example Sentence"] || row.Example) {
                const exampleText =
                  row["Example Sentence"] || row.Example || "";
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
                id: `word-${index + 1}`,
                word,
                pronunciation,
                definition,
                examples,
                isLearned: false,
              };
            }
          );

          // Pass both the count and the data to parent components
          if (onTotalWordsCalculated) {
            onTotalWordsCalculated(vocabularyData.length);
          }
          if (onVocabularyDataLoaded) {
            onVocabularyDataLoaded(vocabularyData);
          }
        } catch (error) {
          console.error("Error processing Excel file:", error);
        } finally {
          setProcessingFile(false);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  // Function to download sample Excel file
  const downloadSampleExcel = () => {
    // Sample data for vocabulary Excel with IPA column
    const sampleData = [
      {
        Word: "abandon",
        IPA: "/əˈbæn.dən/",
        Definition: "to leave someone or something behind forever",
        "Example Sentence": "The crew had to abandon the sinking ship.",
        "Translation (Optional)": "từ bỏ, rời bỏ",
        "Part of Speech": "verb",
        Difficulty: "Intermediate",
      },
      {
        Word: "absurd",
        IPA: "/əbˈsɜːrd/",
        Definition: "completely ridiculous; not logical and sensible",
        "Example Sentence":
          "The idea of a vacation in Antarctica seemed absurd to her.",
        "Translation (Optional)": "phi lý, vô lý",
        "Part of Speech": "adjective",
        Difficulty: "Intermediate",
      },
      {
        Word: "accomplish",
        IPA: "/əˈkʌm.plɪʃ/",
        Definition: "to succeed in doing something",
        "Example Sentence": "She accomplished her goal of running a marathon.",
        "Translation (Optional)": "hoàn thành, đạt được",
        "Part of Speech": "verb",
        Difficulty: "Beginner",
      },
      {
        Word: "diligent",
        IPA: "/ˈdɪl.ɪ.dʒənt/",
        Definition: "showing care and effort in your work or duties",
        "Example Sentence":
          "The diligent student studied every night for the exam.",
        "Translation (Optional)": "chăm chỉ, cần mẫn",
        "Part of Speech": "adjective",
        Difficulty: "Advanced",
      },
      {
        Word: "eloquent",
        IPA: "/ˈel.ə.kwənt/",
        Definition: "fluent or persuasive in speaking or writing",
        "Example Sentence": "His eloquent speech moved the entire audience.",
        "Translation (Optional)": "hùng biện, lưu loát",
        "Part of Speech": "adjective",
        Difficulty: "Advanced",
      },
    ];

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(sampleData);

    // Add column widths for better readability
    const wscols = [
      { wch: 15 }, // Word
      { wch: 15 }, // IPA
      { wch: 40 }, // Definition
      { wch: 50 }, // Example
      { wch: 25 }, // Translation
      { wch: 15 }, // Part of Speech
      { wch: 15 }, // Difficulty
    ];
    ws["!cols"] = wscols;

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vocabulary");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "vocabulary_sample.xlsx");
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Course Information & Vocabulary File
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Course Title:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Intermediate English Vocabulary"
                      {...field}
                      className="h-10 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CourseUploadField
              label="Course Poster (Optional):"
              hint="Drag and drop your image file (JPG, PNG) here, or click to browse."
              acceptType="image/jpeg,image/png"
              uploadText="Drop image here or click to upload"
              onChange={handlePosterChange}
              className="pt-4"
            />

            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Vocabulary Excel File:
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                  onClick={downloadSampleExcel}
                >
                  <DownloadIcon className="w-4 h-4" />
                  Download Sample Template
                </Button>
              </div>
              <CourseUploadField
                label=""
                hint="Drag and drop your Excel (.xlsx, .csv) file here, or click to browse."
                acceptType=".xlsx,.csv"
                uploadText={
                  processingFile
                    ? "Processing file..."
                    : "Drop Excel file here or click to upload"
                }
                onChange={handleVocabularyFileChange}
                className=""
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CourseInfoForm;
