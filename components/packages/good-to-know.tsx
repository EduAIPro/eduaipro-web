import {
  BellIcon,
  CalendarIcon,
  ClockIcon,
  AwardIcon,
  RefreshCwIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

const ITEMS: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: CalendarIcon,
    title: "Plans last 2 years",
    text: "You pay once and your plan covers 24 months from the day you pay. Every certificate you earn is valid until your plan's end date.",
  },
  {
    Icon: ClockIcon,
    title: "6 months per pathway",
    text: "Finish each pathway within 6 months of opening its first slide: about 30 hours, at your own pace. On a paid plan you get one automatic 6-month extension. On Free, your progress is saved and you can upgrade to continue.",
  },
  {
    Icon: AwardIcon,
    title: "Your certificate is yours",
    text: "If your plan ends or you change schools, every certificate you've earned stays valid until its expiry date.",
  },
  {
    Icon: BellIcon,
    title: "We'll keep you on track",
    text: "Progress reminders while you learn, a countdown before your 6 months are up, and a reminder before your plan and certificate end.",
  },
  {
    Icon: RefreshCwIcon,
    title: "Refreshers need an active plan",
    text: "A refresher is a short course that renews your certificate when it is due. Keep your plan active, or renew it, before you start one.",
  },
  {
    Icon: UsersIcon,
    title: "School seats, simply",
    text: "Your school chooses its seats and pays when it sets up its account, then invites teachers. Want to try first? The free demo covers up to 5 teachers for Unit 1.",
  },
];

export default function GoodToKnow() {
  return (
    <section aria-labelledby="know-heading" className="flex flex-col gap-6">
      <h2
        id="know-heading"
        className="text-center font-semibold text-xl md:text-2xl tracking-tight"
      >
        Good to know
      </h2>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ Icon, title, text }) => (
          <li key={title} className="rounded-2xl border p-5 space-y-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-[#EBEFF9]">
              <Icon size={18} color="#0043be" aria-hidden="true" />
            </span>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm font-medium text-grey-11">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
