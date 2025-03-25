"use client";
import Typography from "@/components/common/ui/Typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@radix-ui/themes";
import { Circle, CircleCheck } from "lucide-react";
import React, { useState } from "react";
import { MdOutlineLock } from "react-icons/md";
import ModuleContent from "../common/ModuleContent";

type ExamItemProps = {
  id: string;
  title: string;
  unitTitle: string;
  startDate: string;
  score: number;
  completed: boolean;
  status: string;
};

const PersonalDevPlan = () => {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const [examNav, setExamNav] = useState<"past" | "upcoming">("past");
  const [mediaType, setMediaType] = useState<"video" | "reading" | "quiz">(
    "video"
  );
  const [filteredList, setFilteredList] = useState<ExamItemProps[]>(
    examsList.filter((item) => item.status === "past")
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleUnit = (unitId: string) => {
    setActiveUnit((prev) => (prev === unitId ? null : unitId));
  };

  const ExamItem: React.FC<{ item: ExamItemProps }> = ({ item }) => {
    return (
      <div className="flex items-center justify-between gap-2 p-2 light_shadow rounded-md">
        <div className="flex flex-col gap-[2px] md:gap-1">
          <h5 className="font-semibold md:text-lg line-clamp-1">
            {item.title}
          </h5>
          <span className="text-sm line-clamp-1">{item.unitTitle}</span>
          <span className="line-clamp-1">{item.startDate}</span>
        </div>
        {item.completed ? (
          <div className="flex flex-col items-center">
            <p>Score</p>
            <h5 className="text-lg md:text-xl font-semibold">{item.score}%</h5>
          </div>
        ) : (
          <>
            {item.status === "past" ? (
              <div className="w-48">
                <Button className="primary__btn btn !w-full">
                  <Typography.P weight="semibold" fontColor="white">
                    Start
                  </Typography.P>
                </Button>
              </div>
            ) : (
              <div className="w-48 self-end">
                <Button variant="outline" className="btn !w-full" disabled>
                  <Typography.P weight="semibold">Coming Soon</Typography.P>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <div className="xl:grid grid-cols-4 min-[1600px]:grid-cols-5 gap-6 w-full justify-between">
        <div className="col-span-3 h-fit space-y-3">
          <Typography.H3
            className="text-gray-800/90 max-sm:!text-lg"
            weight="semibold"
            size="xl"
          >
            {course?.name}
          </Typography.H3>
          <ModuleContent
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          {/* <CourseMedia mediaType={mediaType} /> */}
        </div>
        <div className="max-xl:mt-6 min-[1600px]:col-span-2">
          <Typography.H4 className="font-semibold !text-base">
            Course Units
          </Typography.H4>
          <ScrollArea className="h-screen">
            <Accordion type="multiple">
              {course?.units.map((unit, i) => (
                <AccordionItem
                  disabled={i > 1}
                  value={unit.number.toString()}
                  key={unit.number}
                >
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      {i > 1 ? (
                        <div className="w-fit">
                          <MdOutlineLock size={20} className="text-gray-600" />
                        </div>
                      ) : null}
                      <div className="">
                        <h5 className="font-semibold text-sm text-grey-12/90 text-left">
                          {unit.title}
                        </h5>
                        <span className="text-xs lg:text-sm line-clamp-1 text-grey-10 w-full text-left">
                          {unit.modules.length} lectures | {unit.totalDuration}{" "}
                          hours
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-hidden transition-all duration-500 ease-in-out overflow-y-auto">
                      <div>
                        <p className="text-sm font-medium text-grey-11">
                          {unit.introduction}
                        </p>
                        <h2 className="mt-2 font-semibold text-accent-900">
                          Modules
                        </h2>
                      </div>
                      <ul className="space-y-2">
                        <Accordion type="multiple" className="w-full">
                          {unit.modules.map((course, index) => (
                            <li
                              key={course.title}
                              role="button"
                              className="text-sm lg:text-base cursor-pointer flex items-center gap-2 w-full"
                            >
                              <AccordionItem
                                value={index.toString()}
                                key={index}
                                className="w-full"
                              >
                                <AccordionTrigger>
                                  <div className="text-sm lg:text-base cursor-pointer">
                                    <h4 className="text-sm font-medium text-gray-600">
                                      {course.title}
                                    </h4>
                                  </div>
                                </AccordionTrigger>{" "}
                                <AccordionContent className="space-y-2">
                                  {course?.content
                                    ? course.content.map((item, index) => (
                                        <div
                                          key={index + "90u"}
                                          onClick={() => {
                                            if (i !== 0) {
                                              setCurrentPage((prev) =>
                                                prev !== 8 ? prev + 1 : 1
                                              );
                                            }
                                            // if (item.lessonType === "video") {
                                            //   setMediaType("video");
                                            // } else if (
                                            //   item.lessonType === "reading"
                                            // ) {
                                            //   window.open(
                                            //     "https://www.aft.org/sites/default/files/Rosenshine.pdf",
                                            //     "_blank"
                                            //   );
                                            // } else {
                                            //   setMediaType("quiz");
                                            // }
                                          }}
                                          role="button"
                                          className=" flex items-center gap-2 cursor-pointer"
                                        >
                                          {i === 0 ? (
                                            <CircleCheck
                                              size={17}
                                              className="text-[#009439]"
                                            />
                                          ) : (
                                            <Circle
                                              size={17}
                                              className="text-black/70"
                                              strokeWidth={2}
                                            />
                                          )}
                                          <p>{item.title}</p>
                                        </div>
                                      ))
                                    : null}
                                </AccordionContent>
                              </AccordionItem>
                            </li>
                          ))}
                        </Accordion>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default PersonalDevPlan;

const course = {
  id: "1",
  name: "CPD Curriculum for Primary Teachers",
  description:
    "The course consists of 12 comprehensive modules, each of which is broken down into multiple lessons. These lessons are designed to build progressively, with each one focusing on a specific theme or skill. Progress tracking tools are available to help participants monitor their advancement through the course. \n As teachers work through each module, they will have the opportunity to assess their understanding through in-module quizzes, reinforcing their learning and ensuring they are ready to move to the next lesson. \n\n To support teachers in their learning, the course provides a variety of resources. These include downloadable PDFs that summarize key concepts, along with videos that illustrate strategies and practices in real classroom scenarios. In addition to written resources, teachers will have access to a range of reading links for further exploration, allowing them to deepen their understanding of specific topics. Interactive tests are embedded throughout the modules to assess knowledge and reinforce key learning points.",
  overview: {
    introduction:
      "Elevate your classroom expertise and support the developmental needs of young learners with our CPD curriculum for primary teachers. This course focuses on a holistic approach to teaching that integrates child development, classroom management, and modern educational tools to create positive learning environments.",
    objectives: [
      "Deepen Child Development Knowledge: Understand the stages of early childhood development to better support your students' learning journeys",
      "Improve Classroom Management: Acquire practical techniques to create and sustain an organized, nurturing classroom",
      "Refine Lesson Planning: Learn how to craft engaging lesson plans that cater to a variety of learning styles and abilities",
      "Enhance Emotional Intelligence: Develop skills to recognize and support the emotional well-being of your students",
      "Promote Inclusivity: Implement strategies that ensure every student feels valued and included",
      "Integrate Technology Effectively: Discover ways to incorporate technology into your teaching to enrich the learning experience",
      "Raise Mental Health Awareness: Equip yourself with the knowledge to address and support mental health in your classroom",
    ],
    duration: {
      totalHours: 20,
      numberOfUnits: 12,
      hoursPerUnit: "3.5-4",
    },
  },
  structure: {
    format: "12 comprehensive modules with multiple lessons",
    resources: [
      "Downloadable PDFs",
      "Videos of classroom scenarios",
      "Reading links",
      "Interactive tests",
    ],
  },
  certification: {
    type: "CPD accredited certificate",
    benefits: [
      "Add to portfolio",
      "Add to resume",
      "Add to LinkedIn profile",
      "Share on social media",
      "Use in performance review",
    ],
  },
  skillsAndCompetencies: [
    {
      title: "Understanding Child Development",
      description:
        "Recognizing cognitive, emotional, and social developmental milestones in primary-aged children.",
    },
    {
      title: "Classroom Management",
      description:
        " Implementing strategies to create a structured, respectful, and engaging learning environment.",
    },
    {
      title: "Lesson Planning and Differentiation",
      description:
        "Designing effective lesson plans that cater to diverse learning needs.",
    },
    {
      title: "Emotional Intelligence",
      description:
        "Helping students develop self-awareness, empathy, and emotional regulation.",
    },
    {
      title: "Inclusive Teaching",
      description:
        "Supporting students with special educational needs and overcoming learning barriers.",
    },
    {
      title: "Technology Integration",
      description:
        "Using digital tools and technology to enhance learning and student engagement.",
    },
    {
      title: "Assessment for Learning",
      description:
        "Designing formative and summative assessments to track and improve student progress.",
    },
    {
      title: "Cultural Awareness and Global Citizenship",
      description:
        "Promoting diversity, respect, and global perspectives in education.",
    },
    {
      title: "Literacy and Numeracy Development",
      description:
        "Teaching strategies to enhance reading, writing, and numeracy skills.",
    },
    {
      title: "Behaviour Management",
      description:
        "Using positive reinforcement and intervention strategies to handle disruptive behaviour.",
    },
    {
      title: "Reflective Teaching Practice",
      description:
        "Evaluating and improving personal teaching methods for continuous professional growth.",
    },
    {
      title: "Parental and Community Engagement",
      description:
        "Collaborating with parents and stakeholders to support student learning.",
    },
  ],
  accessibility: {
    platforms: ["Desktop", "Tablet", "Smartphone"],
    features: [
      "Mobile app version",
      "Progress tracking",
      "Learn at own convenience",
    ],
  },
  support: {
    features: [
      "Discussion forums",
      "Chatbot support",
      "Community engagement",
      "Collaborative learning opportunities",
    ],
  },
  units: [
    {
      number: 1,
      title: "Understanding Child Development",
      introduction:
        "This unit will help primary school teachers understand the cognitive, emotional, and social development of children at different stages. It will provide insight into the developmental milestones and how these influence teaching strategies.",
      objectives: [
        "Understand the stages of child development",
        "Identify key developmental milestones for primary-aged children",
        "Apply developmental theory to classroom practice",
        "Understand the impact of development on learning outcomes",
      ],
      modules: [
        {
          title: "Introduction to Child Development",
          duration: 1,
          content: [
            {
              title: "Theories of Child Development",
              readingMaterial:
                "Piaget's Cognitive Development Theory and its applications in education",
              lessonType: "reading",
            },
            {
              title: "Child Development in Context",
              readingMaterial:
                "Bronfenbrenner's Ecological Systems Theory and its relevance to classroom environments",
              lessonType: "video",
            },
            {
              title: "Understanding Developmental Psychology",
              readingMaterial:
                "Critical periods in child development and implications for learning",
              lessonType: "reading",
            },
          ],
        },
        {
          title: "Milestones in Primary Age Children",
          duration: 1,
          content: [
            {
              title: "Cognitive Milestones",
              readingMaterial:
                "Expected cognitive abilities of children aged 5-11 years",
              lessonType: "reading",
            },
            {
              title: "Social and Emotional Development",
              readingMaterial:
                "Friendship formation and emotional regulation in primary school children",
              lessonType: "caseStudy",
            },
            {
              title: "Physical Development",
              readingMaterial:
                "Fine and gross motor skill development and classroom activities",
              lessonType: "video",
            },
          ],
        },
        {
          title: "Developmental Theory in Practice",
          duration: 1.5,
          content: [
            {
              title: "Vygotsky in the Classroom",
              readingMaterial:
                "Zone of Proximal Development and scaffolding techniques for teachers",
              lessonType: "reading",
            },
            {
              title: "Applying Gardner's Multiple Intelligences",
              readingMaterial:
                "Recognizing and supporting different learning styles in the classroom",
              lessonType: "caseStudy",
            },
            {
              title: "Adapting Teaching to Developmental Needs",
              readingMaterial:
                "Creating developmentally appropriate learning experiences",
              lessonType: "video",
            },
          ],
        },
      ],
      totalDuration: 3.5,
    },
    {
      number: 2,
      title: "Effective Classroom Management",
      introduction:
        "Teachers will explore strategies to create a positive, safe, and productive classroom environment, focusing on behavior management and fostering respect.",
      objectives: [
        "Understand key classroom management strategies",
        "Develop proactive behavior management techniques",
        "Create a positive classroom culture",
        "Implement strategies for dealing with disruptive behavior",
      ],
      modules: [
        {
          title: "Introduction to Classroom Management",
          duration: 1,
          content: [
            {
              title: "Foundational Principles",
              readingMaterial:
                "Key theories and approaches to effective classroom management",
              lessonType: "reading",
            },
            {
              title: "Building Classroom Culture",
              readingMaterial:
                "Strategies for establishing norms and routines in the first weeks of school",
              lessonType: "video",
            },
            {
              title: "Teacher Presence and Authority",
              readingMaterial:
                "Developing your teaching persona and establishing respectful authority",
              lessonType: "reading",
            },
          ],
        },
        {
          title: "Positive Reinforcement Techniques",
          duration: 1.5,
          content: [
            {
              title: "Principles of Positive Behavior Support",
              readingMaterial:
                "Using praise, rewards, and encouragement effectively",
              lessonType: "reading",
            },
            {
              title: "Successful Classroom Reward Systems",
              readingMaterial:
                "Examples of age-appropriate incentive systems for primary students",
              lessonType: "caseStudy",
            },
            {
              title: "Beyond Stickers: Intrinsic Motivation",
              readingMaterial:
                "Moving from extrinsic to intrinsic motivation in the classroom",
              lessonType: "video",
            },
          ],
        },
        {
          title: "Managing Disruptive Behavior",
          duration: 1.5,
          content: [
            {
              title: "Understanding Challenging Behavior",
              readingMaterial:
                "Identifying the root causes of disruptive behaviors in primary students",
              lessonType: "reading",
            },
            {
              title: "De-escalation Techniques",
              readingMaterial:
                "Strategies for calming challenging situations in the classroom",
              lessonType: "video",
            },
            {
              title: "Consistent Consequences",
              readingMaterial:
                "Implementing fair and effective behavior management systems",
              lessonType: "caseStudy",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 3,
      title: "Effective Lesson Planning and Delivery",
      introduction:
        "This unit helps teachers create well-structured lesson plans that are engaging and meet diverse learning needs. It will cover differentiation, assessment, and reflective practice.",
      objectives: [
        "Learn the principles of effective lesson planning",
        "Understand how to differentiate lessons to meet all learners' needs",
        "Implement assessment strategies in lessons",
        "Reflect on and evaluate lesson effectiveness",
      ],
      modules: [
        {
          title: "Principles of Lesson Planning",
          duration: 1,
          content: [
            {
              title: "Lesson Planning Fundamentals",
              readingMaterial:
                "Essential components of an effective lesson plan for primary education",
              lessonType: "reading",
            },
            {
              title: "Learning Objectives and Success Criteria",
              readingMaterial:
                "Writing clear, measurable objectives and communicating them to students",
              lessonType: "video",
            },
            {
              title: "Engaging Lesson Hooks",
              readingMaterial:
                "Creative ways to begin lessons and capture student attention",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Differentiation in the Classroom",
          duration: 1.5,
          content: [
            {
              title: "Principles of Differentiation",
              readingMaterial:
                "Understanding differentiation by content, process, and product",
              lessonType: "reading",
            },
            {
              title: "Scaffolding Learning for All Students",
              readingMaterial:
                "Techniques to support struggling learners while challenging advanced students",
              lessonType: "caseStudy",
            },
            {
              title: "Flexible Grouping Strategies",
              readingMaterial:
                "Using various grouping methods to maximize learning opportunities",
              lessonType: "video",
            },
          ],
        },
        {
          title: "Assessment and Reflection",
          duration: 1.5,
          content: [
            {
              title: "Formative Assessment Techniques",
              readingMaterial:
                "Quick, effective ways to check for understanding during lessons",
              lessonType: "reading",
            },
            {
              title: "Student Self-Assessment",
              readingMaterial:
                "Teaching students to evaluate their own learning progress",
              lessonType: "video",
            },
            {
              title: "Reflective Teaching Practice",
              readingMaterial:
                "Using lesson outcomes to improve future planning and delivery",
              lessonType: "caseStudy",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 4,
      title: "Building Emotional Intelligence in Students",
      introduction:
        "This unit explores how teachers can support students in developing emotional intelligence, which is essential for personal growth and learning.",
      objectives: [
        "Understand the components of emotional intelligence",
        "Learn strategies to develop emotional intelligence in students",
        "Recognize the impact of emotional intelligence on learning",
        "Foster a classroom environment that supports emotional growth",
      ],
      modules: [
        {
          title: "Introduction to Emotional Intelligence",
          duration: 1,
          content: [
            {
              title: "The Five Components of EQ",
              readingMaterial:
                "Understanding self-awareness, self-regulation, motivation, empathy, and social skills",
              lessonType: "reading",
            },
            {
              title: "Emotional Intelligence and Academic Success",
              readingMaterial:
                "Research on the links between EQ and learning outcomes",
              lessonType: "video",
            },
            {
              title: "Assessing Emotional Intelligence",
              readingMaterial:
                "Age-appropriate ways to recognize emotional intelligence levels in students",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Strategies for Building Emotional Intelligence",
          duration: 1.5,
          content: [
            {
              title: "Teaching Emotional Vocabulary",
              readingMaterial:
                "Helping students identify and express their feelings accurately",
              lessonType: "reading",
            },
            {
              title: "Emotion Regulation Activities",
              readingMaterial:
                "Classroom strategies for helping students manage strong emotions",
              lessonType: "video",
            },
            {
              title: "Developing Empathy",
              readingMaterial:
                "Exercises to help students understand others' perspectives and feelings",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Creating an Emotionally Supportive Classroom",
          duration: 1.5,
          content: [
            {
              title: "Establishing Psychological Safety",
              readingMaterial:
                "Creating an environment where students feel safe to express emotions",
              lessonType: "reading",
            },
            {
              title: "Modeling Emotional Intelligence",
              readingMaterial:
                "How teachers can demonstrate healthy emotional responses",
              lessonType: "video",
            },
            {
              title: "Addressing Emotional Challenges",
              readingMaterial:
                "Supporting students through difficult emotional experiences and conflicts",
              lessonType: "caseStudy",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 5,
      title: "Inclusive Education and Differentiation",
      introduction:
        "Teachers will gain a deeper understanding of inclusive education practices, including how to support students with different learning needs and abilities.",
      objectives: [
        "Understand the principles of inclusive education",
        "Identify barriers to learning and how to overcome them",
        "Learn how to differentiate instruction for diverse learners",
        "Support students with special educational needs",
      ],
      modules: [
        {
          title: "Principles of Inclusive Education",
          duration: 1,
          content: [
            {
              title: "Foundations of Inclusion",
              readingMaterial:
                "Historical context and current best practices in inclusive education",
              lessonType: "reading",
            },
            {
              title: "Universal Design for Learning",
              readingMaterial:
                "Designing learning experiences that work for all students",
              lessonType: "video",
            },
            {
              title: "Inclusion Success Stories",
              readingMaterial:
                "Examples of successful inclusive classroom practices",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Identifying and Overcoming Barriers to Learning",
          duration: 1.5,
          content: [
            {
              title: "Types of Learning Barriers",
              readingMaterial:
                "Identifying physical, cognitive, emotional, and cultural barriers to learning",
              lessonType: "reading",
            },
            {
              title: "Student-Centered Problem Solving",
              readingMaterial:
                "Approaches to identifying and addressing individual learning challenges",
              lessonType: "caseStudy",
            },
            {
              title: "Creating Accessible Learning Materials",
              readingMaterial:
                "Adapting classroom resources to meet diverse learning needs",
              lessonType: "video",
            },
          ],
        },
        {
          title: "Differentiating Instruction",
          duration: 1.5,
          content: [
            {
              title: "Differentiation Strategies for Mixed-Ability Classes",
              readingMaterial:
                "Practical approaches to teaching diverse groups effectively",
              lessonType: "reading",
            },
            {
              title: "Supporting Students with Special Educational Needs",
              readingMaterial:
                "Strategies for common learning differences including dyslexia, ADHD, and autism",
              lessonType: "video",
            },
            {
              title: "Collaborative Teaching Models",
              readingMaterial:
                "Working with teaching assistants and specialists to support inclusive classrooms",
              lessonType: "caseStudy",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 6,
      title: "The Role of Technology in Education",
      introduction:
        "This unit introduces the role of technology in the classroom, focusing on tools that enhance learning and engagement.",
      objectives: [
        "Understand the impact of technology on education",
        "Learn how to integrate technology into lessons",
        "Use digital tools to support student learning",
        "Evaluate the effectiveness of technology in the classroom",
      ],
      modules: [
        {
          title: "Introduction to Educational Technology",
          duration: 1,
          content: [
            {
              title: "Digital Learning Fundamentals",
              readingMaterial:
                "Current trends and research in educational technology",
              lessonType: "reading",
            },
            {
              title: "Digital Citizenship for Primary Students",
              readingMaterial: "Teaching responsible and safe technology use",
              lessonType: "video",
            },
            {
              title: "Technology Access and Equity",
              readingMaterial:
                "Addressing the digital divide in primary education",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Integrating Technology into Lessons",
          duration: 1.5,
          content: [
            {
              title: "Technology-Enhanced Learning Activities",
              readingMaterial:
                "Designing engaging digital learning experiences for primary students",
              lessonType: "reading",
            },
            {
              title: "Digital Tools for Core Subjects",
              readingMaterial:
                "Effective applications and resources for literacy, numeracy, and science",
              lessonType: "video",
            },
            {
              title: "Blended Learning Models",
              readingMaterial:
                "Combining traditional and digital approaches in the primary classroom",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Evaluating Technology in Education",
          duration: 1.5,
          content: [
            {
              title: "Assessing Educational Technology",
              readingMaterial:
                "Frameworks for evaluating digital tools and resources",
              lessonType: "reading",
            },
            {
              title: "Measuring Impact on Learning",
              readingMaterial:
                "Research-based approaches to determining technology effectiveness",
              lessonType: "caseStudy",
            },
            {
              title: "Future Trends in Educational Technology",
              readingMaterial:
                "Emerging technologies and their potential impact on primary education",
              lessonType: "video",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 7,
      title: "Assessment for Learning",
      introduction:
        "Teachers will explore assessment strategies that help guide student progress, focusing on formative and summative assessments.",
      objectives: [
        "Understand the different types of assessments",
        "Learn how to use assessment data to inform teaching",
        "Implement strategies for formative assessment",
        "Evaluate the effectiveness of assessment methods",
      ],
      modules: [
        {
          title: "Types of Assessments",
          duration: 1,
          content: [
            {
              title: "Assessment Fundamentals",
              readingMaterial:
                "Understanding diagnostic, formative, and summative assessment approaches",
              lessonType: "reading",
            },
            {
              title: "Authentic Assessment",
              readingMaterial:
                "Creating real-world assessment tasks that measure genuine understanding",
              lessonType: "video",
            },
            {
              title: "Balancing Assessment Types",
              readingMaterial:
                "Creating a comprehensive assessment strategy for primary classrooms",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Using Assessment Data to Inform Teaching",
          duration: 1.5,
          content: [
            {
              title: "Data-Driven Instruction",
              readingMaterial:
                "Using assessment results to adjust teaching practices",
              lessonType: "reading",
            },
            {
              title: "Student Progress Tracking",
              readingMaterial:
                "Systems for monitoring and recording student achievement",
              lessonType: "video",
            },
            {
              title: "Assessment-Based Intervention",
              readingMaterial:
                "Identifying and supporting students who need additional help",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Formative Assessment Strategies",
          duration: 1.5,
          content: [
            {
              title: "Quick Check Techniques",
              readingMaterial:
                "Efficient methods to gauge understanding during lessons",
              lessonType: "reading",
            },
            {
              title: "Effective Questioning",
              readingMaterial:
                "Using questions to assess and deepen student understanding",
              lessonType: "video",
            },
            {
              title: "Feedback that Moves Learning Forward",
              readingMaterial:
                "Providing constructive, actionable feedback to primary students",
              lessonType: "caseStudy",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 8,
      title: "Cultural Awareness and Global Citizenship",
      introduction:
        "This unit focuses on building cultural awareness and preparing students to be global citizens, fostering understanding and respect for diversity.",
      objectives: [
        "Understand the importance of cultural awareness in education",
        "Promote respect for diversity in the classroom",
        "Learn strategies to teach global citizenship",
        "Encourage students to engage with global issues",
      ],
      modules: [
        {
          title: "Understanding Cultural Awareness",
          duration: 1,
          content: [
            {
              title: "Cultural Competence in Education",
              readingMaterial:
                "Developing teacher awareness of cultural influences on learning",
              lessonType: "reading",
            },
            {
              title: "Cultural Responsiveness",
              readingMaterial:
                "Creating teaching practices that respect and incorporate diverse perspectives",
              lessonType: "video",
            },
            {
              title: "Cultural Bias Awareness",
              readingMaterial:
                "Recognizing and addressing unconscious bias in teaching",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Promoting Respect for Diversity",
          duration: 1.5,
          content: [
            {
              title: "Inclusive Classroom Environments",
              readingMaterial:
                "Strategies for creating a classroom that celebrates diversity",
              lessonType: "reading",
            },
            {
              title: "Multicultural Literature and Resources",
              readingMaterial: "Selecting and using diverse learning materials",
              lessonType: "video",
            },
            {
              title: "Addressing Stereotypes and Prejudice",
              readingMaterial:
                "Age-appropriate approaches to discussing bias with primary students",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Teaching Global Citizenship",
          duration: 1.5,
          content: [
            {
              title: "Global Citizenship Education Framework",
              readingMaterial:
                "Core concepts and competencies for global citizenship",
              lessonType: "reading",
            },
            {
              title: "Global Issues for Primary Students",
              readingMaterial:
                "Making global challenges accessible to young learners",
              lessonType: "video",
            },
            {
              title: "International Connections",
              readingMaterial:
                "Creating global classroom partnerships and collaborative projects",
              lessonType: "caseStudy",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 9,
      title: "Developing Literacy and Numeracy Skills",
      introduction:
        "This unit explores methods for improving literacy and numeracy skills in primary school students, with a focus on practical strategies and interventions.",
      objectives: [
        "Identify strategies to support literacy and numeracy development",
        "Learn techniques for teaching reading and writing",
        "Understand the role of numeracy in everyday life",
        "Support struggling learners in literacy and numeracy",
      ],
      modules: [
        {
          title: "Strategies for Developing Literacy",
          duration: 1,
          content: [
            {
              title: "Balanced Literacy Approach",
              readingMaterial:
                "Integrating reading, writing, speaking, and listening skills",
              lessonType: "reading",
            },
            {
              title: "Phonics and Word Recognition",
              readingMaterial:
                "Evidence-based approaches to teaching early reading skills",
              lessonType: "video",
            },
            {
              title: "Comprehension Strategies",
              readingMaterial:
                "Teaching students to understand and analyze texts at deeper levels",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Teaching Numeracy Skills",
          duration: 1.5,
          content: [
            {
              title: "Mathematical Thinking Development",
              readingMaterial:
                "Fostering number sense and mathematical reasoning",
              lessonType: "reading",
            },
            {
              title: "Concrete-Pictorial-Abstract Approach",
              readingMaterial:
                "Using manipulatives and visual representations to build understanding",
              lessonType: "video",
            },
            {
              title: "Real-World Mathematics",
              readingMaterial:
                "Connecting numeracy skills to everyday applications",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Supporting Struggling Learners",
          duration: 1.5,
          content: [
            {
              title: "Early Identification of Difficulties",
              readingMaterial:
                "Recognizing signs of dyslexia, dyscalculia, and other learning challenges",
              lessonType: "reading",
            },
            {
              title: "Intervention Strategies",
              readingMaterial:
                "Evidence-based approaches for literacy and numeracy support",
              lessonType: "video",
            },
            {
              title: "Building Confidence in Struggling Learners",
              readingMaterial:
                "Psychological approaches to overcome anxiety and build self-efficacy",
              lessonType: "caseStudy",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 10,
      title: "Fostering Collaboration and Teamwork",
      introduction:
        "Teachers will learn how to encourage collaboration and teamwork among students, fostering cooperation and communication skills.",
      objectives: [
        "Understand the importance of collaboration in education",
        "Develop strategies to encourage teamwork in the classroom",
        "Foster communication and problem-solving skills",
        "Evaluate the outcomes of collaborative learning",
      ],
      modules: [
        {
          title: "Introduction to Collaboration",
          duration: 1,
          content: [
            {
              title: "Benefits of Collaborative Learning",
              readingMaterial:
                "Research on how collaboration enhances learning outcomes",
              lessonType: "reading",
            },
            {
              title: "Social Skills Foundation",
              readingMaterial:
                "Core social competencies needed for effective teamwork",
              lessonType: "video",
            },
            {
              title: "Types of Collaborative Learning",
              readingMaterial:
                "Various models and approaches to group work in primary classrooms",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Encouraging Teamwork in the Classroom",
          duration: 1.5,
          content: [
            {
              title: "Designing Collaborative Tasks",
              readingMaterial:
                "Creating activities that require genuine cooperation",
              lessonType: "reading",
            },
            {
              title: "Group Formation Strategies",
              readingMaterial:
                "Methods for creating effective and balanced student teams",
              lessonType: "video",
            },
            {
              title: "Managing Group Dynamics",
              readingMaterial:
                "Addressing common challenges in collaborative work",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Evaluating Collaborative Learning Outcomes",
          duration: 1.5,
          content: [
            {
              title: "Assessing Collaboration Skills",
              readingMaterial:
                "Methods for evaluating teamwork and cooperation",
              lessonType: "reading",
            },
            {
              title: "Individual Accountability in Groups",
              readingMaterial:
                "Ensuring all students participate and learn during group work",
              lessonType: "video",
            },
            {
              title: "Reflection on Collaborative Processes",
              readingMaterial:
                "Teaching students to evaluate and improve their teamwork",
              lessonType: "caseStudy",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 11,
      title: "Building Resilience and Mental Health Awareness",
      introduction:
        "This unit focuses on promoting resilience and mental health awareness in the classroom, supporting students to overcome challenges.",
      objectives: [
        "Understand the factors influencing student resilience",
        "Learn strategies to support mental health in the classroom",
        "Recognize signs of mental health issues in students",
        "Promote strategies to build emotional resilience",
      ],
      modules: [
        {
          title: "Understanding Resilience and Mental Health",
          duration: 1,
          content: [
            {
              title: "Resilience in Child Development",
              readingMaterial:
                "Research on factors that contribute to resilience in children",
              lessonType: "reading",
            },
            {
              title: "Mental Health Continuum",
              readingMaterial:
                "Understanding the spectrum from mental wellness to mental illness",
              lessonType: "video",
            },
            {
              title: "Risk and Protective Factors",
              readingMaterial:
                "Identifying influences that affect child mental health and resilience",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Supporting Mental Health in the Classroom",
          duration: 1.5,
          content: [
            {
              title: "Creating a Mentally Healthy Classroom",
              readingMaterial:
                "Strategies for reducing stress and promoting wellbeing",
              lessonType: "reading",
            },
            {
              title: "Recognizing Warning Signs",
              readingMaterial:
                "Identifying students who may need additional support",
              lessonType: "video",
            },
            {
              title: "School-Based Interventions",
              readingMaterial:
                "Programs and approaches for supporting student mental health",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Building Emotional Resilience",
          duration: 1.5,
          content: [
            {
              title: "Growth Mindset Development",
              readingMaterial:
                "Teaching students to embrace challenges and persist through difficulties",
              lessonType: "reading",
            },
            {
              title: "Coping Strategies for Children",
              readingMaterial:
                "Age-appropriate techniques for managing stress and adversity",
              lessonType: "video",
            },
            {
              title: "Strengths-Based Approaches",
              readingMaterial:
                "Helping students identify and leverage their personal strengths",
              lessonType: "caseStudy",
            },
          ],
        },
      ],
      totalDuration: 4,
    },
    {
      number: 12,
      title: "Reflective Practice and Professional Growth",
      introduction:
        "Teachers will explore the importance of reflective practice for professional development, focusing on self-evaluation and continuous improvement.",
      objectives: [
        "Understand the concept of reflective practice",
        "Learn strategies for self-evaluation and improvement",
        "Set personal goals for professional development",
        "Develop a plan for ongoing growth as an educator",
      ],
      modules: [
        {
          title: "Introduction to Reflective Practice",
          duration: 1,
          content: [
            {
              title: "Models of Reflection",
              readingMaterial:
                "Key frameworks for structured reflection on teaching practice",
              lessonType: "reading",
            },
            {
              title: "Benefits of Reflective Teaching",
              readingMaterial:
                "Research on how reflection improves teaching quality and student outcomes",
              lessonType: "video",
            },
            {
              title: "Barriers to Reflection",
              readingMaterial: "Common challenges and how to overcome them",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Self-Evaluation and Goal Setting",
          duration: 1.5,
          content: [
            {
              title: "Self-Assessment Tools",
              readingMaterial:
                "Frameworks and methods for evaluating your teaching practice",
              lessonType: "reading",
            },
            {
              title: "Effective Goal Setting",
              readingMaterial:
                "Creating SMART goals for professional development",
              lessonType: "video",
            },
            {
              title: "Using Feedback for Growth",
              readingMaterial:
                "Gathering and analyzing feedback from students, colleagues, and supervisors",
              lessonType: "caseStudy",
            },
          ],
        },
        {
          title: "Continuous Professional Growth",
          duration: 1.5,
          content: [
            {
              title: "Building a Professional Learning Network",
              readingMaterial:
                "Connecting with other educators for ongoing support and growth",
              lessonType: "reading",
            },
            {
              title: "Action Research in the Classroom",
              readingMaterial:
                "Using systematic inquiry to improve teaching practices",
              lessonType: "caseStudy",
            },
            {
              title: "Career-Long Learning Strategies",
              readingMaterial:
                "Maintaining motivation and engagement throughout your teaching career",
              lessonType: "video",
            },
          ],
        },
      ],
    },
  ],
};

const examsList = [
  {
    id: "1",
    title: "Exam on classroom behaviour 1",
    unitTitle: "Unit: Classroom Behaviour 1",
    startDate: "17th June, 2025",
    score: 70,
    completed: true,
    status: "past",
  },
  {
    id: "2",
    title: "Exam on classroom behaviour 2",
    unitTitle: "Unit: Classroom Behaviour 2",
    startDate: "17th June, 2025",
    score: 0,
    completed: false,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Exam on classroom behaviour 3",
    unitTitle: "Unit: Classroom Behaviour 3",
    startDate: "17th June, 2025",
    score: 0,
    completed: false,
    status: "past",
  },
  {
    id: "4",
    title: "Exam on classroom behaviour 4",
    unitTitle: "Unit: Classroom Behaviour 4",
    startDate: "17th June, 2025",
    score: 0,
    completed: false,
    status: "upcoming",
  },
];
