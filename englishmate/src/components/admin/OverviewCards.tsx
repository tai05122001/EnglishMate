import React from "react";
import { Users, BookOpen, CreditCard, Sparkles } from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "5,247",
    icon: <Users size={24} />,
    iconBg: "bg-blue-100 text-blue-600",
    cardBg: "bg-white",
  },
  {
    label: "Total Courses",
    value: "156",
    icon: <BookOpen size={24} />,
    iconBg: "bg-green-100 text-green-600",
    cardBg: "bg-white",
  },
  {
    label: "Active Subscriptions",
    value: "2,489",
    icon: <CreditCard size={24} />,
    iconBg: "bg-purple-100 text-purple-600",
    cardBg: "bg-white",
  },
  {
    label: "New This Week",
    value: "147",
    icon: <Sparkles size={24} />,
    iconBg: "bg-teal-100 text-teal-600",
    cardBg: "bg-white",
  },
];

const OverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex flex-col items-start justify-between p-6 rounded-2xl shadow-lg border ${stat.cardBg} min-h-[120px] transition hover:shadow-xl`}
        >
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${stat.iconBg} mb-4`}>{stat.icon}</div>
          <div className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards; 