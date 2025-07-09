import React from "react";
import type { ReactNode } from "react";
import {
  Menu,
  Phone,
  MapPin,
  GraduationCap,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../store/authSlice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authService } from "@/features/auth/services/auth.service";
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState({
    main: false,
    courses: false,
  });

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const res = authService.loout();
    g;
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - START */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300 h-16">
        <div className="container mx-auto flex items-center justify-between h-full px-16">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-semibold text-gray-900 flex gap-2 "
            >
              <GraduationCap className="size-8  text-gray-900  " />
              <span className="text-gray-900">EnglishMate</span>
            </Link>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-4 text-gray-600 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-gray-900 ${
                  isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                }`
              }
              end
            >
              <span className="text-sm pl-[2px]">Dashboard</span>
            </NavLink>
            {/* Courses Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 bg-transparent border-0 p-0 hover:text-gray-900 focus:outline-none focus-visible:outline-none">
                <span className="text-sm pl-[2px]">Courses</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <NavLink to="/courses" className="w-full text-left">
                    All Courses
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/courses/create" className="w-full text-left">
                    Create Course
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavLink
              to="/practice"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-gray-900 ${
                  isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                }`
              }
            >
              <span className=" text-sm pl-[2px]">Practice</span>
            </NavLink>
            {isAuthenticated ? (
              <></>
            ) : (
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `flex items-center space-x-1 hover:text-gray-900 ${
                    isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                  }`
                }
              >
                <span className="text-sm pl-[2px]">Pricing</span>
              </NavLink>
            )}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-gray-900 ${
                  isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                }`
              }
            >
              <span className="text-sm pl-[2px]">About</span>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-gray-900 ${
                  isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                }`
              }
            >
              <span className="text-sm pl-[2px]">Contact</span>
            </NavLink>

            {/* Hiển thị Login/Logout và Start Learning tùy theo trạng thái đăng nhập */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="p-0 bg-transparent border-0 focus:outline-none focus-visible:outline-none">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <NavLink
                      to="/profile"
                      className="text-inherit hover:text-inherit"
                    >
                      Profile
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <></>
            )}
          </nav>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 bg-transparent border-0 focus:outline-none focus-visible:outline-none"
            onClick={() =>
              setMobileMenuOpen((prev) => ({ ...prev, main: !prev.main }))
            }
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
        {/* Mobile nav */}
        {mobileMenuOpen.main && (
          <nav className="md:hidden bg-white border-t border-gray-300 px-4 py-2 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-gray-900 ${
                  isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                }`
              }
              end
            >
              <span className="text-sm pl-[2px]">Dashboard</span>
            </NavLink>
            {/* Mobile Courses Submenu */}
            <div>
              <button
                className="flex items-center space-x-1 w-full text-left text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() =>
                  setMobileMenuOpen((prev) => ({
                    ...prev,
                    courses: !prev.courses,
                  }))
                }
                type="button"
              >
                <span className="text-sm pl-[2px]">Courses</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {mobileMenuOpen.courses && (
                <div className="pl-6 flex flex-col space-y-1 mt-1">
                  <NavLink
                    to="/courses"
                    className={({ isActive }) =>
                      `text-sm ${
                        isActive
                          ? "text-teal-500 font-semibold"
                          : "text-gray-600"
                      }`
                    }
                  >
                    All Courses
                  </NavLink>
                  <NavLink
                    to="/courses/create"
                    className={({ isActive }) =>
                      `text-sm ${
                        isActive
                          ? "text-teal-500 font-semibold"
                          : "text-gray-600"
                      }`
                    }
                  >
                    Create Course
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink
              to="/practice"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-gray-900 ${
                  isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                }`
              }
            >
              <span className="text-gray-600 text-sm pl-[2px]">Practice</span>
            </NavLink>
            {isAuthenticated ? (
              <></>
            ) : (
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `flex items-center space-x-1 hover:text-gray-900 ${
                    isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                  }`
                }
              >
                <span className="text-sm pl-[2px]">Pricing</span>
              </NavLink>
            )}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-gray-900 ${
                  isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                }`
              }
            >
              <span className="text-sm pl-[2px]">About</span>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-gray-900 ${
                  isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                }`
              }
            >
              <span className="text-sm pl-[2px]">Contact</span>
            </NavLink>

            {/* Hiển thị Login/Logout và Start Learning tùy theo trạng thái đăng nhập */}
            {isAuthenticated ? (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center space-x-1 hover:text-gray-900 ${
                    isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                  }`
                }
              >
                <span className="text-sm pl-[2px]">Profile</span>
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 hover:text-gray-900 ${
                      isActive ? "text-teal-500 font-semibold" : "text-gray-600"
                    }`
                  }
                >
                  <span className="text-sm pl-[2px]">Login</span>
                </NavLink>
              </>
            )}
          </nav>
        )}
      </header>
      {/* Header - END */}

      {/* Main content */}
      <main className="flex-grow container mx-auto">{children}</main>

      {/* Footer - START */}
      <footer className="py-12 w-full bg-teal-400/10 border-t-2 border-teal-500">
        <div className="mx-auto w-4/5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-8 md:space-y-0 gap-8">
            {/* Left side */}
            <div className="md:w-1/4">
              <div className="text-2xl font-semibold text-gray-900 mb-2 flex gap-1">
                <GraduationCap className="size-8 " />
                <span>EnglishMate</span>
              </div>
              <p className="text-gray-600 text-sm pl-[2px]">
                Empowering learners worldwide to master English with confidence
                and achieve their goals.
              </p>
              <div className="flex gap-4 mt-4">
                <Facebook className="text-teal-500"></Facebook>
                <Twitter className="text-teal-500 "></Twitter>
                <Instagram className="text-teal-500 "></Instagram>
                <Linkedin className="text-teal-500 "></Linkedin>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 ">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <NavLink to="/" className="hover:text-gray-900 text-gray-600">
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      Home
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/courses"
                    className="hover:text-gray-900 text-gray-600"
                  >
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      Courses
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/practice"
                    className="hover:text-gray-900 text-gray-600"
                  >
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      Practice
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pricing"
                    className="hover:text-gray-900 text-gray-600"
                  >
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      Pricing
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="hover:text-gray-900 text-gray-600"
                  >
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      About Us
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Support
              </h3>
              <ul className="space-y-2 ">
                <li>
                  <NavLink
                    to="/help-center"
                    className="hover:text-gray-900 text-gray-600"
                  >
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      Help Center
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="hover:text-gray-900 text-gray-600"
                  >
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      Contact Us
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/privacy-policy"
                    className="hover:text-gray-900 text-gray-600"
                  >
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      Privacy Policy
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/terms-of-service"
                    className="hover:text-gray-900 text-gray-600"
                  >
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      Terms of Service
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/faq"
                    className="hover:text-gray-900 text-gray-600"
                  >
                    <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                      FAQ
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Info
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>hello@englishmate.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>New York, NY 10001</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm">
            © 2025 EnglishMate. All rights reserved.
          </div>
        </div>
      </footer>
      {/* Footer - END */}
    </div>
  );
};

export default MainLayout;
