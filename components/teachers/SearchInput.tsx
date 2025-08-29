"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, SearchIcon } from "lucide-react";
import { Teacher } from "@/app/types/Teacher";
import NotificationModal from "./NotificationModal";
import Image from "next/image";

interface SearchInputProps {
  teachers: Teacher[];
  onSearch: (filtered: Teacher[]) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ teachers, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.school.toLowerCase().includes(value.toLowerCase())
    );

    onSearch(filtered);
  };

  const handleSendNotification = (message: string) => {
    console.log("Notification sent:", message);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-full max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search Teachers"
          className="pl-10"
          value={query}
          onChange={handleSearch}
        />
      </div>

      <div className="flex items-center gap-[10px]">
        <Button
          variant="ghost"
          className="p-[10px] flex items-center text-[#656565]">
          <Image
            src="/assets/images/Vector.svg"
            alt="filter"
            width={15}
            height={13.5}
          />
          Filter
        </Button>

        <NotificationModal
          triggerButtonText={
            <>
              <Image
                src="/assets/images/Group.svg"
                alt="group"
                width={15}
                height={16}
              />
              Send Notification
            </>
          }
          onSend={handleSendNotification}
        />

        <Button variant="default">
          <Plus />
          Invite Teacher
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
