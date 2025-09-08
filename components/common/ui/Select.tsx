import { cn } from "@/lib/utils";
import { Field } from "formik";
import { ChevronDownIcon, LoaderIcon, SearchIcon, X } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface Option {
  value: string;
  label: string;
}

type InputProps = {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  name: string;
  error?: string | null;
  className?: string;
  options: Option[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  maxItems?: number; // Optional: limit number of selections
  showSelectedCount?: boolean; // Optional: show count instead of all items
  isLoading?: boolean; // Optional: show count instead of all items
};

export function MultiSearchSelectInput({
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  label,
  name,
  className,
  error,
  options = [],
  setSearchTerm,
  searchTerm,
  maxItems,
  showSelectedCount = false,
  isLoading = false,
}: InputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) {
      return options;
    } else {
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [searchTerm, options]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setSearchTerm]);

  return (
    <div className={`${className} relative`} ref={dropdownRef}>
      {label && (
        <p className="font-medium text-base mb-1 text-grey-650">{label}</p>
      )}
      <div
        className={cn(
          "shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-2 px-2 w-full border rounded-lg cursor-pointer relative min-h-[44px]",
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
        <Field name={name}>
          {({ field, form }: any) => {
            const selectedValues = field.value || [];
            const selectedOptions = options.filter((opt) =>
              selectedValues.includes(opt.value)
            );

            const handleToggleOption = (optionValue: string) => {
              const currentValues = field.value || [];
              let newValues: string[];

              if (currentValues.includes(optionValue)) {
                // Remove if already selected
                newValues = currentValues.filter(
                  (v: string) => v !== optionValue
                );
              } else {
                // Add if not selected (check maxItems limit)
                if (maxItems && currentValues.length >= maxItems) {
                  return;
                }
                newValues = [...currentValues, optionValue];
              }

              form.setFieldValue(name, newValues);
            };

            const handleRemoveOption = (
              optionValue: string,
              e: React.MouseEvent
            ) => {
              e.stopPropagation();
              const currentValues = field.value || [];
              const newValues = currentValues.filter(
                (v: string) => v !== optionValue
              );
              form.setFieldValue(name, newValues);
            };

            return (
              <>
                <div className="flex-1 flex flex-wrap gap-1 items-center">
                  {selectedOptions.length > 0 ? (
                    showSelectedCount ? (
                      <span className="text-base text-grey-12">
                        {selectedOptions.length} selected
                      </span>
                    ) : (
                      selectedOptions.map((option) => (
                        <div
                          key={option.value}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-600 rounded-md text-sm"
                        >
                          <span>{option.label}</span>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveOption(option.value, e)}
                            className="hover:bg-primary-200 rounded p-0.5"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))
                    )
                  ) : (
                    <span className="text-gray-400 text-base">
                      {placeholder}
                    </span>
                  )}
                </div>
                <div
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                  }}
                >
                  <ChevronDownIcon
                    className={cn(
                      "duration-300 transition-all",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}
                    size={18}
                  />
                </div>
                {isOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-grey-4/50 rounded-lg shadow-lg max-h-64 overflow-hidden z-50">
                    {/* Search Input */}
                    <div className="p-2 border-b border-grey-4/50 sticky top-0 bg-white">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {isLoading ? (
                            <LoaderIcon className="animate-spin" size={16} />
                          ) : (
                            <SearchIcon size={16} />
                          )}
                        </div>
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder={searchPlaceholder}
                          className="w-full pl-9 pr-3 py-2 text-sm border border-grey-4/50 rounded-md focus:outline-none focus:border-brand-1001 focus:ring-1 focus:ring-brand-1001"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>

                    {/* Options List */}
                    <div className="max-h-48 overflow-y-auto">
                      {maxItems && selectedValues.length >= maxItems && (
                        <div className="px-4 py-2 text-sm text-orange-600 bg-orange-50 border-b border-orange-100">
                          Maximum {maxItems} items can be selected
                        </div>
                      )}
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => {
                          const isSelected = selectedValues.includes(
                            option.value
                          );
                          const isDisabled =
                            (!isSelected &&
                              !!maxItems &&
                              selectedValues.length >= maxItems) ||
                            (selectedValues.includes("all") &&
                              option.value !== "all");
                          return (
                            <div
                              key={option.value}
                              className={cn(
                                "px-4 py-2 cursor-pointer transition-colors flex items-center justify-between",
                                isSelected
                                  ? "bg-primary-100"
                                  : "hover:bg-gray-50",
                                isDisabled && "opacity-50 cursor-not-allowed"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isDisabled) {
                                  handleToggleOption(option.value);
                                }
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {}}
                                  disabled={isDisabled}
                                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <p
                                  className={cn(
                                    "text-base",
                                    isSelected && "text-primary-600 font-medium"
                                  )}
                                >
                                  {option.label}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="px-4 py-3 text-center text-gray-500">
                          <p className="text-sm">No options found</p>
                        </div>
                      )}
                    </div>

                    {/* Footer with selection count */}
                    {selectedValues.length > 0 && (
                      <div className="p-2 border-t border-grey-4/50 bg-gray-50 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          {selectedValues.length} item
                          {selectedValues.length !== 1 ? "s" : ""} selected
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            form.setFieldValue(name, []);
                          }}
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            );
          }}
        </Field>
      </div>
      {error && (
        <div className="mt-2">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
