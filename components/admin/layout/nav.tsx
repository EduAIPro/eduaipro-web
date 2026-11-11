import {
  BookOpenIcon,
  CreditCardIcon,
  GraduationCapIcon,
  HeadsetIcon,
  CalendarCheckIcon,
  LayoutDashboardIcon,
  NotepadTextIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

export const AdminNavItems = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Schools",
    url: "/admin/schools",
    icon: GraduationCapIcon,
  },
  {
    name: "Admin",
    url: "/admin/admins",
    icon: UserIcon,
  },
  {
    name: "Teachers",
    url: "/admin/teachers",
    icon: UsersIcon,
  },
  {
    name: "Courses",
    url: "/admin/courses",
    icon: BookOpenIcon,
  },
  {
    name: "Billing",
    url: "/admin/billing",
    icon: CreditCardIcon,
  },
  {
    name: "Consultations",
    url: "/admin/consultations",
    icon: CalendarCheckIcon,
  },
  // {
  //   name: "Calendar",
  //   url: "/admin/calendar",
  //   icon: CalendarDaysIcon,
  // },
  {
    name: "Survey",
    url: "/admin/survey",
    icon: NotepadTextIcon,
  },
  {
    name: "Support",
    url: "/admin/support",
    icon: HeadsetIcon,
  },
];
