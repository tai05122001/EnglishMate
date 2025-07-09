import React from "react";
import Sidebar from "../components/admin/Sidebar";
import AdminHeader from "../components/admin/AdminHeader";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-10 bg-gray-50 mt-0 md:mt-0 space-y-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout; 