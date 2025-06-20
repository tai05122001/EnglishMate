import MainLayout from "@/layouts/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Flag, CheckCircle2 } from "lucide-react";
import ButtonRoadMapDetail from "@/components/common/ButtonRoadMapDetail";

interface RoadMapItem {
  id: string;
  title: string;
  description: string;
  status: "upcoming" | "in-progress" | "completed";
  progress: number;
  details: string[];
}

const roadmapData: RoadMapItem[] = [
  {
    id: "1",
    title: "Beginner English Course",
    description: "Master the fundamentals of English grammar and vocabulary.",
    status: "completed",
    progress: 100,
    details: [
      "Modules: Nouns, Verbs, Adjectives, Basic Sentence Structure.",
      "Quizzes: Each module includes a short quiz to test understanding.",
      "Projects: Complete simple writing exercises.",
    ],
  },
  {
    id: "2",
    title: "Intermediate Speaking Practice",
    description: "Improve fluency and confidence in everyday conversations.",
    status: "in-progress",
    progress: 60,
    details: [
      "Modules: Pronunciation, Intonation, Conversational Fillers.",
      "Activities: Role-playing scenarios, group discussions.",
      "Tools: Utilize AI-powered speech analysis for feedback.",
    ],
  },
  {
    id: "3",
    title: "Advanced Writing & Essay Skills",
    description:
      "Develop sophisticated writing techniques for academic and professional contexts.",
    status: "upcoming",
    progress: 0,
    details: [
      "Modules: Argumentative Essays, Research Papers, Business Correspondence.",
      "Workshops: Peer review sessions, instructor feedback.",
      "Resources: Access to advanced grammar guides and style manuals.",
    ],
  },
  {
    id: "4",
    title: "Cultural Immersion Program",
    description:
      "Explore English-speaking cultures through various interactive activities.",
    status: "upcoming",
    progress: 0,
    details: [
      "Modules: British, American, Australian cultures.",
      "Activities: Virtual tours, cultural quizzes, historical insights.",
      "Discussions: Engage with native speakers on cultural topics.",
    ],
  },
];

const getStatusIcon = (status: "upcoming" | "in-progress" | "completed") => {
  switch (status) {
    case "upcoming":
      return <CalendarDays className="w-4 h-4 mr-1" />;
    case "in-progress":
      return <Flag className="w-4 h-4 mr-1" />;
    case "completed":
      return <CheckCircle2 className="w-4 h-4 mr-1" />;
    default:
      return null;
  }
};

const getStatusVariant = (status: "upcoming" | "in-progress" | "completed") => {
  switch (status) {
    case "upcoming":
      return "secondary";
    case "in-progress":
      return "default";
    case "completed":
      return "success"; // Assuming a 'success' variant exists or can be styled.
    default:
      return "secondary";
  }
};

const RoadMap = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Our Learning Roadmap
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Explore the path to fluency with our structured learning roadmap. Each
          stage is designed to build your skills progressively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roadmapData.map((item, i) => (
            <Card
              key={item.id}
              className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-2xl font-semibold text-gray-900">
                    {item.title}
                  </CardTitle>
                  <Badge
                    variant={getStatusVariant(item.status)}
                    className="flex items-center"
                  >
                    {getStatusIcon(item.status)}
                    {item.status.charAt(0).toUpperCase() +
                      item.status.slice(1).replace("-", " ")}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <h3 className="text-md font-medium text-gray-700 mb-2">
                    Progress
                  </h3>
                  <Progress
                    value={item.progress}
                    className="w-full h-2 rounded-full bg-gray-200"
                    indicatorClassName={
                      item.status === "completed"
                        ? "bg-green-500"
                        : item.status === "in-progress"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }
                  />
                  <span className="text-sm text-gray-600 mt-1 block text-right">
                    {item.progress}%
                  </span>
                </div>

                <ButtonRoadMapDetail id={i} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default RoadMap;
