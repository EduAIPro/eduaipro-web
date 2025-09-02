
import ChangePassword from "@/components/settings/change-password";
import Notification from "@/components/settings/notification";
import PersonalInformation from "@/components/settings/personal-information";


export default function AdminSettingsPage() {
  return (
    <section>
      <p className="text-[24px] sm:text-[28px] font-semibold sm:font-bold text-[#141414] leading-[100%]">
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
