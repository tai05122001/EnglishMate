import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  totalWords: z.string(),
  numLessons: z.string().min(1, "Number of lessons is required"),
  wordsPerLesson: z.string(),
  quizletLink: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CourseConfigFormProps {
  totalWords: number;
  onSubmit: (values: FormValues) => void;
  onPreview: () => void;
  className?: string;
  initialValues?: {
    totalWords: string;
    numLessons: string;
    wordsPerLesson: string;
    quizletLink: string;
  };
}

// Function to calculate lesson distribution with minimum 10 words per lesson
const calculateLessonDistribution = (
  totalWords: number,
  numLessons: number
): {
  regularLessons: number;
  wordsPerRegularLesson: number;
  wordsInLastLesson: number;
  isValid: boolean;
  maxPossibleLessons: number;
  description: string;
} => {
  // If we don't have enough words for even 1 lesson
  if (totalWords < 10) {
    return {
      regularLessons: 0,
      wordsPerRegularLesson: 0,
      wordsInLastLesson: totalWords,
      isValid: totalWords > 0,
      maxPossibleLessons: totalWords > 0 ? 1 : 0,
      description:
        totalWords > 0
          ? `${totalWords} words in 1 lesson`
          : "No words available",
    };
  }

  // Calculate maximum possible lessons with minimum 10 words each
  const maxPossibleLessons = Math.floor(totalWords / 10);

  // If requested lessons is more than possible, adjust
  const adjustedNumLessons = Math.min(numLessons, maxPossibleLessons);

  if (adjustedNumLessons <= 0) {
    return {
      regularLessons: 0,
      wordsPerRegularLesson: 0,
      wordsInLastLesson: 0,
      isValid: false,
      maxPossibleLessons,
      description: "Invalid lesson count",
    };
  }

  // If we only need one lesson, it gets all words
  if (adjustedNumLessons === 1) {
    return {
      regularLessons: 0,
      wordsPerRegularLesson: 0,
      wordsInLastLesson: totalWords,
      isValid: true,
      maxPossibleLessons,
      description: `${totalWords} words in 1 lesson`,
    };
  }

  // Calculate base words per lesson and remaining words
  const baseWordsPerLesson = Math.floor(totalWords / adjustedNumLessons);
  const remainingWords = totalWords % adjustedNumLessons;

  // Create array of word counts for each lesson
  const wordCounts = Array(adjustedNumLessons).fill(baseWordsPerLesson);
  for (let i = 0; i < remainingWords; i++) {
    wordCounts[i]++;
  }

  // Create description of distribution
  let description = "";
  if (remainingWords === 0) {
    // Even distribution
    description = `${adjustedNumLessons} lessons with ${baseWordsPerLesson} words each`;
  } else {
    // First few lessons have one extra word
    description = `${remainingWords} lesson${
      remainingWords > 1 ? "s" : ""
    } with ${baseWordsPerLesson + 1} words + ${
      adjustedNumLessons - remainingWords
    } lesson${
      adjustedNumLessons - remainingWords > 1 ? "s" : ""
    } with ${baseWordsPerLesson} words`;
  }

  return {
    regularLessons: adjustedNumLessons - 1,
    wordsPerRegularLesson: baseWordsPerLesson,
    wordsInLastLesson: wordCounts[adjustedNumLessons - 1],
    isValid: true,
    maxPossibleLessons,
    description,
  };
};

const CourseConfigForm: React.FC<CourseConfigFormProps> = ({
  totalWords,
  onSubmit,
  onPreview,
  className,
  initialValues,
}) => {
  const [lessonDistribution, setLessonDistribution] = React.useState({
    regularLessons: 0,
    wordsPerRegularLesson: 0,
    wordsInLastLesson: 0,
    isValid: false,
    maxPossibleLessons: 0,
    description: "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalWords: totalWords.toString(),
      numLessons: initialValues?.numLessons || "1",
      wordsPerLesson: initialValues?.wordsPerLesson || "",
      quizletLink: initialValues?.quizletLink || "",
    },
  });

  // Calculate initial distribution
  React.useEffect(() => {
    const numLessons = Number(form.getValues().numLessons || 1);
    form.setValue("totalWords", totalWords.toString());

    const distribution = calculateLessonDistribution(totalWords, numLessons);
    setLessonDistribution(distribution);

    // Update words per lesson display
    form.setValue("wordsPerLesson", distribution.description);
  }, [totalWords, form]);

  React.useEffect(() => {
    const subscription = form.watch(
      (value: Partial<FormValues>, { name }: { name?: string }) => {
        if (name === "numLessons") {
          const numLessons = Math.max(1, Number(value.numLessons || 1));

          const distribution = calculateLessonDistribution(
            totalWords,
            numLessons
          );
          setLessonDistribution(distribution);

          // Update the form with the calculated distribution
          form.setValue("wordsPerLesson", distribution.description);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [form, totalWords]);

  const handlePreviewClick = () => {
    // Get the current number of lessons from the form
    const numLessons = Number(form.getValues().numLessons);

    // Make sure we use a valid number of lessons
    const validNumLessons = Math.min(
      numLessons,
      lessonDistribution.maxPossibleLessons
    );
    if (validNumLessons !== numLessons) {
      form.setValue("numLessons", validNumLessons.toString());
    }

    form.handleSubmit(onSubmit)();
    onPreview();
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Vocabulary Analysis & Lesson Configuration
        </h2>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="totalWords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Total Words in File:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="h-10 rounded-md bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numLessons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Desired Number of Lessons:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 rounded-md"
                      type="number"
                      min="1"
                      max={
                        lessonDistribution.maxPossibleLessons > 0
                          ? lessonDistribution.maxPossibleLessons
                          : 1
                      }
                    />
                  </FormControl>
                  {totalWords > 0 &&
                    lessonDistribution.maxPossibleLessons > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Max possible lessons:{" "}
                        {lessonDistribution.maxPossibleLessons} (minimum 10
                        words per lesson)
                      </p>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wordsPerLesson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Words Distribution:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="h-10 rounded-md bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {totalWords > 0 &&
              Number(form.getValues().numLessons) >
                lessonDistribution.maxPossibleLessons && (
                <Alert
                  variant="destructive"
                  className="bg-red-50 text-red-800 border-red-200"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    The desired number of lessons is too high for the minimum of
                    10 words per lesson. Maximum possible:{" "}
                    {lessonDistribution.maxPossibleLessons} lessons.
                  </AlertDescription>
                </Alert>
              )}

            <FormField
              control={form.control}
              name="quizletLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Link to Quizlet Course (Optional):
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10 rounded-md">
                        <SelectValue placeholder="Select a Quizlet course..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="quizlet-1">A,B,C,D options</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={handlePreviewClick}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={totalWords === 0 || !lessonDistribution.isValid}
            >
              Preview Lessons
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CourseConfigForm;
