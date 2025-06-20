import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MingcuteGoogleFill as Google } from "@/components/icon/Google";
import { IcOutlineFacebook as Facebook } from "@/components/icon/Facebook";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (values: RegisterValues) => {
    // handle registration logic
    // console.log(values);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl rounded-xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Create your account
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Start your English learning journey today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="terms"
                        className="p-0"
                      />
                    </FormControl>
                    <FormLabel htmlFor="terms" className="text-sm font-normal">
                      I agree to the{" "}
                      <Dialog>
                        <DialogTrigger asChild>
                          <a href="#" className="text-blue-600 hover:underline">
                            terms
                          </a>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Terms and Conditions</DialogTitle>
                          </DialogHeader>
                          <div className="mt-2 text-sm text-gray-700">
                            {/* Nội dung terms ở đây */}
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </div>
                        </DialogContent>
                      </Dialog>{" "}
                      and{" "}
                      <Dialog>
                        <DialogTrigger asChild>
                          <a href="#" className="text-blue-600 hover:underline">
                            privacy policy
                          </a>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Privacy Policy</DialogTitle>
                          </DialogHeader>
                          <div className="mt-2 text-sm text-gray-700 max-h-[30rem] overflow-y-scroll scroll-none">
                            <Accordion type="single" collapsible>
                              <AccordionItem value="item-1">
                                <AccordionTrigger>
                                  1. Introduction
                                </AccordionTrigger>
                                <AccordionContent>
                                  Welcome to EnglishMate (“we”, “our”, or “us”).
                                  Your privacy is important to us. This Privacy
                                  Policy explains how we collect, use, disclose,
                                  and protect your personal information when you
                                  use our website and services.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-2">
                                <AccordionTrigger>
                                  2. Information We Collect
                                </AccordionTrigger>
                                <AccordionContent>
                                  We may collect the following types of personal
                                  information: Personal Identifiers: Name, email
                                  address, phone number, and username. Account
                                  Information: Password, profile picture,
                                  learning preferences. Usage Data: Pages
                                  visited, time spent on the website, quiz
                                  results, and interaction logs. Technical Data:
                                  IP address, browser type, device information,
                                  cookies, and location data.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-3">
                                <AccordionTrigger>
                                  3. How We Use Your Information
                                </AccordionTrigger>
                                <AccordionContent>
                                  Your information is used to: Provide and
                                  maintain our learning services. Personalize
                                  your learning experience. Communicate with you
                                  about updates, promotions, and service-related
                                  notices. Improve our website and offerings
                                  through analytics. Ensure security and prevent
                                  fraudulent activities.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-4">
                                <AccordionTrigger>
                                  4. Sharing Your Information
                                </AccordionTrigger>
                                <AccordionContent>
                                  We do not sell your personal information.
                                  However, we may share data with: Service
                                  Providers: For hosting, analytics, or customer
                                  support. Legal Authorities: When required by
                                  law or to protect our legal rights. Business
                                  Transfers: In the event of a merger,
                                  acquisition, or sale of assets.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-5">
                                <AccordionTrigger>
                                  5. Cookies and Tracking Technologies
                                </AccordionTrigger>
                                <AccordionContent>
                                  We use cookies and similar technologies to
                                  enhance user experience, analyze usage, and
                                  deliver relevant content. You may modify your
                                  browser settings to decline cookies, but this
                                  may affect certain website functionalities.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-6">
                                <AccordionTrigger>
                                  6. Data Retention
                                </AccordionTrigger>
                                <AccordionContent>
                                  We retain your data only for as long as
                                  necessary to fulfill the purposes outlined in
                                  this policy, unless a longer retention period
                                  is required by law.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-7">
                                <AccordionTrigger>
                                  7. Your Rights
                                </AccordionTrigger>
                                <AccordionContent>
                                  Depending on your location, you may have the
                                  right to: Access, correct, or delete your
                                  personal information. Object to or restrict
                                  certain data processing. Withdraw consent at
                                  any time. To exercise these rights, contact us
                                  at [your contact email].
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-8">
                                <AccordionTrigger>
                                  8. Children’s Privacy
                                </AccordionTrigger>
                                <AccordionContent>
                                  Our services are not directed to individuals
                                  under the age of 13. We do not knowingly
                                  collect data from children. If we learn that
                                  we have inadvertently done so, we will delete
                                  the information promptly.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-9">
                                <AccordionTrigger>
                                  9. Data Security
                                </AccordionTrigger>
                                <AccordionContent>
                                  We implement appropriate technical and
                                  organizational measures to safeguard your
                                  personal data from unauthorized access,
                                  disclosure, alteration, or destruction.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-10">
                                <AccordionTrigger>
                                  10. Third-Party Links
                                </AccordionTrigger>
                                <AccordionContent>
                                  Our website may contain links to external
                                  sites. We are not responsible for the privacy
                                  practices or content of these sites.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-11">
                                <AccordionTrigger>
                                  11. Updates to This Policy
                                </AccordionTrigger>
                                <AccordionContent>
                                  We may update this Privacy Policy from time to
                                  time. Any changes will be posted on this page
                                  with an updated effective date.
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-12">
                                <AccordionTrigger>
                                  12. Contact Us
                                </AccordionTrigger>
                                <AccordionContent>
                                  If you have any questions or concerns
                                  regarding this Privacy Policy, please contact
                                  us at: 📧 [Insert your email address] 📍
                                  [Insert business address, if applicable]
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4" size="lg">
                Sign Up
              </Button>
            </form>
          </Form>
          <div className="mt-6">
            <Separator />
            <div className="text-center text-sm text-gray-500 mt-4">
              Or continue with
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 w-1/2"
              >
                <Google color="red" />
                Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 w-1/2"
              >
                <Facebook color="blue" />
                Facebook
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
