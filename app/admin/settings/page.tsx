
import ChangePassword from "@/components/settings/change-password";
import Notification from "@/components/settings/Notification";
import PersonalInformation from "@/components/settings/personal-information";


export default function AdminSettingsPage() {
  return (
    <section>
      <p className="text-[28px] font-semibold text-[#141414] leading-[100%]">
        Settings
      </p>

      <div className="mt-[40px] flex flex-col gap-[30px] p-[40px] bg-white border-[#DBDBDB] border rounded-[12px]">
        <PersonalInformation />
        <ChangePassword />
        <Notification />
      </div>
    </section>
  );
}
