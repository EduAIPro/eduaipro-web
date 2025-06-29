import { UnitHeader } from "@/components/course-page/units/unit-header";
import fs from "fs";
import path from "path";
import { CgFileDocument } from "react-icons/cg";

type Unit = {
  number: number;
  title: string;
  introduction: string;
  objectives: string[];
  modules: {
    title: string;
    duration: number;
  }[];
  totalDuration: number;
};

const details = [
  {
    label: "Assessments",
    description: "4 Assessments",
    icon: CgFileDocument,
  },
];

const videos = [
  {
    title: "Course Introduction",
    duration: 10,
  },
  {
    title: "What Is a Prompt?",
    duration: 12,
  },
  {
    title: "What Is Prompt Engineering?",
    duration: 8,
  },
  {
    title: "Best Practices for Prompt Creation",
    duration: 5,
  },
];

const readings = [
  {
    title: "Course Overview",
    duration: 4,
  },
  {
    title: "Specialization Overview",
    duration: 17,
  },
  {
    title: "Helpful Tips for Course Completion",
    duration: 2,
  },
  {
    title: "Lesson Summary",
    duration: 5,
  },
];

const assignments = [
  {
    title: "Graded Quiz: Prompt Engineering for Generative AI",
    duration: 14,
  },
  {
    title: "Practice Quiz: Concept of Prompt Engineering",
    duration: 8,
  },
  {
    title: "Exam: Concept of Prompt Engineering",
    duration: 20,
  },
];

export async function generateStaticParams() {
  const filePath = path.join(
    process.cwd(),
    "components/common/data/courses.json"
  );
  // Read and parse the file
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const courses = JSON.parse(fileContents);

  const params = courses.flatMap((course: any) =>
    course.units.map((u: any) => ({
      courseName: encodeURIComponent(course.name),
      unitId: String(u.number),
    }))
  );

  return params;
}

export default async function CourseUnitPage({
  params,
}: {
  params: { courseName: string; unitId: string };
}) {
  const parameters = await params;
  return (
    <>
      <UnitHeader params={parameters} />
    </>
  );
}
