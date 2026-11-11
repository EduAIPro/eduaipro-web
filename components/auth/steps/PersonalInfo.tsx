import FormInput, { DateInput } from "@/components/common/ui/FormInput";
import { cn } from "@/lib/utils";
import { PersonalInfoFormValue } from "@/utils/validation/auth";
import { City, Country, State } from "country-state-city";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ModalTitleAndDesc from "../ModalTitleAndDesc";
import { UserPlusIcon } from "lucide-react";

type PersonalInfoProps = {
  touched: FormikTouched<PersonalInfoFormValue>;
  errors: FormikErrors<PersonalInfoFormValue>;
  userPhoneExists: boolean;
  isInvited: boolean;
};

// ─── Country / State / City picker ────────────────────────────────────────
// Writes a single "City, State, Country" string into the `location` field —
// the backend still only expects one location string, so the three-level
// picker is purely a nicer way to build that same value.

type Option = { label: string; value: string };

function LocationDropdown({
  label,
  placeholder,
  value,
  options,
  onSelect,
  disabled,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: Option[];
  onSelect: (option: Option) => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const filtered = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div className="w-full">
      <p className="font-medium text-base mb-1 text-grey-650">{label}</p>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((p) => !p)}
          className={cn(
            "shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-2 px-3 w-full border rounded-lg cursor-pointer text-left transition-colors duration-200 border-grey-4/50",
            isOpen ? "border-brand-1001 border-[1.5px]" : "",
            disabled ? "opacity-50 cursor-not-allowed bg-grey-1/40" : "",
          )}
        >
          <span
            className={cn(
              "flex-1 text-base truncate",
              value ? "text-grey-12" : "text-grey-500/80",
            )}
          >
            {value || placeholder}
          </span>
          <ChevronDownIcon
            size={18}
            className={cn(
              "shrink-0 transition-transform duration-300",
              isOpen ? "rotate-180" : "rotate-0",
            )}
          />
        </button>

        {isOpen && !disabled && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-grey-4/50 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-2 border-b border-grey-4/50">
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}`}
                className="w-full text-sm px-2 py-1.5 outline-none border border-grey-4/50 rounded-md"
              />
            </div>
            <ul className="max-h-52 overflow-y-auto divide-y divide-grey-4/10">
              {filtered.length === 0 && (
                <li className="px-4 py-2.5 text-sm text-grey-500">
                  No results found
                </li>
              )}
              {filtered.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(option);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "w-full flex items-center px-4 py-2.5 hover:bg-primary-100/60 transition-colors text-left text-sm",
                      option.label === value
                        ? "bg-primary-100/40 text-primary font-medium"
                        : "text-grey-12",
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function LocationFields({ error }: { error?: string | null }) {
  const { setFieldValue } = useFormikContext<PersonalInfoFormValue>();

  const [country, setCountry] = useState<Option | null>(null);
  const [state, setState] = useState<Option | null>(null);
  const [city, setCity] = useState<Option | null>(null);

  const countryOptions = useMemo(
    () =>
      Country.getAllCountries().map((c) => ({
        label: c.name,
        value: c.isoCode,
      })),
    [],
  );

  const stateOptions = useMemo(
    () =>
      country
        ? State.getStatesOfCountry(country.value).map((s) => ({
            label: s.name,
            value: s.isoCode,
          }))
        : [],
    [country],
  );

  const cityOptions = useMemo(
    () =>
      country && state
        ? City.getCitiesOfState(country.value, state.value).map((c) => ({
            label: c.name,
            value: c.name,
          }))
        : [],
    [country, state],
  );

  // Keep the single `location` string in sync with whatever has been picked.
  useEffect(() => {
    const parts = [city?.label, state?.label, country?.label].filter(
      Boolean,
    );
    setFieldValue("location", parts.join(", "));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, state, city]);

  return (
    <div className="flex flex-col gap-y-4">
      <LocationDropdown
        label="Country"
        placeholder="Select your country"
        value={country?.label ?? ""}
        options={countryOptions}
        onSelect={(option) => {
          setCountry(option);
          setState(null);
          setCity(null);
        }}
      />
      <LocationDropdown
        label="State"
        placeholder={
          country ? "Select your state" : "Select a country first"
        }
        value={state?.label ?? ""}
        options={stateOptions}
        disabled={!country}
        onSelect={(option) => {
          setState(option);
          setCity(null);
        }}
      />
      <LocationDropdown
        label="City"
        placeholder={state ? "Select your city" : "Select a state first"}
        value={city?.label ?? ""}
        options={cityOptions}
        disabled={!state}
        onSelect={(option) => setCity(option)}
      />
      {error && (
        <div>
          <p className="text-sm text-red-500 capitalize">{error}</p>
        </div>
      )}
    </div>
  );
}

export default function PersonalInfo({
  touched,
  errors,
  userPhoneExists,
  isInvited,
}: PersonalInfoProps) {
  return (
    <div>
      <ModalTitleAndDesc
        title="Personal information"
        description="Please provide your basic details to help us personalize your
            experience."
        Icon={UserPlusIcon}
        step={1}
        totalSteps={3}
      />

      <div className="mt-6 flex-col flex gap-y-4">
        <DateInput
          name="dateOfBirth"
          label="Date of Birth"
          error={
            touched.dateOfBirth && errors.dateOfBirth
              ? errors.dateOfBirth
              : null
          }
        />
        {isInvited ? null : (
          <FormInput
            label="School name"
            placeholder="Enter your school name"
            className="w-full"
            name="schoolName"
            error={
              touched.schoolName && errors.schoolName ? errors.schoolName : null
            }
          />
        )}
        {userPhoneExists ? null : (
          <FormInput
            label="Contact number"
            type="number"
            placeholder="Enter your mobile number"
            className="w-full"
            name="phone"
            error={touched.phone && errors.phone ? errors.phone : null}
          />
        )}
        <LocationFields
          error={touched.location && errors.location ? errors.location : null}
        />
      </div>
    </div>
  );
}
