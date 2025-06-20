import React, { useState, useEffect } from "react";
import { TableOfContents } from "@/components";
import PolicySection from "@/components/common/PolicySection";
import ContactCard from "@/components/common/ContactCard";
import { Card } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { ChevronDown, ChevronUp } from "lucide-react";

// Define the table of contents items
const tocItems = [
  { id: "agreement", title: "Agreement to Terms", number: 1 },
  { id: "eligibility", title: "Eligibility", number: 2 },
  { id: "user-accounts", title: "User Accounts", number: 3 },
  { id: "acceptable-use", title: "Acceptable Use", number: 4 },
  { id: "intellectual-property", title: "Intellectual Property", number: 5 },
  { id: "user-content", title: "User Content", number: 6 },
  { id: "privacy-policy", title: "Privacy Policy", number: 7 },
  { id: "termination", title: "Termination", number: 8 },
  { id: "disclaimer", title: "Disclaimer", number: 9 },
  { id: "limitation-liability", title: "Limitation of Liability", number: 10 },
  { id: "changes-terms", title: "Changes to Terms", number: 11 },
  { id: "contact-information", title: "Contact Information", number: 12 },
];

// Contact information
const contactInfo = {
  email: "support@englishmate.com",
  address: "123 Learning Street, Education City, EC 12345",
  phone: "+1 (555) 123-4567",
};

const TermsOfService: React.FC = () => {
  const [isTableOpen, setIsTableOpen] = useState(false);

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
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full bg-[#FAFAFA]/50 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-[#525252]">
                Understand the rules and responsibilities when using
                EnglishMate.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Mobile TOC Toggle - hiển thị dưới lg (1024px) */}
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
                    items={tocItems} 
                    className="max-h-[300px] overflow-y-auto pr-2"
                    onItemClick={handleCloseTable}
                  />
                </div>
              )}
            </div>

            {/* Desktop Sidebar - Table of Contents - hiển thị từ lg (1024px) trở lên */}
            <aside className="hidden lg:block lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
                <TableOfContents items={tocItems} />
              </div>
            </aside>

            {/* Content */}
            <div className="w-full lg:w-3/4">
              <PolicySection
                id="agreement"
                title="Agreement to Terms"
                number={1}
              >
                <p className="mb-4">
                  By accessing or using EnglishMate, you agree to be bound by
                  these Terms of Service ("Terms"). If you do not agree to these
                  Terms, you may not access or use our service. These Terms
                  apply to all visitors, users, and others who access or use the
                  service.
                </p>
              </PolicySection>

              <PolicySection id="eligibility" title="Eligibility" number={2}>
                <p className="mb-4">
                  You must be at least 13 years old to use EnglishMate. If you
                  are under 18 years of age, you must have your parent or legal
                  guardian's permission to use the service. By using
                  EnglishMate, you represent and warrant that you meet these age
                  requirements.
                </p>
              </PolicySection>

              <PolicySection
                id="user-accounts"
                title="User Accounts"
                number={3}
              >
                <p className="mb-4">
                  When you create an account with us, you must provide
                  information that is accurate, complete, and current at all
                  times. You are responsible for safeguarding the password and
                  for all activities that occur under your account. You must
                  notify us immediately upon becoming aware of any breach of
                  security or unauthorized use of your account.
                </p>
              </PolicySection>

              <PolicySection
                id="acceptable-use"
                title="Acceptable Use"
                number={4}
              >
                <p className="mb-4">
                  You agree not to misuse the EnglishMate platform. You may not
                  upload, post, or transmit any content that is harmful,
                  threatening, abusive, harassing, defamatory, vulgar, obscene,
                  or otherwise objectionable. You also agree not to violate any
                  applicable laws or regulations while using our service.
                </p>

                <Card className="bg-[#FAFAFA] border-gray-200 p-6 my-6 rounded-lg">
                  <h3 className="text-lg font-medium text-black mb-4">
                    Prohibited Activities Include:
                  </h3>
                  <ul className="space-y-2 text-[#525252]">
                    <li>• Using the service for any unlawful purpose</li>
                    <li>
                      • Attempting to gain unauthorized access to our systems
                    </li>
                    <li>• Interfering with or disrupting the service</li>
                    <li>• Uploading malicious code or viruses</li>
                    <li>
                      • Impersonating others or providing false information
                    </li>
                  </ul>
                </Card>
              </PolicySection>

              <PolicySection
                id="intellectual-property"
                title="Intellectual Property"
                number={5}
              >
                <p className="mb-4">
                  The EnglishMate service and its original content, features,
                  and functionality are and will remain the exclusive property
                  of EnglishMate and its licensors. The service is protected by
                  copyright, trademark, and other laws. Our trademarks and trade
                  dress may not be used in connection with any product or
                  service without our prior written consent.
                </p>
              </PolicySection>

              <PolicySection id="user-content" title="User Content" number={6}>
                <p className="mb-4">
                  You retain ownership of any content you submit, post, or
                  display on or through the service. By posting content, you
                  grant us a worldwide, non-exclusive, royalty-free license to
                  use, copy, reproduce, process, adapt, modify, publish,
                  transmit, display, and distribute such content in any and all
                  media or distribution methods.
                </p>
              </PolicySection>

              <PolicySection
                id="privacy-policy"
                title="Privacy Policy"
                number={7}
              >
                <p className="mb-4">
                  Your privacy is important to us. Please review our Privacy
                  Policy, which also governs your use of the service, to
                  understand our practices regarding the collection and use of
                  your personal information.
                </p>
              </PolicySection>

              <PolicySection id="termination" title="Termination" number={8}>
                <p className="mb-4">
                  We may terminate or suspend your account and bar access to the
                  service immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever and without
                  limitation, including but not limited to a breach of the
                  Terms.
                </p>
              </PolicySection>

              <PolicySection id="disclaimer" title="Disclaimer" number={9}>
                <p className="mb-4">
                  The information on this service is provided on an "as is"
                  basis. To the fullest extent permitted by law, this Company
                  excludes all representations, warranties, conditions and terms
                  whether express or implied by statute, common law or
                  otherwise.
                </p>
              </PolicySection>

              <PolicySection
                id="limitation-liability"
                title="Limitation of Liability"
                number={10}
              >
                <p className="mb-4">
                  In no event shall EnglishMate, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential, or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses.
                </p>
              </PolicySection>

              <PolicySection
                id="changes-terms"
                title="Changes to Terms"
                number={11}
              >
                <p className="mb-4">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will try to provide at least 30 days notice prior to any new
                  terms taking effect. Your continued use of the service after
                  such modifications implies acceptance of the updated Terms.
                </p>
              </PolicySection>

              <PolicySection
                id="contact-information"
                title="Contact Information"
                number={12}
                className="mb-4"
              >
                <p className="mb-6">
                  If you have any questions about these Terms of Service, please
                  contact us at:
                </p>

                <ContactCard contactInfo={contactInfo} />
              </PolicySection>

              <div className="text-sm text-[#737373] text-center border-t border-gray-200 pt-6 mt-8">
                Last updated: January 15, 2025
              </div>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default TermsOfService;
