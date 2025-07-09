import React from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCourse } from "@/hooks/useCourse";

interface LessonHeaderProps {
  title: string;
  description: string;
  lessonId: string;
  courseId: string;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({
  title,
  description,
  lessonId,
  courseId,
}) => {
  const navigate = useNavigate();
  const { lessons, currentLessonId } = useCourse();

  // Check if this lesson is being previewed from the course creation flow
  const isFromCourseCreation =
    lessons.length > 0 && currentLessonId === lessonId;

  const handleBackClick = (e: React.MouseEvent) => {
    if (isFromCourseCreation) {
      e.preventDefault();
      navigate("/courses/create");
    }
    // If not from course creation, let the Link component handle navigation
  };

  return (
    <section className="w-full bg-gradient-to-r from-teal-300 to-teal-500 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-gray-600 hover:text-gray-900"
              asChild
            >
              <Link
                to={
                  isFromCourseCreation
                    ? "/courses/create"
                    : `/courses/${courseId}`
                }
                onClick={handleBackClick}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>
                  {isFromCourseCreation
                    ? "Back to course creation"
                    : "Back to course"}
                </span>
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
                {title}
              </h1>
              <p className="text-gray-600 text-base md:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonHeader;
