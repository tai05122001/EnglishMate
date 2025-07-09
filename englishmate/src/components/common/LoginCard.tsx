import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";

interface LoginCardProps {
  children: React.ReactNode;
}

const LoginCard: React.FC<LoginCardProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-2">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          {/* Logo + Tên app */}
          <div className="flex flex-col items-center gap-2">
            {/* Logo SVG placeholder */}
            <div className="w-10 h-8 bg-gray-100 rounded flex items-center justify-center mb-1">
              {/* TODO: Thay bằng logo thật nếu có */}
              <span className="text-xl font-bold text-gray-700">EM</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">EnglishMate</span>
          </div>
          <CardTitle className="text-center text-[1.875rem] font-bold mt-2">Admin Login</CardTitle>
          <CardDescription className="text-center text-gray-600 text-base">Access your admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="pt-2 pb-0">{children}</CardContent>
        <div className="text-center text-xs text-gray-500 py-4">© 2025 EnglishMate. All rights reserved.</div>
      </Card>
    </div>
  );
};

export default LoginCard; 