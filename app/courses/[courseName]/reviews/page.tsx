import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const filePath = path.join(
    process.cwd(),
    "components/common/data/courses.json"
  );
  // Read and parse the file
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const courses = JSON.parse(fileContents);

  const params = courses.map((course: any) => ({
    courseName: encodeURI(course.name),
  }));

  return params;
}

export default function ReviewsPage({
  params,
}: {
  params: Promise<{ courseName: string }>;
}) {
  return <div></div>;
}
