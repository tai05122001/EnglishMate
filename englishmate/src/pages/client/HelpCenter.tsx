import React from "react";
import { Mail } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

const HelpCenter: React.FC = () => {
  return (
    <MainLayout>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-[#FAFAFA] py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Help Center</h1>
              <p className="text-lg text-gray-600">
                Need assistance? Browse help topics or contact our support team.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Getting Started Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
            <div className="border border-gray-200 rounded-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">How do I create an account?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      Click "Sign Up" in the top menu and fill out the registration form to begin learning.
                      You'll need to provide your email address and create a secure password.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">What do I need to get started?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      All you need is a computer or mobile device with internet access and speakers or headphones.
                      We recommend using a modern browser like Chrome, Firefox, or Safari for the best experience.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">How do I start my first lesson?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      After signing up, you'll take a placement test to determine your current level.
                      Then, you'll be presented with a personalized learning path where you can start your first lesson.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Account Management Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Management</h2>
            <div className="border border-gray-200 rounded-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">How do I reset my password?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      Visit the "Forgot Password" page and follow the instructions sent to your email.
                      You'll receive a secure link to create a new password.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">How do I update my profile information?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      Go to your Profile page by clicking on your avatar in the top right corner.
                      From there, you can edit your personal information, profile picture, and notification preferences.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">Can I delete my account?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      Yes, you can delete your account from the Account Settings section of your profile.
                      Please note that this action is permanent and all your data will be erased.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Learning & Progress Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Learning & Progress</h2>
            <div className="border border-gray-200 rounded-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">How do I track my progress?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      Your progress is automatically tracked in your Dashboard. You can see your completed lessons,
                      practice sessions, skill levels, and achievement badges all in one place.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">What if I miss a day of learning?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      No problem! While consistency is important for language learning, you can pick up right where
                      you left off. The system will remember your last position and continue from there.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">How do I change my learning level?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      You can retake the placement test from your Settings page to adjust your level. You can also
                      manually adjust the difficulty level for specific skills in your learning preferences.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Technical Support Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Support</h2>
            <div className="border border-gray-200 rounded-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">The website is running slowly. What should I do?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      Try clearing your browser cache and cookies. Make sure you're using an updated browser and
                      have a stable internet connection. If the problem persists, please contact our support team.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">I can't hear the audio in lessons</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      Check if your device volume is turned on and not muted. Make sure you've given browser permission
                      to play audio. Try using headphones to see if that resolves the issue.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-base font-medium">Is EnglishMate compatible with mobile devices?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-600">
                    <p>
                      Yes! EnglishMate is fully responsive and works on smartphones and tablets.
                      We also have dedicated apps for iOS and Android for a more optimized experience.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="bg-[#FAFAFA] rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Still need help?</h3>
            <p className="text-gray-600 mb-8 text-center">
              Contact our support team and we'll get back to you shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors hover:border-none">
                <Mail size={18} />
                <span>Contact Support</span>
              </button>
              <button className="flex items-center justify-center gap-2 border bg-transparent border-black text-gray-900 py-3 px-6 rounded-md hover:bg-gray-100 transition-colors hover:border-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HelpCenter;
