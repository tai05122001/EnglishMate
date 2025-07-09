import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Lock } from "lucide-react";
import poster1 from "../assets/poster_courses1.png";
import poster2 from "../assets/poster_courses2.png";
import poster3 from "../assets/poster_courses3.png";
import poster4 from "../assets/poster_courses4.png";
import ButtonGetStarted from "../components/common/ButtonGetStarted";

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const statuses = ["All Courses", "Unlocked", "Locked"];

// Extend course type with status and points
interface Course {
  id: number;
  level: string;
  duration: string;
  title: string;
  description: string;
  students: number;
  rating: number;
  imageUrl: JSX.Element;
  status: "unlocked" | "locked";
  requiredPoints?: number;
  requiredCourseId?: number;
}

// Make sure all courses are explicitly typed as Course to avoid TypeScript errors
const courses: Course[] = [
  {
    id: 1,
    level: "Beginner",
    duration: "8 weeks",
    title: "English Fundamentals",
    description:
      "Master the basics of English grammar, vocabulary, and pronunciation with interactive lessons.",
    students: 1247,
    rating: 4.8,
    imageUrl: <img src={poster1} alt="" className="py-2 rounded-xl" />,
    status: "unlocked",
  },
  {
    id: 2,
    level: "Intermediate",
    duration: "10 weeks",
    title: "Conversational English",
    description:
      "Improve your speaking skills through real-world conversations and practical scenarios.",
    students: 892,
    rating: 4.7,
    imageUrl: <img src={poster2} alt="" className="py-2 rounded-xl" />,
    status: "locked",
    requiredPoints: 50,
  },
  {
    id: 3,
    level: "Intermediate",
    duration: "6 weeks",
    title: "IELTS Preparation",
    description:
      "Comprehensive preparation for IELTS exam with practice tests and expert guidance.",
    students: 1034,
    rating: 4.8,
    imageUrl: <img src={poster3} alt="" className="py-2 rounded-xl" />,
    status: "locked",
    requiredCourseId: 2,
  },
  {
    id: 4,
    level: "Advanced",
    duration: "12 weeks",
    title: "Business English",
    description:
      "Professional English for workplace communication, presentations, and business writing.",
    students: 567,
    rating: 4.9,
    imageUrl: <img src={poster4} alt="" className="py-2 rounded-xl" />,
    status: "locked",
    requiredPoints: 150,
  },
  {
    id: 5,
    level: "Beginner",
    duration: "4 weeks",
    title: "Basic Grammar",
    description: "Learn the fundamentals of English grammar.",
    students: 800,
    rating: 4.5,
    imageUrl: <img src={poster4} alt="" className="py-2 rounded-xl" />,
    status: "unlocked",
  },
  {
    id: 6,
    level: "Intermediate",
    duration: "8 weeks",
    title: "Writing Skills",
    description: "Improve your writing with practical exercises.",
    students: 950,
    rating: 4.6,
    imageUrl: <img src={poster2} alt="" className="py-2 rounded-xl" />,
    status: "locked",
    requiredPoints: 75,
  },
  {
    id: 7,
    level: "Advanced",
    duration: "10 weeks",
    title: "Advanced Vocabulary",
    description: "Expand your vocabulary for professional use.",
    students: 600,
    rating: 4.7,
    imageUrl: <img src={poster3} alt="" className="py-2 rounded-xl" />,
    status: "locked",
    requiredCourseId: 6,
  },
  {
    id: 8,
    level: "Beginner",
    duration: "6 weeks",
    title: "Pronunciation Practice",
    description: "Perfect your pronunciation with phonetics.",
    students: 700,
    rating: 4.4,
    imageUrl: <img src={poster1} alt="" className="py-2 rounded-xl" />,
    status: "unlocked",
  },
  {
    id: 9,
    level: "Intermediate",
    duration: "12 weeks",
    title: "Business Communication",
    description: "Learn effective communication in business.",
    students: 550,
    rating: 4.6,
    imageUrl: <img src={poster3} alt="" className="py-2 rounded-xl" />,
    status: "locked",
    requiredPoints: 100,
  },
  {
    id: 10,
    level: "Advanced",
    duration: "14 weeks",
    title: "Public Speaking",
    description: "Master public speaking skills.",
    students: 400,
    rating: 4.8,
    imageUrl: <img src={poster4} alt="" className="py-2 rounded-xl" />,
    status: "locked",
    requiredCourseId: 9,
  },
  {
    id: 11,
    level: "Beginner",
    duration: "5 weeks",
    title: "Listening Skills",
    description: "Improve your listening comprehension.",
    students: 750,
    rating: 4.3,
    imageUrl: <img src={poster1} alt="" className="py-2 rounded-xl" />,
    status: "unlocked",
  },
  {
    id: 12,
    level: "Intermediate",
    duration: "7 weeks",
    title: "Reading Comprehension",
    description: "Enhance your reading skills.",
    students: 680,
    rating: 4.5,
    imageUrl: <img src={poster2} alt="" className="py-2 rounded-xl" />,
    status: "locked",
    requiredPoints: 60,
  },
];

const Courses: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedStatus, setSelectedStatus] = useState("All Courses");
  const [userPoints, setUserPoints] = useState(80); // For demo purposes
  const [unlockedCourses, setUnlockedCourses] = useState<number[]>([1, 5, 8, 11]); // Initial unlocked courses

  // Filter courses by level and status
  const filteredCourses = courses
    .filter(course => selectedLevel === "All Levels" || course.level === selectedLevel)
    .filter(course => {
      if (selectedStatus === "All Courses") return true;
      if (selectedStatus === "Unlocked") return course.status === "unlocked" || unlockedCourses.includes(course.id);
      if (selectedStatus === "Locked") return course.status === "locked" && !unlockedCourses.includes(course.id);
      return true;
    });

  // Function to unlock a course
  const unlockCourse = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Make sure requiredPoints exists and is a number before using it
    if (typeof course.requiredPoints === 'number' && course.requiredPoints <= userPoints) {
      setUserPoints(prev => prev - course.requiredPoints!); // Use non-null assertion since we checked it's a number
      setUnlockedCourses(prev => [...prev, courseId]);
    }
  };

  // Fix the isCoursePurchasable function
  const isCoursePurchasable = (course: Course): boolean => {
    // If already unlocked or has unlocked status, not purchasable
    if (unlockedCourses.includes(course.id) || course.status === "unlocked") {
      return false;
    }

    // Check for required course completion
    if (course.requiredCourseId && !unlockedCourses.includes(course.requiredCourseId)) {
      return false;
    }

    // Must have points requirement and user must have enough points
    return typeof course.requiredPoints === 'number' && userPoints >= course.requiredPoints;
  };

  // Enhanced course list with unlock status
  const enhancedCourses = filteredCourses.map(course => {
    const isUnlocked = course.status === "unlocked" || unlockedCourses.includes(course.id);
    const isPurchasable = isCoursePurchasable(course);

    // Create unlock info element based on course status
    let unlockInfo: React.ReactNode;

    if (isUnlocked) {
      unlockInfo = (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-green-600 font-medium">
            <span>Unlocked</span>
          </div>
          <ButtonGetStarted id={course.id} />
        </div>
      );
    } else if (isPurchasable && typeof course.requiredPoints === 'number') {
      unlockInfo = (
        <Button
          onClick={() => unlockCourse(course.id)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Unlock for {course.requiredPoints} points
        </Button>
      );
    } else if (course.requiredCourseId) {
      unlockInfo = (
        <div className="flex items-center text-amber-600 gap-1">
          <Lock size={16} />
          <span>Complete course #{course.requiredCourseId} first</span>
        </div>
      );
    } else if (typeof course.requiredPoints === 'number') {
      unlockInfo = (
        <div className="flex items-center text-amber-600 gap-1">
          <Lock size={16} />
          <span>Requires {course.requiredPoints} points</span>
        </div>
      );
    } else {
      unlockInfo = (
        <div className="flex items-center text-amber-600 gap-1">
          <Lock size={16} />
          <span>Locked</span>
        </div>
      );
    }

    return {
      ...course,
      isUnlocked,
      isPurchasable,
      unlockInfo
    };
  });

  return (
    <>
      <div className="mx-auto md:px-0">
        <section className="text-center mt-20 px-4 md:px-0">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-600">
            Explore Our English Courses
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find the perfect course to improve your skills and achieve fluency
          </p>
        </section>

        {/* User points display */}
        <section className="mt-8 px-4 md:px-0 max-w-7xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="text-blue-600" size={24} />
                  <div>
                    <h3 className="font-medium text-blue-900">Your Learning Points</h3>
                    <p className="text-sm text-blue-700">Earn points by completing lessons and exercises</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-2 rounded-full font-bold text-blue-600 border border-blue-200">
                  {userPoints} Points
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-blue-700 mb-1">
                  <span>Current Level: Intermediate</span>
                  <span>Next Level: 200 points</span>
                </div>
                <Progress value={(userPoints / 200) * 100} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 px-4 md:px-0 max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Filter by level */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-gray-700 font-semibold mr-2 whitespace-nowrap text-sm">
                Filter by level:
              </span>
              <div className="flex gap-1 py-1 px-1 rounded-md bg-[#F5F5F5]">
                {levels.map((level) =>
                  selectedLevel === level ? (
                    <Badge
                      key={level}
                      variant="default"
                      className="px-4 py-2 cursor-pointer text-sm bg-transparent text-gray-900 whitespace-nowrap hover:bg-transparent hover:outline-none focus:outline-none"
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Badge>
                  ) : (
                    <Button
                      key={level}
                      variant="ghost"
                      size="sm"
                      className="px-4 py-2 text-gray-400 hover:text-black text-sm bg-transparent hover:bg-transparent hover:outline-none hover:border-none focus:outline-none focus:border-none focus-visible:border-none"
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* Filter by status */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-gray-700 font-semibold mr-2 whitespace-nowrap text-sm">
                Show:
              </span>
              <div className="flex gap-1 py-1 px-1 rounded-md bg-[#F5F5F5]">
                {statuses.map((status) =>
                  selectedStatus === status ? (
                    <Badge
                      key={status}
                      variant="default"
                      className="px-4 py-2 cursor-pointer text-sm bg-transparent text-gray-900 whitespace-nowrap hover:bg-transparent hover:outline-none focus:outline-none"
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </Badge>
                  ) : (
                    <Button
                      key={status}
                      variant="ghost"
                      size="sm"
                      className="px-4 py-2 text-gray-400 hover:text-black text-sm bg-transparent hover:bg-transparent hover:outline-none hover:border-none focus:outline-none focus:border-none focus-visible:border-none"
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Courses list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {enhancedCourses.map((course) => (
              <Card
                key={course.id}
                className={`overflow-hidden transition-all duration-300 ${!course.isUnlocked ? 'opacity-90' : ''
                  }`}
              >
                <div className="relative">
                  {!course.isUnlocked && (
                    <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Lock size={12} />
                      <span>Locked</span>
                    </div>
                  )}
                  {course.imageUrl}
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                      {course.level}
                    </Badge>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{course.students} students</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {course.rating}
                    </span>
                  </div>

                  {/* Unlock status or button */}
                  <div className="mt-2">
                    {course.unlockInfo}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Courses;
