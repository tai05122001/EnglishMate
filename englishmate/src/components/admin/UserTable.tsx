import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const users = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "1 day ago",
  },
];

const UserTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <div className="w-full sm:w-72 relative">
          <Input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-200"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </div>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left font-medium text-gray-500">User</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">Role</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">Status</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">Last Login</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="px-4 py-3 flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "Admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{user.role}</span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{user.status}</span>
              </td>
              <td className="px-4 py-3 text-gray-500">{user.lastLogin}</td>
              <td className="px-4 py-3 flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable; 