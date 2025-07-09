import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { logout } from "../store/authSlice";

import Footer from "./Footer";
import Header from "./Header";
import MobileNav from "./MobileNav";

interface MainLayoutProps {
}

const MainLayout: React.FC<MainLayoutProps> = ({ }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleMobileMenuToggle = () => setMobileMenuOpen((open) => !open);
  const handleMobileMenuClose = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Fixed at top */}
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onMobileMenuToggle={handleMobileMenuToggle}
      />

      {/* Mobile Navigation */}
      <MobileNav
        isAuthenticated={isAuthenticated}
        mobileMenuOpen={mobileMenuOpen}
        onClose={handleMobileMenuClose}
      />

      {/* Main content wrapper */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
