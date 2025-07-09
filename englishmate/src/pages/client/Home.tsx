import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Award, Brain, Bot, Gamepad2, LucideArrowUpToLine } from "lucide-react";
import man1 from "../../assets/man-1.svg";
import man2 from "../../assets/man-2.svg";
import woman1 from "../../assets/woman-1.svg";
import posterHome from "../../assets/poster_login3.png";
import StarBar from "../../components/common/StarBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import aboutUs from "../../assets/poster_about.png";

const Home: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 overflow-hidden bg-gray-100">
        <div className=" w-11/12 mx-auto flex flex-col md:flex-row items-center pl-4 rounded-lg bg-white p-2 shadow-lg">
          <div className="md:w-1/2 mb-10 md:mb-0  rounded-lg px-8">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-teal-500">
              Master English with Confidence
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Join thousands of learners who've improved their English skills
              with our interactive lessons, personalized practice, and expert
              guidance.
            </p>
            <div className="flex space-x-4">
              {isAuthenticated ? (
                <NavLink
                  to="/courses"
                  className="text-inherit hover:text-inherit"
                >
                  <Button
                    size="lg"
                    className="bg-teal-500 text-white hover:bg
                    
                    transition-colors"
                  >
                    Get started
                  </Button>
                </NavLink>
              ) : (
                <Button
                  size="lg"
                  className="bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                >
                  <NavLink
                    to="/login"
                    className="text-inherit hover:text-inherit"
                  >
                    Start Free Trial
                  </NavLink>
                </Button>
              )}
              <Button
                size="lg"
                className=" bg-gray-100 text-gray-900 hover:bg-gray-200"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Hero Illustration placeholder */}
            <div className=" border-10 border-gradient-to-r from-black to-teal-200 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
              <img
                className="rounded-lg"
                src={posterHome}
                alt="Poster Home"
              ></img>
            </div>
          </div>
        </div>
      </section>

    
      {/* Features Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-4 text-teal-500">
            Why Choose EnglishMate?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our comprehensive approach combines proven teaching methods with
            modern technology
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="group flex flex-col items-center text-center hover:border-teal-200 cursor-pointer border-2 transition-all duration-300 ease-in-out">
              <CardHeader className="items-center">
                <Bot className="w-12 h-12 text-gray-500 mb-2 group-hover:text-teal-400 transition-all duration-300 ease-in-out " />
                <CardTitle className="group-hover:text-teal-500 transition-all duration-300 ease-in-out">
                  AI-Powered Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Personalized lessons that adapt to your learning style and
                  pace
                </CardDescription>
              </CardContent>
            </Card>
            {/* Feature 2 */}
            <Card className="group flex flex-col items-center text-center hover:border-teal-200 cursor-pointer border-2 transition-all duration-300 ease-in-out">
              <CardHeader className="items-center">
                <Brain className="w-12 h-12 text-gray-500 mb-4 group-hover:text-teal-400 transition-all duration-300 ease-in-out" />
                <CardTitle className="group-hover:text-teal-500 transition-all duration-300 ease-in-out">
                  Spaced repetition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn English with the most effective learning method
                </CardDescription>
              </CardContent>
            </Card>
            {/* Feature 3 */}
            <Card className="group flex flex-col items-center text-center hover:border-teal-200 cursor-pointer border-2 transition-all duration-300 ease-in-out">
              <CardHeader className="items-center">
                <Gamepad2 className="w-12 h-12 text-gray-500 mb-4 group-hover:text-teal-400 transition-all duration-300 ease-in-out" />
                <CardTitle className="group-hover:text-teal-500 transition-all duration-300 ease-in-out">
                  Gamification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn while playing. The more you play, the more you learn.
                </CardDescription>
              </CardContent>
            </Card>
            {/* Feature 4 */}
            <Card className=" group flex flex-col items-center text-center hover:border-teal-200 cursor-pointer border-2 transition-all duration-300 ease-in-out">
              <CardHeader className="items-center">
                <LucideArrowUpToLine className="w-12 h-12 text-gray-500 mb-4 group-hover:text-teal-400 transition-all duration-300 ease-in-out" />
                <CardTitle className="group-hover:text-teal-500 transition-all duration-300 ease-in-out">
                  Advance your level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We offer training to upgrade your professional competency.
                </CardDescription>
              </CardContent>
            </Card>
            {/* Feature 5 */}
            <Card className=" group flex flex-col items-center text-center hover:border-teal-200 cursor-pointer border-2 transition-all duration-300 ease-in-out">
              <CardHeader className="items-center">
                <Award className="w-12 h-12 text-gray-500 mb-4 group-hover:text-teal-400 transition-all duration-300 ease-in-out" />
                <CardTitle className="group-hover:text-teal-500 transition-all duration-300 ease-in-out">
                  Certification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn recognized certificates upon course completion
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
   

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20 ">
        <div className="container mx-auto px-4 max-w-6xl ">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">
            What Our Students Say
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Real success stories from our learning community
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="hover:scale-105 transition-all duration-300 ease-in-out">
              <CardHeader className="flex flex-row items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={man1} alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Sarah Johnson</CardTitle>
                  <CardDescription>Marketing Manager</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <StarBar number={5} />
                <p className="text-gray-700 pt-2">
                  "EnglishMate helped me improve my business English
                  significantly. The AI tutoring is incredibly effective!"
                </p>
              </CardContent>
            </Card>
            {/* Testimonial 2 */}
            <Card className="hover:scale-105 transition-all duration-300 ease-in-out">
              <CardHeader className="flex flex-row items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={woman1} alt="Miguel Rodriguez" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Miguel Rodriguez</CardTitle>
                  <CardDescription>Software Engineer</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <StarBar number={5} />
                <p className="text-gray-700 pt-2">
                  "The speaking practice feature is amazing. I gained confidence
                  in just 3 months of consistent practice."
                </p>
              </CardContent>
            </Card>
            {/* Testimonial 3 */}
            <Card className="hover:scale-105 transition-all duration-300 ease-in-out">
              <CardHeader className="flex flex-row items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={man2} alt="Lisa Chen" />
                  <AvatarFallback>LC</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Lisa Chen</CardTitle>
                  <CardDescription>University Student</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <StarBar number={5} />
                <p className="text-gray-700 pt-2">
                  "Perfect for IELTS preparation. The structured lessons and
                  mock tests were exactly what I needed."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
        {/* About Section */}
        <section className="bg-white py-20 px-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Column - Text and Stats */}
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900">
                About EnglishMate
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                We are a forward-thinking platform dedicated to making English
                learning accessible and beneficial for everyone. Our mission
                is to empower individuals with intelligent solutions that drive
                growth, efficiency, and confidence in their English skills.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded by a team of language experts and tech innovators, EnglishMate
                combines cutting-edge technology with deep pedagogical knowledge to deliver
                solutions that truly make a difference in your language journey.
              </p>
              <div className="flex justify-between mt-8 max-w-sm">
                <div>
                  <p className="text-4xl font-bold text-teal-500">500+</p>
                  <p className="text-gray-600">Happy Learners</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-purple-500">24/7</p>
                  <p className="text-gray-600">Support</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-green-500">99.9%</p>
                  <p className="text-gray-600">Uptime</p>
                </div>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200 w-full h-5/6">
                <img
                  className="w-full h-auto "
                  src={aboutUs}
                  alt="About Us"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {isAuthenticated? (
          <section className="bg-gradient-to-r from-teal-300/70 to-teal-500 py-20 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Ready to Explore Your Learning Journey?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Discover our comprehensive learning roadmap designed to guide you
              from beginner to advanced, ensuring a clear path to fluency.
            </p>
            <NavLink to="/roadmap" className="text-inherit hover:text-inherit">
              <Button size="lg" className="text-white border-2 border-white bg-black hover:bg-black/80 transition-colors duration-300">
                View Learning Roadmap
              </Button>
            </NavLink>
          </div>
        </section>
      ) : (
        <> </>
      )}
    

      {/* Statistics Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Our Achievements & Impact
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We are proud of the progress our community has made and our commitment to excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Statistic 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <p className="text-5xl font-bold text-teal-500 mb-2">500+</p>
              <p className="text-xl text-gray-700">Courses Completed</p>
            </div>
            {/* Statistic 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <p className="text-5xl font-bold text-purple-500 mb-2">98%</p>
              <p className="text-xl text-gray-700">Satisfaction Rate</p>
            </div>
            {/* Statistic 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <p className="text-5xl font-bold text-green-500 mb-2">10K+</p>
              <p className="text-xl text-gray-700">Active Users</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
