import React from "react";
import StarSVG from "../../assets/star.svg";

interface StarBarProps {
  number: number;
}

const StarBar: React.FC<StarBarProps> = ({ number }) => {
  const stars = Array.from({ length: number }, (_, i) => (
    <img key={i} src={StarSVG} alt="star" className="w-4 h-4" />
  ));

  return <div className="flex space-x-1">{stars}</div>;
};

export default StarBar;
