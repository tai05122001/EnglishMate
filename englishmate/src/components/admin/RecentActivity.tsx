import React from "react";

const activities = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "New user registered: John Doe",
    time: "2 min ago",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Course updated: IELTS Preparation",
    time: "1 hour ago",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    description: "New subscription: Premium Plan",
    time: "3 hours ago",
  },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Activity</h3>
      <ul className="space-y-4">
        {activities.map((act, idx) => (
          <li key={idx} className="flex items-center gap-4">
            <img
              src={act.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border"
            />
            <div className="flex-1">
              <div className="text-sm text-gray-800">{act.description}</div>
              <div className="text-xs text-gray-400">{act.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity; 