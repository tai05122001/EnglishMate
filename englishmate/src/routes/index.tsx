import Home from "@/pages/Home";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AuthPage from "../features/auth/AuthPage";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Courses from "@/pages/Courses";
import Detail from "@/pages/Detail";
import FAQ from "@/pages/FAQ";
import ForgotPassword from "@/pages/ForgotPassword";
import HelpCenter from "@/pages/HelpCenter";
import Listening from "@/pages/Listening";
import Login from "@/pages/Login";
import Practice from "@/pages/Practice";
import Pricing from "@/pages/Pricing";
import PrivacyPolicy from "@/pages/PrivatePolicy";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import RoadMap from "@/pages/RoadMap";
import RoadmapDetail from "@/pages/RoadmapDetail";
import TermsOfService from "@/pages/TermsOfService";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="" element={<Home />} />
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
          <Route path="/listening" element={<Listening />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
};

export default App;
