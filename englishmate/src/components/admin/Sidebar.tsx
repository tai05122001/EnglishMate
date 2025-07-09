import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Route,
  Settings,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    to: "/admin/dashboard",
  },
  {
    label: "Users",
    icon: <Users size={20} />,
    to: "/admin/users",
  },
  {
    label: "Courses",
    icon: <BookOpen size={20} />,
    to: "/admin/courses",
  },
  {
    label: "Learning Paths",
    icon: <Route size={20} />,
    to: "/admin/learning-paths",
  },
  {
    label: "Settings",
    icon: <Settings size={20} />,
    to: "/admin/settings",
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-white border-r border-gray-200 shadow-sm fixed top-0 left-0 z-40">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <span className="text-xl font-bold text-teal-600">EnglishMate</span>
      </div>
      <nav className="flex-1 py-6 px-2 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-colors hover:bg-teal-50 hover:text-teal-700 ${
              location.pathname === item.to
                ? "bg-teal-100 text-teal-700"
                : "text-gray-700"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 