import { TeachersTable } from "@/components/school/dashboard/teachers/teachers-table";

const TeachersPage = () => {
  return (
    <section>
      <div className="space-y-5">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Teachers
        </h1>
        <TeachersTable />
      </div>
    </section>
  );
};
export default TeachersPage;
