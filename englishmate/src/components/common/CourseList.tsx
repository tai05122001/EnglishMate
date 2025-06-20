import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UserRound } from "lucide-react";
import ButtonGetStarted from "./ButtonGetStarted";
interface Course {
  id: number;
  level: string;
  duration: string;
  title: string;
  description: string;
  students: number;
  rating: number;
  imageUrl?: React.ReactNode;
}

interface CourseListProps {
  courses: Course[];
  className?: string;
}

const CourseList: React.FC<CourseListProps> = ({ courses, className }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${
        className ?? ""
      }`}
    >
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300 hover:border-2 cursor-pointer">
          {course.imageUrl ? course.imageUrl : <></>}
          <CardContent className="flex flex-col flex-1 p-0 pt-2 px-4 pb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary">{course.level}</Badge>
              <span className="text-gray-500 text-xs">{course.duration}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-500">
              {course.title}
            </h3>
            <p className="text-gray-400 flex-grow text-sm mt-2 italic">
              {course.description}
            </p>
            <div className="mt-2 flex items-center justify-start text-sm text-gray-500 gap-2 ">
              <div className="flex gap-2">
                <UserRound className="h-4 w-4" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <span>⭐ {course.rating.toFixed(1)}</span>
            </div>
            <ButtonGetStarted id={course.id} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseList;
