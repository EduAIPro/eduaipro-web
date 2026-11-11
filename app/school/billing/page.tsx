import { SchoolBilling } from "@/components/school/dashboard/billing";
import { Suspense } from "react";

const BillingPage = () => {
  return (
    <section>
      <Suspense>
        <SchoolBilling />
      </Suspense>
    </section>
  );
};
export default BillingPage;
