import { TopDashboardCards } from "@/components/admin/dashboard/overview";
import { BottomLeftSection } from "@/components/admin/dashboard/overview/bottom-left-section";
import { BottomRightSection } from "@/components/admin/dashboard/overview/bottom-right-section";

export default function AdminPage() {
  return (
    <section>
      <div className="space-y-5">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Dashboard
        </h1>
        <div className="space-y-5">
          <TopDashboardCards />
          <div className="grid grid-cols-2 gap-5">
            <BottomLeftSection />
            <BottomRightSection />
          </div>
        </div>
      </div>
    </section>
  );
}
