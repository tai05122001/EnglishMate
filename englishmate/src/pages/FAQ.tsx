import FAQItem from "@/components/common/FAQItem";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import React from "react";

// FAQ data
const faqs = [
  {
    question: "How do I start a course?",
    answer: "Just sign up, choose a course, and click \"Start Learning\" to begin immediately. Our courses are designed to be beginner-friendly and you can start at any time."
  },
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at your next billing cycle, and you'll only pay the difference."
  },
  {
    question: "How do I reset my password?",
    answer: "Click \"Forgot Password\" on the login page, enter your email address, and we'll send you a reset link. Follow the instructions in the email to create a new password."
  },
  {
    question: "Is EnglishMate free to use?",
    answer: "We offer a free tier with basic lessons and limited features. For full access to all courses, exercises, and premium features, you can upgrade to our paid plans."
  },
  {
    question: "Can I learn on mobile?",
    answer: "Absolutely! EnglishMate is fully responsive and works great on mobile devices. You can also download our mobile app for iOS and Android for the best mobile experience."
  },
  {
    question: "How long does it take to complete a course?",
    answer: "Course duration varies depending on the level and your learning pace. Most courses take 2-6 months to complete if you study 15-30 minutes daily. You can learn at your own pace."
  },
  {
    question: "Do you offer certificates?",
    answer: "Yes! Upon completing a course, you'll receive a digital certificate that you can share on LinkedIn, add to your resume, or download as a PDF."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period."
  }
];

const FAQ: React.FC = () => {
  return (
    <>
      <div className="min-h-screen pt-16 pb-12">
        {/* Header Section */}
        <section className="w-full bg-[#FAFAFA] py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">
              FAQ
            </h1>
            <p className="text-lg md:text-xl text-[#525252] text-center mt-4 max-w-2xl mx-auto">
              Need assistance? Browse help topics or contact our support team.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            {/* FAQ Items */}
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>

            {/* Contact Support Section */}
            <div className="mt-16 text-center">
              <h3 className="text-lg font-medium text-[#525252] mb-6">Still need help?</h3>
              <Button
                className="bg-[#171717] hover:bg-[#262626] text-white flex items-center gap-2 mx-auto px-6 py-5 h-auto rounded-md"
              >
                <Mail className="h-5 w-5" />
                <span className="font-normal">Contact Support</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FAQ;
