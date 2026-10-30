import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { cn } from "@/lib/utils";
import { Enrollment } from "@/types/enrollment";
import { format } from "date-fns";
import { isCompleted } from "@/lib/school-roster";

const fmt = (iso: string | null | undefined) =>
  iso ? format(new Date(iso), "dd MMM yyyy") : "—";

const chipStyle = {
  done: "text-green-700 bg-green-100",
  prog: "text-[#1A56DB] bg-blue-100",
  more: "text-grey-500 bg-grey-3",
};

export const Chip = ({
  kind,
  children,
}: {
  kind: keyof typeof chipStyle;
  children: React.ReactNode;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold whitespace-nowrap",
      chipStyle[kind],
    )}
  >
    {children}
  </span>
);

const shortTitle = (e: Enrollment) =>
  e.course.title.replace(/^Eduai Learning\s*/i, "").replace(/\s*Path$/i, "");

const EnrollmentTip = ({ e }: { e: Enrollment }) => {
  const done = isCompleted(e);
  const unit = e.currentUnit?.index;
  return (
    <>
      <b className="block text-[11.5px] font-semibold text-white">
        {e.course.title}
      </b>
      {done ? (
        <>
          Completed on {fmt(e.completedAt)}.{" "}
          {e.certificate ? (
            <>
              Certificate {e.certificate.certificateId} issued, valid to{" "}
              {fmt(e.certificate.expiresAt)}.
            </>
          ) : (
            <span className="text-amber-300">No certificate issued</span>
          )}
        </>
      ) : (
        <>
          {unit ? `Currently on unit ${unit} · ` : ""}
          {e.progress}% complete. Started {fmt(e.startedAt)}. No certificate
          until all units are finished.
        </>
      )}
    </>
  );
};

export const PathwayChips = ({ enrollments }: { enrollments: Enrollment[] }) => {
  if (!enrollments.length) return <span className="text-grey-500">—</span>;
  const shown = enrollments.slice(0, 2);
  const rest = enrollments.slice(2);

  return (
    <div className="flex items-center gap-1.5">
      {shown.map((e) => (
        <SimpleTooltip key={e.id} content={<EnrollmentTip e={e} />}>
          <Chip kind={isCompleted(e) ? "done" : "prog"}>
            {shortTitle(e)} {isCompleted(e) ? "✓" : "●"}
          </Chip>
        </SimpleTooltip>
      ))}
      {rest.length ? (
        <SimpleTooltip
          content={
            <>
              <b className="block text-[11.5px] font-semibold text-white">
                {rest.length} more pathway{rest.length > 1 ? "s" : ""}
              </b>
              {rest.map((e) => (
                <span key={e.id} className="block">
                  {e.course.title} — {isCompleted(e) ? "complete" : `${e.progress}%`}
                </span>
              ))}
            </>
          }
        >
          <Chip kind="more">+{rest.length}</Chip>
        </SimpleTooltip>
      ) : null}
    </div>
  );
};

export const ChipLegend = () => (
  <div className="flex flex-wrap items-center gap-4 rounded-t-xl border border-b-0 bg-white px-3.5 py-2.5 text-[11px] text-grey-500">
    <span className="flex items-center gap-1.5">
      <Chip kind="done">Primary ✓</Chip>
      <b className="font-semibold text-grey-800">Complete</b> — all units finished
    </span>
    <span className="flex items-center gap-1.5">
      <Chip kind="prog">Mentors ●</Chip>
      <b className="font-semibold text-grey-800">In progress</b>
    </span>
    <span className="flex items-center gap-1.5">
      <Chip kind="more">+2</Chip>
      <b className="font-semibold text-grey-800">More</b> — hover or focus a chip
      for detail
    </span>
  </div>
);
