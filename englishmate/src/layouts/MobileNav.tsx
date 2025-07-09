import React from "react";
import { NavLink } from "react-router-dom";

interface MobileNavProps {
  isAuthenticated: boolean;
  mobileMenuOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isAuthenticated, mobileMenuOpen, onClose }) => {
  if (!mobileMenuOpen) return null;
  return (
    <nav className="md:hidden bg-white border-t border-gray-300 px-4 py-2 space-y-2">
      <NavLink to="/" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`} end onClick={onClose}>
        <span className="text-sm pl-[2px]">Dashboard</span>
      </NavLink>
      <NavLink to="/courses" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`} onClick={onClose}>
        <span className="text-sm pl-[2px]">Courses</span>
      </NavLink>
      <NavLink to="/practice" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`} onClick={onClose}>
        <span className="text-gray-600 text-sm pl-[2px]">Practice</span>
      </NavLink>
      {!isAuthenticated && (
        <NavLink to="/pricing" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`} onClick={onClose}>
          <span className="text-sm pl-[2px]">Pricing</span>
        </NavLink>
      )}
      <NavLink to="/about" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`} onClick={onClose}>
        <span className="text-sm pl-[2px]">About</span>
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`} onClick={onClose}>
        <span className="text-sm pl-[2px]">Contact</span>
      </NavLink>
      {isAuthenticated ? (
        <NavLink to="/profile" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`} onClick={onClose}>
          <span className="text-sm pl-[2px]">Profile</span>
        </NavLink>
      ) : (
        <NavLink to="/login" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`} onClick={onClose}>
          <span className="text-sm pl-[2px]">Login</span>
        </NavLink>
      )}
    </nav>
  );
};

export default MobileNav; 