import React from "react";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
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
                <NavLink to="/courses" className="hover:text-gray-900 text-gray-600">
                  <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                    Courses
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/practice" className="hover:text-gray-900 text-gray-600">
                  <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                    Practice
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/pricing" className="hover:text-gray-900 text-gray-600">
                  <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                    Pricing
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-gray-900 text-gray-600">
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
                <NavLink to="/help-center" className="hover:text-gray-900 text-gray-600">
                  <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                    Help Center
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-gray-900 text-gray-600">
                  <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                    Contact Us
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy-policy" className="hover:text-gray-900 text-gray-600">
                  <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                    Privacy Policy
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms-of-service" className="hover:text-gray-900 text-gray-600">
                  <span className="text-gray-600 font-normal hover:text-teal-500 transition-all duration-300 ease-in-out">
                    Terms of Service
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className="hover:text-gray-900 text-gray-600">
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
  );
};

export default Footer; 