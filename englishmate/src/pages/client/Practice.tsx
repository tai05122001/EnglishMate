import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Progress } from "../../components/ui/progress";
import {
  BookOpen,
  FileText,
  Headphones,
  Mic,
  Edit,
  Layers,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const practiceItems = [
  {
    title: "Vocabulary",
    description:
      "Learn new words and expand your vocabulary with interactive flashcards and quizzes.",
    icon: BookOpen,
  },
  {
    title: "Grammar",
    description:
      "Master English grammar rules through structured exercises and real-world examples.",
    icon: FileText,
  },
  {
    title: "Listening",
    description:
      "Improve your listening skills with audio exercises and comprehension tests.",
    icon: Headphones,
  },
  {
    title: "Speaking",
    description:
      "Practice pronunciation and speaking fluency with AI-powered voice recognition.",
    icon: Mic,
  },
  {
    title: "Writing",
    description:
      "Enhance your writing skills with guided exercises and instant feedback.",
    icon: Edit,
  },
  {
    title: "Mixed Practice",
    description:
      "Challenge yourself with a combination of all skills in one comprehensive session.",
    icon: Layers,
  },
];

const Practice: React.FC = () => {
  return (
    <MainLayout>
      <section className="text-center mt-24 px-4 py-4 md:px-0  ">
        <h1 className="text-4xl font-semibold mb-4 text-gray-600">
          Practice Makes Progress
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Sharpen your grammar, vocabulary, and speaking skills every day.
        </p>
        <div className="flex"></div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold py-2">Choose your practice</h2>
        <div className="max-w-6xl mx-auto px-4 py-2 md:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceItems.map(({ title, description, icon: Icon }) => (
            <Card
              key={title}
              className="flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <Icon className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
                <Button className="mt-6 w-full" size="sm">
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* New Section from Figma Design */}
      <section className="max-w-7xl mx-auto my-2 px-6 py-4 ">
        <Card className="text-center p-4 w-full max-w-3xl mx-auto">
          <CardContent>
            <div className="bg-[#E5E5E5] w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-2">
              <Lightbulb />
            </div>
            <h2 className="text-4xl font-semibold text-gray-900 mb-2">
              Practice a little every day
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your future self will thank you! Consistency is key to mastering
              English.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row justify-around text-center text-gray-700 gap-6 sm:gap-0">
              <div>
                <p className="text-3xl font-semibold">2,847</p>
                <p className="text-sm">Active learners</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">15min</p>
                <p className="text-sm">Average session</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">94%</p>
                <p className="text-sm">Success rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
};

export default Practice;
