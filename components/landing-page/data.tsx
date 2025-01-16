import {
  Activity,
  Apple,
  ArrowSquare,
  Book,
  Briefcase,
  Chart,
  Cup,
  Data,
  DeviceMessage,
  Diagram,
  Element4,
  GlobalSearch,
  GooglePlay,
  MedalStar,
  Messages1,
  People,
  Profile2User,
  ShieldTick,
  Star1,
  Video,
  WalletMoney,
} from "iconsax-react";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaChalkboardTeacher, FaRegChartBar } from "react-icons/fa";
import { FaComputer, FaHandsHoldingChild } from "react-icons/fa6";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import {
  LiaChalkboardTeacherSolid,
  LiaHandHoldingHeartSolid,
} from "react-icons/lia";
import { LuChartNoAxesCombined, LuClipboardList } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { SlBookOpen } from "react-icons/sl";

export const appIcons = [
  {
    icon: Apple,
    link: "",
    title: "Download on the",
    platformName: "App Store",
  },
  {
    icon: GooglePlay,
    link: "",
    title: "Get it on",
    platformName: "Google Play",
  },
];

export const schoolLogos = [
  "/assets/images/nile.png",
  "/assets/images/noun.png",
  "/assets/images/unizik.png",
  "/assets/images/unn.png",
  "/assets/images/waec.png",
];

export const features = [
  {
    icon: MedalStar,
    title: "Accredited and Recognised Certifications",
    description:
      "Earn accredited certifications recognized locally and internationally, enhancing your professional standing and supporting lifelong learning.",
    color: "#84D2F6",
  },
  {
    icon: GlobalSearch,
    title: "Accessibility and Convenience",
    description:
      "Enhance your teaching skills anytime, anywhere. Access flexible professional development courses that fit your busy schedule.",

    color: "#ffb703",
  },
  {
    icon: Element4,
    title: "AI-Driven Professional Development Course",
    description:
      "Continued professional development course with tailored units, equipping educators with modern teaching skills and accredited certification.",
    color: "#7c9885",
  },
  {
    icon: DeviceMessage,
    title: "Collaborative Community Engagement",
    description:
      "Connect globally with educators, exchange insights, collaborate on best practices, and expand your professional network through meaningful knowledge-sharing opportunities.",

    color: "#1F2041",
  },
];

export const courses = [
  {
    image: "/assets/images/course.png",
    title: "English language",
    categories: ["language", "grammar", "letter-writting"],
    topics: [
      "summary witing",
      "composition",
      "punctuation",
      "figures of speech",
    ],
    isNew: true,
    students: "1,200",
    courseLength: "12 sessions",
  },
  {
    image: "/assets/images/course.png",
    title: "Advanced Mathematics",
    categories: ["calculations", "mathematics", "complex maths"],
    topics: ["calculus", "differentiation", "advanced algebra", "vectors"],
    isNew: false,
    students: "8,900",
    courseLength: "16 sessions",
  },
  {
    image: "/assets/images/course.png",
    title: "Social studies",
    categories: ["values", "morals", "skills", "values"],
    topics: ["history", "the benin kingdom", "man's evolution", "values"],
    isNew: true,
    students: "120,000",
    courseLength: "3 sessions",
  },
  {
    image: "/assets/images/course.png",
    title: "Advanced Chemistry",
    categories: ["heat", "chemicals", "nuclear physics"],
    topics: [
      "heat",
      "chemical reactions",
      "gas laws",
      "rates of chemical reactions",
      "rate law",
      "mole theory",
      "quantum numbers",
    ],
    isNew: false,
    students: "2,200",
    courseLength: "8 sessions",
  },
  {
    image: "/assets/images/course.png",
    title: "Advanced Physics",
    categories: ["space", "energy", "fields"],
    topics: [
      "heat",
      "waves",
      "projectiles",
      "moment of forces",
      "couples",
      "electromagnetism",
      "Rockets and space",
      "electric fields",
      "motion",
    ],
    isNew: true,
    students: "3,400",
    courseLength: "12 sessions",
  },
  {
    image: "/assets/images/course.png",
    title: "Advanced Biology",
    categories: ["life", "bio-life", "anatomy"],
    topics: [
      "man's evolution",
      "genetics",
      "transpiration",
      "excretion",
      "skeletons and bones",
      "taxonomy of life",
      "flowers",
      "fruits",
      "photosynthesis",
    ],
    isNew: false,
    students: "22,200",
    courseLength: "18 sessions",
  },
  {
    image: "/assets/images/course.png",
    title: "Data Processing",
    categories: ["technology", "databases", "software", "digital", "computers"],
    topics: [
      "normalization",
      "database modelling",
      "data integrity",
      "transactions",
      "rules of transactions",
      "database administrators",
      "database management systems",
    ],
    isNew: true,
    students: "1,500",
    courseLength: "23 sessions",
  },
  {
    image: "/assets/images/course.png",
    title: "Civics Education",
    categories: ["values", "citizenship", "relationship", "national values"],
    topics: [
      "values",
      "citizenship",
      "ways of acquiring citizenship",
      "fundamental human rights",
      "traffic regulations",
      "inter-communal relationship",
      "nationality",
      "cultism",
    ],
    isNew: false,
    students: "22,200",
    courseLength: "18 sessions",
  },
];

export const categories = [
  "History",
  "Science",
  "Literature",
  "Languages",
  "Mathematics",
  "Physics",
  "Biology",
  "Government",
  "Economics",
];

// export const educatorBenefits = [
//   {
//     title: "Enroll in a Variety of Professional Courses",
//     description:
//       "Access a wide selection of courses to improve your teaching skills and knowledge in various subjects.",
//     icon: Video,
//   },
//   {
//     title: "Earn Industry-Recognized Certifications",
//     description:
//       "Complete courses and receive certificates that showcase your qualifications and help advance your career.",
//     icon: MedalStar,
//   },
//   {
//     title: "Track Your Learning Progress in Real Time",
//     description:
//       "Stay informed about your course completion status with real-time updates on your learning journey.",
//     icon: Activity,
//   },
//   // {
//   //   title: "Register for Accreditation and Verification",
//   //   description:
//   //     "Sign up for official accreditation to verify your credentials and demonstrate your expertise.",
//   //   icon: Video,
//   // },
//   {
//     title: "Instant Assistance with Personalized AI Chatbot",
//     description:
//       "Get on-the-spot answers to your questions from an AI-powered chatbot, customized to assist your learning.",
//     icon: Messages1,
//   },
//   // {
//   //   title: "Receive Notifications for Upcoming Examinations",
//   //   description:
//   //     "Keep track of important exam dates and never miss a test with timely notifications sent directly to you.",
//   //   icon: NotificationBing,
//   // },
//   {
//     title: "Access Comprehensive Text-Based Learning Resources",
//     description:
//       "Utilize a wealth of text-based materials designed to support and deepen your understanding of course topics.",
//     icon: Book1,
//   },
//   {
//     title: "Get AI-Driven Course Recommendations",
//     description:
//       "Benefit from personalized course suggestions, powered by AI, that align with your learning goals and interests.",
//     icon: MessageNotif,
//   },
// ];

export const educatorBenefits = [
  {
    type: "Primary School Teachers",
    values: [
      {
        title: "Innovative Teaching",
        description:
          "Integrate creative methods like play-based and experiential learning to engage young learners. Gain tools to make lessons more dynamic and interactive.",
        icon: FaChalkboardTeacher,
      },
      {
        title: "Classroom Management",
        description:
          "Learn effective techniques to maintain structure and address disruptive behavior. Promote inclusivity while fostering a positive learning environment.",
        icon: People,
      },
      {
        title: "Technological Proficiency",
        description:
          "Leverage digital tools to create interactive lessons and stay current with educational trends. Develop skills to integrate technology seamlessly into teaching.",
        icon: HiOutlineDesktopComputer,
      },
      {
        title: "Professional Growth",
        description:
          "Build leadership skills, network with peers, and earn certifications to enhance career prospects. Stay motivated and confident in delivering impactful teaching.",
        icon: FaRegChartBar,
      },
    ],
  },
  {
    type: "Secondary School Teachers",
    values: [
      {
        title: "Advanced Subject Knowledge",
        description:
          "Deepen expertise in your subject and stay updated on recent developments. Use your knowledge to enhance teaching quality and engage students effectively.",
        icon: Book,
      },
      {
        title: "Technology Integration",
        description:
          "Master tools and platforms to create interactive learning environments. Incorporate online resources to support diverse learning styles.",
        icon: DeviceMessage,
      },
      {
        title: "Career Growth",
        description:
          "Prepare for leadership roles like department head or academic advisor. Earn certifications that validate your expertise and improve career prospects.",
        icon: ArrowSquare,
      },
      {
        title: "Networking & Assessment",
        description:
          "Connect with peers to share resources and refine assessment techniques. Use formative and summative assessments to track progress and inform instruction.",
        icon: LuClipboardList,
      },
    ],
  },
  {
    type: "Higher Institution Teachers",
    values: [
      {
        title: "Pedagogical Advancements",
        description:
          "Learn strategies like flipped classrooms and problem-based learning to engage adult learners. Promote critical thinking and self-directed learning in students.",
        icon: BsGraphUpArrow,
      },
      {
        title: "Curriculum Development",
        description:
          "Design innovative courses that reflect industry trends and academic standards. Incorporate research-based practices into teaching for improved outcomes.",
        icon: SlBookOpen,
      },
      {
        title: "Technological Expertise",
        description:
          "Use online platforms and tools to enhance hybrid and online teaching. Stay current with digital advancements in higher education.",
        icon: FaComputer,
      },
      {
        title: "Leadership & Networking",
        description:
          "Prepare for administrative roles like program director or department chair. Engage with academic communities to share resources and foster mentorship opportunities.",
        icon: LiaChalkboardTeacherSolid,
      },
    ],
  },
];

export const teacherBenefits = [
  {
    title: "Pedagogical Advancements",
    description:
      "Learn strategies like flipped classrooms and problem-based learning to engage adult learners. Promote critical thinking and self-directed learning in students.",
    icon: LuChartNoAxesCombined,
  },
  {
    title: "Curriculum Development",
    description:
      "Design innovative courses that reflect industry trends and academic standards. Incorporate research-based practices into teaching for improved outcomes.",
    icon: SlBookOpen,
  },
  {
    title: "Technological Expertise",
    description:
      "Use online platforms and tools to enhance hybrid and online teaching. Stay current with digital advancements in higher education.",
    icon: HiOutlineComputerDesktop,
  },
  {
    title: "Leadership & Networking",
    description:
      "Prepare for administrative roles like program director or department chair. Engage with academic communities to share resources and foster mentorship opportunities.",
    icon: LiaChalkboardTeacherSolid,
  },
];

export const teachingAssistantBenefits = [
  {
    title: "Enhanced Support Skills",
    description:
      "Learn effective lesson planning and classroom management strategies to assist teachers. Develop skills to prepare engaging teaching materials and support diverse learners.",
    icon: Profile2User,
  },
  {
    title: "Inclusive Practices",
    description:
      "Understand how to support students with special needs and foster an inclusive learning environment. Gain insights into adaptive teaching methods for equity in the classroom.",
    icon: LiaHandHoldingHeartSolid,
  },
  {
    title: "Career Growth",
    description:
      "Earn certifications to improve job prospects and confidence for expanded roles. Access opportunities for mentorship and professional recognition.",
    icon: LuChartNoAxesCombined,
  },
  {
    title: "Technology & Collaboration",
    description:
      "Learn to use classroom tools effectively and strengthen teamwork with teachers. Enhance communication and collaboration within the school setting.",
    icon: Messages1,
  },
];

export const mentorBenefits = [
  {
    title: "Enhanced Communication Skills",
    description:
      "Master active listening, empathetic communication, and providing clear, actionable feedback.",
    icon: DeviceMessage,
  },
  {
    title: "Improved Mentoring Techniques:",
    description:
      "Gain insights into building trust with mentees and developing adaptive approaches for mentoring diverse learners.",
    icon: People,
  },
  {
    title: "Conflict Resolution Abilities",
    description:
      "Acquire strategies for conflict resolution and techniques to de-escalate challenging situations.",
    icon: LiaHandHoldingHeartSolid,
  },
  {
    title: "Career Development Support",
    description:
      "Gain tools to help mentees explore career paths, prepare for job opportunities, and provide guidance on resumes, interviews, and skill-building.",
    icon: Diagram,
  },
  {
    title: "Professional Recognition",
    description:
      "Receive accreditation and certifications to validate mentoring expertise.",
    icon: Briefcase,
  },
  {
    title: "Expanded Networking Opportunities:",
    description:
      "Join mentoring communities to share experiences and learn from peers.",
    icon: Data,
  },
];

export const institutionBenefits = [
  {
    title: "Improved Teacher Quality and Performance",
    description:
      "Personalized learning pathways enable teachers to focus on areas of improvement, enhancing their skills and classroom performance.",
    icon: Activity,
  },
  {
    title: "Streamlined Accreditation and Compliance",
    description:
      "EduAI Pro serves as a National Register, helping schools verify and track the accreditation status of their teaching staff ensuring that all teachers meet professional requirements.",
    icon: ShieldTick,
  },
  {
    title: "Improved Student Outcomes",
    description:
      "With ongoing professional development, teachers can implement more effective teaching strategies, leading to improved student engagement and academic performance.",
    icon: PiStudent,
  },
  {
    title: "Support for Institutional Growth",
    description:
      "EduAI Pro provides schools with insights into teacher performance, driving data-informed decisions for growth and improvement.",
    icon: Chart,
  },
  {
    title: "Resource Optimization",
    description:
      "EduAI Pro centralizes professional growth, reducing reliance on costly external training and offering a budget-friendly solution for teacher development.",
    icon: WalletMoney,
  },
  {
    title: "Strengthened Reputation and Competitiveness",
    description:
      "Schools that invest in staff development demonstrate a commitment to quality education, enhancing their reputation and attracting high-caliber educators dedicated to professional growth.",
    icon: Star1,
  },
];

export const testimonials = [
  {
    name: "Sarah Mitchell",
    position: "Social Studies Teacher at Westbrook High School",
    talk: "The AI-powered tools and expert-led courses have helped me elevate my skills and stay updated with the latest teaching techniques. The progress tracking and certification process are seamless, making it easier to achieve my goals as a teacher.",
  },
  {
    name: "David Chen",
    position: "Science Teacher at Riverview Academy",
    talk: "I love how EduAiPro tailors course recommendations to my interests. The personalized AI chatbot is incredibly helpful, answering my questions instantly and guiding me through tough topics when I need it.",
  },
  {
    name: "James Patel",
    position: "Superintendent at Redwood Academy",
    talk: "We can easily monitor our teachers progress and track how they’re performing in their courses. The detailed reports give us a complete view of their professional growth, helping us ensure high teaching standards at our institution.",
  },
  {
    name: "Emily Davis",
    position: "English Teacher at Lakeside Middle School",
    talk: "From earning certificates to accessing valuable learning resources, EduAiPro provides everything I need in one place. The variety of courses and the accreditation process have really boosted my professional credibility.",
  },
  {
    name: "Lisa Rodriguez",
    position:
      "Director of Professional Development at Grandview School District",
    talk: "Having access to personalized AI chatbots has made a huge difference in the training experience. EduAiPro offers the support our staff needs while also giving us the tools to oversee their overall development and progress.",
  },
];
