import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactValues = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const onSubmit = (values: ContactValues) => {
    // TODO: handle send message
  };
  return (
    <>
      <section className="text-center mt-20 px-4 py-4 md:px-0 bg-gray-50 ">
        <h1 className="text-4xl font-semibold mb-4 text-gray-600">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          We're here to help and answer any questions you may have.
        </p>
        <div className="flex"></div>
      </section>

      <section className="min-h-[80vh] flex flex-col items-center justify-center py-16 px-4 bg-white">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader className="text-left pb-2">
              <CardTitle className="text-3xl font-semibold text-gray-900 mb-2">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Your subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full text-base font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          {/* Contact Info */}
          <div className="flex flex-col justify-center bg-transparent rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-md">
                  <Mail className="w-4 h-4 text-gray-500 " />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-gray-500 text-base font-bold">
                    Email support
                  </h2>
                  <span className="text-gray-400 text-sm font-semibold">
                    hello@englishmate.com
                  </span>
                  <span className="text-gray-400 text-sm ">
                    hello@englishmate.com
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-md">
                  <Phone className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-gray-500 text-base font-bold">
                    Phone support
                  </h2>
                  <span className="text-gray-400 text-sm font-semibold">
                    +1 (555) 123-4567
                  </span>
                  <span className="text-gray-400 text-sm ">
                    Mon-Fri, 9AM-6PM EST
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-md">
                  <MapPin className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-gray-500 text-base font-bold">
                    Office Location
                  </h2>
                  <span className="text-gray-400 text-sm font-semibold">
                    123 Learning Street
                  </span>
                  <span className="text-gray-400 text-sm ">
                    Education City, EC 12345
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-md">
                  <Clock className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-gray-500 text-base font-bold">
                    Response Time
                  </h2>
                  <span className="text-gray-400 text-sm font-semibold">
                    Average: 2-4 hours
                  </span>
                  <span className="text-gray-400 text-sm ">
                    During business hours
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 px-10 bg-[#F5F5F5] py-6 rounded-lg">
              <h2 className="text-gray-500 text-base font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-base font-semibold">
                      How do I reset my password?
                    </span>
                    <span className="text-gray-400 text-sm">
                      Visit the login page and click "Forgot Password"
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-base font-semibold">
                      Can I change my subscription plan?
                    </span>
                    <span className="text-gray-400 text-sm">
                      Yes, upgrade or downgrade anytime in settings
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-base font-semibold">
                      Do you offer refunds?
                    </span>
                    <span className="text-gray-400 text-sm">
                      30-day money-back guarantee for all plans
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-20 bg-gradient-to-r from-gray-50 to-gray-100 text-center mb-2">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">
            Visit Our Office
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Drop by for a coffee and chat about your learning goals
          </p>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-xl ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2220318580526!2d106.63822607637314!3d10.794299489355595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529529d099b9f%3A0x284e3c8e9a7472d5!2zMjRBIELDoHUgQ8OhdCAyLCBQaMaw4budbmcgMTQsIFTDom4gQsOsbmgsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1750135435872!5m2!1svi!2s"
              width="1000"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
