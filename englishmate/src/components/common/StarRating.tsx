import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
  reviews?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  showValue = false,
  reviews,
  className = "",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {[...Array(maxRating)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.floor(rating)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      
      {showValue && (
        <span className="text-sm text-gray-500 ml-2">
          {rating}
          {reviews !== undefined && ` (${reviews.toLocaleString()})`}
        </span>
      )}
    </div>
  );
};

export default StarRating; 