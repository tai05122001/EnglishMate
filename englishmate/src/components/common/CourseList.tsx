import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { useServiceApi } from "../../hooks/useServiceApi";
import type { CourseDTO, ApiResponse, PaginationParams } from "../../types";
import { Button } from "../ui/button";

interface CourseListProps {
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
  filter?: string;
  level?: string;
}

const CourseList: React.FC<CourseListProps> = ({
  title = "Popular Courses",
  showViewAll = true,
  maxItems = 4,
  filter,
  level,
}) => {
  const [visibleItems, setVisibleItems] = useState(maxItems);

  // Use the service API hook for core service
  const {
    data,
    loading,
    error,
    execute: fetchCourses,
  } = useServiceApi<ApiResponse<CourseDTO[]>>("core", "/courses", "get");

  // Fetch courses on mount
  React.useEffect(() => {
    const params: PaginationParams = { page: 1, pageSize: 20 };
    if (level) {
      params.filters = { level };
    }
    fetchCourses(undefined, { params });
  }, [fetchCourses, level]);

  // Handle loading state
  if (loading && !data) {
    return (
      <div className="w-full py-10">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 animate-pulse rounded-lg h-64"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error && !data) {
    return (
      <div className="w-full py-10">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Failed to load courses. {error.message}</p>
            <Button
              onClick={() => {
                const params: PaginationParams = { page: 1, pageSize: 20 };
                if (level) {
                  params.filters = { level };
                }
                fetchCourses(undefined, { params });
              }}
              variant="outline"
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No courses found
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="w-full py-10">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded text-center">
            <p>No courses available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter courses if needed
  const courses =
    filter && data.data
      ? data.data.filter((course) =>
          course.title.toLowerCase().includes(filter.toLowerCase())
        )
      : data.data || [];

  const displayCourses = courses.slice(0, visibleItems);
  const hasMore = courses.length > visibleItems;

  const handleViewMore = () => {
    setVisibleItems((prev) => prev + maxItems);
  };

  return (
    <div className="w-full py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showViewAll && courses.length > maxItems && (
            <Button variant="link" asChild>
              <a href="/courses">View All</a>
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {displayCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id.toString()}
              title={course.title}
              description={
                course.description ||
                "Learn English with our comprehensive courses"
              }
              imageUrl={
                course.imageUrl ||
                "https://placehold.co/400x225/e5e7eb/a3a3a3?text=Course+Preview"
              }
              level={course.level}
              duration={course.duration || "4 weeks"}
              lessons={10} // Default value as it's not in our DTO
              price={29.99} // Default value as it's not in our DTO
              rating={course.rating}
              reviews={course.students || 0} // Using students count as reviews
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <Button onClick={handleViewMore} variant="outline">
              Load More Courses
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
