import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/client/Home";
// import AuthPage from "../features/auth/AuthPage";
import Courses from "@/pages/client/Courses";
import Detail from "@/pages/client/Detail";
import Practice from "@/pages/client/Practice";
import Pricing from "@/pages/client/Pricing";
import Login from "@/pages/client/Login";
import LoginAdmin from "@/pages/admin/Login";
import Register from "@/pages/client/Register";
import ForgotPassword from "@/pages/client/ForgotPassword";
import About from "@/pages/client/About";
import Contact from "@/pages/client/Contact";
import Profile from "@/pages/client/Profile";
import PrivacyPolicy from "@/pages/client/PrivatePolicy";
import TermsOfService from "@/pages/client/TermsOfService";
import HelpCenter from "@/pages/client/HelpCenter";
import FAQ from "@/pages/client/FAQ";
import RoadMap from "@/pages/client/RoadMap";
import RoadmapDetail from "@/pages/client/RoadmapDetail";
import Dashboard from "@/pages/admin/DashBoard";
import CreateCourse from "@/pages/client/CreateCourse";
import LessonDetail from "@/pages/client/LessonDetail";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<Detail />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/detail/roadmap/:id" element={<RoadmapDetail />} />
        <Route path="/detail/course/:id" element={<Detail />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/lesson/preview/:lessonId" element={<LessonDetail />} />

        {/* Admin */}
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
