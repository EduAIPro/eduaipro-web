import { School } from "@/types/school";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SchoolState {
  school: School | null;
  setSchool: (data: School | null) => void;
}
export const useSchoolStore = create<SchoolState>()(
  persist(
    (set) => ({
      school: null,
      setSchool: (adminData: School | null) =>
        set(() => ({ school: adminData })),
    }),
    {
      name: "school",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSchoolStore;
