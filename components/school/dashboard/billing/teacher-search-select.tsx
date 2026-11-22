"use client";

import { getSchoolStaffsKey } from "@/api/keys";
import { fetchPaginatedSearchQuery } from "@/api/queries";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { hasSchoolSeat, RosterStaff, staffName } from "@/lib/school-roster";
import { cn } from "@/lib/utils";
import { Seat } from "@/types/school/billing";
import { SchoolStaffsData } from "@/types/school/teachers";
import { CheckIcon, Loader2Icon, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";

type TeacherSearchSelectProps = {
  /** teachers already loaded by the page; used until a search comes back */
  staff: RosterStaff[];
  seats?: Seat[];
  /** ids picked so far */
  selectedIds: string[];
  onToggle: (staff: RosterStaff) => void;
  /** no more free seats to fill, so nothing new can be picked */
  full?: boolean;
  disabled?: boolean;
};

/** A teacher who already holds a seat can't be given another one. */
const seatedLabel = "Has a seat";

export const TeacherSearchSelect = ({
  staff,
  seats,
  selectedIds,
  onToggle,
  full,
  disabled,
}: TeacherSearchSelectProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const { value: debounced } = useDebounce(query, 400);
  const term = debounced.trim();

  const { data, isLoading } = useSWR<SchoolStaffsData>(
    open ? [getSchoolStaffsKey, 1, encodeURIComponent(term)] : null,
    fetchPaginatedSearchQuery,
    { keepPreviousData: true },
  );

  const options = useMemo(() => {
    const source = data?.data ?? staff;
    const q = term.toLowerCase();
    return source.filter((s) => {
      if (s.role === "OWNER" || s.isActive === false) return false;
      // the server search already filtered; this only helps the fallback list
      if (!q || data?.data) return true;
      return (
        staffName(s).toLowerCase().includes(q) ||
        s.user.email.toLowerCase().includes(q)
      );
    });
  }, [data, staff, term]);

  useEffect(() => setActive(0), [term, open]);

  // close when focus or a click leaves the field and its list
  useEffect(() => {
    if (!open) return;
    const onDocDown = (e: MouseEvent | FocusEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("focusin", onDocDown);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("focusin", onDocDown);
    };
  }, [open]);

  const pick = (s: RosterStaff) => {
    if (hasSchoolSeat(s, seats)) return;
    if (full && !selectedIds.includes(s.id)) return;
    onToggle(s);
    setQuery("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      // keep Escape from closing the dialog this field sits in
      if (open) e.stopPropagation();
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => {
        const next = e.key === "ArrowDown" ? i + 1 : i - 1;
        if (!options.length) return 0;
        return (next + options.length) % options.length;
      });
      return;
    }
    if (e.key === "Enter" && open && options[active]) {
      e.preventDefault();
      pick(options[active]);
    }
  };

  return (
    <div ref={boxRef} className="relative">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-grey-500" />
        <Input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="teacher-search-list"
          aria-label="Search teachers"
          disabled={disabled}
          placeholder="Search teachers by name or email"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="rounded-md !border bg-white pr-9 pl-9 text-sm"
        />
        {isLoading ? (
          <Loader2Icon className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-grey-500" />
        ) : null}
      </div>

      {open ? (
        <ul
          id="teacher-search-list"
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white py-1 shadow-lg"
        >
          {options.length ? (
            options.map((s, i) => {
              const seated = hasSchoolSeat(s, seats);
              const picked = selectedIds.includes(s.id);
              const blocked = seated || (full && !picked);
              return (
                <li key={s.id} role="option" aria-selected={picked}>
                  <button
                    type="button"
                    disabled={blocked}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => pick(s)}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
                      i === active && !blocked && "bg-grey-3",
                      blocked && "cursor-not-allowed opacity-50",
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-grey-800">
                        {staffName(s)}
                      </span>
                      <span className="block truncate text-xs text-grey-500">
                        {s.user.email}
                      </span>
                    </span>
                    {seated ? (
                      <span className="shrink-0 rounded-full bg-grey-3 px-2 py-0.5 text-[10.5px] font-semibold text-grey-500">
                        {seatedLabel}
                      </span>
                    ) : picked ? (
                      <CheckIcon className="size-4 shrink-0 text-[#1A56DB]" />
                    ) : null}
                  </button>
                </li>
              );
            })
          ) : (
            <li className="px-3 py-6 text-center text-xs text-grey-500">
              {isLoading ? "Searching…" : "No teachers found"}
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};
