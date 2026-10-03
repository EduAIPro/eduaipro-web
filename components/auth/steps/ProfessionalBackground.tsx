"use client";
import FormInput, { SelectInput } from "@/components/common/ui/FormInput";
import { cn } from "@/lib/utils";
import {
  cpdPathways,
  educationalLevels,
  interestedSkills,
  roleToTeachingLevel,
  yearsOfExperienceData,
} from "@/utils/data";
import { ProfessionalBackgroundFormValue } from "@/utils/validation/auth";
import {
  FormikErrors,
  FormikTouched,
  useField,
  useFormikContext,
} from "formik";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseIcon,
  ChevronDownIcon,
  GraduationCapIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ModalTitleAndDesc from "../ModalTitleAndDesc";

type ProfessionalBackgroundProps = {
  touched: FormikTouched<ProfessionalBackgroundFormValue>;
  errors: FormikErrors<ProfessionalBackgroundFormValue>;
  values: ProfessionalBackgroundFormValue;
};

// ─── CPD pathway confirm + picker ─────────────────────────────────────────
// The pathway is set from the role chosen at sign-up and written straight
// into `teachingLevel`. Teachers can override it here if sign-up guessed
// wrong, but there is no separate "Professional Level" dropdown any more —
// it duplicated this same field.

function CpdPathwaySection({ error }: { error?: string | null }) {
  const { values, setFieldValue } =
    useFormikContext<ProfessionalBackgroundFormValue>();
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    if (values.teachingLevel) return;
    const storedRole =
      typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    const fallback = storedRole ? roleToTeachingLevel[storedRole] : undefined;
    setFieldValue("teachingLevel", fallback ?? cpdPathways[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pathway =
    cpdPathways.find((p) => p.value === values.teachingLevel) ??
    cpdPathways[0];
  const Icon = pathway.icon;

  return (
    <div>
      <p className="font-medium text-base mb-1 text-grey-650">
        CPD pathway
      </p>
      <div className="flex items-center gap-3 rounded-lg border border-primary-300/30 bg-primary-300/5 p-3.5">
        <span className="shrink-0 rounded-full bg-white p-2 text-primary-300 shadow-sm">
          <Icon size={20} />
        </span>
        <div className="flex-1">
          <p className="text-xs text-grey-500">Your CPD pathway</p>
          <p className="text-sm font-semibold text-primary-300">
            {pathway.name}
          </p>
          <p className="mt-0.5 text-xs text-grey-500 leading-relaxed">
            Set from the role you chose at sign-up ({pathway.role}). This is
            the certificate you&apos;ll earn.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="shrink-0 rounded-md border border-grey-4/50 bg-white px-3 py-1.5 text-xs font-medium text-grey-650 hover:bg-grey-50 transition-colors"
        >
          Change
        </button>
      </div>
      {error && (
        <div className="mt-2">
          <p className="text-sm text-red-500 capitalize">{error}</p>
        </div>
      )}

      {pickerOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setPickerOpen(false);
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="w-full max-w-md rounded-xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-start gap-3 border-b border-grey-3 p-4">
                  <span className="rounded-full bg-primary-300/10 p-2 text-primary-300">
                    <GraduationCapIcon size={18} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-grey-900">
                      Change your CPD pathway
                    </p>
                    <p className="text-xs text-grey-500">
                      This is the credential you&apos;ll earn
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(false)}
                    className="text-grey-400 hover:text-grey-600 transition-colors"
                  >
                    <XIcon size={18} />
                  </button>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  {cpdPathways.map((p) => {
                    const PIcon = p.icon;
                    const active = p.value === pathway.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => {
                          setFieldValue("teachingLevel", p.value);
                          setPickerOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                          active
                            ? "border-primary-300 bg-primary-300/5"
                            : "border-grey-4/50 hover:bg-grey-50",
                        )}
                      >
                        <span className="shrink-0 rounded-full bg-primary-300/10 p-2 text-primary-300">
                          <PIcon size={18} />
                        </span>
                        <span>
                          <p className="text-sm font-medium text-grey-900">
                            {p.name}
                          </p>
                          <p className="text-xs text-grey-500">
                            12 units · 30 CPD hours
                          </p>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

// ─── Skills Picker ────────────────────────────────────────────────────────────

function SkillsSelectInput({
  error,
  preselected,
}: {
  error?: string | null;
  /** Comma-separated string already stored in the field (e.g. on edit) */
  preselected?: string;
}) {
  const [, , helpers] = useField("interestInSkills");
  void useFormikContext(); // keep subscribed so component re-renders with form

  // Parse preselected into initial selected set
  const parsePreselected = (raw: string): string[] =>
    raw
      ? raw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  // Determine which preselected values are NOT in the predefined list → they're "others"
  const predefinedValues = interestedSkills
    .filter((s) => s.value !== "others")
    .map((s) => s.value);

  const init = parsePreselected(preselected ?? "");
  const initPredefined = init.filter((v) => predefinedValues.includes(v));
  const initOthers = init.filter((v) => !predefinedValues.includes(v));

  const [selected, setSelected] = useState<string[]>(initPredefined);
  const [othersMode, setOthersMode] = useState(initOthers.length > 0);
  const [otherText, setOtherText] = useState(initOthers.join(", "));
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync formik field whenever selection changes
  useEffect(() => {
    const otherValues = othersMode
      ? otherText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const all = [...selected, ...otherValues];
    helpers.setValue(all.join(", "));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, otherText, othersMode]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const toggle = (value: string) => {
    if (value === "others") {
      setOthersMode((prev) => {
        if (prev) setOtherText("");
        return !prev;
      });
      return;
    }
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const removeSkill = (skill: string) => {
    // Could be from predefined or from others
    if (predefinedValues.includes(skill)) {
      setSelected((prev) => prev.filter((v) => v !== skill));
    } else {
      // Remove from other text
      const current = otherText
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== skill);
      setOtherText(current.join(", "));
      if (current.length === 0) setOthersMode(false);
    }
  };

  // All active pills to render
  const allSelected = [
    ...selected,
    ...(othersMode
      ? otherText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : []),
  ];

  return (
    <div className="w-full">
      <p className="font-medium text-base mb-1 text-grey-650">
        Interested Skills
      </p>

      {/* Pills strip */}
      {allSelected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {allSelected.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-red-500 transition-colors"
                aria-label={`Remove ${skill}`}
              >
                <XIcon size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown trigger */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          className={cn(
            "shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-2 px-3 w-full border rounded-lg cursor-pointer text-left transition-colors duration-200",
            error ? "border-red-400" : "border-grey-4/50",
            isOpen ? "border-brand-1001 border-[1.5px]" : "",
          )}
        >
          <span className="flex-1 text-base text-grey-500/80">
            {allSelected.length > 0
              ? `${allSelected.length} skill${allSelected.length > 1 ? "s" : ""} selected`
              : "Select skills you want to learn"}
          </span>
          <ChevronDownIcon
            size={18}
            className={cn(
              "shrink-0 transition-transform duration-300",
              isOpen ? "rotate-180" : "rotate-0",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-grey-4/50 rounded-lg shadow-lg z-50 overflow-hidden">
            <ul className="max-h-52 overflow-y-auto divide-y divide-grey-4/10">
              {interestedSkills.map((skill) => {
                const isChecked =
                  skill.value === "others"
                    ? othersMode
                    : selected.includes(skill.value);

                return (
                  <li key={skill.value}>
                    <button
                      type="button"
                      onClick={() => toggle(skill.value)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary-100/60 transition-colors text-left",
                        isChecked ? "bg-primary-100/40" : "",
                      )}
                    >
                      {/* Checkbox */}
                      <span
                        className={cn(
                          "w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors",
                          isChecked
                            ? "bg-primary border-primary"
                            : "border-gray-300",
                        )}
                      >
                        {isChecked && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 12 10"
                          >
                            <path
                              d="M1 5l3.5 3.5L11 1"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span
                        className={cn(
                          "text-sm",
                          isChecked
                            ? "text-primary font-medium"
                            : "text-grey-12",
                          skill.value === "others"
                            ? "italic text-grey-500"
                            : "",
                        )}
                      >
                        {skill.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* "Others" free-text input — shown when Others is toggled on */}
      {othersMode && (
        <div className="mt-2">
          <input
            type="text"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Type your skills, separate by a comma"
            className={cn(
              "shadow-lg !shadow-grey-2 w-full border rounded-lg py-2 px-3 text-base text-grey-12 outline-none transition-colors duration-200 focus:border-brand-1001 focus:border-[1.5px]",
              error ? "border-red-400" : "border-grey-4/50",
            )}
          />
          <span className="text-xs text-grey-9 mt-0.5 block">
            Separate multiple skills by a comma
          </span>
        </div>
      )}

      {error && (
        <div className="mt-2">
          <p className="text-sm text-red-500 capitalize">{error}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfessionalBackground({
  touched,
  errors,
  values,
}: ProfessionalBackgroundProps) {
  return (
    <div>
      <ModalTitleAndDesc
        title="Professional Background"
        description="Please provide your professional and educational background to help us better understand your experience."
        Icon={BriefcaseIcon}
        step={2}
        totalSteps={3}
      />

      <div className="mt-6 flex-col flex gap-y-4">
        <CpdPathwaySection
          error={
            touched.teachingLevel && errors.teachingLevel
              ? errors.teachingLevel
              : null
          }
        />

        <SelectInput
          name="educationLevel"
          label="Educational Level"
          options={educationalLevels}
          error={
            touched.educationLevel && errors.educationLevel
              ? errors.educationLevel
              : null
          }
        />

        <FormInput
          label="Area of specialization"
          placeholder="Enter the subject which you specialize in"
          className="w-full"
          name="areaOfSpecialization"
          error={
            touched.areaOfSpecialization && errors.areaOfSpecialization
              ? errors.areaOfSpecialization
              : null
          }
        />

        <SkillsSelectInput
          error={
            touched.interestInSkills && errors.interestInSkills
              ? errors.interestInSkills
              : null
          }
          preselected={values.interestInSkills}
        />

        <SelectInput
          name="yearsOfExperience"
          label="Years of Experience"
          options={yearsOfExperienceData}
          error={
            touched.yearsOfExperience && errors.yearsOfExperience
              ? errors.yearsOfExperience
              : null
          }
        />
      </div>
    </div>
  );
}
