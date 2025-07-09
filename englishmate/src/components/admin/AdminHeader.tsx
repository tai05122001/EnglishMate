import React from "react";
import { LogOut } from "lucide-react";

const AdminHeader: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-teal-600">EnglishMate</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <span className="font-medium text-gray-700 hidden sm:block">Admin</span>
        </div>
        <button
          onClick={onLogout}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Logout"
        >
          <LogOut size={20} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader; 