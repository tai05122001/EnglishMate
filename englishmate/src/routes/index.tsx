import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
// import AuthPage from "../features/auth/AuthPage";
import Courses from "@/pages/Courses";
import Detail from "@/pages/Detail";
import Practice from "@/pages/Practice";
import Pricing from "@/pages/Pricing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Profile from "@/pages/Profile";
import PrivacyPolicy from "@/pages/PrivatePolicy";
import TermsOfService from "@/pages/TermsOfService";
import HelpCenter from "@/pages/HelpCenter";
import FAQ from "@/pages/FAQ";
import RoadMap from "@/pages/RoadMap";
import RoadmapDetail from "@/pages/RoadmapDetail";

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

      </Routes>
    </BrowserRouter>
  );
};

export default App;
