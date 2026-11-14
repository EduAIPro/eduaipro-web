"use client";
import { useEffect, useId, useMemo, useState } from "react";
// Import Shadcn UI components (adjust the import paths based on your project structure)
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Country as CountryData } from "country-state-city";
import { Field, useFormikContext } from "formik";

interface Country {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
}

// Pinned first: the default (countries[0]) and the match for shared dial codes
// (+1 → US, +44 → GB).
const PINNED_COUNTRY_CODES = ["NG", "GB", "US"];

const dialDigits = (dialCode: string) => String(dialCode).replace(/\D/g, "");

const allCountries: Country[] = CountryData.getAllCountries().map((c) => ({
  code: c.isoCode,
  name: c.name,
  dialCode: `+${dialDigits(c.phonecode)}`,
  flag: c.flag,
}));

const countries: Country[] = [
  ...PINNED_COUNTRY_CODES.map(
    (code) => allCountries.find((c) => c.code === code)!,
  ),
  ...allCountries.filter((c) => !PINNED_COUNTRY_CODES.includes(c.code)),
];

type PhoneInputProps = {
  name: string;
  dialCodeName?: string;
  label?: string;
  className?: string;
  error: string | null;
  setFieldValue: (fieldName: string, value: string) => void;
  required?: boolean;
};

export default function PhoneInput({
  name,
  setFieldValue,
  dialCodeName,
  error,
  label,
  className,
  required,
}: PhoneInputProps) {
  const { values } = useFormikContext<any>();

  // Unique, valid id even for dotted or repeated names (e.g. "phone.digits").
  const reactId = useId();
  const id = `${name.replace(/[^A-Za-z0-9_-]/g, "-")}-${reactId.replace(/[^A-Za-z0-9_-]/g, "")}`;
  const errorId = error ? `${id}-error` : undefined;

  const phoneField =
    values["phoneNumber"] || values["phone"] || values["contactPhone"];

  const defaultCountry = useMemo(() => {
    if (phoneField && phoneField.dialCode) {
      return (
        countries.find(
          (c) => dialDigits(c.dialCode) === dialDigits(phoneField.dialCode),
        ) ??
        countries[0]
      );
    } else {
      return countries[0];
    }
  }, [phoneField]);

  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);

  const [rawPhone, setRawPhone] = useState<string>(phoneField?.digits ?? "");

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
        <label
          htmlFor={id}
          className="block mb-1 text-base font-medium text-black"
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-error ml-0.5">
              *
            </span>
          ) : null}
        </label>
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
            aria-label={`Country code, ${selectedCountry.name} (${selectedCountry.dialCode})`}
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
                textValue={country.name}
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
          id={id}
          aria-required={required || undefined}
          aria-invalid={!!error}
          aria-describedby={errorId}
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
      {error ? (
        <p id={errorId} className="text-sm text-error mt-2">
          {error}
        </p>
      ) : null}
    </div>
  );
}
