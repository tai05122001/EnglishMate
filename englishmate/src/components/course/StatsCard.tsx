import React from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  value: string | number;
  label: string;
  variant: "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  variant,
  className,
}) => {
  const bgColors = {
    primary: "bg-teal-50",
    secondary: "bg-blue-50",
    success: "bg-green-50",
    warning: "bg-yellow-50",
    danger: "bg-red-50",
  };

  const textColors = {
    primary: "text-teal-600",
    secondary: "text-blue-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
  };

  return (
    <div className={cn("rounded-lg p-4", bgColors[variant], className)}>
      <div className="flex flex-col">
        <span className={cn("text-2xl font-bold", textColors[variant])}>
          {value}
        </span>
        <span className="text-sm text-gray-500 mt-1">{label}</span>
      </div>
    </div>
  );
};

export default StatsCard;
