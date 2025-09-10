"use client";
// import { NotificationSettings } from "@/components/admin/dashboard/settings";
import { ChangePasswordSettings } from "@/components/school/dashboard/settings";

const SettingsPage = () => {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold text-grey-800">Settings</h1>
      <div className="border rounded-xl max-sm:p-4 max-lg:p-5 p-10 bg-white space-y-6">
        <ChangePasswordSettings />
        {/* <NotificationSettings />  */}
      </div>
    </section>
  );
};
export default SettingsPage;
