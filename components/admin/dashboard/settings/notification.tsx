import { Switch } from "@/components/ui/switch";

type NotificationSettingsProps = {};

export const NotificationSettings = ({}: NotificationSettingsProps) => {
  const notificationCategories = [
    {
      label: "New teacher registration",
      value: true,
    },
    {
      label: "Certification renewal alert",
      value: true,
    },
    {
      label: "Accreditation obtained",
      value: false,
    },
  ];
  return (
    <div className="space-y-4">
      <div className="pb-1 border-b border-grey-400">
        <h2 className="text-lg font-semibold text-grey-800/80">Notification</h2>
      </div>
      <div className="py-4 grid sm:grid-cols-3 lg:grid-cols-4 max-sm:gap-5 text-grey-500">
        <div className="max-lg:hidden"></div>
        <div className=" w-full max-sm:space-y-5 sm:col-span-2">
          <ul className="space-y-2.5 text-grey-500">
            {notificationCategories.map((n) => (
              <li
                key={n.label}
                className="flex items-center gap-3 max-sm:justify-between"
              >
                <p className="font-medium whitespace-nowrap min-w-[250px]">
                  {n.label}
                </p>
                <Switch defaultChecked={n.value} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
