import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Star } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  level: string;
  duration: string;
  lessons: number;
  price: number;
  rating: number;
  reviews: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  level,
  duration,
  lessons,
  price,
  rating,
  reviews,
}) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl || "https://placehold.co/400x225/e5e7eb/a3a3a3?text=Course+Preview"}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
          {level}
        </div>
      </div>
      
      <CardContent className="flex-grow p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Clock className="w-4 h-4 mr-1" /> {duration}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <BookOpen className="w-4 h-4 mr-1" /> {lessons} lessons
        </div>
        <div className="flex items-center text-sm">
          <div className="flex mr-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                size={14} 
                className={i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-gray-500">({reviews})</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 mt-auto flex justify-between items-center">
        <div className="font-semibold text-gray-900">${price}</div>
        <Link to={`/courses/${id}`}>
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard; 