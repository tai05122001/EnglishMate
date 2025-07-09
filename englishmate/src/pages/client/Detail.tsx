import React, { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink, useParams } from "react-router-dom";
import { Play, Check, Lock, BookOpen, ArrowRight } from "lucide-react";
import StarRating from "@/components/common/StarRating";
import CourseContentAccordion from "@/components/common/CourseContentAccordion";
import poster1 from "../../assets/poster_courses3.png";
import poster2 from "../../assets/poster_courses4.png";
import poster3 from "../../assets/poster_courses2.png";
import poster4 from "../../assets/poster_courses1.png";
import { Badge } from "@/components/ui/badge";
import ButtonGetStarted from "@/components/common/ButtonGetStarted";

interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz";
}

interface CourseWeek {
  id: string;
  title: string;
  isExpanded?: boolean;
  lessons: CourseLesson[];
}

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  lessons: string;
  certificate: boolean;
  access: string;
  banner: string;
  isUnlocked?: boolean;
  preview: {
    url: string;
    duration: string;
  };
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    rating: number;
    reviews: number;
  };
  weeks: CourseWeek[];
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  testimonials: {
    id: string;
    text: string;
    name: string;
    title: string;
    avatar: string;
    rating: number;
  }[];
}

// Add related course interface
interface RelatedCourse {
  id: number;
  title: string;
  level: string;
  description: string;
  duration: string;
  imageUrl: string;
  status: "unlocked" | "locked";
  requiredPoints?: number;
  requiredCourseId?: number;
}

const Detail = () => {
  const { id } = useParams();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [userPoints, setUserPoints] = useState(80); // Mock user points

  // Mock data - would be fetched from API in real application
  const course: CourseDetail = {
    id: "1",
    title: "English for Beginners",
    description:
      "Boost your communication skills with this fun and structured beginner English course.",
    price: 99,
    duration: "4 weeks",
    level: "Beginner",
    lessons: "24 videos",
    certificate: true,
    access: "Lifetime",
    banner: "../assets/poster_courses1.png",
    isUnlocked: false,
    preview: {
      url: "/videos/preview.mp4",
      duration: "3 minutes",
    },
    instructor: {
      name: "Jane Doe",
      title: "ESL Expert",
      bio: "10+ years teaching English, certified ESL coach with experience helping over 5,000 students.",
      avatar: "/images/instructor.jpg",
      rating: 4.9,
      reviews: 1247,
    },
    weeks: [
      {
        id: "week-1",
        title: "Week 1: Introduction & Basic Greetings",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Lesson 1: Hello & Goodbye",
            duration: "15 min",
            type: "video",
          },
          {
            id: "lesson-1-2",
            title: "Lesson 2: Introducing Yourself",
            duration: "20 min",
            type: "video",
          },
          {
            id: "lesson-1-3",
            title: "Quiz: Basic Greetings",
            duration: "",
            type: "quiz",
          },
        ],
      },
      {
        id: "week-2",
        title: "Week 2: Numbers & Time",
        lessons: [],
      },
      {
        id: "week-3",
        title: "Week 3: Family & Relationships",
        lessons: [],
      },
      {
        id: "week-4",
        title: "Week 4: Daily Activities",
        lessons: [],
      },
    ],
    features: [
      {
        id: "feature-1",
        title: "Grammar Essentials",
        description: "Understand sentence structure and verb tenses.",
        icon: "grammar",
      },
      {
        id: "feature-2",
        title: "Speaking Practice",
        description: "Practice daily conversations and pronunciation.",
        icon: "speaking",
      },
      {
        id: "feature-3",
        title: "Listening Skills",
        description: "Listen to native speakers and improve comprehension.",
        icon: "listening",
      },
      {
        id: "feature-4",
        title: "Writing Skills",
        description: "Learn to write clear and effective sentences.",
        icon: "writing",
      },
    ],
    testimonials: [
      {
        id: "testimonial-1",
        text: "This course helped me speak confidently in just 4 weeks! The lessons are well-structured and easy to follow.",
        name: "John Nguyen",
        title: "Software Engineer",
        avatar: "/images/testimonial-1.jpg",
        rating: 5,
      },
      {
        id: "testimonial-2",
        text: "Perfect for beginners! Jane explains everything clearly and the practice exercises are very helpful.",
        name: "Maria Santos",
        title: "Marketing Manager",
        avatar: "/images/testimonial-2.jpg",
        rating: 5,
      },
      {
        id: "testimonial-3",
        text: "Great value for money. I've tried other courses but this one actually works. Highly recommended!",
        name: "Ahmed Hassan",
        title: "Student",
        avatar: "/images/testimonial-3.jpg",
        rating: 5,
      },
    ],
  };

  // Add related courses data
  const relatedCourses: RelatedCourse[] = [
    {
      id: 2,
      title: "Conversational English",
      level: "Intermediate",
      description: "Improve your speaking skills through real-world conversations and practical scenarios.",
      duration: "10 weeks",
      imageUrl: poster2,
      status: "locked",
      requiredPoints: 50,
    },
    {
      id: 3,
      title: "IELTS Preparation",
      level: "Intermediate",
      description: "Comprehensive preparation for IELTS exam with practice tests and expert guidance.",
      duration: "6 weeks",
      imageUrl: poster3,
      status: "locked",
      requiredCourseId: 2,
    },
    {
      id: 5,
      title: "Basic Grammar",
      level: "Beginner",
      description: "Learn the fundamentals of English grammar.",
      duration: "4 weeks",
      imageUrl: poster4,
      status: "unlocked",
    },
  ];

  useEffect(() => {
    // In a real app, you would fetch this data from an API or local storage
    // For now, let's check a mock list of unlocked course IDs
    const unlockedCourses = [1, 5, 8, 11]; // Mock IDs of unlocked courses
    const courseIdNumber = parseInt(id || "0");
    setIsUnlocked(unlockedCourses.includes(courseIdNumber));
  }, [id]);

  // Add function to unlock a course
  const unlockCourse = (courseId: number, points: number) => {
    if (userPoints >= points) {
      setUserPoints(prev => prev - points);
      // In a real app, you would update the backend/database here
      alert(`Course ${courseId} unlocked successfully!`);
    } else {
      alert(`Not enough points. You need ${points} points, but you only have ${userPoints}.`);
    }
  };

  return (
    <MainLayout>
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-2/3">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-video bg-gray-200 relative">
                      <img
                        src={poster1}
                        alt={`${course.title} Banner`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-md text-sm">
                        English for Beginners Course Banner
                      </span>
                      
                      {isUnlocked && (
                        <span className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1">
                          <BookOpen size={14} />
                          Unlocked
                        </span>
                      )}
                    </div>
                  </div>

                  <h1 className="text-3xl font-semibold mt-6 text-gray-900">
                    {course.title}
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    {course.description}
                  </p>

                  <div className="mt-6">
                    {isUnlocked ? (
                      <Button size="lg" className="bg-green-600 hover:bg-green-700">
                        Start Learning
                      </Button>
                    ) : (
                      <Button size="lg">Enroll Now - ${course.price}</Button>
                    )}
                  </div>

                  <div className="mt-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
                        <Play size={36} className="text-white" />
                        <p className="text-white mt-2">Course Preview Video</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-2 text-center">
                      Course Preview - {course.preview.duration}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  <Card className="p-6 border border-gray-200 rounded-lg mb-8">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">
                      Course Details
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Level:</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lessons:</span>
                        <span className="font-medium">{course.lessons}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Certificate:</span>
                        <span className="font-medium">
                          {course.certificate ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Access:</span>
                        <span className="font-medium">{course.access}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className={`font-medium ${isUnlocked ? "text-green-600" : "text-amber-600"}`}>
                          {isUnlocked ? "Unlocked" : "Locked"}
                        </span>
                      </div>
                    </div>

                    {isUnlocked ? (
                      <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
                        Continue Learning
                      </Button>
                    ) : (
                      <Button className="w-full mt-6 bg-black hover:bg-gray-800 text-white">
                        Enroll Now - ${course.price}
                      </Button>
                    )}
                  </Card>

                  <Card className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">
                      Your Instructor
                    </h3>

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={poster2}
                          alt={course.instructor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {course.instructor.name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {course.instructor.title}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      {course.instructor.bio}
                    </p>

                    <StarRating
                      rating={course.instructor.rating}
                      reviews={course.instructor.reviews}
                      showValue={true}
                      size={16}
                    />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                What You'll Learn
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {course.features.map((feature) => (
                  <div
                    key={feature.id}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                      <Check className="h-5 w-5 text-gray-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Course Content
              </h2>

              <CourseContentAccordion weeks={course.weeks} className="mb-12" />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                What Students Say
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {course.testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="p-6">
                    <StarRating rating={testimonial.rating} className="mb-4" />

                    <p className="text-gray-600 mb-6">"{testimonial.text}"</p>

                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={poster3}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Courses Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Related Courses
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCourses.map((course) => (
                  <Card key={course.id} className={`overflow-hidden transition-all duration-300 ${course.status === 'locked' ? 'opacity-90' : ''}`}>
                    <div className="relative">
                      {course.status === 'locked' && (
                        <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Lock size={12} />
                          <span>Locked</span>
                        </div>
                      )}
                      <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                    </div>
                    
                    <CardContent className="p-5">
                      <div className="flex justify-between mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                          {course.level}
                        </Badge>
                        <span className="text-sm text-gray-500">{course.duration}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      
                      {course.status === 'unlocked' ? (
                        <div className="mt-4">
                          <div className="flex items-center text-green-600 font-medium mb-2">
                            <span>Unlocked</span>
                          </div>
                          <ButtonGetStarted id={course.id} />
                        </div>
                      ) : course.requiredPoints && !course.requiredCourseId ? (
                        <div className="mt-4">
                          <div className="flex items-center text-amber-600 gap-1 mb-2">
                            <Lock size={16} />
                            <span>Requires {course.requiredPoints} points</span>
                          </div>
                          <Button 
                            onClick={() => unlockCourse(course.id, course.requiredPoints!)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            disabled={userPoints < course.requiredPoints}
                          >
                            Unlock for {course.requiredPoints} points
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <div className="flex items-center text-amber-600 gap-1">
                            <Lock size={16} />
                            <span>Complete course #{course.requiredCourseId} first</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <NavLink to="/courses"> 
                  <Button variant="outline" className="flex items-center gap-2">
                    View All Courses <ArrowRight size={16} />
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        {/* User Points Display */}
        <section className="py-6 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">P</span>
                </div>
                <span className="text-gray-700">Your Learning Points</span>
              </div>
              <div className="font-bold text-blue-600">{userPoints} Points</div>
            </div>
          </div>
        </section>

        {/* Call to Action - Only show if course is not unlocked */}
        {!isUnlocked && (
          <section className="py-12 bg-black text-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-4">
                  Ready to Start Your English Journey?
                </h2>
                <p className="text-gray-300 mb-8">
                  Join thousands of students who have improved their English with
                  EnglishMate
                </p>

                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-md">
                  Enroll Now - ${course.price}
                </Button>

                <p className="text-gray-400 text-sm mt-4">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </section>
        )}
        
        {/* Show progress section if course is unlocked */}
        {isUnlocked && (
          <section className="py-12 bg-green-50">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-4">
                  Continue Your Learning Journey
                </h2>
                <p className="text-gray-600 mb-8">
                  You've already unlocked this course. Pick up where you left off!
                </p>

                <Button className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-md">
                  Continue to Lessons
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default Detail;
