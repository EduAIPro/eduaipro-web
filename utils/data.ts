import { GiTeacher } from "react-icons/gi";
import { MdPeopleOutline, MdSchool } from "react-icons/md";
import { PiChalkboardTeacher } from "react-icons/pi";
import { RiSchoolLine } from "react-icons/ri";
import { SlBookOpen } from "react-icons/sl";

export const educationalLevels = [
  {
    label: "Senior Secondary Certificate Examination (SSCE)",
    value: "SSCE",
  },
  {
    label: "Bachelor of Science (BSc)",
    value: "BSC",
  },
  {
    label: "Master of Science (MSc)",
    value: "MSC",
  },
  {
    label: "Doctor of Philosophy (PhD)",
    value: "PHD",
  },
];

export const teachingLevels = [
  {
    label: "Primary",
    value: "PRIMARY",
  },
  {
    label: "Secondary",
    value: "SECONDARY",
  },
  {
    label: "Tertiary",
    value: "TERTIARY",
  },
  {
    label: "Mentor",
    value: "MENTOR",
  },
  {
    label: "Teaching Assistant (TA)",
    value: "TEACHER_ASSISTANT",
  },
];

export const interestedSkills = [
  { label: "EdTech", value: "EdTech" },
  { label: "Classroom Management", value: "Classroom Management" },
  { label: "Student Management", value: "Student Management" },
  { label: "Curriculum Development", value: "Curriculum Development" },
  { label: "Digital Literacy", value: "Digital Literacy" },
  { label: "Differentiated Instruction", value: "Differentiated Instruction" },
  { label: "Assessment & Evaluation", value: "Assessment & Evaluation" },
  { label: "Inclusive Teaching", value: "Inclusive Teaching" },
  { label: "Project-Based Learning", value: "Project-Based Learning" },
  { label: "STEM Education", value: "STEM Education" },
  { label: "Social-Emotional Learning", value: "Social-Emotional Learning" },
  { label: "E-Learning & Course Design", value: "E-Learning & Course Design" },
  { label: "Leadership in Education", value: "Leadership in Education" },
  { label: "Special Needs Education", value: "Special Needs Education" },
  { label: "Others", value: "others" },
];

export const yearsOfExperienceData = [
  {
    label: "0-2",
    value: "ZERO_TO_TWO",
  },
  {
    label: "2-4",
    value: "TWO_TO_FOUR",
  },
  {
    label: "4-6",
    value: "FOUR_TO_SIX",
  },
  {
    label: "6+",
    value: "SIX_PLUS",
  },
];

export const learningGoal = [
  {
    label: "Career Advancement",
    value: "Career Advancement",
  },
  {
    label: "Skill Development",
    value: "Skill Development",
  },
  {
    label: "Subject-specific Knowledge",
    value: "Subject-specific Knowledge",
  },
];
export const preferredLearningMethod = [
  {
    label: "Online Courses",
    value: "Online Courses",
  },
  {
    label: "Interactive Activities",
    value: "Interactive Activities",
  },
  {
    label: "Video-Based Learning",
    value: "Video-Based Learning",
  },
];

export const schoolType = [
  {
    label: "Primary School",
    value: "Primary School",
  },
  {
    label: "Secondary School",
    value: "Secondary School",
  },
  {
    label: "Higher Education",
    value: "Higher Education",
  },
  {
    label: "Other (Specify)",
    value: "other",
  },
];

export const schoolFocusAreas = [
  {
    label: "Digital Literacy",
    value: "Digital Literacy",
  },
  {
    label: "Pedagogical Strategies",
    value: "Pedagogical Strategies",
  },
  {
    label: "Education Technology",
    value: "Education Technology",
  },
  {
    label: "Leadership in Education",
    value: "Leadership in Education",
  },
  {
    label: "Inclusive Teaching Practice",
    value: "Inclusive Teaching Practice",
  },
];

export const adminRoles = [
  {
    label: "Principal/Headteacher",
    value: "Principal/Headteacher",
  },
  {
    label: "Department Head",
    value: "Department Head",
  },
  {
    label: "Training Coordinator",
    value: "Training Coordinator",
  },
  {
    label: "Other (Specify)",
    value: "other",
  },
];

export const userRoles = [
  { title: "Mentor", icon: MdSchool },
  { title: "Teaching Assistant (TA)", icon: MdPeopleOutline },
  { title: "Primary Teacher", icon: GiTeacher },
  { title: "Secondary Teacher", icon: SlBookOpen },
  { title: "Higher Institution Teacher", icon: PiChalkboardTeacher },
  { title: "Institution", icon: RiSchoolLine },
];
