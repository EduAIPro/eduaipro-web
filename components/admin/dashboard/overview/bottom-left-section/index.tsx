import { CountriesBreakdown } from "./coutries-breakdown";
import { MostEngagedTeachers } from "./most-engaged-teachers";
// import { ReferralProgram } from "./referral-program";

export const BottomLeftSection = () => {
  return (
    <div className="grid grid-cols-2 gap-3 xl:gap-5">
      <MostEngagedTeachers />
      <div className="space-y-3 xl:space-y-5">
        <CountriesBreakdown />
        {/* <ReferralProgram /> */}
      </div>
    </div>
  );
};
