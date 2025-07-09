import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GraduationCap, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  isAuthenticated: boolean;
  user?: any;
  onLogout: () => void;
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, user, onLogout, onMobileMenuToggle }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300 h-16">
      <div className="container mx-auto flex items-center justify-between h-full px-16">
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <Link to="/" className="text-2xl font-semibold text-gray-900 flex gap-2 ">
            <GraduationCap className="size-8  text-gray-900  " />
            <span className="text-gray-900">EnglishMate</span>
          </Link>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-4 text-gray-600 items-center">
          <NavLink to="/" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`} end>
            <span className="text-sm pl-[2px]">Dashboard</span>
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`}> <span className="text-sm pl-[2px]">Courses</span></NavLink>
          <NavLink to="/practice" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`}> <span className=" text-sm pl-[2px]">Practice</span></NavLink>
          {!isAuthenticated && (
            <NavLink to="/pricing" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`}> <span className="text-sm pl-[2px]">Pricing</span></NavLink>
          )}
          <NavLink to="/about" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`}> <span className="text-sm pl-[2px]">About</span></NavLink>
          <NavLink to="/contact" className={({ isActive }) => `flex items-center space-x-1 hover:text-gray-900 ${isActive ? "text-teal-500 font-semibold" : "text-gray-600"}`}> <span className="text-sm pl-[2px]">Contact</span></NavLink>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="p-0 bg-transparent border-0 focus:outline-none focus-visible:outline-none">
                <Avatar>
                  <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NavLink to="/profile" className="text-inherit hover:text-inherit">Profile</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 bg-transparent border-0 focus:outline-none focus-visible:outline-none" onClick={onMobileMenuToggle} aria-label="Toggle menu">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header; 