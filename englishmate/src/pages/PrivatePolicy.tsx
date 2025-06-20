import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { TableOfContents, PolicySection, ContactCard } from "../components";
import { ChevronDown, ChevronUp } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  const [isTableOpen, setIsTableOpen] = useState(false);

  const tableItems = [
    { id: "introduction", title: "Introduction", number: 1 },
    { id: "data-collection", title: "Data We Collect", number: 2 },
    { id: "data-usage", title: "How We Use Your Data", number: 3 },
    { id: "data-sharing", title: "Data Sharing", number: 4 },
    { id: "your-rights", title: "Your Rights", number: 5 },
    { id: "cookies", title: "Cookies", number: 6 },
    { id: "data-security", title: "Data Security", number: 7 },
    { id: "contact", title: "Contact Us", number: 8 },
  ];

  const contactInfo = {
    email: "privacy@englishmate.com",
    address: "123 Learning Street, Education City, EC 12345",
    phone: "+1 (555) 123-4567",
  };

  const toggleTableOfContents = () => {
    setIsTableOpen(!isTableOpen);
  };

  const handleCloseTable = () => {
    setIsTableOpen(false);
  };

  // Re-introduce global CSS for scroll padding
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 96px; /* Fixed offset for all screen sizes */
      }
      
      section[id] {
        scroll-margin-top: 96px; /* Fixed offset for all screen sizes */
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen pt-24 pb-12">
        {/* Header Section */}
        <section className="w-full bg-[#FAFAFA] py-12">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-[#525252] text-center mt-4 max-w-2xl mx-auto">
              Your data matters to us. Here's how we handle it.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Toggle for Table of Contents - hiển thị ở màn hình dưới lg */}
            <div className="lg:hidden mb-6 w-full">
              <button
                onClick={toggleTableOfContents}
                className="flex items-center justify-between w-full bg-white p-4 rounded-md shadow-sm border border-gray-200"
              >
                <span className="font-medium">Table of Contents</span>
                {isTableOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              {/* Mobile/Tablet Table of Contents */}
              {isTableOpen && (
                <div className="mt-2 bg-white rounded-md shadow-sm border border-gray-200 p-4">
                  <TableOfContents 
                    items={tableItems} 
                    className="max-h-[300px] overflow-y-auto pr-2"
                    onItemClick={handleCloseTable}
                  />
                </div>
              )}
            </div>
            
            {/* Desktop Sidebar - Table of Contents - hiển thị từ lg trở lên */}
            <aside className="hidden lg:block lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
                <TableOfContents items={tableItems} />
              </div>
            </aside>

            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              {/* 1. Introduction */}
              <PolicySection id="introduction" title="Introduction" number={1}>
                  <p>
                    EnglishMate is committed to protecting your privacy. This
                    Privacy Policy explains how we collect, use, and safeguard
                    your information when you use our language learning platform.
                    By using our services, you agree to the collection and use of
                    information in accordance with this policy.
                  </p>
                  <p>
                    This policy applies to all users of the EnglishMate platform,
                    including students, teachers, and visitors to our website.
                  </p>
              </PolicySection>

              {/* 2. Data Collection */}
              <PolicySection id="data-collection" title="Data We Collect" number={2}>
                <>
                  <p className="mb-4">
                    We may collect personal information including your name, email
                    address, and course activity to provide better learning
                    experiences. The types of data we collect include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Personal identification information (name, email, profile
                      picture)
                    </li>
                    <li>Learning progress and course completion data</li>
                    <li>Usage analytics and platform interaction data</li>
                    <li>Communication preferences and settings</li>
                    <li>Payment information for premium services</li>
                  </ul>
                </>
              </PolicySection>

              {/* 3. Data Usage */}
              <PolicySection id="data-usage" title="How We Use Your Data" number={3}>
                <>
                  <p className="mb-4">
                    Your data helps us personalize content, improve our services,
                    and communicate updates. Specifically, we use your information
                    to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide personalized learning recommendations</li>
                    <li>Track your progress and maintain learning records</li>
                    <li>Send important updates about our services</li>
                    <li>Improve our platform based on usage patterns</li>
                    <li>Provide customer support when needed</li>
                  </ul>
                </>
              </PolicySection>

              {/* 4. Data Sharing */}
              <PolicySection id="data-sharing" title="Data Sharing" number={4}>
                <>
                  <p className="mb-4">
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except in
                    the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      With service providers who assist in operating our platform
                    </li>
                    <li>When required by law or to protect our rights</li>
                    <li>In case of a business transfer or merger</li>
                    <li>With your explicit consent for specific purposes</li>
                  </ul>
                </>
              </PolicySection>

              {/* 5. Your Rights */}
              <PolicySection id="your-rights" title="Your Rights" number={5}>
                <>
                  <p className="mb-4">
                    You have several rights regarding your personal data:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Right to access your personal data</li>
                    <li>Right to correct inaccurate information</li>
                    <li>Right to delete your account and data</li>
                    <li>Right to data portability</li>
                    <li>Right to opt-out of marketing communications</li>
                  </ul>
                </>
              </PolicySection>

              {/* 6. Cookies */}
              <PolicySection id="cookies" title="Cookie Usage" number={6}>
                <div className="space-y-4">
                  <p>
                    We use cookies and similar technologies to enhance your
                    experience on our platform. These help us remember your
                    preferences, analyze site traffic, and provide personalized
                    content.
                  </p>
                  <p>
                    You can control cookie settings through your browser
                    preferences, though disabling certain cookies may affect
                    platform functionality.
                  </p>
                </div>
              </PolicySection>

              {/* 7. Data Security */}
              <PolicySection id="data-security" title="Data Security" number={7}>
                <div className="space-y-4">
                  <p>
                    We implement appropriate technical and organizational
                    measures to protect your personal data against unauthorized
                    access, alteration, disclosure, or destruction.
                  </p>
                  <p>
                    However, no method of transmission over the internet is 100%
                    secure, and we cannot guarantee absolute security.
                  </p>
                </div>
              </PolicySection>

              {/* 8. Contact Us */}
              <PolicySection 
                id="contact" 
                title="Contact Us" 
                number={8} 
                className="mb-6"
              >
                <>
                  <p className="mb-6">
                    If you have any questions about this Privacy Policy or our data
                    practices, please contact us:
                  </p>
                  <ContactCard contactInfo={contactInfo} className="mb-6" />
                  <p className="text-sm text-[#525252]">
                    Last updated: January 15, 2025
                  </p>
                </>
              </PolicySection>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
