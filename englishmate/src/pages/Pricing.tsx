import React from "react";
import {
  CheckCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  Headphones,
  Award,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const plans = [
  {
    name: "Free",
    description: "Perfect for beginners",
    price: "$0",
    priceSuffix: "/month",
    features: [
      {
        icon: <Clock className="w-4 h-4 text-teal-500" />,
        text: "5 lessons per day",
      },
      {
        icon: <BookOpen className="w-4 h-4 text-teal-500" />,
        text: "Basic vocabulary",
      },
      {
        icon: <Users className="w-4 h-4 text-teal-500" />,
        text: "Community support",
      },
      {
        icon: <Star className="w-4 h-4 text-teal-500" />,
        text: "Progress tracking",
      },
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious learners",
    price: "$9",
    priceSuffix: "/month",
    features: [
      {
        icon: <Clock className="w-4 h-4 text-teal-500" />,
        text: "Unlimited lessons",
      },
      {
        icon: <BookOpen className="w-4 h-4 text-teal-500" />,
        text: "Advanced vocabulary",
      },
      {
        icon: <Users className="w-4 h-4 text-teal-500" />,
        text: "Progress tracking",
      },
      {
        icon: <Headphones className="w-4 h-4 text-teal-500" />,
        text: "Offline mode",
      },
      {
        icon: <Star className="w-4 h-4 text-teal-500" />,
        text: "Priority support",
      },
    ],
    buttonText: "Get Started",
    popular: true,
  },
  {
    name: "Premium",
    description: "For fluency mastery",
    price: "$19",
    priceSuffix: "/month",
    features: [
      {
        icon: <CheckCircle className="w-4 h-4 text-teal-500" />,
        text: "Everything in Pro",
      },
      {
        icon: <Users className="w-4 h-4 text-teal-500" />,
        text: "1-on-1 tutoring",
      },
      {
        icon: <Award className="w-4 h-4 text-teal-500" />,
        text: "Custom lesson plans",
      },
      {
        icon: <Star className="w-4 h-4 text-teal-500" />,
        text: "Certification prep",
      },
      {
        icon: <Headphones className="w-4 h-4 text-teal-500" />,
        text: "24/7 support",
      },
    ],
    buttonText: "Get Started",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Our Free plan gives you access to basic features. Pro and Premium plans come with a 7-day free trial.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.",
  },
];

const PricingContent: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Flexible pricing for learners of all levels. Start your English
            journey today.
          </p>
        </section>

        <section className="max-w-7xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3 mb-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.popular ? "border-2 border-teal-500" : "border border-gray-200"}`}
            >
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {plan.name}
                  </h2>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.priceSuffix}</span>
                </div>
                <ul className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature: { icon: React.ReactNode; text: string }, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      {feature.icon}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full py-2 font-semibold ${plan.popular ? "bg-teal-500 hover:bg-teal-500 text-white" : "bg-gray-900 hover:bg-gray-800 text-white"}`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
                {plan.popular && (
                  <Badge className="absolute top-0 right-0 rounded-bl-md rounded-tr-xl bg-teal-500 text-white text-xs font-bold px-2 py-1">
                    Most Popular
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="bg-white rounded-md border border-gray-200">
                <AccordionTrigger className="font-medium text-gray-900 px-4 py-2">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </MainLayout>
  );
};

export default PricingContent;
