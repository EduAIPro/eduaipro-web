import Typography from "@/components/common/ui/Typography";
import useSubscriptionPlans from "@/hooks/use-subscription-plans";
import { cn, formatKobo } from "@/lib/utils";
import { CheckIcon, MinusIcon } from "lucide-react";
import { Fragment } from "react";

type Cell = string | boolean;

type Row = {
  label: string;
  note?: string;
  // free, personal pro, school pro, custom
  values: [Cell, Cell, Cell, Cell];
};

type PlanColumn = { name: string; price: string; highlight?: boolean };

const SECTIONS: { title: string; rows: Row[] }[] = [
  {
    title: "Learning",
    rows: [
      {
        label: "Pathways (units, slides and quizzes)",
        values: ["1", "All 5", "All 5", "All 5"],
      },
      {
        label: "If the 6-month window runs out",
        values: [
          "Progress saved, upgrade to continue",
          "One automatic 6-month extension",
          "One automatic 6-month extension",
          "Set by contract",
        ],
      },
    ],
  },
  {
    title: "Certification",
    rows: [
      {
        label: "Accredited certificate on completion",
        note: "The CPD Standards Office (UK)",
        values: ["Locked", true, true, true],
      },
      {
        label:
          "Certificate valid until the plan's end date, owned by the teacher",
        values: [false, true, true, true],
      },
      {
        label: "Certificate refresher (needs an active plan)",
        values: [false, true, true, true],
      },
    ],
  },
  {
    title: "For school leaders",
    rows: [
      {
        label: "School dashboard: staff, progress, certificates",
        values: [false, false, true, true],
      },
      {
        label: "Free demo before buying (5 teachers, Unit 1)",
        values: [false, false, true, "On request"],
      },
      {
        label: "Renewals tracker and compliance export",
        values: [false, false, true, true],
      },
      {
        label: "Shared seat pool and network dashboard",
        values: [false, false, false, true],
      },
      {
        label: "Onboarding sessions and impact report",
        values: [false, false, false, true],
      },
    ],
  },
  {
    title: "Billing",
    rows: [
      {
        label: "How you pay",
        values: [
          false,
          "Card or bank transfer, once per 2 years",
          "Per seat, card, transfer or invoice, before dashboard access",
          "By contract",
        ],
      },
    ],
  },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <CheckIcon
        size={18}
        color="#0043be"
        className="mx-auto max-md:ml-auto max-md:mr-0"
        aria-label="Included"
      />
    );
  }
  if (value === false) {
    return (
      <MinusIcon
        size={18}
        className="mx-auto text-gray-300 max-md:ml-auto max-md:mr-0"
        aria-label="Not included"
      />
    );
  }
  return <>{value}</>;
}

export default function ComparePlans() {
  const { personalPro, schoolPro } = useSubscriptionPlans();
  const bands = schoolPro?.current?.bands ?? [];
  const cheapest = bands.length
    ? Math.min(...bands.map((b) => b.unitAmountKobo))
    : null;
  // Prices are data; only the Free and Custom columns are static copy.
  const PLANS: PlanColumn[] = [
    { name: "Free", price: "₦0" },
    {
      name: "Personal Pro",
      price: personalPro?.current
        ? `${formatKobo(personalPro.current.amountKobo, personalPro.current.currency)} / ${(personalPro.details?.termMonths ?? 24) / 12} years`
        : "—",
      highlight: true,
    },
    {
      name: "School Pro",
      price: cheapest !== null ? `From ${formatKobo(cheapest)} per seat` : "—",
    },
    { name: "Custom", price: "Quoted" },
  ];

  return (
    <section
      id="compare"
      aria-labelledby="compare-heading"
      className="flex flex-col gap-6 scroll-mt-24"
    >
      <div className="text-center space-y-2">
        <h2
          id="compare-heading"
          className="font-semibold text-xl md:text-2xl tracking-tight"
        >
          Compare plans
        </h2>
        <Typography.P weight="medium" fontColor="medium">
          See exactly what each plan covers, side by side.
        </Typography.P>
      </div>
      {/* Phones: one card per plan, so nothing scrolls sideways. */}
      <div className="grid gap-4 md:hidden">
        {PLANS.map((plan, planIndex) => (
          <div
            key={plan.name}
            role="group"
            aria-label={`${plan.name} plan`}
            className={cn(
              "rounded-xl border overflow-hidden",
              plan.highlight && "border-primary-150",
            )}
          >
            <div
              className={cn(
                "px-4 py-3 border-b",
                plan.highlight ? "bg-[#EBEFF9] text-primary" : "bg-gray-50",
              )}
            >
              <h3 className="font-semibold text-base">{plan.name}</h3>
              <p className="text-xs font-medium text-grey-10">{plan.price}</p>
            </div>
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="px-4 py-2 bg-gray-50 border-b text-xs font-semibold uppercase tracking-wide text-grey-10">
                  {section.title}
                </p>
                <dl className="divide-y">
                  {section.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-4 px-4 py-3 text-sm font-medium"
                    >
                      <dt className="text-grey-12">
                        {row.label}
                        {row.note && (
                          <span className="block text-xs text-grey-10">
                            {row.note}
                          </span>
                        )}
                      </dt>
                      <dd className="shrink-0 max-w-[45%] text-right text-grey-11">
                        <CellValue value={row.values[planIndex]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto border rounded-lg">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr>
              <th scope="col" className="bg-gray-50 border-b" />
              {PLANS.map((plan) => (
                <th
                  key={plan.name}
                  scope="col"
                  className={cn(
                    "px-4 py-4 text-center font-semibold text-base border-b",
                    plan.highlight ? "bg-[#EBEFF9] text-primary" : "bg-gray-50",
                  )}
                >
                  {plan.name}
                  <span className="block text-xs font-medium text-grey-10 mt-0.5">
                    {plan.price}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SECTIONS.map((section) => (
              <Fragment key={section.title}>
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-2.5 bg-gray-50 border-b text-xs font-semibold uppercase tracking-wide text-grey-10"
                  >
                    {section.title}
                  </td>
                </tr>
                {section.rows.map((row) => (
                  <tr key={row.label} className="[&:last-child>*]:border-b-0">
                    <td className="px-4 py-3.5 border-b font-medium text-grey-12">
                      {row.label}
                      {row.note && (
                        <span className="block text-xs text-grey-10">
                          {row.note}
                        </span>
                      )}
                    </td>
                    {row.values.map((value, i) => (
                      <td
                        key={i}
                        className={cn(
                          "px-4 py-3.5 border-b text-center font-medium text-grey-11",
                          PLANS[i].highlight && "bg-[#EBEFF9]/45",
                        )}
                      >
                        <CellValue value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
