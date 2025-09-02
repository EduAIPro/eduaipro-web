"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

interface SearchWithActionsProps<T> {
  data: T[];
  searchKeys: (keyof T)[];
  placeholder?: string;
  onSearch: (filtered: T[]) => void;
  extraActions?: React.ReactNode;
}

function SearchWithActions<T>({
  data,
  searchKeys,
  placeholder = "Search...",
  onSearch,
  extraActions,
}: SearchWithActionsProps<T>) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = data.filter((item) =>
      searchKeys.some((key) => {
        const field = item[key];
        return (
          typeof field === "string" &&
          field.toLowerCase().includes(value.toLowerCase())
        );
      })
    );

    onSearch(filtered);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-full max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-10"
          value={query}
          onChange={handleSearch}
        />
      </div>

      <div className="flex items-center gap-[10px]">{extraActions}</div>
    </div>
  );
}

export default SearchWithActions;
