// import CalenderActiveIcon from "@/components/svgs/school/calendar-active.svg";
// import CalenderIcon from "@/components/svgs/school/calendar.svg";
import DashboardActiveIcon from "@/components/svgs/school/dashboard-active.svg";
import DashboardIcon from "@/components/svgs/school/dashboard.svg";
import SettingsActiveIcon from "@/components/svgs/school/settings-active.svg";
import SettingsIcon from "@/components/svgs/school/settings.svg";
import TeachersActiveIcon from "@/components/svgs/school/teachers-active.svg";
import TeachersIcon from "@/components/svgs/school/teachers.svg";
import { HeadsetIcon } from "lucide-react";

export const NavItems = [
  {
    name: "Dashboard",
    url: "/school",
    icon: DashboardIcon,
    activeIcon: DashboardActiveIcon,
  },
  {
    name: "Teachers",
    url: "/school/teachers",
    icon: TeachersIcon,
    activeIcon: TeachersActiveIcon,
  },
  {
    name: "Support",
    url: "/school/support",
    icon: HeadsetIcon,
    activeIcon: HeadsetIcon,
  },
  {
    name: "Settings",
    url: "/school/settings",
    icon: SettingsIcon,
    activeIcon: SettingsActiveIcon,
  },
];
