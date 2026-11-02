import Typography from "@/components/common/ui/Typography";

// A certificate is valid until the plan ends, 24 months after payment, so the
// sooner you finish the longer you stay certified.
const SCALE_MONTHS = 24;
const PLAN_MONTHS = 24;

const pct = (months: number) => `${(months / SCALE_MONTHS) * 100}%`;

const TIMELINE = [
  { who: "Finish in 6 months", finishMonth: 6, recommended: true },
  { who: "Finish in 12 months", finishMonth: 12, recommended: false },
];

const AXIS = [0, 6, 12, 18, 24];

const REASONS = [
  {
    title: "Certified sooner.",
    text: "Your certificate is issued the day you finish and stays valid until your plan ends, so every month you save is a month of certification.",
  },
  {
    title: "No extension needed.",
    text: "A pathway takes about 30 hours. Finish inside the 6-month window and you never touch your extension.",
  },
  {
    title: "Room for the next pathway.",
    text: "Your plan runs for 24 months, so an early finish leaves more time for the others.",
  },
];

export default function FinishSooner() {
  return (
    <section
      id="sooner"
      aria-labelledby="sooner-heading"
      className="rounded-2xl border p-5 md:p-8 scroll-mt-24"
    >
      <h2
        id="sooner-heading"
        className="font-semibold text-xl md:text-2xl tracking-tight"
      >
        Finish sooner, stay certified longer
      </h2>
      <div className="mt-2 mb-6 max-w-[720px]">
        <Typography.P weight="medium" fontColor="medium">
          Your certificate is valid until your plan ends, 24 months after you
          pay. Finish in 6 months and you are certified for 18; finish in 12
          and you are certified for 12.
        </Typography.P>
      </div>

      <div className="grid gap-5">
        {TIMELINE.map((row) => {
          const certMonths = PLAN_MONTHS - row.finishMonth;
          return (
            <div
              key={row.who}
              className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 md:items-center text-sm font-medium"
            >
              <div className="flex items-center gap-2 md:block md:space-y-1">
                <span className="text-grey-12">{row.who}</span>
                {row.recommended && (
                  <span className="inline-block md:block w-fit rounded bg-[#EBEFF9] px-1.5 py-0.5 text-[11px] font-semibold text-primary">
                    Recommended
                  </span>
                )}
              </div>
              <div className="space-y-1.5">
                <div
                  role="img"
                  aria-label={`${row.who}: learn for ${row.finishMonth} months, certificate issued at month ${row.finishMonth} and valid until month ${PLAN_MONTHS}, ${certMonths} months of certification`}
                  className="relative flex h-[30px] rounded-lg overflow-hidden bg-white"
                >
                  <span
                    style={{ width: pct(row.finishMonth) }}
                    className="flex items-center px-2.5 text-xs font-semibold whitespace-nowrap overflow-hidden bg-[#D9E3F8] text-[#0a2a6b]"
                  >
                    Learning
                  </span>
                  <span
                    style={{ width: pct(certMonths) }}
                    className="flex items-center px-2.5 text-xs font-semibold whitespace-nowrap overflow-hidden bg-primary text-white"
                  >
                    Certified for {certMonths} months
                  </span>
                </div>
                <p className="text-xs text-grey-10">
                  Certificate issued at month {row.finishMonth}, valid until
                  month{" "}
                  <span className="font-semibold text-primary">
                    {PLAN_MONTHS}
                  </span>{" "}
                  (when your plan ends)
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="hidden md:grid grid-cols-[150px_1fr] gap-4 mt-3 text-xs font-medium text-grey-10"
      >
        <div />
        <div className="relative h-4 border-t">
          {AXIS.map((month) => (
            <span
              key={month}
              style={{ left: pct(month) }}
              className={
                month === 0
                  ? "absolute pt-1"
                  : month === SCALE_MONTHS
                    ? "absolute pt-1 -translate-x-full"
                    : "absolute pt-1 -translate-x-1/2"
              }
            >
              {month === 0 ? "Day you pay" : `${month} mo`}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-12">
        <div className="space-y-2">
          <h3 className="font-semibold text-2xl md:text-3xl tracking-tight text-gray-800">
            Finish in 6 months or less.
          </h3>
          <p className="text-sm font-medium text-grey-11">
            You can achieve this by dedicating about 5 hours a month. {"That's"}{" "}
            a little over an hour a week, and 10 minutes a day.
          </p>
        </div>
        <ul className="space-y-4">
          {REASONS.map(({ title, text }) => (
            <li key={title} className="text-sm font-medium text-grey-11">
              <span className="font-semibold text-gray-800">{title}</span>{" "}
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
