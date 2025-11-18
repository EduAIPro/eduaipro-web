"use client";
import { useEffect, useMemo, useState } from "react";
// Import Shadcn UI components (adjust the import paths based on your project structure)
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Field, useFormikContext } from "formik";
import Typography from "./Typography";

interface Country {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
}

const countries: Country[] = [
  { code: "US", name: "United States of America", dialCode: "+1", flag: "🇺🇸" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "UK", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
];

type PhoneInputProps = {
  name: string;
  dialCodeName?: string;
  label?: string;
  className?: string;
  error: string | null;
  setFieldValue: (fieldName: string, value: string) => void;
};

export default function PhoneInput({
  name,
  setFieldValue,
  dialCodeName,
  error,
  label,
  className,
}: PhoneInputProps) {
  const { values } = useFormikContext<any>();

  const phoneField =
    values["phoneNumber"] || values["phone"] || values["contactPhone"];

  const defaultCountry = useMemo(() => {
    if (phoneField && phoneField.dialCode) {
      return (
        countries.find((c) => c.dialCode === phoneField.dialCode) ??
        countries[0]
      );
    } else {
      return countries[0];
    }
  }, [phoneField]);

  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);

  const [rawPhone, setRawPhone] = useState<string>(phoneField.digits ?? "");

  // Updates the selected country and re-formats the phone number
  const handleCountryChange = (code: string) => {
    const newCountry = countries.find((c) => c.code === code);
    if (newCountry) {
      setSelectedCountry(newCountry);
      setFieldValue(dialCodeName ?? "dialCode", newCountry.dialCode);
      formatPhone(rawPhone, newCountry.dialCode);
    }
  };

  // Removes alphabetic characters and leading zeros from the phone number
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    input = input.replace(/[a-zA-Z]/g, ""); // remove any letters
    input = input.replace(/^0+/, ""); // remove leading zeros
    setRawPhone(input);
    formatPhone(input, selectedCountry.dialCode);
  };

  // Formats the phone number by appending the dial code
  const formatPhone = (phone: string, dialCode: string) => {
    if (phone.length > 0) {
      setFieldValue(name, phone);
    } else {
      setFieldValue(name, "");
    }
  };

  useEffect(() => {
    setFieldValue(dialCodeName ?? "dialCode", selectedCountry.dialCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialCodeName, selectedCountry]);

  return (
    <div className={className}>
      {label && (
        <Typography.H4 className="mb-1" weight="medium" size="base">
          {label}
        </Typography.H4>
      )}
      <div
        className={cn(
          "shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-1 px-2 w-full border rounded-lg",
          error ? "border-red-400" : "border-grey-4/50",
          isFocused
            ? "border-brand-1001 transition-colors duration-300 border-[1.5px]"
            : ""
        )}
      >
        <Select
          value={selectedCountry.code}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger
            className={cn(
              "px-1 rounded-lg w-fit border-0 focus:ring-0",
              error ? "border-red-100/50 border" : ""
            )}
          >
            <SelectValue>
              <span className="pr-2 text-lg"> {selectedCountry.flag}</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem
                key={country.code}
                value={country.code}
                className="gap-2"
              >
                {country.flag}
                <span className="text-xs ml-2">{country.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Field
          type="text"
          name={name}
          value={rawPhone}
          onChange={handlePhoneChange}
          placeholder="Enter phone number"
          className="w-full outline-none"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </div>
      {error ? <p className="text-sm text-error mt-2">{error}</p> : null}
    </div>
  );
}
