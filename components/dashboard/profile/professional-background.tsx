import { Staff } from "@/types/user";
import {
  educationalLevels,
  interestedSkills as interestedSkillsOptions,
  teachingLevels,
  yearsOfExperienceData,
} from "@/utils/data";
import {
  BriefcaseIcon,
  ClockIcon,
  GraduationCapIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react";

type ProfessionalBackgroundCardProps = {
  staff: Staff | null;
};

const EMPTY = "—";

export const ProfessionalBackgroundCard = ({
  staff,
}: ProfessionalBackgroundCardProps) => {
  const rows = [
    {
      title: "CPD pathway",
      value:
        teachingLevels.find((l) => l.value === staff?.teacherLevel)?.label ??
        EMPTY,
      icon: <GraduationCapIcon size={15} />,
      color: "#1A56DB",
      bg: "#EFF6FF",
    },
    {
      title: "Educational level",
      value:
        educationalLevels.find((l) => l.value === staff?.educationalLevel)
          ?.label ?? EMPTY,
      icon: <BriefcaseIcon size={15} />,
      color: "#1A56DB",
      bg: "#EFF6FF",
    },
    {
      title: "Area of specialization",
      value: staff?.areaOfSpecialization ?? EMPTY,
      icon: <TargetIcon size={15} />,
      color: "#EA580C",
      bg: "#FFF7ED",
    },
    {
      title: "Years of experience",
      value:
        yearsOfExperienceData.find((l) => l.value === staff?.experienceRange)
          ?.label ?? EMPTY,
      icon: <ClockIcon size={15} />,
      color: "#EA580C",
      bg: "#FFF7ED",
    },
  ];

  const skills = staff?.interestedSkills?.length
    ? staff.interestedSkills.map(
        (skill) =>
          interestedSkillsOptions.find((s) => s.value === skill)?.label ??
          skill,
      )
    : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#1A56DB] bg-[#EFF6FF]">
          <BriefcaseIcon size={16} />
        </div>
        <h3 className="font-bold text-grey-800 md:text-lg">
          Professional background
        </h3>
      </div>

      <ul className="space-y-1">
        {rows.map((row) => (
          <li
            key={row.title}
            className="flex items-center gap-3 py-2.5 border-b border-grey-3 last:border-b-0"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: row.bg, color: row.color }}
            >
              {row.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-grey-500">
                {row.title}
              </p>
              <p className="text-grey-800 font-semibold text-sm truncate">
                {row.value}
              </p>
            </div>
          </li>
        ))}

        <li className="flex items-start gap-3 py-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#1A56DB] bg-[#EFF6FF]">
            <SparklesIcon size={15} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium text-grey-500 mb-1.5">
              Interested skills
            </p>
            {skills.length ? (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center bg-primary/10 text-primary border border-primary/20 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-grey-800 font-semibold text-sm">{EMPTY}</p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};
