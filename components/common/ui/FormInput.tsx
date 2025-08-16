"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Field } from "formik";
import { ArrowDown2, ArrowUp2, Check, NotificationCircle } from "iconsax-react";
import { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import Typography from "./Typography";

interface FormInputProps {
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  note?: string;
  name: string;
  error?: string | null;
  className?: string;
  disabled?: boolean;
}

export default function FormInput({
  rightIcon,
  leftIcon,
  placeholder,
  label,
  type = "text",
  name,
  className,
  error,
  note,
  disabled,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`${className}`}>
      {label && (
        <p className="font-medium text-base mb-1 text-grey-650">{label}</p>
      )}
      <div
        className={cn(
          "shadow-lg !shadow-grey-2  flex items-center gap-x-3 py-2 px-2 w-full border rounded-lg",
          error ? "border-red-400" : "border-grey-4/50",
          isFocused
            ? "border-brand-1001 transition-colors duration-300 border-[1.5px]"
            : ""
        )}
      >
        {leftIcon ? (
          <div
            className={cn(
              "py-1 px-[6px] rounded-lg",
              error ? "bg-red-100/50" : "bg-blue-500/10"
            )}
          >
            {leftIcon ?? null}
          </div>
        ) : null}
        <Field
          name={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          className="outline-none text-base text-grey-12 w-full"
        />
        {rightIcon}
      </div>
      {note ? <span className="text-sm text-grey-9">{note}</span> : null}
      {error ? (
        <div className="mt-2">
          <Typography.P size="small" fontColor="error">
            {error}
          </Typography.P>
        </div>
      ) : null}
    </div>
  );
}

export function DateInput({
  rightIcon,
  placeholder = "Select Date",
  label,
  name,
  className,
  error,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`${className}`}>
      {label && (
        <Typography.H4 className="mb-1" weight="medium" size="base">
          {label}
        </Typography.H4>
      )}
      <div
        className={cn(
          "shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-2 px-2 w-full border rounded-lg",
          error ? "border-red-400" : "border-grey-4/50",
          isFocused
            ? "border-brand-1001 transition-colors duration-300 border-[1.5px]"
            : ""
        )}
      >
        <Field
          name={name}
          type="date"
          placeholder={placeholder}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          className="outline-none text-base text-grey-12 w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60"
        />
        {rightIcon}
      </div>
      {error && (
        <div className="mt-2">
          <Typography.P size="small" fontColor="error">
            {error}
          </Typography.P>
        </div>
      )}
    </div>
  );
}

interface Option {
  label: string;
  value: string;
}

export function SelectInput({
  rightIcon = <ArrowDown2 className="text-gray-700 w-5 h-5" />,
  leftIcon,
  placeholder = "Select an option",
  label,
  name,
  className,
  error,
  options = [],
}: {
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  label?: string;
  placeholder?: string;
  name: string;
  error?: string | null;
  className?: string;
  options: Option[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${className} relative`}>
      {label && (
        <Typography.H4 className="mb-1" weight="medium" size="base">
          {label}
        </Typography.H4>
      )}
      <div
        className={cn(
          "shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-2 px-2 w-full border rounded-lg cursor-pointer relative",
          error ? "border-red-400" : "border-grey-4/50",
          isFocused
            ? "border-brand-1001 transition-colors duration-300 border-[1.5px]"
            : ""
        )}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsFocused(!isFocused);
        }}
      >
        {leftIcon && (
          <div
            className={`py-1 px-[6px] rounded-lg ${
              error ? "bg-red-100/50" : "bg-blue-500/10"
            }`}
          >
            {leftIcon}
          </div>
        )}
        <Field name={name}>
          {({ field, form }: any) => (
            <>
              <div className="flex-1 text-base text-grey-12">
                {field.value ? (
                  <span>
                    {options.find((opt) => opt.value === field.value)?.label}
                  </span>
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )}
              </div>
              <div
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
              >
                {isOpen ? (
                  <ArrowUp2 className="text-gray-700 w-5 h-5" />
                ) : (
                  rightIcon
                )}
              </div>
              {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-grey-4/50 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className={`px-4 py-2 hover:bg-primary-100 cursor-pointer ${
                        field.value === option.value ? "bg-primary-100" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        form.setFieldValue(name, option.value);
                        setIsOpen(false);
                      }}
                    >
                      <Typography.P
                        size="base"
                        className={
                          field.value === option.value ? "text-primary-400" : ""
                        }
                      >
                        {option.label}
                      </Typography.P>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Field>
      </div>
      {error && (
        <div className="mt-2">
          <Typography.P size="small" fontColor="error">
            {error}
          </Typography.P>
        </div>
      )}
    </div>
  );
}

export function RadioInput({
  leftIcon,
  label,
  name,
  className,
  error,
  options = [],
  description,
}: {
  leftIcon?: ReactNode;
  label?: string;
  name: string;
  error?: string | null;
  className?: string;
  options: Option[];
  description?: string;
}) {
  return (
    <div className={`${className}`}>
      {label && (
        <Typography.H4 className="mb-1" weight="medium" size="base">
          {label}
        </Typography.H4>
      )}
      {description && (
        <Typography.P className="mb-3 text-gray-500" size="small">
          {description}
        </Typography.P>
      )}
      <div
        className={`shadow-lg !shadow-grey-2 w-full border ${
          error ? "border-red-400" : "border-grey-4/50"
        } rounded-lg divide-y divide-grey-4/20`}
      >
        {options.map((option, index) => (
          <Field key={option.value} type="radio" name={name}>
            {({ field, form }: any) => (
              <label
                className={`flex items-center gap-x-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors
                  ${index === 0 ? "rounded-t-lg" : ""} 
                  ${index === options.length - 1 ? "rounded-b-lg" : ""}`}
              >
                <div className="flex items-center flex-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${
                        field.value === option.value
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                  >
                    {field.value === option.value && (
                      <NotificationCircle className="w-2 h-2 text-white fill-current" />
                    )}
                  </div>
                  <div className="ml-3">
                    <Typography.P
                      size="base"
                      className={`${
                        field.value === option.value
                          ? "text-blue-500 font-medium"
                          : ""
                      }`}
                    >
                      {option.label}
                    </Typography.P>
                  </div>
                </div>
                <input
                  type="radio"
                  className="hidden"
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => form.setFieldValue(name, option.value)}
                />
              </label>
            )}
          </Field>
        ))}
      </div>
      {error && (
        <div className="mt-2">
          <Typography.P size="small" fontColor="error">
            {error}
          </Typography.P>
        </div>
      )}
    </div>
  );
}

export function CheckboxInput({
  leftIcon,
  label,
  name,
  className,
  error,
  options = [],
  description,
  single = false, // For single checkbox use case
}: {
  leftIcon?: ReactNode;
  label?: string;
  name: string;
  error?: string | null;
  className?: string;
  options?: Option[];
  description?: string;
  single?: boolean;
}) {
  if (single) {
    return (
      <div className={`${className}`}>
        <Field type="checkbox" name={name}>
          {({ field, form }: any) => (
            <div className="flex flex-col">
              <label className="flex items-center gap-x-3 cursor-pointer group">
                <Checkbox
                  name={name}
                  checked={!!field.value}
                  onCheckedChange={(checked) =>
                    form.setFieldValue(name, checked)
                  }
                />
                {label && <p>{label}</p>}
              </label>
              {error && (
                <div className="mt-2">
                  <Typography.P size="small" fontColor="error">
                    {error}
                  </Typography.P>
                </div>
              )}
            </div>
          )}
        </Field>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {label && (
        <Typography.H4 className="mb-1" weight="medium" size="base">
          {label}
        </Typography.H4>
      )}
      {description && (
        <Typography.P className="mb-3 text-gray-500" size="small">
          {description}
        </Typography.P>
      )}
      <div
        className={`shadow-lg !shadow-grey-2 w-full border ${
          error ? "border-red-400" : "border-grey-4/50"
        } rounded-lg divide-y divide-grey-4/20`}
      >
        <Field name={name}>
          {({ field, form }: any) => (
            <>
              {options.map((option, index) => {
                const isChecked = Array.isArray(field.value)
                  ? field.value.includes(option.value)
                  : false;

                return (
                  <label
                    key={option.value}
                    className={`flex items-center gap-x-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors
                      ${index === 0 ? "rounded-t-lg" : ""} 
                      ${index === options.length - 1 ? "rounded-b-lg" : ""}`}
                  >
                    <div className="flex items-center flex-1">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                          ${
                            isChecked
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300"
                          }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="ml-3">
                        <Typography.P
                          size="base"
                          className={`${
                            isChecked ? "text-blue-500 font-medium" : ""
                          }`}
                        >
                          {option.label}
                        </Typography.P>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={(e) => {
                        const newValue = Array.isArray(field.value)
                          ? e.target.checked
                            ? [...field.value, option.value]
                            : field.value.filter(
                                (v: string) => v !== option.value
                              )
                          : [option.value];
                        form.setFieldValue(name, newValue);
                      }}
                    />
                  </label>
                );
              })}
            </>
          )}
        </Field>
      </div>
      {error && (
        <div className="mt-2">
          <Typography.P size="small" fontColor="error">
            {error}
          </Typography.P>
        </div>
      )}
    </div>
  );
}
