import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Award, BookOpen, Lightbulb, Users } from "lucide-react";

const team = [
  {
    name: "Anna Nguyen",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "10+ years in EdTech, passionate about language learning.",
  },
  {
    name: "David Lee",
    role: "Lead Developer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Full-stack engineer, loves building impactful products.",
  },
  {
    name: "Maria Garcia",
    role: "Curriculum Designer",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Expert in English education and digital content.",
  },
  {
    name: "James Smith",
    role: "AI Specialist",
    img: "https://randomuser.me/api/portraits/men/44.jpg",
    bio: "Machine learning enthusiast, language nerd.",
  },
];

const values = [
  {
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    title: "Innovation",
    desc: "We use the latest technology to make learning fun and effective.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: "Community",
    desc: "Join a global network of learners and supportive teachers.",
  },
  {
    icon: <Award className="w-6 h-6 text-green-500" />,
    title: "Quality",
    desc: "Expert-designed courses and real results for every student.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    title: "Growth",
    desc: "We believe in lifelong learning and personal progress.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-24 text-center bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            About EnglishMate
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Our mission is to empower everyone to master English with
            confidence, using technology and community to make learning
            accessible, engaging, and effective.
          </p>
          <Button size="lg" className="mt-2">
            Start Learning
          </Button>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50  ">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <Card
                key={v.title}
                className="flex flex-col items-center text-center py-8"
              >
                <div className="mb-4">{v.icon}</div>
                <CardTitle className="mb-2 text-lg">{v.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {v.desc}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <TooltipProvider>
              {team.map((member) => (
                <Card
                  key={member.name}
                  className="flex flex-col items-center text-center py-8"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={member.img} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{member.bio}</TooltipContent>
                  </Tooltip>
                  <CardTitle className="mb-1 text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    {member.role}
                  </Badge>
                </Card>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </section>

      <section className=" mx-auto px-6 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto py-4">  <h3 className="text-4xl font-semibold text-gray-900 mb-2 text-center">
          Our impact
        </h3>
          <div className="mt-12 flex flex-col sm:flex-row justify-center text-center text-gray-700 gap-6 sm:gap-12">
            <Card className="text-center p-4 file: w-1/4">
              <CardContent>
                <div>
                  <p className="text-3xl font-semibold">2,847</p>
                  <p className="text-sm">Active learners</p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-4 w-1/4">
              <CardContent>
                <div>
                  <p className="text-3xl font-semibold">94%</p>
                  <p className="text-sm">Success rate</p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-4 w-1/4">
              <CardContent>
                <div>
                  <p className="text-3xl font-semibold">200+</p>
                  <p className="text-sm">Hours of Content</p>
                </div>
              </CardContent>
            </Card>

          </div></div>

      </section>
    </>
  );
}
