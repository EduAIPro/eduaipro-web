import { SchoolsTable } from "@/components/admin/dashboard/schools";

export default function AdminSchoolsPage() {
  return (
    <section>
      <div className="space-y-5">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Schools
        </h1>
        <SchoolsTable />
      </div>
    </section>
  );
}
