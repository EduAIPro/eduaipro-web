// import {
//   Activity,

//   Apple,

//   ArrowSquare,
//   Book,
//   Briefcase,
//   Chart,
//   Data,
//   DeviceMessage,
//   Diagram,
//   Element4,
//   GooglePlay,
//   Messages1,
//   People,
//   Profile2User,
//   Star1,
//   WalletMoney,
// } from "iconsax-react";
import { BsGlobe, BsGraphUpArrow } from "react-icons/bs";
import { FaChalkboardTeacher, FaRegChartBar } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import {
  LiaCertificateSolid,
  LiaChalkboardTeacherSolid,
  LiaHandHoldingHeartSolid,
} from "react-icons/lia";
import { LuChartNoAxesCombined, LuClipboardList } from "react-icons/lu";
import { MdOutlineForum, MdSupportAgent } from "react-icons/md";
import { PiCertificate, PiClipboardText, PiStudent } from "react-icons/pi";
import { SlBookOpen } from "react-icons/sl";
import { TbMessageChatbot, TbStars } from "react-icons/tb";

export const appIcons = [
  {
    // icon: Apple,
    link: "",
    title: "Download on the",
    platformName: "App store",
  },
  {
    // icon: GooglePlay,
    link: "",
    title: "Get it on",
    platformName: "Play Store",
  },
];

export const schoolLogos = [
  "/assets/images/bespoke_council.webp",
  "/assets/images/waltman.webp",
  "/assets/images/cpd.webp",
  "/assets/images/panoba.webp",
  "/assets/images/ebn_academy.webp",
  "/assets/images/ccu.webp",
];

import CloudKey from "@/components/svgs/cloud-key.svg";
import Community from "@/components/svgs/community.svg";
import TickStar from "@/components/svgs/tick-star.svg";
import Twinkle from "@/components/svgs/twinkle.svg";

export const features = [
  {
    icon: TickStar,
    title: "Accredited and Recognised Certifications",
    description:
      "Earn accredited certifications recognized locally and internationally, enhancing your professional standing and supporting lifelong learning.",
  },
  {
    icon: CloudKey,
    title: "Accessibility and Convenience",
    description:
      "Enhance your teaching skills anytime, anywhere. Access flexible professional development courses that fit your busy schedule.",
  },
  {
    icon: Twinkle,
    title: "AI-Driven Professional Development Course",
    description:
      "Continued professional development course with tailored units, equipping educators with modern teaching skills and accredited certification.",
  },
  {
    icon: Community,
    title: "Collaborative Community Engagement",
    description:
      "Connect globally with educators, exchange insights, collaborate on best practices, and expand your professional network through meaningful knowledge-sharing opportunities.",
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
  "Primary Teachers",
  "Secondary Teachers",
  "Higher Institution Teachers",
  "Mentors",
  "Teaching Assistants",
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
        // icon: People,
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
        // icon: Book,
      },
      {
        title: "Technology Integration",
        description:
          "Master tools and platforms to create interactive learning environments. Incorporate online resources to support diverse learning styles.",
        // icon: DeviceMessage,
      },
      {
        title: "Career Growth",
        description:
          "Prepare for leadership roles like department head or academic advisor. Earn certifications that validate your expertise and improve career prospects.",
        // icon: ArrowSquare,
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

import CertificateIcon from "@/components/svgs/cert.svg";
import ChatIcon from "@/components/svgs/chat.svg";
import ClockRewindIcon from "@/components/svgs/clock-rewind.svg";
import ForumIcon from "@/components/svgs/forum.svg";
import GlobeIcon from "@/components/svgs/globe.svg";
import LibraryIcon from "@/components/svgs/library.svg";
import PrivacyCheckIcon from "@/components/svgs/privacy-check.svg";
import ProgressIcon from "@/components/svgs/progress.svg";
import SupportIcon from "@/components/svgs/support.svg";
import TwinkleIcon from "@/components/svgs/twinkle.svg";
import UIIcon from "@/components/svgs/ui.svg";
import { ClockIcon } from "lucide-react";

export const teacherBenefits = [
  {
    title: "User-Friendly Interface",
    description: "Simple navigation with clear progress tracking and updates.",
    icon: UIIcon,
  },
  {
    title: "24/7 Accessibility",
    description:
      "Access anytime, anywhere, with compatibility across multiple devices.",
    icon: ClockIcon,
  },
  {
    title: "AI-Powered Insights",
    description:
      "Personalised development plan and progress analysis to target improvement areas.",
    icon: TwinkleIcon,
  },
  {
    title: "Secure and Private",
    description:
      "Data protection and encrypted access for safe and confidential use.",
    icon: PrivacyCheckIcon,
  },
  {
    title: "Progress Dashboards",
    description:
      "Visual tools to monitor milestones and receive notifications for tasks and certification deadlines.",
    icon: ProgressIcon,
  },
  {
    title: "Certification Management",
    description:
      "Automated reminders for renewals and instant access to digital certificates upon completion.",
    icon: CertificateIcon,
  },
  {
    title: "Comprehensive Resource Library",
    description:
      "Downloadable eBooks, templates, and videos for offline access and classroom use.",
    icon: LibraryIcon,
  },
  {
    title: "Regular Content Updates",
    description:
      "Stay updated with the latest educational tools and AI-refreshed learning material.",
    icon: ClockRewindIcon,
  },
  {
    title: "Globally Recognized Certification",
    description:
      "Accredited programs that elevate professional standing locally and internationally.",
    icon: GlobeIcon,
  },
  {
    title: "Online Forum",
    description:
      "Forum connects educators, fostering collaboration, sharing best practices, and advancing innovative teaching strategies for impactful professional growth.",
    icon: ForumIcon,
  },
  {
    title: "Chatbot",
    description:
      "Provides instant teaching support, lesson ideas, and AI-driven insights to enhance classroom engagement and professional development.",
    icon: ChatIcon,
  },
  {
    title: "Support",
    description:
      "Dedicated technical support, ensuring seamless integration, troubleshooting, and guidance to help educators maximize AI-powered teaching tools.",
    icon: SupportIcon,
  },
];

export const teachingAssistantBenefits = [
  {
    title: "Enhanced Support Skills",
    description:
      "Learn effective lesson planning and classroom management strategies to assist teachers. Develop skills to prepare engaging teaching materials and support diverse learners.",
    // icon: Profile2User,
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
    // icon: Messages1,
  },
];

export const mentorBenefits = [
  {
    title: "Enhanced Communication Skills",
    description:
      "Master active listening, empathetic communication, and providing clear, actionable feedback.",
    // icon: DeviceMessage,
  },
  {
    title: "Improved Mentoring Techniques:",
    description:
      "Gain insights into building trust with mentees and developing adaptive approaches for mentoring diverse learners.",
    // icon: People,
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
    // icon: Diagram,
  },
  {
    title: "Professional Recognition",
    description:
      "Receive accreditation and certifications to validate mentoring expertise.",
    // icon: Briefcase,
  },
  {
    title: "Expanded Networking Opportunities:",
    description:
      "Join mentoring communities to share experiences and learn from peers.",
    // icon: Data,
  },
];

export const institutionBenefits = [
  {
    title: "Enhanced Educator Quality",
    description:
      "Provide educators with internationally accredited courses and AI-driven learning paths to improve teaching performance.",
    // icon: Activity,
  },
  {
    title: "Streamlined Certification Management",
    description:
      "Simplify the process of tracking, managing, and renewing teacher certifications, reducing administrative workload.",
    icon: PiCertificate,
  },
  {
    title: "Improved Student Outcomes",
    description:
      "Equip educators with innovative teaching strategies to foster student engagement and boost academic performance.",
    icon: PiStudent,
  },
  {
    title: "Data-Driven Insights",
    description:
      "Generate actionable data on educator performance for strategic decision-making and institutional growth.",
    // icon: Chart,
  },
  {
    title: "Global Collaboration",
    description:
      "Join a global community to promote networking and knowledge-sharing among institutions and educators.",
    icon: BsGlobe,
  },
  {
    title: "Cost-Effective Professional Development",
    description:
      "Optimize budgets with centralized, scalable training programs that deliver high-quality courses in a flexible, convenient online format.",
    // icon: WalletMoney,
  },
  {
    title: "Strengthened Institutional Reputation",
    description:
      "Demonstrate commitment to quality education by investing in professional development to attract top teaching talent.",
    icon: TbStars,
  },
  {
    title: "Bespoke Curriculum Development",
    description:
      "Create tailored development programs that align with institutional goals for maximum impact.",
    icon: PiClipboardText,
  },
  {
    title: "Institution Dashboard",
    description:
      "Track and monitor staff progress with a user-friendly dashboard offering real-time updates.",
    // icon: Element4,
  },
  {
    title: "Global Educational Standards",
    description:
      "Access the latest global trends and practices to maintain competitiveness in the education sector.",
    // icon: Star1,
  },
  {
    title: "Quality Mark Plaque",
    description:
      "Quality Mark plaque recognizes schools as Centers of Excellence, showcasing commitment to innovation, professional development, and student success.",
    icon: LiaCertificateSolid,
  },
  {
    title: "Online Forum",
    description:
      "Forum helps institutions share best practices, collaborate on innovations, resolve challenges, and stay updated on AI-driven education trends.",
    icon: MdOutlineForum,
  },
  {
    title: "Chatbot",
    description:
      "Streamlines administrative tasks, supports teacher training, and enhances school operations with AI-powered solutions for efficiency and excellence.",
    icon: TbMessageChatbot,
  },
  {
    title: "Support",
    description:
      "Comprehensive technical support for institutions, assisting with AI implementation, system maintenance, and optimizing digital education solutions.",
    icon: MdSupportAgent,
  },
];

export const testimonials = [
  {
    img: "andrew_okoro.webp",
    name: "Andrew Okoro",
    position: "Primary School Teacher",
    talk: "EduAI Pro has completely transformed how I approach professional development. The platform is easy to navigate, and the CPD content is tailored to my classroom needs. The strategies I’ve learned have made my phonics sessions more interactive and effective. It’s a game-changer for teachers like me.",
  },
  {
    img: "benjamin_hassan.webp",
    name: "Benjamin Hassan",
    position: "Secondary Science Teacher",
    talk: "I was impressed by the depth and relevance of the CPD modules on EduAI Pro. The practical tips on classroom management and differentiation have improved how I manage lab sessions and engage mixed-ability learners. The platform keeps getting better with every update.",
  },
  {
    img: "teresa_uche.webp",
    name: "Teresa Uche",
    position: "Early Years Educator",
    talk: "The courses on child development and play-based learning were just what I needed. EduAI Pro doesn’t just talk theory—it gives you real ideas you can apply the next day. The site is user-friendly, and I can learn at my own pace, even from my phone.",
  },
  {
    img: "lamide_adeyemi.webp",
    name: "Lamide Adeyemi",
    position: "Head of Department (Mathematics)",
    talk: "As an HOD, I encourage all my team members to use EduAI Pro. The leadership and mentoring modules have been particularly valuable to me. It's refreshing to see a CPD platform designed specifically for the Nigerian teaching context.",
  },
  {
    img: "ruth_obi.webp",
    name: "Ruth Obi",
    position: "Special Needs Support Teacher",
    talk: "I appreciate how inclusive EduAI Pro is. The CPD modules on supporting learners with additional needs are thoughtful and practical. I’ve adapted several strategies in my SEN sessions, and the difference is visible. Thank you for this excellent resource.",
  },
  {
    img: "evans_bello.webp",
    name: "Evans Bello",
    position: "ICT Teacher (Secondary)",
    talk: "Using EduAI Pro has helped me stay current with both teaching methods and digital tools. The courses on integrating EdTech in the classroom are hands-on and insightful. I now feel more confident guiding my students through tech-based projects.",
  },
  {
    img: "nancy_esiri.webp",
    name: "Nancy Esiri",
    position: "Teaching Assistant",
    talk: "As a TA, I often felt overlooked in training sessions, but EduAI Pro has changed that. The dedicated modules for teaching assistants have empowered me to play a more active and informed role in the classroom. I’m so glad I signed up.",
  },
  {
    img: "felicia_ogundipe.webp",
    name: "Felicia Ogundipe",
    position: "Newly Qualified Teacher",
    talk: "Starting out in teaching can be overwhelming, but EduAI Pro gave me structure. From behavior management to lesson planning, the CPDs have given me the skills and confidence I needed. The community forums are also a great place to share and learn",
  },
];
