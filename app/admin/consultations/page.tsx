import { ConsultationsTable } from "@/components/admin/dashboard/consultations";

export default function AdminConsultationsPage() {
  return (
    <section>
      <div className="space-y-5">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Consultations
        </h1>
        <ConsultationsTable />
      </div>
    </section>
  );
}
