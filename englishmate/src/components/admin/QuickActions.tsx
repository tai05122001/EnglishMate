import React from "react";
import { Plus, Users, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    label: "Add New Course",
    icon: <Plus size={18} className="mr-2" />,
    onClick: () => {},
    color: "bg-teal-600 text-white hover:bg-teal-700",
  },
  {
    label: "View All Users",
    icon: <Users size={18} className="mr-2" />,
    onClick: () => {},
    color: "bg-blue-600 text-white hover:bg-blue-700",
  },
  {
    label: "Create Learning Path",
    icon: <Route size={18} className="mr-2" />,
    onClick: () => {},
    color: "bg-purple-600 text-white hover:bg-purple-700",
  },
];

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
      <div className="flex flex-col gap-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            className={`w-full flex items-center justify-center py-3 text-base font-medium rounded-lg ${action.color}`}
            onClick={action.onClick}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions; 