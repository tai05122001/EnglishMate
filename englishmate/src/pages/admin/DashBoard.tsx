import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import OverviewCards from "@/components/admin/OverviewCards";
import RecentActivity from "@/components/admin/RecentActivity";
import QuickActions from "@/components/admin/QuickActions";
import UserTable from "@/components/admin/UserTable";

const DashBoard: React.FC = () => {
  return (
    <AdminLayout>
        <h2 className="text-4xl font-bold">Dashboard Overview</h2>
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <div className="flex flex-col gap-8 w-full lg:w-full min-w-0">
          <OverviewCards />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:1/2 xs:w-full min-w-0">
          <RecentActivity />
        </div>
        <div className="lg:1/2 xs:w-full min-w-0">
          <QuickActions />
        </div>
      </div>
      <div className="w-full min-w-0">
        <UserTable />
      </div>
    </AdminLayout>
  );
};

export default DashBoard;
